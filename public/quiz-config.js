/*
 * 题库配置（1030 更新版，共 33 题）：每题选项携带维度分值 dimScores（D1~D9）。
 * 用户答题后累加 → 归一化为用户性格向量，再与各角色向量算适配度。
 * 第 1 题带 lockOut：选「朝堂」则池云不可解锁，选「江湖」则乔慈不可解锁。
 */

const QUIZ_INTRO = "欢迎来到“敖子逸”宇宙，你的每一次选择都会与这个世界产生共振。你的伙伴在前面等你，进入“敖子逸”世界一探究竟吧。";

const QUESTIONS = [
  { id: "q1", text: "喜欢江湖还是朝堂？", options: [
    { id: "a", label: "江湖", dimScores: { D8: 2, D3: 1 }, lockOut: ["qiaoci"] },
    { id: "b", label: "朝堂", dimScores: { D9: 2, D2: -1, D7: -1 }, lockOut: ["chiyun"] },
    { id: "c", label: "我要修仙", dimScores: { D6: 2, D7: 2 } },
    { id: "d", label: "全都要", dimScores: { D1: 2, D5: 1 } },
  ]},
  { id: "q2", text: "你是因为什么入坑敖子逸的？", options: [
    { id: "a", label: "舞台/唱跳实力", dimScores: { D6: 2, D8: 1 } },
    { id: "b", label: "某部剧里的某个角色", dimScores: { D5: 2, D7: 1 } },
    { id: "c", label: "综艺里真实的性格", dimScores: { D4: 2, D1: 1 } },
    { id: "d", label: "颜值氛围感/气质", dimScores: { D7: 2, D6: 1 } },
  ]},
  { id: "q3", text: "敖子逸有歌手、舞者、演员三重身份，你最被哪一面吸引？", options: [
    { id: "a", label: "唱歌的敖子逸", dimScores: { D6: 2 } },
    { id: "b", label: "跳舞的敖子逸", dimScores: { D6: 2, D8: 1 } },
    { id: "c", label: "演员的敖子逸", dimScores: { D4: 2, D5: 1 } },
    { id: "d", label: "都要，全能爱了", dimScores: { D1: 2 } },
  ]},
  { id: "q4", text: "如果有机会去重庆，你最想？", options: [
    { id: "a", label: "吃重庆本地特色美食", dimScores: { D5: 2, D7: 1 } },
    { id: "b", label: "逛山城、看洪崖洞等景点", dimScores: { D8: 1 } },
    { id: "c", label: "感受山城烟火，随便走走", dimScores: { D5: 2, D4: -1 } },
    { id: "d", label: "线上云陪伴就好", dimScores: { D5: 1, D1: -1 } },
  ]},
  { id: "q5", text: "打王者荣耀，你最爱玩的分路？", options: [
    { id: "a", label: "对抗路/打野，冲在最前", dimScores: { D3: 2, D9: 2, D8: 1 } },
    { id: "b", label: "中路，输出核心", dimScores: { D9: 2, D4: 1 } },
    { id: "c", label: "射手，稳发育", dimScores: { D3: -1, D8: -1 } },
    { id: "d", label: "辅助，守护队友", dimScores: { D5: 2, D9: -1 } },
  ]},
  { id: "q6", text: "打王者荣耀，想让谁当你的队友？", options: [
    { id: "a", label: "池云", dimScores: { D1: 1, D8: 1 } },
    { id: "b", label: "陈暮光", dimScores: { D4: 1, D9: 1 } },
    { id: "c", label: "桑湛", dimScores: { D9: 2, D2: -1 } },
    { id: "d", label: "敖子逸本人", dimScores: { D5: 2, D7: 1 } },
  ]},
  { id: "q7", text: "如果你选择的Ta开黑带你上分，你希望他玩什么分路？", options: [
    { id: "a", label: "带飞野王", dimScores: { D9: 2, D3: 1 } },
    { id: "b", label: "贴心辅助保你", dimScores: { D5: 2, D2: 1 } },
    { id: "c", label: "搞笑娱乐局", dimScores: { D1: 2, D4: 2 } },
    { id: "d", label: "随便，开心就行", dimScores: { D7: 1, D5: 1 } },
  ]},
  { id: "q8", text: "你更想和敖子逸一起做什么？", options: [
    { id: "a", label: "一起打游戏开黑", dimScores: { D1: 2, D8: 1 } },
    { id: "b", label: "一起拍戏演对手戏", dimScores: { D4: 2, D5: 1 } },
    { id: "c", label: "一起吃饭逛街", dimScores: { D5: 2, D1: 1 } },
    { id: "d", label: "一起旅行闯荡", dimScores: { D8: 2, D3: 1 } },
  ]},
  { id: "q9", text: "他的综艺表现你最爱哪种？", options: [
    { id: "a", label: "战至巅峰的认真队长", dimScores: { D9: 2, D2: -1 } },
    { id: "b", label: "超燃美食记的快乐干饭人", dimScores: { D5: 2, D7: 1 } },
    { id: "c", label: "城市捉迷藏的快乐小狗", dimScores: { D1: 2, D4: 2, D8: 1 } },
    { id: "d", label: "你就宠ta吧的温柔铲屎官", dimScores: { D5: 2, D2: 1 } },
  ]},
  { id: "q10", text: "敖子逸发新剧，你更期待？", options: [
    { id: "a", label: "古装武侠", dimScores: { D8: 2, D3: 1 } },
    { id: "b", label: "校园甜剧", dimScores: { D7: 2, D5: 2 } },
    { id: "c", label: "热血群像", dimScores: { D3: 2, D5: 1 } },
    { id: "d", label: "现代都市", dimScores: { D7: -1, D2: -1 } },
  ]},
  { id: "q11", text: "池云喊你周末去喝酒，你会？", options: [
    { id: "a", label: "出门浪", dimScores: { D1: 2, D8: 1 } },
    { id: "b", label: "浅喝一点就回", dimScores: { D2: 1, D8: -1 } },
    { id: "c", label: "不去，宅家追剧打游戏", dimScores: { D1: -1, D5: 1 } },
    { id: "d", label: "换个方案，去户外探险", dimScores: { D8: 2, D3: 1 } },
  ]},
  { id: "q12", text: "跟陈暮光去旅行你偏好？", options: [
    { id: "a", label: "说走就走的自由行", dimScores: { D8: 2, D9: 1 } },
    { id: "b", label: "精心做攻略", dimScores: { D2: -1, D9: 1 } },
    { id: "c", label: "跟团省心", dimScores: { D9: -1, D5: 1 } },
    { id: "d", label: "婉拒", dimScores: { D1: -2, D5: -1 } },
  ]},
  { id: "q13", text: "在新世界里，你更想拥有的超能力？", options: [
    { id: "a", label: "任意门/飞/瞬移", dimScores: { D8: 2 } },
    { id: "b", label: "读心，更懂人", dimScores: { D2: 2, D5: 1 } },
    { id: "c", label: "隐身，享受独处", dimScores: { D1: -2, D5: -2 } },
    { id: "d", label: "无敌，保护想护的人", dimScores: { D5: 2, D9: 2 } },
  ]},
  { id: "q14", text: "你更吃哪种告白？", options: [
    { id: "a", label: "直球“我喜欢你”", dimScores: { D4: 2, D3: 1 } },
    { id: "b", label: "默默照顾的行动派", dimScores: { D4: -2, D5: 2, D2: 1 } },
    { id: "c", label: "拐弯试探", dimScores: { D4: -1, D7: 1 } },
    { id: "d", label: "气氛到了自然成", dimScores: { D7: 2, D5: 1 } },
  ]},
  { id: "q15", text: "小敖医生对你傲娇嘴硬，你会？", options: [
    { id: "a", label: "觉得可爱，主动破冰", dimScores: { D4: 2, D5: 1 } },
    { id: "b", label: "和他比傲娇，等他先来哄我", dimScores: { D9: 1, D4: -1 } },
    { id: "c", label: "看穿小心思，但不点破", dimScores: { D2: -1, D4: -1 } },
    { id: "d", label: "二话不说，直接亲上去", dimScores: { D3: 2, D4: 2 } },
  ]},
  { id: "q16", text: "先建设家庭还是先建设社会？", options: [
    { id: "a", label: "家庭", dimScores: { D5: 2, D7: 1 } },
    { id: "b", label: "社会", dimScores: { D9: 2, D2: -1 } },
    { id: "c", label: "躺平，天塌下来高个顶着", dimScores: { D3: -2, D8: -2 } },
    { id: "d", label: "我要毁灭世界", dimScores: { D3: 2, D9: 2 } },
  ]},
  { id: "q17", text: "你更相信？", options: [
    { id: "a", label: "一眼心动", dimScores: { D2: 2, D7: 1 } },
    { id: "b", label: "日久生情", dimScores: { D5: 2, D2: 1 } },
    { id: "c", label: "患难见真情", dimScores: { D5: 2, D3: 1 } },
    { id: "d", label: "缘分天定", dimScores: { D7: 2, D5: 1 } },
  ]},
  { id: "q18", text: "你更想和命定之人？", options: [
    { id: "a", label: "一起闯荡江湖", dimScores: { D8: 2, D3: 1 } },
    { id: "b", label: "一起安稳生活", dimScores: { D5: 2, D8: -1 } },
    { id: "c", label: "一起发大财", dimScores: { D9: 2, D2: -1 } },
    { id: "d", label: "一起疯一起静", dimScores: { D5: 1, D7: 1 } },
  ]},
  { id: "q19", text: "由池云带领的小队行路途中遭遇险境，同伴陷入危机，你会？", options: [
    { id: "a", label: "冷静观察局势，想巧计不靠蛮力", dimScores: { D2: -2, D3: -1, D9: 1 } },
    { id: "b", label: "先缓和气氛，再协助池云解围", dimScores: { D1: 2, D4: 2, D5: 1 } },
    { id: "c", label: "仗义挺身，直接迎敌护队友", dimScores: { D3: 2, D5: 2 } },
    { id: "d", label: "冷眼旁观，暗中布局不暴露", dimScores: { D2: -2, D9: 2, D1: -1 } },
  ]},
  { id: "q20", text: "和发小陈暮光因为小事拌嘴冷战，对方一直不说话，你会？", options: [
    { id: "a", label: "默默留意对方，等合适时机和好", dimScores: { D4: -1, D5: 1 } },
    { id: "b", label: "嘴硬不肯先低头，心里却惦记", dimScores: { D9: 1, D4: -1, D5: 1 } },
    { id: "c", label: "主动开玩笑破冰，珍惜情谊", dimScores: { D1: 2, D4: 2 } },
    { id: "d", label: "直接当面说开，不内耗冷战", dimScores: { D4: 2, D2: -1 } },
  ]},
  { id: "q21", text: "如果你是桑湛，姐姐遇到麻烦，你得知后第一反应？", options: [
    { id: "a", label: "安静了解情况，温柔帮姐姐分析", dimScores: { D2: -1, D4: -1, D5: 1 } },
    { id: "b", label: "嘴上调侃姐姐，但马上出手帮忙", dimScores: { D4: 1, D5: 2 } },
    { id: "c", label: "元气满满安抚，做她的开心果", dimScores: { D1: 2, D4: 2 } },
    { id: "d", label: "立刻站出来护短，扛下事情", dimScores: { D5: 2, D9: 2 } },
  ]},
  { id: "q22", text: "来到男友杨一杉的城市上海生活，和文化差异摩擦，你会？", options: [
    { id: "a", label: "慢慢适应，偶尔别扭但愿磨合", dimScores: { D5: 1, D2: 1 } },
    { id: "b", label: "主动融入，轻松化解尴尬", dimScores: { D1: 2, D4: 2 } },
    { id: "c", label: "坦诚沟通，直接说想法", dimScores: { D4: 2, D2: -1 } },
    { id: "d", label: "保持自我，不愿勉强适应", dimScores: { D9: 2, D1: -1 } },
  ]},
  { id: "q23", text: "和竹马花无忧一起酿酒，遇瓶颈迟迟没突破，你会？", options: [
    { id: "a", label: "静下心慢慢试，不急躁", dimScores: { D2: -1, D3: -1 } },
    { id: "b", label: "嘴上泄气，私下继续反复钻研", dimScores: { D4: -1, D2: -1 } },
    { id: "c", label: "需要花无忧鼓励，帮助调节情绪", dimScores: { D5: 2, D2: 1 } },
    { id: "d", label: "不怕失败，迎难而上，有花无忧兜着", dimScores: { D3: 2, D5: 2 } },
  ]},
  { id: "q24", text: "假设你是乔慈，作为少年将领，军令和想守护的亲人冲突，你会？", options: [
    { id: "a", label: "权衡利弊，谨慎斟酌", dimScores: { D2: -2, D9: 1 } },
    { id: "b", label: "心里纠结，表面依旧逞强", dimScores: { D2: 1, D3: 1 } },
    { id: "c", label: "想两全的办法，不想任何人受伤", dimScores: { D5: 1, D2: 1 } },
    { id: "d", label: "遵从本心，挺身守护想保护的人", dimScores: { D3: 2, D5: 2 } },
  ]},
  { id: "q25", text: "如果你是江墨，流言四起，世人皆对你有误解与偏见，你会？", options: [
    { id: "a", label: "平静等待，相信时间证明自己", dimScores: { D2: -1, D4: -1 } },
    { id: "b", label: "心里不服，先去放把火吓唬一下", dimScores: { D3: 2, D2: 1 } },
    { id: "c", label: "不屑解释，只想与爹爹世世相随", dimScores: { D5: 2, D1: -1 } },
    { id: "d", label: "坦荡直面，当众说出真相", dimScores: { D4: 2, D2: -1 } },
  ]},
  { id: "q26", text: "你身为龙女，想帮敖乙争取龙族龙心支持，族人疑虑议论，你会？", options: [
    { id: "a", label: "静静观察族人态度，等合适时机", dimScores: { D4: -1, D2: -1 } },
    { id: "b", label: "心里着急，温和游说，默默扭转看法", dimScores: { D4: 1, D5: 1 } },
    { id: "c", label: "坚定站在敖乙身侧，坦荡发声作保", dimScores: { D9: 2, D4: 2, D5: 1 } },
    { id: "d", label: "收集佐证、梳理缘由，用事实改变", dimScores: { D2: -2, D6: 1 } },
  ]},
  { id: "q27", text: "追查案件线索遭遇瓶颈，牛猛取证屡屡受阻，你会？", options: [
    { id: "a", label: "沉着梳理线索，冷静复盘找突破", dimScores: { D2: -2, D3: -1 } },
    { id: "b", label: "嘴上略带烦躁，依旧严谨跟进", dimScores: { D3: 1, D2: -1 } },
    { id: "c", label: "调节状态鼓励牛猛，细致排查新思路", dimScores: { D1: 1, D5: 1 } },
    { id: "d", label: "坚守刑侦职责，扛责追查到底", dimScores: { D9: 2, D3: 2 } },
  ]},
  { id: "q28", text: "上官屿追查红衣浮尸连环凶案，身边人身份存疑真假难辨，你会？", options: [
    { id: "a", label: "静观其变，慢慢观察不轻易下论", dimScores: { D2: -1, D1: -1 } },
    { id: "b", label: "表面不动声色，内心充满戒备", dimScores: { D2: -2, D9: 1 } },
    { id: "c", label: "站在上官屿这边，直白提醒提防，必要时以身护他", dimScores: { D5: 2, D4: 2 } },
    { id: "d", label: "默默搜集蛛丝马迹，整理证据帮他分辨", dimScores: { D2: -2, D6: 1 } },
  ]},
  { id: "q29", text: "你是快递员彭河洲，察觉常收件的女孩情绪低落、深陷内耗封闭自己，你会？", options: [
    { id: "a", label: "保持分寸，不贸然打扰，静待她敞开心扉", dimScores: { D4: -2, D5: 1 } },
    { id: "b", label: "嘴上不善表达，却悄悄留心她的状态", dimScores: { D4: -2, D2: 1, D5: 1 } },
    { id: "c", label: "轻松搭话，分享日常小事驱散沉闷", dimScores: { D1: 2, D4: 2 } },
    { id: "d", label: "寻找她感兴趣的小事，帮她找回热爱", dimScores: { D5: 2, D6: 1, D8: 1 } },
  ]},
  { id: "q30", text: "你情绪低落独自到咖啡店发呆，希望咖啡师小李察觉后怎么做？", options: [
    { id: "a", label: "安静做好咖啡，不刻意搭话给独处空间", dimScores: { D4: -2, D1: -1 } },
    { id: "b", label: "不太会安慰，但悄悄多留意你的状态", dimScores: { D4: -2, D2: 1, D5: 1 } },
    { id: "c", label: "轻松搭话，分享趣事约打游戏逗你开心", dimScores: { D1: 2, D4: 2 } },
    { id: "d", label: "找你们都喜欢的爱好话题，慢慢拉近距离", dimScores: { D5: 2, D6: 1 } },
  ]},
  { id: "q31", text: "险境之中马红俊被邪火困扰、承受异样眼光，你会？", options: [
    { id: "a", label: "安静陪在一旁，给他空间不催促", dimScores: { D4: -1, D5: 1 } },
    { id: "b", label: "冷眼观察，提防邪火失控的风险", dimScores: { D2: -1, D9: 1 } },
    { id: "c", label: "用轻松玩笑逗他开心，默默留意状态", dimScores: { D1: 2, D4: 2 } },
    { id: "d", label: "和他一起找调理邪火的办法，危难挡身前", dimScores: { D5: 2, D3: 1 } },
  ]},
  { id: "q32", text: "末日副本你和卢泽结伴求生，他双重人格随时可能失控，你会？", options: [
    { id: "a", label: "安静陪着他，等他自己慢慢平复", dimScores: { D4: -1, D5: 1 } },
    { id: "b", label: "心里担心，嘴上不会安慰，默默护住他", dimScores: { D4: -2, D5: 2, D2: 1 } },
    { id: "c", label: "用轻松的话安抚他，帮他稳住情绪", dimScores: { D1: 2, D4: 2 } },
    { id: "d", label: "坚定站在他这边，无论哪一面都不丢下", dimScores: { D5: 2, D9: 1 } },
  ]},
  { id: "q33", text: "和敖子逸组队打游戏，逆风局全队劣势只有他一只大腿，你期待他的反应是？", options: [
    { id: "a", label: "稳住心态，冷静复盘找翻盘机会", dimScores: { D2: -2, D3: -1 } },
    { id: "b", label: "鼓励队友，缓解紧张不互相指责", dimScores: { D1: 2, D5: 2 } },
    { id: "c", label: "主动承担指挥，扛下全队输赢", dimScores: { D9: 2, D4: 1 } },
    { id: "d", label: "全力操作，主动开团拼胜利", dimScores: { D3: 2, D8: 1 } },
  ]},
];
