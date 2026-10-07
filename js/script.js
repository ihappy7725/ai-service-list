/* =========================================================
   AI ATLAS · 홈 화면 동작
   1) 떠다니는 3D 아이콘 + 마우스 따라 살짝 움직이기
   2) 분야 카드: 스크롤하면 반원 궤적(오른쪽 아래 → 꼭대기 → 왼쪽 아래)을 따라 이동
   3) 기능 소개 01~08 (Zapier 예시 카드)
   4) 숫자 카운트, 스크롤 등장 효과
   ========================================================= */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. 떠다니는 아이콘 ---------- */
// x, y: 위치(%), xs, ys: 휴대폰에서의 위치, s: 크기, depth: 마우스 반응 정도
// (떠다니는 궤적은 i18n.js의 startFloaters가 아이콘마다 다르게 계산)
const HERO_FLOATERS = [
  { img: "hero-robot",   x: "5%",  y: "15%", xs: "4%",  ys: "11%", s: "210px", depth: 26 },
  { img: "hero-chat",    x: "75%", y: "11%", xs: "70%", ys: "9%",  s: "180px", depth: 18 },
  { img: "hero-laptop",  x: "79%", y: "54%", xs: "64%", ys: "77%", s: "240px", depth: 30 },
  { img: "hero-sparkle", x: "19%", y: "62%", xs: "8%",  ys: "79%", s: "135px", depth: 14 },
  { img: "hero-brain",   x: "63%", y: "71%", s: "145px", depth: 20, cls: "hide-sm" },
  { img: "hero-cursor",  x: "31%", y: "9%",  s: "110px", depth: 10, cls: "hide-sm", o: .9 },
  { img: "hero-cube",    x: "1%",  y: "57%", xs: "38%", ys: "86%", s: "160px", depth: 22 },
  { img: "hero-orb",     x: "57%", y: "8%",  s: "120px", depth: 12, cls: "hide-sm", o: .85 }
];
const CTA_FLOATERS = [
  { img: "hero-chat",    x: "5%",  y: "16%", s: "110px", depth: 0, o: .9 },
  { img: "hero-sparkle", x: "15%", y: "62%", s: "80px",  depth: 0, o: .8 },
  { img: "hero-robot",   x: "83%", y: "12%", s: "125px", depth: 0, o: .9 },
  { img: "hero-orb",     x: "89%", y: "60%", s: "84px",  depth: 0, o: .8, cls: "hide-sm" },
  { img: "hero-cursor",  x: "73%", y: "68%", s: "70px",  depth: 0, o: .7, cls: "hide-sm" }
];

function renderFloaters(el, list) {
  if (!el) return;
  el.innerHTML = list.map((f, i) => `
    <div class="floater ${f.cls || ""}" style="--x:${f.x};--y:${f.y};--xs:${f.xs || f.x};--ys:${f.ys || f.y};--s:${f.s};--depth:${f.depth};--o:${f.o ?? 1}">
      <img src="img/3d/${f.img}.png" alt="" loading="${i < 4 ? "eager" : "lazy"}">
    </div>`).join("");
}

function initParallax() {
  const hero = document.querySelector(".hero");
  const box = document.getElementById("heroFloaters");
  if (!hero || !box || reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width - .5) * -2;   // -1 ~ 1, 마우스 반대 방향
    const my = ((e.clientY - r.top) / r.height - .5) * -2;
    box.style.setProperty("--mx", mx.toFixed(3));
    box.style.setProperty("--my", my.toFixed(3));
  });
  hero.addEventListener("mouseleave", () => { box.style.setProperty("--mx", 0); box.style.setProperty("--my", 0); });
}

/* ---------- 2. 분야 카드 반원 궤적 ---------- */
const orbit = {
  section: null, stage: null, box: null, head: null, cards: [], offset: 0, ticking: false
};

function renderCategoryCards() {
  orbit.box.innerHTML = CATEGORIES.map((c, i) => `
    <a class="cat-card" href="tools.html#${c.id}" data-i="${i}">
      <div class="cat-card__inner">
        <div class="cat-card__visual">
          <span class="cat-card__num">${String(i + 1).padStart(2, "0")}</span>
          <img class="cat-card__icon" src="${c.icon}" alt="">
        </div>
        <span class="cat-card__en">${c.en}</span>
        <h3 class="cat-card__name">${pick(c.name)}</h3>
        <p class="cat-card__title">${pick(c.title)}</p>
        <p class="cat-card__desc-touch">${pick(c.desc)}</p>
      </div>
      <div class="cat-card__overlay" aria-hidden="true">
        <span class="cat-card__meta">${t("cat.count", { n: countByCat(c.id) })}</span>
        <h3>${pick(c.name)}</h3>
        <p>${pick(c.desc)}</p>
        <span class="cat-card__go">${t("cat.go")} →</span>
      </div>
    </a>`).join("");
  orbit.cards = [...orbit.box.querySelectorAll(".cat-card")];
  layoutOrbit();
}

function layoutOrbit() {
  const { stage, head, cards } = orbit;
  if (!cards.length) return;
  const W = stage.clientWidth;
  const H = stage.clientHeight;
  const cw = cards[0].offsetWidth;
  const ch = cards[0].offsetHeight;
  const small = W < 720;

  // 원의 크기와 카드 사이 각도
  const stepDeg = small ? 38 : 34;
  const R = small ? Math.max(cw * 1.65, W * .86) : Math.max(cw * 2.1, Math.min(W * .38, 680));
  // 반원의 꼭대기(가운데 카드 중심) 높이: 제목 아래에 오도록
  const headBottom = head.offsetTop + head.offsetHeight;
  const topY = Math.max(headBottom + ch * .58 + 12, H * .56);
  const cx = W / 2;
  const cy = topY + R; // 원의 중심은 꼭대기보다 R만큼 아래

  let activeIndex = 0;
  cards.forEach((card, i) => {
    const d = i - orbit.offset;                 // 가운데 카드와의 거리
    const ad = Math.abs(d);
    const theta = d * stepDeg * Math.PI / 180;  // +: 오른쪽 아래, -: 왼쪽 아래
    const x = cx + R * Math.sin(theta);
    const y = cy - R * Math.cos(theta);
    const scale = Math.max(.6, 1.14 - Math.min(ad, 2.6) * .2);
    const opacity = Math.max(0, Math.min(1, (3 - ad) / 1.3));
    const rotate = d * stepDeg * .45;           // 궤적 방향으로 살짝 기울이기

    card.style.transform =
      `translate3d(${(x - cw / 2).toFixed(1)}px, ${(y - ch / 2).toFixed(1)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    card.style.opacity = opacity.toFixed(3);
    card.style.zIndex = String(100 - Math.round(ad * 10));
    card.style.pointerEvents = opacity < .35 ? "none" : "";
    card.tabIndex = opacity < .35 ? -1 : 0;
    const isActive = ad < .5;
    card.classList.toggle("is-active", isActive);
    if (isActive) activeIndex = i;
  });

  const n = CATEGORIES.length;
  document.getElementById("catIndex").textContent =
    `${String(activeIndex + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  document.getElementById("catBar").style.width = `${((orbit.offset + 1) / n) * 100}%`;
  document.getElementById("catName").textContent = pick(CATEGORIES[activeIndex].name);
}

function onOrbitScroll() {
  if (orbit.ticking) return;
  orbit.ticking = true;
  requestAnimationFrame(() => {
    const r = orbit.section.getBoundingClientRect();
    const total = orbit.section.offsetHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / total));
    orbit.offset = p * (CATEGORIES.length - 1);
    layoutOrbit();
    orbit.ticking = false;
  });
}

function initOrbit() {
  orbit.section = document.getElementById("categories");
  orbit.stage = orbit.section.querySelector(".cat-stage");
  orbit.box = document.getElementById("catOrbit");
  orbit.head = orbit.section.querySelector(".cat-head");
  renderCategoryCards();
  onOrbitScroll();
  window.addEventListener("scroll", onOrbitScroll, { passive: true });
  window.addEventListener("resize", () => layoutOrbit());
  // 이미지가 늦게 로드되어 크기가 바뀌는 경우 대비
  window.addEventListener("load", () => layoutOrbit());
}

/* ---------- 3. 기능 소개 01~08 ---------- */
function mockCard(s, hl) {
  const cat = getCategory(s.cat);
  const sub = getSub(s.cat, s.sub);
  const list = arr => arr.map(x => `<li>${x}</li>`).join("");
  return `
    <div class="mock" data-hl="${hl}" aria-hidden="true">
      <div class="mock-top" data-f="1">
        ${logoHTML(s)}
        <div><div class="tool-name">${s.name}<span class="star">★</span></div></div>
      </div>
      <div class="tool-cat" data-f="2">${pick(cat.name)} › ${pick(sub.name)}</div>
      <p class="tool-intro" data-f="3">${pick(s.intro)}</p>
      <div class="mock-row">
        <span class="tool-url" data-f="4">${s.url.replace(/^https?:\/\//, "")} ↗</span>
        <span data-f="5">${priceBadge(s.price)}</span>
      </div>
      <div class="mock-sec sec-pros" data-f="6"><h4>${t("card.pros")}</h4><ul>${list(pick(s.pros))}</ul></div>
      <div class="mock-sec sec-cons" data-f="7"><h4>${t("card.cons")}</h4><ul>${list(pick(s.cons))}</ul></div>
      <div class="mock-sec sec-uses" data-f="8"><h4>${t("card.uses")}</h4><ul>${list(pick(s.uses))}</ul></div>
    </div>`;
}

function renderFeatures() {
  const s = SERVICES.find(x => x.name === "Zapier") || SERVICES[0];
  const examples = {
    1: s.name + " ★",
    2: `${pick(getCategory(s.cat).name)} › ${pick(getSub(s.cat, s.sub).name)}`,
    3: pick(s.intro),
    4: s.url.replace(/^https?:\/\//, ""),
    5: t("price." + s.price),
    6: pick(s.pros).join(" · "),
    7: pick(s.cons).join(" · "),
    8: pick(s.uses).join(" · ")
  };
  document.getElementById("featList").innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `
    <article class="feat reveal">
      <span class="feat-num" aria-hidden="true">${String(n).padStart(2, "0")}</span>
      <div class="feat-text">
        <span class="feat-label">${String(n).padStart(2, "0")} · ${t(`feat.${n}.label`)}</span>
        <h3 class="feat-title">${t(`feat.${n}.title`)}</h3>
        <p class="feat-body">${t(`feat.${n}.body`)}</p>
        <p class="feat-example"><b>${t("feat.example")}</b>${examples[n]}</p>
      </div>
      <div class="feat-visual">${mockCard(s, n)}</div>
    </article>`).join("");
  observeReveal(document.querySelectorAll("#featList .reveal"));
}

/* ---------- 4. 숫자 카운트 / 등장 효과 ---------- */
const STAT_VALUES = () => ({
  services: SERVICES.length,
  categories: CATEGORIES.length,
  subs: CATEGORIES.reduce((a, c) => a + c.subs.length, 0),
  langs: LANGS.length
});

function countUp(el, to) {
  if (reduceMotion) { el.textContent = to; return; }
  const start = performance.now();
  const dur = 1400;
  const step = now => {
    const k = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

let revealObserver;
function observeReveal(nodes) {
  if (!("IntersectionObserver" in window)) { nodes.forEach(n => n.classList.add("is-in")); return; }
  revealObserver = revealObserver || new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      e.target.querySelectorAll("[data-count]").forEach(el => countUp(el, STAT_VALUES()[el.dataset.count]));
      revealObserver.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
  nodes.forEach(n => revealObserver.observe(n));
}

/* ---------- 언어가 바뀌면 다시 그리기 ---------- */
function renderTexts() {
  document.getElementById("heroSub").textContent =
    t("hero.sub", { c: CATEGORIES.length, n: SERVICES.length });
  renderCategoryCards();
  renderFeatures();
}

document.addEventListener("DOMContentLoaded", () => {
  renderFloaters(document.getElementById("heroFloaters"), HERO_FLOATERS);
  renderFloaters(document.getElementById("ctaFloaters"), CTA_FLOATERS);
  initParallax();
  initOrbit();
  renderTexts();
  observeReveal(document.querySelectorAll(".reveal"));
  // 숫자는 화면에 보이기 전에도 최종값이 들어 있도록 (스크린샷·공유 미리보기용)
  document.querySelectorAll("[data-count]").forEach(el => { el.textContent = STAT_VALUES()[el.dataset.count]; });
});
document.addEventListener("langchange", renderTexts);
