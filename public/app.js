/* 前端逻辑：答题 → 用户向量 → 适配度匹配 → 结果页（可选上报后端做统计） */
(function () {
  "use strict";

  var DIMS = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"];
  var answers = new Array(QUESTIONS.length).fill(null);
  var current = 0;

  var el = {
    intro: document.getElementById("intro"),
    quiz: document.getElementById("quiz"),
    result: document.getElementById("result"),
    introText: document.getElementById("introText"),
    startBtn: document.getElementById("startBtn"),
    retryBtn: document.getElementById("retryBtn"),
    qText: document.getElementById("qText"),
    options: document.getElementById("options"),
    progressFill: document.getElementById("progressFill"),
    progressNum: document.getElementById("progressNum"),
    resultName: document.getElementById("resultName"),
    resultWork: document.getElementById("resultWork"),
    compatNum: document.getElementById("compatNum"),
    persona: document.getElementById("persona"),
    labels: document.getElementById("labels"),
    stats: document.getElementById("stats"),
  };

  function show(screen) {
    [el.intro, el.quiz, el.result].forEach(function (s) { s.classList.remove("active"); });
    screen.classList.add("active");
  }

  // 把用户「选项分值」累加并归一化到 0-100
  function buildUserVec() {
    var raw = {};
    DIMS.forEach(function (d) { raw[d] = 0; });
    answers.forEach(function (optId, i) {
      if (!optId) return;
      var q = QUESTIONS[i];
      var o = q.options.find(function (x) { return x.id === optId; });
      if (o && o.dimScores) {
        Object.keys(o.dimScores).forEach(function (d) { raw[d] += o.dimScores[d]; });
      }
    });
    var vec = {};
    DIMS.forEach(function (d) {
      vec[d] = Math.max(0, Math.min(100, Math.round(50 + raw[d] * 4)));
    });
    return vec;
  }

  // 适配度：9 维平均「100 - 距离」
  function compatibility(userVec, charVec) {
    var sum = 0;
    DIMS.forEach(function (d) { sum += 100 - Math.abs(userVec[d] - charVec[d]); });
    return Math.round(sum / DIMS.length);
  }

  // 解析标签条件：逗号/&& 为「且」；支持 > < 与区间 a-b（含全角 ＞＜）
  function evalCond(cond, vec) {
    var norm = cond.replace(/＞/g, ">").replace(/＜/g, "<");
    var parts = norm.split(/[，,&&]/).map(function (s) { return s.trim(); }).filter(Boolean);
    return parts.every(function (p) {
      var m = p.match(/^(D\d+)\s*(.*)$/);
      if (!m) return true;
      var key = m[1], expr = m[2], v = vec[key];
      if (expr.indexOf(">") !== -1) return v > parseFloat(expr.replace(">", ""));
      if (expr.indexOf("<") !== -1) return v < parseFloat(expr.replace("<", ""));
      if (expr.indexOf("-") !== -1) {
        var ab = expr.split("-").map(Number);
        return v >= ab[0] && v <= ab[1];
      }
      return true;
    });
  }

  function computeResult() {
    var userVec = buildUserVec();
    // 收集第1题等带 lockOut 的硬性排除（如：朝堂锁池云 / 江湖锁乔慈）
    var lockedOut = {};
    answers.forEach(function (optId, i) {
      var q = QUESTIONS[i];
      var o = q.options.find(function (x) { return x.id === optId; });
      if (o && o.lockOut) o.lockOut.forEach(function (id) { lockedOut[id] = true; });
    });
    // 标签优先：先找命中了「专属触发标签」的角色，只在它们之中比适配度；
    // 若谁都没命中，则退回全部角色（兜底）。
    var hitChars = CHARACTERS.filter(function (c) {
      return c.labels.some(function (l) { return evalCond(l.cond, userVec); });
    });
    var basePool = hitChars.length ? hitChars : CHARACTERS;

    // 彩蛋角色需「命中全部专属标签」才候选（压低其概率，避免霸榜）
    var EGG_IDS = { sangzhan: 1, mile: 1, jiangmo: 1, luze: 1, shangguanyu: 1, penghezhou: 1 };
    var pool = basePool.filter(function (c) {
      if (lockedOut[c.id]) return false;
      if (EGG_IDS[c.id]) {
        var eggHit = c.labels.filter(function (l) { return evalCond(l.cond, userVec); }).length;
        return eggHit >= c.labels.length;
      }
      return true;
    });
    // 兜底：若候选池为空（如命中的全是仅命中 1 个标签的彩蛋），退回全体非锁定角色
    if (!pool.length) pool = CHARACTERS.filter(function (c) { return !lockedOut[c.id]; });

    // 软权重：在「紧标签已收敛的候选集」内做加减偏移，微调各角色胜出概率
    // （正数更易胜出、负数更易落败），仅用于平衡分布，不改变候选资格。
    var WEIGHTS = {
      chiyun: 15, chenmuguang: 12, aoyi: -12, yangyishan: -12, qiaoci: -4,
      mahongjun: 4, sufan: 12, penghezhou: 15, sangzhan: -18, mile: 12,
      jiangmo: 15, luze: -2, shangguanyu: 10
    };
    var ranked = pool.map(function (c) {
      var hits = c.labels.filter(function (l) { return evalCond(l.cond, userVec); });
      return { char: c, compat: compatibility(userVec, c.vec) + (WEIGHTS[c.id] || 0), hits: hits };
    }).sort(function (a, b) { return b.compat - a.compat; });

    var top = ranked[0];
    el.resultName.textContent = top.char.name;
    el.resultWork.textContent = "出自《" + top.char.work + "》";
    el.compatNum.textContent = top.compat;
    el.persona.textContent = top.char.persona;

    el.labels.innerHTML = "";
    if (top.hits.length) {
      top.hits.forEach(function (l) {
        var item = document.createElement("div");
        item.className = "label-item";
        item.innerHTML = '<div class="label-tag">' + l.tag + "</div>" +
                         '<div class="label-text">你是他的' + l.tag + "：" + l.text + "</div>";
        el.labels.appendChild(item);
      });
    } else {
      var p = document.createElement("div");
      p.className = "label-text";
      p.textContent = top.char.defaultText;
      el.labels.appendChild(p);
    }

    show(el.result);
    submitResult(top.char.id);
  }

  function renderQuestion() {
    var q = QUESTIONS[current];
    el.qText.textContent = q.text;
    el.options.innerHTML = "";
    el.progressFill.style.width = (current / QUESTIONS.length * 100) + "%";
    el.progressNum.textContent = (current + 1) + " / " + QUESTIONS.length;

    q.options.forEach(function (o) {
      var btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = o.label;
      if (answers[current] === o.id) btn.classList.add("selected");
      btn.onclick = function () {
        answers[current] = o.id;
        Array.prototype.forEach.call(el.options.children, function (c) { c.classList.remove("selected"); });
        btn.classList.add("selected");
        setTimeout(function () {
          if (current < QUESTIONS.length - 1) { current++; renderQuestion(); }
          else { computeResult(); }
        }, 260);
      };
      el.options.appendChild(btn);
    });
  }

  function start() {
    answers = new Array(QUESTIONS.length).fill(null);
    current = 0;
    renderQuestion();
    show(el.quiz);
  }

  // 可选：上报后端做匿名统计（无后端时静默忽略）
  function submitResult(resultType) {
    el.stats.textContent = "";
    try {
      fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answers, resultType: resultType }),
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.stats) renderStats(data.stats, resultType);
      }).catch(function () {});
    } catch (e) { /* ignore */ }
  }

  function renderStats(stats, resultType) {
    var total = stats.total || 0;
    if (!total) return;
    var mine = stats.counts[resultType] || 0;
    var pct = Math.round(mine / total * 100);
    el.stats.textContent = "全网已有 " + total + " 人找到命定之人，其中 " + pct +
                           "% 和你一样，命定之人是「" + charName(resultType) + "」。";
  }
  function charName(id) {
    var c = CHARACTERS.find(function (x) { return x.id === id; });
    return c ? c.name : id;
  }

  // 初始化
  el.introText.textContent = QUIZ_INTRO;
  el.startBtn.onclick = start;
  el.retryBtn.onclick = function () { show(el.intro); };
  show(el.intro);
})();
