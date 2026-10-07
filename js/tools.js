/* =========================================================
   AI ATLAS · AI 툴 페이지 동작
   - 1단 분야 칩 → 2단 하위 분류 칩 (덜 강조)
   - 검색 (이름·소개·분야·추천 용도) + 조건 필터 (무료·한국어·웹·대표)
   - 카드 클릭: 공식 사이트 새 탭 / 자세히: 카드 안에서 펼치기
   - 하트: 내 AI 툴(즐겨찾기) / 비교: 최대 3개 나란히 비교
   - 주소: #automation, #automation/nocode, #my(내 AI 툴), #set-student(추천 세트)
   ========================================================= */

const state = { view: "all", cat: "all", sub: "all", q: "", conds: {} };
const openCards = new Set();
const compare = [];             // 비교함 (서비스 키, 최대 3개)
const COND_IDS = ["free", "ko", "web", "star"];

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
  if (!passConditions(s, state.conds)) return false;
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

  // 조건 필터 (토글)
  const on = COND_IDS.filter(id => state.conds[id]).length;
  $("condChips").innerHTML = COND_IDS.map(id => `
    <button type="button" class="cond" data-cond="${id}" aria-pressed="${!!state.conds[id]}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>${t("cond." + id)}
    </button>`).join("") +
    (on ? `<button type="button" class="cond-reset" data-cond="reset">${t("cond.reset")}</button>` : "");
}

/* ---------- 카드 그리기 ---------- */
const cmpIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16M17 4v16M4 8h6M14 16h6"/></svg>`;

function cardHTML(s) {
  const cat = getCategory(s.cat), sub = getSub(s.cat, s.sub);
  const key = svcKey(s);
  const id = "d-" + s.name.replace(/[^a-z0-9]/gi, "").toLowerCase() + "-" + s.cat;
  const open = openCards.has(key);
  const inCmp = compare.includes(key);
  const list = arr => arr.map(x => `<li>${esc(x)}</li>`).join("");
  const domain = s.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `
  <article class="tool${open ? " is-open" : ""}" data-key="${esc(key)}">
    <a class="tool-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)} · ${t("card.open")}"></a>
    <div class="tool-actions">
      ${favBtnHTML(s)}
      <button type="button" class="icon-btn cmp-btn" data-cmp="${esc(key)}" aria-pressed="${inCmp}" aria-label="${t("cmp.toggle")}" title="${t("cmp.toggle")}">${cmpIcon}</button>
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

function sortList(list) {
  return list.slice().sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0));
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
    html = list.map(cardHTML).join("");
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
  renderCompareTray();
}

function resetFilters() {
  state.view = "all"; state.cat = "all"; state.sub = "all"; state.q = ""; state.conds = {};
  $("q").value = ""; $("qClear").hidden = true;
  writeHash();
  render();
}

/* ---------- 비교하기 ---------- */
function toggleCompare(key) {
  const i = compare.indexOf(key);
  if (i >= 0) compare.splice(i, 1);
  else {
    if (compare.length >= 3) { showToast(t("cmp.max")); return; }
    compare.push(key);
  }
  document.querySelectorAll(`.cmp-btn[data-cmp="${CSS.escape(key)}"]`).forEach(b => b.setAttribute("aria-pressed", String(compare.includes(key))));
  renderCompareTray();
}

function renderCompareTray() {
  const tray = $("cmpTray");
  document.body.classList.toggle("has-tray", compare.length > 0);
  if (!compare.length) { tray.hidden = true; return; }
  tray.hidden = false;
  tray.innerHTML = `
    <span class="cmp-tray__label">${t("cmp.tray")} <b>${compare.length}/3</b></span>
    <div class="cmp-tray__items">
      ${compare.map(k => { const s = findSvc(k); return `
        <span class="cmp-item">${logoHTML(s)}<span>${esc(s.name)}</span>
          <button type="button" data-cmp-remove="${esc(k)}" aria-label="${t("cmp.removeOne")}">×</button></span>`; }).join("")}
    </div>
    <button type="button" class="btn btn-ghost btn-sm" data-cmp-act="clear">${t("cmp.clear")}</button>
    <button type="button" class="btn btn-primary btn-sm" data-cmp-act="go">${t("cmp.go")}</button>`;
}

function openCompare() {
  if (compare.length < 2) { showToast(t("cmp.need")); return; }
  const list = compare.map(findSvc);
  const ul = arr => `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const rows = [
    ["cmp.row.cat", s => `${esc(pick(getCategory(s.cat).name))} › ${esc(pick(getSub(s.cat, s.sub).name))}`],
    ["cmp.row.intro", s => esc(pick(s.intro))],
    ["cmp.row.price", s => priceBadge(s.price)],
    ["plan.title", s => `<ul class="plans">${plansRows(s)}</ul>`],
    ["card.pros", s => ul(pick(s.pros))],
    ["card.cons", s => ul(pick(s.cons))],
    ["card.uses", s => ul(pick(s.uses))],
    ["cond.ko", s => KO_FRIENDLY.has(s.name) ? `<span class="yes">✓ ${t("cmp.yes")}</span>` : `<span class="no">–</span>`],
    ["cmp.row.web", s => NEEDS_INSTALL.has(s.name) ? `<span class="no">${t("cmp.webNo")}</span>` : `<span class="yes">✓ ${t("cmp.webYes")}</span>`]
  ];
  const modal = $("cmpModal");
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="cmpTitle">
      <header class="modal-head">
        <h2 id="cmpTitle">${t("cmp.title")}</h2>
        <button type="button" class="chat-close" data-cmp-act="close" aria-label="${t("cmp.close")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </header>
      <div class="cmp-table-wrap">
        <table class="cmp-table" style="--cols:${list.length}">
          <thead><tr><th></th>${list.map(s => `
            <th><div class="cmp-col-head">${logoHTML(s)}<strong>${esc(s.name)}${s.star ? '<span class="star">★</span>' : ""}</strong>
              <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${t("chat.visit")} ↗</a></div></th>`).join("")}</tr></thead>
          <tbody>${rows.map(([k, f]) => `<tr><th scope="row">${t(k)}</th>${list.map(s => `<td>${f(s)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
    </div>`;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".chat-close").focus();
}
function closeCompare() {
  $("cmpModal").hidden = true;
  document.body.classList.remove("modal-open");
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
  $("condChips").addEventListener("click", e => {
    const b = e.target.closest("[data-cond]");
    if (!b) return;
    if (b.dataset.cond === "reset") state.conds = {};
    else state.conds[b.dataset.cond] = !state.conds[b.dataset.cond];
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
    const cmp = e.target.closest(".cmp-btn");
    if (cmp) { e.preventDefault(); toggleCompare(cmp.dataset.cmp); return; }
    const rm = e.target.closest("[data-cmp-remove]");
    if (rm) { toggleCompare(rm.dataset.cmpRemove); return; }
    const act = e.target.closest("[data-cmp-act]");
    if (act) {
      const a = act.dataset.cmpAct;
      if (a === "go") openCompare();
      if (a === "close") closeCompare();
      if (a === "clear") { compare.length = 0; document.querySelectorAll(".cmp-btn").forEach(b => b.setAttribute("aria-pressed", "false")); renderCompareTray(); }
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
  $("cmpModal").addEventListener("click", e => { if (e.target.id === "cmpModal") closeCompare(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("cmpModal").hidden) closeCompare(); });

  // 내 AI 툴에서 하트를 빼면 목록 갱신
  document.addEventListener("favchange", () => { if (state.view === "my") { renderBanner(); renderGrid(); } });

  window.addEventListener("hashchange", () => { readHash(); render(); });
  document.addEventListener("langchange", render);
}

document.addEventListener("DOMContentLoaded", () => {
  readHash();
  bindEvents();
  render();
});
