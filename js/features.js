/* =========================================================
   AI ATLAS · 공통 기능
   1) 즐겨찾기 (내 AI 툴)  2) 조건 정보 (한국어 지원 · 웹에서 바로)
   3) 상황별 추천 세트    4) 추천 엔진 (챗봇·퀴즈가 사용)
   ========================================================= */

/* ---------- 서비스 고유 키 ---------- */
const svcKey = s => s.name + "|" + s.cat;
const findSvc = key => SERVICES.find(s => svcKey(s) === key);
const findByName = name => SERVICES.find(s => s.name === name);

/* ---------- 1. 즐겨찾기 ---------- */
const FAV_KEY = "ai-atlas-favs";
const Fav = {
  list() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return this._mem || []; }
  },
  save(arr) {
    this._mem = arr;
    try { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); } catch (e) {}
    updateFavCount();
    document.dispatchEvent(new CustomEvent("favchange"));
  },
  has(key) { return this.list().includes(key); },
  toggle(key) {
    const arr = this.list();
    const i = arr.indexOf(key);
    i >= 0 ? arr.splice(i, 1) : arr.push(key);
    this.save(arr);
    return i < 0;
  }
};

function updateFavCount() {
  const n = Fav.list().length;
  document.querySelectorAll(".my-count").forEach(el => { el.textContent = n; el.hidden = n === 0; });
}

/* 하트 버튼 HTML (카드·챗봇 공용) */
function favBtnHTML(s) {
  const on = Fav.has(svcKey(s));
  return `<button type="button" class="icon-btn fav-btn" data-fav="${svcKey(s).replace(/"/g, "&quot;")}" aria-pressed="${on}" aria-label="${t("fav.toggle")}" title="${t(on ? "fav.remove" : "fav.add")}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.6-9.2C.9 7.9 3.1 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.5 0 5.7 3.4 4.2 6.8-2.1 4.6-9.6 9.2-9.6 9.2z"/></svg>
  </button>`;
}

/* 어디서든 하트 버튼을 누르면 저장 */
document.addEventListener("click", e => {
  const b = e.target.closest(".fav-btn");
  if (!b) return;
  e.preventDefault(); e.stopPropagation();
  const on = Fav.toggle(b.dataset.fav);
  document.querySelectorAll(`.fav-btn[data-fav="${CSS.escape(b.dataset.fav)}"]`).forEach(x => {
    x.setAttribute("aria-pressed", String(on));
    x.title = t(on ? "fav.remove" : "fav.add");
  });
  showToast(t(on ? "fav.added" : "fav.removed"));
});

/* 작은 알림 */
function showToast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("is-on"), 1800);
}

/* ---------- 2. 조건 정보 ---------- */
// 한국어로 쓰기 좋은 서비스 (한국어 화면 또는 한국어 입력·결과 품질이 좋음)
const KO_FRIENDLY = new Set([
  "ChatGPT", "Claude", "Gemini", "Microsoft Copilot", "Grok", "뤼튼", "클로바X", "에이닷", "Poe",
  "Perplexity", "Google AI 모드", "ChatGPT 검색", "네이버 AI 브리핑", "Felo", "ChatGPT 딥 리서치", "Gemini Deep Research",
  "NotebookLM", "Claude 리서치", "Perplexity 딥 리서치", "라이너",
  "바른한글 맞춤법 검사기", "DeepL 번역", "파파고", "Google 번역", "Immersive Translate", "플리토", "XL8",
  "ChatGPT 이미지", "Gemini 이미지 (Nano Banana)", "Adobe Firefly", "Canva 매직 스튜디오", "미리캔버스 AI", "Adobe Express", "망고보드", "Photoroom", "Picsart",
  "Google Flow (Veo)", "Kling AI", "Vrew", "CapCut", "HeyGen", "AI Studios (딥브레인AI)",
  "ElevenLabs", "타입캐스트", "클로바더빙", "페르소 AI", "HeyGen 영상 번역", "YouTube 자동 더빙", "TurboScribe",
  "Suno", "아임웹", "Wix", "Lovable", "Cursor", "Claude Code",
  "Gamma", "Genspark AI 슬라이드", "Copilot in PowerPoint", "Gemini in Google Slides", "Canva 매직 디자인",
  "Notion AI", "Copilot in Word", "Gemini in Google Docs", "릴리스AI (Lilys AI)", "한컴어시스턴트",
  "클로바노트", "다글로", "티로 (Tiro)", "에이닷 노트", "Notta", "Zoom AI Companion", "Teams Copilot",
  "ChatGPT for Excel & Sheets", "Copilot in Excel", "Claude for Excel", "Gemini in Sheets",
  "ChatGPT 에이전트", "Gemini Agent", "Genspark", "ChatGPT Atlas", "Perplexity Comet", "Microsoft 365 Copilot 에이전트"
]);
// 설치가 필요한 서비스 (프로그램·앱·확장 프로그램·기기·직접 설치)
const NEEDS_INSTALL = new Set([
  "LM Studio", "Ollama", "Whisper", "AudioCraft (Meta)", "Stable Diffusion", "Cursor", "Windsurf", "Kiro", "Google Antigravity",
  "JetBrains AI (Junie)", "Cline", "Claude Code", "Topaz Photo", "Topaz Video", "iZotope RX", "NVIDIA Broadcast", "Filmora",
  "Premiere Pro 생성형 확장", "Photoshop 생성형 채우기", "Cascadeur", "Krisp", "Wispr Flow", "Granola", "Plaud", "Dia",
  "Opera Neon", "ChatGPT Atlas", "Perplexity Comet", "Browser Use", "Twistly", "Claude in Chrome", "Tactiq", "Bardeen"
]);

const CONDITIONS = [
  { id: "free", test: s => s.price !== "paid" },
  { id: "freeOnly", test: s => s.price === "free" },   // 퀴즈 전용 (완전 무료)
  { id: "ko",   test: s => KO_FRIENDLY.has(s.name) },
  { id: "web",  test: s => !NEEDS_INSTALL.has(s.name) },
  { id: "star", test: s => s.star }
];
const passConditions = (s, active) => CONDITIONS.every(c => !active[c.id] || c.test(s));

/* ---------- 3. 상황별 추천 세트 ---------- */
const SETS = [
  {
    id: "student", icon: "img/3d/cat-research.png",
    title: { ko: "대학생 과제·발표 세트", en: "College assignment kit", ja: "大学生の課題・発表セット", zh: "大学生作业·演讲套装" },
    desc:  { ko: "자료 조사부터 발표까지, 리포트 한 편을 끝내는 순서", en: "From research to presentation: the route to finish a report", ja: "資料調査から発表まで、レポートを仕上げる順番", zh: "从查资料到做演讲，完成一份报告的路线" },
    steps: [
      { name: { ko: "자료 조사", en: "Research", ja: "資料調査", zh: "查资料" }, tools: ["Perplexity", "NotebookLM"] },
      { name: { ko: "논문 근거", en: "Find evidence", ja: "論文の根拠", zh: "论文依据" }, tools: ["Consensus"] },
      { name: { ko: "글 다듬기", en: "Polish writing", ja: "文章を整える", zh: "润色文章" }, tools: ["Claude", "바른한글 맞춤법 검사기"] },
      { name: { ko: "발표 자료", en: "Slides", ja: "発表資料", zh: "演示文稿" }, tools: ["Gamma", "Napkin AI"] }
    ]
  },
  {
    id: "youtuber", icon: "img/3d/cat-video.png",
    title: { ko: "유튜버 시작 세트", en: "YouTuber starter kit", ja: "YouTuberスタートセット", zh: "YouTuber入门套装" },
    desc:  { ko: "대본, 편집, 썸네일, 배경음악까지 영상 하나 올리는 순서", en: "Script, edit, thumbnail and music: the route to your first upload", ja: "台本・編集・サムネ・BGMまで、動画を1本上げる順番", zh: "脚本、剪辑、缩略图、配乐，上传第一支视频的路线" },
    steps: [
      { name: { ko: "대본 쓰기", en: "Write script", ja: "台本", zh: "写脚本" }, tools: ["ChatGPT"] },
      { name: { ko: "편집·자막", en: "Edit & captions", ja: "編集・字幕", zh: "剪辑·字幕" }, tools: ["Vrew", "CapCut"] },
      { name: { ko: "썸네일", en: "Thumbnail", ja: "サムネイル", zh: "缩略图" }, tools: ["미리캔버스 AI"] },
      { name: { ko: "배경음악", en: "Background music", ja: "BGM", zh: "背景音乐" }, tools: ["Soundraw"] },
      { name: { ko: "숏폼 만들기", en: "Make Shorts", ja: "ショート化", zh: "做短视频" }, tools: ["OpusClip"] }
    ]
  },
  {
    id: "office", icon: "img/3d/cat-productivity.png",
    title: { ko: "직장인 회의·보고 세트", en: "Office meeting & report kit", ja: "会社員の会議・報告セット", zh: "职场会议·汇报套装" },
    desc:  { ko: "회의를 기록하고 보고서와 발표까지 이어지는 업무 흐름", en: "Record a meeting and turn it into a report and slides", ja: "会議を記録し、報告書と発表につなげる流れ", zh: "记录会议，再整理成报告和演示的流程" },
    steps: [
      { name: { ko: "회의 기록", en: "Meeting notes", ja: "会議の記録", zh: "会议记录" }, tools: ["클로바노트"] },
      { name: { ko: "보고서", en: "Report", ja: "報告書", zh: "报告" }, tools: ["Copilot in Word", "Notion AI"] },
      { name: { ko: "데이터 정리", en: "Data", ja: "データ整理", zh: "整理数据" }, tools: ["ChatGPT for Excel & Sheets"] },
      { name: { ko: "보고 발표", en: "Present", ja: "報告発表", zh: "汇报演示" }, tools: ["Gamma"] },
      { name: { ko: "반복 업무", en: "Automate", ja: "繰り返し業務", zh: "重复工作" }, tools: ["Zapier"] }
    ]
  },
  {
    id: "startup", icon: "img/3d/cat-image.png",
    title: { ko: "1인 창업·쇼핑몰 세트", en: "Solo business & shop kit", ja: "ひとり起業・ネットショップセット", zh: "个人创业·网店套装" },
    desc:  { ko: "로고부터 상품 사진, 홈페이지, 홍보까지 가게 하나 여는 순서", en: "Logo, product photos, website and promotion: the route to open shop", ja: "ロゴから商品写真、HP、宣伝まで、お店を開く順番", zh: "从标志、商品图、网站到推广，开一家店的路线" },
    steps: [
      { name: { ko: "로고", en: "Logo", ja: "ロゴ", zh: "标志" }, tools: ["Looka"] },
      { name: { ko: "상품 사진", en: "Product photos", ja: "商品写真", zh: "商品图" }, tools: ["Photoroom"] },
      { name: { ko: "상세페이지", en: "Detail page", ja: "商品ページ", zh: "详情页" }, tools: ["망고보드"] },
      { name: { ko: "홈페이지", en: "Website", ja: "ホームページ", zh: "网站" }, tools: ["아임웹"] },
      { name: { ko: "홍보 문구", en: "Copy", ja: "宣伝文", zh: "宣传文案" }, tools: ["Copy.ai"] }
    ]
  },
  {
    id: "dev", icon: "img/3d/cat-coding.png",
    title: { ko: "개발 입문 세트", en: "Coding starter kit", ja: "開発入門セット", zh: "编程入门套装" },
    desc:  { ko: "질문하며 배우고, 직접 만들어 보고, 리뷰까지 받는 순서", en: "Learn by asking, build something, then get it reviewed", ja: "質問して学び、作ってみて、レビューまで受ける順番", zh: "边问边学、动手做、再接受审查的路线" },
    steps: [
      { name: { ko: "개념 질문", en: "Ask concepts", ja: "概念の質問", zh: "请教概念" }, tools: ["Claude"] },
      { name: { ko: "말로 앱 만들기", en: "Build by prompt", ja: "言葉でアプリ", zh: "用说的做应用" }, tools: ["Lovable"] },
      { name: { ko: "코드 에디터", en: "Code editor", ja: "コードエディター", zh: "代码编辑器" }, tools: ["Cursor"] },
      { name: { ko: "코드 리뷰", en: "Code review", ja: "コードレビュー", zh: "代码审查" }, tools: ["CodeRabbit"] }
    ]
  },
  {
    id: "global", icon: "img/3d/cat-writing.png",
    title: { ko: "외국어·해외 소통 세트", en: "Global communication kit", ja: "外国語・海外コミュニケーションセット", zh: "外语·海外沟通套装" },
    desc:  { ko: "번역하고, 다듬고, 회의와 영상까지 다른 언어로", en: "Translate, polish, and take meetings and videos into other languages", ja: "翻訳して整え、会議や動画まで別の言語で", zh: "翻译、润色，会议和视频也能换成其他语言" },
    steps: [
      { name: { ko: "번역", en: "Translate", ja: "翻訳", zh: "翻译" }, tools: ["DeepL 번역", "파파고"] },
      { name: { ko: "영어 교정", en: "English editing", ja: "英文校正", zh: "英文校对" }, tools: ["Grammarly"] },
      { name: { ko: "외국어 회의", en: "Multilingual meetings", ja: "外国語の会議", zh: "外语会议" }, tools: ["Notta"] },
      { name: { ko: "영상 더빙", en: "Dub videos", ja: "動画の吹き替え", zh: "视频配音" }, tools: ["HeyGen 영상 번역"] }
    ]
  }
];
const getSet = id => SETS.find(s => s.id === id);
const setTools = set => set.steps.flatMap(st => st.tools.map(findByName).filter(Boolean));

/* ---------- 4. 추천 엔진 ----------
   문장 속 단어를 아래 사전과 비교해서 분야·하위 분류를 찾고,
   서비스의 소개·추천 용도와 겹치는 단어가 많을수록 점수를 높입니다. */
const INTENTS = [
  { k: ["자막", "subtitle", "caption", "字幕"], cat: "video", sub: "edit" },
  { k: ["숏폼", "쇼츠", "릴스", "shorts", "reels", "ショート", "短视频"], cat: "video", sub: "edit" },
  { k: ["영상 편집", "편집", "컷", "edit video", "動画編集", "剪辑"], cat: "video", sub: "edit" },
  { k: ["영상", "동영상", "비디오", "video", "動画", "视频"], cat: "video", sub: "generate" },
  { k: ["아바타", "avatar", "アバター", "数字人"], cat: "video", sub: "avatar" },
  { k: ["애니메이션", "모션", "animation", "motion", "アニメ", "动画"], cat: "video", sub: "motion" },
  { k: ["발표", "ppt", "피피티", "슬라이드", "프레젠테이션", "presentation", "slides", "スライド", "プレゼン", "幻灯片", "演示"], cat: "productivity", sub: "slides" },
  { k: ["회의", "회의록", "미팅", "녹취", "meeting", "minutes", "会議", "議事録", "会议"], cat: "productivity", sub: "meeting" },
  { k: ["엑셀", "시트", "스프레드시트", "데이터 분석", "통계", "excel", "spreadsheet", "sheet", "data", "エクセル", "表格", "数据"], cat: "productivity", sub: "sheets" },
  { k: ["문서", "보고서", "노트", "요약", "pdf", "report", "document", "notes", "summar", "文書", "報告書", "要約", "文档", "总结"], cat: "productivity", sub: "docs" },
  { k: ["자동화", "반복", "연동", "automate", "automation", "workflow", "自動化", "自动化"], cat: "automation", sub: "nocode" },
  { k: ["에이전트", "대신 해", "agent", "エージェント", "智能体"], cat: "automation", sub: "agents" },
  { k: ["브라우저", "browser", "ブラウザ", "浏览器"], cat: "automation", sub: "browser" },
  { k: ["챗봇 만들", "봇 만들", "build a bot", "build an agent"], cat: "automation", sub: "builder" },
  { k: ["번역", "통역", "translate", "translation", "翻訳", "通訳", "翻译"], cat: "writing", sub: "translate" },
  { k: ["맞춤법", "교정", "문법", "띄어쓰기", "grammar", "proofread", "spelling", "校正", "文法", "校对", "语法"], cat: "writing", sub: "proofread" },
  { k: ["블로그", "마케팅", "광고", "카피", "문구", "blog", "marketing", "copy", "ad ", "ブログ", "広告", "博客", "营销", "文案"], cat: "writing", sub: "marketing" },
  { k: ["자기소개서", "자소서", "에세이", "글쓰기", "writing", "essay", "cover letter", "文章", "写作"], cat: "chatbot", sub: "global" },
  { k: ["논문", "학술", "연구", "paper", "academic", "research paper", "論文", "论文", "学术"], cat: "research", sub: "academic" },
  { k: ["검색", "조사", "리서치", "출처", "search", "research", "source", "検索", "調査", "搜索", "调研"], cat: "research", sub: "search" },
  { k: ["심층", "보고서 조사", "deep research", "ディープリサーチ", "深度"], cat: "research", sub: "deep" },
  { k: ["로고", "브랜딩", "logo", "branding", "ロゴ", "标志"], cat: "image", sub: "logo" },
  { k: ["썸네일", "카드뉴스", "포스터", "sns", "인스타", "thumbnail", "poster", "instagram", "サムネ", "缩略图", "海报"], cat: "image", sub: "sns" },
  { k: ["배경 제거", "누끼", "보정", "사진 편집", "remove background", "photo edit", "upscale", "背景除去", "修图", "抠图"], cat: "image", sub: "edit" },
  { k: ["ui", "화면 디자인", "와이어프레임", "시안", "mockup", "wireframe", "ワイヤーフレーム", "原型"], cat: "image", sub: "ui" },
  { k: ["그림", "이미지", "일러스트", "image", "illustration", "picture", "drawing", "画像", "イラスト", "图片", "插画", "图像"], cat: "image", sub: "generate" },
  { k: ["더빙", "dubbing", "dub", "吹き替え", "配音"], cat: "audio", sub: "dubbing" },
  { k: ["목소리", "내레이션", "성우", "음성 합성", "읽어", "tts", "voice", "narration", "ナレーション", "音声合成", "旁白", "语音合成"], cat: "audio", sub: "tts" },
  { k: ["받아쓰기", "녹음", "텍스트로", "speech to text", "transcri", "文字起こし", "转写", "录音"], cat: "audio", sub: "stt" },
  { k: ["잡음", "노이즈", "음질", "noise", "audio quality", "ノイズ", "降噪", "噪音"], cat: "audio", sub: "clean" },
  { k: ["노래", "작곡", "음악", "song", "music", "compose", "歌", "作曲", "音楽", "歌曲", "音乐"], cat: "music", sub: "song" },
  { k: ["배경음악", "bgm", "background music", "背景音乐"], cat: "music", sub: "bgm" },
  { k: ["효과음", "sound effect", "sfx", "効果音", "音效"], cat: "music", sub: "sfx" },
  { k: ["보컬 분리", "반주", "mr", "stem", "伴奏", "分離", "分离"], cat: "music", sub: "tools" },
  { k: ["홈페이지", "웹사이트", "사이트", "쇼핑몰", "website", "homepage", "online store", "ホームページ", "网站", "网店"], cat: "coding", sub: "website" },
  { k: ["앱 만들", "웹앱", "어플", "app", "アプリ", "应用"], cat: "coding", sub: "builder" },
  { k: ["코딩", "코드", "프로그래밍", "개발", "coding", "code", "programming", "developer", "コード", "プログラミング", "编程", "代码"], cat: "coding", sub: "coding" },
  { k: ["코드 리뷰", "code review", "コードレビュー", "代码审查"], cat: "coding", sub: "review" },
  { k: ["챗봇", "질문", "대화", "chatbot", "chat", "assistant", "チャット", "聊天"], cat: "chatbot", sub: "global" }
];
const COND_WORDS = {
  free: ["무료", "공짜", "돈 안", "free", "無料", "免费"],
  ko:   ["한국어", "한글", "korean", "韓国語", "韩语"],
  web:  ["설치 없이", "웹에서", "브라우저에서", "no install", "インストール不要", "无需安装"]
};

function detectConditions(text) {
  const low = text.toLowerCase();
  const out = {};
  for (const id in COND_WORDS) if (COND_WORDS[id].some(w => low.includes(w))) out[id] = true;
  return out;
}

function detectIntents(text) {
  const low = " " + text.toLowerCase() + " ";
  const hits = [];
  INTENTS.forEach(it => {
    const n = it.k.filter(w => low.includes(w)).length;
    if (n) hits.push({ ...it, n: n + (it.k.some(w => w.includes(" ") && low.includes(w)) ? 1 : 0) });
  });
  return hits.sort((a, b) => b.n - a.n);
}

function serviceText(s) {
  return [s.name, s.intro.ko, s.intro.en, pick(s.intro), ...(s.uses.ko || []), ...(s.uses.en || []), ...pick(s.uses)].join(" ").toLowerCase();
}

/* 추천 실행: { list, intents, conds } 반환 */
function recommend({ text = "", cat, sub, conds = {}, limit = 3 } = {}) {
  const intents = text ? detectIntents(text) : [];
  const allConds = { ...detectConditions(text), ...conds };
  const words = text.toLowerCase().split(/[\s,.!?~·]+/).filter(w => w.length >= 2);
  const scored = SERVICES
    .filter(s => passConditions(s, allConds))
    .map(s => {
      let score = 0;
      if (cat && s.cat === cat) score += 10;
      if (sub && s.sub === sub) score += 12;
      intents.forEach((it, i) => {
        const w = i === 0 ? 1 : .6;
        if (s.cat === it.cat) score += 5 * w;
        if (s.cat === it.cat && s.sub === it.sub) score += 9 * w * it.n;
      });
      const txt = serviceText(s);
      words.forEach(w => { if (txt.includes(w)) score += 1.5; });
      if (score > 0 && s.star) score += 3;
      if (score > 0 && allConds.ko && KO_FRIENDLY.has(s.name)) score += 1;
      if (score > 0 && s.price === "free") score += allConds.free ? 1.5 : 0;
      return { s, score };
    })
    .filter(x => x.score > 4)
    .sort((a, b) => b.score - a.score);
  // 같은 이름이 두 분야에 있으면 하나만
  const seen = new Set();
  const list = [];
  for (const { s } of scored) {
    if (seen.has(s.name)) continue;
    seen.add(s.name); list.push(s);
    if (list.length >= limit) break;
  }
  return { list, intents, conds: allConds, top: intents[0] || (cat ? { cat, sub } : null) };
}

document.addEventListener("DOMContentLoaded", updateFavCount);
