/* =========================================================
   AI ATLAS · AI 툴 페이지 동작
   - 1단 분야 칩 → 2단 하위 분류 칩 (덜 강조)
   - 검색 (이름·소개·분야·추천 용도) + [필터] 버튼 → 펼침 패널 (요금·언어·사용 방식·정렬 등)
   - 카드 클릭: 공식 사이트 새 탭 / 자세히: 카드 안에서 펼치기
   - 하트: 내 AI 툴(즐겨찾기)
   - 주소: #automation, #automation/nocode, #my(내 AI 툴), #set-student(추천 세트)
   ========================================================= */

const F_DEFAULT = { price: "any", cheap: false, ko: false, kr: false, use: "any", star: false, fav: false };
const state = { view: "all", cat: "all", sub: "all", q: "", f: { ...F_DEFAULT }, sort: "rec" };
const openCards = new Set();
let filterOpen = false;

/* 필터 패널 구성 (type: one = 하나만 고르기, tog = 켜고 끄기) */
const FILTER_GROUPS = [
  { id: "price", title: "filter.g.price", items: [
    { f: "price", v: "any",      label: "filter.any" },
    { f: "price", v: "free",     label: "filter.price.free" },
    { f: "price", v: "freemium", label: "filter.price.freemium" },
    { f: "price", v: "paid",     label: "filter.price.paid" },
    { f: "cheap", v: true,       label: "filter.cheap", tog: true }
  ]},
  { id: "lang", title: "filter.g.lang", items: [
    { f: "ko", v: true, label: "filter.ko", tog: true },
    { f: "kr", v: true, label: "filter.kr", tog: true }
  ]},
  { id: "use", title: "filter.g.use", items: [
    { f: "use", v: "any",     label: "filter.any" },
    { f: "use", v: "web",     label: "filter.use.web" },
    { f: "use", v: "install", label: "filter.use.install" }
  ]},
  { id: "more", title: "filter.g.more", items: [
    { f: "star", v: true, label: "filter.star", tog: true },
    { f: "fav",  v: true, label: "filter.fav",  tog: true }
  ]},
  { id: "sort", title: "filter.g.sort", items: [
    { f: "sort", v: "rec",  label: "sort.rec" },
    { f: "sort", v: "free", label: "sort.free" },
    { f: "sort", v: "name", label: "sort.name" }
  ]}
];

/* 월 $10(₩15,000·€10) 이하 유료 플랜이 있는지 */
function hasCheapPlan(s) {
  return (s.plans || []).some(p => {
    const price = p[1];
    if (typeof price !== "string") return false;
    const n = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (!n) return false;
    if (price.includes("₩")) return n <= 15000;
    return n <= 10;
  });
}

function passFilters(s) {
  const f = state.f;
  if (f.price === "free" && s.price !== "free") return false;
  if (f.price === "freemium" && s.price === "paid") return false;
  if (f.price === "paid" && s.price !== "paid") return false;
  if (f.cheap && !hasCheapPlan(s)) return false;
  if (f.ko && !KO_FRIENDLY.has(s.name)) return false;
  if (f.kr && !KOREAN_MADE.has(s.name)) return false;
  if (f.use === "web" && NEEDS_INSTALL.has(s.name)) return false;
  if (f.use === "install" && !NEEDS_INSTALL.has(s.name)) return false;
  if (f.star && !s.star) return false;
  if (f.fav && !Fav.has(svcKey(s))) return false;
  return true;
}
const activeFilters = () => Object.keys(F_DEFAULT).filter(k => state.f[k] !== F_DEFAULT[k]);

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- 주소(#)와 상태 맞추기 ---------- */
function readHash() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  state.view = "all"; state.cat = "all"; state.sub = "all";
  if (h === "my") { state.view = "my"; return; }
  if (h.startsWith("set-") && getSet(h.slice(4))) { state.view = "set:" + h.slice(4); return; }
  const [cat, sub] = h.split("/");
  if (CATEGORIES.some(c => c.id === cat)) {
    state.cat = cat;
    if (getCategory(cat).subs.some(s => s.id === sub)) state.sub = sub;
  }
}
function writeHash() {
  let h = "";
  if (state.view === "my") h = "#my";
  else if (state.view.startsWith("set:")) h = "#set-" + state.view.slice(4);
  else if (state.cat !== "all") h = "#" + state.cat + (state.sub !== "all" ? "/" + state.sub : "");
  history.replaceState(null, "", location.pathname + location.search + h);
}

/* ---------- 필터 ---------- */
function searchText(s) {
  const cat = getCategory(s.cat), sub = getSub(s.cat, s.sub);
  const parts = [s.name, s.url, pick(s.intro), s.intro.ko, s.intro.en,
    pick(cat.name), cat.name.ko, cat.name.en, pick(sub.name), sub.name.ko,
    ...pick(s.uses), ...(s.uses.ko || [])];
  return parts.join(" ").toLowerCase();
}

function matches(s, { ignoreSub = false } = {}) {
  if (state.view === "all") {
    if (state.cat !== "all" && s.cat !== state.cat) return false;
    if (!ignoreSub && state.sub !== "all" && s.sub !== state.sub) return false;
  }
  if (!passFilters(s)) return false;
  if (state.q) {
    const text = searchText(s);
    const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.every(w => text.includes(w))) return false;
  }
  return true;
}

/* ---------- 칩 그리기 ---------- */
function renderChips() {
  const allOn = state.view === "all" && state.cat === "all";
  const all = `<button type="button" class="chip" data-cat="all" aria-pressed="${allOn}">${t("filter.all")} <small>${SERVICES.length}</small></button>`;
  $("catChips").innerHTML = all + CATEGORIES.map(c => `
    <button type="button" class="chip" data-cat="${c.id}" aria-pressed="${state.view === "all" && state.cat === c.id}">
      <img src="${c.icon}" alt="">${esc(pick(c.name))}
    </button>`).join("");

  const wrap = $("subWrap");
  if (state.view !== "all" || state.cat === "all") {
    wrap.classList.remove("is-open");
    $("subChips").innerHTML = "";
  } else {
    const cat = getCategory(state.cat);
    const count = subId => SERVICES.filter(s => s.cat === cat.id && (subId === "all" || s.sub === subId) && matches(s, { ignoreSub: true })).length;
    $("subChips").innerHTML =
      `<button type="button" class="subchip" data-sub="all" aria-pressed="${state.sub === "all"}">${t("filter.all")} <small>${count("all")}</small></button>` +
      cat.subs.map(s => `<button type="button" class="subchip" data-sub="${s.id}" aria-pressed="${state.sub === s.id}">${esc(pick(s.name))} <small>${count(s.id)}</small></button>`).join("");
    wrap.classList.add("is-open");
  }

  renderFilters();
}

/* ---------- 필터 버튼 · 패널 · 선택 태그 ---------- */
const checkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
function itemOn(it) { return it.f === "sort" ? state.sort === it.v : state.f[it.f] === it.v; }

function countResults() {
  if (state.view === "my") return Fav.list().map(findSvc).filter(Boolean).filter(s => matches(s)).length;
  if (state.view.startsWith("set:")) return setTools(getSet(state.view.slice(4))).filter(s => matches(s)).length;
  return SERVICES.filter(s => matches(s)).length;
}

function renderFilters() {
  const act = activeFilters();
  const btn = $("filterBtn");
  btn.setAttribute("aria-expanded", String(filterOpen));
  btn.classList.toggle("has-active", act.length > 0);
  btn.querySelector(".filter-count").textContent = act.length;
  btn.querySelector(".filter-count").hidden = !act.length;
  $("filterPanel").classList.toggle("is-open", filterOpen);
  $("filterPanel").inert = !filterOpen;

  $("filterBody").innerHTML = FILTER_GROUPS.map(g => `
    <div class="fgroup fgroup--${g.id}" role="group" aria-label="${t(g.title)}">
      <h3 class="fgroup__title">${t(g.title)}</h3>
      <div class="fgroup__items">
        ${g.items.map(it => `<button type="button" class="fopt${it.tog ? " fopt--tog" : ""}" data-f="${it.f}" data-v="${it.v}" aria-pressed="${itemOn(it)}">${it.tog ? checkIcon : ""}${t(it.label)}</button>`).join("")}
      </div>
    </div>`).join("");
  $("filterResult").innerHTML = t("filter.result", { n: `<b>${countResults()}</b>` });
  $("filterReset").disabled = !act.length && state.sort === "rec";

  // 선택된 조건 태그 (패널을 닫아도 보이도록)
  const label = k => {
    for (const g of FILTER_GROUPS) for (const it of g.items) if (it.f === k && it.v === state.f[k]) return t(it.label);
    return k;
  };
  $("filterTags").innerHTML = act.map(k => `<button type="button" class="ftag" data-clear="${k}">${label(k)}<span aria-hidden="true">×</span><span class="sr-only">${t("filter.remove")}</span></button>`).join("") +
    (act.length > 1 ? `<button type="button" class="ftag-reset" data-clear="all">${t("filter.reset")}</button>` : "");
  $("filterTags").hidden = !act.length;
}

/* ---------- 카드 그리기 ---------- */
function cardHTML(s) {
  const cat = getCategory(s.cat), sub = getSub(s.cat, s.sub);
  const key = svcKey(s);
  const id = "d-" + s.name.replace(/[^a-z0-9]/gi, "").toLowerCase() + "-" + s.cat;
  const open = openCards.has(key);
  const list = arr => arr.map(x => `<li>${esc(x)}</li>`).join("");
  const domain = s.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `
  <article class="tool${open ? " is-open" : ""}" data-key="${esc(key)}">
    <a class="tool-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)} · ${t("card.open")}"></a>
    <div class="tool-actions">
      ${favBtnHTML(s)}
    </div>
    <div class="tool-head">
      ${logoHTML(s)}
      <div style="min-width:0">
        <h2 class="tool-name">${esc(s.name)}${s.star ? `<span class="star" title="${t("card.star")}">★</span>` : ""}</h2>
        <div class="tool-cat">${esc(pick(cat.name))} › ${esc(pick(sub.name))}</div>
      </div>
    </div>
    <p class="tool-intro">${esc(pick(s.intro))}</p>
    <div class="tool-meta">
      ${priceBadge(s.price)}
      <span class="tool-url">${esc(domain)} ↗</span>
    </div>
    <button type="button" class="tool-more" aria-expanded="${open}" aria-controls="${id}">
      <span>${open ? t("card.less") : t("card.more")}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="tool-detail" id="${id}">
      <div><div class="detail-inner">
        <div class="detail-sec sec-pros"><h4>${t("card.pros")}</h4><ul>${list(pick(s.pros))}</ul></div>
        <div class="detail-sec sec-cons"><h4>${t("card.cons")}</h4><ul>${list(pick(s.cons))}</ul></div>
        <div class="detail-sec sec-uses"><h4>${t("card.uses")}</h4><ul>${list(pick(s.uses))}</ul></div>
        ${plansHTML(s)}
      </div></div>
    </div>
  </article>`;
}

/* 요금 플랜 표 */
function plansRows(s) {
  return (s.plans && s.plans.length ? s.plans : [[s.price === "free" ? "@free" : "@paid", s.price === "free" ? "$0" : null]])
    .map(p => {
      const { name, price, period, muted } = formatPlan(p);
      return `<li><span class="plan-name">${esc(name)}</span><span class="plan-price${muted ? " is-muted" : ""}">${esc(price)}${period ? `<small>${esc(period)}</small>` : ""}</span></li>`;
    }).join("");
}
function plansHTML(s) {
  return `<div class="detail-sec sec-plans"><h4>${t("plan.title")}</h4><ul class="plans">${plansRows(s)}</ul>
    <p class="plan-note">${t("plan.note")} · <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${t("plan.link")} ↗</a></p></div>`;
}

const PRICE_ORDER = { free: 0, mix: 1, paid: 2 };
const collator = new Intl.Collator(["ko", "en"]);
function sortList(list) {
  const arr = list.slice();
  if (state.sort === "name") return arr.sort((a, b) => collator.compare(a.name, b.name));
  if (state.sort === "free") return arr.sort((a, b) => (PRICE_ORDER[a.price] ?? 1) - (PRICE_ORDER[b.price] ?? 1) || (b.star ? 1 : 0) - (a.star ? 1 : 0));
  return arr.sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0));
}

/* ---------- 내 AI 툴 / 추천 세트 머리말 ---------- */
function renderBanner() {
  const box = $("viewBanner");
  if (state.view === "my") {
    box.hidden = false;
    box.className = "view-banner is-my";
    box.innerHTML = `
      <div class="view-banner__text">
        <span class="eyebrow">MY AI TOOLS</span>
        <h2>${t("my.title")} <small>${Fav.list().length}</small></h2>
        <p>${t("my.sub")}</p>
      </div>
      <button type="button" class="btn btn-ghost btn-sm" data-view="all">${t("set.close")}</button>`;
  } else if (state.view.startsWith("set:")) {
    const set = getSet(state.view.slice(4));
    box.hidden = false;
    box.className = "view-banner is-set";
    box.innerHTML = `
      <div class="view-banner__text">
        <span class="eyebrow">${t("set.banner")}</span>
        <h2>${esc(pick(set.title))}</h2>
        <p>${esc(pick(set.desc))}</p>
      </div>
      <ol class="route">
        ${set.steps.map((st, i) => `
          <li>
            <span class="route__num">${i + 1}</span>
            <span class="route__name">${esc(pick(st.name))}</span>
            <span class="route__tools">${st.tools.map(findByName).filter(Boolean).map(s => `<a href="#card-${encodeURIComponent(svcKey(s))}" title="${esc(s.name)}">${logoHTML(s)}</a>`).join("")}</span>
          </li>`).join("")}
      </ol>
      <button type="button" class="btn btn-ghost btn-sm" data-view="all">${t("set.close")}</button>`;
  } else {
    box.hidden = true;
    box.innerHTML = "";
  }
}

function renderGrid() {
  const grid = $("grid");
  let html = "";

  if (state.view === "my") {
    const list = Fav.list().map(findSvc).filter(Boolean).filter(s => matches(s));
    if (!Fav.list().length) {
      grid.innerHTML = `
        <div class="empty">
          <img src="img/character/ati.png" alt="">
          <h2>${t("my.empty.title")}</h2>
          <p>${t("my.empty.body")}</p>
          <button type="button" class="btn btn-primary btn-sm" data-view="all">${t("my.browse")}</button>
        </div>`;
      return;
    }
    html = sortList(list).map(cardHTML).join("");
  } else if (state.view.startsWith("set:")) {
    const set = getSet(state.view.slice(4));
    set.steps.forEach((st, i) => {
      const items = st.tools.map(findByName).filter(Boolean).filter(s => matches(s));
      if (!items.length) return;
      html += `<h2 class="group-title"><span class="route__num">${i + 1}</span>${esc(pick(st.name))}</h2>`;
      html += items.map(cardHTML).join("");
    });
  } else {
    const list = SERVICES.filter(s => matches(s));
    if (state.cat === "all") {
      CATEGORIES.forEach(c => {
        const items = sortList(list.filter(s => s.cat === c.id));
        if (!items.length) return;
        html += `<h2 class="group-title">${esc(pick(c.name))} <small>${t("result.count", { n: items.length })}</small></h2>`;
        html += items.map(cardHTML).join("");
      });
    } else if (state.sub === "all") {
      getCategory(state.cat).subs.forEach(sb => {
        const items = sortList(list.filter(s => s.sub === sb.id));
        if (!items.length) return;
        html += `<h2 class="group-title">${esc(pick(sb.name))} <small>${t("result.count", { n: items.length })}</small></h2>`;
        html += items.map(cardHTML).join("");
      });
    } else {
      html = sortList(list).map(cardHTML).join("");
    }
  }

  if (!html) {
    grid.innerHTML = `
      <div class="empty">
        <img src="img/3d/cat-research.png" alt="">
        <h2>${t("empty.title")}</h2>
        <p>${t("empty.body")}</p>
        <button type="button" class="btn btn-ghost btn-sm" id="resetBtn">${t("empty.reset")}</button>
      </div>`;
    $("resetBtn").addEventListener("click", resetFilters);
    return;
  }
  grid.innerHTML = html;
}

function render() {
  document.querySelectorAll(".my-btn").forEach(b => state.view === "my" ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
  renderChips();
  renderBanner();
  renderGrid();
}

function resetFilters() {
  state.view = "all"; state.cat = "all"; state.sub = "all"; state.q = ""; state.f = { ...F_DEFAULT }; state.sort = "rec";
  $("q").value = ""; $("qClear").hidden = true;
  writeHash();
  render();
}

/* ---------- 이벤트 ---------- */
function bindEvents() {
  $("catChips").addEventListener("click", e => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    const cat = b.dataset.cat;
    const wasOn = state.view === "all" && state.cat === cat;
    state.view = "all";
    state.cat = (wasOn && cat !== "all") ? "all" : cat; // 같은 칩 다시 누르면 해제
    state.sub = "all";
    writeHash();
    render();
  });
  $("subChips").addEventListener("click", e => {
    const b = e.target.closest("[data-sub]");
    if (!b) return;
    state.sub = b.dataset.sub;
    writeHash();
    render();
  });
  // 필터 버튼: 패널 펼치기/접기
  $("filterBtn").addEventListener("click", () => { filterOpen = !filterOpen; renderFilters(); });
  $("filterDone").addEventListener("click", () => { filterOpen = false; renderFilters(); $("filterBtn").focus(); });
  $("filterReset").addEventListener("click", () => { state.f = { ...F_DEFAULT }; state.sort = "rec"; render(); });
  $("filterBody").addEventListener("click", e => {
    const b = e.target.closest("[data-f]");
    if (!b) return;
    const key = b.dataset.f, raw = b.dataset.v;
    if (key === "sort") state.sort = raw;
    else if (raw === "true") state.f[key] = !state.f[key];
    else state.f[key] = raw;
    render();
  });
  $("filterTags").addEventListener("click", e => {
    const b = e.target.closest("[data-clear]");
    if (!b) return;
    const k = b.dataset.clear;
    if (k === "all") state.f = { ...F_DEFAULT };
    else state.f[k] = F_DEFAULT[k];
    render();
  });

  let timer;
  $("q").addEventListener("input", e => {
    clearTimeout(timer);
    $("qClear").hidden = !e.target.value;
    timer = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 120);
  });
  $("qClear").addEventListener("click", () => {
    $("q").value = ""; $("qClear").hidden = true; state.q = ""; render(); $("q").focus();
  });

  // 카드 안 버튼들
  document.addEventListener("click", e => {
    const more = e.target.closest(".tool-more");
    if (more) {
      e.preventDefault();
      const card = more.closest(".tool");
      const key = card.dataset.key;
      const open = !card.classList.contains("is-open");
      card.classList.toggle("is-open", open);
      more.setAttribute("aria-expanded", String(open));
      more.querySelector("span").textContent = open ? t("card.less") : t("card.more");
      open ? openCards.add(key) : openCards.delete(key);
      return;
    }
    const view = e.target.closest("[data-view]");
    if (view) { state.view = view.dataset.view; writeHash(); render(); window.scrollTo({ top: 0 }); return; }
    // 세트 경로의 로고를 누르면 해당 카드로 이동
    const jump = e.target.closest('.route__tools a');
    if (jump) {
      e.preventDefault();
      const key = decodeURIComponent(jump.getAttribute("href").slice(6));
      const card = document.querySelector(`.tool[data-key="${CSS.escape(key)}"]`);
      if (card) { card.scrollIntoView({ behavior: "smooth", block: "center" }); card.classList.add("is-flash"); setTimeout(() => card.classList.remove("is-flash"), 1200); }
    }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && filterOpen) { filterOpen = false; renderFilters(); } });

  // 하트를 바꾸면 내 AI 툴 / '내가 담은 툴만' 필터 갱신
  document.addEventListener("favchange", () => {
    if (state.view === "my") { renderBanner(); renderGrid(); }
    else if (state.f.fav) renderGrid();
    renderFilters();
  });

  window.addEventListener("hashchange", () => { readHash(); render(); });
  document.addEventListener("langchange", render);
}

document.addEventListener("DOMContentLoaded", () => {
  readHash();
  bindEvents();
  render();
});
