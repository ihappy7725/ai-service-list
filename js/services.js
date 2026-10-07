/* =========================================================
   AI ATLAS · 분야와 서비스 데이터
   ---------------------------------------------------------
   ▸ 서비스 추가 방법 (맨 아래 SERVICES 목록에 한 줄씩)
     S("이름", "분야id", "하위분류id", "주소", "요금", 대표여부,
       { ko: [한 줄 소개, [장점...], [아쉬운 점...], [추천 용도...]],
         en: [...], ja: [...], zh: [...] },
       [ ["플랜 이름", "가격", "기간"], ... ]);
   ▸ 플랜 표기
     - 이름: "Pro"처럼 그대로 쓰거나 "@free"(무료) "@paid"(유료 플랜) "@ent"(기업용) "@device"(기기) "@selfhost"(직접 설치)
     - 가격: "$20", "₩11,900" 처럼 쓰거나 null(공식 사이트 확인) "payg"(사용량만큼) "quote"(도입 문의) "incl"(요금제에 포함)
     - 기간: "mo"(월) "yr"(년) "user"(1인당 월) "once"(1회 구매) "day"(일), 없으면 생략
   ▸ 요금: "free"(무료) · "mix"(무료+유료) · "paid"(유료)
   ▸ 대표여부: true 면 이름 옆에 ★ 표시, 분야 맨 위로 정렬
   ▸ 기준일: 2026년 10월 (요금은 자주 바뀌니 게시 전 확인)
   ========================================================= */

const CATEGORIES = [
  {
    id: "chatbot", en: "Chatbot", icon: "img/3d/cat-chatbot.png",
    name:  { ko: "종합 AI·챗봇", en: "AI Assistants & Chatbots", ja: "総合AI・チャットボット", zh: "综合AI·聊天机器人" },
    title: { ko: "질문하면 답이 나오는", en: "Ask anything, get answers", ja: "聞けば答えが返ってくる", zh: "有问必答" },
    desc:  { ko: "ChatGPT, Claude처럼 질문, 글쓰기, 분석까지 폭넓게 돕는 AI 비서예요.",
             en: "General AI assistants like ChatGPT and Claude that help with questions, writing and analysis.",
             ja: "ChatGPTやClaudeのように、質問・文章作成・分析まで幅広く手伝うAIアシスタントです。",
             zh: "像ChatGPT、Claude这样，从提问、写作到分析都能帮忙的AI助手。" },
    subs: [
      { id: "global", name: { ko: "글로벌 AI 챗봇", en: "Global chatbots", ja: "グローバルAIチャットボット", zh: "全球AI聊天机器人" } },
      { id: "korean", name: { ko: "국내 AI 서비스", en: "Korean services", ja: "韓国のAIサービス", zh: "韩国AI服务" } },
      { id: "multi",  name: { ko: "멀티 모델·로컬 실행", en: "Multi-model & local", ja: "マルチモデル・ローカル実行", zh: "多模型·本地运行" } }
    ]
  },
  {
    id: "research", en: "Research", icon: "img/3d/cat-research.png",
    name:  { ko: "검색·리서치", en: "Search & Research", ja: "検索・リサーチ", zh: "搜索·调研" },
    title: { ko: "출처까지 찾아주는", en: "Answers with sources", ja: "出典まで探してくれる", zh: "连出处都帮你找" },
    desc:  { ko: "자료 검색, 출처 확인, 논문 탐색, 심층 조사를 돕는 AI예요.",
             en: "AI that searches, checks sources, explores papers and runs deep research.",
             ja: "資料検索、出典確認、論文探索、深いリサーチを手伝うAIです。",
             zh: "帮助检索资料、核对出处、查找论文和深度调研的AI。" },
    subs: [
      { id: "search",   name: { ko: "AI 검색엔진", en: "AI search engines", ja: "AI検索エンジン", zh: "AI搜索引擎" } },
      { id: "deep",     name: { ko: "심층 리서치·자료 정리", en: "Deep research & notes", ja: "ディープリサーチ・資料整理", zh: "深度调研·资料整理" } },
      { id: "academic", name: { ko: "논문·학술 탐색", en: "Papers & academic", ja: "論文・学術検索", zh: "论文·学术检索" } }
    ]
  },
  {
    id: "writing", en: "Writing", icon: "img/3d/cat-writing.png",
    name:  { ko: "글쓰기·번역", en: "Writing & Translation", ja: "文章作成・翻訳", zh: "写作·翻译" },
    title: { ko: "더 잘 쓰고 정확히 옮기는", en: "Write better, translate right", ja: "うまく書いて、正確に訳す", zh: "写得更好，译得更准" },
    desc:  { ko: "블로그·광고 문구 작성, 맞춤법 교정, 번역을 돕는 AI예요.",
             en: "AI for blog posts and ad copy, proofreading and translation.",
             ja: "ブログ・広告コピーの作成、校正、翻訳を手伝うAIです。",
             zh: "帮助撰写博客和广告文案、校对与翻译的AI。" },
    subs: [
      { id: "marketing", name: { ko: "블로그·마케팅 문구", en: "Blogs & marketing copy", ja: "ブログ・マーケティング文", zh: "博客·营销文案" } },
      { id: "proofread", name: { ko: "교정·문장 다듬기", en: "Proofreading & editing", ja: "校正・文章の推敲", zh: "校对·润色" } },
      { id: "translate", name: { ko: "번역", en: "Translation", ja: "翻訳", zh: "翻译" } }
    ]
  },
  {
    id: "image", en: "Image & Design", icon: "img/3d/cat-image.png",
    name:  { ko: "이미지·디자인", en: "Image & Design", ja: "画像・デザイン", zh: "图像·设计" },
    title: { ko: "말하면 그려주는", en: "Describe it, see it", ja: "言葉で描いてくれる", zh: "说出来就能画出来" },
    desc:  { ko: "이미지 생성·편집, 로고, 썸네일, 디자인 시안을 만드는 AI예요.",
             en: "AI that creates and edits images, logos, thumbnails and design drafts.",
             ja: "画像の生成・編集、ロゴ、サムネイル、デザイン案をつくるAIです。",
             zh: "生成和编辑图像、制作标志、缩略图与设计稿的AI。" },
    subs: [
      { id: "generate", name: { ko: "이미지 생성", en: "Image generation", ja: "画像生成", zh: "图像生成" } },
      { id: "edit",     name: { ko: "이미지 편집·보정", en: "Photo editing", ja: "画像編集・補正", zh: "图片编辑·修图" } },
      { id: "logo",     name: { ko: "로고·브랜딩", en: "Logos & branding", ja: "ロゴ・ブランディング", zh: "标志·品牌" } },
      { id: "sns",      name: { ko: "썸네일·SNS 디자인", en: "Thumbnails & social", ja: "サムネイル・SNSデザイン", zh: "缩略图·社媒设计" } },
      { id: "ui",       name: { ko: "UI·디자인 시안", en: "UI & mockups", ja: "UI・デザイン案", zh: "UI·设计稿" } }
    ]
  },
  {
    id: "video", en: "Video", icon: "img/3d/cat-video.png",
    name:  { ko: "영상·애니메이션", en: "Video & Animation", ja: "動画・アニメーション", zh: "视频·动画" },
    title: { ko: "글 한 줄이 영상이 되는", en: "From a line of text to video", ja: "一行の文章が動画になる", zh: "一句话变成视频" },
    desc:  { ko: "영상 생성·편집, AI 아바타, 자막, 모션을 만드는 AI예요.",
             en: "AI for generating and editing video, avatars, subtitles and motion.",
             ja: "動画の生成・編集、AIアバター、字幕、モーションをつくるAIです。",
             zh: "生成和剪辑视频、制作数字人、字幕与动效的AI。" },
    subs: [
      { id: "generate", name: { ko: "영상 생성", en: "Video generation", ja: "動画生成", zh: "视频生成" } },
      { id: "edit",     name: { ko: "영상 편집·자막·숏폼", en: "Editing, captions & shorts", ja: "動画編集・字幕・ショート", zh: "剪辑·字幕·短视频" } },
      { id: "avatar",   name: { ko: "AI 아바타·발표자", en: "AI avatars & presenters", ja: "AIアバター・プレゼンター", zh: "AI数字人·主讲人" } },
      { id: "motion",   name: { ko: "애니메이션·모션", en: "Animation & motion", ja: "アニメーション・モーション", zh: "动画·动效" } }
    ]
  },
  {
    id: "audio", en: "Voice & Audio", icon: "img/3d/cat-audio.png",
    name:  { ko: "음성·오디오", en: "Voice & Audio", ja: "音声・オーディオ", zh: "语音·音频" },
    title: { ko: "목소리를 만들고 다듬는", en: "Create and clean up voices", ja: "声をつくり、整える", zh: "生成并打磨声音" },
    desc:  { ko: "음성 합성, 더빙, 음성 인식, 잡음 제거를 돕는 AI예요.",
             en: "AI for text-to-speech, dubbing, speech recognition and noise removal.",
             ja: "音声合成、吹き替え、音声認識、ノイズ除去を手伝うAIです。",
             zh: "用于语音合成、配音、语音识别和降噪的AI。" },
    subs: [
      { id: "tts",     name: { ko: "음성 합성·목소리 복제", en: "Text to speech & voice cloning", ja: "音声合成・声のクローン", zh: "语音合成·声音克隆" } },
      { id: "dubbing", name: { ko: "AI 더빙", en: "AI dubbing", ja: "AI吹き替え", zh: "AI配音" } },
      { id: "stt",     name: { ko: "음성 인식·받아쓰기", en: "Speech to text", ja: "音声認識・文字起こし", zh: "语音识别·转写" } },
      { id: "clean",   name: { ko: "잡음 제거·음질 개선", en: "Noise removal & enhancement", ja: "ノイズ除去・音質改善", zh: "降噪·音质增强" } }
    ]
  },
  {
    id: "music", en: "Music", icon: "img/3d/cat-music.png",
    name:  { ko: "음악·작곡", en: "Music & Composition", ja: "音楽・作曲", zh: "音乐·作曲" },
    title: { ko: "아이디어가 노래가 되는", en: "Ideas into songs", ja: "アイデアが歌になる", zh: "灵感变成歌曲" },
    desc:  { ko: "노래, 배경음악, 효과음을 만드는 AI예요.",
             en: "AI that makes songs, background music and sound effects.",
             ja: "歌、BGM、効果音をつくるAIです。",
             zh: "制作歌曲、背景音乐和音效的AI。" },
    subs: [
      { id: "song",  name: { ko: "노래 생성", en: "Song generation", ja: "歌の生成", zh: "歌曲生成" } },
      { id: "bgm",   name: { ko: "배경음악", en: "Background music", ja: "BGM", zh: "背景音乐" } },
      { id: "sfx",   name: { ko: "효과음", en: "Sound effects", ja: "効果音", zh: "音效" } },
      { id: "tools", name: { ko: "작곡 보조·음원 분리", en: "Production & stem splitting", ja: "作曲補助・音源分離", zh: "作曲辅助·音轨分离" } }
    ]
  },
  {
    id: "coding", en: "Coding & Web", icon: "img/3d/cat-coding.png",
    name:  { ko: "코딩·웹 제작", en: "Coding & Web Building", ja: "コーディング・Web制作", zh: "编程·网站制作" },
    title: { ko: "말로 만드는 앱과 웹사이트", en: "Apps and sites from plain words", ja: "言葉でつくるアプリとサイト", zh: "用说的做出应用和网站" },
    desc:  { ko: "코드 작성·수정부터 앱·웹사이트 제작까지 돕는 AI예요.",
             en: "AI that writes and fixes code and builds apps and websites.",
             ja: "コードの作成・修正から、アプリやWebサイトの制作まで手伝うAIです。",
             zh: "从编写、修改代码到制作应用和网站都能帮忙的AI。" },
    subs: [
      { id: "coding",  name: { ko: "AI 코딩 도구·에이전트", en: "AI coding tools & agents", ja: "AIコーディングツール・エージェント", zh: "AI编程工具·智能体" } },
      { id: "builder", name: { ko: "말로 만드는 앱 빌더", en: "Prompt-to-app builders", ja: "言葉で作るアプリビルダー", zh: "用说的做应用" } },
      { id: "website", name: { ko: "웹사이트 빌더", en: "Website builders", ja: "Webサイトビルダー", zh: "网站搭建" } },
      { id: "review",  name: { ko: "코드 리뷰·품질", en: "Code review & quality", ja: "コードレビュー・品質", zh: "代码审查·质量" } }
    ]
  },
  {
    id: "productivity", en: "Productivity", icon: "img/3d/cat-productivity.png",
    name:  { ko: "문서·업무 생산성", en: "Docs & Productivity", ja: "ドキュメント・業務効率", zh: "文档·办公效率" },
    title: { ko: "일하는 시간을 줄여주는", en: "Less time on busywork", ja: "仕事の時間を減らしてくれる", zh: "帮你缩短工作时间" },
    desc:  { ko: "발표 자료, 문서, 회의록, 스프레드시트·데이터 분석을 돕는 AI예요.",
             en: "AI for presentations, documents, meeting notes, spreadsheets and data analysis.",
             ja: "プレゼン資料、文書、議事録、スプレッドシート・データ分析を手伝うAIです。",
             zh: "帮助制作演示文稿、文档、会议记录以及表格和数据分析的AI。" },
    subs: [
      { id: "slides",  name: { ko: "발표 자료", en: "Presentations", ja: "プレゼン資料", zh: "演示文稿" } },
      { id: "docs",    name: { ko: "문서·노트·지식 관리", en: "Docs, notes & knowledge", ja: "文書・ノート・ナレッジ", zh: "文档·笔记·知识管理" } },
      { id: "meeting", name: { ko: "회의록·음성 기록", en: "Meeting notes", ja: "議事録・音声記録", zh: "会议记录·转写" } },
      { id: "sheets",  name: { ko: "스프레드시트·데이터 분석", en: "Spreadsheets & data", ja: "スプレッドシート・データ分析", zh: "表格·数据分析" } }
    ]
  },
  {
    id: "automation", en: "Automation & Agents", icon: "img/3d/cat-automation.png",
    name:  { ko: "자동화·AI 에이전트", en: "Automation & AI Agents", ja: "自動化・AIエージェント", zh: "自动化·AI智能体" },
    title: { ko: "알아서 일하는", en: "Work that runs itself", ja: "自分で動いてくれる", zh: "自己把活干完" },
    desc:  { ko: "서비스 연결, 반복 업무 처리, 여러 단계의 작업 실행을 맡는 AI예요.",
             en: "AI that connects apps, handles repetitive work and carries out multi-step tasks.",
             ja: "サービスの連携、繰り返し作業、複数ステップの作業実行を任せられるAIです。",
             zh: "负责连接服务、处理重复工作并执行多步骤任务的AI。" },
    subs: [
      { id: "nocode",    name: { ko: "노코드 자동화", en: "No-code automation", ja: "ノーコード自動化", zh: "无代码自动化" } },
      { id: "agents",    name: { ko: "범용 AI 에이전트", en: "General AI agents", ja: "汎用AIエージェント", zh: "通用AI智能体" } },
      { id: "browser",   name: { ko: "AI 브라우저", en: "AI browsers", ja: "AIブラウザ", zh: "AI浏览器" } },
      { id: "builder",   name: { ko: "에이전트 빌더", en: "Agent builders", ja: "エージェントビルダー", zh: "智能体搭建" } },
      { id: "workplace", name: { ko: "사내 업무 에이전트", en: "Workplace agents", ja: "社内業務エージェント", zh: "企业内部智能体" } }
    ]
  }
];

const SERVICES = [];

/* 서비스 한 개를 목록에 추가하는 함수 */
function S(name, cat, sub, url, price, star, langs, plans) {
  const out = { name, cat, sub, url: url.startsWith("http") ? url : "https://" + url, price, star: !!star,
                intro: {}, pros: {}, cons: {}, uses: {}, plans: plans || [] };
  for (const l in langs) {
    const [intro, pros, cons, uses] = langs[l];
    out.intro[l] = intro; out.pros[l] = pros; out.cons[l] = cons; out.uses[l] = uses;
  }
  SERVICES.push(out);
}

/* ---------- 도우미 함수 (홈·툴 페이지 공통) ---------- */
function getCategory(id) { return CATEGORIES.find(c => c.id === id); }
function getSub(catId, subId) { return getCategory(catId).subs.find(s => s.id === subId); }
function countByCat(id) { return SERVICES.filter(s => s.cat === id).length; }

/* 요금 플랜 한 줄을 현재 언어로 바꾸기 */
function formatPlan([name, price, period]) {
  const nameMap = { "@free": "plan.free", "@paid": "plan.paid", "@ent": "plan.ent", "@device": "plan.device", "@selfhost": "plan.selfhost" };
  const priceMap = { payg: "plan.payg", quote: "plan.quote", incl: "plan.incl" };
  const n = nameMap[name] ? t(nameMap[name]) : name;
  let p, muted = false;
  if (price == null) { p = t("plan.check"); muted = true; }
  else if (priceMap[price]) { p = t(priceMap[price]); muted = price !== "incl"; }
  else p = price;
  const per = period && price != null && !priceMap[price] ? t("plan." + period) : "";
  return { name: n, price: p, period: per, muted };
}

function priceBadge(price) {
  return `<span class="badge badge-${price}">${t("price." + price)}</span>`;
}

/* 로고: 공식 사이트 아이콘을 불러오고, 실패하면 첫 글자 배지로 */
/* ---------- 로고 ----------
   여러 아이콘 서버를 차례로 시도하고, 기본 지구본(16px 이하)이 오면 다음 후보로 넘어가요.
   모든 후보가 실패하면 이름 첫 글자 배지를 그대로 보여 줘요. */
const LOGO_DOMAIN = {
  "Copilot in PowerPoint": "copilot.microsoft.com", "Copilot in Word": "copilot.microsoft.com", "Copilot in Excel": "copilot.microsoft.com",
  "Teams Copilot": "teams.microsoft.com", "Microsoft 365 Copilot 에이전트": "copilot.microsoft.com", "Copilot Studio": "copilotstudio.microsoft.com",
  "Power BI Copilot": "powerbi.com", "Microsoft Loop": "loop.microsoft.com", "Power Automate": "powerautomate.microsoft.com",
  "Gemini in Google Slides": "gemini.google.com", "Gemini in Google Docs": "gemini.google.com", "Gemini in Sheets": "gemini.google.com",
  "Google Meet 회의록 (Gemini)": "meet.google.com", "Google Workspace Flows": "workspace.google.com", "Gemini Agent": "gemini.google.com",
  "Chrome 자동 브라우징 (Gemini)": "chrome.google.com", "Google Flow (Veo)": "labs.google", "Google Opal": "opal.google",
  "Google AI 모드": "google.com", "Google Stitch": "stitch.withgoogle.com", "Google Antigravity": "antigravity.google",
  "YouTube 자동 더빙": "youtube.com", "Whisper": "openai.com", "OpenAI Codex": "openai.com",
  "ChatGPT 이미지": "chatgpt.com", "ChatGPT 검색": "chatgpt.com", "ChatGPT 딥 리서치": "chatgpt.com", "ChatGPT for Excel & Sheets": "chatgpt.com",
  "AudioCraft (Meta)": "meta.com", "Meta AI": "meta.ai", "Dreamina": "dreamina.capcut.com",
  "클로바더빙": "clovadubbing.naver.com", "클로바노트": "clovanote.naver.com", "네이버 AI 브리핑": "naver.com", "파파고": "papago.naver.com",
  "Hookpad": "hooktheory.com", "Bing Copilot 검색": "bing.com", "Bing Image Creator": "bing.com",
  "Premiere Pro 생성형 확장": "adobe.com", "Photoshop 생성형 채우기": "adobe.com", "Adobe Express": "express.adobe.com",
  "Adobe Acrobat AI 어시스턴트": "acrobat.adobe.com", "Adobe Podcast Enhance": "podcast.adobe.com", "Adobe Firefly 효과음": "firefly.adobe.com",
  "Confluence (Atlassian Rovo)": "atlassian.com", "Zapier Agents": "zapier.com", "ElevenLabs Music": "elevenlabs.io", "ElevenLabs 효과음": "elevenlabs.io",
  "Perplexity Comet": "comet.perplexity.ai", "Autodesk Flow Studio": "autodesk.com", "NVIDIA Broadcast": "nvidia.com",
  "Hostinger 웹사이트 빌더": "hostinger.com", "Slack AI": "slack.com", "Box AI": "box.com", "Tableau Agent": "tableau.com",
  "Zoom AI Companion": "zoom.com", "Dropbox Dash": "dropbox.com"
};
const hostOf = url => url.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
function rootOf(host) {
  const p = host.split(".");
  if (p.length <= 2) return host;
  const two = p.slice(-2).join(".");
  return /^(co|com|or|ne|go|ac)\.[a-z]{2}$/.test(two) ? p.slice(-3).join(".") : two;
}
function logoCandidates(s) {
  const host = hostOf(s.url);
  const hosts = [...new Set([LOGO_DOMAIN[s.name], host, rootOf(host)].filter(Boolean))];
  const list = [];
  hosts.forEach(h => {
    list.push(`https://www.google.com/s2/favicons?domain=${h}&sz=128`);
    list.push(`https://icons.duckduckgo.com/ip3/${h}.ico`);
  });
  list.push(`https://${host}/apple-touch-icon.png`);
  return list;
}
/* 이미지가 실패하거나 너무 작으면(기본 지구본) 다음 후보로 */
function logoNext(img, failed) {
  const list = img.dataset.c.split(" ");
  if (!failed && (img.naturalWidth > 16 || img.dataset.final)) { img.classList.add("is-ok"); return; }
  if (!failed && !img.dataset.small) img.dataset.small = img.src;      // 작은 아이콘이라도 기억해 두기
  const i = +(img.dataset.i || 0) + 1;
  if (i < list.length) { img.dataset.i = i; img.src = list[i]; return; }
  if (img.dataset.small && !img.dataset.final) { img.dataset.final = 1; img.src = img.dataset.small; return; }
  img.remove();                                                         // 글자 배지만 남김
}
function logoHTML(s) {
  let h = 0;
  for (const ch of s.name) h = (h * 31 + ch.codePointAt(0)) % 360;
  const letter = (s.name.match(/[0-9A-Za-z가-힣]/) || ["?"])[0].toUpperCase();
  const c = logoCandidates(s);
  return `<span class="logo" style="--h:${h}" aria-hidden="true">${letter}<img src="${c[0]}" data-c="${c.join(" ")}" alt="" loading="lazy" referrerpolicy="no-referrer" onload="logoNext(this)" onerror="logoNext(this,1)"></span>`;
}

/* =========================================================
   서비스 목록
   ========================================================= */

/* ---------- 종합 AI·챗봇 › 글로벌 AI 챗봇 ---------- */
S("ChatGPT", "chatbot", "global", "https://chatgpt.com", "mix", true, {
  ko: ["질문·작성·분석·이미지 생성까지 하는 대표 AI 챗봇",["기능이 가장 넓고 사용자가 많아 활용 자료가 풍부함","이미지 생성, 파일 분석, 음성 대화까지 한곳에서 가능"],["무료 버전은 최신 기능과 사용량에 제한이 있음","답이 그럴듯해도 사실 확인이 필요함"],["보고서 초안 쓰고 다듬기","엑셀 파일 올려서 요약표와 차트 만들기"]],
  en: ["The leading AI assistant for questions, writing, images and data analysis",["Broadest feature set and the largest community of tips","Image generation, file analysis and voice chat in one place"],["The free plan limits the newest features and usage","Answers can sound right and still need fact-checking"],["Draft and polish a report","Upload a spreadsheet and get a summary table and chart"]],
  ja: ["質問、文章作成、画像、データ分析までこなす代表的なAIアシスタント",["機能が最も幅広く、ユーザーが多いので活用情報も豊富","画像生成、ファイル分析、音声会話まで一か所で可能"],["無料版は最新機能と利用量に制限がある","もっともらしい答えでも事実確認が必要"],["レポートの下書きと推敲","Excelファイルをアップして要約表とグラフを作成"]],
  zh: ["能提问、写作、生成图像和分析数据的代表性AI助手",["功能最全面，用户多，使用教程丰富","图像生成、文件分析、语音对话一站完成"],["免费版的最新功能和用量有限制","回答看似合理也需要核实"],["起草并润色报告","上传Excel文件生成汇总表和图表"]]
}, [["@free","$0"],["Plus","$20","mo"],["Pro","$200","mo"],["Business","$30","user"]]);
S("Claude", "chatbot", "global", "https://claude.ai", "mix", true, {
  ko: ["긴 문서 이해와 글쓰기·분석·코딩에 강한 AI",["긴 자료를 한 번에 읽고 정리하는 능력이 뛰어남","문체가 자연스럽고 코딩·문서 작업을 끝까지 처리함"],["무료 버전은 사용량 한도에 금방 도달할 수 있음"],["수십 쪽짜리 PDF 핵심 요약","자기소개서나 기획서 문장 다듬기"]],
  en: ["An AI assistant strong at long documents, natural writing and analysis",["Reads and organizes long material in one go","Natural writing style and follows coding and document work through"],["The free plan can hit its usage limit quickly"],["Summarize a long PDF","Polish a cover letter or proposal"]],
  ja: ["長文の理解、自然な文章、分析に強いAIアシスタント",["長い資料を一度に読んで整理する力が高い","文体が自然で、コーディングや文書作業を最後までこなす"],["無料版は利用上限にすぐ達することがある"],["数十ページのPDFを要約","自己PR文や企画書の文章を整える"]],
  zh: ["擅长理解长文档、自然写作和分析的AI助手",["能一次读完并整理大量资料","文风自然，能把编程和文档工作做到底"],["免费版可能很快用完额度"],["总结几十页的PDF","润色求职信或策划书"]]
}, [["@free","$0"],["Pro","$20","mo"],["Max","$100","mo"],["Max 20x","$200","mo"],["Team","$30","user"]]);
S("Gemini", "chatbot", "global", "https://gemini.google.com", "mix", true, {
  ko: ["구글 검색·지메일·드라이브와 연결되는 AI",["구글 서비스와 바로 연동되어 메일·문서 작업이 편함","이미지 생성(Nano Banana)과 영상 생성까지 한곳에서 가능"],["고급 모델과 기능은 유료 Google AI 요금제가 필요함"],["받은 메일함에서 중요한 메일 요약","구글 드라이브 자료를 찾아 정리"]],
  en: ["Google's AI assistant connected to Search, Gmail and Drive",["Works directly with Google apps for mail and docs","Image generation (Nano Banana) and video generation in one place"],["Top models and features need a paid Google AI plan"],["Summarize important emails in your inbox","Find and organize files in Google Drive"]],
  ja: ["Google検索、Gmail、ドライブとつながるGoogleのAIアシスタント",["Googleサービスと直接連携し、メールや文書作業が楽","画像生成(Nano Banana)と動画生成まで一か所で可能"],["上位モデルや機能は有料のGoogle AIプランが必要"],["受信トレイの重要メールを要約","Googleドライブの資料を探して整理"]],
  zh: ["与谷歌搜索、Gmail、云端硬盘相连的谷歌AI助手",["直接联动谷歌服务，处理邮件和文档很方便","图像生成(Nano Banana)和视频生成一站完成"],["高级模型和功能需要付费的Google AI方案"],["总结收件箱里的重要邮件","查找并整理谷歌云端硬盘资料"]]
}, [["@free","$0"],["Google AI Pro","$19.99","mo"],["Google AI Ultra","$249.99","mo"]]);
S("Microsoft Copilot", "chatbot", "global", "https://copilot.microsoft.com", "mix", true, {
  ko: ["윈도우·엣지에 들어간 마이크로소프트 AI",["윈도우·엣지에서 바로 불러 쓸 수 있음","회사에서 쓰는 오피스 문서와 함께 활용하기 좋음"],["워드·엑셀 안의 기능은 Microsoft 365 유료 구독이 필요함"],["웹페이지를 열어 둔 채 내용 요약","윈도우 설정이나 사용법 질문"]],
  en: ["Microsoft's AI assistant built into Windows, Edge and Office",["Available right from Windows and Edge","Fits well with the Office files you use at work"],["Features inside Word and Excel need a paid Microsoft 365 plan"],["Summarize the web page you have open","Ask how to change a Windows setting"]],
  ja: ["Windows、Edge、Officeに入っているMicrosoftのAIアシスタント",["WindowsやEdgeからすぐに呼び出せる","会社で使うOffice文書と組み合わせやすい"],["WordやExcel内の機能はMicrosoft 365の有料契約が必要"],["開いているWebページを要約","Windowsの設定や使い方を質問"]],
  zh: ["内置于Windows、Edge和Office的微软AI助手",["在Windows和Edge中随时调用","适合配合工作中的Office文档使用"],["Word和Excel内的功能需要付费订阅Microsoft 365"],["总结正在浏览的网页","询问Windows设置和用法"]]
}, [["@free","$0"],["Microsoft 365 Personal","$9.99","mo"],["Microsoft 365 Premium","$19.99","mo"]]);
S("Grok", "chatbot", "global", "https://grok.com", "mix", false, {
  ko: ["X(트위터) 실시간 정보와 연결된 xAI 챗봇",["X의 최신 게시물과 화제를 바로 반영","이미지 생성과 음성 대화 지원"],["답변 톤이 자유로워 업무용으로는 검토가 필요함"],["지금 X에서 화제인 이슈 요약","실시간 반응 살펴보기"]],
  en: ["xAI's chatbot connected to real-time posts on X (Twitter)",["Reflects the latest posts and trends on X","Image generation and voice chat"],["Its loose tone needs review for work use"],["Summarize what's trending on X right now","Gauge real-time reactions"]],
  ja: ["X(旧Twitter)のリアルタイム情報とつながるxAIのチャットボット",["Xの最新投稿や話題をすぐ反映","画像生成と音声会話に対応"],["自由な口調なので業務利用は確認が必要"],["今Xで話題の出来事を要約","リアルタイムの反応を確認"]],
  zh: ["与X(推特)实时信息相连的xAI聊天机器人",["即时反映X上的最新帖子和热点","支持图像生成和语音对话"],["语气随意，用于工作需要审核"],["总结X上正在热议的话题","了解实时舆论反应"]]
}, [["@free","$0"],["SuperGrok","$30","mo"],["SuperGrok Heavy","$300","mo"]]);
S("Meta AI", "chatbot", "global", "https://meta.ai", "free", false, {
  ko: ["인스타그램·왓츠앱 안에서 바로 쓰는 AI",["따로 가입 없이 쓰던 메신저 안에서 바로 사용","무료로 이미지 생성 가능"],["국가와 앱에 따라 쓸 수 있는 기능이 다름"],["단체 채팅에서 약속 장소 추천받기","인스타 게시물 문구 아이디어"]],
  en: ["Meta's AI built into Instagram, WhatsApp and Facebook",["Use it right inside messengers you already have","Free image generation"],["Features vary by country and app"],["Get place suggestions in a group chat","Caption ideas for Instagram posts"]],
  ja: ["Instagram・WhatsAppの中ですぐ使えるMetaのAI",["登録不要で、いつものメッセンジャー内ですぐ使える","無料で画像生成ができる"],["国やアプリによって使える機能が異なる"],["グループチャットで待ち合わせ場所の提案","インスタ投稿の文章アイデア"]],
  zh: ["可在Instagram和WhatsApp中直接使用的Meta AI",["无需另行注册，在常用聊天软件中直接使用","可免费生成图片"],["可用功能因国家和应用而异"],["在群聊中推荐见面地点","Instagram帖子文案灵感"]]
}, [["@free","$0"]]);
S("Le Chat (Mistral)", "chatbot", "global", "https://chat.mistral.ai", "mix", false, {
  ko: ["유럽 미스트랄의 빠른 응답 챗봇",["응답 속도가 매우 빠름","유럽 기업이라 개인정보 보호 기준이 엄격한 편"],["한국어 답변 품질은 상위 챗봇보다 다소 떨어짐"],["빠르게 아이디어 브레인스토밍","유럽어권 문서 번역·요약"]],
  en: ["A fast-answering chatbot from France's Mistral AI",["Very fast responses","A European company with strict privacy standards"],["Korean answers trail the top chatbots"],["Quick idea brainstorming","Translate or summarize European-language documents"]],
  ja: ["フランスのMistral AIによる応答の速いチャットボット",["応答速度がとても速い","欧州企業なのでプライバシー基準が厳しめ"],["日本語の回答品質は上位チャットボットにやや劣る"],["素早いアイデア出し","欧州言語の文書の翻訳・要約"]],
  zh: ["法国Mistral AI推出的快速应答聊天机器人",["响应速度非常快","欧洲公司，隐私保护标准较严"],["中文回答质量略逊于顶级聊天机器人"],["快速头脑风暴","翻译或总结欧洲语言文档"]]
}, [["@free","$0"],["Pro","$14.99","mo"],["Team","$24.99","user"]]);
S("DeepSeek", "chatbot", "global", "https://chat.deepseek.com", "free", false, {
  ko: ["추론에 강한 중국 오픈 모델 기반 챗봇",["수학·논리 추론 성능이 뛰어남","무료로 사용 가능"],["데이터가 중국 서버에 저장되어 민감한 정보 입력은 주의"],["수학 문제 풀이 과정 확인","코드 로직 점검"]],
  en: ["A chatbot built on a Chinese open model known for strong reasoning",["Excellent at math and logical reasoning","Free to use"],["Data is stored on servers in China, so avoid sensitive input"],["Check step-by-step math solutions","Review code logic"]],
  ja: ["推論に強い中国のオープンモデルを使ったチャットボット",["数学や論理の推論性能が高い","無料で使える"],["データが中国のサーバーに保存されるため機密情報は注意"],["数学の解き方を確認","コードのロジックを点検"]],
  zh: ["基于擅长推理的中国开源模型的聊天机器人",["数学和逻辑推理能力强","可免费使用"],["数据存储在中国服务器，敏感信息需谨慎"],["查看数学题解题过程","检查代码逻辑"]]
}, [["@free","$0"],["API","payg"]]);
S("Qwen Chat", "chatbot", "global", "https://chat.qwen.ai", "free", false, {
  ko: ["알리바바의 다기능 오픈 모델 챗봇",["이미지·영상 생성과 문서 분석까지 무료","여러 언어를 폭넓게 지원"],["서비스 정책이 중국 기준이라 일부 주제는 답변이 제한됨"],["무료로 이미지 만들어 보기","긴 문서 요약"]],
  en: ["Alibaba's multi-purpose chatbot built on open models",["Free image, video and document tools","Broad multilingual support"],["Some topics are restricted under Chinese policies"],["Try image generation for free","Summarize long documents"]],
  ja: ["アリババの多機能なオープンモデル系チャットボット",["画像・動画生成や文書分析まで無料","多言語に幅広く対応"],["中国基準のポリシーで一部の話題は回答が制限される"],["無料で画像を作ってみる","長い文書の要約"]],
  zh: ["阿里巴巴基于开源模型的多功能聊天机器人",["图像、视频生成和文档分析均免费","广泛支持多种语言"],["部分话题受中国政策限制"],["免费试做图片","总结长文档"]]
}, [["@free","$0"]]);
S("Kimi", "chatbot", "global", "https://kimi.com", "mix", false, {
  ko: ["긴 문서 처리에 강한 Moonshot AI 챗봇",["아주 긴 파일도 한 번에 읽고 정리","슬라이드·리서치 같은 에이전트 기능 제공"],["한국어 화면과 지원은 제한적"],["여러 PDF 한 번에 비교 요약","자료 조사 후 슬라이드 초안"]],
  en: ["Moonshot AI's chatbot that handles very long documents well",["Reads and organizes very long files at once","Agent features like slides and research"],["Limited Korean interface and support"],["Compare and summarize several PDFs","Research a topic and draft slides"]],
  ja: ["長い文書の処理に強いMoonshot AIのチャットボット",["とても長いファイルも一度に読んで整理","スライドやリサーチなどのエージェント機能"],["日本語の画面やサポートは限定的"],["複数のPDFをまとめて比較・要約","調査してスライドの下書き"]],
  zh: ["擅长处理长文档的月之暗面Kimi",["超长文件也能一次读完并整理","提供幻灯片、调研等智能体功能"],["韩语界面和支持有限"],["一次比较总结多份PDF","调研后起草幻灯片"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 종합 AI·챗봇 › 국내 AI 서비스 ---------- */
S("뤼튼", "chatbot", "korean", "https://wrtn.ai", "free", true, {
  ko: ["여러 AI 모델을 한국어로 편하게 쓰는 서비스",["주요 기능을 무료로 쓸 수 있음","한국어 화면과 한국 사용자에 맞춘 기능이 많음"],["최신 고급 기능은 해외 원조 서비스보다 늦게 들어오기도 함"],["과제·발표 아이디어 정리","블로그 글 초안 무료로 작성"]],
  en: ["A Korean AI portal that offers several AI models for free",["Core features are free to use","Korean interface and features made for Korean users"],["The newest advanced features can arrive later than on the original services"],["Organize ideas for an assignment or presentation","Draft a blog post for free"]],
  ja: ["複数のAIモデルを無料で使える韓国発のAIポータル",["主な機能を無料で使える","韓国語の画面と韓国ユーザー向けの機能が多い"],["最新の高度な機能は本家サービスより遅れることがある"],["課題や発表のアイデア整理","ブログ記事の下書きを無料で作成"]],
  zh: ["可免费使用多种AI模型的韩国AI门户",["主要功能可免费使用","韩语界面和面向韩国用户的功能多"],["最新高级功能有时比原版服务上线更晚"],["整理作业或演讲的思路","免费起草博客文章"]]
}, [["@free","$0"]]);
S("에이닷", "chatbot", "korean", "https://adot.ai", "free", false, {
  ko: ["SKT의 통화·일정 연동 AI 비서",["통화 녹음 요약 등 휴대폰 생활과 연결된 기능","여러 AI 모델을 무료로 사용"],["일부 기능은 통신사나 기기 환경에 따라 다름"],["중요한 통화 내용 요약해서 다시 보기","일정과 할 일 대화로 정리"]],
  en: ["SK Telecom's AI assistant for call summaries and schedules",["Tied into everyday phone use, such as call summaries","Several AI models free to use"],["Some features depend on your carrier or device"],["Review a summary of an important call","Sort out plans and to-dos by chatting"]],
  ja: ["通話の要約や予定管理まで手伝うSKテレコムのAIアシスタント",["通話録音の要約など、スマホ生活とつながる機能","複数のAIモデルを無料で使える"],["一部の機能は通信会社や端末によって異なる"],["大事な通話の要約を見返す","予定とタスクを会話で整理"]],
  zh: ["SK电讯推出的AI助手，可总结通话、管理日程",["通话录音总结等与手机生活相连的功能","可免费使用多种AI模型"],["部分功能因运营商或设备而异"],["回看重要通话的摘要","通过对话整理日程和待办"]]
}, [["@free","$0"]]);

/* ---------- 종합 AI·챗봇 › 멀티 모델·로컬 실행 ---------- */
S("Poe", "chatbot", "multi", "https://poe.com", "mix", true, {
  ko: ["여러 회사의 AI 모델을 한 곳에서 사용",["ChatGPT·Claude·Gemini 등을 한 앱에서 비교","나만의 봇을 만들어 공유 가능"],["고급 모델은 포인트 소모가 커서 금방 한도에 도달"],["같은 질문을 여러 AI에 물어 비교","자주 쓰는 프롬프트를 봇으로 저장"]],
  en: ["Use AI models from many companies in one place",["Compare ChatGPT, Claude, Gemini and others in one app","Build and share your own bots"],["Top models use points fast"],["Ask several AIs the same question","Save a frequent prompt as a bot"]],
  ja: ["複数企業のAIモデルを一か所で使えるサービス",["ChatGPT・Claude・Geminiなどを一つのアプリで比較","自分だけのボットを作って共有できる"],["上位モデルはポイント消費が大きくすぐ上限に"],["同じ質問を複数のAIに聞いて比較","よく使うプロンプトをボットとして保存"]],
  zh: ["在一个地方使用多家公司的AI模型",["在一个应用中比较ChatGPT、Claude、Gemini等","可创建并分享自己的机器人"],["高级模型积分消耗快，很快用完"],["把同一问题问多个AI进行比较","把常用提示词保存成机器人"]]
}, [["@free","$0"],["@paid","$5~$250","mo"]]);
S("OpenRouter", "chatbot", "multi", "https://openrouter.ai", "mix", false, {
  ko: ["수백 개 모델을 하나의 API·채팅으로",["수백 개 모델을 하나의 계정으로 사용","쓴 만큼만 결제"],["개발자 지향이라 입문자에게는 낯설 수 있음"],["내 앱에 여러 AI 모델 연결","모델별 답변·비용 비교"]],
  en: ["Hundreds of models through one API and chat",["Hundreds of models under one account","Pay only for what you use"],["Developer-oriented, can feel unfamiliar to beginners"],["Connect many AI models to your app","Compare answers and cost by model"]],
  ja: ["数百のモデルを一つのAPIとチャットで",["数百のモデルを一つのアカウントで利用","使った分だけ支払い"],["開発者向けなので初心者にはなじみにくい"],["自分のアプリに複数のAIモデルを接続","モデルごとの回答と費用を比較"]],
  zh: ["通过一个API和聊天界面使用数百个模型",["一个账号使用数百个模型","按实际用量付费"],["面向开发者，新手可能不熟悉"],["为自己的应用接入多个AI模型","比较各模型的回答和成本"]]
}, [["@free","$0"],["Credits","payg"]]);
S("TypingMind", "chatbot", "multi", "https://typingmind.com", "paid", false, {
  ko: ["내 API 키로 여러 모델을 쓰는 채팅 화면",["한 번 구매로 계속 사용","대화 폴더·프롬프트 라이브러리 등 편의 기능"],["모델 사용료는 API로 따로 결제해야 함"],["여러 AI를 한 화면에서 쓰기","팀 공용 프롬프트 관리"]],
  en: ["A chat interface for many models using your own API keys",["Buy once and keep using it","Handy features like chat folders and a prompt library"],["Model usage is billed separately through APIs"],["Use several AIs in one window","Manage shared team prompts"]],
  ja: ["自分のAPIキーで複数モデルを使えるチャット画面",["一度購入すればずっと使える","会話フォルダやプロンプト集など便利機能"],["モデル利用料はAPIで別途支払いが必要"],["複数のAIを一つの画面で使う","チーム共用プロンプトの管理"]],
  zh: ["用自己的API密钥使用多个模型的聊天界面",["一次购买长期使用","对话文件夹、提示词库等便捷功能"],["模型费用需另行通过API支付"],["在一个界面使用多个AI","管理团队共用提示词"]]
}, [["License","$39~","once"],["Model API","payg"]]);
S("LM Studio", "chatbot", "multi", "https://lmstudio.ai", "free", false, {
  ko: ["내 컴퓨터에서 오픈 모델을 앱으로 실행",["인터넷 없이도 내 컴퓨터에서 AI 사용","데이터가 밖으로 나가지 않아 보안에 유리"],["좋은 성능을 내려면 그래픽카드·메모리 사양이 필요함"],["민감한 문서를 오프라인으로 요약","오픈 모델 여러 개 비교 테스트"]],
  en: ["Run open models on your own computer as an app",["Use AI on your computer even offline","Data never leaves your machine"],["Good performance needs a strong GPU and memory"],["Summarize sensitive documents offline","Test and compare open models"]],
  ja: ["自分のPCでオープンモデルをアプリとして実行",["ネットなしでも自分のPCでAIを使える","データが外に出ないのでセキュリティ面で有利"],["性能を出すにはGPUやメモリの性能が必要"],["機密文書をオフラインで要約","複数のオープンモデルを比較テスト"]],
  zh: ["在自己电脑上以应用形式运行开源模型",["无网络也能在本机使用AI","数据不外传，更安全"],["想要好性能需要较强显卡和内存"],["离线总结敏感文档","比较测试多个开源模型"]]
}, [["@free","$0"]]);
S("Ollama", "chatbot", "multi", "https://ollama.com", "free", false, {
  ko: ["오픈 모델을 로컬에서 간단히 실행",["명령어 한 줄로 모델 설치·실행","다른 앱·개발 도구와 연결이 쉬움"],["터미널 사용에 익숙해야 편함"],["내 컴퓨터에서 개인용 챗봇 돌리기","로컬 모델로 개발 테스트"]],
  en: ["Run open models locally with simple commands",["Install and run models with one command","Easy to connect to other apps and dev tools"],["Most comfortable if you know the terminal"],["Run a private chatbot on your computer","Test development with local models"]],
  ja: ["オープンモデルをローカルで手軽に実行",["コマンド一行でモデルを導入・実行","ほかのアプリや開発ツールとつなぎやすい"],["ターミナルに慣れていると使いやすい"],["自分のPCで個人用チャットボットを動かす","ローカルモデルで開発テスト"]],
  zh: ["在本地简单运行开源模型",["一行命令即可安装运行模型","易于连接其他应用和开发工具"],["熟悉终端会更顺手"],["在电脑上运行私人聊天机器人","用本地模型做开发测试"]]
}, [["@free","$0"],["Pro","$20","mo"]]);

/* ---------- 검색·리서치 › AI 검색엔진 ---------- */
S("Perplexity", "research", "search", "https://perplexity.ai", "mix", true, {
  ko: ["출처 링크를 달아 답하는 AI 검색",["답마다 출처 링크가 달려 바로 확인 가능","최신 뉴스와 자료 검색에 강함"],["심층 리서치 같은 고급 기능은 무료 횟수가 적음"],["최신 이슈를 출처와 함께 빠르게 파악","과제용 참고 자료 찾기"]],
  en: ["AI search that answers questions with linked sources",["Every answer comes with source links to check","Strong at recent news and up-to-date facts"],["Advanced modes like deep research have few free uses"],["Catch up on a recent issue with sources","Find references for an assignment"]],
  ja: ["質問するとWebを検索し、出典付きで答えるAI検索",["回答ごとに出典リンクがあり、すぐ確認できる","最新ニュースや資料の検索に強い"],["ディープリサーチなど高度な機能は無料回数が少ない"],["最新の話題を出典付きで素早く把握","課題の参考資料探し"]],
  zh: ["提问后会联网搜索并附上出处回答的AI搜索",["每个回答都附有出处链接，便于核对","擅长查找最新新闻和资料"],["深度研究等高级功能的免费次数少"],["带出处快速了解最新话题","查找作业参考资料"]]
}, [["@free","$0"],["Pro","$20","mo"],["Max","$200","mo"]]);
S("Google AI 모드", "research", "search", "https://google.com", "free", true, {
  ko: ["구글 검색 안의 대화형 AI 검색",["구글 검색 결과를 바탕으로 대화하듯 이어서 질문","무료로 바로 사용"],["광고·쇼핑 결과가 섞일 수 있음"],["여행 일정 조건을 붙여 검색","복잡한 비교 질문 한 번에"]],
  en: ["Conversational AI search inside Google Search",["Ask follow-ups on top of Google results","Free and ready to use"],["Ads and shopping results can mix in"],["Search for a trip with many conditions","Ask a complex comparison at once"]],
  ja: ["Google検索の中の対話型AI検索",["Google検索結果をもとに会話のように続けて質問","無料ですぐ使える"],["広告やショッピング結果が混ざることがある"],["条件を付けて旅行の計画を検索","複雑な比較の質問を一度に"]],
  zh: ["谷歌搜索中的对话式AI搜索",["基于谷歌搜索结果像对话一样追问","免费直接使用"],["可能夹杂广告和购物结果"],["带条件搜索旅行行程","一次提出复杂的比较问题"]]
}, [["@free","$0"]]);
S("ChatGPT 검색", "research", "search", "https://chatgpt.com", "mix", true, {
  ko: ["실시간 웹 검색과 출처 링크 제공",["대화하던 맥락 그대로 최신 정보 검색","출처 링크로 확인 가능"],["출처를 직접 열어 사실 확인이 필요함"],["오늘 뉴스 핵심 정리","제품 최신 가격 비교"]],
  en: ["Real-time web search with source links inside ChatGPT",["Search the latest info without leaving the conversation","Source links to verify"],["Open the sources to fact-check"],["Recap today's news","Compare current product prices"]],
  ja: ["ChatGPT内でリアルタイムWeb検索と出典リンク",["会話の流れのまま最新情報を検索","出典リンクで確認できる"],["出典を開いて事実確認が必要"],["今日のニュースの要点整理","製品の最新価格比較"]],
  zh: ["ChatGPT内的实时网页搜索与出处链接",["保持对话语境搜索最新信息","可通过出处链接核实"],["需要打开出处核对事实"],["整理今日新闻要点","比较产品最新价格"]]
}, [["@free","$0"],["Plus","$20","mo"]]);
S("네이버 AI 브리핑", "research", "search", "https://naver.com", "free", false, {
  ko: ["네이버 검색 결과 위에 AI 요약 표시",["블로그·카페 등 국내 자료를 요약","네이버 검색만 하면 자동으로 표시"],["모든 검색어에 나오지는 않음"],["국내 생활 정보 빠르게 확인","제품 후기 요약 보기"]],
  en: ["AI summaries shown above Naver search results",["Summarizes Korean sources like blogs and cafés","Appears automatically in Naver Search"],["Doesn't appear for every query"],["Quickly check everyday info in Korea","See summarized product reviews"]],
  ja: ["NAVER検索結果の上に表示されるAI要約",["ブログやカフェなど韓国の資料を要約","NAVERで検索するだけで自動表示"],["すべての検索語に出るわけではない"],["韓国の生活情報を素早く確認","製品レビューの要約を見る"]],
  zh: ["显示在NAVER搜索结果上方的AI摘要",["总结博客、社区等韩国本地资料","在NAVER搜索时自动显示"],["并非所有搜索词都会出现"],["快速查看韩国生活信息","查看产品评价摘要"]]
}, [["@free","$0"]]);
S("Bing Copilot 검색", "research", "search", "https://bing.com", "free", false, {
  ko: ["검색 결과를 AI가 정리해 요약",["검색 결과를 한 문단으로 정리","엣지 브라우저와 자연스럽게 연결"],["구글보다 국내 자료 비중이 낮음"],["해외 자료 빠르게 요약","엣지에서 열린 페이지와 함께 검색"]],
  en: ["Bing search results organized and summarized by AI",["Condenses results into one paragraph","Works naturally with the Edge browser"],["Fewer Korean sources than Google or Naver"],["Summarize international sources fast","Search alongside the page open in Edge"]],
  ja: ["検索結果をAIが整理して要約するBing",["検索結果を一段落にまとめる","Edgeブラウザと自然に連携"],["Googleより日本語資料の比重が低い"],["海外の資料を素早く要約","Edgeで開いたページと一緒に検索"]],
  zh: ["由AI整理总结搜索结果的必应",["把搜索结果整理成一段话","与Edge浏览器自然联动"],["中文资料比重低于其他搜索"],["快速总结海外资料","结合Edge中打开的页面搜索"]]
}, [["@free","$0"]]);
S("Felo", "research", "search", "https://felo.ai", "mix", false, {
  ko: ["다국어 AI 검색, 결과를 슬라이드·마인드맵으로",["검색 결과를 마인드맵·슬라이드로 바로 변환","일본어·한국어 등 다국어 검색에 강함"],["고급 검색 횟수는 유료"],["주제 조사 후 마인드맵으로 정리","해외 자료를 한국어로 검색"]],
  en: ["Multilingual AI search that turns results into slides or mind maps",["Turn results into mind maps or slides instantly","Strong multilingual search"],["Advanced searches are limited without paying"],["Research a topic and map it out","Search foreign sources in your language"]],
  ja: ["多言語AI検索、結果をスライドやマインドマップに",["検索結果をマインドマップやスライドにすぐ変換","日本語・韓国語など多言語検索に強い"],["高度な検索回数は有料"],["テーマを調べてマインドマップに整理","海外資料を日本語で検索"]],
  zh: ["多语言AI搜索，可把结果做成幻灯片或思维导图",["把搜索结果直接做成思维导图或幻灯片","擅长日语、韩语等多语言搜索"],["高级搜索次数需付费"],["调研主题并整理成思维导图","用母语搜索海外资料"]]
}, [["@free","$0"],["Pro",null]]);
S("You.com", "research", "search", "https://you.com", "mix", false, {
  ko: ["여러 모델을 고르는 AI 검색·리서치",["여러 AI 모델을 골라 검색","리서치 모드로 긴 보고서 작성"],["국내 자료는 상대적으로 적음"],["모델별 검색 결과 비교","해외 시장 조사"]],
  en: ["AI search and research where you can pick the model",["Choose among AI models when searching","Research mode writes long reports"],["Relatively few Korean sources"],["Compare search results by model","Research overseas markets"]],
  ja: ["モデルを選べるAI検索・リサーチ",["複数のAIモデルを選んで検索","リサーチモードで長いレポート作成"],["日本語の資料は比較的少ない"],["モデルごとの検索結果を比較","海外市場の調査"]],
  zh: ["可选择模型的AI搜索与调研",["可选多种AI模型搜索","调研模式可写长篇报告"],["中文资料相对较少"],["比较不同模型的搜索结果","调研海外市场"]]
}, [["@free","$0"],["Pro","$20","mo"]]);
S("Kagi", "research", "search", "https://kagi.com", "paid", false, {
  ko: ["광고 없는 유료 검색엔진과 AI 어시스턴트",["광고·추적 없는 깔끔한 검색 결과","원하는 사이트 순위를 직접 조정"],["무료 요금제가 없음"],["광고 없이 조사하기","질 낮은 사이트를 결과에서 제외"]],
  en: ["A paid, ad-free search engine with an AI assistant",["Clean results with no ads or tracking","Adjust site rankings yourself"],["No free plan"],["Research without ads","Remove low-quality sites from results"]],
  ja: ["広告のない有料検索エンジンとAIアシスタント",["広告や追跡のないすっきりした検索結果","サイトの順位を自分で調整できる"],["無料プランがない"],["広告なしで調べ物","質の低いサイトを結果から除外"]],
  zh: ["无广告的付费搜索引擎和AI助手",["没有广告和追踪的干净结果","可自行调整网站排名"],["没有免费方案"],["无广告地查资料","从结果中屏蔽低质量网站"]]
}, [["Starter","$5","mo"],["Professional","$10","mo"],["Ultimate","$25","mo"]]);

/* ---------- 검색·리서치 › 심층 리서치·자료 정리 ---------- */
S("ChatGPT 딥 리서치", "research", "deep", "https://chatgpt.com", "mix", true, {
  ko: ["수십 개 출처를 조사해 보고서 작성",["수십 개 출처를 스스로 찾아 정리","출처가 달린 긴 보고서 작성"],["완료까지 수 분~수십 분 걸림"],["시장·경쟁사 조사 보고서","논문 주제 배경 조사"]],
  en: ["Researches dozens of sources and writes a report",["Finds and organizes dozens of sources on its own","Long reports with citations"],["Takes several minutes or longer"],["A market or competitor research report","Background research for a paper"]],
  ja: ["数十の出典を調べて報告書を作成",["数十の出典を自分で探して整理","出典付きの長い報告書を作成"],["完了まで数分から数十分かかる"],["市場・競合の調査レポート","論文テーマの背景調査"]],
  zh: ["调研数十个来源并撰写报告",["自行查找并整理数十个来源","撰写附出处的长篇报告"],["完成需要几分钟到几十分钟"],["市场或竞品调研报告","论文选题背景调研"]]
}, [["@free","$0"],["Plus","$20","mo"],["Pro","$200","mo"]]);
S("Gemini Deep Research", "research", "deep", "https://gemini.google.com", "mix", true, {
  ko: ["조사 계획을 세워 장문 리포트 생성",["조사 계획을 먼저 보여주고 수정 가능","구글 문서로 바로 내보내기"],["무료 사용 횟수가 적음"],["업계 동향 리포트","진로·전공 정보 조사"]],
  en: ["Plans its research, then writes a long report",["Shows its research plan first so you can edit it","Export straight to Google Docs"],["Few free runs"],["An industry trend report","Research careers or majors"]],
  ja: ["調査計画を立てて長文レポートを生成",["調査計画を先に見せて修正できる","Googleドキュメントにすぐ書き出し"],["無料の利用回数が少ない"],["業界動向レポート","進路・専攻の情報調査"]],
  zh: ["先制定调研计划再生成长篇报告",["先展示调研计划并可修改","可直接导出到谷歌文档"],["免费次数少"],["行业趋势报告","调研升学或专业信息"]]
}, [["@free","$0"],["Google AI Pro","$19.99","mo"],["Google AI Ultra","$249.99","mo"]]);
S("NotebookLM", "research", "deep", "https://notebooklm.google.com", "mix", true, {
  ko: ["내가 올린 자료만 근거로 요약·오디오 개요",["올린 자료 안에서만 답해서 엉뚱한 답이 적음","자료를 팟캐스트 같은 음성 요약으로 만들어 줌"],["인터넷 전체를 검색하는 용도는 아님"],["강의 자료 여러 개로 시험 대비 요약 만들기","회사 문서 묶음에 질문하기"]],
  en: ["Google's AI notebook that answers only from the sources you upload",["Answers stay inside your sources, so fewer made-up answers","Turns material into podcast-style audio overviews"],["Not meant for searching the whole web"],["Build exam notes from several lecture files","Ask questions across a set of work documents"]],
  ja: ["アップロードした資料だけを根拠に答え、要約するGoogleのAIノート",["資料の範囲内で答えるので的外れな答えが少ない","資料をポッドキャスト風の音声要約にしてくれる"],["Web全体を検索する用途ではない"],["複数の講義資料から試験対策の要約を作る","社内文書のまとまりに質問する"]],
  zh: ["只依据你上传的资料回答和总结的谷歌AI笔记",["只在资料范围内回答，胡编的情况少","能把资料做成播客式的语音概述"],["不适合搜索整个互联网"],["用多份讲义做考试复习总结","向一批公司文档提问"]]
}, [["@free","$0"],["Google AI Pro","$19.99","mo"]]);
S("Claude 리서치", "research", "deep", "https://claude.ai", "paid", false, {
  ko: ["웹·연결된 앱을 함께 조사해 인용 보고서",["웹과 지메일·드라이브 같은 연결 앱을 함께 조사","인용이 달린 정리된 보고서"],["유료 요금제에서 사용"],["사내 자료와 외부 자료를 합친 보고서","회의 준비용 배경 조사"]],
  en: ["Researches the web and connected apps together and writes cited reports",["Researches the web plus connected apps like Gmail and Drive","Well-organized reports with citations"],["Available on paid plans"],["A report combining internal and external sources","Background research before a meeting"]],
  ja: ["Webと連携アプリを一緒に調べて引用付きレポート",["WebとGmail・ドライブなどの連携アプリを一緒に調査","引用付きの整理されたレポート"],["有料プランで利用"],["社内資料と外部資料を合わせたレポート","会議準備の背景調査"]],
  zh: ["同时调研网页和已连接应用并撰写带引用的报告",["同时调研网页及Gmail、云端硬盘等已连接应用","条理清晰并附引用的报告"],["需付费方案"],["结合内部和外部资料的报告","会前背景调研"]]
}, [["Pro","$20","mo"],["Max","$100","mo"]]);
S("Perplexity 딥 리서치", "research", "deep", "https://perplexity.ai", "mix", false, {
  ko: ["여러 번 검색해 출처 기반 보고서 작성",["빠른 시간 안에 출처 많은 보고서 완성","무료로도 일부 사용 가능"],["무료는 하루 사용 횟수가 적음"],["최신 이슈 심층 정리","투자·산업 조사"]],
  en: ["Searches many times and writes a source-based report",["Source-rich reports in little time","Some free use"],["Few runs per day on free"],["Deep dive into a current issue","Investment or industry research"]],
  ja: ["何度も検索して出典に基づく報告書を作成",["短時間で出典の多いレポートが完成","無料でも一部使える"],["無料は1日の回数が少ない"],["最新の話題を深く整理","投資・業界の調査"]],
  zh: ["多次搜索并撰写基于出处的报告",["短时间内完成出处丰富的报告","免费也可部分使用"],["免费每天次数少"],["深入整理最新话题","投资或行业调研"]]
}, [["@free","$0"],["Pro","$20","mo"],["Max","$200","mo"]]);
S("라이너", "research", "deep", "https://liner.com", "mix", false, {
  ko: ["출처 신뢰도를 보여주는 국내 리서치 도우미",["학술 자료와 공신력 있는 출처를 우선 보여줌","한국어 사용이 자연스러움"],["고급 리서치 기능은 유료 요금제 중심"],["리포트에 쓸 근거 자료 찾기","논문과 기사 핵심 하이라이트 정리"]],
  en: ["AI search from a Korean startup that favors trustworthy sources",["Puts academic and credible sources first","Works naturally in Korean"],["Advanced research features are mostly on paid plans"],["Find evidence for a report","Highlight key points in papers and articles"]],
  ja: ["信頼できる出典を中心に答える韓国スタートアップのAI検索",["学術資料や信頼性の高い出典を優先表示","韓国語でも自然に使える"],["高度なリサーチ機能は主に有料プラン"],["レポートの根拠資料探し","論文や記事の要点をハイライト整理"]],
  zh: ["韩国初创公司推出、以可信来源为主的AI搜索",["优先展示学术资料和权威来源","韩语使用自然"],["高级调研功能以付费方案为主"],["寻找报告所需的依据","整理论文和文章的重点"]]
}, [["@free","$0"],["Pro",null]]);

/* ---------- 검색·리서치 › 논문·학술 탐색 ---------- */
S("Consensus", "research", "academic", "https://consensus.app", "mix", true, {
  ko: ["논문 근거로 질문에 답하는 학술 검색",["실제 논문만 근거로 답함","연구 결과의 합의 정도를 한눈에 보여줌"],["영어 논문 중심이라 한국어 자료는 적음"],["어떤 주장이 연구로 뒷받침되는지 확인","논문 리뷰 시작점 찾기"]],
  en: ["Academic search that shows what research papers say about a question",["Answers are grounded in real papers","Shows at a glance how much studies agree"],["Mostly English-language papers"],["Check whether a claim is backed by research","Find a starting point for a literature review"]],
  ja: ["質問について論文が何と言っているかをまとめて示す学術検索",["実際の論文だけを根拠に答える","研究結果の合意度がひと目でわかる"],["英語論文中心で日本語資料は少ない"],["ある主張が研究で裏付けられているか確認","文献レビューの出発点探し"]],
  zh: ["汇总论文对某个问题看法的学术搜索",["只以真实论文为依据回答","一眼看出研究结论的共识程度"],["以英文论文为主，中文资料少"],["确认某个说法是否有研究支持","寻找文献综述的起点"]]
}, [["@free","$0"],["Pro","$15","mo"]]);
S("Elicit", "research", "academic", "https://elicit.com", "mix", true, {
  ko: ["논문 검색·요약·데이터 추출 자동화",["여러 논문의 방법·결과를 표로 비교","체계적 문헌 조사에 강함"],["무료 사용량이 적고 영어 위주"],["관련 논문 20편 핵심 비교표 만들기","연구 질문에 맞는 논문 선별"]],
  en: ["A research assistant that finds papers and tables their key findings",["Compares methods and results across papers in a table","Strong for systematic reviews"],["Small free allowance and mostly English"],["Build a comparison table of 20 related papers","Screen papers for a research question"]],
  ja: ["論文を探し、要点を表にまとめてくれる研究アシスタント",["複数論文の方法と結果を表で比較","体系的な文献調査に強い"],["無料枠が少なく英語中心"],["関連論文20本の比較表づくり","研究テーマに合う論文の選別"]],
  zh: ["查找论文并把要点整理成表格的研究助手",["用表格对比多篇论文的方法和结果","擅长系统性文献调查"],["免费额度少，以英文为主"],["制作20篇相关论文的对比表","按研究问题筛选论文"]]
}, [["@free","$0"],["Plus","$12","mo"],["Pro","$49","mo"]]);
S("SciSpace", "research", "academic", "https://scispace.com", "mix", true, {
  ko: ["논문을 읽으며 설명 듣고 문헌 검토",["논문 속 문장·수식을 질문하면 풀어서 설명","논문 검색과 읽기를 한곳에서"],["고급 기능은 유료이고 답을 원문과 대조해야 함"],["처음 읽는 분야 논문 이해하기","논문 그림과 표 설명 듣기"]],
  en: ["A reading assistant that explains difficult papers in plain words",["Ask about any sentence or formula and get it explained","Search and read papers in one place"],["Advanced features are paid, and answers should be checked against the paper"],["Understand a paper outside your field","Get figures and tables explained"]],
  ja: ["難しい論文をやさしく解説してくれる論文読解アシスタント",["論文中の文や数式を質問すると噛み砕いて説明","論文の検索と読解を一か所で"],["高度な機能は有料で、答えは原文と照合が必要"],["初めての分野の論文を理解","論文の図表の説明を聞く"]],
  zh: ["把难懂的论文讲得通俗易懂的阅读助手",["对论文中的句子或公式提问即可获得解释","论文搜索和阅读一站完成"],["高级功能收费，回答需对照原文"],["读懂陌生领域的论文","听取论文图表的讲解"]]
}, [["@free","$0"],["Premium","$20","mo"]]);
S("Scite", "research", "academic", "https://scite.ai", "paid", false, {
  ko: ["인용이 지지인지 반박인지 보여주는 분석",["논문이 인용될 때 지지·반박 여부를 구분","주장에 대한 근거 확인에 유용"],["무료 요금제가 없음"],["유명 연구가 이후 반박됐는지 확인","논문 인용 근거 점검"]],
  en: ["Shows whether citations support or dispute a paper",["Classifies whether citations support or contrast a paper","Useful for checking evidence behind claims"],["No free plan"],["See whether a famous study was later disputed","Check the evidence behind your citations"]],
  ja: ["引用が支持か反論かを示す分析",["引用が支持か反論かを区別","主張の根拠確認に便利"],["無料プランがない"],["有名な研究がのちに反論されたか確認","論文の引用根拠を点検"]],
  zh: ["显示引用是支持还是反驳的分析工具",["区分引用是支持还是反驳","适合核查观点依据"],["没有免费方案"],["查看知名研究后来是否被反驳","检查论文引用依据"]]
}, [["Personal","$20","mo"]]);
S("Semantic Scholar", "research", "academic", "https://semanticscholar.org", "free", false, {
  ko: ["AI2의 무료 학술 검색, 논문 요약",["완전 무료","논문마다 한 줄 요약 제공"],["인문·사회 분야 자료는 상대적으로 적음"],["관련 논문 빠르게 훑기","저자별 연구 흐름 보기"]],
  en: ["AI2's free academic search with paper summaries",["Completely free","One-line summaries for papers"],["Fewer humanities and social science papers"],["Skim related papers fast","Follow an author's research"]],
  ja: ["AI2の無料学術検索、論文要約付き",["完全無料","論文ごとに一行要約"],["人文・社会分野の資料は比較的少ない"],["関連論文を素早く見る","著者ごとの研究の流れを見る"]],
  zh: ["AI2推出的免费学术搜索，附论文摘要",["完全免费","每篇论文提供一句话摘要"],["人文社科资料相对较少"],["快速浏览相关论文","查看作者的研究脉络"]]
}, [["@free","$0"]]);
S("Google Scholar", "research", "academic", "https://scholar.google.com", "free", false, {
  ko: ["가장 널리 쓰이는 학술 검색엔진",["가장 많은 학술 자료를 검색","인용 횟수와 인용 형식 바로 확인"],["AI 요약 기능은 거의 없음"],["리포트 참고문헌 찾기","인용 형식 복사"]],
  en: ["The most widely used academic search engine",["Searches the most academic material","See citation counts and copy citations"],["Little AI summarization"],["Find references for a report","Copy citation formats"]],
  ja: ["最も広く使われている学術検索エンジン",["最も多くの学術資料を検索","被引用数と引用形式をすぐ確認"],["AI要約機能はほとんどない"],["レポートの参考文献探し","引用形式をコピー"]],
  zh: ["使用最广泛的学术搜索引擎",["可检索最多的学术资料","直接查看被引次数和引用格式"],["几乎没有AI摘要功能"],["为报告查找参考文献","复制引用格式"]]
}, [["@free","$0"]]);
S("Connected Papers", "research", "academic", "https://connectedpapers.com", "mix", false, {
  ko: ["관련 논문 관계를 그래프로 시각화",["논문 하나로 관련 연구 지도를 그려 줌","중요한 선행 연구를 한눈에"],["무료는 월 그래프 수가 제한됨"],["새 분야의 핵심 논문 찾기","선행 연구 지도 만들기"]],
  en: ["Visualizes how related papers connect as a graph",["Maps related research from a single paper","See key prior work at a glance"],["Monthly graph limit on free"],["Find key papers in a new field","Build a map of prior work"]],
  ja: ["関連論文のつながりをグラフで可視化",["論文一本から関連研究の地図を描く","重要な先行研究がひと目で"],["無料は月のグラフ数に制限"],["新しい分野の主要論文探し","先行研究マップづくり"]],
  zh: ["以图谱形式展示相关论文关系",["由一篇论文画出相关研究地图","一眼看出重要的前期研究"],["免费版每月图谱数量有限"],["寻找新领域的核心论文","绘制前期研究地图"]]
}, [["@free","$0"],["Academic","$6","mo"]]);
S("ResearchRabbit", "research", "academic", "https://researchrabbit.ai", "mix", false, {
  ko: ["인용 관계로 논문을 이어서 탐색",["관심 논문을 모으면 비슷한 논문을 계속 추천","공동 연구자와 컬렉션 공유"],["처음에는 화면 구성이 복잡하게 느껴짐"],["졸업논문 참고문헌 넓히기","연구실 논문 목록 공유"]],
  en: ["Explore papers by following citation links",["Keeps recommending similar papers as you collect","Share collections with collaborators"],["The interface feels busy at first"],["Expand references for a thesis","Share a lab reading list"]],
  ja: ["引用関係をたどって論文を探索",["気になる論文を集めると似た論文を推薦し続ける","共同研究者とコレクションを共有"],["最初は画面が複雑に感じる"],["卒論の参考文献を広げる","研究室の論文リストを共有"]],
  zh: ["沿引用关系继续探索论文",["收藏论文后持续推荐相似论文","与合作者共享论文集"],["界面一开始显得复杂"],["扩充毕业论文参考文献","共享实验室论文清单"]]
}, [["@free","$0"],["@paid",null]]);
S("Undermind", "research", "academic", "https://undermind.ai", "mix", false, {
  ko: ["깊이 있는 논문 탐색 에이전트",["복잡한 연구 질문에 맞는 논문을 깊이 탐색","찾은 논문의 관련도를 설명"],["검색 한 번에 몇 분이 걸림"],["특정 조건의 실험 논문 찾기","연구 주제의 빈틈 확인"]],
  en: ["A research agent for deep paper discovery",["Digs deep for papers matching complex questions","Explains why each paper is relevant"],["Each search takes a few minutes"],["Find experiments with specific conditions","Spot gaps in a research topic"]],
  ja: ["深く論文を探すリサーチエージェント",["複雑な研究課題に合う論文を深く探索","見つけた論文の関連度を説明"],["1回の検索に数分かかる"],["特定条件の実験論文を探す","研究テーマの空白を確認"]],
  zh: ["深入查找论文的研究智能体",["针对复杂研究问题深入查找论文","说明所找论文的相关程度"],["每次搜索需几分钟"],["查找特定条件的实验论文","发现研究主题的空白"]]
}, [["@free","$0"],["Pro",null]]);

/* ---------- 글쓰기·번역 › 블로그·마케팅 문구 ---------- */
S("Jasper", "writing", "marketing", "https://jasper.ai", "paid", true, {
  ko: ["브랜드 톤에 맞춘 마케팅 콘텐츠 제작",["브랜드 목소리와 규칙을 저장해 일관된 문구 작성","광고·SNS·블로그 템플릿이 많음"],["가격이 높아 개인보다 마케팅 팀에 적합"],["신제품 광고 문구 여러 버전 만들기","SNS 캠페인 게시물 일괄 작성"]],
  en: ["An AI copywriter that learns your brand voice for marketing",["Saves brand voice and rules for consistent copy","Many templates for ads, social and blogs"],["Pricey, better for marketing teams than individuals"],["Write several versions of a product ad","Draft a batch of social campaign posts"]],
  ja: ["ブランドの口調を学んでマーケティング文を作るAIコピーライター",["ブランドの声とルールを保存して一貫した文章に","広告・SNS・ブログのテンプレートが豊富"],["価格が高く、個人よりマーケティングチーム向け"],["新製品の広告文を複数パターン作成","SNSキャンペーン投稿をまとめて作成"]],
  zh: ["学习品牌语气撰写营销文案的AI文案助手",["保存品牌语气和规则，文案风格统一","广告、社交媒体、博客模板多"],["价格较高，更适合营销团队而非个人"],["写出多个版本的新品广告语","批量撰写社交媒体活动帖子"]]
}, [["Creator","$49","mo"],["Pro","$69","mo"],["Business","quote"]]);
S("Copy.ai", "writing", "marketing", "https://copy.ai", "mix", true, {
  ko: ["영업·마케팅 문구와 반복 작업 자동화",["영업·마케팅용 워크플로 템플릿이 많음","여러 문구를 한 번에 대량 생성"],["한국어 결과물은 다듬기가 필요할 수 있음"],["영업 메일 여러 버전 만들기","상품 설명 대량 작성"]],
  en: ["Sales and marketing copy plus automated repetitive work",["Many sales and marketing workflow templates","Generate lots of copy at once"],["Non-English output may need editing"],["Write several versions of a sales email","Draft product descriptions in bulk"]],
  ja: ["営業・マーケ文の作成と繰り返し作業の自動化",["営業・マーケ向けのワークフローテンプレートが豊富","複数の文章を一度に大量生成"],["日本語の結果は手直しが必要なことも"],["営業メールを複数パターン作成","商品説明を大量に作成"]],
  zh: ["销售和营销文案，并自动化重复工作",["销售和营销工作流模板多","一次批量生成多条文案"],["中文结果可能需要润色"],["写出多个版本的销售邮件","批量撰写商品描述"]]
}, [["@free","$0"],["Chat","$29","mo"]]);
S("Writesonic", "writing", "marketing", "https://writesonic.com", "mix", true, {
  ko: ["검색 노출을 고려한 블로그 글 작성",["검색 노출을 고려한 글 구조 제안","AI 검색 노출 분석 기능"],["무료 사용량이 적음"],["블로그 글 초안과 키워드 구성","AI 검색에서 내 브랜드 노출 확인"]],
  en: ["Writes blog posts with search visibility in mind",["Suggests SEO-friendly structure","Tracks visibility in AI search"],["Small free allowance"],["Draft blog posts with keywords","Check your brand's visibility in AI search"]],
  ja: ["検索での露出を考えたブログ記事作成",["検索露出を考えた構成を提案","AI検索での露出分析機能"],["無料枠が少ない"],["ブログ記事の下書きとキーワード構成","AI検索での自社ブランド露出を確認"]],
  zh: ["兼顾搜索曝光的博客写作工具",["建议有利于搜索的文章结构","分析在AI搜索中的曝光"],["免费额度少"],["起草博客并规划关键词","查看品牌在AI搜索中的曝光"]]
}, [["@free","$0"],["@paid",null]]);
S("Rytr", "writing", "marketing", "https://rytr.me", "mix", false, {
  ko: ["저렴하게 쓰는 짧은 문구 작성기",["저렴한 가격으로 무제한 생성","용도별 템플릿이 단순하고 쉬움"],["긴 글 품질은 최신 챗봇보다 떨어짐"],["SNS 문구 빠르게 만들기","상품 한 줄 설명"]],
  en: ["An affordable writer for short copy",["Unlimited generation at a low price","Simple templates for each use"],["Long-form quality trails modern chatbots"],["Write social captions fast","One-line product descriptions"]],
  ja: ["安く使える短い文章作成ツール",["安い価格で無制限に生成","用途別テンプレートがシンプル"],["長文の品質は最新チャットボットに劣る"],["SNSの文章を素早く作成","商品の一行説明"]],
  zh: ["价格实惠的短文案写作工具",["低价无限生成","按用途的模板简单易用"],["长文质量不如最新聊天机器人"],["快速写社交媒体文案","一句话商品介绍"]]
}, [["@free","$0"],["Unlimited","$9","mo"]]);
S("Anyword", "writing", "marketing", "https://anyword.com", "paid", false, {
  ko: ["광고 문구의 성과를 예측해 추천",["문구마다 예상 성과 점수 제공","브랜드 규칙에 맞춰 작성"],["가격이 높고 영어 중심"],["광고 문구 A/B 후보 고르기","랜딩페이지 헤드라인 개선"]],
  en: ["Predicts ad copy performance and recommends the best",["Predicted performance score for each line","Writes to brand rules"],["Pricey and English-focused"],["Pick A/B candidates for ad copy","Improve landing page headlines"]],
  ja: ["広告文の成果を予測して推薦",["文章ごとに予想成果スコアを表示","ブランドルールに沿って作成"],["価格が高く英語中心"],["広告文のA/B候補を選ぶ","LPの見出し改善"]],
  zh: ["预测广告文案效果并推荐",["为每条文案给出预期效果分数","按品牌规则撰写"],["价格高，以英文为主"],["挑选广告文案A/B方案","优化落地页标题"]]
}, [["Starter","$49","mo"]]);
S("Surfer", "writing", "marketing", "https://surferseo.com", "paid", false, {
  ko: ["검색 상위 노출용 글 구성·최적화",["상위 노출 글을 분석해 키워드·구성 제안","글쓰기 중 실시간 최적화 점수"],["무료 요금제가 없고 구글 검색 중심"],["블로그 글 검색 최적화","기존 글 개선 포인트 찾기"]],
  en: ["Structures and optimizes writing to rank in search",["Analyzes top-ranking pages for keywords and structure","Live optimization score as you write"],["No free plan; focused on Google"],["Optimize blog posts for search","Find improvements for old posts"]],
  ja: ["検索上位を狙う記事構成と最適化",["上位記事を分析してキーワードと構成を提案","執筆中にリアルタイム最適化スコア"],["無料プランがなくGoogle検索中心"],["ブログ記事の検索最適化","既存記事の改善点探し"]],
  zh: ["为搜索排名优化文章结构",["分析排名靠前的文章，建议关键词和结构","写作时实时显示优化分数"],["没有免费方案，以谷歌为主"],["博客文章搜索优化","找出旧文章的改进点"]]
}, [["Essential","$99","mo"]]);
S("HyperWrite", "writing", "marketing", "https://hyperwriteai.com", "mix", false, {
  ko: ["문장 자동 완성과 글쓰기 도우미",["쓰는 도중 다음 문장 자동 완성","브라우저 어디서나 사용"],["영어 위주로 최적화됨"],["영어 글쓰기 속도 높이기","이메일 답장 초안"]],
  en: ["Sentence autocomplete and a writing assistant",["Autocompletes your next sentence as you type","Works anywhere in the browser"],["Optimized mainly for English"],["Speed up English writing","Draft email replies"]],
  ja: ["文章の自動補完と執筆アシスタント",["書いている途中で次の文を自動補完","ブラウザのどこでも使える"],["主に英語向けに最適化"],["英作文のスピードアップ","メール返信の下書き"]],
  zh: ["句子自动补全与写作助手",["写作中自动补全下一句","在浏览器任何地方使用"],["主要针对英文优化"],["提高英文写作速度","起草邮件回复"]]
}, [["@free","$0"],["Premium","$19.99","mo"]]);
S("Sudowrite", "writing", "marketing", "https://sudowrite.com", "paid", false, {
  ko: ["소설·웹소설 창작 보조",["장면 묘사·전개 아이디어를 제안","인물·설정을 기억하며 이어 쓰기"],["무료 요금제가 없고 영어 중심"],["막힌 장면 이어 쓰기","캐릭터 설정 정리"]],
  en: ["A creative partner for novels and web fiction",["Suggests scene descriptions and plot ideas","Continues writing while remembering characters and world"],["No free plan; English-focused"],["Get unstuck on a scene","Organize character profiles"]],
  ja: ["小説・Web小説の創作支援",["場面描写や展開のアイデアを提案","人物や設定を覚えて書き進める"],["無料プランがなく英語中心"],["行き詰まった場面の続きを書く","キャラクター設定の整理"]],
  zh: ["小说和网文创作助手",["提供场景描写和情节发展灵感","记住人物和设定续写"],["没有免费方案，以英文为主"],["续写卡住的场景","整理人物设定"]]
}, [["@paid",null]]);

/* ---------- 글쓰기·번역 › 교정·문장 다듬기 ---------- */
S("바른한글 맞춤법 검사기", "writing", "proofread", "https://nara-speller.co.kr", "free", true, {
  ko: ["국내 대표 한국어 맞춤법·띄어쓰기 검사",["한국어 맞춤법·띄어쓰기 교정에 가장 많이 쓰임","무료로 바로 사용"],["문장을 자연스럽게 바꿔 주지는 않음"],["자기소개서 제출 전 점검","보고서 맞춤법 확인"]],
  en: ["Korea's leading Korean spelling and spacing checker",["The most widely used Korean spelling and spacing checker","Free and instant"],["Doesn't rewrite sentences to sound natural"],["Check a Korean cover letter before submitting","Proof a Korean report"]],
  ja: ["韓国を代表する韓国語のスペル・分かち書き検査",["韓国語のスペル・分かち書き校正で最も使われている","無料ですぐ使える"],["文章を自然に書き換えてはくれない"],["韓国語の自己PR文を提出前に点検","韓国語レポートの校正"]],
  zh: ["韩国代表性的韩语拼写和空格检查器",["最常用的韩语拼写和空格校对工具","免费即用"],["不会把句子改写得更自然"],["提交前检查韩语自荐书","校对韩语报告"]]
}, [["@free","$0"]]);
S("Grammarly", "writing", "proofread", "https://grammarly.com", "mix", true, {
  ko: ["영어 문법·어조 교정",["메일, 문서, 브라우저 어디서나 실시간 교정","어조를 정중하게, 간결하게 바꿔 줌"],["한국어 교정은 지원하지 않음"],["영문 이메일 보내기 전 점검","영어 에세이 문장 다듬기"]],
  en: ["An AI writing checker for English grammar, tone and clarity",["Real-time suggestions in email, docs and the browser","Rewrites to sound more polite or more concise"],["Does not check Korean"],["Check an English email before sending","Polish sentences in an English essay"]],
  ja: ["英語の文法・トーン・明瞭さを直すAI校正ツール",["メール、文書、ブラウザのどこでもリアルタイム校正","トーンを丁寧に、簡潔に書き換えてくれる"],["日本語・韓国語の校正には非対応"],["英文メールを送る前のチェック","英語エッセイの文章を整える"]],
  zh: ["修正英语语法、语气和清晰度的AI校对工具",["在邮件、文档、浏览器中实时校对","可改写得更礼貌或更简洁"],["不支持中文和韩语校对"],["发送英文邮件前检查","润色英文论文的句子"]]
}, [["@free","$0"],["Pro","$12","mo"]]);
S("QuillBot", "writing", "proofread", "https://quillbot.com", "mix", true, {
  ko: ["문장 바꿔 쓰기·요약·문법 검사",["같은 뜻을 다른 표현으로 바꿔 쓰기","요약·인용 생성 등 학생용 기능"],["무료는 한 번에 바꿀 수 있는 글자 수가 적음"],["영어 과제 표현 다양하게","긴 영어 글 요약"]],
  en: ["Paraphrasing, summarizing and grammar checking",["Rewrites the same meaning in different words","Student tools like summaries and citations"],["Free plan limits how much text you can rewrite"],["Vary wording in an English assignment","Summarize a long English text"]],
  ja: ["言い換え・要約・文法チェック",["同じ意味を別の表現に言い換え","要約や引用生成など学生向け機能"],["無料は一度に書き換えられる文字数が少ない"],["英語課題の表現にバリエーション","長い英文の要約"]],
  zh: ["改写、总结与语法检查",["用不同说法表达同一意思","提供摘要、引用生成等学生功能"],["免费版单次改写字数少"],["让英文作业表达更丰富","总结长篇英文"]]
}, [["@free","$0"],["Premium","$9.95","mo"]]);
S("DeepL Write", "writing", "proofread", "https://deepl.com/write", "mix", false, {
  ko: ["영어 등 외국어 문장을 자연스럽게 다듬기",["어색한 외국어 문장을 자연스럽게","격식·캐주얼 톤 선택"],["한국어 교정은 지원 범위가 제한적"],["영문 메일 문장 다듬기","외국어 자기소개 교정"]],
  en: ["Polishes English and other foreign-language writing",["Makes awkward foreign-language sentences natural","Choose formal or casual tone"],["Limited support for Korean"],["Polish an English email","Proofread a self-introduction in another language"]],
  ja: ["英語など外国語の文章を自然に整える",["ぎこちない外国語の文を自然に","フォーマル・カジュアルのトーンを選択"],["韓国語の校正は対応範囲が限定的"],["英文メールの推敲","外国語の自己紹介を校正"]],
  zh: ["把英文等外语句子润色得更自然",["让生硬的外语句子更自然","可选择正式或随意语气"],["对韩语校对支持有限"],["润色英文邮件","校对外语自我介绍"]]
}, [["@free","$0"],["DeepL Pro",null]]);
S("Wordtune", "writing", "proofread", "https://wordtune.com", "mix", false, {
  ko: ["문장을 여러 버전으로 다시 쓰기",["한 문장을 더 짧게, 더 격식 있게 등 골라서 수정","읽은 글 요약 기능도 제공"],["영어 중심이고 무료 사용 횟수가 적음"],["어색한 영어 문장 자연스럽게 고치기","영문 자기소개 다듬기"]],
  en: ["An English writing helper that rewrites sentences several ways",["Pick shorter, more formal or more casual rewrites","Also summarizes what you read"],["English-focused with few free rewrites"],["Fix an awkward English sentence","Polish an English self-introduction"]],
  ja: ["書いた文を複数パターンに書き換える英語ライティング支援",["一文をより短く、よりフォーマルになど選んで修正","読んだ記事の要約機能もある"],["英語中心で無料回数が少ない"],["ぎこちない英文を自然に直す","英語の自己紹介を整える"]],
  zh: ["把写好的句子改写成多个版本的英文写作助手",["可选更简短、更正式等方式修改一句话","还提供阅读内容摘要"],["以英文为主，免费次数少"],["把别扭的英文句子改自然","润色英文自我介绍"]]
}, [["@free","$0"],["Advanced","$13.99","mo"]]);
S("LanguageTool", "writing", "proofread", "https://languagetool.org", "mix", false, {
  ko: ["여러 언어를 지원하는 문법 검사",["영어·독일어·스페인어 등 다양한 언어 지원","브라우저·워드에서 실시간 교정"],["한국어는 지원하지 않음"],["유럽어 과제 문법 점검","다국어 이메일 교정"]],
  en: ["A grammar checker that supports many languages",["Supports English, German, Spanish and many more","Real-time checking in the browser and Word"],["Does not support Korean"],["Check grammar in a European-language assignment","Proofread multilingual emails"]],
  ja: ["多言語対応の文法チェッカー",["英語・ドイツ語・スペイン語など多言語に対応","ブラウザやWordでリアルタイム校正"],["韓国語には非対応"],["欧州言語の課題の文法チェック","多言語メールの校正"]],
  zh: ["支持多种语言的语法检查器",["支持英语、德语、西班牙语等多种语言","在浏览器和Word中实时校对"],["不支持韩语"],["检查欧洲语言作业语法","校对多语言邮件"]]
}, [["@free","$0"],["Premium",null]]);
S("ProWritingAid", "writing", "proofread", "https://prowritingaid.com", "mix", false, {
  ko: ["긴 글의 문체·가독성 분석",["문체·반복·가독성까지 상세 리포트","소설·논문 같은 긴 글에 적합"],["영어 전용이고 기능이 많아 복잡함"],["영어 소설 원고 점검","영어 에세이 문체 개선"]],
  en: ["Style and readability analysis for long writing",["Detailed reports on style, repetition and readability","Suited to long work like novels and theses"],["English only, and the many features feel complex"],["Review an English novel manuscript","Improve the style of an English essay"]],
  ja: ["長文の文体・読みやすさ分析",["文体・繰り返し・読みやすさまで詳しいレポート","小説や論文など長文向き"],["英語専用で機能が多く複雑"],["英語小説の原稿チェック","英語エッセイの文体改善"]],
  zh: ["长文风格与可读性分析",["详细分析文风、重复和可读性","适合小说、论文等长文"],["仅支持英文，功能多显复杂"],["检查英文小说稿","改进英文论文文风"]]
}, [["@free","$0"],["Premium","$10","mo"]]);
S("Hemingway Editor", "writing", "proofread", "https://hemingwayapp.com", "mix", false, {
  ko: ["읽기 쉬운 영어 문장으로 다듬기",["길고 어려운 문장을 색으로 표시","읽기 난이도 점수 제공"],["영어 전용"],["영어 보고서 문장 간결하게","블로그 글 가독성 높이기"]],
  en: ["Makes English sentences clear and easy to read",["Highlights long, hard sentences in color","Gives a readability grade"],["English only"],["Tighten sentences in an English report","Make blog posts easier to read"]],
  ja: ["読みやすい英文に整えるエディター",["長くて難しい文を色で表示","読みやすさのスコアを表示"],["英語専用"],["英語レポートの文を簡潔に","ブログ記事を読みやすく"]],
  zh: ["让英文句子清晰易读的编辑器",["用颜色标出冗长难懂的句子","提供可读性评分"],["仅支持英文"],["让英文报告句子更简洁","提升博客可读性"]]
}, [["@free","$0"],["Desktop","$19.99","once"],["Plus","$10","mo"]]);
S("Paperpal", "writing", "proofread", "https://paperpal.com", "mix", false, {
  ko: ["학술 영어 논문 교정",["학술 문체에 맞춘 교정","투고 전 체크리스트 점검"],["무료 사용량이 제한적"],["영어 논문 투고 전 교정","초록 문장 다듬기"]],
  en: ["Proofreading for academic English papers",["Edits tuned to academic style","Pre-submission checks"],["Limited free usage"],["Proofread a paper before submission","Polish an abstract"]],
  ja: ["学術英語論文の校正",["学術文体に合わせた校正","投稿前のチェックリスト点検"],["無料の利用量が限られる"],["英語論文を投稿前に校正","アブストラクトの文章を整える"]],
  zh: ["学术英文论文校对",["针对学术文风的校对","投稿前检查清单"],["免费用量有限"],["投稿前校对英文论文","润色摘要"]]
}, [["@free","$0"],["Prime",null]]);

/* ---------- 글쓰기·번역 › 번역 ---------- */
S("DeepL 번역", "writing", "translate", "https://deepl.com", "mix", true, {
  ko: ["자연스러운 번역, 문서 파일 통째 번역",["어색하지 않은 문장으로 번역됨","워드·PDF 문서를 서식 그대로 번역"],["무료 버전은 글자 수와 문서 수에 제한이 있음"],["영문 이메일 번역해서 답장하기","해외 자료 PDF 통째로 번역"]],
  en: ["An AI translator known for natural, context-aware translation",["Translations read smoothly","Translates Word and PDF files keeping the layout"],["The free plan limits characters and documents"],["Translate and reply to a foreign-language email","Translate a whole PDF report"]],
  ja: ["文脈を生かした自然な翻訳で知られるAI翻訳",["不自然さの少ない文章に訳される","WordやPDFを書式そのままで翻訳"],["無料版は文字数と文書数に制限がある"],["英文メールを訳して返信","海外資料のPDFを丸ごと翻訳"]],
  zh: ["以贴合语境、译文自然著称的AI翻译",["译文通顺不生硬","Word和PDF文档可保留格式翻译"],["免费版有字数和文档数量限制"],["翻译外文邮件并回复","整份翻译海外PDF资料"]]
}, [["@free","$0"],["DeepL Pro",null]]);
S("파파고", "writing", "translate", "https://papago.naver.com", "free", true, {
  ko: ["한국어 번역에 강한 네이버 번역",["한국어 표현과 존댓말을 잘 살림","이미지·음성 번역까지 무료"],["긴 전문 문서는 DeepL보다 다듬을 부분이 생기기도 함"],["여행 중 메뉴판 사진 번역","한국어 메시지를 일본어·중국어로 번역"]],
  en: ["Naver's free translator, strong in Korean",["Handles Korean expressions and honorifics well","Image and voice translation for free"],["Long technical documents may need more editing than DeepL"],["Translate a menu photo while traveling","Translate a Korean message into Japanese or Chinese"]],
  ja: ["韓国語の翻訳に強いNAVERの無料翻訳",["韓国語の表現や敬語をうまく反映","画像・音声翻訳まで無料"],["長い専門文書はDeepLより手直しが必要なことも"],["旅行中にメニューの写真を翻訳","韓国語メッセージを日本語・中国語に翻訳"]],
  zh: ["擅长韩语翻译的NAVER免费翻译器",["能准确体现韩语表达和敬语","图片和语音翻译也免费"],["长篇专业文档可能比DeepL需要更多修改"],["旅行时拍照翻译菜单","把韩语消息译成日语或中文"]]
}, [["@free","$0"]]);
S("Google 번역", "writing", "translate", "https://translate.google.com", "free", true, {
  ko: ["가장 많은 언어 지원, 카메라·음성 번역",["가장 많은 언어 지원","카메라·음성·대화 통역까지 무료"],["긴 전문 문서는 표현이 다소 딱딱할 수 있음"],["해외여행 중 간판·메뉴 번역","외국인과 대화 통역"]],
  en: ["Supports the most languages, with camera and voice translation",["The widest language coverage","Free camera, voice and conversation translation"],["Long technical documents can read stiffly"],["Translate signs and menus abroad","Interpret a conversation"]],
  ja: ["最多の言語に対応、カメラ・音声翻訳",["最も多くの言語に対応","カメラ・音声・会話通訳まで無料"],["長い専門文書は表現がやや硬いことも"],["海外旅行中に看板やメニューを翻訳","外国人との会話を通訳"]],
  zh: ["支持语言最多，提供拍照和语音翻译",["支持语言最多","拍照、语音、对话翻译均免费"],["长篇专业文档表达可能较生硬"],["出国时翻译招牌和菜单","与外国人对话翻译"]]
}, [["@free","$0"]]);
S("Immersive Translate", "writing", "translate", "https://immersivetranslate.com", "mix", false, {
  ko: ["웹페이지·PDF를 원문과 번역 나란히",["원문과 번역을 나란히 보여 학습에도 좋음","여러 번역 엔진 선택"],["고급 AI 번역 엔진은 유료"],["영어 기사 원문 대조해 읽기","영어 PDF 논문 번역"]],
  en: ["Shows web pages and PDFs with the translation side by side",["Original and translation side by side, great for learning","Choose among translation engines"],["Premium AI engines are paid"],["Read English articles alongside the translation","Translate an English PDF paper"]],
  ja: ["Webページ・PDFを原文と訳文を並べて表示",["原文と訳文を並べて表示、学習にも最適","複数の翻訳エンジンを選べる"],["上位のAI翻訳エンジンは有料"],["英語記事を原文と対照して読む","英語のPDF論文を翻訳"]],
  zh: ["网页和PDF原文与译文对照显示",["原文与译文并排显示，也适合学习","可选择多种翻译引擎"],["高级AI翻译引擎收费"],["对照阅读英文文章","翻译英文PDF论文"]]
}, [["@free","$0"],["Pro",null]]);
S("플리토", "writing", "translate", "https://flitto.com", "mix", false, {
  ko: ["다국어 실시간 통역·번역 서비스",["행사·강연 실시간 다국어 통역","필요하면 전문 번역가 연결"],["실시간 통역은 기업·행사용 유료"],["외국인 참석 행사 자막 통역","중요 문서 전문 번역 의뢰"]],
  en: ["Multilingual real-time interpretation and translation",["Live multilingual interpretation for events and talks","Connects to professional translators when needed"],["Live interpretation is a paid business service"],["Live captions for events with foreign guests","Order professional translation for key documents"]],
  ja: ["多言語のリアルタイム通訳・翻訳サービス",["イベントや講演のリアルタイム多言語通訳","必要に応じて専門翻訳者につなぐ"],["リアルタイム通訳は企業・イベント向けの有料"],["外国人参加イベントの字幕通訳","重要文書の専門翻訳を依頼"]],
  zh: ["多语言实时口译和翻译服务",["活动和演讲的实时多语言口译","必要时可对接专业译者"],["实时口译为企业和活动付费服务"],["有外国嘉宾的活动字幕翻译","委托专业翻译重要文件"]]
}, [["@free","$0"],["@ent","quote"]]);
S("Smartcat", "writing", "translate", "https://smartcat.com", "mix", false, {
  ko: ["기업용 AI 번역·현지화 플랫폼",["문서·웹사이트를 여러 언어로 일괄 현지화","번역 메모리로 용어 통일"],["개인보다는 기업용"],["제품 매뉴얼 다국어 번역","웹사이트 해외 버전 만들기"]],
  en: ["An AI translation and localization platform for businesses",["Localize documents and websites into many languages at once","Translation memory keeps terms consistent"],["Built for businesses rather than individuals"],["Translate a product manual into many languages","Create overseas versions of a website"]],
  ja: ["企業向けAI翻訳・ローカライズプラットフォーム",["文書やWebサイトを複数言語に一括ローカライズ","翻訳メモリで用語を統一"],["個人より企業向け"],["製品マニュアルの多言語翻訳","Webサイトの海外版づくり"]],
  zh: ["面向企业的AI翻译和本地化平台",["批量把文档和网站本地化为多种语言","翻译记忆库统一术语"],["面向企业而非个人"],["把产品手册翻译成多语言","制作网站海外版"]]
}, [["@free","$0"],["@paid",null]]);
S("XL8", "writing", "translate", "https://xl8.ai", "paid", false, {
  ko: ["영상 자막 번역에 특화된 국내 서비스",["영상 자막 번역과 싱크 맞추기에 특화","구어체 자막 번역 품질이 좋음"],["기업·미디어 대상 유료"],["콘텐츠 자막 다국어 번역","해외 배급용 자막 제작"]],
  en: ["A Korean service specializing in video subtitle translation",["Specialized in subtitle translation and timing","Good at conversational subtitles"],["Paid, aimed at businesses and media"],["Translate content subtitles into many languages","Make subtitles for international distribution"]],
  ja: ["動画字幕翻訳に特化した韓国のサービス",["動画字幕の翻訳とタイミング合わせに特化","口語字幕の翻訳品質が高い"],["企業・メディア向けの有料"],["コンテンツ字幕の多言語翻訳","海外配信用の字幕制作"]],
  zh: ["专注视频字幕翻译的韩国服务",["专注视频字幕翻译与时间轴对齐","口语化字幕翻译质量好"],["面向企业和媒体收费"],["把内容字幕翻译成多语言","制作海外发行字幕"]]
}, [["@ent","quote"]]);

/* ---------- 이미지·디자인 › 이미지 생성 ---------- */
S("Midjourney", "image", "generate", "https://midjourney.com", "paid", true, {
  ko: ["예술적 완성도가 높은 이미지 생성",["분위기 있는 고퀄리티 이미지가 기본으로 나옴","스타일 참조로 일관된 그림체 유지"],["무료 체험이 없고 이미지 속 글자에는 약함"],["앨범 커버·포스터 콘셉트 아트","웹사이트 메인 비주얼 시안"]],
  en: ["An image generator famous for artistic, striking images",["High-quality, moody images out of the box","Style references keep a consistent look"],["No free trial, and weak at text inside images"],["Concept art for a cover or poster","Hero visual drafts for a website"]],
  ja: ["芸術的でセンスのある画像で有名な画像生成AI",["雰囲気のある高品質な画像が標準で出る","スタイル参照で絵柄を統一できる"],["無料体験がなく、画像内の文字に弱い"],["アルバムジャケットやポスターのコンセプトアート","Webサイトのメインビジュアル案"]],
  zh: ["以艺术感强、富有质感的图像闻名的AI绘图工具",["默认就能生成有氛围的高质量图像","可用风格参考保持统一画风"],["没有免费试用，不擅长图中文字"],["专辑封面、海报的概念图","网站主视觉草案"]]
}, [["Basic","$10","mo"],["Standard","$30","mo"],["Pro","$60","mo"],["Mega","$120","mo"]]);
S("ChatGPT 이미지", "image", "generate", "https://chatgpt.com", "mix", true, {
  ko: ["대화하며 이미지 생성·수정",["말로 '여기만 바꿔줘' 하며 수정하기 쉬움","이미지 속 글자를 비교적 정확하게 넣음"],["무료 사용자는 생성 횟수가 적음"],["발표 자료용 일러스트 만들기","SNS 이벤트 포스터 시안"]],
  en: ["ChatGPT's image feature: describe it, then ask for changes in chat",["Easy to edit by saying 'change just this part'","Puts text inside images fairly accurately"],["Free users get few generations"],["Make illustrations for slides","Draft an event poster for social media"]],
  ja: ["会話のように説明し、修正を頼める ChatGPTの画像機能",["「ここだけ変えて」と言葉で直しやすい","画像内の文字を比較的正確に入れられる"],["無料ユーザーは生成回数が少ない"],["発表資料用のイラスト作成","SNSイベントのポスター案"]],
  zh: ["ChatGPT的图像功能，像聊天一样描述并提出修改",["一句「只改这里」就能轻松修改","能较准确地在图中加入文字"],["免费用户生成次数少"],["为演示文稿制作插图","社交媒体活动海报草图"]]
}, [["@free","$0"],["Plus","$20","mo"],["Pro","$200","mo"]]);
S("Gemini 이미지 (Nano Banana)", "image", "generate", "https://gemini.google.com", "mix", true, {
  ko: ["인물 일관성 유지와 사진 편집에 강함",["인물·사물 모습을 유지한 채 편집하는 능력이 뛰어남","제미나이 앱에서 무료로 바로 사용"],["무료 사용량을 넘으면 기본 모델로 바뀜"],["내 사진 배경만 바꾸기","상품 사진을 여러 연출로 바꿔 보기"]],
  en: ["Google's image model for natural edits to just the part you want",["Keeps people and objects consistent while editing","Free to use right in the Gemini app"],["Falls back to the basic model after the free quota"],["Swap only the background of your photo","Try a product photo in different scenes"]],
  ja: ["写真をアップして、変えたい部分だけ自然に編集できるGoogleの画像モデル",["人物や物の見た目を保ったまま編集するのが得意","Geminiアプリで無料ですぐ使える"],["無料枠を超えると基本モデルに切り替わる"],["自分の写真の背景だけ変える","商品写真をいろいろな演出で試す"]],
  zh: ["上传照片后只自然修改想改部分的谷歌图像模型",["编辑时能保持人物和物体外观一致","在Gemini应用中免费直接使用"],["超出免费额度后切换为基础模型"],["只换掉自己照片的背景","把商品照片换成不同场景"]]
}, [["@free","$0"],["Google AI Pro","$19.99","mo"],["Google AI Ultra","$249.99","mo"]]);
S("Adobe Firefly", "image", "generate", "https://firefly.adobe.com", "mix", true, {
  ko: ["상업적으로 안심하고 쓰는 이미지 생성",["저작권 걱정이 적은 학습 데이터로 기업 사용에 유리","포토샵·일러스트레이터와 바로 연결"],["무료 생성 크레딧이 적음"],["회사 홍보물에 쓸 이미지 만들기","포토샵에서 사진 빈 곳 채우기"]],
  en: ["Adobe's image generator built to be safe for commercial use",["Trained to reduce copyright worries, good for business","Connects directly to Photoshop and Illustrator"],["Few free generation credits"],["Create images for company materials","Fill empty areas of a photo in Photoshop"]],
  ja: ["商用でも安心して使えるようにつくられたAdobeの画像生成AI",["著作権の心配が少ない学習データで企業利用に向く","PhotoshopやIllustratorとすぐ連携"],["無料の生成クレジットが少ない"],["会社の広報物に使う画像づくり","Photoshopで写真の空白を埋める"]],
  zh: ["为放心商用而打造的Adobe AI绘图工具",["训练数据版权风险低，适合企业使用","与Photoshop、Illustrator直接联动"],["免费生成积分少"],["制作公司宣传用图","在Photoshop中填补照片空白"]]
}, [["@free","$0"],["Firefly Standard","$9.99","mo"],["Firefly Pro","$29.99","mo"]]);
S("Ideogram", "image", "generate", "https://ideogram.ai", "mix", false, {
  ko: ["글자가 들어간 이미지·포스터에 강함",["포스터·로고처럼 글자가 들어간 디자인에 강함","무료로 매주 일정량 생성 가능"],["사실적인 사진 느낌은 다른 모델보다 약할 수 있음"],["행사 포스터 문구 넣어 만들기","티셔츠 문구 디자인 시안"]],
  en: ["An image generator that is great at putting accurate text in images",["Strong for posters and logos with lettering","A weekly free allowance"],["Photorealism can trail other models"],["Make an event poster with its headline","Draft a T-shirt slogan design"]],
  ja: ["画像の中に文字を正確に入れるのが得意な画像生成AI",["ポスターやロゴなど文字入りデザインに強い","毎週一定量を無料で生成できる"],["写真のようなリアルさは他モデルに劣ることも"],["イベントポスターを文字入りで作る","Tシャツのロゴデザイン案"]],
  zh: ["擅长在图像中准确加入文字的AI绘图工具",["适合海报、标志等带文字的设计","每周有一定免费额度"],["写实照片效果可能不如其他模型"],["制作带标题文字的活动海报","T恤文字设计草案"]]
}, [["@free","$0"],["Basic","$8","mo"],["Plus","$20","mo"],["Pro","$60","mo"]]);
S("FLUX", "image", "generate", "https://bfl.ai", "mix", false, {
  ko: ["사실적인 고품질 이미지 생성 모델",["사진처럼 사실적인 결과물","여러 서비스·API에서 사용 가능"],["공식 사이트는 개발자·API 중심"],["실사풍 제품 사진 시안","광고용 고화질 이미지"]],
  en: ["A high-quality model for realistic images",["Photorealistic results","Available through many services and APIs"],["The official site is developer/API-focused"],["Photo-style product mockups","High-resolution ad images"]],
  ja: ["リアルで高品質な画像生成モデル",["写真のようにリアルな結果","多くのサービスやAPIで使える"],["公式サイトは開発者・API向け"],["実写風の商品写真案","広告用の高画質画像"]],
  zh: ["生成写实高质量图像的模型",["生成照片般写实的结果","可在多种服务和API中使用"],["官网以开发者和API为主"],["写实风产品图草案","广告用高清图片"]]
}, [["API","payg"]]);
S("Leonardo.Ai", "image", "generate", "https://leonardo.ai", "mix", false, {
  ko: ["게임·캐릭터 에셋 생성",["같은 캐릭터를 다양한 포즈로 유지","매일 무료 토큰 제공"],["기능이 많아 처음엔 화면이 복잡하게 느껴짐"],["웹툰·게임 캐릭터 시트 만들기","블로그 연재용 일관된 일러스트"]],
  en: ["An image AI good for consistent characters and game assets",["Keeps the same character across poses","Free tokens every day"],["Many options make the interface busy at first"],["Make a character sheet for a comic or game","Consistent illustrations for a blog series"]],
  ja: ["キャラクターやゲーム素材を同じ見た目で何枚も作れる画像AI",["同じキャラクターをさまざまなポーズで維持","毎日無料トークンがもらえる"],["機能が多く、最初は画面が複雑に感じる"],["ウェブトゥーンやゲームのキャラシート作成","ブログ連載用の統一感あるイラスト"]],
  zh: ["适合批量制作外观一致的角色和游戏素材的图像AI",["同一角色可保持不同姿势","每天提供免费积分"],["功能多，刚开始界面显得复杂"],["制作漫画或游戏角色设定图","为博客连载制作风格统一的插图"]]
}, [["@free","$0"],["Apprentice","$12","mo"],["Artisan","$30","mo"],["Maestro","$60","mo"]]);
S("Krea", "image", "generate", "https://krea.ai", "mix", false, {
  ko: ["실시간 생성과 업스케일, 여러 모델 통합",["그리는 즉시 결과가 바뀌는 실시간 생성","업스케일·영상 생성까지 한곳에서"],["무료 사용량이 적음"],["스케치로 콘셉트 아트 만들기","저해상도 이미지 고화질로"]],
  en: ["Real-time generation, upscaling and many models in one place",["Real-time generation that updates as you draw","Upscaling and video in one place"],["Small free allowance"],["Turn sketches into concept art","Upscale low-resolution images"]],
  ja: ["リアルタイム生成・アップスケール・複数モデル統合",["描いた瞬間に結果が変わるリアルタイム生成","アップスケールや動画生成まで一か所で"],["無料枠が少ない"],["スケッチからコンセプトアート","低解像度画像を高画質に"]],
  zh: ["实时生成、放大与多模型整合",["边画边出结果的实时生成","放大和视频生成一站完成"],["免费额度少"],["用草图生成概念图","把低分辨率图片变高清"]]
}, [["@free","$0"],["Basic","$10","mo"],["Pro","$35","mo"],["Max","$60","mo"]]);
S("Dreamina", "image", "generate", "https://dreamina.capcut.com", "mix", false, {
  ko: ["캡컷 계열의 이미지·영상 생성",["매일 무료 크레딧 제공","캡컷과 연계해 바로 편집"],["저작권·상업 이용 조건 확인 필요"],["숏폼용 이미지·영상 소스","SNS 이벤트 이미지"]],
  en: ["Image and video generation from the CapCut family",["Free credits every day","Edit right away with CapCut"],["Check rights and commercial-use terms"],["Image and video assets for short-form","Images for social media events"]],
  ja: ["CapCut系の画像・動画生成",["毎日無料クレジット","CapCutと連携してすぐ編集"],["著作権や商用利用条件の確認が必要"],["ショート動画用の画像・動画素材","SNSイベント用画像"]],
  zh: ["剪映(CapCut)系列的图像和视频生成",["每天提供免费积分","与剪映联动直接编辑"],["需确认版权和商用条款"],["短视频用图片和视频素材","社交媒体活动图片"]]
}, [["@free","$0"],["@paid",null]]);
S("Bing Image Creator", "image", "generate", "https://bing.com/create", "free", false, {
  ko: ["마이크로소프트 계정으로 무료 이미지 생성",["마이크로소프트 계정만 있으면 무료","OpenAI 이미지 모델 기반"],["빠른 생성 횟수가 제한됨"],["발표용 일러스트 무료로","아이디어 스케치 이미지"]],
  en: ["Free image generation with a Microsoft account",["Free with just a Microsoft account","Built on OpenAI image models"],["Limited fast generations"],["Free illustrations for presentations","Quick idea sketches"]],
  ja: ["Microsoftアカウントで無料画像生成",["Microsoftアカウントがあれば無料","OpenAIの画像モデルを利用"],["高速生成の回数に制限"],["発表用のイラストを無料で","アイデアのスケッチ画像"]],
  zh: ["用微软账号免费生成图片",["有微软账号即可免费使用","基于OpenAI图像模型"],["快速生成次数有限"],["免费制作演示插图","创意草图"]]
}, [["@free","$0"]]);
S("Stable Diffusion", "image", "generate", "https://stability.ai", "mix", false, {
  ko: ["직접 설치도 가능한 오픈 이미지 모델",["내 컴퓨터에 설치해 무제한·무료 사용","커뮤니티 확장 기능이 풍부"],["설치와 설정이 어렵고 좋은 그래픽카드가 필요"],["나만의 화풍 학습시키기","대량 이미지 생성"]],
  en: ["An open image model you can install yourself",["Install on your computer for unlimited free use","Huge range of community extensions"],["Hard to set up and needs a good GPU"],["Train your own art style","Generate images in bulk"]],
  ja: ["自分でインストールできるオープン画像モデル",["自分のPCに入れて無制限・無料で使える","コミュニティの拡張機能が豊富"],["導入・設定が難しく高性能GPUが必要"],["自分の画風を学習させる","画像の大量生成"]],
  zh: ["可自行安装的开源图像模型",["装在自己电脑上无限免费使用","社区扩展丰富"],["安装配置难，需要好显卡"],["训练自己的画风","批量生成图片"]]
}, [["@selfhost","$0"],["API","payg"]]);

/* ---------- 이미지·디자인 › 이미지 편집·보정 ---------- */
S("Photoshop 생성형 채우기", "image", "edit", "https://adobe.com/photoshop", "paid", true, {
  ko: ["선택 영역을 말로 채우고 지우기",["선택한 영역만 자연스럽게 바꾸거나 지움","포토샵의 정밀 편집과 함께 사용"],["포토샵 유료 구독이 필요함"],["사진 속 불필요한 사람 지우기","사진 배경 확장"]],
  en: ["Fill or remove a selection just by describing it",["Naturally changes or removes just the selected area","Works with Photoshop's precise editing"],["Requires a paid Photoshop plan"],["Remove unwanted people from a photo","Extend a photo's background"]],
  ja: ["選択範囲を言葉で埋めたり消したり",["選んだ部分だけを自然に変えたり消したりできる","Photoshopの精密編集と併用"],["Photoshopの有料契約が必要"],["写真の不要な人物を消す","写真の背景を拡張"]],
  zh: ["用文字描述填充或删除选区",["只自然地修改或删除选中区域","可配合Photoshop精细编辑"],["需要Photoshop付费订阅"],["删除照片中多余的人","扩展照片背景"]]
}, [["Photoshop","$22.99","mo"]]);
S("Canva 매직 스튜디오", "image", "edit", "https://canva.com", "mix", true, {
  ko: ["배경 제거·확장·지우기를 클릭 한 번에",["배경 제거·확장 등 AI 편집을 클릭 한 번에","디자인 템플릿과 바로 연결"],["대부분의 AI 편집은 캔바 프로 필요"],["상품 사진 배경 지우기","사진 비율 맞춰 확장"]],
  en: ["Background removal, expansion and erasing in one click",["One-click AI edits like background removal and expansion","Connects straight to design templates"],["Most AI edits need Canva Pro"],["Remove product photo backgrounds","Extend a photo to a new ratio"]],
  ja: ["背景除去・拡張・消去をワンクリックで",["背景除去や拡張などのAI編集をワンクリックで","デザインテンプレートとすぐ連携"],["ほとんどのAI編集はCanva Proが必要"],["商品写真の背景を消す","写真を比率に合わせて拡張"]],
  zh: ["一键去背景、扩图和擦除",["一键完成去背景、扩图等AI编辑","直接衔接设计模板"],["大部分AI编辑需要Canva Pro"],["去除商品图背景","按比例扩展照片"]]
}, [["@free","$0"],["Canva Pro","$15","mo"],["Canva Teams","$10","user"]]);
S("remove.bg", "image", "edit", "https://remove.bg", "mix", true, {
  ko: ["사진 배경 자동 제거",["몇 초 만에 깔끔하게 배경 제거","여러 장 일괄 처리 가능"],["무료는 저해상도로만 저장"],["증명사진 배경 바꾸기","쇼핑몰 상품 누끼 따기"]],
  en: ["Removes photo backgrounds automatically",["Clean background removal in seconds","Batch processing"],["Free downloads are low resolution"],["Change an ID photo background","Cut out product photos for a store"]],
  ja: ["写真の背景を自動除去",["数秒できれいに背景を除去","複数枚の一括処理"],["無料は低解像度でのみ保存"],["証明写真の背景を変える","ネットショップの商品切り抜き"]],
  zh: ["自动去除照片背景",["几秒内干净去除背景","支持批量处理"],["免费只能保存低分辨率"],["更换证件照背景","为网店商品抠图"]]
}, [["@free","$0"],["@paid",null]]);
S("Photoroom", "image", "edit", "https://photoroom.com", "mix", false, {
  ko: ["상품 사진 배경·연출 자동 생성",["상품 사진을 광고 같은 장면으로 바꿔 줌","휴대폰 앱으로 간편하게"],["무료 버전은 워터마크와 기능 제한"],["중고거래·쇼핑몰 상품 사진","SNS 홍보 이미지"]],
  en: ["Automatically creates backgrounds and staging for product photos",["Turns product photos into ad-style scenes","Easy on the phone app"],["Free version has watermarks and limits"],["Photos for resale or online stores","Promo images for social media"]],
  ja: ["商品写真の背景・演出を自動生成",["商品写真を広告のような場面に変える","スマホアプリで手軽に"],["無料版は透かしと機能制限あり"],["フリマやネットショップの商品写真","SNS用の宣伝画像"]],
  zh: ["自动生成商品图背景和场景",["把商品照片变成广告般的场景","手机应用即可轻松完成"],["免费版有水印和功能限制"],["二手交易和网店商品图","社交媒体宣传图"]]
}, [["@free","$0"],["Pro",null]]);
S("Freepik AI", "image", "edit", "https://freepik.com", "mix", false, {
  ko: ["여러 생성 모델을 모은 디자인 플랫폼",["여러 이미지·영상 모델을 한곳에서 사용","방대한 스톡 소스와 함께 활용"],["크레딧 체계가 복잡함"],["모델별 결과 비교","디자인 소스 찾고 바로 수정"]],
  en: ["A design platform that gathers many generation models",["Many image and video models in one place","Works alongside a huge stock library"],["The credit system is complicated"],["Compare results across models","Find design assets and edit them right away"]],
  ja: ["複数の生成モデルを集めたデザインプラットフォーム",["複数の画像・動画モデルを一か所で使える","膨大なストック素材と一緒に活用"],["クレジット体系が複雑"],["モデルごとの結果を比較","デザイン素材を探してすぐ編集"]],
  zh: ["汇集多种生成模型的设计平台",["一站使用多种图像和视频模型","结合海量素材库使用"],["积分体系复杂"],["比较各模型效果","找到设计素材直接修改"]]
}, [["@free","$0"],["@paid",null]]);
S("Magnific", "image", "edit", "https://magnific.ai", "paid", false, {
  ko: ["디테일을 살리는 고해상도 업스케일",["확대하면서 디테일을 새로 만들어 선명하게","AI 이미지 마무리 보정에 강함"],["무료 요금제가 없고 비쌈"],["AI 이미지 인쇄용으로 확대","작은 이미지 고화질화"]],
  en: ["High-resolution upscaling that adds rich detail",["Adds new detail while upscaling","Great for finishing AI images"],["No free plan, and pricey"],["Upscale AI images for print","Make small images high-resolution"]],
  ja: ["ディテールを生かす高解像度アップスケール",["拡大しながらディテールを新たに作り鮮明に","AI画像の仕上げ補正に強い"],["無料プランがなく高価"],["AI画像を印刷用に拡大","小さな画像を高画質化"]],
  zh: ["保留细节的高清放大",["放大时生成新细节，画面更清晰","擅长AI图片的最后修饰"],["没有免费方案且价格高"],["把AI图片放大用于印刷","把小图变高清"]]
}, [["Pro","$39","mo"]]);
S("Topaz Photo", "image", "edit", "https://topazlabs.com", "paid", false, {
  ko: ["사진 노이즈 제거·선명도·확대",["흔들리거나 어두운 사진 복원","사진가들이 많이 쓰는 고품질 처리"],["유료이고 컴퓨터 사양이 필요"],["오래된 사진 복원","야간 사진 노이즈 제거"]],
  en: ["Noise removal, sharpening and enlarging for photos",["Restores blurry or dark photos","High-quality processing loved by photographers"],["Paid and needs a capable computer"],["Restore old photos","Remove noise from night shots"]],
  ja: ["写真のノイズ除去・鮮明化・拡大",["ぶれた写真や暗い写真を復元","写真家に人気の高品質処理"],["有料でPCの性能が必要"],["古い写真の復元","夜景写真のノイズ除去"]],
  zh: ["照片降噪、锐化和放大",["修复模糊或昏暗的照片","摄影师常用的高质量处理"],["收费且需要较好电脑"],["修复老照片","去除夜景照片噪点"]]
}, [["@paid",null]]);
S("Picsart", "image", "edit", "https://picsart.com", "mix", false, {
  ko: ["모바일 사진 편집과 AI 효과",["휴대폰에서 쉽게 꾸미고 편집","스티커·효과 템플릿이 많음"],["좋은 효과는 유료가 많음"],["프로필 사진 꾸미기","SNS용 콜라주"]],
  en: ["Mobile photo editing with AI effects",["Easy decorating and editing on your phone","Lots of stickers and effect templates"],["Many of the best effects are paid"],["Style a profile photo","Make a collage for social media"]],
  ja: ["モバイル写真編集とAIエフェクト",["スマホで手軽に加工・編集","スタンプやエフェクトのテンプレートが豊富"],["よいエフェクトは有料が多い"],["プロフィール写真の加工","SNS用コラージュ"]],
  zh: ["手机修图与AI特效",["在手机上轻松美化编辑","贴纸和特效模板多"],["好的特效多为付费"],["美化头像","制作社交媒体拼图"]]
}, [["@free","$0"],["@paid",null]]);
S("Pixlr", "image", "edit", "https://pixlr.com", "mix", false, {
  ko: ["웹 브라우저에서 쓰는 AI 사진 편집",["설치 없이 브라우저에서 포토샵처럼 편집","가벼운 가격"],["무료 버전은 광고와 저장 횟수 제한"],["학교 컴퓨터에서 사진 편집","간단한 배경 제거"]],
  en: ["AI photo editing right in the web browser",["Photoshop-like editing in the browser, nothing to install","Low price"],["Free version has ads and save limits"],["Edit photos on a school computer","Quick background removal"]],
  ja: ["Webブラウザで使えるAI写真編集",["インストール不要でブラウザからPhotoshopのように編集","手頃な価格"],["無料版は広告と保存回数の制限"],["学校のPCで写真編集","簡単な背景除去"]],
  zh: ["在网页浏览器中使用的AI修图",["无需安装，在浏览器中像Photoshop一样编辑","价格低"],["免费版有广告和保存次数限制"],["在学校电脑上修图","简单去背景"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 이미지·디자인 › 로고·브랜딩 ---------- */
S("Looka", "image", "logo", "https://looka.com", "mix", true, {
  ko: ["로고와 명함·SNS용 브랜드 키트",["로고 하나로 명함·SNS 이미지까지 자동 생성","디자인 지식 없이도 브랜드 구성"],["고해상도 파일은 유료 구매"],["창업 아이템 로고 시안","동아리 브랜드 키트"]],
  en: ["Logos plus brand kits for business cards and social media",["One logo auto-generates business cards and social images","Build a brand without design skills"],["High-resolution files are paid"],["Logo drafts for a startup idea","A brand kit for a club"]],
  ja: ["ロゴと名刺・SNS用のブランドキット",["ロゴ一つから名刺やSNS画像まで自動生成","デザイン知識がなくてもブランドを構成"],["高解像度ファイルは有料購入"],["起業アイデアのロゴ案","サークルのブランドキット"]],
  zh: ["标志及名片、社交媒体品牌套件",["一个标志即可自动生成名片和社媒图片","不懂设计也能打造品牌"],["高清文件需付费购买"],["创业项目标志草案","社团品牌套件"]]
}, [["Logo Package","$20","once"],["Brand Kit","$96","yr"]]);
S("Recraft", "image", "logo", "https://recraft.ai", "mix", true, {
  ko: ["벡터 로고·아이콘·일러스트 생성",["확대해도 깨지지 않는 벡터 파일로 저장","브랜드 색과 스타일을 맞춘 아이콘 세트 제작"],["사진 같은 이미지보다는 그래픽 디자인에 특화"],["앱에 쓸 아이콘 세트 만들기","로고 시안 여러 개 뽑기"]],
  en: ["A design-focused image AI that makes logos and icons as vectors (SVG)",["Saves vector files that stay sharp at any size","Icon sets matched to brand colors and style"],["Built for graphics more than photos"],["Create an icon set for an app","Generate several logo drafts"]],
  ja: ["ロゴやアイコンをベクター(SVG)で作れるデザイン向け画像AI",["拡大しても粗くならないベクターで保存","ブランドの色とスタイルに合わせたアイコンセット"],["写真風よりグラフィックデザインに特化"],["アプリ用のアイコンセット作成","ロゴ案をいくつも出す"]],
  zh: ["能把标志和图标做成矢量(SVG)的设计类图像AI",["保存为放大也不失真的矢量文件","制作符合品牌色彩和风格的图标集"],["更擅长平面设计而非照片"],["为应用制作图标集","生成多个标志草案"]]
}, [["@free","$0"],["@paid",null]]);
S("Brandmark", "image", "logo", "https://brandmark.io", "mix", false, {
  ko: ["이름만 넣으면 로고 시안 제안",["이름과 키워드만으로 다양한 로고 제안","로고 파일과 브랜드 가이드 제공"],["한글 로고 디자인에는 약함"],["영문 브랜드 로고 시안","로고 방향성 탐색"]],
  en: ["Suggests logo drafts from just a name",["Many logo ideas from just a name and keywords","Provides logo files and a brand guide"],["Weak for Korean-letter logos"],["Drafts for an English brand logo","Explore logo directions"]],
  ja: ["名前を入れるだけでロゴ案を提案",["名前とキーワードだけで多彩なロゴを提案","ロゴファイルとブランドガイドを提供"],["ハングルのロゴには弱い"],["英字ブランドのロゴ案","ロゴの方向性を探る"]],
  zh: ["输入名称即可推荐标志方案",["只需名称和关键词即可推荐多种标志","提供标志文件和品牌指南"],["不擅长韩文标志"],["英文品牌标志草案","探索标志方向"]]
}, [["@paid",null]]);
S("Kittl", "image", "logo", "https://kittl.com", "mix", false, {
  ko: ["타이포·굿즈 디자인과 AI 생성",["감각적인 타이포 템플릿이 풍부","티셔츠·스티커 등 굿즈 디자인에 적합"],["한글 폰트 선택이 적음"],["티셔츠 문구 디자인","스티커·포스터 제작"]],
  en: ["Typography and merch design with AI generation",["Lots of stylish typography templates","Great for merch like T-shirts and stickers"],["Few Korean fonts"],["Design a T-shirt slogan","Make stickers and posters"]],
  ja: ["タイポグラフィやグッズデザインとAI生成",["センスのよいタイポテンプレートが豊富","Tシャツやステッカーなどのグッズに最適"],["日本語フォントの選択肢が少ない"],["Tシャツのロゴデザイン","ステッカーやポスター制作"]],
  zh: ["字体设计、周边设计与AI生成",["时尚字体模板丰富","适合T恤、贴纸等周边设计"],["中文字体选择少"],["设计T恤文字","制作贴纸和海报"]]
}, [["@free","$0"],["Pro",null]]);
S("Designs.ai", "image", "logo", "https://designs.ai", "paid", false, {
  ko: ["로고·영상·배너를 한 곳에서",["로고·영상·배너를 하나의 구독으로","브랜드 일관성 유지"],["무료 요금제가 없음"],["작은 사업 브랜드 자료 일괄 제작","홍보 영상과 배너 함께 만들기"]],
  en: ["Logos, videos and banners in one place",["Logos, video and banners under one subscription","Keeps the brand consistent"],["No free plan"],["Create brand materials for a small business","Make promo videos and banners together"]],
  ja: ["ロゴ・動画・バナーを一か所で",["ロゴ・動画・バナーを一つのサブスクで","ブランドの一貫性を維持"],["無料プランがない"],["小規模事業のブランド資料を一括制作","宣伝動画とバナーを一緒に作る"]],
  zh: ["标志、视频、横幅一站完成",["一个订阅搞定标志、视频和横幅","保持品牌一致"],["没有免费方案"],["为小生意批量制作品牌资料","一起制作宣传视频和横幅"]]
}, [["@paid",null]]);

/* ---------- 이미지·디자인 › 썸네일·SNS 디자인 ---------- */
S("미리캔버스 AI", "image", "sns", "https://miricanvas.com", "mix", true, {
  ko: ["한글 템플릿으로 썸네일·카드뉴스 제작",["한국 감성 템플릿과 상업용 무료 폰트가 많음","AI로 PPT 초안과 이미지를 생성"],["고급 템플릿과 AI 기능 일부는 유료"],["학교·회사 발표 PPT 디자인","카드뉴스와 상세페이지 제작"]],
  en: ["A Korean design platform for slides with Korean fonts and templates",["Many Korean-style templates and free commercial fonts","AI drafts slides and images"],["Premium templates and some AI features are paid"],["Design slides for school or work","Make social cards and product detail pages"]],
  ja: ["韓国語フォントと韓国風テンプレートでスライドを作る韓国製デザインプラットフォーム",["韓国らしいテンプレートと商用無料フォントが豊富","AIでスライドの下書きと画像を生成"],["上位テンプレートと一部AI機能は有料"],["学校や会社の発表スライドのデザイン","カードニュースや商品ページの制作"]],
  zh: ["用韩文字体和韩式模板制作PPT的韩国设计平台",["韩式模板和可商用免费字体多","AI生成PPT初稿和图片"],["高级模板和部分AI功能收费"],["设计学校或公司的演示PPT","制作图文卡片和商品详情页"]]
}, [["@free","$0"],["Pro","₩14,900","mo"]]);
S("Adobe Express", "image", "sns", "https://adobe.com/express", "mix", true, {
  ko: ["SNS 게시물·썸네일 빠른 제작",["어도비 폰트·스톡과 Firefly 생성 기능","템플릿으로 빠르게 완성"],["고급 템플릿과 생성 크레딧은 유료"],["유튜브 썸네일","인스타 카드뉴스"]],
  en: ["Quickly make social posts and thumbnails",["Adobe fonts, stock and Firefly generation","Finish fast with templates"],["Premium templates and credits are paid"],["YouTube thumbnails","Instagram card posts"]],
  ja: ["SNS投稿やサムネイルを素早く作成",["Adobeのフォント・素材とFirefly生成機能","テンプレートで素早く完成"],["上位テンプレートと生成クレジットは有料"],["YouTubeのサムネイル","インスタのカード投稿"]],
  zh: ["快速制作社交帖子和缩略图",["Adobe字体、素材与Firefly生成功能","用模板快速完成"],["高级模板和生成积分收费"],["YouTube缩略图","Instagram图文卡片"]]
}, [["@free","$0"],["Premium","$9.99","mo"]]);
S("망고보드", "image", "sns", "https://mangoboard.net", "mix", false, {
  ko: ["카드뉴스·상세페이지 국내 템플릿",["국내 감성의 카드뉴스·상세페이지 템플릿","한글 폰트 저작권 걱정이 적음"],["무료 버전은 워터마크와 다운로드 제한"],["홍보용 카드뉴스","쇼핑몰 상세페이지"]],
  en: ["Korean templates for card news and product detail pages",["Korean-style templates for card news and detail pages","Few font-licensing worries"],["Free version has watermarks and download limits"],["Card news for promotion","Product detail pages for a store"]],
  ja: ["カードニュースや商品詳細ページの韓国製テンプレート",["韓国風のカードニュース・商品ページのテンプレート","フォントの著作権の心配が少ない"],["無料版は透かしとダウンロード制限"],["宣伝用カードニュース","ネットショップの商品詳細ページ"]],
  zh: ["韩国图文卡片和商品详情页模板",["韩式图文卡片和详情页模板","字体版权顾虑少"],["免费版有水印和下载限制"],["宣传图文卡片","网店商品详情页"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 이미지·디자인 › UI·디자인 시안 ---------- */
S("Figma AI", "image", "ui", "https://figma.com", "mix", true, {
  ko: ["피그마 안에서 시안 생성·프로토타입",["프롬프트로 화면 초안과 프로토타입 생성","팀 협업 디자인 툴과 바로 연결"],["AI 기능은 사용량에 한도가 있음"],["앱 화면 시안 빠르게","디자인 레이어 이름 자동 정리"]],
  en: ["Generate mockups and prototypes inside Figma",["Generate screen drafts and prototypes from prompts","Built into a team design tool"],["AI features have usage limits"],["Quick app screen mockups","Auto-rename design layers"]],
  ja: ["Figmaの中でデザイン案生成・プロトタイプ",["プロンプトで画面案やプロトタイプを生成","チームのデザインツールとすぐ連携"],["AI機能は利用量に上限がある"],["アプリ画面の案を素早く","デザインレイヤー名を自動整理"]],
  zh: ["在Figma中生成设计稿和原型",["用提示词生成界面草稿和原型","直接连接团队协作设计工具"],["AI功能有用量限制"],["快速做应用界面草案","自动整理图层名称"]]
}, [["@free","$0"],["Professional","$16","user"],["Organization","$55","user"]]);
S("Google Stitch", "image", "ui", "https://stitch.withgoogle.com", "free", true, {
  ko: ["설명이나 스케치로 앱·웹 화면 시안",["말이나 손그림으로 화면 디자인 생성","피그마로 내보내기와 코드 제공"],["실험 서비스라 기능이 바뀔 수 있음"],["앱 아이디어 화면 시안","손그림 와이어프레임을 디자인으로"]],
  en: ["Turn a description or sketch into app and web screen designs",["Generate screens from words or hand sketches","Export to Figma and get code"],["An experiment, so features may change"],["Mock up screens for an app idea","Turn a hand-drawn wireframe into a design"]],
  ja: ["説明やスケッチからアプリ・Web画面案",["言葉や手描きから画面デザインを生成","Figmaへの書き出しとコード提供"],["実験サービスなので機能が変わることも"],["アプリアイデアの画面案","手描きワイヤーフレームをデザインに"]],
  zh: ["用描述或草图生成应用和网页界面",["用文字或手绘草图生成界面设计","可导出到Figma并提供代码"],["实验性服务，功能可能变化"],["为应用创意做界面草案","把手绘线框图变成设计"]]
}, [["@free","$0"]]);
S("Uizard", "image", "ui", "https://uizard.io", "mix", false, {
  ko: ["손그림·스크린샷을 편집 가능한 화면으로",["손그림·스크린샷을 편집 가능한 디자인으로 변환","비디자이너도 쉽게 사용"],["정교한 디자인 시스템 작업에는 한계"],["서비스 기획 화면 시안","경쟁 앱 화면 참고해 재구성"]],
  en: ["Turns hand drawings and screenshots into editable screens",["Converts sketches and screenshots into editable designs","Easy for non-designers"],["Limited for detailed design-system work"],["Mock up screens for a service plan","Rework a competitor app screen as reference"]],
  ja: ["手描きやスクショを編集できる画面に",["手描きやスクショを編集可能なデザインに変換","非デザイナーでも使いやすい"],["精密なデザインシステム作業には限界"],["サービス企画の画面案","競合アプリの画面を参考に再構成"]],
  zh: ["把手绘和截图变成可编辑界面",["把手绘和截图转成可编辑设计","非设计师也易上手"],["精细设计系统工作有局限"],["服务策划界面草案","参考竞品界面重新设计"]]
}, [["@free","$0"],["Pro",null]]);
S("Visily", "image", "ui", "https://visily.ai", "mix", false, {
  ko: ["비디자이너용 와이어프레임 제작",["템플릿과 AI로 와이어프레임 빠르게","기획자·개발자도 쉽게 사용"],["고급 기능은 유료"],["기획서용 화면 설계","팀 회의용 화면 흐름도"]],
  en: ["Wireframing for non-designers",["Fast wireframes with templates and AI","Easy for PMs and developers"],["Advanced features are paid"],["Screen design for a planning doc","Screen flows for a team meeting"]],
  ja: ["非デザイナー向けワイヤーフレーム作成",["テンプレートとAIでワイヤーフレームを素早く","企画者や開発者でも簡単"],["高度な機能は有料"],["企画書用の画面設計","チーム会議用の画面フロー"]],
  zh: ["面向非设计师的线框图工具",["用模板和AI快速做线框图","产品经理和开发者也易用"],["高级功能收费"],["策划书用界面设计","团队会议用界面流程图"]]
}, [["@free","$0"],["Pro",null]]);
S("Relume", "image", "ui", "https://relume.io", "mix", false, {
  ko: ["사이트맵·와이어프레임 자동 생성",["회사 소개만 넣으면 사이트맵·와이어프레임 생성","피그마·웹플로로 바로 내보내기"],["무료는 프로젝트 수 제한"],["홈페이지 구조 설계","웹 기획 초안"]],
  en: ["Auto-generates sitemaps and wireframes",["Sitemaps and wireframes from a short company description","Export straight to Figma or Webflow"],["Free plan limits projects"],["Plan a website's structure","A first web planning draft"]],
  ja: ["サイトマップとワイヤーフレームを自動生成",["会社紹介を入れるだけでサイトマップとワイヤーフレーム生成","FigmaやWebflowへすぐ書き出し"],["無料はプロジェクト数に制限"],["ホームページの構成設計","Web企画の下書き"]],
  zh: ["自动生成网站地图和线框图",["输入公司介绍即可生成网站地图和线框图","直接导出到Figma或Webflow"],["免费版限制项目数"],["设计网站结构","网页策划初稿"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 영상·애니메이션 › 영상 생성 ---------- */
S("Google Flow (Veo)", "video", "generate", "https://labs.google/flow", "paid", true, {
  ko: ["구글 Veo 모델로 장면·대사가 있는 영상",["영상과 소리를 한 번에 생성","사실적인 장면 표현이 뛰어남"],["Google AI 유료 요금제가 필요하고 크레딧 소모가 큼"],["광고 콘셉트 영상 만들기","발표용 짧은 장면 영상"]],
  en: ["Google's video model that also creates dialogue and sound",["Video and audio generated together","Very realistic scenes"],["Needs a paid Google AI plan and uses many credits"],["Make a concept video for an ad","Short scene clips for a presentation"]],
  ja: ["セリフや効果音まで一緒に作るGoogleの動画生成AI",["映像と音を一度に生成","リアルな場面表現が得意"],["有料のGoogle AIプランが必要でクレジット消費が大きい"],["広告のコンセプト動画づくり","発表用の短いシーン動画"]],
  zh: ["连台词和音效一起生成的谷歌视频AI",["画面和声音一次生成","写实场景表现出色"],["需要付费Google AI方案，积分消耗大"],["制作广告概念视频","演示用的短场景视频"]]
}, [["Google AI Pro","$19.99","mo"],["Google AI Ultra","$249.99","mo"]]);
S("Runway", "video", "generate", "https://runwayml.com", "mix", true, {
  ko: ["영상 생성과 편집 기능을 갖춘 전문가용",["생성한 영상을 바로 편집·보정까지","카메라 움직임 등 세밀한 조절 가능"],["크레딧이 빨리 소진되어 비용이 늘기 쉬움"],["뮤직비디오 실험 영상","기존 영상 배경 지우고 바꾸기"]],
  en: ["An AI video tool for creators with generation and editing together",["Generate and then edit or grade right away","Fine control such as camera movement"],["Credits run out fast, so costs add up"],["Experimental music video shots","Remove and replace a video background"]],
  ja: ["動画生成と編集ツールをあわせ持つクリエイター向けAI動画ツール",["生成した動画をそのまま編集・補正","カメラの動きなど細かく調整できる"],["クレジットの消費が早く費用がかさみやすい"],["MVの実験映像","既存動画の背景を消して差し替え"]],
  zh: ["兼具视频生成和剪辑工具的创作者AI视频平台",["生成后可直接剪辑和调色","可细致控制镜头运动等"],["积分消耗快，费用容易增加"],["音乐视频实验镜头","抠除并替换视频背景"]]
}, [["@free","$0"],["Standard","$15","mo"],["Pro","$35","mo"],["Unlimited","$95","mo"]]);
S("Kling AI", "video", "generate", "https://klingai.com", "mix", true, {
  ko: ["자연스러운 움직임의 고화질 영상 생성",["사람 움직임과 이미지→영상 변환이 자연스러움","무료 크레딧으로 써볼 수 있음"],["무료 생성은 대기 시간이 길 수 있음"],["옛날 사진을 움직이는 영상으로","상품 이미지로 짧은 홍보 영상"]],
  en: ["A video generator that brings photos to life with natural motion",["Natural human motion and image-to-video","Free credits to try it"],["Free generations can have long waits"],["Animate an old photo","Turn a product image into a short promo"]],
  ja: ["写真を自然に動く動画にする動画生成AI",["人の動きと画像→動画変換が自然","無料クレジットで試せる"],["無料生成は待ち時間が長いことがある"],["昔の写真を動く動画に","商品画像から短いPR動画"]],
  zh: ["把照片变成自然动态视频的视频生成AI",["人物动作和图生视频效果自然","可用免费积分试用"],["免费生成可能需要长时间排队"],["让老照片动起来","用商品图制作短宣传片"]]
}, [["@free","$0"],["Standard","$10","mo"],["Pro","$37","mo"]]);
S("Hailuo AI", "video", "generate", "https://hailuoai.video", "mix", false, {
  ko: ["MiniMax의 가성비 영상 생성",["가격 대비 결과물 품질이 좋음","사람 움직임 표현이 자연스러움"],["무료 생성은 대기 시간이 김"],["숏폼용 짧은 장면","이미지를 움직이는 영상으로"]],
  en: ["MiniMax's good-value video generator",["Good quality for the price","Natural human motion"],["Free generations wait in long queues"],["Short scenes for short-form video","Animate an image"]],
  ja: ["MiniMaxのコスパのよい動画生成",["価格の割に品質がよい","人の動きが自然"],["無料生成は待ち時間が長い"],["ショート動画用の短い場面","画像を動く動画に"]],
  zh: ["MiniMax推出的高性价比视频生成",["性价比高","人物动作自然"],["免费生成排队时间长"],["短视频用短镜头","让图片动起来"]]
}, [["@free","$0"],["@paid",null]]);
S("Luma Dream Machine", "video", "generate", "https://lumalabs.ai", "mix", false, {
  ko: ["이미지·글로 영상 생성과 수정",["대화하듯 영상 수정 요청","카메라 움직임 표현이 부드러움"],["무료 사용량이 적음"],["제품 회전 영상","콘셉트 무드 영상"]],
  en: ["Create and edit video from images or text",["Edit videos by chatting","Smooth camera movement"],["Small free allowance"],["A rotating product video","A concept mood video"]],
  ja: ["画像や文章から動画を生成・修正",["会話するように動画の修正を依頼","カメラの動きがなめらか"],["無料枠が少ない"],["商品の回転動画","コンセプトのムード動画"]],
  zh: ["用图片或文字生成并修改视频",["像对话一样修改视频","镜头运动流畅"],["免费额度少"],["产品旋转展示视频","概念氛围视频"]]
}, [["@free","$0"],["Lite","$9.99","mo"],["Plus","$29.99","mo"]]);
S("Pika", "video", "generate", "https://pika.art", "mix", false, {
  ko: ["특수효과·재미있는 짧은 영상",["녹아내리기·폭발 같은 재미있는 효과","사용법이 쉬움"],["사실적인 장면 품질은 상위 모델보다 낮음"],["SNS용 재미있는 효과 영상","밈 영상 만들기"]],
  en: ["Fun short videos with special effects",["Fun effects like melting or exploding","Easy to use"],["Realism trails top models"],["Fun effect clips for social media","Make meme videos"]],
  ja: ["特殊効果のある楽しい短い動画",["溶ける・爆発するなど楽しい効果","使い方が簡単"],["リアルな場面の品質は上位モデルに劣る"],["SNS用の面白いエフェクト動画","ミーム動画づくり"]],
  zh: ["带特效的趣味短视频",["融化、爆炸等趣味特效","操作简单"],["写实画面不如顶级模型"],["社交媒体趣味特效视频","制作表情包视频"]]
}, [["@free","$0"],["Standard","$10","mo"],["Pro","$35","mo"]]);
S("Higgsfield", "video", "generate", "https://higgsfield.ai", "mix", false, {
  ko: ["카메라 무빙 프리셋과 여러 모델 통합",["영화 같은 카메라 무빙을 클릭으로 적용","여러 영상 모델을 한곳에서"],["크레딧 소모가 빠름"],["뮤직비디오 느낌 장면","광고용 다이내믹 영상"]],
  en: ["Camera-move presets and many models in one place",["Apply cinematic camera moves with a click","Many video models in one place"],["Credits run out fast"],["Music-video-style shots","Dynamic ad clips"]],
  ja: ["カメラワークのプリセットと複数モデル統合",["映画のようなカメラワークをクリックで適用","複数の動画モデルを一か所で"],["クレジットの消費が早い"],["MV風の場面","広告用のダイナミックな動画"]],
  zh: ["镜头运动预设与多模型整合",["一键套用电影级运镜","一站使用多个视频模型"],["积分消耗快"],["MV风格镜头","广告用动感视频"]]
}, [["@free","$0"],["@paid",null]]);
S("Vidu", "video", "generate", "https://vidu.com", "mix", false, {
  ko: ["참조 이미지로 인물 일관성 유지",["참조 이미지로 같은 인물을 여러 장면에 유지","애니메이션 스타일에도 강함"],["무료 영상은 워터마크가 있음"],["같은 캐릭터가 나오는 시리즈 영상","애니메이션 숏폼"]],
  en: ["Keeps characters consistent using reference images",["Keeps the same character across scenes via reference images","Strong at anime styles too"],["Free videos have watermarks"],["A series with the same character","Animated short-form clips"]],
  ja: ["参照画像で人物の一貫性を維持",["参照画像で同じ人物を複数の場面で維持","アニメ風にも強い"],["無料動画には透かしが入る"],["同じキャラが登場するシリーズ動画","アニメのショート動画"]],
  zh: ["用参考图保持人物一致",["用参考图在多个场景保持同一人物","也擅长动漫风格"],["免费视频有水印"],["同一角色的系列视频","动画短视频"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 영상·애니메이션 › 영상 편집·자막·숏폼 ---------- */
S("Vrew", "video", "edit", "https://vrew.ai", "mix", true, {
  ko: ["자동 자막으로 말 단위 컷 편집 (국내)",["한국어 자막 인식이 정확함","글자를 지우면 해당 영상도 잘리는 쉬운 편집"],["무료 버전은 월 사용 시간과 기능에 제한"],["유튜브 영상 자막 자동 생성","강의 영상 말실수 부분 잘라내기"]],
  en: ["A Korean tool that turns speech into subtitles and edits video like a document",["Accurate Korean subtitles","Delete text and the matching video is cut"],["The free plan limits monthly time and features"],["Auto-subtitle a YouTube video","Cut out mistakes in a lecture video"]],
  ja: ["音声を字幕に変え、文書のように動画を編集できる韓国製ツール",["韓国語字幕の認識が正確","文字を消すとその部分の映像も切れる簡単編集"],["無料版は月の利用時間と機能に制限"],["YouTube動画の字幕を自動生成","講義動画の言い間違いをカット"]],
  zh: ["把语音转成字幕、像编辑文档一样剪视频的韩国工具",["韩语字幕识别准确","删掉文字即可剪掉对应画面"],["免费版每月时长和功能有限"],["自动生成YouTube视频字幕","剪掉课程视频中的口误"]]
}, [["@free","$0"],["@paid",null]]);
S("CapCut", "video", "edit", "https://capcut.com", "mix", true, {
  ko: ["자동 자막·템플릿으로 숏폼 편집",["자동 자막, 배경 제거 등 AI 편집 기능이 많음","틱톡·릴스용 템플릿이 풍부"],["일부 효과와 고급 기능은 유료"],["릴스·쇼츠 빠르게 편집","영상 자동 자막 달기"]],
  en: ["A free video editor with AI features, strong for short-form",["Many AI tools like auto captions and background removal","Lots of templates for TikTok and Reels"],["Some effects and advanced features are paid"],["Edit Reels and Shorts fast","Add auto captions to a video"]],
  ja: ["ショート動画の編集に強い無料動画エディターとAI機能",["自動字幕や背景除去などAI編集機能が多い","TikTokやリール向けテンプレートが豊富"],["一部のエフェクトや高度な機能は有料"],["リールやショートを素早く編集","動画に自動字幕を付ける"]],
  zh: ["擅长短视频剪辑的免费视频编辑器及AI功能",["自动字幕、抠背景等AI剪辑功能多","抖音和Reels模板丰富"],["部分特效和高级功能收费"],["快速剪辑Reels和Shorts","为视频添加自动字幕"]]
}, [["@free","$0"],["Pro",null]]);
S("Descript", "video", "edit", "https://descript.com", "mix", true, {
  ko: ["대본을 고치면 영상이 편집됨",["문서처럼 글을 지우면 영상도 잘림","군말 제거·화면 녹화·팟캐스트 편집"],["한국어 인식은 영어보다 약함"],["인터뷰 영상 편집","팟캐스트 군말 정리"]],
  en: ["Edit video by editing the transcript",["Delete text like a document and the video is cut","Filler-word removal, screen recording, podcasts"],["Korean recognition is weaker than English"],["Edit an interview video","Clean up filler words in a podcast"]],
  ja: ["台本を直すと動画が編集される",["文書のように文字を消すと動画もカット","言い淀み除去・画面録画・ポッドキャスト編集"],["日本語認識は英語より弱い"],["インタビュー動画の編集","ポッドキャストの言い淀み整理"]],
  zh: ["改文字稿就能剪视频",["像删文档一样删字就能剪视频","去除口头语、录屏、播客剪辑"],["中文识别弱于英文"],["剪辑采访视频","清理播客口头禅"]]
}, [["@free","$0"],["Hobbyist","$16","mo"],["Creator","$24","mo"]]);
S("OpusClip", "video", "edit", "https://opus.pro", "mix", true, {
  ko: ["긴 영상을 숏폼 클립으로 자동 분할",["긴 영상에서 화제가 될 구간을 골라 줌","자막·세로 비율 자동 처리"],["무료는 워터마크와 처리 시간 제한"],["유튜브 영상을 쇼츠로","강연 영상 하이라이트"]],
  en: ["Automatically cuts long videos into short-form clips",["Picks the most shareable moments from long videos","Auto captions and vertical crop"],["Free plan has watermarks and time limits"],["Turn YouTube videos into Shorts","Highlights from a talk"]],
  ja: ["長い動画をショート動画に自動分割",["長い動画から話題になりそうな部分を選ぶ","字幕と縦型比率を自動処理"],["無料は透かしと処理時間の制限"],["YouTube動画をショートに","講演動画のハイライト"]],
  zh: ["把长视频自动剪成短视频",["从长视频中挑出容易爆的片段","自动字幕和竖屏裁切"],["免费版有水印和时长限制"],["把YouTube视频做成Shorts","演讲视频精彩片段"]]
}, [["@free","$0"],["Starter","$15","mo"],["Pro","$29","mo"]]);
S("Premiere Pro 생성형 확장", "video", "edit", "https://adobe.com/premiere", "paid", false, {
  ko: ["장면 길이를 AI로 늘리고 다듬기",["모자란 컷 길이를 AI로 자연스럽게 늘림","전문 편집 프로그램 안에서 바로"],["프리미어 프로 유료 구독 필요"],["음악 박자에 맞게 장면 늘리기","편집 중 빈 프레임 채우기"]],
  en: ["Extend and refine scene length with AI in Premiere Pro",["Naturally extends a short clip with AI","Right inside a pro editor"],["Requires a paid Premiere Pro plan"],["Stretch a shot to fit the music","Fill gaps while editing"]],
  ja: ["AIでシーンの長さを延ばし整える",["足りないカットの長さをAIで自然に延ばす","プロ用編集ソフトの中ですぐ"],["Premiere Proの有料契約が必要"],["音楽の拍に合わせて場面を延ばす","編集中の空白フレームを埋める"]],
  zh: ["用AI延长并打磨镜头时长",["用AI自然延长不够长的镜头","在专业剪辑软件中直接使用"],["需要Premiere Pro付费订阅"],["按音乐节拍延长画面","填补剪辑中的空帧"]]
}, [["Premiere Pro","$22.99","mo"]]);
S("Submagic", "video", "edit", "https://submagic.co", "mix", false, {
  ko: ["숏폼 자막을 눈에 띄게 자동 디자인",["강조 단어·이모지가 들어간 자막 자동 생성","숏폼 트렌드 스타일 템플릿"],["무료 요금제가 거의 없음"],["릴스 자막 꾸미기","쇼츠 편집 시간 단축"]],
  en: ["Auto-designs eye-catching captions for short-form video",["Auto captions with highlighted words and emojis","Templates in trending short-form styles"],["Little to no free plan"],["Style captions for Reels","Cut Shorts editing time"]],
  ja: ["ショート動画の字幕を目立つように自動デザイン",["強調語や絵文字入りの字幕を自動生成","ショート動画の流行スタイルのテンプレート"],["無料プランはほとんどない"],["リールの字幕デザイン","ショートの編集時間短縮"]],
  zh: ["自动设计吸睛的短视频字幕",["自动生成带重点词和表情的字幕","短视频流行风格模板"],["几乎没有免费方案"],["美化Reels字幕","缩短Shorts剪辑时间"]]
}, [["@paid",null]]);
S("VEED", "video", "edit", "https://veed.io", "mix", false, {
  ko: ["웹 브라우저 영상 편집과 자막",["설치 없이 브라우저에서 편집","자동 자막·번역 지원"],["무료 버전은 워터마크가 있음"],["학교 과제 영상 편집","영상 자막 번역"]],
  en: ["Video editing and subtitles in the web browser",["Edit in the browser with nothing to install","Auto subtitles and translation"],["Free version adds a watermark"],["Edit a school project video","Translate video subtitles"]],
  ja: ["Webブラウザで動画編集と字幕",["インストール不要でブラウザで編集","自動字幕と翻訳に対応"],["無料版は透かし入り"],["学校の課題動画の編集","動画字幕の翻訳"]],
  zh: ["在浏览器中剪辑视频和加字幕",["无需安装，浏览器中剪辑","支持自动字幕和翻译"],["免费版有水印"],["剪辑学校作业视频","翻译视频字幕"]]
}, [["@free","$0"],["@paid",null]]);
S("Filmora", "video", "edit", "https://filmora.wondershare.com", "mix", false, {
  ko: ["초보자용 편집기의 AI 기능",["쉬운 편집 화면과 다양한 효과","AI 자막·음성 정리 기능"],["무료 버전은 워터마크"],["브이로그 편집","가족 영상 만들기"]],
  en: ["AI features in a beginner-friendly video editor",["Easy editing interface with many effects","AI captions and audio cleanup"],["Free version adds a watermark"],["Edit a vlog","Make a family video"]],
  ja: ["初心者向け編集ソフトのAI機能",["わかりやすい編集画面と多彩なエフェクト","AI字幕や音声整理機能"],["無料版は透かし入り"],["Vlogの編集","家族の動画づくり"]],
  zh: ["适合新手的视频剪辑软件中的AI功能",["简单的剪辑界面和丰富特效","AI字幕和音频整理"],["免费版有水印"],["剪辑Vlog","制作家庭视频"]]
}, [["@free","$0"],["@paid",null]]);
S("InVideo AI", "video", "edit", "https://invideo.io", "mix", false, {
  ko: ["프롬프트로 스톡 영상 편집본 완성",["주제만 넣으면 대본·영상·음성까지 완성","방대한 스톡 영상 활용"],["스톡 영상 위주라 독창성은 떨어짐"],["정보 전달형 유튜브 영상","홍보 영상 초안"]],
  en: ["Prompts become finished edits built from stock footage",["Script, footage and voice from just a topic","Draws on a huge stock library"],["Stock-based output can feel generic"],["Informational YouTube videos","Draft a promo video"]],
  ja: ["プロンプトでストック映像の編集版が完成",["テーマを入れるだけで台本・映像・音声まで完成","膨大なストック映像を活用"],["ストック中心なので独自性は低め"],["情報系のYouTube動画","宣伝動画の下書き"]],
  zh: ["用提示词生成由素材剪成的成片",["输入主题即可完成脚本、画面和配音","利用海量素材库"],["以素材为主，原创性较弱"],["知识类YouTube视频","宣传视频初稿"]]
}, [["@free","$0"],["@paid",null]]);
S("Pictory", "video", "edit", "https://pictory.ai", "paid", false, {
  ko: ["블로그·글을 영상으로 변환",["글 링크만 넣으면 요약 영상 생성","자막과 배경 영상 자동 매칭"],["무료 요금제가 없음"],["블로그 글을 유튜브 영상으로","뉴스레터 요약 영상"]],
  en: ["Converts blog posts and articles into video",["Paste an article link and get a summary video","Auto-matched captions and footage"],["No free plan"],["Turn a blog post into a YouTube video","A newsletter recap video"]],
  ja: ["ブログや文章を動画に変換",["記事のリンクを入れるだけで要約動画を生成","字幕と背景映像を自動で組み合わせ"],["無料プランがない"],["ブログ記事をYouTube動画に","ニュースレターの要約動画"]],
  zh: ["把博客和文章转成视频",["输入文章链接即可生成摘要视频","自动匹配字幕和背景画面"],["没有免费方案"],["把博客变成YouTube视频","新闻简报摘要视频"]]
}, [["@paid",null]]);
S("Topaz Video", "video", "edit", "https://topazlabs.com", "paid", false, {
  ko: ["오래된 영상 화질 개선·업스케일",["저화질 영상을 4K급으로 업스케일","흔들림·노이즈 보정"],["유료이고 고사양 컴퓨터 필요"],["옛날 가족 영상 복원","저화질 클립 고화질화"]],
  en: ["Improves and upscales old video",["Upscales low-res video toward 4K","Fixes shake and noise"],["Paid and needs a powerful computer"],["Restore old family videos","Make low-res clips high-res"]],
  ja: ["古い動画の画質改善・アップスケール",["低画質の動画を4K級にアップスケール","ぶれやノイズを補正"],["有料で高性能PCが必要"],["昔の家族動画の復元","低画質クリップを高画質に"]],
  zh: ["老视频画质增强与放大",["把低清视频放大到接近4K","修正抖动和噪点"],["收费且需要高配电脑"],["修复老家庭录像","把低清片段变高清"]]
}, [["@paid",null]]);

/* ---------- 영상·애니메이션 › AI 아바타·발표자 ---------- */
S("HeyGen", "video", "avatar", "https://heygen.com", "mix", true, {
  ko: ["아바타 영상과 다국어 영상 번역",["실제 사람 같은 아바타와 입 모양","영상을 여러 언어로 자동 더빙"],["무료 버전은 영상 길이와 화질에 제한"],["강의·사내 교육 영상 만들기","내 영상 영어 버전으로 더빙"]],
  en: ["Turn a script into a video of a talking AI avatar",["Lifelike avatars and lip-sync","Auto-dubs videos into other languages"],["The free plan limits length and quality"],["Make lecture or training videos","Dub your video into English"]],
  ja: ["台本を入れるだけでAIアバターが話す動画を作るサービス",["本物の人のようなアバターと口の動き","動画を多言語に自動吹き替え"],["無料版は動画の長さと画質に制限"],["講義や社内研修動画づくり","自分の動画を英語に吹き替え"]],
  zh: ["输入脚本即可生成AI数字人讲解视频的服务",["数字人和口型逼真","可把视频自动配音成多种语言"],["免费版限制视频时长和画质"],["制作课程或内部培训视频","把自己的视频配成英文版"]]
}, [["@free","$0"],["Creator","$29","mo"],["Team","$39","user"]]);
S("Synthesia", "video", "avatar", "https://synthesia.io", "mix", true, {
  ko: ["기업 교육·안내용 아바타 영상",["140개가 넘는 언어 지원","슬라이드처럼 편집해 영상 완성"],["감정 표현이 많은 영상에는 다소 딱딱함"],["사내 교육·매뉴얼 영상","제품 사용법 안내 영상"]],
  en: ["An AI avatar video tool widely used for corporate training",["Supports 140+ languages","Edit like slides to build a video"],["Can feel stiff for emotional content"],["Internal training and how-to videos","Product tutorial videos"]],
  ja: ["企業研修動画によく使われるAIアバター動画制作ツール",["140以上の言語に対応","スライドのように編集して動画を完成"],["感情表現の多い動画にはやや硬い"],["社内研修・マニュアル動画","製品の使い方案内動画"]],
  zh: ["常用于企业培训的AI数字人视频制作工具",["支持140多种语言","像编辑幻灯片一样完成视频"],["情感丰富的视频会略显生硬"],["内部培训和操作手册视频","产品使用说明视频"]]
}, [["@free","$0"],["Starter","$29","mo"],["Creator","$89","mo"]]);
S("AI Studios (딥브레인AI)", "video", "avatar", "https://aistudios.com", "mix", false, {
  ko: ["국내 기업의 AI 아바타 영상 제작",["한국어 발음이 자연스러운 아바타","국내 기업 지원과 맞춤 아바타 제작"],["고급 기능은 유료"],["사내 교육 영상","한국어 안내 영상"]],
  en: ["AI avatar video creation from Korea's DeepBrain AI",["Avatars with natural Korean pronunciation","Local support and custom avatars"],["Advanced features are paid"],["Internal training videos","Korean-language guide videos"]],
  ja: ["韓国DeepBrain AIのAIアバター動画制作",["韓国語の発音が自然なアバター","韓国企業のサポートとカスタムアバター"],["高度な機能は有料"],["社内研修動画","韓国語の案内動画"]],
  zh: ["韩国DeepBrain AI的数字人视频制作",["韩语发音自然的数字人","本地支持和定制数字人"],["高级功能收费"],["内部培训视频","韩语讲解视频"]]
}, [["@free","$0"],["@paid",null]]);
S("D-ID", "video", "avatar", "https://d-id.com", "mix", false, {
  ko: ["사진 한 장을 말하는 영상으로",["사진 한 장으로 말하는 영상 제작","실시간 대화형 아바타 기능"],["표정이 다소 어색할 수 있음"],["역사 인물 소개 영상","프로필 사진으로 자기소개 영상"]],
  en: ["Turns a single photo into a talking video",["Make a talking video from one photo","Real-time conversational avatars"],["Expressions can look a bit off"],["Videos introducing historical figures","A self-intro video from a profile photo"]],
  ja: ["写真1枚を話す動画に",["写真1枚で話す動画を制作","リアルタイム対話型アバター"],["表情がややぎこちないことも"],["歴史人物の紹介動画","プロフィール写真で自己紹介動画"]],
  zh: ["把一张照片变成会说话的视频",["一张照片即可做出说话视频","实时对话数字人功能"],["表情可能略显生硬"],["历史人物介绍视频","用头像做自我介绍视频"]]
}, [["@free","$0"],["Lite","$5.90","mo"],["Pro","$29","mo"]]);
S("Colossyan", "video", "avatar", "https://colossyan.com", "paid", false, {
  ko: ["교육 콘텐츠용 아바타 영상",["퀴즈·분기 시나리오 등 교육 기능","여러 아바타가 대화하는 장면"],["무료 요금제가 없음"],["안전 교육 영상","신입 온보딩 영상"]],
  en: ["Avatar videos for training content",["Training features like quizzes and branching","Scenes with several avatars talking"],["No free plan"],["Safety training videos","New-hire onboarding videos"]],
  ja: ["教育コンテンツ用のアバター動画",["クイズや分岐シナリオなど教育機能","複数のアバターが会話する場面"],["無料プランがない"],["安全教育動画","新入社員オンボーディング動画"]],
  zh: ["用于培训内容的数字人视频",["测验、分支情景等培训功能","多个数字人对话场景"],["没有免费方案"],["安全培训视频","新员工入职视频"]]
}, [["@paid",null]]);
S("Hedra", "video", "avatar", "https://hedra.com", "mix", false, {
  ko: ["캐릭터 얼굴에 대사·표정 입히기",["그림·사진 캐릭터를 말하고 노래하게","표정 표현이 풍부함"],["긴 영상은 크레딧이 많이 듦"],["캐릭터가 말하는 홍보 영상","AI 뮤직비디오 립싱크"]],
  en: ["Adds dialogue and expressions to a character's face",["Make drawn or photo characters talk and sing","Expressive faces"],["Long videos use many credits"],["Promo videos with a talking character","Lip-sync for an AI music video"]],
  ja: ["キャラクターの顔にセリフと表情を付ける",["イラストや写真のキャラを話させ、歌わせる","表情が豊か"],["長い動画はクレジットを多く使う"],["キャラが話す宣伝動画","AIミュージックビデオの口パク"]],
  zh: ["为角色脸部加上台词和表情",["让插画或照片角色说话唱歌","表情丰富"],["长视频消耗积分多"],["角色讲解的宣传视频","AI音乐视频对口型"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 영상·애니메이션 › 애니메이션·모션 ---------- */
S("Viggle", "video", "motion", "https://viggle.ai", "mix", true, {
  ko: ["캐릭터에 춤·동작을 입히는 영상",["사진 속 인물에게 춤·동작을 입힘","밈 영상 만들기에 인기"],["실존 인물 사용은 초상권 주의"],["캐릭터 댄스 챌린지 영상","재미있는 밈 영상"]],
  en: ["Puts dance moves and motion onto any character",["Applies dances and motion to a person in a photo","Popular for meme videos"],["Be careful with real people's likeness rights"],["Character dance-challenge videos","Funny meme clips"]],
  ja: ["キャラクターにダンスや動きを付ける",["写真の人物にダンスや動きを付ける","ミーム動画づくりで人気"],["実在人物の使用は肖像権に注意"],["キャラのダンスチャレンジ動画","面白いミーム動画"]],
  zh: ["让角色跳舞做动作的视频工具",["给照片中的人物加上舞蹈和动作","很受欢迎的表情包视频工具"],["使用真人需注意肖像权"],["角色舞蹈挑战视频","搞笑表情包视频"]]
}, [["@free","$0"],["Pro",null]]);
S("Animaker", "video", "motion", "https://animaker.com", "mix", true, {
  ko: ["2D 캐릭터 애니메이션 영상 제작",["캐릭터·배경 템플릿으로 애니메이션 제작","설명 영상 만들기에 적합"],["무료 버전은 워터마크와 화질 제한"],["수업 설명 애니메이션","서비스 소개 애니메이션"]],
  en: ["2D character animation videos",["Build animations from character and scene templates","Great for explainer videos"],["Free version has watermarks and lower quality"],["Animated lesson explainers","Animated product intros"]],
  ja: ["2Dキャラクターのアニメーション動画制作",["キャラや背景のテンプレートでアニメ制作","説明動画づくりに向く"],["無料版は透かしと画質の制限"],["授業の説明アニメ","サービス紹介アニメ"]],
  zh: ["制作2D角色动画视频",["用角色和场景模板制作动画","适合做讲解视频"],["免费版有水印和画质限制"],["课堂讲解动画","服务介绍动画"]]
}, [["@free","$0"],["@paid",null]]);
S("Autodesk Flow Studio", "video", "motion", "https://autodesk.com", "mix", false, {
  ko: ["실사 영상 속 인물을 3D 캐릭터로 교체",["촬영 영상의 사람을 CG 캐릭터로 자동 교체","모션 캡처 장비 없이 가능"],["결과 다듬기에 3D 지식이 필요할 수 있음"],["단편 영화 CG 캐릭터","유튜브 VFX 실험"]],
  en: ["Swaps a person in live-action footage for a 3D character",["Automatically replaces filmed actors with CG characters","No motion-capture gear needed"],["Polishing results may need 3D skills"],["CG characters for a short film","VFX experiments for YouTube"]],
  ja: ["実写映像の人物を3Dキャラに置き換え",["撮影映像の人物をCGキャラに自動置き換え","モーションキャプチャ機材なしで可能"],["仕上げには3Dの知識が必要なことも"],["短編映画のCGキャラ","YouTubeのVFX実験"]],
  zh: ["把实拍视频中的人物替换成3D角色",["自动把拍摄画面中的人换成CG角色","无需动作捕捉设备"],["精修结果可能需要3D知识"],["短片中的CG角色","YouTube视觉特效实验"]]
}, [["@free","$0"],["@paid",null]]);
S("Move AI", "video", "motion", "https://move.ai", "mix", false, {
  ko: ["카메라만으로 모션 캡처",["휴대폰 카메라로 동작을 3D 데이터로","게임·애니메이션 툴로 내보내기"],["정확도를 높이려면 촬영 환경이 중요"],["게임 캐릭터 동작 만들기","댄스 동작 3D로 기록"]],
  en: ["Motion capture with just cameras",["Turn phone footage into 3D motion data","Export to game and animation tools"],["Accuracy depends on the shooting setup"],["Create game character motions","Capture dance moves in 3D"]],
  ja: ["カメラだけでモーションキャプチャ",["スマホのカメラで動きを3Dデータに","ゲームやアニメ制作ツールへ書き出し"],["精度を上げるには撮影環境が大事"],["ゲームキャラの動き制作","ダンスの動きを3Dで記録"]],
  zh: ["只用摄像头完成动作捕捉",["用手机摄像头把动作转成3D数据","可导出到游戏和动画工具"],["精度取决于拍摄环境"],["制作游戏角色动作","把舞蹈动作记录成3D"]]
}, [["@free","$0"],["@paid",null]]);
S("Cascadeur", "video", "motion", "https://cascadeur.com", "mix", false, {
  ko: ["AI 보조 3D 캐릭터 애니메이션",["물리 법칙에 맞게 자세를 자동 보정","개인 사용은 무료"],["3D 애니메이션 기초 지식이 필요함"],["게임 캐릭터 액션","자연스러운 점프·낙하 동작"]],
  en: ["AI-assisted 3D character animation",["Auto-corrects poses to follow physics","Free for personal use"],["Requires basic 3D animation knowledge"],["Action moves for game characters","Natural jumps and falls"]],
  ja: ["AI補助の3Dキャラクターアニメーション",["物理法則に沿って姿勢を自動補正","個人利用は無料"],["3Dアニメの基礎知識が必要"],["ゲームキャラのアクション","自然なジャンプや落下"]],
  zh: ["AI辅助的3D角色动画",["按物理规律自动修正姿势","个人使用免费"],["需要3D动画基础"],["游戏角色动作","自然的跳跃和下落"]]
}, [["@free","$0"],["@paid",null]]);
S("Krikey", "video", "motion", "https://krikey.ai", "mix", false, {
  ko: ["3D 캐릭터 애니메이션 간편 제작",["말로 설명하면 캐릭터 동작 생성","3D 지식 없이 사용"],["캐릭터 커스터마이즈 폭은 제한적"],["수업용 3D 캐릭터 영상","SNS 캐릭터 콘텐츠"]],
  en: ["Quick and easy 3D character animation",["Describe a motion and the character performs it","No 3D knowledge needed"],["Limited character customization"],["3D character videos for class","Character content for social media"]],
  ja: ["3Dキャラクターアニメを手軽に制作",["言葉で説明するとキャラの動きを生成","3Dの知識がなくても使える"],["キャラのカスタマイズ幅は限定的"],["授業用3Dキャラ動画","SNS用キャラコンテンツ"]],
  zh: ["轻松制作3D角色动画",["用文字描述即可生成角色动作","无需3D知识"],["角色自定义有限"],["课堂用3D角色视频","社交媒体角色内容"]]
}, [["@free","$0"],["@paid",null]]);
S("LottieFiles", "video", "motion", "https://lottiefiles.com", "mix", false, {
  ko: ["웹·앱용 모션 그래픽 제작",["가볍고 선명한 웹용 애니메이션 파일","무료 애니메이션 라이브러리"],["복잡한 영상 제작용은 아님"],["웹사이트 로딩 애니메이션","앱 아이콘 움직임"]],
  en: ["Motion graphics for the web and apps",["Lightweight, crisp animation files for the web","A free animation library"],["Not meant for complex video"],["Website loading animations","Animated app icons"]],
  ja: ["Web・アプリ用のモーショングラフィック制作",["軽くて鮮明なWeb用アニメーションファイル","無料のアニメーションライブラリ"],["複雑な動画制作向けではない"],["Webサイトの読み込みアニメ","アプリアイコンの動き"]],
  zh: ["网页和应用的动效制作",["轻量清晰的网页动画文件","免费动画素材库"],["不适合复杂视频制作"],["网站加载动画","应用图标动效"]]
}, [["@free","$0"],["@paid",null]]);
S("Jitter", "video", "motion", "https://jitter.video", "mix", false, {
  ko: ["UI·SNS용 모션 디자인",["피그마처럼 쉬운 화면에서 모션 제작","SNS·앱 소개 템플릿 풍부"],["고해상도 내보내기는 유료"],["앱 소개 애니메이션","SNS용 움직이는 그래픽"]],
  en: ["Motion design for UI and social media",["Make motion in a Figma-like editor","Plenty of social and app templates"],["High-res export is paid"],["App intro animations","Animated graphics for social media"]],
  ja: ["UI・SNS用のモーションデザイン",["Figmaのような簡単な画面でモーション制作","SNS・アプリ紹介のテンプレートが豊富"],["高解像度の書き出しは有料"],["アプリ紹介アニメ","SNS用の動くグラフィック"]],
  zh: ["用于界面和社交媒体的动效设计",["在类似Figma的界面中制作动效","社交媒体和应用介绍模板丰富"],["高清导出收费"],["应用介绍动画","社交媒体动态图形"]]
}, [["@free","$0"],["Pro",null]]);

/* ---------- 음성·오디오 › 음성 합성·목소리 복제 ---------- */
S("ElevenLabs", "audio", "tts", "https://elevenlabs.io", "mix", true, {
  ko: ["자연스러운 음성 합성과 목소리 복제",["감정이 살아 있는 자연스러운 목소리","내 목소리 복제와 다국어 더빙 지원"],["무료 버전은 월 글자 수가 적고 상업 이용 불가"],["유튜브 내레이션 만들기","영상 다국어 더빙"]],
  en: ["AI text-to-speech with voices that sound human",["Natural, expressive voices","Voice cloning and multilingual dubbing"],["The free plan has few characters and no commercial use"],["Create a YouTube narration","Dub a video into other languages"]],
  ja: ["人と区別がつかないほどの声を作るAI音声合成",["感情のこもった自然な声","自分の声の複製と多言語吹き替えに対応"],["無料版は月の文字数が少なく商用利用不可"],["YouTubeのナレーション作成","動画の多言語吹き替え"]],
  zh: ["生成难以与真人区分的声音的AI语音合成",["声音自然、富有情感","支持声音克隆和多语言配音"],["免费版每月字数少且不可商用"],["制作YouTube旁白","为视频做多语言配音"]]
}, [["@free","$0"],["Starter","$5","mo"],["Creator","$22","mo"],["Pro","$99","mo"]]);
S("타입캐스트", "audio", "tts", "https://typecast.ai", "mix", true, {
  ko: ["감정 표현이 자연스러운 한국어 AI 성우",["한국어 억양과 감정 표현이 자연스러움","캐릭터별 목소리 선택 폭이 넓음"],["무료 버전은 다운로드와 상업 이용에 제한"],["유튜브·쇼츠 한국어 내레이션","오디오북 낭독"]],
  en: ["A Korean TTS service with many AI voice actors",["Natural Korean intonation and emotion","Wide choice of character voices"],["The free plan limits downloads and commercial use"],["Korean narration for YouTube and Shorts","Audiobook reading"]],
  ja: ["多彩な韓国語AI声優の声を選べる韓国製音声合成",["韓国語の抑揚と感情表現が自然","キャラクターごとの声の選択肢が広い"],["無料版はダウンロードと商用利用に制限"],["YouTube・ショートの韓国語ナレーション","オーディオブックの朗読"]],
  zh: ["可挑选多种韩语AI配音员声音的韩国语音合成",["韩语语调和情感表达自然","角色声音选择多"],["免费版限制下载和商用"],["YouTube和短视频的韩语旁白","有声书朗读"]]
}, [["@free","$0"],["@paid",null]]);
S("클로바더빙", "audio", "tts", "https://clovadubbing.naver.com", "mix", true, {
  ko: ["네이버 AI 보이스로 영상 더빙",["자연스러운 한국어 AI 보이스가 많음","영상에 맞춰 바로 더빙"],["무료는 월 사용량과 상업 이용 제한"],["유튜브 한국어 내레이션","수업 영상 더빙"]],
  en: ["Dub videos with Naver's AI voices",["Many natural Korean AI voices","Dub directly against your video"],["Free plan limits monthly use and commercial use"],["Korean narration for YouTube","Dub a lesson video"]],
  ja: ["NAVERのAIボイスで動画を吹き替え",["自然な韓国語AIボイスが豊富","動画に合わせてすぐ吹き替え"],["無料は月の利用量と商用利用に制限"],["YouTubeの韓国語ナレーション","授業動画の吹き替え"]],
  zh: ["用NAVER的AI声音为视频配音",["自然的韩语AI声音多","可直接按视频配音"],["免费版限制月用量和商用"],["YouTube韩语旁白","课程视频配音"]]
}, [["@free","$0"],["@paid",null]]);
S("Murf", "audio", "tts", "https://murf.ai", "mix", false, {
  ko: ["광고·교육용 내레이션 제작",["강조·속도 등 세밀한 발음 조절","영상·슬라이드와 맞춰 편집"],["한국어 목소리 선택은 적음"],["영어 교육 영상 내레이션","광고 성우 대체"]],
  en: ["Narration for ads and training",["Fine control over emphasis and pace","Edit in sync with video and slides"],["Few Korean voices"],["Narration for English training videos","A stand-in for ad voice actors"]],
  ja: ["広告・教育用のナレーション制作",["強調や速度など細かい発音調整","動画やスライドに合わせて編集"],["日本語の声の選択肢は少なめ"],["英語教育動画のナレーション","広告ナレーターの代わり"]],
  zh: ["广告和培训用旁白制作",["可细调重音和语速","可配合视频和幻灯片编辑"],["中文声音选择较少"],["英语培训视频旁白","替代广告配音员"]]
}, [["@free","$0"],["@paid",null]]);
S("Speechify", "audio", "tts", "https://speechify.com", "mix", false, {
  ko: ["글·문서를 소리 내어 읽어주는 앱",["PDF·웹페이지·사진 속 글까지 읽어 줌","빠른 속도로 듣기 공부"],["좋은 목소리는 유료"],["이동 중 논문 듣기","긴 기사 귀로 읽기"]],
  en: ["An app that reads text and documents aloud",["Reads PDFs, web pages and even text in photos","Study by listening at high speed"],["The best voices are paid"],["Listen to papers on the go","Read long articles by ear"]],
  ja: ["文章や文書を読み上げるアプリ",["PDFやWebページ、写真の中の文字まで読み上げ","速いスピードで聞いて勉強"],["よい声は有料"],["移動中に論文を聞く","長い記事を耳で読む"]],
  zh: ["朗读文字和文档的应用",["可朗读PDF、网页和照片中的文字","快速听读学习"],["好听的声音需付费"],["通勤时听论文","用耳朵读长文章"]]
}, [["@free","$0"],["Premium","$139","yr"]]);
S("Hume AI", "audio", "tts", "https://hume.ai", "mix", false, {
  ko: ["감정을 담아 말하는 음성 AI",["감정과 말투를 지시대로 표현","대화형 음성 AI 개발 지원"],["한국어 지원은 제한적"],["오디오 드라마 대사","감정 있는 음성 비서 개발"]],
  en: ["Voice AI that speaks with emotion",["Expresses emotion and tone on instruction","Supports building conversational voice AI"],["Limited Korean support"],["Lines for an audio drama","Build an emotional voice assistant"]],
  ja: ["感情を込めて話す音声AI",["指示どおりに感情や口調を表現","対話型音声AIの開発を支援"],["日本語対応は限定的"],["オーディオドラマのセリフ","感情のある音声アシスタント開発"]],
  zh: ["带情感说话的语音AI",["按指示表达情感和语气","支持开发对话式语音AI"],["中文支持有限"],["广播剧台词","开发有情感的语音助手"]]
}, [["@free","$0"],["@paid",null]]);
S("Fish Audio", "audio", "tts", "https://fish.audio", "mix", false, {
  ko: ["다양한 목소리 라이브러리와 복제",["커뮤니티가 만든 다양한 목소리","적은 샘플로 목소리 복제"],["타인 목소리 복제는 동의 필수"],["캐릭터 목소리 만들기","게임·애니 더빙"]],
  en: ["A large voice library plus voice cloning",["A wide range of community-made voices","Clone a voice from a short sample"],["Cloning someone's voice requires consent"],["Create character voices","Dub games and animation"]],
  ja: ["多彩な声のライブラリと声のクローン",["コミュニティが作った多彩な声","少ないサンプルで声をクローン"],["他人の声のクローンは同意が必須"],["キャラクターの声づくり","ゲームやアニメの吹き替え"]],
  zh: ["丰富的声音库与声音克隆",["社区制作的多种声音","少量样本即可克隆声音"],["克隆他人声音必须征得同意"],["打造角色声音","游戏和动画配音"]]
}, [["@free","$0"],["@paid",null]]);
S("Resemble AI", "audio", "tts", "https://resemble.ai", "paid", false, {
  ko: ["목소리 복제와 딥페이크 음성 탐지",["고품질 목소리 복제","가짜 음성 탐지 기능 제공"],["무료 요금제가 없음"],["기업 브랜드 보이스 제작","의심스러운 음성 진위 확인"]],
  en: ["Voice cloning plus deepfake voice detection",["High-quality voice cloning","Detects fake voices"],["No free plan"],["Create a company brand voice","Check whether audio is genuine"]],
  ja: ["声のクローンとディープフェイク音声検出",["高品質な声のクローン","偽音声の検出機能"],["無料プランがない"],["企業のブランドボイス制作","怪しい音声の真偽確認"]],
  zh: ["声音克隆与深度伪造语音检测",["高质量声音克隆","提供伪造语音检测"],["没有免费方案"],["打造企业品牌声音","核实可疑语音真伪"]]
}, [["@paid",null]]);

/* ---------- 음성·오디오 › AI 더빙 ---------- */
S("페르소 AI", "audio", "dubbing", "https://perso.ai", "mix", true, {
  ko: ["이스트소프트의 다국어 AI 더빙·립싱크",["입 모양까지 맞추는 다국어 더빙","국내 기업이라 한국어 지원이 좋음"],["고품질 더빙은 유료"],["유튜브 영상 해외 버전","기업 홍보 영상 다국어화"]],
  en: ["ESTsoft's multilingual AI dubbing and lip-sync",["Multilingual dubbing with matching lip movement","Good Korean support from a Korean company"],["High-quality dubbing is paid"],["International versions of YouTube videos","Localize company promo videos"]],
  ja: ["ESTsoftの多言語AI吹き替え・リップシンク",["口の動きまで合わせる多言語吹き替え","韓国企業なので韓国語サポートが充実"],["高品質な吹き替えは有料"],["YouTube動画の海外版","企業PR動画の多言語化"]],
  zh: ["ESTsoft的多语言AI配音与口型同步",["连口型都对上的多语言配音","韩国公司，韩语支持好"],["高质量配音收费"],["YouTube视频海外版","企业宣传片多语言化"]]
}, [["@free","$0"],["@paid",null]]);
S("Rask AI", "audio", "dubbing", "https://rask.ai", "paid", true, {
  ko: ["영상 다국어 더빙과 입 모양 맞추기",["130여 개 언어로 더빙","원래 목소리 톤 유지"],["무료 요금제가 없고 비쌈"],["강의 영상 해외 판매용 더빙","광고 영상 현지화"]],
  en: ["Multilingual dubbing with lip-sync for video",["Dubs into 130+ languages","Keeps the original voice tone"],["No free plan, and pricey"],["Dub courses for international sale","Localize ad videos"]],
  ja: ["動画の多言語吹き替えと口の動き合わせ",["130以上の言語に吹き替え","元の声のトーンを維持"],["無料プランがなく高価"],["講義動画を海外販売用に吹き替え","広告動画のローカライズ"]],
  zh: ["视频多语言配音与口型同步",["配音成130多种语言","保留原声音色"],["没有免费方案且价格高"],["为海外销售的课程配音","广告视频本地化"]]
}, [["@paid",null]]);
S("HeyGen 영상 번역", "audio", "dubbing", "https://heygen.com", "mix", false, {
  ko: ["내 목소리 그대로 다른 언어로",["내 목소리와 입 모양 그대로 다른 언어로","업로드만 하면 자동 처리"],["무료는 길이와 횟수 제한"],["내 유튜브 영상 영어 버전","발표 영상 일본어 번역"]],
  en: ["Translate your video into other languages in your own voice",["Your voice and lip movement in another language","Just upload and it's done"],["Free use limits length and count"],["An English version of your YouTube video","Translate a talk into Japanese"]],
  ja: ["自分の声のまま別の言語へ",["自分の声と口の動きのまま別の言語に","アップロードするだけで自動処理"],["無料は長さと回数に制限"],["自分のYouTube動画の英語版","発表動画を日本語に翻訳"]],
  zh: ["用自己的声音把视频翻译成其他语言",["保留自己的声音和口型换成其他语言","上传即可自动处理"],["免费版限制时长和次数"],["自己YouTube视频的英文版","把演讲视频译成日语"]]
}, [["@free","$0"],["Creator","$29","mo"],["Team","$39","user"]]);
S("YouTube 자동 더빙", "audio", "dubbing", "https://youtube.com", "free", false, {
  ko: ["유튜브 영상에 다국어 음성 트랙 추가",["유튜브 안에서 무료로 자동 더빙","시청자가 언어를 골라 들음"],["지원 언어와 채널 조건이 정해져 있음"],["채널 해외 시청자 늘리기","교육 영상 다국어 제공"]],
  en: ["Adds multilingual audio tracks to YouTube videos",["Free automatic dubbing inside YouTube","Viewers choose the audio language"],["Supported languages and channel requirements apply"],["Grow international viewers","Offer educational videos in many languages"]],
  ja: ["YouTube動画に多言語の音声トラックを追加",["YouTube内で無料の自動吹き替え","視聴者が言語を選んで聞ける"],["対応言語やチャンネル条件がある"],["海外の視聴者を増やす","教育動画を多言語で提供"]],
  zh: ["为YouTube视频添加多语言音轨",["在YouTube内免费自动配音","观众可选择收听语言"],["支持的语言和频道条件有限制"],["增加海外观众","多语言提供教育视频"]]
}, [["@free","$0"]]);
S("Dubverse", "audio", "dubbing", "https://dubverse.ai", "mix", false, {
  ko: ["짧은 영상용 간편 AI 더빙",["짧은 영상을 빠르게 더빙","자막도 함께 생성"],["긴 영상과 고급 목소리는 유료"],["숏폼 다국어 버전","SNS 홍보 영상 더빙"]],
  en: ["Simple AI dubbing for short videos",["Quick dubbing for short videos","Generates subtitles too"],["Long videos and premium voices are paid"],["Multilingual short-form versions","Dub social promo videos"]],
  ja: ["短い動画向けの手軽なAI吹き替え",["短い動画を素早く吹き替え","字幕も一緒に生成"],["長い動画や上位の声は有料"],["ショート動画の多言語版","SNS宣伝動画の吹き替え"]],
  zh: ["适合短视频的简便AI配音",["快速为短视频配音","同时生成字幕"],["长视频和高级声音收费"],["短视频多语言版","社交宣传视频配音"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 음성·오디오 › 음성 인식·받아쓰기 ---------- */
S("TurboScribe", "audio", "stt", "https://turboscribe.ai", "mix", true, {
  ko: ["긴 녹음 파일을 빠르게 받아쓰기",["몇 시간짜리 파일도 빠르게 받아쓰기","유료는 무제한 변환"],["무료는 하루 3개 파일까지"],["강의 녹음 전체 텍스트화","인터뷰 녹취록 작성"]],
  en: ["Fast transcription for long recordings",["Transcribes hours-long files quickly","Unlimited on paid plans"],["Free is limited to three files a day"],["Transcribe a full lecture","Write an interview transcript"]],
  ja: ["長い録音ファイルを素早く文字起こし",["数時間のファイルも素早く文字起こし","有料は無制限で変換"],["無料は1日3ファイルまで"],["講義録音をすべてテキスト化","インタビューの書き起こし"]],
  zh: ["快速转写长录音文件",["几小时的文件也能快速转写","付费版不限量"],["免费每天限3个文件"],["把整堂课录音转成文字","整理采访记录"]]
}, [["@free","$0"],["Unlimited","$20","mo"]]);
S("Wispr Flow", "audio", "stt", "https://wisprflow.ai", "mix", true, {
  ko: ["말하면 어떤 앱에든 글로 입력",["말하면 다듬어진 글로 바로 입력","모든 앱에서 작동"],["무료는 주간 사용량 제한"],["메일·메신저 빠르게 쓰기","아이디어를 말로 메모"]],
  en: ["Speak and it types into any app",["Speak and get polished text typed in","Works in every app"],["Free plan has a weekly limit"],["Write emails and messages faster","Capture ideas by voice"]],
  ja: ["話すだけでどのアプリにも文字入力",["話すと整った文章がすぐ入力される","すべてのアプリで動作"],["無料は週の利用量に制限"],["メールやチャットを素早く書く","アイデアを声でメモ"]],
  zh: ["说话即可在任何应用中输入文字",["说话即可输入润色好的文字","在所有应用中可用"],["免费版每周用量有限"],["快速写邮件和消息","用语音记录想法"]]
}, [["@free","$0"],["Pro","$15","mo"]]);
S("Whisper", "audio", "stt", "https://openai.com/research/whisper", "free", false, {
  ko: ["직접 설치해 쓰는 오픈소스 음성 인식",["무료이고 여러 언어 인식 정확도가 높음","인터넷 없이 내 컴퓨터에서 실행"],["설치하려면 기술 지식이 필요함"],["민감한 녹음 오프라인 받아쓰기","자막 파일 대량 생성"]],
  en: ["Open-source speech recognition you install yourself",["Free, with accurate multilingual recognition","Runs offline on your computer"],["Installation needs technical skills"],["Transcribe sensitive recordings offline","Generate subtitle files in bulk"]],
  ja: ["自分で導入するオープンソース音声認識",["無料で多言語の認識精度が高い","ネットなしで自分のPCで実行"],["導入には技術的な知識が必要"],["機密録音をオフラインで文字起こし","字幕ファイルの大量生成"]],
  zh: ["可自行安装的开源语音识别",["免费，多语言识别准确","无需联网，本机运行"],["安装需要技术知识"],["离线转写敏感录音","批量生成字幕文件"]]
}, [["@selfhost","$0"],["API","payg"]]);
S("Rev", "audio", "stt", "https://rev.com", "mix", false, {
  ko: ["AI 받아쓰기와 사람 검수 옵션",["AI 받아쓰기 후 사람 검수 선택 가능","법률·방송용 정확도"],["사람 검수는 비용이 큼"],["중요 인터뷰 정확한 녹취록","영어 영상 자막 파일"]],
  en: ["AI transcription with an option for human review",["AI transcripts with optional human review","Accuracy fit for legal and broadcast use"],["Human review is costly"],["Accurate transcripts of key interviews","Subtitle files for English videos"]],
  ja: ["AI文字起こしと人による校閲オプション",["AI文字起こし後に人の校閲を選べる","法律・放送向けの精度"],["人の校閲は費用が高い"],["重要インタビューの正確な書き起こし","英語動画の字幕ファイル"]],
  zh: ["AI转写并可选人工校对",["AI转写后可选人工校对","达到法律和广播用精度"],["人工校对费用高"],["重要采访的精确记录","英文视频字幕文件"]]
}, [["@free","$0"],["@paid",null]]);
S("Sonix", "audio", "stt", "https://sonix.ai", "paid", false, {
  ko: ["다국어 받아쓰기와 자막 파일",["40여 개 언어 받아쓰기","자막 파일·번역까지 한 번에"],["사용 시간만큼 비용이 듦"],["다국어 인터뷰 받아쓰기","영상 자막 파일 만들기"]],
  en: ["Multilingual transcription and subtitle files",["Transcription in about 40 languages","Subtitle files and translation in one go"],["Costs scale with hours used"],["Transcribe multilingual interviews","Make subtitle files for video"]],
  ja: ["多言語の文字起こしと字幕ファイル",["約40言語の文字起こし","字幕ファイルや翻訳まで一度に"],["使った時間分の費用がかかる"],["多言語インタビューの文字起こし","動画の字幕ファイル作成"]],
  zh: ["多语言转写与字幕文件",["支持约40种语言转写","一次完成字幕文件和翻译"],["按使用时长计费"],["转写多语言采访","制作视频字幕文件"]]
}, [["Standard","payg"],["Premium",null]]);
S("AssemblyAI", "audio", "stt", "https://assemblyai.com", "paid", false, {
  ko: ["개발자용 음성 인식 API",["높은 정확도와 화자 구분·요약 기능","앱에 음성 인식 기능을 쉽게 추가"],["코딩이 필요함"],["내 앱에 받아쓰기 기능 넣기","통화 녹음 자동 분석"]],
  en: ["A speech recognition API for developers",["High accuracy with speaker labels and summaries","Easily add speech recognition to apps"],["Requires coding"],["Add transcription to your app","Analyze call recordings automatically"]],
  ja: ["開発者向け音声認識API",["高精度で話者分離や要約機能","アプリに音声認識を簡単に追加"],["コーディングが必要"],["自分のアプリに文字起こし機能","通話録音を自動分析"]],
  zh: ["面向开发者的语音识别API",["高精度，支持说话人区分和摘要","轻松为应用加入语音识别"],["需要编程"],["为应用加入转写功能","自动分析通话录音"]]
}, [["API","payg"]]);
S("Deepgram", "audio", "stt", "https://deepgram.com", "mix", false, {
  ko: ["실시간 음성 인식·합성 API",["실시간 처리 속도가 매우 빠름","음성 비서 개발에 적합"],["개발자용이라 코딩 필요"],["실시간 자막 앱 만들기","AI 전화 상담 개발"]],
  en: ["Real-time speech recognition and synthesis API",["Very fast real-time processing","Great for building voice assistants"],["Developer tool, coding required"],["Build a live-caption app","Develop an AI phone agent"]],
  ja: ["リアルタイム音声認識・合成API",["リアルタイム処理がとても速い","音声アシスタント開発に最適"],["開発者向けでコーディングが必要"],["リアルタイム字幕アプリづくり","AI電話対応の開発"]],
  zh: ["实时语音识别与合成API",["实时处理速度非常快","适合开发语音助手"],["面向开发者，需要编程"],["开发实时字幕应用","开发AI电话客服"]]
}, [["API","payg"]]);

/* ---------- 음성·오디오 › 잡음 제거·음질 개선 ---------- */
S("Adobe Podcast Enhance", "audio", "clean", "https://podcast.adobe.com", "mix", true, {
  ko: ["녹음을 스튜디오 음질로 보정",["잡음과 울림을 한 번에 제거","웹에서 파일만 올리면 끝"],["무료 버전은 파일 길이와 횟수 제한"],["휴대폰으로 녹음한 인터뷰 음질 개선","강의 녹음 잡음 제거"]],
  en: ["Upload a recording and it comes back sounding studio-clean",["Removes noise and echo in one step","Just upload a file on the web"],["The free plan limits length and uses"],["Improve a phone-recorded interview","Remove noise from a lecture recording"]],
  ja: ["録音ファイルをアップするとスタジオ録音のようにきれいにするツール",["雑音と反響を一度に除去","Webでファイルをアップするだけ"],["無料版はファイルの長さと回数に制限"],["スマホで録ったインタビューの音質改善","講義録音のノイズ除去"]],
  zh: ["上传录音即可变得像录音棚一样干净的工具",["一次去除噪音和回声","网页上传文件即可"],["免费版限制文件时长和次数"],["改善手机录制的采访音质","去除课程录音噪音"]]
}, [["@free","$0"],["Premium",null]]);
S("Krisp", "audio", "clean", "https://krisp.ai", "mix", true, {
  ko: ["통화·화상회의 실시간 잡음 제거",["줌·팀즈 등 어떤 회의 앱과도 함께 작동","키보드·카페 소음까지 실시간 제거"],["무료 버전은 하루 사용 시간이 제한됨"],["카페에서 화상 면접 보기","재택근무 회의 소음 줄이기"]],
  en: ["An app that removes background noise on calls in real time",["Works with any call app like Zoom or Teams","Cuts keyboard and café noise live"],["The free plan limits daily minutes"],["Take a video interview from a café","Reduce noise in remote-work meetings"]],
  ja: ["ビデオ会議中の周囲の雑音をリアルタイムで消すアプリ",["ZoomやTeamsなどどの会議アプリとも動く","キーボードやカフェの雑音もリアルタイム除去"],["無料版は1日の利用時間に制限"],["カフェからオンライン面接を受ける","在宅勤務の会議の雑音を減らす"]],
  zh: ["在视频会议中实时消除双方背景噪音的应用",["可配合Zoom、Teams等任意会议软件","实时去除键盘声和咖啡馆噪音"],["免费版每日使用时长有限"],["在咖啡馆参加视频面试","减少居家办公会议噪音"]]
}, [["@free","$0"],["Pro","$8","mo"]]);
S("Auphonic", "audio", "clean", "https://auphonic.com", "mix", true, {
  ko: ["팟캐스트 음량·음질 자동 보정",["방송 표준 음량으로 자동 맞춤","여러 화자 음량 균형 조절"],["무료는 월 2시간"],["팟캐스트 마스터링","강의 녹음 음량 맞추기"]],
  en: ["Automatic loudness and audio quality for podcasts",["Auto-levels audio to broadcast loudness standards","Balances multiple speakers"],["Free plan covers two hours a month"],["Master a podcast","Even out lecture recording levels"]],
  ja: ["ポッドキャストの音量・音質を自動補正",["放送基準の音量に自動調整","複数話者の音量バランスを調整"],["無料は月2時間"],["ポッドキャストのマスタリング","講義録音の音量調整"]],
  zh: ["自动调整播客音量和音质",["自动调整到广播标准音量","平衡多位说话人音量"],["免费每月2小时"],["播客母带处理","统一课程录音音量"]]
}, [["@free","$0"],["@paid",null]]);
S("Cleanvoice", "audio", "clean", "https://cleanvoice.ai", "mix", false, {
  ko: ["군말·말더듬·잡음 자동 제거",["'음', '어' 같은 군말 자동 삭제","긴 침묵 정리"],["사용 시간만큼 크레딧 소모"],["팟캐스트 편집 시간 단축","발표 연습 녹음 정리"]],
  en: ["Removes filler words, stutters and noise automatically",["Deletes filler sounds like 'um' and 'uh'","Trims long silences"],["Uses credits by the hour"],["Cut podcast editing time","Clean up a practice-talk recording"]],
  ja: ["言い淀み・どもり・雑音を自動除去",["「えー」「あの」などの言い淀みを自動削除","長い沈黙を整理"],["使用時間分クレジットを消費"],["ポッドキャストの編集時間短縮","発表練習の録音整理"]],
  zh: ["自动去除口头禅、口吃和噪音",["自动删除「嗯」「啊」等口头禅","整理长时间静音"],["按时长消耗积分"],["缩短播客剪辑时间","整理演讲练习录音"]]
}, [["@paid",null]]);
S("iZotope RX", "audio", "clean", "https://izotope.com", "paid", false, {
  ko: ["전문가용 오디오 복원",["잡음·클리핑·잔향을 정밀하게 복원","방송·영화 현장에서 쓰는 표준"],["가격이 높고 배우기 어려움"],["손상된 녹음 복원","영화 대사 소음 정리"]],
  en: ["Professional audio restoration",["Precise repair of noise, clipping and reverb","An industry standard in broadcast and film"],["Expensive and hard to learn"],["Restore damaged recordings","Clean up film dialogue"]],
  ja: ["プロ向けオーディオ修復",["雑音・クリップ・残響を精密に修復","放送・映画の現場の標準"],["価格が高く習得が難しい"],["傷んだ録音の修復","映画のセリフのノイズ整理"]],
  zh: ["专业音频修复",["精确修复噪音、削波和混响","广播和电影行业标准"],["价格高且难学"],["修复受损录音","清理电影对白噪音"]]
}, [["@paid",null]]);
S("NVIDIA Broadcast", "audio", "clean", "https://nvidia.com/broadcast", "free", false, {
  ko: ["그래픽카드로 마이크 잡음 실시간 제거",["무료이고 실시간 잡음 제거 품질이 좋음","배경 흐림 등 카메라 효과도 제공"],["엔비디아 RTX 그래픽카드가 필요함"],["게임 방송 마이크 잡음 제거","화상회의 음질 개선"]],
  en: ["Removes mic noise in real time using your graphics card",["Free, with great real-time noise removal","Camera effects like background blur"],["Needs an NVIDIA RTX graphics card"],["Remove mic noise while streaming games","Better audio in video calls"]],
  ja: ["グラフィックカードでマイクの雑音をリアルタイム除去",["無料でリアルタイムのノイズ除去品質が高い","背景ぼかしなどカメラ効果も"],["NVIDIA RTXのグラフィックカードが必要"],["ゲーム配信のマイクノイズ除去","ビデオ会議の音質改善"]],
  zh: ["用显卡实时去除麦克风噪音",["免费，实时降噪效果好","还提供背景虚化等摄像头效果"],["需要NVIDIA RTX显卡"],["游戏直播麦克风降噪","提升视频会议音质"]]
}, [["@free","$0"]]);

/* ---------- 음악·작곡 › 노래 생성 ---------- */
S("Suno", "music", "song", "https://suno.com", "mix", true, {
  ko: ["가사·장르만 넣으면 보컬 있는 노래 완성",["보컬이 자연스러운 완성곡이 몇 초 만에 나옴","유료 요금제는 다운로드와 상업 이용 가능"],["무료로 만든 곡은 상업적으로 쓸 수 없음"],["동아리·행사 로고송 만들기","영상 배경에 쓸 노래"]],
  en: ["Write lyrics and a genre, get a finished song with vocals",["Natural-sounding complete songs in seconds","Paid plans allow downloads and commercial use"],["Songs made on the free plan cannot be used commercially"],["Make a jingle for a club or event","A song for a video background"]],
  ja: ["歌詞とジャンルを書くだけでボーカル入りの完成曲を作るAI",["ボーカルが自然な完成曲が数秒で出る","有料プランはダウンロードと商用利用が可能"],["無料で作った曲は商用利用できない"],["サークルやイベントのテーマソング","動画の背景に使う曲"]],
  zh: ["写下歌词和曲风，就能生成带人声完整歌曲的AI",["几秒内生成人声自然的完整歌曲","付费方案可下载并商用"],["免费生成的歌曲不能商用"],["为社团或活动做主题曲","视频背景用歌曲"]]
}, [["@free","$0"],["Pro","$10","mo"],["Premier","$30","mo"]]);
S("ElevenLabs Music", "music", "song", "https://elevenlabs.io/music", "mix", true, {
  ko: ["상업 이용을 고려한 노래 생성",["보컬·악기 파트를 나눠 받기 쉬움","내레이션과 음악을 한곳에서 제작"],["무료 버전은 상업 이용이 제한됨"],["설명 영상에 내레이션과 배경음악 함께 넣기","광고용 짧은 음악"]],
  en: ["Music generation from voice-AI company ElevenLabs",["Easy to get separate vocal and instrument parts","Narration and music made in one place"],["The free plan restricts commercial use"],["Add narration and music to an explainer video","Short music for an ad"]],
  ja: ["音声AI企業ElevenLabsの音楽生成機能",["ボーカルと楽器パートを分けて受け取りやすい","ナレーションと音楽を一か所で制作"],["無料版は商用利用に制限"],["解説動画にナレーションとBGMを一緒に入れる","広告用の短い音楽"]],
  zh: ["语音AI公司ElevenLabs推出的音乐生成功能",["便于分别获取人声和乐器分轨","旁白和音乐一站制作"],["免费版限制商用"],["为讲解视频同时加入旁白和背景音乐","广告用短音乐"]]
}, [["@free","$0"],["Starter","$5","mo"],["Creator","$22","mo"],["Pro","$99","mo"]]);
S("Udio", "music", "song", "https://udio.com", "mix", false, {
  ko: ["세밀한 음질의 노래 생성과 리믹스",["보컬 사실감과 음질이 뛰어남","구간별 수정과 리믹스"],["2026년 기준 음원 다운로드가 막혀 있음"],["노래 아이디어 스케치","장르 실험"]],
  en: ["Detailed song generation and remixing",["Very realistic vocals and audio quality","Edit sections and remix"],["As of 2026, audio downloads are disabled"],["Sketch song ideas","Experiment with genres"]],
  ja: ["細やかな音質の歌の生成とリミックス",["ボーカルのリアルさと音質が高い","部分ごとの修正とリミックス"],["2026年時点で音源のダウンロードができない"],["曲のアイデアのスケッチ","ジャンルの実験"]],
  zh: ["音质细腻的歌曲生成与混音",["人声逼真，音质出色","可分段修改和混音"],["截至2026年无法下载音频"],["勾勒歌曲灵感","尝试不同曲风"]]
}, [["@free","$0"],["Standard","$10","mo"],["Pro","$30","mo"]]);
S("Mureka", "music", "song", "https://mureka.ai", "mix", false, {
  ko: ["가사·참고곡으로 노래 생성",["참고곡 분위기를 따라 작곡","가사만 넣어도 완성곡"],["무료 생성 횟수가 적음"],["원하는 분위기의 노래 만들기","가사 데모곡"]],
  en: ["Make songs from lyrics and reference tracks",["Composes in the mood of a reference track","Finished songs from lyrics alone"],["Few free generations"],["Make a song in a specific mood","A demo for your lyrics"]],
  ja: ["歌詞や参考曲から歌を生成",["参考曲の雰囲気に沿って作曲","歌詞だけでも完成曲に"],["無料の生成回数が少ない"],["好きな雰囲気の歌を作る","歌詞のデモ曲"]],
  zh: ["根据歌词和参考曲生成歌曲",["按参考曲氛围作曲","只输入歌词也能成曲"],["免费生成次数少"],["制作想要氛围的歌曲","歌词小样"]]
}, [["@free","$0"],["@paid",null]]);
S("Producer.ai (구 Riffusion)", "music", "song", "https://producer.ai", "mix", false, {
  ko: ["대화하며 곡을 만드는 AI 프로듀서",["대화하며 곡을 고쳐 나가는 방식","구간 교체·확장 기능"],["서비스가 바뀌는 중이라 기능 변동이 잦음"],["작곡 아이디어 발전시키기","곡 일부만 다시 만들기"]],
  en: ["An AI producer you make songs with by chatting",["Refine songs through conversation","Swap or extend sections"],["Features change often as the service evolves"],["Develop a song idea","Regenerate part of a track"]],
  ja: ["会話しながら曲を作るAIプロデューサー",["会話しながら曲を直していく方式","区間の差し替え・延長機能"],["サービス変更中で機能がよく変わる"],["作曲アイデアを発展させる","曲の一部だけ作り直す"]],
  zh: ["边对话边做歌的AI制作人",["通过对话逐步修改歌曲","可替换或延长片段"],["服务调整中，功能常变"],["发展作曲灵感","只重做部分段落"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 음악·작곡 › 배경음악 ---------- */
S("Soundraw", "music", "bgm", "https://soundraw.io", "mix", true, {
  ko: ["분위기·길이를 맞춘 저작권 걱정 없는 BGM",["분위기·길이·악기 구성을 직접 조절","유튜브 등에서 저작권 걱정 없이 사용"],["보컬 곡은 만들 수 없음"],["유튜브 영상 배경음악","광고 영상 길이에 맞춘 음악"]],
  en: ["Royalty-safe background music matched to mood and length",["Control mood, length and instruments","Use on YouTube without copyright worries"],["Can't make vocal songs"],["Background music for YouTube","Music cut to an ad's length"]],
  ja: ["雰囲気と長さを合わせた著作権の心配のないBGM",["雰囲気・長さ・楽器構成を自分で調整","YouTubeなどで著作権の心配なく使える"],["ボーカル曲は作れない"],["YouTube動画のBGM","広告の長さに合わせた音楽"]],
  zh: ["按氛围和时长定制、无版权顾虑的背景音乐",["可自行调整氛围、时长和乐器","在YouTube等平台使用无版权顾虑"],["不能制作人声歌曲"],["YouTube视频背景音乐","按广告时长定制音乐"]]
}, [["@paid",null]]);
S("AIVA", "music", "bgm", "https://aiva.ai", "mix", true, {
  ko: ["영화음악풍 작곡, 악보·MIDI 내보내기",["오케스트라·피아노 등 연주곡에 강함","MIDI 파일로 받아 직접 수정 가능"],["보컬이 있는 노래는 만들지 못함"],["게임·영상 배경 음악","발표 오프닝 음악"]],
  en: ["An AI composer for cinematic and game-style instrumentals",["Strong at orchestral and piano pieces","Download MIDI to edit yourself"],["Does not make songs with vocals"],["Background music for games and videos","Opening music for a presentation"]],
  ja: ["映画やゲームのような演奏曲を作曲するAI作曲家",["オーケストラやピアノなどの演奏曲に強い","MIDIファイルで受け取り自分で修正できる"],["ボーカル入りの歌は作れない"],["ゲームや動画のBGM","発表のオープニング音楽"]],
  zh: ["创作电影、游戏风格纯音乐的AI作曲家",["擅长管弦乐、钢琴等器乐曲","可下载MIDI文件自行修改"],["不能生成带人声的歌曲"],["游戏和视频背景音乐","演讲开场音乐"]]
}, [["@free","$0"],["Standard","€15","mo"],["Pro","€49","mo"]]);
S("Beatoven.ai", "music", "bgm", "https://beatoven.ai", "mix", false, {
  ko: ["영상 장면 흐름에 맞춘 배경음악",["장면마다 분위기를 바꿔 음악 구성","저작권 걱정 없는 라이선스"],["무료 다운로드는 제한적"],["브이로그 장면별 음악","팟캐스트 인트로"]],
  en: ["Background music that follows the flow of your video's scenes",["Changes the mood scene by scene","Royalty-safe licensing"],["Limited free downloads"],["Scene-by-scene music for a vlog","A podcast intro"]],
  ja: ["動画の場面の流れに合わせたBGM",["場面ごとに雰囲気を変えて音楽を構成","著作権の心配のないライセンス"],["無料ダウンロードは限定的"],["Vlogの場面別音楽","ポッドキャストのイントロ"]],
  zh: ["跟随视频场景节奏的背景音乐",["按场景切换音乐氛围","无版权顾虑的授权"],["免费下载有限"],["Vlog分场景配乐","播客片头音乐"]]
}, [["@free","$0"],["@paid",null]]);
S("Mubert", "music", "bgm", "https://mubert.com", "mix", false, {
  ko: ["방송·영상용 배경음악 생성",["끊김 없이 이어지는 배경음악 생성","방송용 라이선스 제공"],["곡 구성의 세밀한 조절은 어려움"],["라이브 방송 배경음악","작업용 음악 틀어두기"]],
  en: ["Background music generation for streams and videos",["Continuous, seamless background music","Licensing for broadcasts"],["Hard to fine-tune song structure"],["Background music for live streams","Music to work to"]],
  ja: ["配信・動画用のBGM生成",["途切れずに続くBGMを生成","配信用のライセンスを提供"],["曲構成の細かい調整は難しい"],["ライブ配信のBGM","作業用の音楽"]],
  zh: ["用于直播和视频的背景音乐生成",["生成连续不断的背景音乐","提供直播用授权"],["难以细调曲子结构"],["直播背景音乐","工作时播放的音乐"]]
}, [["@free","$0"],["@paid",null]]);
S("Loudly", "music", "bgm", "https://loudly.com", "mix", false, {
  ko: ["장르·템포를 골라 배경음악 생성",["장르·템포·길이 선택이 쉬움","상업 이용 라이선스"],["보컬 곡은 제한적"],["쇼츠 배경음악","프레젠테이션 BGM"]],
  en: ["Generate background music by genre and tempo",["Easy genre, tempo and length controls","Commercial-use licensing"],["Limited vocal tracks"],["Background music for Shorts","Music for a presentation"]],
  ja: ["ジャンルとテンポを選んでBGM生成",["ジャンル・テンポ・長さを簡単に選べる","商用利用ライセンス"],["ボーカル曲は限定的"],["ショート動画のBGM","プレゼンのBGM"]],
  zh: ["选择曲风和节奏生成背景音乐",["曲风、节奏、时长选择简单","提供商用授权"],["人声歌曲有限"],["Shorts背景音乐","演示用背景音乐"]]
}, [["@free","$0"],["@paid",null]]);
S("Stable Audio", "music", "bgm", "https://stableaudio.com", "mix", false, {
  ko: ["악기 루프·배경음악 생성",["원하는 길이의 배경음악과 효과음 생성","일부 모델은 공개되어 직접 설치도 가능"],["보컬 곡 완성도는 Suno보다 낮음"],["영상에 딱 맞는 길이의 배경음악","게임 효과음 만들기"]],
  en: ["Audio AI for background music and sound effects at a set length",["Music and SFX at exactly the length you need","Some models are open for self-hosting"],["Vocal songs trail Suno"],["Background music cut to your video length","Make game sound effects"]],
  ja: ["長さまで指定してBGMや効果音を作るオーディオ生成AI",["好きな長さのBGMと効果音を生成","一部のモデルは公開され自分で導入も可能"],["ボーカル曲の完成度はSunoに劣る"],["動画にぴったりの長さのBGM","ゲームの効果音づくり"]],
  zh: ["可指定时长生成背景音乐和音效的音频AI",["生成所需时长的背景音乐和音效","部分模型开源，可自行部署"],["带人声歌曲的完成度不如Suno"],["与视频时长正好匹配的背景音乐","制作游戏音效"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 음악·작곡 › 효과음 ---------- */
S("ElevenLabs 효과음", "music", "sfx", "https://elevenlabs.io/sound-effects", "mix", true, {
  ko: ["글로 설명한 효과음 생성",["원하는 소리를 글로 설명하면 바로 생성","게임·영상용 효과음 제작이 빠름"],["무료는 상업 이용 불가"],["영상에 문 여는 소리 넣기","게임 효과음 만들기"]],
  en: ["Generate sound effects from a text description",["Describe a sound and get it instantly","Fast sound design for games and video"],["No commercial use on free"],["Add a door-opening sound to a video","Create game sound effects"]],
  ja: ["文章で説明した効果音を生成",["欲しい音を文章で説明するとすぐ生成","ゲームや動画用の効果音が素早く作れる"],["無料は商用利用不可"],["動画にドアを開ける音を入れる","ゲームの効果音づくり"]],
  zh: ["根据文字描述生成音效",["用文字描述想要的声音即可生成","快速制作游戏和视频音效"],["免费版不可商用"],["给视频加上开门声","制作游戏音效"]]
}, [["@free","$0"],["Starter","$5","mo"],["Creator","$22","mo"],["Pro","$99","mo"]]);
S("Adobe Firefly 효과음", "music", "sfx", "https://firefly.adobe.com", "mix", true, {
  ko: ["목소리 흉내·설명으로 효과음 생성",["입으로 흉내 낸 소리의 타이밍대로 효과음 생성","상업적으로 안심하고 사용"],["생성 크레딧이 필요함"],["영상 장면 타이밍에 맞춘 효과음","광고 영상 사운드"]],
  en: ["Create sound effects by imitating them with your voice or describing them",["Generates effects that match the timing of your vocal imitation","Safe for commercial use"],["Uses generation credits"],["Sound effects timed to video scenes","Sound for ad videos"]],
  ja: ["声まねや説明で効果音を生成",["口でまねた音のタイミングどおりに効果音を生成","商用でも安心して使える"],["生成クレジットが必要"],["動画の場面に合わせた効果音","広告動画のサウンド"]],
  zh: ["用声音模仿或文字描述生成音效",["按你用嘴模仿的节奏生成音效","可放心商用"],["需要生成积分"],["对准视频画面节奏的音效","广告视频音效"]]
}, [["@free","$0"],["Firefly Standard","$9.99","mo"],["Firefly Pro","$29.99","mo"]]);
S("AudioCraft (Meta)", "music", "sfx", "https://audiocraft.metademolab.com", "free", false, {
  ko: ["직접 설치하는 오픈소스 음악·효과음 모델",["무료 오픈소스로 자유롭게 실험","음악·효과음 모델을 함께 제공"],["설치에 기술 지식과 그래픽카드 필요"],["연구·학습용 음악 생성 실험","나만의 효과음 생성기"]],
  en: ["Open-source music and sound-effect models you install yourself",["Free and open source to experiment with","Includes music and sound-effect models"],["Setup needs technical skills and a GPU"],["Music generation experiments for study","Build your own sound-effect generator"]],
  ja: ["自分で導入するオープンソースの音楽・効果音モデル",["無料のオープンソースで自由に実験","音楽と効果音のモデルを提供"],["導入には技術知識とGPUが必要"],["研究・学習用の音楽生成実験","自分だけの効果音ジェネレーター"]],
  zh: ["可自行安装的开源音乐和音效模型",["免费开源，可自由实验","同时提供音乐和音效模型"],["安装需要技术知识和显卡"],["研究学习用的音乐生成实验","打造自己的音效生成器"]]
}, [["@selfhost","$0"]]);

/* ---------- 음악·작곡 › 작곡 보조·음원 분리 ---------- */
S("BandLab", "music", "tools", "https://bandlab.com", "free", true, {
  ko: ["무료 온라인 작곡 프로그램과 AI 마스터링",["설치 없이 무료로 작곡·녹음","AI 마스터링도 무료"],["전문 DAW보다 기능은 단순함"],["친구와 온라인 공동 작곡","자작곡 마스터링"]],
  en: ["A free online music studio with AI mastering",["Compose and record for free, no install","Free AI mastering"],["Simpler than professional DAWs"],["Co-write songs online with friends","Master your own tracks"]],
  ja: ["無料のオンライン作曲ソフトとAIマスタリング",["インストール不要で無料で作曲・録音","AIマスタリングも無料"],["プロ用DAWより機能はシンプル"],["友達とオンラインで共同作曲","自作曲のマスタリング"]],
  zh: ["免费在线编曲软件与AI母带处理",["无需安装，免费作曲和录音","AI母带处理也免费"],["功能比专业宿主软件简单"],["和朋友在线合作编曲","为原创歌曲做母带"]]
}, [["@free","$0"]]);
S("Moises", "music", "tools", "https://moises.ai", "mix", true, {
  ko: ["보컬·악기 분리, 코드·템포 인식",["노래에서 보컬·악기를 따로 분리","코드·템포 자동 인식"],["고음질 분리와 긴 곡은 유료"],["반주 만들어 노래 연습","기타 코드 따기"]],
  en: ["Splits vocals and instruments, detects chords and tempo",["Separates vocals and instruments from songs","Auto-detects chords and tempo"],["High-quality splits and long songs are paid"],["Make a backing track to practice singing","Figure out guitar chords"]],
  ja: ["ボーカル・楽器の分離、コードとテンポの認識",["曲からボーカルと楽器を分離","コードとテンポを自動認識"],["高音質の分離や長い曲は有料"],["伴奏を作って歌の練習","ギターのコードを耳コピ"]],
  zh: ["分离人声和乐器，识别和弦与速度",["把歌曲中的人声和乐器分离","自动识别和弦和速度"],["高音质分离和长曲需付费"],["制作伴奏练唱","扒吉他和弦"]]
}, [["@free","$0"],["Premium",null]]);
S("LANDR", "music", "tools", "https://landr.com", "mix", true, {
  ko: ["AI 마스터링과 음원 유통",["곡을 올리면 바로 마스터링","스트리밍 플랫폼 유통까지"],["무료 기능은 제한적"],["자작곡 음원 발매 준비","데모곡 음질 다듬기"]],
  en: ["AI mastering and music distribution",["Upload a track and get it mastered","Distribution to streaming platforms"],["Limited free features"],["Prepare an original song for release","Polish a demo's sound"]],
  ja: ["AIマスタリングと音源配信",["曲をアップするとすぐマスタリング","ストリーミング配信まで"],["無料機能は限定的"],["自作曲のリリース準備","デモ曲の音質を整える"]],
  zh: ["AI母带处理与音乐发行",["上传歌曲即可母带处理","可发行到流媒体平台"],["免费功能有限"],["为原创歌曲发行做准备","打磨小样音质"]]
}, [["@free","$0"],["@paid",null]]);
S("LALAL.AI", "music", "tools", "https://lalal.ai", "mix", false, {
  ko: ["보컬·반주·악기 트랙 분리",["분리 품질이 깔끔함","드럼·베이스 등 악기별 분리"],["무료는 짧은 미리듣기만"],["노래방 반주 만들기","샘플링용 악기 추출"]],
  en: ["Separates vocals, backing and instrument tracks",["Clean separation quality","Splits individual instruments like drums and bass"],["Free only previews a short section"],["Make a karaoke backing track","Extract instruments for sampling"]],
  ja: ["ボーカル・伴奏・楽器トラックを分離",["分離の品質がきれい","ドラムやベースなど楽器別に分離"],["無料は短い試聴のみ"],["カラオケ用の伴奏づくり","サンプリング用に楽器を抽出"]],
  zh: ["分离人声、伴奏和乐器音轨",["分离效果干净","可按鼓、贝斯等乐器分离"],["免费只能试听一小段"],["制作卡拉OK伴奏","提取乐器用于采样"]]
}, [["@free","$0"],["@paid",null]]);
S("Kits.ai", "music", "tools", "https://kits.ai", "mix", false, {
  ko: ["AI 보컬 변환과 라이선스 목소리",["내 노래를 다른 보컬 음색으로 변환","아티스트 허락을 받은 목소리 제공"],["실존 가수 목소리 무단 사용은 불가"],["데모곡 보컬 바꿔 보기","작곡가용 가이드 보컬"]],
  en: ["AI vocal conversion and licensed voices",["Convert your singing into another vocal timbre","Voices licensed from artists"],["Unauthorized use of real singers' voices is not allowed"],["Try different vocals on a demo","Guide vocals for songwriters"]],
  ja: ["AIボーカル変換とライセンス済みの声",["自分の歌を別のボーカルの声質に変換","アーティストの許可を得た声を提供"],["実在歌手の声の無断使用は不可"],["デモ曲のボーカルを変えてみる","作曲家用のガイドボーカル"]],
  zh: ["AI人声转换与授权声音",["把自己的歌声转换成其他音色","提供经艺人授权的声音"],["不可擅自使用真实歌手声音"],["为小样换不同人声","作曲用的参考人声"]]
}, [["@free","$0"],["@paid",null]]);
S("Hookpad", "music", "tools", "https://hooktheory.com", "mix", false, {
  ko: ["코드 진행·멜로디 작곡 도우미",["음악 이론을 몰라도 코드 진행 만들기","유명 곡 코드 진행 데이터 참고"],["완성곡 오디오를 만드는 도구는 아님"],["작곡 공부","곡의 코드 진행 아이디어"]],
  en: ["A songwriting helper for chord progressions and melodies",["Build chord progressions without music theory","Learn from chord data of popular songs"],["Doesn't produce finished audio"],["Study songwriting","Ideas for a song's chord progression"]],
  ja: ["コード進行とメロディの作曲アシスタント",["音楽理論を知らなくてもコード進行を作れる","有名曲のコード進行データを参考に"],["完成曲の音源を作るツールではない"],["作曲の勉強","曲のコード進行のアイデア"]],
  zh: ["和弦进行与旋律作曲助手",["不懂乐理也能编和弦进行","参考知名歌曲的和弦数据"],["不是生成完整音频的工具"],["学习作曲","构思歌曲和弦进行"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 코딩·웹 제작 › AI 코딩 도구·에이전트 ---------- */
S("Cursor", "coding", "coding", "https://cursor.com", "mix", true, {
  ko: ["AI가 내장된 코드 에디터",["프로젝트 전체를 이해하고 여러 파일을 한 번에 수정","익숙한 VS Code 화면과 확장 기능 그대로"],["무료 버전은 AI 사용량이 적음"],["웹사이트 기능 추가와 버그 수정","처음 보는 코드 구조 설명 듣기"]],
  en: ["A VS Code-based code editor where AI writes code with you",["Understands the whole project and edits many files at once","Keeps the familiar VS Code layout and extensions"],["The free plan has limited AI usage"],["Add features and fix bugs on a website","Get an unfamiliar codebase explained"]],
  ja: ["VS CodeベースでAIが一緒にコードを書くコードエディター",["プロジェクト全体を理解し、複数ファイルを一度に修正","慣れたVS Codeの画面と拡張機能がそのまま"],["無料版はAI利用量が少ない"],["Webサイトの機能追加とバグ修正","初めて見るコード構造の説明を聞く"]],
  zh: ["基于VS Code、由AI协同写代码的编辑器",["理解整个项目，一次修改多个文件","保留熟悉的VS Code界面和扩展"],["免费版AI用量少"],["给网站加功能和修Bug","让AI讲解陌生的代码结构"]]
}, [["@free","$0"],["Pro","$20","mo"],["Pro+","$60","mo"],["Ultra","$200","mo"],["Teams","$40","user"]]);
S("Claude Code", "coding", "coding", "https://claude.ai", "paid", true, {
  ko: ["터미널·에디터에서 코드를 직접 짜고 고치는 에이전트",["큰 프로젝트의 여러 단계 작업을 끝까지 처리","터미널, VS Code, 웹 등 여러 환경에서 사용"],["Claude 유료 요금제가 필요함"],["기존 코드 대규모 리팩터링","버그 원인 찾고 수정 후 커밋까지"]],
  en: ["Anthropic's coding agent that writes, tests and ships code from your terminal or editor",["Carries multi-step work in large projects through to the end","Works in the terminal, VS Code and on the web"],["Requires a paid Claude plan"],["Large refactors of existing code","Find a bug's cause, fix it and commit"]],
  ja: ["ターミナルやエディターでコード作成からテストまで任せられるAnthropicのコーディングエージェント",["大きなプロジェクトの複数ステップの作業を最後までこなす","ターミナル、VS Code、Webなど複数の環境で使える"],["Claudeの有料プランが必要"],["既存コードの大規模リファクタリング","バグの原因を見つけて修正、コミットまで"]],
  zh: ["可在终端和编辑器中从写代码到测试全程托付的Anthropic编程智能体",["能把大型项目的多步骤工作做到底","可在终端、VS Code和网页等多种环境使用"],["需要Claude付费方案"],["大规模重构现有代码","找出Bug原因、修复并提交"]]
}, [["Pro","$20","mo"],["Max","$100","mo"],["Max 20x","$200","mo"]]);
S("GitHub Copilot", "coding", "coding", "https://github.com/features/copilot", "mix", true, {
  ko: ["VS Code 등에서 코드 자동 완성·에이전트",["여러 에디터에서 쓸 수 있고 깃허브와 연동이 강함","학생·오픈소스 개발자는 무료 혜택"],["2026년부터 크레딧 방식이라 많이 쓰면 비용이 늘 수 있음"],["반복되는 코드 자동 완성","풀 리퀘스트 요약과 리뷰"]],
  en: ["GitHub's AI coding assistant that suggests the next lines as you type",["Works in many editors with deep GitHub integration","Free for students and open-source maintainers"],["Credit-based billing since 2026 can raise costs for heavy use"],["Autocomplete repetitive code","Summarize and review pull requests"]],
  ja: ["コードを書いている間に次の行を提案するGitHubのAIコーディング支援",["多くのエディターで使え、GitHubとの連携が強い","学生やOSS開発者は無料特典あり"],["2026年からクレジット制のため、多用すると費用が増えることも"],["繰り返しのコードを自動補完","プルリクエストの要約とレビュー"]],
  zh: ["写代码时自动建议下一行的GitHub AI编程助手",["支持多种编辑器，与GitHub深度集成","学生和开源开发者可免费使用"],["自2026年改为积分制，用量大时费用可能增加"],["自动补全重复代码","总结和审查拉取请求"]]
}, [["@free","$0"],["Pro","$10","mo"],["Pro+","$39","mo"],["Business","$19","user"]]);
S("OpenAI Codex", "coding", "coding", "https://chatgpt.com/codex", "paid", true, {
  ko: ["클라우드·터미널에서 코딩 작업 수행",["여러 작업을 동시에 맡겨 병렬로 처리","ChatGPT 요금제에 포함되어 바로 사용"],["결과를 꼼꼼히 리뷰해야 하고 사용량 한도가 있음"],["자잘한 버그 여러 개 한꺼번에 맡기기","테스트 코드 작성"]],
  en: ["OpenAI's coding agent that fixes code on its own in the cloud",["Hand off several tasks to run in parallel","Included with ChatGPT plans"],["Results need careful review, and usage is capped"],["Hand off a batch of small bugs","Write test code"]],
  ja: ["作業を任せるとクラウドで単独でコードを直してくるOpenAIのコーディングエージェント",["複数の作業を同時に任せて並行処理","ChatGPTのプランに含まれすぐ使える"],["結果を丁寧にレビューする必要があり、利用上限もある"],["細かいバグをまとめて任せる","テストコードの作成"]],
  zh: ["交代任务后在云端独立修改代码的OpenAI编程智能体",["可同时交办多个任务并行处理","包含在ChatGPT方案中，可直接使用"],["需要仔细审查结果，且有用量上限"],["一次交办多个小Bug","编写测试代码"]]
}, [["ChatGPT Plus","$20","mo"],["ChatGPT Pro","$200","mo"]]);
S("Google Antigravity", "coding", "coding", "https://antigravity.google", "free", false, {
  ko: ["에이전트 중심의 구글 코드 에디터",["여러 에이전트에게 작업을 맡기고 관리","현재 무료로 사용 가능"],["새 서비스라 기능과 정책이 자주 바뀜"],["웹앱 기능 여러 개 동시 개발","브라우저로 결과 자동 테스트"]],
  en: ["Google's agent-first code editor",["Assign and manage work across several agents","Currently free to use"],["New, so features and policies change often"],["Build several web app features in parallel","Auto-test results in the browser"]],
  ja: ["エージェント中心のGoogleのコードエディター",["複数のエージェントに作業を任せて管理","現在は無料で使える"],["新しいサービスなので機能や方針がよく変わる"],["Webアプリの機能を同時に複数開発","ブラウザで結果を自動テスト"]],
  zh: ["以智能体为中心的谷歌代码编辑器",["把工作分派给多个智能体并管理","目前可免费使用"],["新服务，功能和政策常变"],["同时开发网页应用的多个功能","在浏览器中自动测试结果"]]
}, [["@free","$0"]]);
S("Windsurf", "coding", "coding", "https://windsurf.com", "mix", false, {
  ko: ["에이전트 기능을 갖춘 AI 코드 에디터",["Cascade 에이전트가 여러 파일을 알아서 수정","VS Code와 비슷해 적응이 쉬움"],["무료 크레딧이 빨리 소진됨"],["기존 프로젝트 기능 추가","코드 리팩터링"]],
  en: ["An AI code editor with agent features",["The Cascade agent edits multiple files on its own","Feels like VS Code, easy to adopt"],["Free credits run out quickly"],["Add features to an existing project","Refactor code"]],
  ja: ["エージェント機能を備えたAIコードエディター",["Cascadeエージェントが複数ファイルを自分で修正","VS Codeに似ていてなじみやすい"],["無料クレジットがすぐなくなる"],["既存プロジェクトへの機能追加","コードのリファクタリング"]],
  zh: ["具备智能体功能的AI代码编辑器",["Cascade智能体自动修改多个文件","与VS Code相似，易上手"],["免费积分很快用完"],["为现有项目加功能","重构代码"]]
}, [["@free","$0"],["Pro","$15","mo"],["Teams","$30","user"]]);
S("Kiro", "coding", "coding", "https://kiro.dev", "mix", false, {
  ko: ["기획서(스펙)부터 만드는 AWS의 AI 에디터",["요구사항·설계 문서를 먼저 만들고 코드 작성","큰 기능을 체계적으로 개발"],["간단한 작업에는 과정이 길게 느껴짐"],["팀 프로젝트 기능 설계부터 구현","요구사항 문서 자동 정리"]],
  en: ["AWS's AI editor that starts from a spec",["Writes requirements and design docs before code","Builds big features systematically"],["Feels heavy for small tasks"],["Design and implement a team feature","Organize requirements automatically"]],
  ja: ["仕様書から作るAWSのAIエディター",["要件・設計書を先に作ってからコードを書く","大きな機能を体系的に開発"],["簡単な作業には手順が長く感じる"],["チームの機能を設計から実装","要件ドキュメントの自動整理"]],
  zh: ["从需求规格开始的AWS AI编辑器",["先写需求和设计文档再写代码","系统化开发大功能"],["小任务会觉得流程繁琐"],["从设计到实现团队功能","自动整理需求文档"]]
}, [["@free","$0"],["Pro","$20","mo"],["Pro+","$40","mo"],["Power","$200","mo"]]);
S("JetBrains AI (Junie)", "coding", "coding", "https://jetbrains.com/ai", "mix", false, {
  ko: ["인텔리제이 등에서 쓰는 코딩 에이전트",["자바·코틀린 등 JetBrains 도구와 깊게 통합","프로젝트 구조를 이해하고 작업"],["JetBrains IDE 사용자에게만 의미가 큼"],["자바 프로젝트 테스트 작성","스프링 코드 수정"]],
  en: ["A coding agent inside IntelliJ and other JetBrains IDEs",["Deeply integrated with JetBrains tools for Java, Kotlin and more","Understands project structure"],["Mainly valuable if you use JetBrains IDEs"],["Write tests for a Java project","Modify Spring code"]],
  ja: ["IntelliJなどで使えるコーディングエージェント",["JavaやKotlinなどJetBrainsツールと深く統合","プロジェクト構造を理解して作業"],["JetBrainsのIDE利用者向け"],["Javaプロジェクトのテスト作成","Springのコード修正"]],
  zh: ["可在IntelliJ等IDE中使用的编程智能体",["与Java、Kotlin等JetBrains工具深度集成","理解项目结构后工作"],["主要适合JetBrains IDE用户"],["为Java项目写测试","修改Spring代码"]]
}, [["@free","$0"],["AI Pro","$10","mo"],["AI Ultimate","$30","mo"]]);
S("Cline", "coding", "coding", "https://cline.bot", "free", false, {
  ko: ["VS Code용 오픈소스 코딩 에이전트",["원하는 AI 모델을 골라 연결","단계마다 승인하며 안전하게 작업"],["모델 사용료는 따로 듦"],["로컬 모델로 코딩","작업 과정 하나하나 확인하며 개발"]],
  en: ["An open-source coding agent for VS Code",["Connect any AI model you choose","Approve each step for safe work"],["Model usage costs extra"],["Code with local models","Develop while reviewing each step"]],
  ja: ["VS Code用のオープンソースコーディングエージェント",["好きなAIモデルを選んで接続","ステップごとに承認して安全に作業"],["モデル利用料は別途かかる"],["ローカルモデルでコーディング","作業過程を一つずつ確認しながら開発"]],
  zh: ["适用于VS Code的开源编程智能体",["可接入自选的AI模型","每步确认，安全可控"],["模型费用另计"],["用本地模型写代码","逐步确认开发过程"]]
}, [["@free","$0"],["Model API","payg"]]);
S("Devin", "coding", "coding", "https://devin.ai", "paid", false, {
  ko: ["작업을 맡기면 스스로 개발하는 AI 엔지니어",["작업을 맡기면 계획·코딩·테스트까지 스스로","슬랙에서 대화하듯 지시"],["비용이 높고 결과 검토가 꼭 필요"],["반복적인 마이그레이션 작업","작은 기능 개발 위임"]],
  en: ["An AI software engineer that builds on its own when you hand off work",["Plans, codes and tests on its own once assigned","Give instructions in Slack like a teammate"],["Costly, and results need careful review"],["Repetitive migration work","Delegate small features"]],
  ja: ["作業を任せると自分で開発するAIエンジニア",["任せると計画・コーディング・テストまで自分で","Slackで同僚のように指示"],["費用が高く結果の確認が必須"],["繰り返しの移行作業","小さな機能開発の委任"]],
  zh: ["交代任务后自主开发的AI工程师",["交代后自行完成规划、编码和测试","可在Slack中像同事一样下达指令"],["成本高，必须审查结果"],["重复性迁移工作","委派小功能开发"]]
}, [["Core","$20~","mo"],["Team","$500","mo"]]);

/* ---------- 코딩·웹 제작 › 말로 만드는 앱 빌더 ---------- */
S("Lovable", "coding", "builder", "https://lovable.dev", "mix", true, {
  ko: ["대화만으로 웹앱 제작·배포",["코딩을 몰라도 대화로 웹 앱 완성","로그인·데이터베이스 연결까지 지원"],["무료 크레딧이 적고 복잡한 수정은 한계가 있음"],["동아리 신청 페이지 만들기","아이디어 앱 시제품 빠르게 만들기"]],
  en: ["Describe an app and it builds and deploys a web app for you",["Finish a web app by chatting, no coding needed","Supports login and database setup"],["Few free credits and limits on complex changes"],["Build a club sign-up page","Prototype an app idea quickly"]],
  ja: ["言葉で説明するとWebアプリを作り、公開までしてくれるビルダー",["コーディングを知らなくても会話でWebアプリが完成","ログインやデータベース連携にも対応"],["無料クレジットが少なく、複雑な修正には限界がある"],["サークルの申込ページづくり","アイデアアプリの試作を素早く"]],
  zh: ["用说的就能做出网页应用并直接发布的生成工具",["不会编程也能通过对话完成网页应用","支持登录和数据库连接"],["免费积分少，复杂修改有局限"],["制作社团报名页面","快速做出应用原型"]]
}, [["@free","$0"],["Pro","$25","mo"],["Business","$50","mo"]]);
S("Replit", "coding", "builder", "https://replit.com", "mix", true, {
  ko: ["브라우저에서 앱 제작부터 배포까지",["설치 없이 브라우저에서 바로 개발","여러 프로그래밍 언어 지원"],["무료 버전은 성능과 배포에 제한"],["코딩 수업 실습 환경","간단한 챗봇·웹 서비스 배포"]],
  en: ["Code, run and deploy in the browser, with an AI agent that builds apps",["Develop right in the browser, nothing to install","Supports many programming languages"],["The free plan limits performance and hosting"],["A practice environment for coding class","Deploy a simple chatbot or web service"]],
  ja: ["ブラウザでコーディング・実行・公開まででき、AIエージェントがアプリを作るプラットフォーム",["インストール不要でブラウザからすぐ開発","多くのプログラミング言語に対応"],["無料版は性能と公開に制限"],["プログラミング授業の実習環境","簡単なチャットボットやWebサービスの公開"]],
  zh: ["在浏览器中编码、运行、部署，并由AI智能体搭建应用的平台",["无需安装，浏览器中直接开发","支持多种编程语言"],["免费版性能和部署受限"],["编程课的练习环境","部署简单的聊天机器人或网页服务"]]
}, [["@free","$0"],["Core","$25","mo"],["Teams",null]]);
S("Bolt", "coding", "builder", "https://bolt.new", "mix", true, {
  ko: ["프롬프트로 풀스택 웹앱 생성",["브라우저에서 바로 실행·수정·배포","프레임워크를 골라 시작"],["토큰이 빨리 소모되어 큰 앱은 비용이 듦"],["아이디어 웹앱 시제품","랜딩페이지 빠르게 만들기"]],
  en: ["Generate full-stack web apps from a prompt",["Run, edit and deploy right in the browser","Start from the framework you choose"],["Tokens go fast, so big apps get costly"],["Prototype a web app idea","Build a landing page fast"]],
  ja: ["プロンプトでフルスタックWebアプリを生成",["ブラウザですぐ実行・修正・公開","フレームワークを選んで開始"],["トークン消費が早く大きなアプリは費用がかかる"],["アイデアのWebアプリ試作","LPを素早く作る"]],
  zh: ["用提示词生成全栈网页应用",["在浏览器中直接运行、修改、部署","可选框架开始"],["令牌消耗快，大应用成本高"],["网页应用创意原型","快速做落地页"]]
}, [["@free","$0"],["Pro","$25","mo"]]);
S("v0", "coding", "builder", "https://v0.app", "mix", false, {
  ko: ["버셀의 웹 화면·앱 생성기",["깔끔한 React 화면 코드 생성","버셀로 바로 배포"],["디자인이 비슷비슷해질 수 있음"],["대시보드 화면 만들기","웹 컴포넌트 시안"]],
  en: ["Vercel's generator for web screens and apps",["Generates clean React UI code","Deploy straight to Vercel"],["Designs can look alike"],["Build a dashboard screen","Draft web components"]],
  ja: ["VercelのWeb画面・アプリ生成ツール",["きれいなReactの画面コードを生成","Vercelにすぐ公開"],["デザインが似通いやすい"],["ダッシュボード画面づくり","Webコンポーネントの案"]],
  zh: ["Vercel推出的网页界面和应用生成器",["生成整洁的React界面代码","可直接部署到Vercel"],["设计可能千篇一律"],["制作仪表盘界面","网页组件草案"]]
}, [["@free","$0"],["Premium","$20","mo"],["Team","$30","user"]]);
S("Google AI Studio 빌드", "coding", "builder", "https://aistudio.google.com", "free", false, {
  ko: ["말로 제미나이 기반 앱 만들기",["무료로 AI 기능이 들어간 앱 제작","제미나이 모델을 바로 연결"],["완성 앱을 운영하려면 추가 설정 필요"],["AI 퀴즈 앱 만들기","이미지 분석 미니앱"]],
  en: ["Build Gemini-powered apps by describing them",["Build apps with AI features for free","Gemini models connected out of the box"],["Running a finished app needs extra setup"],["Make an AI quiz app","An image analysis mini app"]],
  ja: ["言葉でGemini搭載アプリを作る",["無料でAI機能入りのアプリを作れる","Geminiモデルをすぐ接続"],["完成したアプリの運用には追加設定が必要"],["AIクイズアプリづくり","画像分析のミニアプリ"]],
  zh: ["用一句话搭建基于Gemini的应用",["免费制作带AI功能的应用","直接接入Gemini模型"],["正式运营需额外设置"],["做一个AI测验应用","图像分析小应用"]]
}, [["@free","$0"]]);
S("Base44", "coding", "builder", "https://base44.com", "mix", false, {
  ko: ["로그인·DB가 포함된 앱을 말로 생성",["로그인·데이터베이스가 기본 포함","설정 없이 바로 쓸 수 있는 앱"],["복잡한 맞춤 기능은 한계"],["동아리 회원 관리 앱","사내 신청서 앱"]],
  en: ["Generate apps with login and a database by describing them",["Login and database built in","Apps ready to use with no setup"],["Limits on complex custom features"],["A club membership app","An internal request form app"]],
  ja: ["ログイン・DB付きのアプリを言葉で生成",["ログインとデータベースが標準装備","設定なしですぐ使えるアプリ"],["複雑なカスタム機能には限界"],["サークルの会員管理アプリ","社内申請フォームのアプリ"]],
  zh: ["用一句话生成带登录和数据库的应用",["默认包含登录和数据库","无需设置即可使用的应用"],["复杂定制功能有限"],["社团会员管理应用","内部申请表应用"]]
}, [["@free","$0"],["Starter","$20","mo"],["Builder","$50","mo"]]);
S("Bubble", "coding", "builder", "https://bubble.io", "mix", false, {
  ko: ["노코드 웹앱 빌더, AI로 초안 생성",["복잡한 서비스도 코딩 없이 제작","AI로 앱 초안 생성"],["배우는 데 시간이 걸리고 요금이 높아짐"],["스타트업 MVP 제작","예약·커뮤니티 서비스"]],
  en: ["A no-code web app builder with AI drafts",["Build complex services without code","AI generates a first draft"],["Learning curve and rising costs"],["Build a startup MVP","Booking or community services"]],
  ja: ["AIで下書きを作るノーコードWebアプリビルダー",["複雑なサービスもコーディングなしで制作","AIでアプリの下書きを生成"],["習得に時間がかかり料金も上がりがち"],["スタートアップのMVP制作","予約・コミュニティサービス"]],
  zh: ["可用AI生成草稿的无代码网页应用构建器",["无需编程也能做复杂服务","用AI生成应用草稿"],["学习成本高，费用会增加"],["制作创业MVP","预约或社区类服务"]]
}, [["@free","$0"],["Starter","$32","mo"],["Growth","$134","mo"]]);
S("FlutterFlow", "coding", "builder", "https://flutterflow.io", "mix", false, {
  ko: ["모바일 앱 노코드 제작",["안드로이드·iOS 앱을 함께 제작","코드로 내보내 개발자가 이어서 작업"],["본격 배포는 유료"],["학교 행사 앱","쇼핑몰 모바일 앱 시제품"]],
  en: ["No-code mobile app building",["Build Android and iOS apps together","Export code for developers to continue"],["Publishing for real requires a paid plan"],["An app for a school event","Prototype a shopping app"]],
  ja: ["モバイルアプリのノーコード制作",["AndroidとiOSのアプリを一緒に制作","コードを書き出して開発者が引き継げる"],["本格的な公開は有料"],["学校行事のアプリ","ショッピングアプリの試作"]],
  zh: ["无代码制作手机应用",["同时制作安卓和iOS应用","可导出代码交由开发者继续"],["正式发布需付费"],["学校活动应用","购物应用原型"]]
}, [["@free","$0"],["@paid",null]]);

/* ---------- 코딩·웹 제작 › 웹사이트 빌더 ---------- */
S("Framer", "coding", "website", "https://framer.com", "mix", true, {
  ko: ["디자인 감각 좋은 사이트를 AI로 생성",["감각적인 디자인의 사이트를 빠르게","애니메이션 효과가 쉬움"],["복잡한 쇼핑몰 기능은 약함"],["포트폴리오 사이트","스타트업 랜딩페이지"]],
  en: ["Generate beautifully designed sites with AI",["Stylish sites, fast","Easy animation effects"],["Weak for complex e-commerce"],["A portfolio site","A startup landing page"]],
  ja: ["デザイン性の高いサイトをAIで生成",["センスのよいデザインのサイトを素早く","アニメーション効果が簡単"],["複雑なEC機能は弱い"],["ポートフォリオサイト","スタートアップのLP"]],
  zh: ["用AI生成设计感强的网站",["快速做出时尚设计的网站","动画效果容易实现"],["复杂电商功能较弱"],["作品集网站","创业公司落地页"]]
}, [["@free","$0"],["Basic","$10","mo"],["Pro","$30","mo"]]);
S("Wix", "coding", "website", "https://wix.com", "mix", true, {
  ko: ["대화로 사이트 구성, 예약·쇼핑 기능",["대화로 사이트 초안 완성","예약·쇼핑·블로그 기능 내장"],["무료는 Wix 광고와 도메인 제한"],["가게 예약 홈페이지","작은 온라인 쇼핑몰"]],
  en: ["Build a site by chatting, with booking and shopping features",["Finish a site draft by chatting","Built-in booking, shop and blog"],["Free plan shows Wix ads and limits domains"],["A booking site for a shop","A small online store"]],
  ja: ["会話でサイトを構成、予約・ショッピング機能",["会話でサイトの下書きが完成","予約・ショップ・ブログ機能を内蔵"],["無料はWix広告とドメインの制限"],["お店の予約ホームページ","小さなネットショップ"]],
  zh: ["通过对话搭建网站，带预约和购物功能",["通过对话完成网站初稿","内置预约、商店、博客功能"],["免费版有Wix广告并限制域名"],["店铺预约网站","小型网店"]]
}, [["@free","$0"],["Light","$17","mo"],["Core","$29","mo"],["Business","$36","mo"]]);
S("아임웹", "coding", "website", "https://imweb.me", "mix", true, {
  ko: ["국내 결제 연동 쇼핑몰·홈페이지 빌더",["국내 결제·배송 연동이 쉬움","한국어 고객 지원"],["해외 판매 기능은 제한적"],["국내 쇼핑몰 오픈","소상공인 홈페이지"]],
  en: ["A Korean builder for stores and websites with local payments",["Easy Korean payment and shipping integration","Korean-language support"],["Limited overseas selling features"],["Open an online store in Korea","A website for a small business"]],
  ja: ["韓国の決済に対応したショップ・HP作成ツール",["韓国の決済・配送連携が簡単","韓国語サポート"],["海外販売機能は限定的"],["韓国でネットショップを開く","小規模事業者のホームページ"]],
  zh: ["支持韩国本地支付的网店和网站搭建工具",["轻松对接韩国支付和物流","韩语客服支持"],["海外销售功能有限"],["在韩国开网店","小商户官网"]]
}, [["@free","$0"],["@paid",null]]);
S("Webflow", "coding", "website", "https://webflow.com", "mix", false, {
  ko: ["전문가용 웹 디자인·CMS와 AI",["디자이너 수준의 세밀한 제어","블로그·콘텐츠 관리 기능 강력"],["배우기 어렵고 요금 체계가 복잡함"],["회사 공식 홈페이지","콘텐츠가 많은 마케팅 사이트"]],
  en: ["Professional web design and CMS with AI",["Designer-level precise control","Powerful blog and content management"],["Hard to learn, with complex pricing"],["An official company website","A content-heavy marketing site"]],
  ja: ["プロ向けWebデザイン・CMSとAI",["デザイナーレベルの細かい制御","ブログ・コンテンツ管理が強力"],["習得が難しく料金体系が複雑"],["会社の公式ホームページ","コンテンツの多いマーケサイト"]],
  zh: ["专业网页设计与内容管理系统及AI",["设计师级精细控制","博客和内容管理功能强大"],["难学，价格体系复杂"],["公司官网","内容丰富的营销网站"]]
}, [["@free","$0"],["Basic","$14","mo"],["CMS","$23","mo"]]);
S("Squarespace", "coding", "website", "https://squarespace.com", "paid", false, {
  ko: ["포트폴리오·브랜드 사이트 AI 생성",["세련된 템플릿과 AI 사이트 생성","도메인·호스팅을 한 번에"],["무료 요금제가 없음"],["사진작가 포트폴리오","브랜드 소개 사이트"]],
  en: ["AI-generated portfolio and brand sites",["Polished templates plus AI site generation","Domain and hosting together"],["No free plan"],["A photographer's portfolio","A brand showcase site"]],
  ja: ["ポートフォリオ・ブランドサイトをAI生成",["洗練されたテンプレートとAIサイト生成","ドメインとホスティングを一度に"],["無料プランがない"],["写真家のポートフォリオ","ブランド紹介サイト"]],
  zh: ["AI生成作品集和品牌网站",["精致模板加AI建站","域名和托管一次搞定"],["没有免费方案"],["摄影师作品集","品牌介绍网站"]]
}, [["Basic","$16","mo"],["Core","$23","mo"],["Plus","$39","mo"]]);
S("Durable", "coding", "website", "https://durable.co", "mix", false, {
  ko: ["소상공인용 사이트 자동 생성",["업종만 입력하면 사이트가 30초 만에","고객 관리·견적 같은 사업 도구 포함"],["디자인 자유도가 낮음"],["1인 사업자 홈페이지","프리랜서 소개 페이지"]],
  en: ["Auto-generated websites for small businesses",["A site in about 30 seconds from your business type","Includes business tools like CRM and invoices"],["Little design freedom"],["A website for a solo business","A freelancer intro page"]],
  ja: ["小規模事業者向けサイトの自動生成",["業種を入れるだけでサイトが約30秒で完成","顧客管理や見積もりなどのビジネスツール付き"],["デザインの自由度が低い"],["個人事業主のホームページ","フリーランスの紹介ページ"]],
  zh: ["为小商户自动生成网站",["输入行业约30秒生成网站","包含客户管理、报价等经营工具"],["设计自由度低"],["个体户官网","自由职业者介绍页"]]
}, [["@paid",null]]);
S("Hostinger 웹사이트 빌더", "coding", "website", "https://hostinger.com", "paid", false, {
  ko: ["호스팅과 묶인 저렴한 AI 사이트 빌더",["호스팅·도메인 포함 저렴한 가격","AI로 사이트 초안 생성"],["장기 결제 시에만 최저가"],["저렴하게 첫 홈페이지 만들기","작은 블로그 운영"]],
  en: ["An inexpensive AI site builder bundled with hosting",["Low price including hosting and domain","AI drafts the site"],["Lowest prices require long-term billing"],["Make a first website cheaply","Run a small blog"]],
  ja: ["ホスティング付きの安いAIサイトビルダー",["ホスティング・ドメイン込みで安い","AIでサイトの下書きを生成"],["最安値は長期契約のみ"],["安く最初のホームページを作る","小さなブログの運営"]],
  zh: ["与主机捆绑的低价AI建站工具",["含主机和域名，价格便宜","用AI生成网站草稿"],["长期付费才有最低价"],["低成本做第一个网站","运营小博客"]]
}, [["Premium","$2.99~","mo"]]);
S("10Web", "coding", "website", "https://10web.io", "paid", false, {
  ko: ["워드프레스 사이트 AI 생성",["워드프레스 사이트를 AI로 자동 구성","기존 사이트를 보고 비슷하게 재구성"],["무료 요금제가 없음"],["워드프레스 블로그 시작","옛 홈페이지 리뉴얼"]],
  en: ["AI-generated WordPress sites",["Builds WordPress sites automatically with AI","Recreates a site from an existing one"],["No free plan"],["Start a WordPress blog","Renew an old website"]],
  ja: ["WordPressサイトをAIで生成",["WordPressサイトをAIで自動構成","既存サイトを参考に似た構成で再構築"],["無料プランがない"],["WordPressブログを始める","古いホームページのリニューアル"]],
  zh: ["用AI生成WordPress网站",["用AI自动搭建WordPress网站","参考现有网站重新搭建"],["没有免费方案"],["开始WordPress博客","翻新旧官网"]]
}, [["@paid",null]]);

/* ---------- 코딩·웹 제작 › 코드 리뷰·품질 ---------- */
S("CodeRabbit", "coding", "review", "https://coderabbit.ai", "mix", true, {
  ko: ["풀 리퀘스트 자동 코드 리뷰",["PR마다 줄 단위 리뷰 코멘트","오픈소스 프로젝트는 무료"],["사소한 지적이 많을 수 있음"],["팀 코드 리뷰 부담 줄이기","개인 프로젝트 코드 점검"]],
  en: ["Automatic code review on pull requests",["Line-by-line review comments on every PR","Free for open-source projects"],["Can raise lots of minor nitpicks"],["Lighten the team's review load","Check code in personal projects"]],
  ja: ["プルリクエストの自動コードレビュー",["PRごとに行単位のレビューコメント","オープンソースは無料"],["細かい指摘が多くなることも"],["チームのレビュー負担を減らす","個人プロジェクトのコード点検"]],
  zh: ["拉取请求自动代码审查",["每个PR都有逐行审查评论","开源项目免费"],["可能有很多琐碎意见"],["减轻团队代码审查负担","检查个人项目代码"]]
}, [["@free","$0"],["Lite","$12","user"],["Pro","$24","user"]]);
S("Qodo", "coding", "review", "https://qodo.ai", "mix", false, {
  ko: ["테스트 생성과 코드 품질 점검",["놓친 테스트 케이스를 자동 생성","IDE와 PR에서 함께 사용"],["대규모 팀 기능은 유료"],["함수별 테스트 작성","PR 품질 점검"]],
  en: ["Test generation and code quality checks",["Auto-generates missing test cases","Works in the IDE and on PRs"],["Large-team features are paid"],["Write tests for each function","Check PR quality"]],
  ja: ["テスト生成とコード品質チェック",["抜けていたテストケースを自動生成","IDEとPRの両方で使える"],["大規模チーム向け機能は有料"],["関数ごとのテスト作成","PRの品質チェック"]],
  zh: ["测试生成与代码质量检查",["自动生成遗漏的测试用例","可在IDE和PR中使用"],["大团队功能收费"],["为每个函数写测试","检查PR质量"]]
}, [["@free","$0"],["Teams","$30","user"]]);
S("Greptile", "coding", "review", "https://greptile.com", "paid", false, {
  ko: ["코드베이스 전체를 이해하는 리뷰 봇",["코드베이스 전체 맥락을 보고 리뷰","관련 파일 간 문제까지 발견"],["무료 요금제가 없음"],["대규모 프로젝트 PR 리뷰","버그 위험 사전 발견"]],
  en: ["A review bot that understands your entire codebase",["Reviews with context from the whole codebase","Catches issues across related files"],["No free plan"],["PR review on large projects","Spot bug risks early"]],
  ja: ["コードベース全体を理解するレビューボット",["コードベース全体の文脈を見てレビュー","関連ファイル間の問題まで発見"],["無料プランがない"],["大規模プロジェクトのPRレビュー","バグのリスクを事前に発見"]],
  zh: ["理解整个代码库的审查机器人",["结合整个代码库语境审查","能发现跨文件的问题"],["没有免费方案"],["大型项目PR审查","提前发现Bug风险"]]
}, [["Cloud","$30","user"]]);

/* ---------- 문서·업무 생산성 › 발표 자료 ---------- */
S("Gamma", "productivity", "slides", "https://gamma.app", "mix", true, {
  ko: ["주제만 입력하면 슬라이드·문서·웹페이지를 한 번에 만들어 주는 도구",["몇 분 만에 디자인까지 갖춘 발표 자료 완성","같은 내용을 웹페이지나 문서로도 바로 공유"],["파워포인트로 내보내면 레이아웃이 일부 틀어질 수 있음"],["수업 발표 초안 빠르게 만들기","제안서를 링크로 공유하기"]],
  en: ["Type a topic and get slides, docs or a web page in one go",["A designed deck in minutes","Share the same content as a web page or doc"],["Layouts can shift when exported to PowerPoint"],["Draft a class presentation fast","Share a proposal as a link"]],
  ja: ["テーマを入れるだけでスライド・文書・Webページを一度に作るツール",["数分でデザイン込みの発表資料が完成","同じ内容をWebページや文書としてもすぐ共有"],["PowerPointに書き出すとレイアウトが一部崩れることがある"],["授業発表の下書きを素早く作る","提案書をリンクで共有"]],
  zh: ["输入主题即可一次生成幻灯片、文档或网页的工具",["几分钟就能完成带设计的演示文稿","同一内容可直接以网页或文档分享"],["导出为PowerPoint时版式可能部分错乱"],["快速起草课堂演讲","以链接形式分享提案"]]
}, [["@free","$0"],["Plus","$10","mo"],["Pro","$20","mo"]]);
S("미리캔버스 AI", "productivity", "slides", "https://miricanvas.com", "mix", true, {
  ko: ["한글 폰트와 한국형 템플릿으로 PPT를 만드는 국산 디자인 플랫폼",["한국 감성 템플릿과 상업용 무료 폰트가 많음","AI로 PPT 초안과 이미지를 생성"],["고급 템플릿과 AI 기능 일부는 유료"],["학교·회사 발표 PPT 디자인","카드뉴스와 상세페이지 제작"]],
  en: ["A Korean design platform for slides with Korean fonts and templates",["Many Korean-style templates and free commercial fonts","AI drafts slides and images"],["Premium templates and some AI features are paid"],["Design slides for school or work","Make social cards and product detail pages"]],
  ja: ["韓国語フォントと韓国風テンプレートでスライドを作る韓国製デザインプラットフォーム",["韓国らしいテンプレートと商用無料フォントが豊富","AIでスライドの下書きと画像を生成"],["上位テンプレートと一部AI機能は有料"],["学校や会社の発表スライドのデザイン","カードニュースや商品ページの制作"]],
  zh: ["用韩文字体和韩式模板制作PPT的韩国设计平台",["韩式模板和可商用免费字体多","AI生成PPT初稿和图片"],["高级模板和部分AI功能收费"],["设计学校或公司的演示PPT","制作图文卡片和商品详情页"]]
}, [["@free","$0"],["Pro","₩14,900","mo"]]);
S("Napkin AI", "productivity", "slides", "https://napkin.ai", "mix", true, {
  ko: ["글을 붙여넣으면 도식·다이어그램으로 바꿔주는 시각화 도구",["설명 글이 순서도·비교표 그림으로 바로 바뀜","PPT·문서에 붙일 이미지로 내보내기"],["완전한 발표 자료를 만드는 도구는 아님"],["보고서 핵심 내용을 그림 한 장으로","발표 슬라이드에 넣을 도식 만들기"]],
  en: ["Paste text and turn it into diagrams and visuals",["Explanations become flowcharts and comparison graphics","Export as images for slides and docs"],["Not a full presentation builder"],["Turn a report's key point into one visual","Make diagrams for your slides"]],
  ja: ["文章を貼り付けると図解・ダイアグラムに変える可視化ツール",["説明文がフローチャートや比較図にすぐ変わる","スライドや文書に貼る画像として書き出せる"],["発表資料をまるごと作るツールではない"],["レポートの要点を1枚の図に","発表スライド用の図解づくり"]],
  zh: ["粘贴文字即可变成图解和示意图的可视化工具",["说明文字立刻变成流程图和对比图","可导出为图片用于PPT和文档"],["不是完整的演示文稿制作工具"],["把报告要点做成一张图","为幻灯片制作图解"]]
}, [["@free","$0"],["Plus","$12","mo"],["Pro","$22","mo"]]);
S("Copilot in PowerPoint", "productivity", "slides", "https://microsoft.com/microsoft-365/copilot", "paid", true, {
  ko: ["워드 문서나 프롬프트로 파워포인트 슬라이드를 만드는 마이크로소프트 AI",["회사 PPT 템플릿을 그대로 활용","워드 문서를 슬라이드로 바로 변환"],["Microsoft 365 Copilot 유료 구독이 필요함"],["보고서 워드 파일을 발표용 PPT로","슬라이드 내용 요약과 발표 노트 작성"]],
  en: ["Microsoft AI that builds PowerPoint slides from a Word doc or prompt",["Uses your company's PowerPoint template","Turns a Word document straight into slides"],["Needs a paid Microsoft 365 Copilot plan"],["Turn a Word report into a deck","Summarize slides and write speaker notes"]],
  ja: ["Word文書やプロンプトからPowerPointスライドを作るMicrosoftのAI",["会社のPowerPointテンプレートをそのまま活用","Word文書をすぐスライドに変換"],["Microsoft 365 Copilotの有料契約が必要"],["報告書のWordを発表用スライドに","スライドの要約と発表者ノートの作成"]],
  zh: ["用Word文档或提示词生成PowerPoint幻灯片的微软AI",["直接使用公司PPT模板","把Word文档直接转成幻灯片"],["需要付费订阅Microsoft 365 Copilot"],["把Word报告做成演示PPT","总结幻灯片并撰写演讲备注"]]
}, [["Microsoft 365 Personal","$9.99","mo"],["Microsoft 365 Premium","$19.99","mo"],["Microsoft 365 Copilot","$30","user"]]);
S("Gemini in Google Slides", "productivity", "slides", "https://workspace.google.com", "paid", false, {
  ko: ["구글 슬라이드 안에서 슬라이드와 이미지를 만드는 제미나이 기능",["구글 드라이브 자료를 참고해 슬라이드 작성","팀원과 실시간 공동 편집"],["Google Workspace의 AI 포함 요금제가 필요함"],["팀 프로젝트 발표 자료 함께 만들기","슬라이드용 이미지 생성"]],
  en: ["Gemini features that create slides and images inside Google Slides",["Writes slides using files from Google Drive","Real-time co-editing with your team"],["Needs a Google Workspace plan that includes AI"],["Build a team project deck together","Generate images for slides"]],
  ja: ["Googleスライドの中でスライドや画像を作るGeminiの機能",["Googleドライブの資料を参考にスライドを作成","チームでリアルタイム共同編集"],["AI込みのGoogle Workspaceプランが必要"],["チームプロジェクトの発表資料を一緒に作る","スライド用の画像生成"]],
  zh: ["在谷歌幻灯片中生成幻灯片和图片的Gemini功能",["参考谷歌云端硬盘资料制作幻灯片","与团队实时协作编辑"],["需要包含AI的Google Workspace方案"],["与团队一起制作项目演示","为幻灯片生成图片"]]
}, [["Workspace Business Standard","$14","user"],["Workspace Business Plus","$22","user"]]);
S("Canva 매직 디자인", "productivity", "slides", "https://canva.com", "mix", false, {
  ko: ["캔바 템플릿에 AI가 내용을 채워 발표 자료를 만드는 기능",["템플릿 선택 폭이 매우 넓음","디자인 수정이 쉽고 팀 공유 편리"],["AI 생성 횟수와 고급 기능은 유료 위주"],["동아리 소개 발표 자료","SNS용 카드뉴스 겸 발표 자료"]],
  en: ["Canva feature where AI fills templates to build a presentation",["A huge choice of templates","Easy design edits and team sharing"],["AI uses and advanced features are mostly paid"],["A club introduction deck","A deck that doubles as social media cards"]],
  ja: ["CanvaのテンプレートにAIが内容を入れて発表資料を作る機能",["テンプレートの選択肢がとても多い","デザイン修正が簡単でチーム共有も便利"],["AIの生成回数と高度な機能は主に有料"],["サークル紹介の発表資料","SNSカード兼用の発表資料"]],
  zh: ["由AI为Canva模板填充内容生成演示文稿的功能",["模板选择非常多","设计修改简单，团队分享方便"],["AI生成次数和高级功能以付费为主"],["社团介绍演示文稿","兼作社交媒体卡片的演示文稿"]]
}, [["@free","$0"],["Canva Pro","$15","mo"],["Canva Teams","$10","user"]]);
S("Genspark AI 슬라이드", "productivity", "slides", "https://genspark.ai", "mix", false, {
  ko: ["에이전트가 자료 조사부터 발표 자료 완성까지 해주는 슬라이드 기능",["주제만 주면 리서치와 슬라이드 제작을 한 번에","출처가 있는 자료를 바탕으로 작성"],["무료 크레딧이 적고 결과물을 꼼꼼히 검토해야 함"],["시장 조사 발표 자료 초안","업계 동향 정리 슬라이드"]],
  en: ["Slides where an agent does the research and builds the deck",["Research and slide-making from a single topic","Built on sourced material"],["Few free credits and output needs careful review"],["Draft a market research deck","Slides summarizing industry trends"]],
  ja: ["エージェントが資料調査から発表資料の完成まで行うスライド機能",["テーマを渡すだけでリサーチとスライド作成を一度に","出典のある資料をもとに作成"],["無料クレジットが少なく、結果を丁寧に確認する必要がある"],["市場調査の発表資料の下書き","業界動向をまとめたスライド"]],
  zh: ["由智能体从调研到完成演示文稿一手包办的幻灯片功能",["只给主题就能一次完成调研和制作","基于有出处的资料撰写"],["免费积分少，需要仔细检查结果"],["起草市场调研演示","整理行业动态的幻灯片"]]
}, [["@free","$0"],["Plus","$24.99","mo"],["Pro","$249.99","mo"]]);
S("Skywork", "productivity", "slides", "https://skywork.ai", "mix", false, {
  ko: ["에이전트 방식으로 업무·학술 발표 자료를 만드는 AI 작업 공간",["보고서와 슬라이드를 함께 만들어 줌","자료 조사 과정을 단계별로 보여줌"],["무료 사용량이 적고 한국어 결과물은 다듬기가 필요할 수 있음"],["학술 발표 자료 초안","업무 보고용 슬라이드"]],
  en: ["An AI workspace that builds business and academic decks agent-style",["Creates a report and slides together","Shows its research steps one by one"],["Small free allowance; non-English output may need polishing"],["Draft an academic presentation","Slides for a work report"]],
  ja: ["エージェント方式で業務・学術の発表資料を作るAIワークスペース",["レポートとスライドを一緒に作る","調査の過程を段階ごとに見せてくれる"],["無料枠が少なく、日本語の結果は手直しが必要なことも"],["学会発表資料の下書き","業務報告用スライド"]],
  zh: ["以智能体方式制作业务和学术演示文稿的AI工作空间",["同时生成报告和幻灯片","逐步展示调研过程"],["免费额度少，中文结果可能需要润色"],["起草学术演讲稿","工作汇报用幻灯片"]]
}, [["@free","$0"],["@paid",null]]);
S("Plus AI", "productivity", "slides", "https://plusdocs.com", "paid", false, {
  ko: ["구글 슬라이드와 파워포인트 안에서 바로 슬라이드를 만드는 추가 기능",["평소 쓰는 프로그램을 벗어나지 않고 생성","기존 슬라이드 다시 쓰기·재배치"],["무료 체험 후 유료"],["구글 슬라이드에서 바로 초안 만들기","기존 발표 자료 리디자인"]],
  en: ["An add-on that builds slides right inside Google Slides and PowerPoint",["Generate without leaving the app you use","Rewrite and re-layout existing slides"],["Paid after the free trial"],["Draft a deck directly in Google Slides","Redesign an existing presentation"]],
  ja: ["GoogleスライドとPowerPointの中で直接スライドを作るアドオン",["いつものアプリから離れずに生成","既存スライドの書き直しと再配置"],["無料体験後は有料"],["Googleスライドで直接下書き","既存の発表資料をリデザイン"]],
  zh: ["直接在谷歌幻灯片和PowerPoint中生成幻灯片的插件",["不离开常用软件即可生成","改写和重新排版现有幻灯片"],["免费试用后收费"],["在谷歌幻灯片中直接起草","重新设计已有演示文稿"]]
}, [["@paid",null]]);
S("SlideSpeak", "productivity", "slides", "https://slidespeak.co", "mix", false, {
  ko: ["문서·웹페이지를 파워포인트 파일로 바꿔주는 도구",["PDF·워드를 올리면 PPT로 변환","PPT 파일 요약 기능도 제공"],["디자인 자유도는 전문 디자인 툴보다 낮음"],["긴 보고서를 발표용 PPT로 변환","받은 PPT 내용 빠르게 요약"]],
  en: ["Turns documents and web pages into PowerPoint files",["Upload a PDF or Word file and get a deck","Also summarizes PowerPoint files"],["Less design freedom than dedicated design tools"],["Convert a long report into a deck","Quickly summarize a deck you received"]],
  ja: ["文書やWebページをPowerPointファイルに変えるツール",["PDFやWordをアップするとスライドに変換","PowerPointファイルの要約機能もある"],["デザインの自由度は専門ツールより低い"],["長い報告書を発表用スライドに変換","受け取ったスライドの内容を素早く要約"]],
  zh: ["把文档和网页转换成PowerPoint文件的工具",["上传PDF或Word即可转成PPT","也能总结PPT文件内容"],["设计自由度不如专业设计工具"],["把长篇报告转成演示PPT","快速总结收到的PPT"]]
}, [["@free","$0"],["@paid",null]]);
S("Beautiful.ai", "productivity", "slides", "https://beautiful.ai", "paid", false, {
  ko: ["내용을 넣으면 디자인 규칙에 맞게 자동 정렬되는 슬라이드 도구",["요소를 추가해도 레이아웃이 자동으로 정돈됨","회사 브랜드 색·폰트 통일 관리"],["무료 요금제가 없음"],["사내 보고 슬라이드 통일","투자 제안서 디자인"]],
  en: ["A slide tool that auto-arranges content by design rules",["Layouts tidy themselves as you add content","Keeps brand colors and fonts consistent"],["No free plan"],["Standardize internal report slides","Design an investor pitch"]],
  ja: ["内容を入れるとデザインルールに沿って自動で整うスライドツール",["要素を足してもレイアウトが自動で整う","会社のブランド色やフォントを統一管理"],["無料プランがない"],["社内報告スライドの統一","投資提案書のデザイン"]],
  zh: ["填入内容后按设计规则自动排版的幻灯片工具",["添加元素后版式自动整理","统一管理公司品牌色和字体"],["没有免费方案"],["统一内部汇报幻灯片","设计融资路演稿"]]
}, [["Pro","$12","mo"],["Team","$40","user"]]);
S("Presentations.ai", "productivity", "slides", "https://presentations.ai", "mix", false, {
  ko: ["브랜드 일관성을 지키며 슬라이드를 대량으로 만드는 도구",["브랜드 템플릿을 정해 두고 여러 자료 제작","주제 입력만으로 초안 생성"],["고급 내보내기 기능은 유료"],["영업용 자료 여러 버전 만들기","회사 소개서 시리즈 제작"]],
  en: ["Create many on-brand decks at scale",["Set a brand template and reuse it","Drafts from just a topic"],["Advanced export features are paid"],["Make several versions of sales decks","Produce a series of company profiles"]],
  ja: ["ブランドの一貫性を保ちながらスライドを大量に作るツール",["ブランドテンプレートを決めて複数の資料を制作","テーマ入力だけで下書きを生成"],["高度な書き出し機能は有料"],["営業資料を複数パターン作成","会社紹介資料をシリーズで制作"]],
  zh: ["在保持品牌一致的前提下批量制作幻灯片的工具",["设定品牌模板后制作多份资料","输入主题即可生成初稿"],["高级导出功能收费"],["制作多个版本的销售资料","批量制作公司介绍"]]
}, [["@free","$0"],["@paid",null]]);
S("Pitch", "productivity", "slides", "https://pitch.com", "mix", false, {
  ko: ["팀이 함께 만들고 발표하는 협업형 프레젠테이션 도구",["실시간 공동 편집과 댓글이 편리","AI가 초안과 레이아웃 제안"],["오프라인 파워포인트 작업에 익숙하면 적응이 필요"],["스타트업 팀 피치덱","팀 주간 회의 자료"]],
  en: ["A collaborative presentation tool for teams to build and present together",["Smooth real-time co-editing and comments","AI suggests drafts and layouts"],["Takes adjusting if you are used to offline PowerPoint"],["A startup team pitch deck","Weekly team meeting slides"]],
  ja: ["チームで一緒に作って発表するコラボ型プレゼンツール",["リアルタイム共同編集とコメントが便利","AIが下書きとレイアウトを提案"],["オフラインのPowerPointに慣れていると慣れが必要"],["スタートアップのピッチ資料","チームの週次会議資料"]],
  zh: ["团队共同制作和演示的协作型演示工具",["实时协作编辑和评论很方便","AI推荐初稿和版式"],["习惯离线PowerPoint的人需要适应"],["创业团队路演稿","团队周会资料"]]
}, [["@free","$0"],["Pro",null]]);
S("Prezi AI", "productivity", "slides", "https://prezi.com", "mix", false, {
  ko: ["줌인·이동 효과로 흐름 있는 발표를 만드는 프레지의 AI 기능",["화면이 이동하는 비선형 발표로 시선 집중","AI가 내용 구조를 잡아 줌"],["효과가 과하면 오히려 산만해질 수 있음"],["주제 사이 관계를 보여주는 발표","강연·수업 자료"]],
  en: ["Prezi's AI for flowing talks with zoom and pan effects",["Non-linear zooming keeps attention","AI structures your content"],["Too much motion can distract"],["Talks that show how topics connect","Lectures and class material"]],
  ja: ["ズームや移動の効果で流れのある発表を作るPreziのAI機能",["画面が移動する非線形の発表で注目を集める","AIが内容の構成を組んでくれる"],["効果が多すぎるとかえって散漫になる"],["テーマ同士の関係を見せる発表","講演や授業の資料"]],
  zh: ["Prezi通过缩放和移动效果制作连贯演示的AI功能",["画面移动的非线性演示能吸引注意","AI帮你搭建内容结构"],["效果过多反而会显得杂乱"],["展示主题之间关系的演讲","讲座和课堂资料"]]
}, [["@free","$0"],["@paid",null]]);
S("Decktopus", "productivity", "slides", "https://decktopus.com", "mix", false, {
  ko: ["영업·제안 자료를 빠르게 만드는 AI 발표 도구",["질문 몇 개에 답하면 맞춤형 초안 완성","발표 연습용 예상 질문과 노트 제공"],["템플릿 스타일 폭이 넓지 않음"],["고객 제안서 빠르게 만들기","웨비나 발표 자료"]],
  en: ["An AI presentation tool for quick sales and proposal decks",["Answer a few questions and get a tailored draft","Gives practice Q&A and speaker notes"],["Limited range of template styles"],["Make a client proposal fast","Webinar slides"]],
  ja: ["営業・提案資料を素早く作るAIプレゼンツール",["いくつかの質問に答えるとカスタム下書きが完成","発表練習用の想定質問とノートを提供"],["テンプレートのスタイルの幅は広くない"],["顧客向け提案書を素早く作成","ウェビナーの発表資料"]],
  zh: ["快速制作销售和提案资料的AI演示工具",["回答几个问题即可得到定制初稿","提供演练用的预设问题和备注"],["模板风格选择不多"],["快速制作客户提案","网络研讨会演示资料"]]
}, [["@free","$0"],["@paid",null]]);
S("SlidesAI", "productivity", "slides", "https://slidesai.io", "mix", false, {
  ko: ["텍스트를 붙여넣으면 구글 슬라이드로 바꿔주는 추가 기능",["구글 슬라이드 안에서 바로 실행","간단하고 저렴함"],["디자인이 단순한 편"],["수업 노트를 슬라이드로 변환","회의 요약을 발표 자료로"]],
  en: ["An add-on that turns pasted text into Google Slides",["Runs right inside Google Slides","Simple and inexpensive"],["Designs are fairly basic"],["Turn class notes into slides","Make a meeting summary into a deck"]],
  ja: ["貼り付けた文章をGoogleスライドに変えるアドオン",["Googleスライドの中ですぐ実行","シンプルで安い"],["デザインはシンプルな方"],["授業ノートをスライドに変換","会議の要約を発表資料に"]],
  zh: ["把粘贴的文字转成谷歌幻灯片的插件",["在谷歌幻灯片内直接运行","简单且便宜"],["设计较为朴素"],["把课堂笔记转成幻灯片","把会议总结做成演示"]]
}, [["@free","$0"],["Pro","$10","mo"]]);
S("AutoPPT", "productivity", "slides", "https://autoppt.ai", "mix", false, {
  ko: ["주제를 입력하면 깔끔한 .pptx 파일을 만들어 주는 도구",["바로 편집 가능한 파워포인트 파일로 저장","사용법이 단순함"],["무료 버전은 생성 횟수가 제한됨"],["과제용 PPT 뼈대 만들기","파워포인트에서 이어서 편집할 초안"]],
  en: ["Enter a topic and get a clean .pptx file",["Saves an editable PowerPoint file","Very simple to use"],["The free plan limits generations"],["Build a skeleton deck for homework","A draft to keep editing in PowerPoint"]],
  ja: ["テーマを入れるときれいな.pptxファイルを作るツール",["すぐ編集できるPowerPointファイルで保存","使い方がシンプル"],["無料版は生成回数に制限"],["課題用スライドの骨組みづくり","PowerPointで続けて編集する下書き"]],
  zh: ["输入主题即可生成整洁.pptx文件的工具",["保存为可直接编辑的PowerPoint文件","用法简单"],["免费版生成次数有限"],["搭建作业用PPT框架","在PowerPoint中继续编辑的初稿"]]
}, [["@free","$0"],["@paid",null]]);
S("Smallppt", "productivity", "slides", "https://smallppt.com", "mix", false, {
  ko: ["여러 언어를 지원하는 간편한 AI PPT 생성기",["한국어 포함 다국어로 빠르게 생성","문서 파일을 올려 PPT로 변환"],["세밀한 디자인 수정은 제한적"],["외국어 발표 자료 초안","짧은 시간에 PPT 만들기"]],
  en: ["A simple AI slide maker that supports many languages",["Fast generation in many languages, including Korean","Upload a document to convert into slides"],["Limited fine-grained design control"],["Draft a deck in another language","Make slides on a tight deadline"]],
  ja: ["多言語に対応した手軽なAIスライド生成ツール",["韓国語を含む多言語で素早く生成","文書ファイルをアップしてスライドに変換"],["細かいデザイン修正は限定的"],["外国語の発表資料の下書き","短時間でスライドを作る"]],
  zh: ["支持多种语言的简便AI PPT生成器",["包括韩语在内多语言快速生成","上传文档转换成PPT"],["精细设计修改有限"],["起草外语演示资料","短时间内做出PPT"]]
}, [["@free","$0"],["@paid",null]]);
S("Twistly", "productivity", "slides", "https://twistly.ai", "mix", false, {
  ko: ["파워포인트 안에서 쓰는 AI 추가 기능",["파워포인트를 떠나지 않고 슬라이드 생성","기존 문서·영상 내용을 슬라이드로"],["윈도우용 파워포인트 중심으로 지원"],["PPT 작업 중 빈 슬라이드 채우기","영상 강의 내용을 슬라이드로 정리"]],
  en: ["An AI add-in that works inside PowerPoint",["Generate slides without leaving PowerPoint","Turn documents or videos into slides"],["Mainly supports PowerPoint on Windows"],["Fill empty slides while you work","Turn a video lecture into slides"]],
  ja: ["PowerPointの中で使うAIアドイン",["PowerPointから離れずにスライドを生成","既存の文書や動画の内容をスライドに"],["主にWindows版PowerPointに対応"],["作業中の空白スライドを埋める","動画講義の内容をスライドに整理"]],
  zh: ["在PowerPoint中使用的AI插件",["不离开PowerPoint即可生成幻灯片","把现有文档或视频内容做成幻灯片"],["主要支持Windows版PowerPoint"],["工作中填充空白幻灯片","把视频课程整理成幻灯片"]]
}, [["@free","$0"],["@paid",null]]);
S("Tosea AI", "productivity", "slides", "https://tosea.ai", "mix", false, {
  ko: ["출처와 근거를 꼼꼼히 담은 전문 발표 자료를 만드는 도구",["자료와 근거를 많이 담아야 하는 발표에 적합","출처를 슬라이드에 함께 표시"],["가볍고 화려한 발표에는 맞지 않을 수 있음"],["연구 결과 발표","근거 중심의 정책 제안 자료"]],
  en: ["Builds professional, evidence-heavy decks with sources",["Suits talks that need lots of data and evidence","Shows sources on the slides"],["Less suited to light, flashy presentations"],["Present research results","An evidence-based policy proposal"]],
  ja: ["出典と根拠をしっかり盛り込んだ専門的な発表資料を作るツール",["資料や根拠を多く盛り込む発表に向く","出典をスライドに一緒に表示"],["軽くて華やかな発表には向かないことも"],["研究結果の発表","根拠中心の政策提案資料"]],
  zh: ["制作出处和依据详实的专业演示文稿的工具",["适合需要大量资料和依据的演讲","在幻灯片上同时标注出处"],["不太适合轻松花哨的演示"],["研究成果汇报","以依据为中心的政策提案"]]
}, [["@free","$0"],["@paid",null]]);
S("Prezent", "productivity", "slides", "https://prezent.ai", "paid", false, {
  ko: ["기업 브랜드 규칙에 맞춰 발표 자료를 만드는 기업용 AI",["회사 브랜드 가이드를 자동으로 적용","대기업 커뮤니케이션 팀에 맞춘 기능"],["개인보다는 기업 계약 중심"],["전사 발표 자료 표준화","임원 보고 자료 제작"]],
  en: ["Enterprise AI that builds decks to your brand rules",["Applies the company brand guide automatically","Features built for corporate comms teams"],["Aimed at company contracts rather than individuals"],["Standardize company-wide decks","Executive briefing slides"]],
  ja: ["企業のブランドルールに合わせて発表資料を作る企業向けAI",["会社のブランドガイドを自動で適用","大企業のコミュニケーションチーム向け機能"],["個人より企業契約が中心"],["全社の発表資料を標準化","役員向け報告資料の作成"]],
  zh: ["按企业品牌规范制作演示文稿的企业级AI",["自动套用公司品牌指南","为大企业传播团队设计的功能"],["以企业签约为主，不面向个人"],["统一全公司演示文稿","制作高管汇报材料"]]
}, [["@ent","quote"]]);

/* ---------- 문서·업무 생산성 › 문서·노트·지식 관리 ---------- */
S("Notion AI", "productivity", "docs", "https://notion.com/product/ai", "paid", true, {
  ko: ["노션 안에서 글쓰기, 요약, 워크스페이스 전체 검색을 돕는 AI",["내 노션 페이지 전체를 근거로 질문에 답함","회의 기록과 문서 정리를 한곳에서"],["AI 기능은 비즈니스 이상 요금제에서 제공"],["팀 위키에서 필요한 정보 바로 찾기","회의 메모를 할 일 목록으로 정리"]],
  en: ["AI inside Notion for writing, summaries and searching your workspace",["Answers questions from across your Notion pages","Meeting notes and docs organized in one place"],["AI features come with Business plans and above"],["Find information in the team wiki instantly","Turn meeting notes into a to-do list"]],
  ja: ["Notionの中で文章作成、要約、ワークスペース全体の検索を手伝うAI",["自分のNotionページ全体を根拠に質問に答える","会議記録と文書整理を一か所で"],["AI機能はビジネス以上のプランで提供"],["チームWikiから必要な情報をすぐ探す","会議メモをToDoリストに整理"]],
  zh: ["在Notion中帮助写作、总结和搜索整个工作区的AI",["根据你所有Notion页面回答问题","会议记录和文档整理一站完成"],["AI功能在商业版及以上方案中提供"],["在团队知识库中快速找到信息","把会议笔记整理成待办清单"]]
}, [["@free","$0"],["Plus","$10","user"],["Business (AI)","$20","user"],["@ent","quote"]]);
S("Copilot in Word", "productivity", "docs", "https://microsoft.com/microsoft-365/copilot", "paid", true, {
  ko: ["워드에서 초안 작성, 요약, 문장 재구성을 돕는 마이크로소프트 AI",["회사 문서 양식 그대로 작업","다른 파일을 참고해 초안 작성"],["Microsoft 365 Copilot 유료 구독이 필요함"],["긴 계약서·보고서 요약","회의록 파일을 참고해 보고서 초안"]],
  en: ["Microsoft AI in Word for drafting, summarizing and rewriting",["Works within your company's document templates","Drafts using other files as reference"],["Needs a paid Microsoft 365 Copilot plan"],["Summarize a long contract or report","Draft a report from meeting notes files"]],
  ja: ["Wordで下書き、要約、文章の再構成を手伝うMicrosoftのAI",["会社の文書書式のまま作業","ほかのファイルを参考に下書き"],["Microsoft 365 Copilotの有料契約が必要"],["長い契約書や報告書を要約","議事録ファイルを参考に報告書の下書き"]],
  zh: ["在Word中帮助起草、总结和改写的微软AI",["沿用公司文档模板工作","参考其他文件起草"],["需要付费订阅Microsoft 365 Copilot"],["总结冗长的合同或报告","参考会议记录文件起草报告"]]
}, [["Microsoft 365 Personal","$9.99","mo"],["Microsoft 365 Premium","$19.99","mo"],["Microsoft 365 Copilot","$30","user"]]);
S("Gemini in Google Docs", "productivity", "docs", "https://workspace.google.com", "paid", true, {
  ko: ["구글 문서에서 초안 작성, 교정, 요약을 돕는 제미나이",["드라이브·지메일 내용을 참고해 작성","공동 편집 중에도 바로 사용"],["AI 포함 Google Workspace 요금제가 필요함"],["공동 과제 보고서 초안","긴 문서 핵심 요약"]],
  en: ["Gemini in Google Docs for drafting, editing and summarizing",["Writes with Drive and Gmail as reference","Works right in the middle of co-editing"],["Needs a Google Workspace plan that includes AI"],["Draft a group project report","Summarize a long document"]],
  ja: ["Googleドキュメントで下書き、校正、要約を手伝うGemini",["ドライブやGmailの内容を参考に作成","共同編集中でもすぐ使える"],["AI込みのGoogle Workspaceプランが必要"],["グループ課題レポートの下書き","長い文書の要点を要約"]],
  zh: ["在谷歌文档中帮助起草、校对和总结的Gemini",["参考云端硬盘和Gmail内容撰写","协作编辑时也能直接使用"],["需要包含AI的Google Workspace方案"],["起草小组作业报告","总结长文档要点"]]
}, [["Workspace Business Standard","$14","user"],["Workspace Business Plus","$22","user"]]);
S("릴리스AI (Lilys AI)", "productivity", "docs", "https://lilys.ai", "mix", true, {
  ko: ["유튜브·PDF·녹음을 한국어 요약 노트로 정리해주는 국산 서비스",["긴 영상도 시간대별 요약과 함께 정리","한국어 요약 품질이 자연스러움"],["무료 버전은 월 요약 횟수가 제한됨"],["강의 영상 핵심 노트 만들기","긴 PDF 보고서 요약"]],
  en: ["A Korean service that turns YouTube, PDFs and recordings into summary notes",["Summarizes long videos with timestamps","Natural-sounding Korean summaries"],["The free plan limits monthly summaries"],["Make study notes from a lecture video","Summarize a long PDF report"]],
  ja: ["YouTube、PDF、録音を要約ノートにまとめる韓国製サービス",["長い動画も時間ごとの要約付きで整理","韓国語の要約品質が自然"],["無料版は月の要約回数に制限"],["講義動画の要点ノートづくり","長いPDF報告書の要約"]],
  zh: ["把YouTube、PDF和录音整理成摘要笔记的韩国服务",["长视频也能按时间段总结","韩语摘要自然流畅"],["免费版每月总结次数有限"],["把课程视频做成重点笔记","总结长篇PDF报告"]]
}, [["@free","$0"],["@paid",null]]);
S("한컴어시스턴트", "productivity", "docs", "https://hancom.com", "paid", false, {
  ko: ["사내 규정·자료와 연계해 한글(HWP) 문서 작성을 돕는 기업용 AI",["공공기관·기업의 한글 문서 업무에 맞춤","내부 규정과 매뉴얼을 근거로 작성"],["개인용이 아닌 기관·기업 도입 방식"],["공문·보고서 초안 작성","사내 규정 찾아 문서에 반영"]],
  en: ["Enterprise AI that helps write Hangul (HWP) documents using internal rules",["Tailored to HWP document work in public and private organizations","Drafts based on internal rules and manuals"],["Deployed by organizations, not sold to individuals"],["Draft official letters and reports","Find internal rules and apply them in documents"]],
  ja: ["社内規定や資料と連携してハングル(HWP)文書の作成を手伝う企業向けAI",["公共機関や企業のハングル文書業務向け","内部規定やマニュアルを根拠に作成"],["個人向けではなく機関・企業での導入"],["公文書や報告書の下書き","社内規定を探して文書に反映"]],
  zh: ["结合内部规章资料、协助撰写韩文(HWP)文档的企业AI",["专为公共机构和企业的韩文文档工作设计","依据内部规章和手册撰写"],["面向机构和企业部署，不面向个人"],["起草公文和报告","查找内部规章并写入文档"]]
}, [["@ent","quote"]]);
S("Adobe Acrobat AI 어시스턴트", "productivity", "docs", "https://adobe.com/acrobat/generative-ai-pdf.html", "paid", false, {
  ko: ["PDF를 요약하고 질문에 답하는 어도비 아크로뱃의 AI",["답마다 PDF 원문 위치를 표시","여러 PDF를 비교해 차이 정리"],["별도 유료 추가 기능"],["계약서 핵심 조항 확인","여러 견적서 PDF 비교"]],
  en: ["Adobe Acrobat's AI that summarizes PDFs and answers questions",["Points to the exact place in the PDF for each answer","Compares several PDFs and lists differences"],["A separate paid add-on"],["Check key clauses in a contract","Compare several quote PDFs"]],
  ja: ["PDFを要約し、質問に答えるAdobe AcrobatのAI",["回答ごとにPDF原文の位置を表示","複数のPDFを比較して違いを整理"],["別料金の有料アドオン"],["契約書の重要条項を確認","複数の見積書PDFを比較"]],
  zh: ["总结PDF并回答问题的Adobe Acrobat AI",["每个回答都标注PDF原文位置","比较多份PDF并整理差异"],["需单独付费的附加功能"],["确认合同关键条款","比较多份报价单PDF"]]
}, [["AI Assistant","$4.99","mo"]]);
S("ChatPDF", "productivity", "docs", "https://chatpdf.com", "mix", false, {
  ko: ["PDF를 올리고 대화하듯 질문하는 간단한 문서 AI",["가입만 하면 바로 쓰는 단순함","답에 해당 페이지를 함께 표시"],["무료 버전은 하루 질문 수와 파일 크기 제한"],["논문 PDF에 궁금한 점 질문","제품 설명서에서 필요한 부분 찾기"]],
  en: ["Upload a PDF and ask it questions like a chat",["Simple to start right away","Shows the page for each answer"],["The free plan limits daily questions and file size"],["Ask questions about a paper PDF","Find what you need in a manual"]],
  ja: ["PDFをアップして会話するように質問できるシンプルな文書AI",["登録すればすぐ使えるシンプルさ","回答に該当ページを表示"],["無料版は1日の質問数とファイルサイズに制限"],["論文PDFに疑問点を質問","製品マニュアルから必要な部分を探す"]],
  zh: ["上传PDF后像聊天一样提问的简易文档AI",["注册即可直接使用，非常简单","回答时标出对应页码"],["免费版限制每日提问数和文件大小"],["就论文PDF提问","在产品说明书中查找所需内容"]]
}, [["@free","$0"],["Plus",null]]);
S("Coda AI", "productivity", "docs", "https://coda.io", "mix", false, {
  ko: ["문서, 표, 자동화를 합친 올인원 문서 도구의 AI",["문서 안 표 데이터를 AI가 정리·분류","팀 업무 흐름을 문서 하나로 관리"],["기능이 많아 처음 익히는 데 시간이 걸림"],["팀 프로젝트 관리 문서","설문 응답 자동 분류"]],
  en: ["AI in Coda, an all-in-one doc with tables and automation",["AI sorts and categorizes table data in your docs","Run a team workflow from a single doc"],["Lots of features take time to learn"],["A team project tracker doc","Auto-categorize survey responses"]],
  ja: ["文書・表・自動化を一つにしたオールインワン文書ツールのAI",["文書内の表データをAIが整理・分類","チームの業務フローを一つの文書で管理"],["機能が多く覚えるまで時間がかかる"],["チームのプロジェクト管理文書","アンケート回答の自動分類"]],
  zh: ["集文档、表格、自动化于一体的Coda中的AI",["AI整理和分类文档中的表格数据","用一个文档管理团队工作流程"],["功能多，上手需要时间"],["团队项目管理文档","自动分类问卷回答"]]
}, [["@free","$0"],["Pro","$10","user"],["Team","$30","user"]]);
S("Confluence (Atlassian Rovo)", "productivity", "docs", "https://atlassian.com/software/rovo", "paid", false, {
  ko: ["컨플루언스·지라 등 아틀라시안 도구에서 문서 작성과 검색을 돕는 AI",["사내 위키와 업무 티켓을 함께 검색","회의록·문서 초안 작성"],["아틀라시안 유료 플랜 사용 조직 중심"],["사내 위키에서 과거 결정 찾기","프로젝트 회고 문서 초안"]],
  en: ["AI for writing and searching across Atlassian tools like Confluence and Jira",["Searches the wiki and work tickets together","Drafts meeting notes and docs"],["Mainly for organizations on paid Atlassian plans"],["Find past decisions in the company wiki","Draft a project retrospective"]],
  ja: ["ConfluenceやJiraなどAtlassianツールで文書作成と検索を手伝うAI",["社内Wikiと業務チケットをまとめて検索","議事録や文書の下書き"],["Atlassianの有料プランを使う組織向け"],["社内Wikiで過去の決定を探す","プロジェクト振り返り文書の下書き"]],
  zh: ["在Confluence、Jira等Atlassian工具中协助写作和搜索的AI",["同时搜索内部知识库和工作工单","起草会议记录和文档"],["主要面向使用Atlassian付费方案的组织"],["在内部知识库中查找过往决定","起草项目复盘文档"]]
}, [["Atlassian Cloud","incl"]]);
S("Craft", "productivity", "docs", "https://craft.do", "mix", false, {
  ko: ["깔끔한 디자인의 문서·노트 앱에 들어간 AI 작성 도우미",["보기 좋은 문서를 쉽게 만들 수 있음","애플 기기에서 특히 매끄러움"],["AI 사용량은 요금제에 따라 다름"],["개인 지식 노트 정리","웹페이지로 공유할 문서 작성"]],
  en: ["An AI writing helper inside a beautifully designed docs and notes app",["Makes good-looking documents easily","Especially smooth on Apple devices"],["AI usage depends on your plan"],["Organize personal knowledge notes","Write a doc to share as a web page"]],
  ja: ["洗練されたデザインの文書・ノートアプリに入ったAI作成アシスタント",["見栄えのよい文書を簡単に作れる","Apple端末で特に快適"],["AIの利用量はプランによって異なる"],["個人のナレッジノート整理","Webページとして共有する文書作成"]],
  zh: ["设计精美的文档笔记应用中的AI写作助手",["轻松做出美观的文档","在苹果设备上尤其流畅"],["AI用量因方案而异"],["整理个人知识笔记","撰写以网页分享的文档"]]
}, [["@free","$0"],["@paid",null]]);
S("Mem", "productivity", "docs", "https://mem.ai", "mix", false, {
  ko: ["메모를 자동으로 정리하고 서로 연결해주는 AI 노트",["폴더 정리 없이 AI가 관련 메모를 찾아 줌","메모 내용으로 질문에 답함"],["다른 노트 앱에서 옮겨오기가 번거로울 수 있음"],["아이디어 메모 모아 보기","지난 미팅 메모 빠르게 찾기"]],
  en: ["An AI notes app that organizes and links your notes automatically",["No folders needed; AI surfaces related notes","Answers questions from your notes"],["Moving in from other note apps can be tedious"],["Collect idea notes in one place","Find notes from past meetings fast"]],
  ja: ["メモを自動で整理し、互いにつなげてくれるAIノート",["フォルダ整理なしでAIが関連メモを探す","メモの内容をもとに質問に答える"],["ほかのノートアプリからの移行が面倒なことも"],["アイデアメモをまとめて見る","過去の打ち合わせメモを素早く探す"]],
  zh: ["自动整理并关联笔记的AI笔记应用",["无需建文件夹，AI自动找出相关笔记","根据笔记内容回答问题"],["从其他笔记应用迁移可能较麻烦"],["汇总灵感笔记","快速找到以往会议笔记"]]
}, [["@free","$0"],["@paid",null]]);
S("Tana", "productivity", "docs", "https://tana.inc", "mix", false, {
  ko: ["노트를 구조화된 데이터처럼 정리하고 AI로 다루는 지식 관리 도구",["메모에 태그·필드를 붙여 데이터베이스처럼 활용","음성 메모를 정리된 노트로 변환"],["개념이 독특해 익숙해지는 데 시간이 걸림"],["연구·독서 노트 체계적으로 관리","회의 메모에서 할 일 자동 추출"]],
  en: ["A knowledge tool that structures notes like data and works with AI",["Add tags and fields to use notes like a database","Turns voice memos into organized notes"],["Unique concepts take time to get used to"],["Manage research and reading notes systematically","Pull to-dos from meeting notes automatically"]],
  ja: ["ノートを構造化データのように整理し、AIで扱うナレッジ管理ツール",["メモにタグや項目を付けてデータベースのように活用","音声メモを整理されたノートに変換"],["独特な考え方なので慣れるまで時間がかかる"],["研究や読書ノートを体系的に管理","会議メモからタスクを自動抽出"]],
  zh: ["把笔记像结构化数据一样整理并用AI处理的知识管理工具",["给笔记加标签和字段，像数据库一样使用","把语音备忘录转成整理好的笔记"],["概念独特，需要时间适应"],["系统管理研究和读书笔记","从会议笔记中自动提取待办"]]
}, [["@free","$0"],["@paid",null]]);
S("Microsoft Loop", "productivity", "docs", "https://loop.cloud.microsoft", "mix", false, {
  ko: ["팀이 함께 쓰는 협업 페이지에서 Copilot을 활용하는 마이크로소프트 도구",["팀즈·아웃룩 안에서도 같은 내용을 실시간 공유","Copilot으로 페이지 내용 요약·작성"],["Copilot 기능은 유료 구독이 필요함"],["팀 프로젝트 계획 페이지","회의 안건을 팀즈 채팅에 공유"]],
  en: ["Microsoft's collaborative pages for teams, with Copilot built in",["The same content stays live inside Teams and Outlook","Copilot summarizes and writes page content"],["Copilot features need a paid plan"],["A team project planning page","Share a meeting agenda in a Teams chat"]],
  ja: ["チームで使うコラボページでCopilotを活用するMicrosoftのツール",["TeamsやOutlookの中でも同じ内容をリアルタイム共有","Copilotでページ内容を要約・作成"],["Copilot機能は有料契約が必要"],["チームプロジェクトの計画ページ","会議の議題をTeamsチャットで共有"]],
  zh: ["团队协作页面中可使用Copilot的微软工具",["在Teams和Outlook中也能实时共享同一内容","用Copilot总结和撰写页面内容"],["Copilot功能需要付费订阅"],["团队项目规划页面","在Teams聊天中共享会议议程"]]
}, [["@free","$0"],["Microsoft 365 Copilot","$30","user"]]);
S("Dropbox Dash", "productivity", "docs", "https://dash.dropbox.com", "paid", false, {
  ko: ["여러 업무 앱에 흩어진 파일을 한 번에 찾고 요약하는 AI 검색",["드라이브, 메일, 협업 앱을 한곳에서 검색","찾은 문서 내용을 바로 요약"],["팀·기업 요금제 중심"],["어디 저장했는지 모르는 파일 찾기","프로젝트 관련 자료 한 번에 모으기"]],
  en: ["AI search that finds and summarizes files scattered across work apps",["Search drives, email and collaboration apps in one place","Summarizes the documents it finds"],["Mainly team and business plans"],["Find a file you can't remember saving","Gather all materials for a project"]],
  ja: ["複数の業務アプリに散らばったファイルをまとめて探し、要約するAI検索",["ドライブ、メール、コラボアプリを一か所で検索","見つけた文書の内容をすぐ要約"],["チーム・企業向けプラン中心"],["どこに保存したかわからないファイル探し","プロジェクト関連資料を一度に集める"]],
  zh: ["一次找到并总结分散在各办公应用中文件的AI搜索",["在一个地方搜索网盘、邮件和协作应用","直接总结找到的文档"],["以团队和企业方案为主"],["找到忘了存在哪里的文件","一次汇集项目相关资料"]]
}, [["@paid",null]]);
S("Box AI", "productivity", "docs", "https://box.com/ai", "paid", false, {
  ko: ["클라우드 저장소 박스에 있는 문서를 요약하고 질문에 답하는 AI",["기업 보안 정책 안에서 문서 AI 활용","여러 문서를 함께 분석"],["박스를 쓰는 기업 고객 대상"],["계약서 묶음에서 조건 비교","사내 정책 문서 질문하기"]],
  en: ["AI that summarizes and answers questions about documents stored in Box",["Document AI within enterprise security policies","Analyzes several documents together"],["For businesses that use Box"],["Compare terms across a set of contracts","Ask questions about company policies"]],
  ja: ["クラウドストレージBoxにある文書を要約し、質問に答えるAI",["企業のセキュリティポリシーの範囲で文書AIを活用","複数の文書をまとめて分析"],["Boxを使う企業向け"],["契約書のまとまりから条件を比較","社内規程について質問"]],
  zh: ["总结Box云存储中的文档并回答问题的AI",["在企业安全策略范围内使用文档AI","可同时分析多份文档"],["面向使用Box的企业客户"],["比较一批合同中的条款","就公司政策文件提问"]]
}, [["Box Business",null]]);

/* ---------- 문서·업무 생산성 › 회의록·음성 기록 ---------- */
S("클로바노트", "productivity", "meeting", "https://clovanote.naver.com", "mix", true, {
  ko: ["한국어 인식이 정확하고 화자 구분·요약까지 해주는 네이버 음성 기록 앱",["한국어 받아쓰기 정확도가 높음","무료로 매달 넉넉한 시간 사용"],["AI 요약은 무료 횟수가 제한됨"],["수업 녹음을 텍스트로 정리","팀 회의록 자동 작성"]],
  en: ["Naver's recording app with accurate Korean transcription, speakers and summaries",["Highly accurate Korean transcription","Generous free minutes every month"],["AI summaries have a limited free count"],["Turn a class recording into text","Write team meeting notes automatically"]],
  ja: ["韓国語認識が正確で、話者の区別や要約までしてくれるNAVERの音声記録アプリ",["韓国語の文字起こし精度が高い","毎月たっぷりの時間を無料で使える"],["AI要約は無料回数に制限"],["授業の録音をテキストに整理","チームの議事録を自動作成"]],
  zh: ["韩语识别准确、可区分说话人并总结的NAVER录音应用",["韩语转写准确率高","每月有充足的免费时长"],["AI总结的免费次数有限"],["把课堂录音整理成文字","自动生成团队会议记录"]]
}, [["@free","$0"],["@paid",null]]);
S("다글로", "productivity", "meeting", "https://daglo.ai", "mix", true, {
  ko: ["음성·영상을 받아쓰고 요약하는 국산 AI 기록 서비스",["유료 전환 시 변환 시간 무제한","유튜브 링크만으로 받아쓰기"],["무료 사용량이 적은 편"],["인터뷰 녹음 전체 받아쓰기","유튜브 강의 텍스트로 정리"]],
  en: ["A Korean AI service that transcribes and summarizes audio and video",["Unlimited transcription on paid plans","Transcribe from just a YouTube link"],["Small free allowance"],["Transcribe a full interview recording","Turn a YouTube lecture into text"]],
  ja: ["音声や動画を文字起こしして要約する韓国製AI記録サービス",["有料にすると変換時間が無制限","YouTubeのリンクだけで文字起こし"],["無料枠は少なめ"],["インタビュー録音をすべて文字起こし","YouTube講義をテキストに整理"]],
  zh: ["转写并总结音视频的韩国AI记录服务",["付费后转写时长不限","只需YouTube链接即可转写"],["免费额度偏少"],["转写完整的采访录音","把YouTube课程整理成文字"]]
}, [["@free","$0"],["Pro","₩11,900","mo"]]);
S("Otter.ai", "productivity", "meeting", "https://otter.ai", "mix", true, {
  ko: ["줌·구글 미트·팀즈 회의를 실시간으로 받아쓰는 회의 AI",["회의에 자동 참석해 실시간 기록","회의 내용 검색과 요약이 편리"],["영어 중심이라 한국어 인식은 약함"],["영어 화상회의 기록","해외 웨비나 내용 정리"]],
  en: ["Meeting AI that transcribes Zoom, Google Meet and Teams calls live",["Joins meetings automatically and transcribes live","Easy search and summaries of past meetings"],["English-focused; weaker for other languages"],["Record English video meetings","Summarize an overseas webinar"]],
  ja: ["Zoom・Google Meet・Teamsの会議をリアルタイムで文字起こしする会議AI",["会議に自動参加してリアルタイム記録","会議内容の検索と要約が便利"],["英語中心で日本語の認識は弱い"],["英語のビデオ会議の記録","海外ウェビナーの内容整理"]],
  zh: ["实时转写Zoom、Google Meet、Teams会议的会议AI",["自动加入会议并实时记录","会议内容搜索和总结方便"],["以英语为主，中文识别较弱"],["记录英语视频会议","整理海外网络研讨会内容"]]
}, [["@free","$0"],["Pro","$16.99","mo"],["Business","$30","user"]]);
S("Fathom", "productivity", "meeting", "https://fathom.video", "mix", true, {
  ko: ["무료로 녹화·받아쓰기를 무제한 제공하는 화상회의 AI 노트",["무료 플랜에서도 녹화·받아쓰기 무제한","회의 직후 요약과 할 일 정리"],["고급 AI 요약은 무료에서 제한적"],["고객 미팅 기록 남기기","팀 회의 요약 공유"]],
  en: ["Video meeting AI notes with unlimited free recording and transcription",["Unlimited recording and transcription even on the free plan","Summary and action items right after the call"],["Advanced AI summaries are limited on free"],["Keep records of client meetings","Share team meeting summaries"]],
  ja: ["録画と文字起こしを無料で無制限に使えるビデオ会議AIノート",["無料プランでも録画・文字起こしが無制限","会議直後に要約とタスクを整理"],["高度なAI要約は無料では限定的"],["顧客との打ち合わせ記録","チーム会議の要約を共有"]],
  zh: ["免费提供无限录制和转写的视频会议AI笔记",["免费方案也能无限录制和转写","会后立即总结并整理待办"],["高级AI总结在免费版受限"],["留存客户会议记录","分享团队会议总结"]]
}, [["@free","$0"],["Team","$15","user"]]);
S("티로 (Tiro)", "productivity", "meeting", "https://tiro.ooo", "mix", false, {
  ko: ["회의하는 동안 실시간으로 기록을 확인하는 국산 AI 회의록",["회의 중에 바로 텍스트로 확인","한국어 회의에 맞춘 요약"],["무료 체험 시간이 짧음"],["회의 중 놓친 말 바로 확인","회의 끝나자마자 회의록 공유"]],
  en: ["A Korean AI meeting-notes tool you can read live during the meeting",["See the transcript during the meeting","Summaries tuned to Korean meetings"],["Short free trial time"],["Catch something you missed mid-meeting","Share notes the moment a meeting ends"]],
  ja: ["会議中にリアルタイムで記録を確認できる韓国製AI議事録",["会議中にすぐテキストで確認","韓国語の会議に合わせた要約"],["無料体験の時間が短い"],["会議中に聞き逃した発言をすぐ確認","会議終了直後に議事録を共有"]],
  zh: ["开会时可实时查看记录的韩国AI会议记录工具",["会议中即可看到文字","针对韩语会议的总结"],["免费试用时长短"],["会议中立即确认没听清的话","会议一结束就分享记录"]]
}, [["@free","$0"],["@paid",null]]);
S("에이닷 노트", "productivity", "meeting", "https://adot.ai", "free", false, {
  ko: ["통화 녹음과 연결되는 SK텔레콤의 무료 기록·요약 서비스",["통화 내용을 자동으로 받아쓰고 요약","무료로 사용 가능"],["일부 기능은 통신사·기기에 따라 다름"],["업무 통화 내용 다시 확인","통화 중 약속한 일정 정리"]],
  en: ["SK Telecom's free note and summary service tied to call recordings",["Transcribes and summarizes calls automatically","Free to use"],["Some features depend on carrier and device"],["Review what was said on a work call","Note plans agreed on a call"]],
  ja: ["通話録音とつながるSKテレコムの無料記録・要約サービス",["通話内容を自動で文字起こしして要約","無料で使える"],["一部の機能は通信会社や端末によって異なる"],["仕事の通話内容を見返す","通話中に約束した予定を整理"]],
  zh: ["与通话录音相连的SK电讯免费记录与总结服务",["自动转写并总结通话内容","可免费使用"],["部分功能因运营商和设备而异"],["回看工作通话内容","整理通话中约定的日程"]]
}, [["@free","$0"]]);
S("Fireflies.ai", "productivity", "meeting", "https://fireflies.ai", "mix", false, {
  ko: ["회의를 자동 녹음하고 CRM 등 업무 앱으로 내용을 보내는 회의 AI",["회의가 많은 팀에 맞춘 대량 처리","세일즈·업무 앱과 연동이 많음"],["무료 버전은 AI 요약과 저장 용량이 제한됨"],["영업 미팅 내용을 CRM에 자동 기록","주간 회의 주제별 검색"]],
  en: ["Meeting AI that records calls and sends notes to CRMs and work apps",["Built for teams with lots of meetings","Many integrations with sales and work apps"],["The free plan limits AI summaries and storage"],["Log sales calls into the CRM automatically","Search weekly meetings by topic"]],
  ja: ["会議を自動録音し、CRMなど業務アプリに内容を送る会議AI",["会議が多いチーム向けの大量処理","営業・業務アプリとの連携が多い"],["無料版はAI要約と保存容量に制限"],["営業の打ち合わせ内容をCRMに自動記録","週次会議をテーマ別に検索"]],
  zh: ["自动录制会议并把内容发送到CRM等办公应用的会议AI",["为会议多的团队设计的大批量处理","与销售和办公应用集成多"],["免费版限制AI总结和存储空间"],["把销售会议内容自动记录到CRM","按主题搜索每周会议"]]
}, [["@free","$0"],["Pro","$10","user"],["Business","$19","user"]]);
S("Granola", "productivity", "meeting", "https://granola.ai", "mix", false, {
  ko: ["회의 봇 없이 내 기기에서 녹음해 내 메모와 합쳐 회의록을 만드는 앱",["회의방에 봇이 들어가지 않아 부담이 적음","내가 적은 메모를 바탕으로 정리"],["무료 버전은 지난 기록 보관 기간이 짧음"],["봇 참석이 어려운 외부 미팅 기록","내 메모를 깔끔한 회의록으로"]],
  en: ["Records from your device, no bot, and merges it with your notes",["No bot joins the call, so it feels less intrusive","Builds notes around what you typed"],["The free plan keeps a short history"],["Record external meetings where bots aren't welcome","Turn rough notes into clean minutes"]],
  ja: ["会議ボットなしで自分の端末で録音し、メモと合わせて議事録を作るアプリ",["会議室にボットが入らないので気兼ねが少ない","自分が書いたメモをもとに整理"],["無料版は過去記録の保存期間が短い"],["ボット参加が難しい社外会議の記録","自分のメモをきれいな議事録に"]],
  zh: ["无需会议机器人、在本机录音并结合你的笔记生成纪要的应用",["没有机器人进入会议，压力小","以你写的笔记为基础整理"],["免费版历史记录保存时间短"],["记录不便让机器人参加的外部会议","把随手笔记变成整洁纪要"]]
}, [["@free","$0"],["Business","$14","user"]]);
S("tl;dv", "productivity", "meeting", "https://tldv.io", "mix", false, {
  ko: ["화상회의를 녹화하고 중요한 순간을 하이라이트로 남기는 도구",["중요 장면에 표시해 영상 클립으로 공유","여러 언어 회의 받아쓰기"],["고급 요약과 연동은 유료"],["회의 핵심 장면만 팀에 공유","고객 인터뷰 하이라이트 모음"]],
  en: ["Records video meetings and saves the key moments as highlights",["Mark moments and share them as clips","Transcribes meetings in many languages"],["Advanced summaries and integrations are paid"],["Share only the key moments with your team","Collect highlights from customer interviews"]],
  ja: ["ビデオ会議を録画し、重要な場面をハイライトとして残すツール",["重要な場面に印を付けて動画クリップで共有","多言語の会議を文字起こし"],["高度な要約と連携は有料"],["会議の要点シーンだけをチームに共有","顧客インタビューのハイライト集"]],
  zh: ["录制视频会议并把重要时刻保存为精彩片段的工具",["标记重要片段并以视频剪辑分享","支持多语言会议转写"],["高级总结和集成收费"],["只把会议要点片段分享给团队","汇总客户访谈精彩片段"]]
}, [["@free","$0"],["Pro",null]]);
S("Fellow", "productivity", "meeting", "https://fellow.app", "mix", false, {
  ko: ["회의 안건 준비부터 AI 회의록, 후속 할 일까지 관리하는 도구",["안건·기록·할 일을 한 흐름으로 관리","반복 회의 템플릿 제공"],["무료 버전의 AI 기록 횟수가 매우 적음"],["주간 1:1 미팅 관리","회의 후 할 일 담당자 배정"]],
  en: ["Manages meetings from agenda prep to AI notes and follow-ups",["Agenda, notes and action items in one flow","Templates for recurring meetings"],["Very few AI notes on the free plan"],["Run weekly one-on-ones","Assign owners to follow-up tasks"]],
  ja: ["会議の議題準備からAI議事録、フォローアップまで管理するツール",["議題・記録・タスクを一つの流れで管理","定例会議のテンプレートを提供"],["無料版はAI記録の回数がとても少ない"],["毎週の1on1の管理","会議後のタスクに担当者を割り当て"]],
  zh: ["从准备议程到AI纪要和后续待办全程管理会议的工具",["议程、记录、待办一条线管理","提供例会模板"],["免费版AI记录次数很少"],["管理每周一对一会议","会后为待办指定负责人"]]
}, [["@free","$0"],["Team","$7","user"]]);
S("Notta", "productivity", "meeting", "https://notta.ai", "mix", false, {
  ko: ["두 언어가 섞인 회의도 받아쓰고 번역하는 기록 도구",["2개 언어 동시 받아쓰기와 번역","한국어 포함 다양한 언어 지원"],["무료 버전은 1회 녹음 시간이 매우 짧음"],["외국인과 함께한 회의 기록","해외 강의 받아쓰기와 번역"]],
  en: ["Transcribes and translates meetings that mix two languages",["Bilingual transcription and translation at once","Supports many languages including Korean"],["Very short recordings on the free plan"],["Record a meeting with international colleagues","Transcribe and translate a foreign lecture"]],
  ja: ["2つの言語が混ざった会議も文字起こしして翻訳する記録ツール",["2言語の同時文字起こしと翻訳","日本語を含む多くの言語に対応"],["無料版は1回の録音時間がとても短い"],["外国人との会議の記録","海外講義の文字起こしと翻訳"]],
  zh: ["连夹杂两种语言的会议也能转写并翻译的记录工具",["双语同时转写和翻译","支持包括中文在内的多种语言"],["免费版单次录音时间很短"],["记录与外国同事的会议","转写并翻译海外课程"]]
}, [["@free","$0"],["Pro","$8.17","mo"]]);
S("Read AI", "productivity", "meeting", "https://read.ai", "mix", false, {
  ko: ["회의 요약에 참여도와 분위기 분석까지 더한 회의 AI",["발언 비율·참여도 등 회의 분석 제공","메일·메시지까지 함께 요약"],["분석 기능은 참석자 동의 문제를 신경 써야 함"],["회의 진행 방식 개선","놓친 회의 요약 받아 보기"]],
  en: ["Meeting AI that adds engagement and sentiment analysis to summaries",["Analyzes talk time and engagement","Summarizes email and messages too"],["Analysis features require care with attendee consent"],["Improve how you run meetings","Get a recap of a meeting you missed"]],
  ja: ["会議の要約に参加度や雰囲気の分析まで加えた会議AI",["発言比率や参加度などの会議分析","メールやメッセージもまとめて要約"],["分析機能は参加者の同意に配慮が必要"],["会議の進め方を改善","参加できなかった会議の要約を受け取る"]],
  zh: ["在会议总结中加入参与度和氛围分析的会议AI",["提供发言比例、参与度等会议分析","还能总结邮件和消息"],["分析功能需注意参会者同意问题"],["改进会议主持方式","获取错过会议的摘要"]]
}, [["@free","$0"],["Pro",null]]);
S("jamie", "productivity", "meeting", "https://meetjamie.ai", "mix", false, {
  ko: ["봇 없이 회의록을 만들고 대면 회의도 기록하는 도구",["온라인·오프라인 회의 모두 기록","회의에 봇이 참석하지 않음"],["무료 사용 횟수가 적음"],["사무실 대면 회의 기록","외부 파트너 미팅 회의록"]],
  en: ["Makes meeting notes with no bot, including in-person meetings",["Works for online and in-person meetings","No bot joins the meeting"],["Few free uses"],["Record an in-office meeting","Notes for a meeting with an outside partner"]],
  ja: ["ボットなしで議事録を作り、対面会議も記録できるツール",["オンラインとオフラインの会議どちらも記録","会議にボットが参加しない"],["無料の利用回数が少ない"],["オフィスでの対面会議の記録","社外パートナーとの会議の議事録"]],
  zh: ["无需机器人生成会议纪要，线下会议也能记录的工具",["线上线下会议都能记录","不会有机器人加入会议"],["免费次数少"],["记录办公室线下会议","与外部合作方会议的纪要"]]
}, [["@free","$0"],["@paid",null]]);
S("Zoom AI Companion", "productivity", "meeting", "https://zoom.com", "paid", false, {
  ko: ["줌 회의를 요약하고 할 일을 정리하는 줌 기본 AI",["줌 유료 계정이면 추가 비용 없이 사용","회의 중 놓친 내용 바로 질문"],["줌 회의 밖에서는 활용이 제한적"],["줌 회의 요약 자동 공유","늦게 들어온 회의 앞부분 확인"]],
  en: ["Zoom's built-in AI that summarizes meetings and lists action items",["Included with paid Zoom accounts at no extra cost","Ask about anything you missed mid-meeting"],["Limited use outside Zoom meetings"],["Share Zoom meeting summaries automatically","Catch up on the start of a meeting you joined late"]],
  ja: ["Zoom会議を要約し、タスクを整理するZoom標準のAI",["Zoomの有料アカウントなら追加費用なしで使える","会議中に聞き逃した内容をすぐ質問"],["Zoom会議以外での活用は限定的"],["Zoom会議の要約を自動共有","遅れて入った会議の冒頭を確認"]],
  zh: ["总结Zoom会议并整理待办的Zoom内置AI",["Zoom付费账号无需额外费用","会议中可随时询问漏听的内容"],["在Zoom会议之外用途有限"],["自动分享Zoom会议总结","查看迟到会议的开头部分"]]
}, [["Zoom Pro","incl"]]);
S("Google Meet 회의록 (Gemini)", "productivity", "meeting", "https://workspace.google.com", "paid", false, {
  ko: ["구글 미트 회의 내용을 자동으로 회의록 문서로 만들어 주는 기능",["회의록이 구글 문서로 자동 저장","캘린더 초대자에게 바로 공유"],["AI 포함 Google Workspace 요금제가 필요함"],["팀 정기 회의록 자동화","회의 결과를 문서로 바로 공유"]],
  en: ["Turns Google Meet calls into meeting-notes docs automatically",["Notes are saved to Google Docs automatically","Shared with calendar invitees right away"],["Needs a Google Workspace plan that includes AI"],["Automate notes for recurring team meetings","Share meeting outcomes as a doc instantly"]],
  ja: ["Google Meetの会議内容を自動で議事録文書にする機能",["議事録がGoogleドキュメントに自動保存","カレンダーの招待者にすぐ共有"],["AI込みのGoogle Workspaceプランが必要"],["定例会議の議事録を自動化","会議の結果を文書ですぐ共有"]],
  zh: ["把Google Meet会议内容自动生成会议纪要文档的功能",["纪要自动保存为谷歌文档","立即分享给日历受邀者"],["需要包含AI的Google Workspace方案"],["自动生成团队例会纪要","以文档形式即时分享会议结果"]]
}, [["Workspace Business Standard","$14","user"],["Workspace Business Plus","$22","user"]]);
S("Teams Copilot", "productivity", "meeting", "https://microsoft.com/microsoft-365/copilot", "paid", false, {
  ko: ["팀즈 회의를 요약하고 질문에 답하는 마이크로소프트 AI",["회의 중 '지금까지 결정된 것'을 바로 질문","회의 후 할 일과 담당자 정리"],["Microsoft 365 Copilot 유료 구독이 필요함"],["팀즈 회의 결정 사항 정리","회의 녹화본 핵심만 확인"]],
  en: ["Microsoft AI that summarizes Teams meetings and answers questions",["Ask 'what's been decided so far?' during the call","Lists action items and owners afterwards"],["Needs a paid Microsoft 365 Copilot plan"],["Summarize decisions from a Teams meeting","Check just the key points of a recording"]],
  ja: ["Teams会議を要約し、質問に答えるMicrosoftのAI",["会議中に「ここまでの決定事項は？」とすぐ質問","会議後にタスクと担当者を整理"],["Microsoft 365 Copilotの有料契約が必要"],["Teams会議の決定事項を整理","会議録画の要点だけ確認"]],
  zh: ["总结Teams会议并回答问题的微软AI",["会议中可随时问「目前决定了什么」","会后整理待办和负责人"],["需要付费订阅Microsoft 365 Copilot"],["整理Teams会议的决定事项","只看会议录像的要点"]]
}, [["Microsoft 365 Copilot","$30","user"]]);
S("Plaud", "productivity", "meeting", "https://plaud.ai", "paid", false, {
  ko: ["AI 녹음 기기와 앱으로 대면 회의와 통화를 기록·요약하는 서비스",["작은 녹음 기기로 대면 회의도 편하게 기록","녹음 후 앱에서 바로 요약"],["기기 구매가 필요하고 고급 기능은 구독"],["외근 중 고객 미팅 기록","강의·세미나 녹음 요약"]],
  en: ["An AI recorder device plus app for capturing and summarizing meetings and calls",["A small device makes in-person recording easy","Summaries in the app right after recording"],["Requires buying the device; advanced features are a subscription"],["Record client meetings on the road","Summarize a lecture or seminar"]],
  ja: ["AI録音デバイスとアプリで対面会議や通話を記録・要約するサービス",["小さな録音デバイスで対面会議も手軽に記録","録音後すぐアプリで要約"],["デバイスの購入が必要で、高度な機能はサブスク"],["外回り中の顧客との打ち合わせ記録","講義やセミナーの録音要約"]],
  zh: ["用AI录音设备和应用记录并总结线下会议和通话的服务",["小巧的录音设备让线下会议记录更方便","录音后在应用中立即总结"],["需要购买设备，高级功能需订阅"],["外出时记录客户会议","总结讲座或研讨会录音"]]
}, [["@device","$159","once"],["Pro",null]]);
S("Tactiq", "productivity", "meeting", "https://tactiq.io", "mix", false, {
  ko: ["크롬 확장 프로그램으로 화상회의 자막을 기록하는 도구",["설치 후 회의 자막을 바로 텍스트로 저장","회의에 봇이 들어가지 않음"],["무료 버전은 월 회의 수가 제한됨"],["구글 미트 회의 기록","회의 텍스트로 후속 메일 초안"]],
  en: ["A Chrome extension that saves video meeting captions as text",["Saves captions as text right after install","No bot joins the meeting"],["The free plan limits meetings per month"],["Record Google Meet meetings","Draft a follow-up email from the transcript"]],
  ja: ["Chrome拡張機能でビデオ会議の字幕を記録するツール",["インストール後すぐ会議字幕をテキスト保存","会議にボットが入らない"],["無料版は月の会議数に制限"],["Google Meetの会議記録","会議テキストからフォローアップメールの下書き"]],
  zh: ["通过Chrome扩展记录视频会议字幕的工具",["安装后即可把会议字幕保存为文字","不会有机器人加入会议"],["免费版每月会议数有限"],["记录Google Meet会议","根据会议文字起草跟进邮件"]]
}, [["@free","$0"],["Pro",null]]);

/* ---------- 문서·업무 생산성 › 스프레드시트·데이터 분석 ---------- */
S("ChatGPT for Excel & Sheets", "productivity", "sheets", "https://chatgpt.com", "mix", true, {
  ko: ["엑셀·구글 시트 안에서 ChatGPT로 데이터를 분석하는 기능",["파일을 올리면 분석부터 차트까지 한 번에","수식 설명과 오류 해결에 강함"],["무료 버전은 분석 사용량이 제한됨"],["매출 데이터 월별 추이 차트 만들기","복잡한 수식 오류 찾기"]],
  en: ["Analyze data with ChatGPT inside Excel and Google Sheets",["Upload a file and get analysis and charts in one go","Great at explaining formulas and fixing errors"],["The free plan limits analysis usage"],["Chart monthly sales trends","Track down a broken formula"]],
  ja: ["ExcelやGoogleスプレッドシートの中でChatGPTを使ってデータ分析する機能",["ファイルをアップすると分析からグラフまで一度に","数式の説明やエラー解決に強い"],["無料版は分析の利用量に制限"],["売上データの月別推移グラフ作成","複雑な数式のエラー探し"]],
  zh: ["在Excel和谷歌表格中用ChatGPT分析数据的功能",["上传文件即可一次完成分析和图表","擅长解释公式和排查错误"],["免费版分析用量有限"],["制作月度销售趋势图","找出复杂公式的错误"]]
}, [["@free","$0"],["Plus","$20","mo"]]);
S("Copilot in Excel", "productivity", "sheets", "https://microsoft.com/microsoft-365/copilot", "paid", true, {
  ko: ["엑셀에서 말로 수식, 피벗, 차트를 만드는 마이크로소프트 AI",["회사 엑셀 파일 안에서 바로 분석","어려운 수식을 말로 요청"],["Microsoft 365 Copilot 유료 구독이 필요함"],["부서별 실적 피벗 테이블 만들기","조건에 맞는 행 강조 표시"]],
  en: ["Microsoft AI that builds formulas, pivots and charts in Excel from plain words",["Analyze right inside your work spreadsheets","Ask for hard formulas in plain language"],["Needs a paid Microsoft 365 Copilot plan"],["Build a pivot table of results by team","Highlight rows that meet a condition"]],
  ja: ["Excelで言葉から数式、ピボット、グラフを作るMicrosoftのAI",["会社のExcelファイルの中ですぐ分析","難しい数式を言葉で依頼"],["Microsoft 365 Copilotの有料契約が必要"],["部署別実績のピボットテーブル作成","条件に合う行を強調表示"]],
  zh: ["在Excel中用一句话生成公式、数据透视表和图表的微软AI",["直接在工作表格中分析","用自然语言提出复杂公式需求"],["需要付费订阅Microsoft 365 Copilot"],["制作按部门汇总的数据透视表","高亮符合条件的行"]]
}, [["Microsoft 365 Personal","$9.99","mo"],["Microsoft 365 Premium","$19.99","mo"],["Microsoft 365 Copilot","$30","user"]]);
S("Claude for Excel", "productivity", "sheets", "https://claude.ai", "paid", true, {
  ko: ["여러 시트를 한꺼번에 분석하고 셀 단위 근거를 보여주는 엑셀용 Claude",["여러 탭이 얽힌 복잡한 통합 문서 이해","답의 근거가 된 셀을 표시해 확인이 쉬움"],["Claude 유료 요금제가 필요함"],["재무 모델 구조 파악","여러 시트에 걸친 숫자 불일치 찾기"]],
  en: ["Claude for Excel: analyzes many sheets at once with cell-level citations",["Understands complex multi-tab workbooks","Cites the exact cells behind each answer"],["Requires a paid Claude plan"],["Understand how a financial model is built","Find mismatched numbers across sheets"]],
  ja: ["複数シートをまとめて分析し、セル単位の根拠を示すExcel向けClaude",["複数タブが絡む複雑なブックを理解","回答の根拠となったセルを表示し確認しやすい"],["Claudeの有料プランが必要"],["財務モデルの構造を把握","複数シートにまたがる数字の不一致探し"]],
  zh: ["可同时分析多张工作表并标注单元格依据的Excel版Claude",["理解多个工作表交织的复杂工作簿","标出作为依据的单元格，便于核对"],["需要Claude付费方案"],["理清财务模型结构","找出跨工作表的数字不一致"]]
}, [["Pro","$20","mo"],["Max","$100","mo"]]);
S("Gemini in Sheets", "productivity", "sheets", "https://workspace.google.com", "paid", true, {
  ko: ["구글 시트에서 AI 함수와 자동 채우기를 쓰는 제미나이 기능",["셀에 AI 함수를 넣어 분류·요약 자동화","표 만들기와 데이터 정리를 말로 요청"],["AI 포함 Google Workspace 요금제가 필요함"],["설문 주관식 답변 자동 분류","고객 리뷰 감정 분석"]],
  en: ["Gemini in Google Sheets with AI functions and auto-fill",["Put an AI function in a cell to classify or summarize","Ask in words to build tables and clean data"],["Needs a Google Workspace plan that includes AI"],["Auto-categorize open-ended survey answers","Analyze sentiment in customer reviews"]],
  ja: ["GoogleスプレッドシートでAI関数や自動入力を使えるGeminiの機能",["セルにAI関数を入れて分類・要約を自動化","表の作成やデータ整理を言葉で依頼"],["AI込みのGoogle Workspaceプランが必要"],["アンケートの自由回答を自動分類","顧客レビューの感情分析"]],
  zh: ["在谷歌表格中使用AI函数和自动填充的Gemini功能",["在单元格中使用AI函数自动分类和总结","用一句话生成表格、整理数据"],["需要包含AI的Google Workspace方案"],["自动分类问卷开放式回答","分析客户评论情感"]]
}, [["Workspace Business Standard","$14","user"],["Workspace Business Plus","$22","user"]]);
S("GPT for Work", "productivity", "sheets", "https://gptforwork.com", "mix", false, {
  ko: ["엑셀·구글 시트에서 최대 100만 행을 AI로 일괄 처리하는 추가 기능",["수천 개 행을 한 번에 번역·분류·요약","여러 AI 모델 중 골라서 사용"],["사용량만큼 비용이 들어 대량 작업 시 주의"],["상품 설명 수천 개 일괄 번역","고객 문의 유형 자동 분류"]],
  en: ["An add-on that runs AI over up to 1 million rows in Excel and Sheets",["Translate, classify or summarize thousands of rows at once","Choose among several AI models"],["Costs scale with usage, so watch big jobs"],["Bulk-translate thousands of product descriptions","Auto-classify customer inquiries"]],
  ja: ["ExcelやスプレッドシートでAIを最大100万行まで一括処理するアドオン",["数千行を一度に翻訳・分類・要約","複数のAIモデルから選んで使える"],["使った分だけ費用がかかるので大量処理は注意"],["数千件の商品説明を一括翻訳","顧客問い合わせの種類を自動分類"]],
  zh: ["在Excel和谷歌表格中用AI批量处理多达100万行的插件",["一次翻译、分类或总结数千行","可从多个AI模型中选择"],["按用量计费，大批量处理需留意成本"],["批量翻译数千条商品描述","自动分类客户咨询类型"]]
}, [["@free","$0"],["@paid","$25~","mo"]]);
S("Julius AI", "productivity", "sheets", "https://julius.ai", "mix", false, {
  ko: ["데이터 파일을 올리고 질문하면 차트와 통계 분석을 해주는 AI",["코딩 없이 회귀분석 같은 통계까지","보기 좋은 차트를 바로 생성"],["무료 버전은 월 메시지 수가 적음"],["실험 데이터 통계 분석","설문 결과 시각화"]],
  en: ["Upload data, ask questions, and get charts and statistical analysis",["Statistics like regression without coding","Clean charts generated instantly"],["Few messages per month on the free plan"],["Run statistics on experiment data","Visualize survey results"]],
  ja: ["データファイルをアップして質問すると、グラフや統計分析をしてくれるAI",["コーディングなしで回帰分析などの統計まで","見やすいグラフをすぐ生成"],["無料版は月のメッセージ数が少ない"],["実験データの統計分析","アンケート結果の可視化"]],
  zh: ["上传数据文件并提问即可得到图表和统计分析的AI",["无需编程即可做回归分析等统计","立即生成美观的图表"],["免费版每月消息数少"],["对实验数据做统计分析","可视化问卷结果"]]
}, [["@free","$0"],["Plus","$35","mo"]]);
S("Shortcut", "productivity", "sheets", "https://tryshortcut.ai", "mix", false, {
  ko: ["재무 모델링에 특화된 스프레드시트 AI 에이전트",["재무 모델을 처음부터 만들어 줌","셀 단위 변경 내역 추적"],["가격이 높아 전문 직군 위주"],["기업 가치 평가 모델 초안","투자 검토용 시나리오 분석"]],
  en: ["A spreadsheet AI agent built for financial modeling",["Builds financial models from scratch","Tracks changes cell by cell"],["Pricey, aimed at finance professionals"],["Draft a company valuation model","Scenario analysis for an investment review"]],
  ja: ["財務モデリングに特化したスプレッドシートAIエージェント",["財務モデルを一から作ってくれる","セル単位で変更履歴を追跡"],["価格が高く専門職向け"],["企業価値評価モデルの下書き","投資検討のシナリオ分析"]],
  zh: ["专为财务建模打造的表格AI智能体",["从零搭建财务模型","按单元格追踪修改记录"],["价格高，主要面向专业人士"],["起草企业估值模型","投资评估用情景分析"]]
}, [["@free","$0"],["@paid","$125","mo"]]);
S("Ajelix", "productivity", "sheets", "https://ajelix.com", "mix", false, {
  ko: ["엑셀 자동화와 대시보드를 함께 만드는 AI 도구",["수식·VBA 생성부터 대시보드까지","데이터를 올리면 보고서 자동 작성"],["무료 사용량이 적음"],["매출 대시보드 만들기","반복 엑셀 작업 매크로 생성"]],
  en: ["An AI tool for Excel automation and dashboards",["From formulas and VBA to dashboards","Upload data and get an automatic report"],["Small free allowance"],["Build a sales dashboard","Generate a macro for a repetitive Excel task"]],
  ja: ["Excelの自動化とダッシュボードを一緒に作るAIツール",["数式・VBA生成からダッシュボードまで","データをアップするとレポートを自動作成"],["無料枠が少ない"],["売上ダッシュボードの作成","繰り返しのExcel作業のマクロ生成"]],
  zh: ["同时实现Excel自动化和仪表盘制作的AI工具",["从公式、VBA到仪表盘一应俱全","上传数据自动生成报告"],["免费额度少"],["制作销售仪表盘","为重复的Excel工作生成宏"]]
}, [["@free","$0"],["Lite","$39","user"]]);
S("Numerous.ai", "productivity", "sheets", "https://numerous.ai", "paid", false, {
  ko: ["셀 하나에 AI 함수를 넣어 분류·텍스트 처리를 하는 시트 도구",["익숙한 함수 쓰듯 AI 사용","엑셀과 구글 시트 모두 지원"],["무료 요금제 없이 저렴한 체험 후 유료"],["상품명에서 카테고리 자동 분류","고객 메모에서 핵심 키워드 추출"]],
  en: ["Put an AI function in a cell for classification and text tasks",["Use AI like any familiar function","Works in Excel and Google Sheets"],["No free plan, just a low-cost trial"],["Auto-categorize product names","Pull key words from customer notes"]],
  ja: ["セルにAI関数を入れて分類やテキスト処理をするシートツール",["いつもの関数のようにAIを使える","ExcelとGoogleスプレッドシートの両方に対応"],["無料プランはなく、安価な体験後に有料"],["商品名からカテゴリーを自動分類","顧客メモからキーワードを抽出"]],
  zh: ["在单元格中使用AI函数完成分类和文本处理的表格工具",["像使用熟悉的函数一样使用AI","同时支持Excel和谷歌表格"],["没有免费方案，低价试用后收费"],["根据商品名自动分类","从客户备注中提取关键词"]]
}, [["Personal","$10","mo"]]);
S("Formula Bot", "productivity", "sheets", "https://formulabot.com", "mix", false, {
  ko: ["하고 싶은 계산을 설명하면 엑셀·시트 수식을 만들어 주는 도구",["수식을 몰라도 원하는 결과 얻기","수식 설명 기능으로 공부에도 도움"],["무료 버전은 월 사용 횟수가 제한됨"],["조건별 합계 수식 만들기","받은 엑셀 파일 수식 이해하기"]],
  en: ["Describe the calculation and get an Excel or Sheets formula",["Get results without knowing formulas","Formula explanations help you learn"],["The free plan limits monthly uses"],["Build a conditional sum formula","Understand formulas in a file you received"]],
  ja: ["やりたい計算を説明するとExcelやスプレッドシートの数式を作るツール",["数式を知らなくても欲しい結果が得られる","数式の説明機能で勉強にも役立つ"],["無料版は月の利用回数に制限"],["条件付き合計の数式を作る","受け取ったExcelの数式を理解する"]],
  zh: ["描述想要的计算即可生成Excel或表格公式的工具",["不懂公式也能得到想要的结果","公式解释功能也有助于学习"],["免费版每月使用次数有限"],["编写按条件求和的公式","看懂收到的Excel文件中的公式"]]
}, [["@free","$0"],["@paid",null]]);
S("Rows", "productivity", "sheets", "https://rows.com", "mix", false, {
  ko: ["AI 분석 기능이 들어간 웹 스프레드시트",["표를 올리면 AI가 요약과 인사이트 제시","외부 데이터 연동과 공유가 쉬움"],["엑셀 고급 기능을 모두 대체하지는 못함"],["마케팅 성과 표 분석","웹에 공유할 데이터 보고서"]],
  en: ["A web spreadsheet with built-in AI analysis",["AI summarizes tables and points out insights","Easy data connections and sharing"],["Doesn't replace every advanced Excel feature"],["Analyze a marketing performance table","A data report to share on the web"]],
  ja: ["AI分析機能を備えたWebスプレッドシート",["表をアップするとAIが要約とインサイトを提示","外部データの連携と共有が簡単"],["Excelの高度な機能をすべて置き換えられるわけではない"],["マーケティング成果表の分析","Webで共有するデータレポート"]],
  zh: ["内置AI分析功能的网页表格",["上传表格后AI给出总结和洞察","外部数据连接和分享方便"],["不能完全替代Excel的高级功能"],["分析营销效果表","在网上分享的数据报告"]]
}, [["@free","$0"],["@paid",null]]);
S("Powerdrill", "productivity", "sheets", "https://powerdrill.ai", "mix", false, {
  ko: ["데이터 파일을 분석하고 보고서까지 만들어 주는 AI",["여러 파일을 함께 분석","분석 결과를 보고서·슬라이드로 정리"],["무료 버전은 파일 크기와 횟수 제한"],["판매 데이터 분석 보고서","엑셀 파일 여러 개 합쳐 비교"]],
  en: ["AI that analyzes data files and writes up a report",["Analyzes several files together","Turns results into reports or slides"],["The free plan limits file size and uses"],["A sales data analysis report","Combine and compare several spreadsheets"]],
  ja: ["データファイルを分析し、レポートまで作るAI",["複数のファイルをまとめて分析","分析結果をレポートやスライドにまとめる"],["無料版はファイルサイズと回数に制限"],["販売データの分析レポート","複数のExcelファイルを統合して比較"]],
  zh: ["分析数据文件并生成报告的AI",["可同时分析多个文件","把分析结果整理成报告或幻灯片"],["免费版限制文件大小和次数"],["销售数据分析报告","合并比较多个Excel文件"]]
}, [["@free","$0"],["@paid",null]]);
S("Coefficient", "productivity", "sheets", "https://coefficient.io", "mix", false, {
  ko: ["외부 업무 데이터를 시트로 가져와 AI로 분석하는 도구",["CRM·DB 데이터를 시트에 자동 동기화","AI로 차트와 수식 생성"],["고급 연동은 유료"],["CRM 영업 데이터 주간 보고서","광고 성과 자동 업데이트 시트"]],
  en: ["Pulls business data into spreadsheets and analyzes it with AI",["Auto-syncs CRM and database data into sheets","AI builds charts and formulas"],["Advanced connectors are paid"],["A weekly CRM sales report","An ad performance sheet that updates itself"]],
  ja: ["外部の業務データをシートに取り込み、AIで分析するツール",["CRMやDBのデータをシートに自動同期","AIでグラフと数式を生成"],["高度な連携は有料"],["CRMの営業データの週次レポート","広告成果を自動更新するシート"]],
  zh: ["把外部业务数据导入表格并用AI分析的工具",["CRM和数据库数据自动同步到表格","用AI生成图表和公式"],["高级连接收费"],["CRM销售数据周报","自动更新的广告效果表"]]
}, [["@free","$0"],["@paid",null]]);
S("Power BI Copilot", "productivity", "sheets", "https://powerbi.microsoft.com", "paid", false, {
  ko: ["BI 대시보드를 말로 만들고 분석하는 마이크로소프트 AI",["질문만으로 보고서 페이지 생성","회사 데이터 분석을 한곳에서"],["Copilot 기능은 상위 유료 라이선스가 필요함"],["경영 지표 대시보드 만들기","매출 하락 원인 질문하기"]],
  en: ["Microsoft AI that builds and analyzes BI dashboards from plain words",["Create report pages just by asking","Company data analysis in one place"],["Copilot features need higher-tier paid licenses"],["Build an executive KPI dashboard","Ask why sales dropped"]],
  ja: ["BIダッシュボードを言葉で作って分析するMicrosoftのAI",["質問するだけでレポートページを作成","会社のデータ分析を一か所で"],["Copilot機能は上位の有料ライセンスが必要"],["経営指標ダッシュボードの作成","売上減少の原因を質問"]],
  zh: ["用一句话制作并分析BI仪表盘的微软AI",["只需提问即可生成报表页面","在一个地方分析公司数据"],["Copilot功能需要更高级的付费许可"],["制作经营指标仪表盘","询问销售下滑原因"]]
}, [["Power BI Pro","$14","user"],["Fabric / Premium","quote"]]);
S("Tableau Agent", "productivity", "sheets", "https://tableau.com", "paid", false, {
  ko: ["태블로 시각화를 자연어로 만드는 세일즈포스의 AI",["말로 요청하면 차트 추천과 계산식 작성","기존 태블로 대시보드와 연결"],["태블로 유료 라이선스가 필요함"],["지역별 판매 지도 시각화","데이터 정리 계산식 작성"]],
  en: ["Salesforce AI that builds Tableau visualizations from natural language",["Ask in words for chart suggestions and calculations","Connects to your existing Tableau dashboards"],["Requires a paid Tableau license"],["Map sales by region","Write calculated fields to clean data"]],
  ja: ["Tableauの可視化を自然言語で作るSalesforceのAI",["言葉で頼むとグラフの提案と計算式を作成","既存のTableauダッシュボードと連携"],["Tableauの有料ライセンスが必要"],["地域別の販売を地図で可視化","データ整理の計算式づくり"]],
  zh: ["用自然语言制作Tableau可视化的Salesforce AI",["用一句话获得图表建议并编写计算字段","与现有Tableau仪表盘连接"],["需要Tableau付费许可"],["按地区可视化销售地图","编写整理数据的计算字段"]]
}, [["Tableau Creator","$75","user"]]);

/* ---------- 자동화·AI 에이전트 › 노코드 자동화 ---------- */
S("Zapier", "automation", "nocode", "https://zapier.com", "mix", true, {
  ko: ["8,000개 넘는 앱을 클릭만으로 연결",["연결할 수 있는 앱 수가 가장 많음","코딩 없이 클릭만으로 설정","바로 쓸 수 있는 템플릿이 많음"],["작업 수가 늘면 요금이 빠르게 오름","복잡한 흐름은 Make나 n8n보다 다루기 번거로움"],["구글 폼 응답을 슬랙 채널로 자동 전송","메일에 온 첨부파일을 구글 드라이브에 자동 저장"]],
  en: ["Connect 8,000+ apps with just a few clicks",["The largest number of app integrations","Set up by clicking, no code","Lots of ready-made templates"],["Costs climb quickly as task volume grows","Complex flows are clunkier than in Make or n8n"],["Send Google Form responses to a Slack channel","Save email attachments to Google Drive automatically"]],
  ja: ["8,000以上のアプリをクリックだけでつなぐ",["連携できるアプリ数が最も多い","コーディングなしでクリックだけで設定","すぐ使えるテンプレートが豊富"],["タスク数が増えると料金がすぐ上がる","複雑なフローはMakeやn8nより扱いにくい"],["Googleフォームの回答をSlackチャンネルに自動送信","メールの添付ファイルをGoogleドライブに自動保存"]],
  zh: ["点几下就能连接8,000多个应用",["可连接的应用数量最多","无需编程，点击即可设置","有大量现成模板"],["任务量增加后费用上涨很快","复杂流程不如Make或n8n好用"],["把谷歌表单回复自动发送到Slack频道","把邮件附件自动保存到谷歌云端硬盘"]]
}, [["@free","$0"],["Professional","$19.99","mo"],["Team","$69","mo"]]);
S("Make", "automation", "nocode", "https://make.com", "mix", true, {
  ko: ["캔버스에 흐름을 그리듯 만드는 시각적 자동화 도구, AI 에이전트 기능 포함",["복잡한 분기·반복도 그림으로 한눈에","같은 작업량 대비 Zapier보다 저렴한 편"],["처음에는 개념을 익히는 데 시간이 걸림"],["쇼핑몰 주문을 시트·메일·메신저로 동시 처리","SNS 게시물 예약과 성과 수집"]],
  en: ["A visual automation builder where you draw flows on a canvas, now with AI agents",["Even complex branches and loops are clear at a glance","Usually cheaper than Zapier for the same volume"],["Takes time to learn the concepts at first"],["Process shop orders into sheets, email and chat at once","Schedule social posts and collect results"]],
  ja: ["キャンバスにフローを描くように作る視覚的な自動化ツール、AIエージェント機能付き",["複雑な分岐や繰り返しも図でひと目でわかる","同じ作業量ならZapierより安いことが多い"],["最初は考え方に慣れるまで時間がかかる"],["ネットショップの注文をシート・メール・チャットに同時処理","SNS投稿の予約と成果の収集"]],
  zh: ["像在画布上画流程一样搭建的可视化自动化工具，含AI智能体功能",["复杂的分支和循环也一目了然","同等用量通常比Zapier便宜"],["刚开始需要时间理解概念"],["把网店订单同时处理到表格、邮件和聊天","定时发布社交帖子并收集效果"]]
}, [["@free","$0"],["Core","$9","mo"],["Pro","$16","mo"],["Teams","$29","mo"]]);
S("n8n", "automation", "nocode", "https://n8n.io", "mix", true, {
  ko: ["직접 설치하면 실행 횟수 제한 없이 쓰는 오픈소스 자동화 도구",["셀프 호스팅 시 무료로 무제한 실행","AI 에이전트 노드와 코드 단계를 자유롭게 조합"],["직접 설치·관리하려면 서버 지식이 필요함"],["사내 데이터로 답하는 AI 챗봇 흐름 만들기","매일 뉴스 수집 후 요약해 메일 발송"]],
  en: ["Open-source automation with unlimited runs when you host it yourself",["Free, unlimited executions when self-hosted","Mix AI agent nodes and code steps freely"],["Self-hosting needs some server know-how"],["Build an AI chatbot flow that answers from company data","Collect daily news, summarize and email it"]],
  ja: ["自分で導入すれば実行回数の制限なく使えるオープンソースの自動化ツール",["セルフホストなら無料で無制限に実行","AIエージェントのノードとコードを自由に組み合わせ"],["自分で導入・管理するにはサーバーの知識が必要"],["社内データで答えるAIチャットボットのフロー作成","毎日ニュースを集めて要約しメール送信"]],
  zh: ["自行部署即可不限执行次数使用的开源自动化工具",["自托管时免费且执行不限次","可自由组合AI智能体节点和代码步骤"],["自行部署和维护需要服务器知识"],["搭建基于公司数据回答的AI聊天机器人流程","每天收集新闻、总结并发邮件"]]
}, [["@selfhost","$0"],["Starter","$24","mo"],["Pro","$60","mo"]]);
S("Power Automate", "automation", "nocode", "https://powerautomate.microsoft.com", "mix", false, {
  ko: ["마이크로소프트 앱 중심으로 업무를 자동화하는 도구",["아웃룩·팀즈·엑셀·셰어포인트 연동이 강함","PC 화면 작업 자동화(RPA)도 가능"],["마이크로소프트 밖의 앱 연동은 상대적으로 약함"],["아웃룩 첨부파일을 셰어포인트에 자동 저장","팀즈 승인 요청 흐름 만들기"]],
  en: ["Workflow automation centered on Microsoft apps",["Strong with Outlook, Teams, Excel and SharePoint","Also automates desktop tasks (RPA)"],["Weaker with apps outside Microsoft"],["Save Outlook attachments to SharePoint","Build an approval flow in Teams"]],
  ja: ["Microsoftのアプリを中心に業務を自動化するツール",["Outlook・Teams・Excel・SharePointとの連携が強い","PC画面の作業自動化(RPA)も可能"],["Microsoft以外のアプリ連携は比較的弱い"],["Outlookの添付ファイルをSharePointに自動保存","Teamsで承認依頼フローを作る"]],
  zh: ["以微软应用为中心的工作自动化工具",["与Outlook、Teams、Excel、SharePoint集成强","也能自动化电脑桌面操作(RPA)"],["与微软以外应用的集成相对较弱"],["把Outlook附件自动保存到SharePoint","在Teams中搭建审批流程"]]
}, [["@free","$0"],["Premium","$15","user"]]);
S("Activepieces", "automation", "nocode", "https://activepieces.com", "mix", false, {
  ko: ["MIT 라이선스 오픈소스 자동화 도구, AI 에이전트용 MCP 서버 400개 이상",["오픈소스라 직접 설치해 자유롭게 사용","화면이 단순해 입문자도 쉽게 사용"],["연동 앱 수는 Zapier보다 적음"],["AI 에이전트에 업무 앱 연결하기","사내 서버에 자동화 환경 구축"]],
  en: ["MIT-licensed open-source automation with 400+ MCP servers for AI agents",["Open source, so you can self-host freely","Simple interface that beginners can use"],["Fewer app integrations than Zapier"],["Connect work apps to an AI agent","Run automation on your own servers"]],
  ja: ["MITライセンスのオープンソース自動化ツール、AIエージェント向けMCPサーバー400以上",["オープンソースなので自分で導入して自由に使える","画面がシンプルで初心者でも使いやすい"],["連携アプリ数はZapierより少ない"],["AIエージェントに業務アプリをつなぐ","社内サーバーに自動化環境を構築"]],
  zh: ["MIT许可的开源自动化工具，提供400多个供AI智能体使用的MCP服务器",["开源，可自由自行部署","界面简单，新手也易上手"],["可连接应用数量少于Zapier"],["为AI智能体接入办公应用","在公司服务器上搭建自动化环境"]]
}, [["@free","$0"],["Plus","$25","mo"]]);
S("Pipedream", "automation", "nocode", "https://pipedream.com", "mix", false, {
  ko: ["시각적 흐름에 코드 단계를 섞을 수 있는 개발자용 자동화 도구",["필요한 곳에 파이썬·자바스크립트 코드 삽입","API 연동이 빠르고 유연함"],["비개발자에게는 다소 어려움"],["웹훅으로 들어온 데이터 가공 후 저장","API 여러 개를 엮은 백엔드 흐름"]],
  en: ["Developer-friendly automation that mixes visual steps with code",["Drop in Python or JavaScript wherever needed","Fast, flexible API integrations"],["Can be hard for non-developers"],["Transform webhook data and store it","A backend flow chaining several APIs"]],
  ja: ["視覚的なフローにコードを混ぜられる開発者向け自動化ツール",["必要な所にPythonやJavaScriptのコードを挿入","API連携が速く柔軟"],["非開発者にはやや難しい"],["Webhookで届いたデータを加工して保存","複数のAPIをつなぐバックエンドのフロー"]],
  zh: ["可在可视化流程中加入代码步骤的开发者自动化工具",["可在需要处插入Python或JavaScript代码","API集成快速灵活"],["对非开发者略难"],["处理并保存Webhook传来的数据","串联多个API的后端流程"]]
}, [["@free","$0"],["Basic","$29","mo"]]);
S("Gumloop", "automation", "nocode", "https://gumloop.com", "mix", false, {
  ko: ["AI 처리 단계와 데이터 작업을 노드로 연결하는 AI 중심 자동화 빌더",["웹 스크래핑·AI 분석 단계를 끌어다 놓기만 하면 됨","AI 작업 흐름을 만들기에 직관적"],["사용량이 늘면 비용 부담이 커짐"],["경쟁사 웹사이트 정보 수집 후 요약","리드 목록을 AI로 분류해 시트에 저장"]],
  en: ["An AI-first automation builder that links AI steps and data tasks as nodes",["Drag in web scraping and AI analysis steps","Intuitive for building AI workflows"],["Costs grow as usage increases"],["Scrape competitor sites and summarize them","Classify a lead list with AI and save to a sheet"]],
  ja: ["AI処理とデータ作業をノードでつなぐAI中心の自動化ビルダー",["Webスクレイピングや AI分析をドラッグするだけ","AIワークフローづくりが直感的"],["利用量が増えると費用負担が大きくなる"],["競合サイトの情報を集めて要約","見込み客リストをAIで分類してシートに保存"]],
  zh: ["用节点连接AI处理和数据任务的AI优先自动化构建器",["拖放即可加入网页抓取和AI分析步骤","搭建AI工作流很直观"],["用量增加后费用压力变大"],["收集竞争对手网站信息并总结","用AI分类潜在客户名单并存入表格"]]
}, [["@free","$0"],["Solo","$37","mo"]]);
S("IFTTT", "automation", "nocode", "https://ifttt.com", "mix", false, {
  ko: ["'이것이 일어나면 저것을 하라' 규칙으로 앱과 스마트홈을 연결하는 서비스",["설정이 매우 간단함","스마트홈 기기 연동이 많음"],["복잡한 업무 자동화에는 부족함"],["비 예보가 있으면 휴대폰 알림 받기","SNS에 올린 사진을 클라우드에 자동 백업"]],
  en: ["Connects apps and smart-home devices with 'if this, then that' rules",["Very simple to set up","Lots of smart-home integrations"],["Too limited for complex business automation"],["Get a phone alert when rain is forecast","Back up photos you post to the cloud automatically"]],
  ja: ["「これが起きたらあれをする」というルールでアプリやスマートホームをつなぐサービス",["設定がとても簡単","スマートホーム機器との連携が多い"],["複雑な業務自動化には物足りない"],["雨の予報があればスマホに通知","SNSに投稿した写真をクラウドに自動バックアップ"]],
  zh: ["用「如果这样就那样」规则连接应用和智能家居的服务",["设置非常简单","智能家居设备集成多"],["不足以应对复杂的业务自动化"],["有雨天预报时收到手机提醒","把发到社交媒体的照片自动备份到云端"]]
}, [["@free","$0"],["Pro",null]]);
S("Bardeen", "automation", "nocode", "https://bardeen.ai", "mix", false, {
  ko: ["브라우저에서 하는 반복 작업을 자동화하는 크롬 확장 도구",["웹페이지 정보를 시트로 바로 수집","AI로 영업·리서치 작업 자동화"],["크롬 브라우저 중심으로 작동"],["링크드인 프로필 정보 시트로 정리","웹 검색 결과 자동 수집"]],
  en: ["A Chrome extension that automates repetitive browser tasks",["Scrapes web page info straight into a sheet","Automates sales and research work with AI"],["Works mainly in Chrome"],["Collect LinkedIn profile info into a sheet","Gather web search results automatically"]],
  ja: ["ブラウザでの繰り返し作業を自動化するChrome拡張ツール",["Webページの情報をすぐシートに収集","AIで営業やリサーチ作業を自動化"],["主にChromeで動作"],["LinkedInのプロフィール情報をシートに整理","Web検索結果を自動収集"]],
  zh: ["自动化浏览器重复操作的Chrome扩展工具",["把网页信息直接收集到表格","用AI自动化销售和调研工作"],["主要在Chrome中运行"],["把领英资料整理到表格","自动收集网页搜索结果"]]
}, [["@free","$0"],["@paid",null]]);
S("Workato", "automation", "nocode", "https://workato.com", "paid", false, {
  ko: ["ERP·CRM 같은 기업 시스템을 대규모로 연결하는 기업용 자동화",["대기업 시스템 연동과 보안·관리 기능이 강함","부서 간 복잡한 업무 흐름 자동화"],["연간 계약 중심이라 가격이 높음"],["주문 시스템과 회계 시스템 자동 연동","입사자 계정 발급 자동화"]],
  en: ["Enterprise automation that connects systems like ERP and CRM at scale",["Strong enterprise integrations, security and governance","Automates complex cross-department workflows"],["Annual contracts make it expensive"],["Sync the order system with accounting","Automate account setup for new hires"]],
  ja: ["ERPやCRMなどの企業システムを大規模につなぐ企業向け自動化",["大企業システムとの連携やセキュリティ・管理機能が強い","部署をまたぐ複雑な業務フローを自動化"],["年間契約中心で価格が高い"],["受注システムと会計システムを自動連携","入社者のアカウント発行を自動化"]],
  zh: ["大规模连接ERP、CRM等企业系统的企业级自动化",["企业系统集成、安全和管理功能强","自动化跨部门的复杂流程"],["以年度合同为主，价格高"],["自动对接订单系统与财务系统","自动为新员工开通账号"]]
}, [["@ent","quote"]]);
S("UiPath", "automation", "nocode", "https://uipath.com", "mix", false, {
  ko: ["사람처럼 화면을 클릭하며 오래된 프로그램까지 자동화하는 RPA와 에이전트",["API가 없는 레거시 프로그램도 자동화","개인용 무료 커뮤니티 버전 제공"],["본격 도입은 비용과 설계가 필요함"],["매일 하는 ERP 입력 작업 자동화","여러 사이트에서 보고서 내려받기"]],
  en: ["RPA and agents that click through screens to automate even legacy software",["Automates old programs that have no API","A free Community edition for individuals"],["Full rollouts need budget and design work"],["Automate daily ERP data entry","Download reports from several sites"]],
  ja: ["人のように画面をクリックして古いソフトまで自動化するRPAとエージェント",["APIのないレガシーソフトも自動化","個人向けの無料コミュニティ版あり"],["本格導入には費用と設計が必要"],["毎日のERP入力作業を自動化","複数のサイトからレポートをダウンロード"]],
  zh: ["像人一样点击屏幕、连旧软件都能自动化的RPA和智能体",["没有API的旧系统也能自动化","提供个人免费社区版"],["正式部署需要成本和设计"],["自动化每天的ERP录入","从多个网站下载报告"]]
}, [["Community","$0"],["Pro","$420","mo"]]);
S("Automation Anywhere", "automation", "nocode", "https://automationanywhere.com", "mix", false, {
  ko: ["기업 업무를 RPA와 AI 에이전트로 자동화하는 플랫폼",["문서 처리와 화면 자동화를 함께","대기업 도입 사례가 많음"],["개인보다 기업용"],["청구서 문서 자동 처리","고객 응대 백오피스 업무 자동화"]],
  en: ["A platform that automates business work with RPA and AI agents",["Combines document processing and screen automation","Widely used by large companies"],["Built for businesses rather than individuals"],["Process invoices automatically","Automate back-office customer service tasks"]],
  ja: ["企業業務をRPAとAIエージェントで自動化するプラットフォーム",["文書処理と画面操作の自動化を一緒に","大企業での導入事例が多い"],["個人より企業向け"],["請求書の自動処理","顧客対応のバックオフィス業務を自動化"]],
  zh: ["用RPA和AI智能体自动化企业业务的平台",["文档处理与界面自动化兼备","大企业应用案例多"],["面向企业而非个人"],["自动处理发票","自动化客服后台工作"]]
}, [["Community","$0"],["@ent","quote"]]);
S("Google Workspace Flows", "automation", "nocode", "https://workspace.google.com", "paid", false, {
  ko: ["지메일·드라이브·시트 등 구글 앱 안에서 AI 자동화 흐름을 만드는 기능",["구글 앱끼리 설정 없이 바로 연결","말로 설명하면 흐름 초안을 만들어 줌"],["AI 포함 Google Workspace 요금제가 필요함"],["특정 메일이 오면 내용 요약해 시트에 기록","드라이브 새 파일 알림을 채팅으로"]],
  en: ["Build AI automation flows inside Google apps like Gmail, Drive and Sheets",["Google apps connect with no setup","Describe a flow and get a draft"],["Needs a Google Workspace plan that includes AI"],["Summarize certain emails and log them to a sheet","Post new Drive files to a chat"]],
  ja: ["Gmail・ドライブ・スプレッドシートなどGoogleアプリの中でAI自動化フローを作る機能",["Googleアプリ同士が設定なしですぐつながる","言葉で説明するとフローの下書きを作る"],["AI込みのGoogle Workspaceプランが必要"],["特定のメールが来たら要約してシートに記録","ドライブの新しいファイルをチャットで通知"]],
  zh: ["在Gmail、云端硬盘、表格等谷歌应用中搭建AI自动化流程的功能",["谷歌应用之间无需设置即可连接","用一句话描述即可生成流程草稿"],["需要包含AI的Google Workspace方案"],["收到特定邮件时总结并记录到表格","云端硬盘有新文件时在聊天中通知"]]
}, [["Workspace Business Standard","$14","user"],["Workspace Business Plus","$22","user"]]);

/* ---------- 자동화·AI 에이전트 › 범용 AI 에이전트 ---------- */
S("Claude", "automation", "agents", "https://claude.ai", "mix", true, {
  ko: ["파일과 앱을 다루며 문서·분석 작업을 끝까지 해내는 Anthropic의 AI",["긴 작업을 단계별로 계획하고 완성된 파일로 전달","연결한 업무 앱의 데이터로 작업"],["고급 에이전트 기능은 유료 요금제 중심"],["자료 조사 후 보고서 문서 완성","여러 데이터 파일 분석해 대시보드 만들기"]],
  en: ["Anthropic's AI that works with files and apps to finish document and analysis tasks",["Plans long tasks step by step and hands back finished files","Works with data from connected work apps"],["Advanced agent features are mostly on paid plans"],["Research a topic and deliver a finished report","Analyze several data files and build a dashboard"]],
  ja: ["ファイルやアプリを扱い、文書や分析作業を最後までやり遂げるAnthropicのAI",["長い作業を段階的に計画し、完成したファイルで渡す","連携した業務アプリのデータで作業"],["高度なエージェント機能は主に有料プラン"],["資料を調べて報告書を完成させる","複数のデータファイルを分析してダッシュボード作成"]],
  zh: ["能操作文件和应用、把文档与分析工作做到底的Anthropic AI",["分步规划长任务并交付完成的文件","使用已连接办公应用中的数据工作"],["高级智能体功能以付费方案为主"],["调研后完成报告文档","分析多个数据文件并制作仪表盘"]]
}, [["@free","$0"],["Pro","$20","mo"],["Max","$100","mo"],["Max 20x","$200","mo"],["Team","$30","user"]]);
S("Gemini Agent", "automation", "agents", "https://gemini.google.com", "paid", true, {
  ko: ["구글 앱과 크롬을 오가며 여러 단계 작업을 처리하는 구글의 에이전트",["지메일·캘린더·드라이브와 자연스럽게 연결","웹 작업까지 대신 처리"],["상위 Google AI 유료 요금제가 필요함"],["메일 속 일정 찾아 캘린더에 등록","온라인 예약·주문 준비 맡기기"]],
  en: ["Google's agent that moves between Google apps and Chrome to finish multi-step tasks",["Works naturally with Gmail, Calendar and Drive","Handles web tasks for you"],["Needs a higher-tier paid Google AI plan"],["Find dates in emails and add them to your calendar","Prepare an online booking or order"]],
  ja: ["GoogleアプリとChromeを行き来して複数ステップの作業をこなすGoogleのエージェント",["Gmail・カレンダー・ドライブと自然に連携","Web上の作業も代わりに処理"],["上位の有料Google AIプランが必要"],["メール内の予定を見つけてカレンダーに登録","オンライン予約や注文の準備を任せる"]],
  zh: ["在谷歌应用和Chrome之间切换、处理多步骤任务的谷歌智能体",["与Gmail、日历、云端硬盘自然联动","还能代办网页操作"],["需要更高级的付费Google AI方案"],["从邮件中找出日程并加到日历","交给它准备在线预约或下单"]]
}, [["Google AI Ultra","$249.99","mo"]]);
S("Manus", "automation", "agents", "https://manus.im", "mix", true, {
  ko: ["브라우저와 여러 도구를 써서 조사와 작업을 스스로 끝내는 범용 에이전트",["작업 과정을 실시간으로 보여줌","조사·자료 정리·웹페이지 제작까지 한 번에"],["크레딧 소모가 커서 복잡한 작업은 비용이 듦"],["시장 조사 보고서 만들기","여러 상품 비교표 정리"]],
  en: ["A general agent that uses a browser and tools to finish research and tasks on its own",["Shows its work in real time","Research, organizing and even web pages in one go"],["Heavy credit use makes complex tasks costly"],["Produce a market research report","Compile a comparison table of products"]],
  ja: ["ブラウザやさまざまなツールを使い、調査と作業を自分で終わらせる汎用エージェント",["作業の過程をリアルタイムで見せる","調査・資料整理・Webページ制作まで一度に"],["クレジット消費が大きく複雑な作業は費用がかかる"],["市場調査レポートの作成","複数商品の比較表を整理"]],
  zh: ["使用浏览器和多种工具自主完成调研和任务的通用智能体",["实时展示工作过程","调研、整理资料乃至制作网页一次完成"],["积分消耗大，复杂任务成本高"],["制作市场调研报告","整理多款产品对比表"]]
}, [["@free","$0"],["Starter","$19","mo"]]);
S("Genspark", "automation", "agents", "https://genspark.ai", "mix", false, {
  ko: ["여러 에이전트가 함께 일하고 실제 전화까지 걸어주는 AI 작업 공간",["리서치·슬라이드·시트를 한곳에서","AI가 대신 전화해 예약·문의 가능"],["기능이 많은 만큼 결과 확인이 필요함"],["식당 예약 전화 맡기기","주제 조사 후 발표 자료까지"]],
  en: ["An AI workspace where multiple agents collaborate, and can even place real phone calls",["Research, slides and sheets in one place","AI can call to make bookings or inquiries"],["With so many features, results need checking"],["Have it call a restaurant to book","Research a topic all the way to a slide deck"]],
  ja: ["複数のエージェントが協力し、実際に電話までかけてくれるAIワークスペース",["リサーチ・スライド・シートを一か所で","AIが代わりに電話して予約や問い合わせ"],["機能が多い分、結果の確認が必要"],["レストランの予約電話を任せる","テーマを調べて発表資料まで"]],
  zh: ["多个智能体协作、还能真的帮你打电话的AI工作空间",["调研、幻灯片、表格一站完成","AI可代打电话预约或咨询"],["功能多，结果需要核对"],["让它打电话订餐厅","从调研主题到制作演示文稿"]]
}, [["@free","$0"],["Plus","$24.99","mo"],["Pro","$249.99","mo"]]);
S("Skywork Super Agents", "automation", "agents", "https://skywork.ai", "mix", false, {
  ko: ["문서·슬라이드·시트·웹페이지를 만들어 주는 에이전트 모음",["결과물 형식별로 전문 에이전트 제공","출처를 확인할 수 있는 조사 과정"],["무료 사용량이 적음"],["조사 결과를 문서와 슬라이드로 동시에","데이터 표를 시트로 정리"]],
  en: ["A set of agents that produce docs, slides, sheets and web pages",["A specialist agent for each output format","Research steps with checkable sources"],["Small free allowance"],["Turn research into a doc and slides at once","Organize a data table into a sheet"]],
  ja: ["文書・スライド・シート・Webページを作るエージェント群",["成果物の形式ごとに専門エージェントを提供","出典を確認できる調査プロセス"],["無料枠が少ない"],["調査結果を文書とスライドに同時にまとめる","データ表をシートに整理"]],
  zh: ["可生成文档、幻灯片、表格和网页的一组智能体",["按产出格式提供专门的智能体","调研过程可核对出处"],["免费额度少"],["把调研结果同时做成文档和幻灯片","把数据表整理成表格"]]
}, [["@free","$0"],["@paid",null]]);
S("MiniMax Agent", "automation", "agents", "https://agent.minimax.io", "mix", false, {
  ko: ["긴 작업을 여러 단계로 나눠 수행하는 범용 AI 에이전트",["코딩·조사·콘텐츠 제작 등 다양한 작업","작업 과정을 단계별로 확인 가능"],["한국어 결과물은 다듬기가 필요할 수 있음"],["간단한 웹 앱 만들기","주제 조사 후 요약 보고서"]],
  en: ["A general AI agent that breaks long jobs into steps",["Handles coding, research and content creation","Lets you review each step"],["Non-English output may need polishing"],["Build a simple web app","Research a topic and write a summary report"]],
  ja: ["長い作業を複数のステップに分けて実行する汎用AIエージェント",["コーディング・調査・コンテンツ制作など幅広い作業","作業の過程を段階ごとに確認できる"],["日本語の結果は手直しが必要なことも"],["簡単なWebアプリづくり","テーマを調べて要約レポート作成"]],
  zh: ["把长任务拆成多步执行的通用AI智能体",["可完成编程、调研、内容创作等多种任务","可逐步查看工作过程"],["非英文结果可能需要润色"],["做一个简单的网页应用","调研主题并写摘要报告"]]
}, [["@free","$0"],["@paid",null]]);
S("Flowith", "automation", "agents", "https://flowith.io", "mix", false, {
  ko: ["캔버스형 작업 공간에서 여러 AI 작업을 펼쳐 진행하는 에이전트",["대화를 가지처럼 펼쳐 여러 방향 비교","지식 베이스를 만들어 반복 활용"],["화면 구성이 독특해 적응이 필요함"],["아이디어 여러 갈래로 발전시키기","긴 리서치를 단계별로 진행"]],
  en: ["An agent workspace on a canvas where AI tasks branch out side by side",["Branch conversations to compare directions","Build a knowledge base to reuse"],["The unusual layout takes getting used to"],["Develop an idea in several directions","Run a long research project in stages"]],
  ja: ["キャンバス型のワークスペースで複数のAI作業を広げて進めるエージェント",["会話を枝のように広げて複数の方向を比較","ナレッジベースを作って繰り返し活用"],["画面構成が独特で慣れが必要"],["アイデアをいくつもの方向に発展させる","長いリサーチを段階的に進める"]],
  zh: ["在画布式工作区中并行展开多个AI任务的智能体",["像树枝一样展开对话，比较多个方向","建立知识库反复使用"],["界面独特，需要适应"],["把一个想法朝多个方向发展","分阶段推进长期调研"]]
}, [["@free","$0"],["@paid",null]]);
S("Microsoft 365 Copilot 에이전트", "automation", "agents", "https://microsoft.com/microsoft-365/copilot", "paid", false, {
  ko: ["워드·엑셀·아웃룩·팀즈를 넘나들며 업무를 처리하는 마이크로소프트 에이전트",["회사 메일·문서·회의 데이터를 근거로 작업","조사·분석 전용 에이전트 제공"],["Microsoft 365 Copilot 유료 구독이 필요함"],["지난주 메일과 회의 내용으로 주간 보고 작성","프로젝트 관련 문서 모아 요약"]],
  en: ["Microsoft agents that work across Word, Excel, Outlook and Teams",["Grounded in your company's email, files and meetings","Dedicated research and analysis agents"],["Needs a paid Microsoft 365 Copilot plan"],["Write a weekly report from last week's emails and meetings","Collect and summarize project documents"]],
  ja: ["Word・Excel・Outlook・Teamsをまたいで業務を処理するMicrosoftのエージェント",["会社のメール・文書・会議データを根拠に作業","調査・分析専用のエージェントを提供"],["Microsoft 365 Copilotの有料契約が必要"],["先週のメールと会議内容から週報を作成","プロジェクト関連の文書を集めて要約"]],
  zh: ["在Word、Excel、Outlook、Teams之间处理工作的微软智能体",["以公司邮件、文档、会议数据为依据工作","提供调研和分析专用智能体"],["需要付费订阅Microsoft 365 Copilot"],["根据上周邮件和会议撰写周报","汇总并总结项目相关文档"]]
}, [["Microsoft 365 Copilot","$30","user"]]);

/* ---------- 자동화·AI 에이전트 › AI 브라우저 ---------- */
S("Perplexity Comet", "automation", "browser", "https://perplexity.ai/comet", "free", true, {
  ko: ["검색에 강한 퍼플렉시티의 AI 브라우저, 2026년 3월부터 무료",["탭 내용을 이해하고 요약·비교","검색과 웹 작업을 한 화면에서"],["고급 에이전트 기능은 사용량 제한이 있음"],["열어 둔 여러 기사 한 번에 요약","제품 리뷰 페이지 비교"]],
  en: ["Perplexity's search-focused AI browser, free since March 2026",["Understands, summarizes and compares your tabs","Search and web tasks in one window"],["Advanced agent features have usage limits"],["Summarize several open articles at once","Compare product review pages"]],
  ja: ["検索に強いPerplexityのAIブラウザ。2026年3月から無料",["タブの内容を理解して要約・比較","検索とWeb作業を一つの画面で"],["高度なエージェント機能には利用制限がある"],["開いている複数の記事を一度に要約","製品レビューのページを比較"]],
  zh: ["擅长搜索的Perplexity AI浏览器，2026年3月起免费",["理解标签页内容并总结、比较","搜索和网页操作在同一窗口完成"],["高级智能体功能有用量限制"],["一次总结多篇打开的文章","比较产品评测页面"]]
}, [["@free","$0"]]);
S("Claude in Chrome", "automation", "browser", "https://claude.ai", "paid", false, {
  ko: ["크롬 확장 프로그램으로 내 브라우저에서 웹 작업을 대신하는 Claude",["평소 쓰는 크롬과 로그인 상태 그대로 사용","여러 탭에 걸친 작업을 처리"],["Claude 유료 요금제가 필요함"],["웹 관리자 페이지 반복 입력","여러 사이트에서 정보 모아 정리"]],
  en: ["Claude as a Chrome extension that does web tasks in your own browser",["Uses your usual Chrome and existing sign-ins","Handles work across multiple tabs"],["Requires a paid Claude plan"],["Repetitive entry in a web admin panel","Gather information from several sites"]],
  ja: ["Chrome拡張機能として、自分のブラウザでWeb作業を代行するClaude",["いつものChromeとログイン状態のまま使える","複数のタブにまたがる作業を処理"],["Claudeの有料プランが必要"],["Web管理画面での繰り返し入力","複数のサイトから情報を集めて整理"]],
  zh: ["以Chrome扩展形式在你自己的浏览器中代办网页任务的Claude",["沿用平时的Chrome和登录状态","可处理跨多个标签页的任务"],["需要Claude付费方案"],["在网站后台重复录入","从多个网站收集并整理信息"]]
}, [["Pro","$20","mo"],["Max","$100","mo"]]);
S("Chrome 자동 브라우징 (Gemini)", "automation", "browser", "https://google.com/chrome", "paid", false, {
  ko: ["크롬에 통합된 제미나이가 웹 작업을 대신하는 구글의 기능",["따로 설치 없이 크롬 안에서 사용","구글 계정 서비스와 자연스럽게 연결"],["Google AI 유료 요금제에서 제공"],["온라인 장보기 목록 담기","예약 사이트에서 빈 시간 찾기"]],
  en: ["Google's feature where Gemini in Chrome browses and acts for you",["Works inside Chrome with nothing to install","Connects naturally with your Google account services"],["Offered with paid Google AI plans"],["Add a grocery list to an online cart","Find open slots on a booking site"]],
  ja: ["Chromeに統合されたGeminiがWeb作業を代行するGoogleの機能",["別途インストールなしでChrome内で使える","Googleアカウントのサービスと自然に連携"],["有料のGoogle AIプランで提供"],["ネットスーパーで買い物リストをカートに入れる","予約サイトで空き時間を探す"]],
  zh: ["集成在Chrome中的Gemini代你浏览网页并操作的谷歌功能",["无需另外安装，在Chrome中直接使用","与谷歌账号服务自然联动"],["在付费Google AI方案中提供"],["把购物清单加入网购购物车","在预约网站上查找空档"]]
}, [["Google AI Pro","$19.99","mo"],["Google AI Ultra","$249.99","mo"]]);
S("Dia", "automation", "browser", "https://diabrowser.com", "mix", false, {
  ko: ["열어 둔 탭 내용을 이해하고 대화하는 AI 브라우저",["여러 탭을 함께 참고해 답함","글쓰기와 요약을 브라우저 안에서"],["고급 기능은 유료 구독"],["논문 탭 여러 개 비교 정리","읽던 페이지로 메일 초안 쓰기"]],
  en: ["An AI browser that understands your open tabs and chats about them",["Answers using several tabs together","Writing and summaries right in the browser"],["Advanced features need a subscription"],["Compare several paper tabs","Draft an email from the page you're reading"]],
  ja: ["開いているタブの内容を理解して会話するAIブラウザ",["複数のタブをまとめて参照して答える","文章作成や要約をブラウザ内で"],["高度な機能は有料サブスク"],["論文のタブを複数比較して整理","読んでいたページからメールの下書き"]],
  zh: ["理解已打开标签页内容并与之对话的AI浏览器",["综合多个标签页回答","在浏览器中直接写作和总结"],["高级功能需付费订阅"],["比较整理多个论文标签页","根据正在阅读的页面起草邮件"]]
}, [["@free","$0"],["Pro","$20","mo"]]);
S("Opera Neon", "automation", "browser", "https://operaneon.com", "paid", false, {
  ko: ["작업을 맡기면 브라우저가 알아서 처리하는 오페라의 에이전트 브라우저",["작업 단위로 탭을 묶어 관리","웹에서 하는 반복 작업 대행"],["유료 구독 방식"],["웹 리서치 작업 맡겨 두기","여러 사이트 정보 비교"]],
  en: ["Opera's agentic browser that handles tasks you hand off",["Groups tabs by task","Takes over repetitive web work"],["Subscription only"],["Hand off a web research task","Compare information across sites"]],
  ja: ["作業を任せるとブラウザが自分で処理するOperaのエージェント型ブラウザ",["作業単位でタブをまとめて管理","Webでの繰り返し作業を代行"],["有料サブスク方式"],["Webリサーチを任せておく","複数サイトの情報を比較"]],
  zh: ["交代任务后由浏览器自行处理的Opera智能体浏览器",["按任务分组管理标签页","代办网页上的重复工作"],["付费订阅制"],["把网页调研交给它","比较多个网站的信息"]]
}, [["Subscription","$19.90","mo"]]);
S("Browser Use", "automation", "browser", "https://browser-use.com", "free", false, {
  ko: ["직접 설치해서 쓰는 오픈소스 브라우저 에이전트",["무료 오픈소스로 자유롭게 수정","웹 작업 벤치마크 점수가 높음"],["설치하려면 코딩 지식이 필요함"],["반복적인 웹 데이터 수집 자동화","나만의 웹 작업 에이전트 만들기"]],
  en: ["An open-source browser agent you run yourself",["Free and open source, so you can modify it","High scores on web-task benchmarks"],["Setup requires coding knowledge"],["Automate repetitive web data collection","Build your own web-task agent"]],
  ja: ["自分で導入して使うオープンソースのブラウザエージェント",["無料のオープンソースで自由に改変できる","Web作業のベンチマークで高スコア"],["導入にはコーディングの知識が必要"],["繰り返しのWebデータ収集を自動化","自分だけのWeb作業エージェントづくり"]],
  zh: ["自行部署使用的开源浏览器智能体",["免费开源，可自由修改","网页任务基准测试得分高"],["部署需要编程知识"],["自动化重复的网页数据收集","打造自己的网页任务智能体"]]
}, [["@selfhost","$0"],["Cloud","payg"]]);

/* ---------- 자동화·AI 에이전트 › 에이전트 빌더 ---------- */
S("Zapier Agents", "automation", "builder", "https://zapier.com/agents", "mix", true, {
  ko: ["Zapier의 앱 연동 위에서 나만의 AI 에이전트를 만드는 기능",["수천 개 앱을 에이전트가 바로 사용","말로 설명해 에이전트 생성"],["사용량에 따라 비용이 늘어남"],["문의 메일 분류 후 담당자에게 배정","새 리드 정보 조사해 CRM에 기록"]],
  en: ["Build your own AI agents on top of Zapier's app connections",["Agents can use thousands of apps right away","Create agents by describing them"],["Costs grow with usage"],["Sort inquiry emails and assign them to owners","Research new leads and log them in the CRM"]],
  ja: ["Zapierのアプリ連携の上で自分だけのAIエージェントを作る機能",["数千のアプリをエージェントがすぐ使える","言葉で説明してエージェントを作成"],["利用量に応じて費用が増える"],["問い合わせメールを分類して担当者に割り当て","新しい見込み客を調べてCRMに記録"]],
  zh: ["在Zapier应用连接之上打造专属AI智能体的功能",["智能体可直接使用数千个应用","用一句话描述即可创建智能体"],["费用随用量增加"],["分类咨询邮件并分配给负责人","调研新线索并记录到CRM"]]
}, [["@free","$0"],["@paid",null]]);
S("Lindy", "automation", "builder", "https://lindy.ai", "paid", true, {
  ko: ["말로 설명하면 메일·일정·영업 업무를 맡는 AI 비서를 만들어 주는 빌더",["코딩 없이 대화로 업무 에이전트 생성","웹 클릭까지 하는 브라우저 자동화"],["무료 요금제 없이 체험 후 유료"],["받은 메일 분류와 답장 초안 자동화","미팅 일정 조율 맡기기"]],
  en: ["Describe a job and get an AI assistant for email, scheduling or sales",["Create work agents by chatting, no code","Browser automation that can click on the web"],["No free plan, paid after a trial"],["Auto-sort email and draft replies","Let it schedule meetings"]],
  ja: ["言葉で説明するとメール・予定・営業業務を担うAIアシスタントを作るビルダー",["コーディングなしで会話から業務エージェントを作成","Webのクリックまでするブラウザ自動化"],["無料プランはなく体験後に有料"],["受信メールの分類と返信案を自動化","打ち合わせの日程調整を任せる"]],
  zh: ["用一句话即可创建处理邮件、日程、销售工作的AI助理的构建器",["无需编程，通过对话创建工作智能体","可在网页上点击的浏览器自动化"],["没有免费方案，试用后收费"],["自动分类邮件并起草回复","交给它协调会议时间"]]
}, [["Pro","$29.99","mo"]]);
S("Dify", "automation", "builder", "https://dify.ai", "mix", true, {
  ko: ["LLM 앱과 에이전트를 시각적으로 만드는 오픈소스 플랫폼",["사내 문서를 넣어 답하는 챗봇을 쉽게 제작","직접 설치하면 무료로 사용"],["AI 모델 사용료는 별도로 듦"],["사내 규정 Q&A 챗봇 만들기","고객 문의 자동 응답 앱"]],
  en: ["An open-source platform for building LLM apps and agents visually",["Easily build chatbots that answer from company docs","Free when self-hosted"],["AI model usage is billed separately"],["Build an internal policy Q&A bot","An app that answers customer questions"]],
  ja: ["LLMアプリやエージェントを視覚的に作るオープンソースプラットフォーム",["社内文書を入れて答えるチャットボットを簡単に作れる","自分で導入すれば無料で使える"],["AIモデルの利用料は別途かかる"],["社内規程のQ&Aチャットボットづくり","顧客問い合わせの自動応答アプリ"]],
  zh: ["可视化搭建大模型应用和智能体的开源平台",["轻松做出基于公司文档回答的聊天机器人","自行部署可免费使用"],["AI模型调用费另计"],["搭建内部规章问答机器人","自动回复客户咨询的应用"]]
}, [["@free","$0"],["Professional","$59","mo"],["Team","$159","mo"]]);
S("Copilot Studio", "automation", "builder", "https://microsoft.com/microsoft-copilot/microsoft-copilot-studio", "paid", false, {
  ko: ["기업용 맞춤 에이전트를 만드는 마이크로소프트 도구, 컴퓨터 조작 기능 포함",["회사 데이터와 보안 정책 안에서 에이전트 운영","화면을 직접 조작하는 컴퓨터 사용 기능"],["사용량 기반 과금이라 비용 관리가 필요함"],["사내 IT 헬프데스크 에이전트","레거시 프로그램 입력 자동화"]],
  en: ["Microsoft's tool for building custom enterprise agents, including computer use",["Runs agents within company data and security policies","Computer-use features that operate screens directly"],["Usage-based billing needs cost management"],["An internal IT help-desk agent","Automate data entry in legacy software"]],
  ja: ["企業向けのカスタムエージェントを作るMicrosoftのツール。コンピューター操作機能付き",["会社のデータとセキュリティポリシーの中でエージェントを運用","画面を直接操作するコンピューター利用機能"],["従量課金のため費用管理が必要"],["社内ITヘルプデスクのエージェント","レガシーソフトへの入力を自動化"]],
  zh: ["打造企业定制智能体的微软工具，含电脑操作功能",["在公司数据和安全策略范围内运行智能体","可直接操作屏幕的电脑使用功能"],["按用量计费，需要管控成本"],["内部IT服务台智能体","自动化旧系统录入"]]
}, [["Credits","$200","mo"]]);
S("Google Opal", "automation", "builder", "https://opal.google", "free", false, {
  ko: ["말로 설명하면 작은 AI 앱을 만들어 주는 구글의 실험 서비스",["코딩 없이 몇 분 만에 AI 미니 앱 완성","무료로 사용 가능"],["실험 서비스라 기능과 제공 지역이 바뀔 수 있음"],["자기소개서 첨삭 미니 앱","수업용 퀴즈 생성 앱"]],
  en: ["Google's experimental service that builds small AI apps from a description",["A mini AI app in minutes, no code","Free to use"],["As an experiment, features and availability may change"],["A mini app that critiques cover letters","A quiz generator for class"]],
  ja: ["言葉で説明すると小さなAIアプリを作るGoogleの実験サービス",["コーディングなしで数分でAIミニアプリが完成","無料で使える"],["実験サービスのため機能や提供地域が変わることがある"],["自己PR文の添削ミニアプリ","授業用のクイズ生成アプリ"]],
  zh: ["用一句话描述即可生成小型AI应用的谷歌实验服务",["无需编程，几分钟做出AI小应用","可免费使用"],["作为实验服务，功能和开放地区可能变化"],["求职信批改小应用","课堂用测验生成应用"]]
}, [["@free","$0"]]);
S("Relevance AI", "automation", "builder", "https://relevanceai.com", "paid", false, {
  ko: ["영업·고객 지원용 AI 직원 팀을 구성하는 에이전트 플랫폼",["여러 에이전트를 팀처럼 역할 분담","재사용 가능한 도구 모음"],["무료 요금제가 종료되어 유료로만 사용"],["영업 리드 조사·연락 자동화","고객 문의 1차 응대 에이전트"]],
  en: ["An agent platform for building AI teams for sales and support",["Split roles across several agents like a team","A library of reusable tools"],["The free plan was retired; paid only"],["Automate lead research and outreach","A first-line customer support agent"]],
  ja: ["営業・カスタマーサポート向けのAI社員チームを組むエージェントプラットフォーム",["複数のエージェントでチームのように役割分担","再利用できるツール群"],["無料プランが終了し有料のみ"],["営業リードの調査と連絡を自動化","顧客問い合わせの一次対応エージェント"]],
  zh: ["为销售和客服组建AI员工团队的智能体平台",["多个智能体像团队一样分工","可复用的工具库"],["免费方案已取消，仅可付费使用"],["自动化销售线索调研和联系","客户咨询的一线应答智能体"]]
}, [["@paid","$19~","mo"]]);
S("Dust", "automation", "builder", "https://dust.tt", "paid", false, {
  ko: ["사내 지식을 연결해 슬랙 등에서 쓰는 업무 에이전트를 만드는 플랫폼",["노션·드라이브·슬랙 등 사내 자료를 연결","팀마다 필요한 에이전트를 쉽게 제작"],["무료 체험 후 유료"],["슬랙에서 사내 정책 질문에 답하는 봇","영업 자료를 찾아 주는 에이전트"]],
  en: ["A platform for work agents connected to company knowledge, used in Slack and more",["Connects Notion, Drive, Slack and other internal sources","Each team can easily build the agents it needs"],["Paid after a free trial"],["A Slack bot that answers policy questions","An agent that finds sales materials"]],
  ja: ["社内ナレッジをつなぎ、Slackなどで使う業務エージェントを作るプラットフォーム",["Notion・ドライブ・Slackなど社内資料を連携","チームごとに必要なエージェントを簡単に作成"],["無料体験後は有料"],["Slackで社内規程の質問に答えるボット","営業資料を探してくれるエージェント"]],
  zh: ["连接公司知识、在Slack等处使用的工作智能体平台",["连接Notion、云端硬盘、Slack等内部资料","各团队可轻松打造所需智能体"],["免费试用后收费"],["在Slack中回答公司政策问题的机器人","帮忙查找销售资料的智能体"]]
}, [["Pro","$29","user"]]);
S("Langflow", "automation", "builder", "https://langflow.org", "mix", false, {
  ko: ["AI 워크플로와 에이전트를 시각적으로 설계하는 오픈소스 도구",["다양한 AI 모델과 데이터베이스 연결","만든 흐름을 API로 배포"],["입문자에게는 용어가 어렵게 느껴질 수 있음"],["사내 검색 챗봇 설계","여러 AI 단계를 거치는 문서 처리 흐름"]],
  en: ["An open-source tool for designing AI workflows and agents visually",["Connects many AI models and databases","Deploy flows as APIs"],["Terminology can feel hard for beginners"],["Design an internal search chatbot","A document pipeline with several AI steps"]],
  ja: ["AIワークフローやエージェントを視覚的に設計するオープンソースツール",["さまざまなAIモデルやデータベースと連携","作ったフローをAPIとして公開"],["初心者には用語が難しく感じられることも"],["社内検索チャットボットの設計","複数のAIステップを経る文書処理フロー"]],
  zh: ["可视化设计AI工作流和智能体的开源工具",["连接多种AI模型和数据库","可把流程发布为API"],["对新手来说术语可能较难"],["设计内部搜索聊天机器人","经过多个AI步骤的文档处理流程"]]
}, [["@free","$0"]]);
S("MindPal", "automation", "builder", "https://mindpal.space", "mix", false, {
  ko: ["여러 AI 에이전트를 묶어 업무 흐름을 만드는 노코드 빌더",["에이전트끼리 결과를 넘겨받는 흐름 구성","템플릿으로 빠르게 시작"],["무료 버전은 사용량이 적음"],["블로그 글 기획·작성·검수 흐름","리서치 후 보고서 작성 자동화"]],
  en: ["A no-code builder that chains several AI agents into a workflow",["Agents pass results to one another","Start quickly from templates"],["Small free allowance"],["A blog plan, write and review flow","Automate research followed by a report"]],
  ja: ["複数のAIエージェントをつないで業務フローを作るノーコードビルダー",["エージェント同士が結果を受け渡すフローを構成","テンプレートで素早く始められる"],["無料版は利用量が少ない"],["ブログ記事の企画・執筆・チェックのフロー","リサーチからレポート作成までを自動化"]],
  zh: ["把多个AI智能体串成工作流的无代码构建器",["构建智能体之间传递结果的流程","可用模板快速开始"],["免费版用量少"],["博客文章策划、撰写、审核流程","自动化调研后撰写报告"]]
}, [["@free","$0"],["@paid",null]]);
S("Botpress", "automation", "builder", "https://botpress.com", "mix", false, {
  ko: ["상담·업무용 챗봇 에이전트를 만들어 웹사이트·메신저에 붙이는 플랫폼",["웹사이트·메신저 등 여러 채널에 배포","시각적 편집기로 대화 흐름 설계"],["복잡한 봇은 설계에 시간이 걸림"],["홈페이지 고객 상담 챗봇","예약 접수 챗봇"]],
  en: ["A platform for building chatbot agents and adding them to websites and messengers",["Deploy to websites, messengers and more","Design conversations in a visual editor"],["Complex bots take time to design"],["A customer support chatbot for your site","A booking chatbot"]],
  ja: ["相談・業務用のチャットボットエージェントを作り、Webサイトやメッセンジャーに設置するプラットフォーム",["Webサイトやメッセンジャーなど複数チャネルに展開","ビジュアルエディターで会話フローを設計"],["複雑なボットは設計に時間がかかる"],["ホームページの顧客相談チャットボット","予約受付チャットボット"]],
  zh: ["打造客服和业务聊天机器人并接入网站和即时通讯的平台",["可部署到网站、即时通讯等多个渠道","用可视化编辑器设计对话流程"],["复杂机器人设计耗时"],["网站客服聊天机器人","预约受理聊天机器人"]]
}, [["@free","$0"],["@paid",null]]);
S("Voiceflow", "automation", "builder", "https://voiceflow.com", "mix", false, {
  ko: ["채팅·음성 대화형 에이전트를 팀이 함께 설계하고 배포하는 도구",["대화 흐름을 팀이 함께 설계","음성 상담 에이전트도 제작"],["본격적인 운영 기능은 유료"],["콜센터 음성 안내 에이전트 설계","앱 내 도움말 챗봇"]],
  en: ["A tool for teams to design and deploy chat and voice agents",["Design conversation flows together as a team","Also builds voice support agents"],["Production features are paid"],["Design a voice agent for a call center","An in-app help chatbot"]],
  ja: ["チャット・音声の会話型エージェントをチームで設計・公開するツール",["会話フローをチームで一緒に設計","音声の相談エージェントも制作"],["本格運用の機能は有料"],["コールセンターの音声案内エージェント設計","アプリ内ヘルプのチャットボット"]],
  zh: ["团队共同设计并发布聊天和语音对话智能体的工具",["团队一起设计对话流程","也能制作语音客服智能体"],["正式运营功能收费"],["设计呼叫中心语音导航智能体","应用内帮助聊天机器人"]]
}, [["@free","$0"],["@paid",null]]);
S("Sema4.ai", "automation", "builder", "https://sema4.ai", "paid", false, {
  ko: ["파이썬 액션과 LLM 추론을 결합한 기업용 에이전트 플랫폼",["정해진 규칙과 AI 판단을 함께 사용","기업 데이터 처리에 맞춘 보안"],["기업 계약 중심이고 개발 역량이 필요함"],["재무 문서 검토 에이전트","기업 시스템 간 데이터 정합성 점검"]],
  en: ["An enterprise agent platform combining Python actions with LLM reasoning",["Mixes fixed rules with AI judgment","Security suited to enterprise data"],["Enterprise contracts, and needs developer capacity"],["An agent that reviews finance documents","Check data consistency across company systems"]],
  ja: ["PythonのアクションとLLMの推論を組み合わせた企業向けエージェントプラットフォーム",["決まったルールとAIの判断を併用","企業データの処理に合わせたセキュリティ"],["企業契約中心で開発力が必要"],["財務文書を確認するエージェント","企業システム間のデータ整合性チェック"]],
  zh: ["结合Python动作与大模型推理的企业级智能体平台",["同时使用固定规则和AI判断","面向企业数据处理的安全保障"],["以企业合同为主，需要开发能力"],["审核财务文档的智能体","检查企业系统间的数据一致性"]]
}, [["@paid","$15","day"]]);

/* ---------- 자동화·AI 에이전트 › 사내 업무 에이전트 ---------- */
S("Glean", "automation", "workplace", "https://glean.com", "paid", false, {
  ko: ["사내 모든 앱을 검색하고 에이전트로 업무를 처리하는 기업용 AI",["메일·문서·메신저를 권한에 맞게 통합 검색","사내 데이터 기반 업무 에이전트"],["기업 단위 도입으로 가격이 높음"],["신입 사원 온보딩 질문 응대","프로젝트 히스토리 한 번에 파악"]],
  en: ["Enterprise AI that searches every work app and handles tasks with agents",["Unified search of email, docs and chat, respecting permissions","Work agents grounded in company data"],["Company-wide deployment makes it expensive"],["Answer new-hire onboarding questions","Get the full history of a project at once"]],
  ja: ["社内のあらゆるアプリを検索し、エージェントで業務を処理する企業向けAI",["メール・文書・チャットを権限に沿って統合検索","社内データに基づく業務エージェント"],["企業単位の導入で価格が高い"],["新入社員のオンボーディング質問に対応","プロジェクトの経緯を一度に把握"]],
  zh: ["搜索公司所有应用并用智能体处理工作的企业AI",["按权限统一搜索邮件、文档和即时消息","基于公司数据的工作智能体"],["以企业为单位部署，价格高"],["解答新员工入职问题","一次了解项目全部历史"]]
}, [["@ent","quote"]]);
S("Slack AI", "automation", "workplace", "https://slack.com/ai", "paid", false, {
  ko: ["슬랙 대화를 요약하고 에이전트로 업무를 돕는 슬랙의 AI",["읽지 못한 채널과 스레드를 바로 요약","슬랙 안에서 다양한 에이전트 사용"],["유료 플랜에서 제공"],["휴가 후 밀린 채널 따라잡기","긴 스레드 결론만 확인"]],
  en: ["Slack's AI that summarizes conversations and helps with agents",["Summarizes unread channels and threads instantly","Use many agents right inside Slack"],["Available on paid plans"],["Catch up on channels after a vacation","Get just the conclusion of a long thread"]],
  ja: ["Slackの会話を要約し、エージェントで業務を手伝うSlackのAI",["未読のチャンネルやスレッドをすぐ要約","Slackの中でさまざまなエージェントを使える"],["有料プランで提供"],["休暇明けにたまったチャンネルに追いつく","長いスレッドの結論だけ確認"]],
  zh: ["总结Slack对话并通过智能体协助工作的Slack AI",["即时总结未读频道和讨论串","在Slack中使用多种智能体"],["在付费方案中提供"],["休假后快速跟上频道进度","只看长讨论串的结论"]]
}, [["Slack Business+",null]]);
S("Moveworks", "automation", "workplace", "https://moveworks.com", "paid", false, {
  ko: ["IT·인사 요청을 대화로 처리하는 직원용 AI 에이전트",["비밀번호 초기화 같은 요청을 자동 처리","사내 여러 시스템과 연동"],["대기업 대상 서비스"],["IT 헬프데스크 문의 자동 처리","휴가 신청과 규정 안내"]],
  en: ["An employee AI agent that resolves IT and HR requests by chat",["Handles requests like password resets automatically","Connects to many internal systems"],["Aimed at large enterprises"],["Resolve IT help-desk tickets automatically","Handle leave requests and policy questions"]],
  ja: ["ITや人事の依頼を会話で処理する社員向けAIエージェント",["パスワードリセットなどの依頼を自動処理","社内の複数システムと連携"],["大企業向けサービス"],["ITヘルプデスクの問い合わせを自動処理","休暇申請と規程の案内"]],
  zh: ["通过对话处理IT和人事请求的员工AI智能体",["自动处理重置密码等请求","与公司多个系统集成"],["面向大型企业的服务"],["自动处理IT服务台咨询","请假申请和规章说明"]]
}, [["@ent","quote"]]);
S("ServiceNow AI Agents", "automation", "workplace", "https://servicenow.com", "paid", false, {
  ko: ["기업 업무 흐름을 AI 에이전트가 자동 처리하는 서비스나우의 기능",["IT·고객 서비스 업무 흐름에 바로 적용","사람 승인과 감사 기록 관리"],["서비스나우를 쓰는 기업 대상"],["장애 티켓 분류와 1차 조치","고객 서비스 요청 자동 처리"]],
  en: ["ServiceNow's AI agents that run enterprise workflows automatically",["Plugs straight into IT and customer service workflows","Manages human approvals and audit trails"],["For companies that use ServiceNow"],["Triage incident tickets and take first steps","Resolve customer service requests automatically"]],
  ja: ["企業の業務フローをAIエージェントが自動処理するServiceNowの機能",["ITや顧客サービスの業務フローにすぐ適用","人の承認や監査記録を管理"],["ServiceNowを使う企業向け"],["障害チケットの分類と一次対応","顧客サービス依頼の自動処理"]],
  zh: ["由AI智能体自动处理企业工作流程的ServiceNow功能",["直接应用于IT和客户服务流程","管理人工审批和审计记录"],["面向使用ServiceNow的企业"],["分类故障工单并做初步处理","自动处理客户服务请求"]]
}, [["@ent","quote"]]);
