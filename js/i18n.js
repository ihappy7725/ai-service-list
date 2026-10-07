/* =========================================================
   AI ATLAS · 화면 글자 번역 (한국어 / English / 日本語 / 中文)
   - HTML에서 data-i18n="키" 를 붙이면 그 요소의 글자가 바뀝니다.
   - data-i18n-ph="키" 는 입력창 안내 문구(placeholder)를 바꿉니다.
   - {n} 같은 부분은 숫자로 채워집니다.
   ========================================================= */

const LANGS = [
  { code: "ko", label: "한국어", short: "KO" },
  { code: "en", label: "English", short: "EN" },
  { code: "ja", label: "日本語", short: "JA" },
  { code: "zh", label: "中文", short: "ZH" }
];

const I18N = {
  ko: {
    "meta.title.home": "AI ATLAS · 세상의 모든 AI 툴, 한곳에서",
    "meta.title.tools": "AI 툴 둘러보기 · AI ATLAS",
    "nav.tools": "AI 툴 목록",
    "nav.categories": "분야 소개",
    "nav.features": "기능",
    "nav.trust": "리서치 기준",
    "nav.menu": "메뉴",
    "lang.label": "언어 선택",
    "btn.enter": "입장하기",
    "btn.home": "홈으로",
    "btn.browse": "분야 둘러보기",

    "hero.eyebrow": "분야별 AI 툴 지도",
    "hero.title1": "세상의 모든 AI 툴,",
    "hero.title2": "한곳에서",
    "hero.sub": "{c}개 분야 {n}개 AI 서비스를 검색하고, 비교하고, 바로 써보세요.",

    "cat.eyebrow": "10 CATEGORIES",
    "cat.title": "분야별로 골라보세요",
    "cat.sub": "스크롤하면 분야 카드가 차례로 넘어와요. 카드를 누르면 그 분야의 AI 툴로 이동합니다.",
    "cat.go": "툴 보러가기",
    "cat.count": "서비스 {n}개",

    "feat.eyebrow": "HOW TO READ",
    "feat.title": "카드 한 장에 담은 8가지 정보",
    "feat.sub": "AI ATLAS의 모든 서비스 카드는 같은 8가지 정보로 정리되어 있어요. 아래 Zapier 카드로 하나씩 살펴보세요.",
    "feat.example": "예시",
    "feat.1.label": "서비스 이름 & 로고",
    "feat.1.title": "한눈에 알아보는 얼굴",
    "feat.1.body": "카드 맨 위에는 공식 로고와 서비스 이름이 있어요. 로고는 각 서비스의 공식 사이트에서 자동으로 불러와 늘 최신 모습으로 보이고, 이름 옆 ★는 분야마다 꼭 알아야 할 대표 서비스라는 표시예요.",
    "feat.2.label": "분야",
    "feat.2.title": "어디에 쓰는 도구인지",
    "feat.2.body": "10개 분야와 그 아래 하위 분류가 태그로 붙어 있어요. 분야 칩과 하위 분류 칩을 누르면 같은 일을 하는 서비스끼리 모아서 비교할 수 있어요.",
    "feat.3.label": "한 줄 소개",
    "feat.3.title": "한 문장으로 끝나는 설명",
    "feat.3.body": "서비스가 무엇을 해주는지 한 문장으로 적었어요. 이름을 몰라도 검색창에 '회의록', '번역'처럼 하고 싶은 일을 입력하면 이 문장에서 찾아 줘요.",
    "feat.4.label": "주소(URL)",
    "feat.4.title": "검증된 공식 사이트로 바로",
    "feat.4.body": "AI 서비스는 이름이 비슷한 유사 사이트가 많아서, 공식 주소인지 확인한 링크만 연결했어요. 카드를 누르면 새 탭으로 열려 보던 목록을 잃지 않아요.",
    "feat.5.label": "요금",
    "feat.5.title": "결제 전에 먼저 확인",
    "feat.5.body": "무료는 초록, 무료+유료는 보라, 유료는 주황 배지로 구분해요. 자세히를 펼치면 무료·Pro·Max처럼 플랜별 가격까지 한 번에 비교할 수 있어요.",
    "feat.6.label": "장점",
    "feat.6.title": "이 서비스를 고르는 이유",
    "feat.6.body": "같은 분야의 다른 서비스와 비교했을 때 두드러지는 강점을 추렸어요. 기능을 나열하지 않고, 왜 이 서비스를 골라야 하는지에 답해요.",
    "feat.7.label": "아쉬운 점",
    "feat.7.title": "써보기 전에 알아둘 한계",
    "feat.7.body": "광고에는 나오지 않는 부분을 솔직하게 적었어요. 무료 한도, 한국어 지원, 가격 부담처럼 실제로 써볼 때 부딪히는 점들이에요.",
    "feat.8.label": "추천 용도",
    "feat.8.title": "이럴 때 쓰세요",
    "feat.8.body": "막연한 설명 대신 바로 따라 해볼 수 있는 구체적인 상황을 적었어요. 내 상황과 겹치는 예시가 있다면 그 서비스부터 써보세요.",

    "stats.services": "AI 서비스",
    "stats.categories": "분야",
    "stats.subs": "하위 분류",
    "stats.langs": "지원 언어",
    "stats.date": "2026년 10월 기준",

    "trust.eyebrow": "OUR STANDARD",
    "trust.title": "믿고 볼 수 있는 리스트",
    "trust.1.title": "2026년 공개 자료로 리서치",
    "trust.1.body": "서비스별 공식 사이트와 2026년 비교·리뷰 자료를 함께 확인해 정리했어요.",
    "trust.2.title": "종료된 서비스는 뺐어요",
    "trust.2.body": "Sora 앱(2026년 4월 종료), Project Mariner(2026년 5월 종료)처럼 문을 닫은 서비스는 목록에서 제외했어요.",
    "trust.3.title": "요금은 공식 페이지 기준",
    "trust.3.body": "요금 배지는 각 서비스의 공식 요금 페이지를 기준으로 분류했어요. 요금은 자주 바뀌니 결제 전에 한 번 더 확인하세요.",

    "cta.eyebrow": "START NOW",
    "cta.title": "나에게 맞는 AI를 지금 찾아보세요",
    "cta.sub": "분야별로 걸러 보고, 마음에 드는 서비스는 바로 써보세요.",

    "footer.about": "AI ATLAS는 분야별로 꼭 알아야 할 AI 서비스를 모아 소개하는 사이트입니다.",
    "footer.menu": "바로가기",
    "footer.info": "안내",
    "footer.note1": "요금과 기능은 2026년 10월 기준이며 바뀔 수 있습니다.",
    "footer.note2": "각 로고와 상표는 해당 회사의 소유입니다.",

    "tools.eyebrow": "AI TOOLS",
    "tools.title": "AI 툴 둘러보기",
    "tools.sub": "분야별로 걸러 보고, 카드를 누르면 공식 사이트가 새 탭으로 열려요. 자세히를 펼치면 플랜별 가격까지 볼 수 있어요.",
    "search.ph": "이름이나 하고 싶은 일 (예: 회의록)",
    "search.clear": "검색어 지우기",
    "filter.cat": "분야",
    "filter.sub": "하위 분류",
    "filter.price": "요금",
    "filter.all": "전체",
    "price.free": "무료",
    "price.mix": "무료+유료",
    "price.paid": "유료",
    "result.count": "{n}개",
    "result.all": "전체 분야",
    "card.more": "자세히",
    "card.less": "접기",
    "card.pros": "장점",
    "card.cons": "아쉬운 점",
    "card.uses": "추천 용도",
    "card.star": "꼭 알아야 할 대표 서비스",
    "card.open": "새 탭에서 열기",
    "plan.title": "요금 플랜",
    "plan.note": "2026년 기준 대표 가격이며 연간 결제 시 더 저렴할 수 있어요",
    "plan.link": "공식 사이트에서 최신 요금 확인",
    "plan.check": "공식 사이트 확인",
    "plan.payg": "사용량만큼",
    "plan.quote": "도입 문의",
    "plan.incl": "요금제에 포함",
    "plan.mo": "/월", "plan.yr": "/년", "plan.user": "/인·월", "plan.once": " 1회 구매", "plan.day": "/일",
    "plan.free": "무료", "plan.paid": "유료 플랜", "plan.ent": "기업용", "plan.device": "기기", "plan.selfhost": "직접 설치",
    "empty.title": "조건에 맞는 서비스가 없어요",
    "empty.body": "검색어를 바꾸거나 필터를 해제해 보세요.",
    "empty.reset": "필터 초기화"
  },

  en: {
    "meta.title.home": "AI ATLAS · Every AI tool in one place",
    "meta.title.tools": "Browse AI Tools · AI ATLAS",
    "nav.tools": "AI Tools",
    "nav.categories": "Categories",
    "nav.features": "Features",
    "nav.trust": "Our Standard",
    "nav.menu": "Menu",
    "lang.label": "Choose language",
    "btn.enter": "Enter",
    "btn.home": "Home",
    "btn.browse": "Browse categories",

    "hero.eyebrow": "A map of AI tools by field",
    "hero.title1": "Every AI tool",
    "hero.title2": "in one place",
    "hero.sub": "Search, compare and try {n} AI services across {c} categories.",

    "cat.eyebrow": "10 CATEGORIES",
    "cat.title": "Pick a category",
    "cat.sub": "Scroll and the category cards roll past one by one. Click a card to see its AI tools.",
    "cat.go": "See tools",
    "cat.count": "{n} services",

    "feat.eyebrow": "HOW TO READ",
    "feat.title": "Eight things on every card",
    "feat.sub": "Every service card in AI ATLAS follows the same eight fields. Walk through them with the Zapier card.",
    "feat.example": "Example",
    "feat.1.label": "Name & logo",
    "feat.1.title": "Recognize it at a glance",
    "feat.1.body": "Each card starts with the official logo and the service name. Logos load from each official site, so they always stay current. A ★ next to the name marks a must-know service in its category.",
    "feat.2.label": "Category",
    "feat.2.title": "What it is for",
    "feat.2.body": "Each service is tagged with one of 10 categories and a subcategory. Tap the category and subcategory chips to compare services that do the same job.",
    "feat.3.label": "One-line summary",
    "feat.3.title": "Explained in one sentence",
    "feat.3.body": "One sentence says what the service does for you. Even if you don't know a name, type the task you want, like \"meeting notes\" or \"translate\", and search finds it here.",
    "feat.4.label": "Address (URL)",
    "feat.4.title": "Straight to the official site",
    "feat.4.body": "Many AI services have look-alike sites, so we only link to verified official addresses. Cards open in a new tab, so you never lose your list.",
    "feat.5.label": "Pricing",
    "feat.5.title": "Check before you pay",
    "feat.5.body": "Green means free, purple means a free plan plus paid plans, orange means paid. Open Details to compare every plan, like Free, Pro and Max, with its price.",
    "feat.6.label": "Strengths",
    "feat.6.title": "Why you would pick it",
    "feat.6.body": "We picked the strengths that stand out against other services in the same category. Not a feature list, but the reason to choose this one.",
    "feat.7.label": "Drawbacks",
    "feat.7.title": "Limits to know first",
    "feat.7.body": "We wrote down what the ads leave out: free-plan limits, language support and cost. These are the things you run into once you start using it.",
    "feat.8.label": "Best for",
    "feat.8.title": "Use it when…",
    "feat.8.body": "Instead of vague claims, we list concrete situations you can try right away. If one matches what you need, start with that service.",

    "stats.services": "AI services",
    "stats.categories": "Categories",
    "stats.subs": "Subcategories",
    "stats.langs": "Languages",
    "stats.date": "As of October 2026",

    "trust.eyebrow": "OUR STANDARD",
    "trust.title": "A list you can trust",
    "trust.1.title": "Researched from 2026 sources",
    "trust.1.body": "We checked each official site together with 2026 comparisons and reviews.",
    "trust.2.title": "Discontinued services removed",
    "trust.2.body": "Services that shut down, such as the Sora app (April 2026) and Project Mariner (May 2026), are not listed.",
    "trust.3.title": "Pricing from official pages",
    "trust.3.body": "Pricing badges follow each service's official pricing page. Prices change often, so check again before paying.",

    "cta.eyebrow": "START NOW",
    "cta.title": "Find the AI that fits you",
    "cta.sub": "Filter by category and price, then try the service you like right away.",

    "footer.about": "AI ATLAS collects the AI services worth knowing in every field.",
    "footer.menu": "Shortcuts",
    "footer.info": "Notice",
    "footer.note1": "Pricing and features are as of October 2026 and may change.",
    "footer.note2": "All logos and trademarks belong to their respective owners.",

    "tools.eyebrow": "AI TOOLS",
    "tools.title": "Browse AI tools",
    "tools.sub": "Filter by category. Click a card to open the official site in a new tab, or open Details to see every plan and price.",
    "search.ph": "Name or task (e.g. meeting notes)",
    "search.clear": "Clear search",
    "filter.cat": "Category",
    "filter.sub": "Subcategory",
    "filter.price": "Price",
    "filter.all": "All",
    "price.free": "Free",
    "price.mix": "Free + Paid",
    "price.paid": "Paid",
    "result.count": "{n}",
    "result.all": "All categories",
    "card.more": "Details",
    "card.less": "Close",
    "card.pros": "Strengths",
    "card.cons": "Drawbacks",
    "card.uses": "Best for",
    "card.star": "Must-know service",
    "card.open": "Open in new tab",
    "plan.title": "Plans & pricing",
    "plan.note": "Typical 2026 prices; annual billing is often cheaper",
    "plan.link": "Check current pricing",
    "plan.check": "See official site",
    "plan.payg": "Pay as you go",
    "plan.quote": "Contact sales",
    "plan.incl": "Included in plan",
    "plan.mo": "/mo", "plan.yr": "/yr", "plan.user": "/user/mo", "plan.once": " one-time", "plan.day": "/day",
    "plan.free": "Free", "plan.paid": "Paid plans", "plan.ent": "Enterprise", "plan.device": "Device", "plan.selfhost": "Self-hosted",
    "empty.title": "No services match",
    "empty.body": "Try another search term or clear the filters.",
    "empty.reset": "Reset filters"
  },

  ja: {
    "meta.title.home": "AI ATLAS · 世界中のAIツールを、ひとつの場所に",
    "meta.title.tools": "AIツール一覧 · AI ATLAS",
    "nav.tools": "AIツール一覧",
    "nav.categories": "分野紹介",
    "nav.features": "機能",
    "nav.trust": "調査基準",
    "nav.menu": "メニュー",
    "lang.label": "言語を選択",
    "btn.enter": "入場する",
    "btn.home": "ホームへ",
    "btn.browse": "分野を見る",

    "hero.eyebrow": "分野別AIツールマップ",
    "hero.title1": "世界中のAIツールを、",
    "hero.title2": "ひとつの場所に",
    "hero.sub": "{c}分野・{n}個のAIサービスを検索して、比べて、すぐに使ってみましょう。",

    "cat.eyebrow": "10 CATEGORIES",
    "cat.title": "分野から選んでください",
    "cat.sub": "スクロールすると分野カードが順番に流れてきます。カードを押すとその分野のAIツールへ移動します。",
    "cat.go": "ツールを見る",
    "cat.count": "サービス{n}個",

    "feat.eyebrow": "HOW TO READ",
    "feat.title": "カード1枚に8つの情報",
    "feat.sub": "AI ATLASのサービスカードは、すべて同じ8つの情報で整理されています。Zapierのカードで順番に見てみましょう。",
    "feat.example": "例",
    "feat.1.label": "サービス名とロゴ",
    "feat.1.title": "ひと目でわかる顔",
    "feat.1.body": "カードの一番上には公式ロゴとサービス名があります。ロゴは各公式サイトから自動で読み込むので、いつも最新の状態です。名前の横の★は、その分野で必ず知っておきたい代表的なサービスの印です。",
    "feat.2.label": "分野",
    "feat.2.title": "何に使うツールか",
    "feat.2.body": "10の分野とその下の小分類がタグで付いています。分野チップと小分類チップを押すと、同じ仕事をするサービスだけを集めて比べられます。",
    "feat.3.label": "ひとこと紹介",
    "feat.3.title": "一文でわかる説明",
    "feat.3.body": "そのサービスが何をしてくれるのかを一文で書きました。名前を知らなくても「議事録」「翻訳」のようにやりたいことを入力すれば、この文から探し出します。",
    "feat.4.label": "アドレス(URL)",
    "feat.4.title": "確認済みの公式サイトへ直行",
    "feat.4.body": "AIサービスには名前の似た類似サイトが多いため、公式アドレスであることを確認したリンクだけをつなぎました。カードは新しいタブで開くので、一覧を見失いません。",
    "feat.5.label": "料金",
    "feat.5.title": "支払う前にまず確認",
    "feat.5.body": "無料は緑、無料+有料は紫、有料はオレンジのバッジで区別します。「詳しく」を開くと、Free・Pro・Maxのようなプラン別の価格までまとめて比べられます。",
    "feat.6.label": "長所",
    "feat.6.title": "このサービスを選ぶ理由",
    "feat.6.body": "同じ分野のほかのサービスと比べて際立つ強みをまとめました。機能の羅列ではなく、なぜこれを選ぶのかに答えます。",
    "feat.7.label": "惜しい点",
    "feat.7.title": "使う前に知っておきたい限界",
    "feat.7.body": "広告には出てこない部分を正直に書きました。無料枠、日本語対応、価格の負担など、実際に使うとぶつかるポイントです。",
    "feat.8.label": "おすすめの使い方",
    "feat.8.title": "こんなときに使おう",
    "feat.8.body": "あいまいな説明ではなく、すぐに試せる具体的な場面を書きました。自分の状況に近い例があれば、そのサービスから使ってみましょう。",

    "stats.services": "AIサービス",
    "stats.categories": "分野",
    "stats.subs": "小分類",
    "stats.langs": "対応言語",
    "stats.date": "2026年10月時点",

    "trust.eyebrow": "OUR STANDARD",
    "trust.title": "信頼して見られるリスト",
    "trust.1.title": "2026年の公開資料で調査",
    "trust.1.body": "各サービスの公式サイトと、2026年の比較・レビュー資料をあわせて確認しました。",
    "trust.2.title": "終了したサービスは除外",
    "trust.2.body": "Soraアプリ(2026年4月終了)やProject Mariner(2026年5月終了)のように提供を終えたサービスは掲載していません。",
    "trust.3.title": "料金は公式ページ基準",
    "trust.3.body": "料金バッジは各サービスの公式料金ページを基準に分類しました。料金はよく変わるので、支払う前にもう一度確認してください。",

    "cta.eyebrow": "START NOW",
    "cta.title": "自分に合うAIを今すぐ見つけよう",
    "cta.sub": "分野と料金で絞り込み、気になるサービスはすぐに試してみましょう。",

    "footer.about": "AI ATLASは、分野ごとに知っておきたいAIサービスを集めて紹介するサイトです。",
    "footer.menu": "ショートカット",
    "footer.info": "ご案内",
    "footer.note1": "料金と機能は2026年10月時点のもので、変わる場合があります。",
    "footer.note2": "各ロゴと商標はそれぞれの企業に帰属します。",

    "tools.eyebrow": "AI TOOLS",
    "tools.title": "AIツール一覧",
    "tools.sub": "分野で絞り込めます。カードを押すと公式サイトが新しいタブで開き、「詳しく」でプラン別の価格まで見られます。",
    "search.ph": "名前ややりたいこと(例: 議事録)",
    "search.clear": "検索語を消す",
    "filter.cat": "分野",
    "filter.sub": "小分類",
    "filter.price": "料金",
    "filter.all": "すべて",
    "price.free": "無料",
    "price.mix": "無料+有料",
    "price.paid": "有料",
    "result.count": "{n}件",
    "result.all": "すべての分野",
    "card.more": "詳しく",
    "card.less": "閉じる",
    "card.pros": "長所",
    "card.cons": "惜しい点",
    "card.uses": "おすすめの使い方",
    "card.star": "必ず知っておきたい代表サービス",
    "card.open": "新しいタブで開く",
    "plan.title": "料金プラン",
    "plan.note": "2026年時点の代表的な価格です。年払いだと安くなる場合があります",
    "plan.link": "公式サイトで最新料金を確認",
    "plan.check": "公式サイトで確認",
    "plan.payg": "従量課金",
    "plan.quote": "要問い合わせ",
    "plan.incl": "プランに含む",
    "plan.mo": "/月", "plan.yr": "/年", "plan.user": "/人・月", "plan.once": " 買い切り", "plan.day": "/日",
    "plan.free": "無料", "plan.paid": "有料プラン", "plan.ent": "エンタープライズ", "plan.device": "本体", "plan.selfhost": "セルフホスト",
    "empty.title": "条件に合うサービスがありません",
    "empty.body": "検索語を変えるか、フィルターを解除してみてください。",
    "empty.reset": "フィルターをリセット"
  },

  zh: {
    "meta.title.home": "AI ATLAS · 全世界的AI工具，尽在一处",
    "meta.title.tools": "浏览AI工具 · AI ATLAS",
    "nav.tools": "AI工具列表",
    "nav.categories": "领域介绍",
    "nav.features": "功能",
    "nav.trust": "调研标准",
    "nav.menu": "菜单",
    "lang.label": "选择语言",
    "btn.enter": "立即进入",
    "btn.home": "返回首页",
    "btn.browse": "浏览领域",

    "hero.eyebrow": "按领域整理的AI工具地图",
    "hero.title1": "全世界的AI工具，",
    "hero.title2": "尽在一处",
    "hero.sub": "搜索、比较并立即试用{c}个领域的{n}款AI服务。",

    "cat.eyebrow": "10 CATEGORIES",
    "cat.title": "按领域挑选",
    "cat.sub": "向下滚动，领域卡片会依次划过。点击卡片即可查看该领域的AI工具。",
    "cat.go": "查看工具",
    "cat.count": "{n}款服务",

    "feat.eyebrow": "HOW TO READ",
    "feat.title": "一张卡片，八项信息",
    "feat.sub": "AI ATLAS的每张服务卡片都按相同的八项信息整理。下面用Zapier的卡片逐一说明。",
    "feat.example": "示例",
    "feat.1.label": "服务名称与标志",
    "feat.1.title": "一眼认出",
    "feat.1.body": "卡片最上方是官方标志和服务名称。标志会从各服务的官网自动加载，始终保持最新。名称旁的★表示该领域必须了解的代表性服务。",
    "feat.2.label": "领域",
    "feat.2.title": "用来做什么",
    "feat.2.body": "每项服务都标有10个领域之一及其下的细分类别。点击领域标签和细分标签，即可把做同一件事的服务放在一起比较。",
    "feat.3.label": "一句话介绍",
    "feat.3.title": "一句话说清楚",
    "feat.3.body": "用一句话写明这项服务能为你做什么。即使不知道名称，只要在搜索框输入\"会议记录\"\"翻译\"等想做的事，也能从这句话中找到。",
    "feat.4.label": "网址(URL)",
    "feat.4.title": "直达经过确认的官网",
    "feat.4.body": "AI服务常有名称相似的仿冒网站，因此我们只链接经过确认的官方网址。卡片会在新标签页中打开，不会丢失当前列表。",
    "feat.5.label": "价格",
    "feat.5.title": "付费前先确认",
    "feat.5.body": "绿色表示免费，紫色表示免费+付费，橙色表示付费。展开「详情」即可一次比较免费版、Pro、Max等各方案的价格。",
    "feat.6.label": "优点",
    "feat.6.title": "选择它的理由",
    "feat.6.body": "我们挑出了与同领域其他服务相比最突出的优势。不是罗列功能，而是回答为什么要选它。",
    "feat.7.label": "不足",
    "feat.7.title": "使用前应了解的局限",
    "feat.7.body": "我们如实写下了广告里不会提到的部分，例如免费额度、中文支持和价格负担，这些都是实际使用时会遇到的问题。",
    "feat.8.label": "推荐用途",
    "feat.8.title": "这种时候用它",
    "feat.8.body": "我们没有写空泛的描述，而是列出马上就能照着做的具体场景。如果有与你情况相近的例子，就先从这项服务开始吧。",

    "stats.services": "款AI服务",
    "stats.categories": "个领域",
    "stats.subs": "个细分类别",
    "stats.langs": "种语言",
    "stats.date": "截至2026年10月",

    "trust.eyebrow": "OUR STANDARD",
    "trust.title": "值得信赖的清单",
    "trust.1.title": "依据2026年公开资料调研",
    "trust.1.body": "我们同时核对了各服务官网以及2026年的比较与评测资料。",
    "trust.2.title": "已停止的服务不收录",
    "trust.2.body": "像Sora应用(2026年4月停止)和Project Mariner(2026年5月停止)这样已关闭的服务，不在列表中。",
    "trust.3.title": "价格以官方页面为准",
    "trust.3.body": "价格标签依据各服务的官方价格页面分类。价格经常变化，付费前请再次确认。",

    "cta.eyebrow": "START NOW",
    "cta.title": "现在就找到适合你的AI",
    "cta.sub": "按领域和价格筛选，看中的服务马上就能试用。",

    "footer.about": "AI ATLAS汇集并介绍各领域必须了解的AI服务。",
    "footer.menu": "快捷链接",
    "footer.info": "说明",
    "footer.note1": "价格和功能截至2026年10月，可能会有变动。",
    "footer.note2": "各标志与商标归各自公司所有。",

    "tools.eyebrow": "AI TOOLS",
    "tools.title": "浏览AI工具",
    "tools.sub": "按领域筛选，点击卡片会在新标签页打开官网，展开「详情」可查看各方案价格。",
    "search.ph": "名称或想做的事(例: 会议记录)",
    "search.clear": "清除搜索",
    "filter.cat": "领域",
    "filter.sub": "细分类别",
    "filter.price": "价格",
    "filter.all": "全部",
    "price.free": "免费",
    "price.mix": "免费+付费",
    "price.paid": "付费",
    "result.count": "{n}款",
    "result.all": "全部领域",
    "card.more": "详情",
    "card.less": "收起",
    "card.pros": "优点",
    "card.cons": "不足",
    "card.uses": "推荐用途",
    "card.star": "必须了解的代表服务",
    "card.open": "在新标签页打开",
    "plan.title": "价格方案",
    "plan.note": "以下为2026年的代表性价格，按年付费通常更便宜",
    "plan.link": "前往官网查看最新价格",
    "plan.check": "见官网",
    "plan.payg": "按量付费",
    "plan.quote": "需咨询",
    "plan.incl": "包含在套餐内",
    "plan.mo": "/月", "plan.yr": "/年", "plan.user": "/人·月", "plan.once": " 一次性", "plan.day": "/天",
    "plan.free": "免费", "plan.paid": "付费方案", "plan.ent": "企业版", "plan.device": "设备", "plan.selfhost": "自行部署",
    "empty.title": "没有符合条件的服务",
    "empty.body": "请换个关键词，或清除筛选条件。",
    "empty.reset": "重置筛选"
  }
};

/* ---------- 언어 상태 ---------- */
const LANG_KEY = "ai-atlas-lang";

function getLang() {
  let saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
  if (saved && I18N[saved]) return saved;
  const nav = (navigator.language || "ko").slice(0, 2);
  return I18N[nav] ? nav : "ko";
}

let currentLang = getLang();

/* 키로 번역문 가져오기. vars = { n: 117 } 처럼 넘기면 {n}을 바꿔 줍니다. */
function t(key, vars) {
  let s = (I18N[currentLang] && I18N[currentLang][key]) ?? I18N.ko[key] ?? key;
  if (vars) for (const k in vars) s = s.replaceAll("{" + k + "}", vars[k]);
  return s;
}

/* 서비스 데이터처럼 { ko, en, ja, zh } 형태로 된 값에서 현재 언어 꺼내기 */
function pick(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[currentLang] ?? obj.ko ?? "";
}

/* 일본어·중국어 글꼴은 필요할 때만 불러오기 */
function loadLangFont(lang) {
  const fonts = {
    ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800&display=swap",
    zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;800&display=swap"
  };
  if (!fonts[lang] || document.getElementById("font-" + lang)) return;
  const link = document.createElement("link");
  link.id = "font-" + lang;
  link.rel = "stylesheet";
  link.href = fonts[lang];
  document.head.appendChild(link);
}

/* 화면의 data-i18n 요소 전부 바꾸기 */
function applyI18n(root = document) {
  document.documentElement.lang = currentLang;
  root.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n, el.dataset.i18nVars ? JSON.parse(el.dataset.i18nVars) : undefined);
  });
  root.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  root.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  const titleKey = document.body.dataset.titleKey;
  if (titleKey) document.title = t(titleKey);
  const cur = LANGS.find(l => l.code === currentLang);
  document.querySelectorAll(".lang-current").forEach(el => { el.textContent = cur.short; });
  document.querySelectorAll(".lang-menu [data-lang]").forEach(el => {
    el.setAttribute("aria-checked", el.dataset.lang === currentLang ? "true" : "false");
  });
}

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  loadLangFont(lang);
  applyI18n();
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

/* ---------- 공통 상단바 (언어 메뉴, 모바일 메뉴, 스크롤 시 배경) ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // 언어 메뉴
  const langBtn = header.querySelector(".lang-btn");
  const langMenu = header.querySelector(".lang-menu");
  langMenu.innerHTML = LANGS.map(l =>
    `<li><button type="button" role="menuitemradio" data-lang="${l.code}">${l.label}</button></li>`).join("");
  const closeLang = () => { langMenu.hidden = true; langBtn.setAttribute("aria-expanded", "false"); };
  langBtn.addEventListener("click", e => {
    e.stopPropagation();
    const open = langMenu.hidden;
    langMenu.hidden = !open;
    langBtn.setAttribute("aria-expanded", String(open));
  });
  langMenu.addEventListener("click", e => {
    const b = e.target.closest("[data-lang]");
    if (!b) return;
    setLang(b.dataset.lang);
    closeLang();
  });
  document.addEventListener("click", closeLang);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLang(); });

  // 모바일 메뉴
  const menuBtn = header.querySelector(".menu-btn");
  const nav = header.querySelector(".main-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", e => {
      if (e.target.closest("a")) { header.classList.remove("nav-open"); menuBtn.setAttribute("aria-expanded", "false"); }
    });
  }
}

/* ---------- 공통: 떠다니는 3D 아이콘 ----------
   아이콘마다 가로·세로 진동 속도를 다르게 줘서(리사주 곡선)
   각자 다른 궤적을 그리며 둥둥 떠다니게 합니다. */
function startFloaters() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const imgs = [...document.querySelectorAll(".floater img")];
  if (!imgs.length) return;
  const params = imgs.map((img, i) => ({
    img,
    ax: 24 + (i * 7) % 18,            // 가로 흔들림 폭(px)
    ay: 20 + (i * 11) % 16,           // 세로 흔들림 폭(px)
    fx: 0.21 + (i % 4) * 0.055,       // 가로 속도
    fy: 0.29 + (i % 3) * 0.065,       // 세로 속도
    px: i * 1.7, py: i * 2.3,         // 시작 위치
    rot: 5 + (i % 3) * 2.5            // 기울어짐 정도(도)
  }));
  const visible = new Set();
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
  });
  document.querySelectorAll(".floaters").forEach(el => io.observe(el));

  const tick = now => {
    const t = now / 1000;
    params.forEach(p => {
      if (!visible.has(p.img.closest(".floaters"))) return;
      const x = p.ax * Math.sin(t * p.fx + p.px);
      const y = p.ay * Math.sin(t * p.fy + p.py) + p.ay * .35 * Math.sin(t * p.fx * 2.1 + p.py);
      const r = p.rot * Math.sin(t * (p.fx + p.fy) * .5 + p.px);
      p.img.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${r.toFixed(2)}deg)`;
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", () => {
  loadLangFont(currentLang);
  initHeader();
  applyI18n();
  setTimeout(startFloaters, 0); // 페이지별 스크립트가 아이콘을 그린 다음에 시작
});
