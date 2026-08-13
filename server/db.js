/*
 * 轻量匿名存储：仅保存答卷与算出的结果类型（无任何个人信息）。
 * 用 JSON 文件存储，零原生依赖；如需换成 SQLite，替换本文件实现即可。
 */
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const FILE = path.join(DATA_DIR, "submissions.json");

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf8");
}

function readAll() {
  ensure();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch (e) {
    return [];
  }
}

function addSubmission(answers, resultType) {
  const all = readAll();
  all.push({
    created_at: new Date().toISOString(),
    answers: answers,
    result_type: resultType,
  });
  fs.writeFileSync(FILE, JSON.stringify(all), "utf8");
}

function getStats() {
  const all = readAll();
  const counts = {};
  all.forEach(function (s) {
    if (!s.result_type) return;
    counts[s.result_type] = (counts[s.result_type] || 0) + 1;
  });
  return { total: all.length, counts: counts };
}

module.exports = { addSubmission, getStats };
