/* =========================================================
   AI ATLAS · AI 툴 페이지 동작
   - 1단 분야 칩 → 2단 하위 분류 칩 (덜 강조)
   - 검색 (이름·소개·분야·추천 용도)
   - 카드 클릭: 공식 사이트 새 탭 / 자세히: 카드 안에서 펼치기
   - 주소 끝 #automation 또는 #automation/nocode 로 바로 열기
   ========================================================= */

const state = { cat: "all", sub: "all", q: "" };
const openCards = new Set();

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- 주소(#)와 상태 맞추기 ---------- */
function readHash() {
  const [cat, sub] = decodeURIComponent(location.hash.replace(/^#/, "")).split("/");
  state.cat = CATEGORIES.some(c => c.id === cat) ? cat : "all";
  state.sub = state.cat !== "all" && getCategory(state.cat).subs.some(s => s.id === sub) ? sub : "all";
}
function writeHash() {
  const h = state.cat === "all" ? "" : "#" + state.cat + (state.sub !== "all" ? "/" + state.sub : "");
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
  if (state.cat !== "all" && s.cat !== state.cat) return false;
  if (!ignoreSub && state.sub !== "all" && s.sub !== state.sub) return false;
  if (state.q) {
    const text = searchText(s);
    const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.every(w => text.includes(w))) return false;
  }
  return true;
}

/* ---------- 칩 그리기 ---------- */
function renderChips() {
  const all = `<button type="button" class="chip" data-cat="all" aria-pressed="${state.cat === "all"}">${t("filter.all")} <small>${SERVICES.length}</small></button>`;
  $("catChips").innerHTML = all + CATEGORIES.map(c => `
    <button type="button" class="chip" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">
      <img src="${c.icon}" alt="">${esc(pick(c.name))}
    </button>`).join("");

  const wrap = $("subWrap");
  if (state.cat === "all") {
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

}

/* ---------- 카드 그리기 ---------- */
function cardHTML(s) {
  const cat = getCategory(s.cat), sub = getSub(s.cat, s.sub);
  const id = "d-" + s.name.replace(/[^a-z0-9]/gi, "").toLowerCase() + "-" + s.cat;
  const open = openCards.has(s.name + s.cat);
  const list = arr => arr.map(x => `<li>${esc(x)}</li>`).join("");
  const domain = s.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `
  <article class="tool${open ? " is-open" : ""}" data-key="${esc(s.name + s.cat)}">
    <a class="tool-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)} · ${t("card.open")}"></a>
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
function plansHTML(s) {
  const rows = (s.plans && s.plans.length ? s.plans : [[s.price === "free" ? "@free" : "@paid", s.price === "free" ? "$0" : null]])
    .map(p => {
      const { name, price, period, muted } = formatPlan(p);
      return `<li><span class="plan-name">${esc(name)}</span><span class="plan-price${muted ? " is-muted" : ""}">${esc(price)}${period ? `<small>${esc(period)}</small>` : ""}</span></li>`;
    }).join("");
  return `<div class="detail-sec sec-plans"><h4>${t("plan.title")}</h4><ul class="plans">${rows}</ul>
    <p class="plan-note">${t("plan.note")} · <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${t("plan.link")} ↗</a></p></div>`;
}

function sortList(list) {
  return list.slice().sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0));
}

function renderGrid() {
  const list = SERVICES.filter(s => matches(s));
  const grid = $("grid");

  if (!list.length) {
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

  let html = "";
  if (state.cat === "all") {
    // 분야별로 묶어서
    CATEGORIES.forEach(c => {
      const items = sortList(list.filter(s => s.cat === c.id));
      if (!items.length) return;
      html += `<h2 class="group-title">${esc(pick(c.name))} <small>${t("result.count", { n: items.length })}</small></h2>`;
      html += items.map(cardHTML).join("");
    });
  } else if (state.sub === "all") {
    // 하위 분류별로 묶어서
    getCategory(state.cat).subs.forEach(sb => {
      const items = sortList(list.filter(s => s.sub === sb.id));
      if (!items.length) return;
      html += `<h2 class="group-title">${esc(pick(sb.name))} <small>${t("result.count", { n: items.length })}</small></h2>`;
      html += items.map(cardHTML).join("");
    });
  } else {
    html = sortList(list).map(cardHTML).join("");
  }
  grid.innerHTML = html;
}

function render() {
  renderChips();
  renderGrid();
}

function resetFilters() {
  state.cat = "all"; state.sub = "all"; state.q = "";
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
    state.cat = (state.cat === cat && cat !== "all") ? "all" : cat; // 같은 칩 다시 누르면 해제
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

  let timer;
  $("q").addEventListener("input", e => {
    clearTimeout(timer);
    $("qClear").hidden = !e.target.value;
    timer = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 120);
  });
  $("qClear").addEventListener("click", () => {
    $("q").value = ""; $("qClear").hidden = true; state.q = ""; render(); $("q").focus();
  });

  // 자세히 펼치기 (사이트 이동 없이)
  $("grid").addEventListener("click", e => {
    const btn = e.target.closest(".tool-more");
    if (!btn) return;
    e.preventDefault();
    const card = btn.closest(".tool");
    const key = card.dataset.key;
    const open = !card.classList.contains("is-open");
    card.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector("span").textContent = open ? t("card.less") : t("card.more");
    open ? openCards.add(key) : openCards.delete(key);
  });

  window.addEventListener("hashchange", () => { readHash(); render(); });
  document.addEventListener("langchange", render);
}

document.addEventListener("DOMContentLoaded", () => {
  readHash();
  bindEvents();
  render();
});
