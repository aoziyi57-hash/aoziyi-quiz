const path = require("path");
const express = require("express");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// 接收匿名答卷，返回整体统计
app.post("/api/submit", function (req, res) {
  const body = req.body || {};
  const answers = body.answers;
  const resultType = body.resultType;
  if (!Array.isArray(answers) || !resultType) {
    return res.status(400).json({ error: "invalid payload" });
  }
  db.addSubmission(answers, resultType);
  res.json({ ok: true, stats: db.getStats() });
});

app.get("/api/stats", function (req, res) {
  res.json({ stats: db.getStats() });
});

app.listen(PORT, function () {
  console.log("敖子逸宇宙·命定之人 已启动: http://localhost:" + PORT);
});
