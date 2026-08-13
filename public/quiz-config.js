/*
 * 题库配置：每题选项携带维度分值 dimScores（D1~D9）。
 * 用户答题后累加 → 归一化为用户性格向量，再与各角色向量算适配度。
 */

const QUIZ_INTRO = "欢迎来到“敖子逸”宇宙，你的每一次选择都会与这个世界产生共振。你的伙伴在前面等你，进入“敖子逸”世界一探究竟吧。";

const QUESTIONS = [
  { id: "q1", text: "喜欢江湖还是朝堂？", options: [
    { id: "a", label: "江湖", dimScores: { D8: 2, D3: 1 } },
    { id: "b", label: "朝堂", dimScores: { D3: -1, D9: 1 } },
    { id: "c", label: "我要修仙", dimScores: { D7: 2, D8: 1 } },
    { id: "d", label: "全都要", dimScores: { D8: 1, D9: 1 } },
  ]},
  { id: "q2", text: "你是因为什么入坑敖子逸的？", options: [
    { id: "a", label: "舞台/唱跳实力", dimScores: { D6: 2, D1: 1 } },
    { id: "b", label: "某部剧里的某个角色", dimScores: { D4: 1, D6: 1 } },
    { id: "c", label: "综艺里真实的性格", dimScores: { D1: 1, D2: 1 } },
    { id: "d", label: "颜值氛围感/气质", dimScores: { D6: 1, D7: 1 } },
  ]},
  { id: "q3", text: "敖子逸有歌手、舞者、演员三重身份，你最被哪一面吸引？", options: [
    { id: "a", label: "唱歌的敖子逸", dimScores: { D6: 2, D7: 1 } },
    { id: "b", label: "跳舞的敖子逸", dimScores: { D1: 1, D6: 1, D4: 1 } },
    { id: "c", label: "演员的敖子逸", dimScores: { D2: 1, D4: 1, D6: 1 } },
    { id: "d", label: "都要，全能爱了", dimScores: { D6: 1, D1: 1 } },
  ]},
  { id: "q4", text: "如果有机会去重庆，你最想？", options: [
    { id: "a", label: "吃火锅逛吃", dimScores: { D1: 2, D8: 1 } },
    { id: "b", label: "坐长江索道吹晚风", dimScores: { D7: 2 } },
    { id: "c", label: "打卡剧组取景地", dimScores: { D6: 1, D8: 1 } },
    { id: "d", label: "线上云陪伴就好", dimScores: { D5: 1, D1: -1 } },
  ]},
  { id: "q5", text: "打王者荣耀，你最爱玩的分路？", options: [
    { id: "a", label: "对抗路/打野，冲在最前", dimScores: { D9: 2, D3: 1 } },
    { id: "b", label: "中路，输出核心", dimScores: { D9: 1, D4: 1 } },
    { id: "c", label: "射手，稳发育", dimScores: { D3: -1, D5: 1 } },
    { id: "d", label: "辅助，守护队友", dimScores: { D5: 2, D2: 1 } },
  ]},
  { id: "q6", text: "打王者荣耀，想让谁当你的队友？", options: [
    { id: "a", label: "池云", dimScores: { D8: 1, D3: 1 } },
    { id: "b", label: "陈暮光", dimScores: { D4: 1, D9: 1 } },
    { id: "c", label: "桑湛", dimScores: { D1: 1 } },
    { id: "d", label: "敖子逸本人", dimScores: { D7: 1, D5: 1 } },
  ]},
  { id: "q7", text: "如果你选择的Ta开黑带你上分，你希望他玩什么分路？", options: [
    { id: "a", label: "带飞野王", dimScores: { D9: 2 } },
    { id: "b", label: "贴心辅助保你", dimScores: { D5: 2, D2: 1 } },
    { id: "c", label: "搞笑娱乐局", dimScores: { D1: 2, D4: 1 } },
    { id: "d", label: "随便，开心就行", dimScores: { D3: -1, D7: 1 } },
  ]},
  { id: "q8", text: "你更想和敖子逸一起做什么？", options: [
    { id: "a", label: "一起打游戏开黑", dimScores: { D1: 1, D8: 1 } },
    { id: "b", label: "一起拍戏演对手戏", dimScores: { D6: 1, D4: 1 } },
    { id: "c", label: "一起吃饭逛街", dimScores: { D5: 1, D7: 1 } },
    { id: "d", label: "一起旅行闯荡", dimScores: { D8: 2, D7: 1 } },
  ]},
  { id: "q9", text: "他的综艺人设你最爱哪种？", options: [
    { id: "a", label: "战至巅峰的认真队长", dimScores: { D9: 2, D3: 1 } },
    { id: "b", label: "超燃美食记的美食主播", dimScores: { D1: 1, D5: 1 } },
    { id: "c", label: "旅行任意门的松弛小狗", dimScores: { D8: 2, D7: 1 } },
    { id: "d", label: "逸想天开的脑洞达人", dimScores: { D7: 2, D6: 1 } },
  ]},
  { id: "q10", text: "敖子逸发新剧，你更期待？", options: [
    { id: "a", label: "古装武侠", dimScores: { D8: 1, D3: 1 } },
    { id: "b", label: "校园甜剧", dimScores: { D7: 2, D5: 1 } },
    { id: "c", label: "热血群像", dimScores: { D3: 1, D1: 1 } },
    { id: "d", label: "现代都市", dimScores: { D2: 1 } },
  ]},
  { id: "q11", text: "池云喊你周末去喝酒，你会？", options: [
    { id: "a", label: "出门浪", dimScores: { D1: 2, D8: 1 } },
    { id: "b", label: "不去，宅家追剧打游戏", dimScores: { D1: -2, D5: -1 } },
    { id: "c", label: "换个方案，去户外探险", dimScores: { D8: 2 } },
  ]},
  { id: "q12", text: "跟陈暮光去旅行你偏好？", options: [
    { id: "a", label: "说走就走的自由行", dimScores: { D8: 2, D9: 1 } },
    { id: "b", label: "精心做攻略", dimScores: { D3: -1, D9: 1 } },
    { id: "c", label: "跟团省心", dimScores: { D9: -1, D5: 1 } },
    { id: "d", label: "不跟陈暮光旅行，我要宅着", dimScores: { D1: -2, D5: -1 } },
  ]},
  { id: "q13", text: "在新世界里，你更想拥有的超能力？", options: [
    { id: "a", label: "飞/瞬移", dimScores: { D8: 2 } },
    { id: "b", label: "读心，更懂人", dimScores: { D2: 2, D5: 1 } },
    { id: "c", label: "隐身，享受独处", dimScores: { D1: -2, D5: -2 } },
    { id: "d", label: "无敌，保护想护的人", dimScores: { D5: 2, D9: 1 } },
  ]},
  { id: "q14", text: "你更吃哪种告白？", options: [
    { id: "a", label: "直球“我喜欢你”", dimScores: { D4: 2 } },
    { id: "b", label: "默默照顾的行动派", dimScores: { D5: 2, D2: 1 } },
    { id: "c", label: "拐弯试探", dimScores: { D4: -1, D7: 1 } },
    { id: "d", label: "气氛到了自然成", dimScores: { D7: 1, D2: 1 } },
  ]},
  { id: "q15", text: "陈暮光对你傲娇嘴硬，你会？", options: [
    { id: "a", label: "觉得可爱，主动破冰", dimScores: { D4: 1, D5: 1 } },
    { id: "b", label: "有点烦，等他开口", dimScores: { D5: -1, D2: -1 } },
    { id: "c", label: "看穿但不说穿", dimScores: { D2: 1, D4: -1 } },
    { id: "d", label: "不管，先亲一口", dimScores: { D4: 2, D7: 1 } },
  ]},
  { id: "q16", text: "先建设家庭还是先建设社会？", options: [
    { id: "a", label: "家庭", dimScores: { D5: 2, D7: 1 } },
    { id: "b", label: "社会", dimScores: { D9: 1, D3: 1 } },
    { id: "c", label: "躺平，天塌下来高个顶着", dimScores: { D3: -2, D8: -1 } },
    { id: "d", label: "我要毁灭世界", dimScores: { D8: 2, D9: 2 } },
  ]},
  { id: "q17", text: "你更相信？", options: [
    { id: "a", label: "一眼心动", dimScores: { D7: 2, D2: 1 } },
    { id: "b", label: "日久生情", dimScores: { D5: 2, D2: 1 } },
    { id: "c", label: "患难见真情", dimScores: { D5: 1, D9: 1 } },
    { id: "d", label: "缘分天定", dimScores: { D7: 2 } },
  ]},
  { id: "q18", text: "你更想和命定之人？", options: [
    { id: "a", label: "一起闯荡江湖", dimScores: { D8: 2, D3: 1 } },
    { id: "b", label: "一起安稳生活", dimScores: { D5: 1, D3: -1 } },
    { id: "c", label: "一起搞事业", dimScores: { D9: 1, D3: 1 } },
    { id: "d", label: "一起疯一起静", dimScores: { D7: 1, D2: 1 } },
  ]},
];
