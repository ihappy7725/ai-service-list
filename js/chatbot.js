/* =========================================================
   AI ATLAS · 안내원 "아티" 챗봇 (규칙 기반, API 없이 작동)
   - 자유 질문: features.js의 recommend()로 추천
   - AI 찾기 퀴즈: 5단계 질문 후 추천
   - 상황별 추천 세트 안내
   ========================================================= */

const Chat = {
  open: false,
  quiz: null,      // 진행 중인 퀴즈 상태
  last: null,      // 마지막 추천 조건 (이어서 "무료만" 등)
  el: {}
};

const AVATAR = "img/character/ati.png";
const escH = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function chatBuild() {
  const root = document.createElement("div");
  root.className = "chat-root";
  root.innerHTML = `
    <button type="button" class="chat-launcher" aria-expanded="false" aria-controls="chatPanel" data-i18n-title="chat.drag">
      <span class="chat-launcher__avatar"><img src="${AVATAR}" alt="" draggable="false"></span>
      <span class="chat-launcher__text">
        <span class="chat-launcher__label" data-i18n="chat.open"></span>
        <span class="chat-launcher__sub" data-i18n="chat.openSub"></span>
      </span>
      <span class="chat-launcher__grip" aria-hidden="true"></span>
    </button>
    <section class="chat-panel" id="chatPanel" role="dialog" aria-modal="false" aria-labelledby="chatTitle" hidden>
      <header class="chat-head">
        <img class="chat-head__avatar" src="${AVATAR}" alt="">
        <div class="chat-head__text">
          <strong id="chatTitle" data-i18n="chat.name"></strong>
          <span data-i18n="chat.role"></span>
        </div>
        <button type="button" class="chat-head__btn" data-act="quiz" data-i18n="chat.quiz"></button>
        <button type="button" class="chat-close" data-i18n-aria="chat.close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>
      <div class="chat-body" id="chatBody" aria-live="polite"></div>
      <form class="chat-form" id="chatForm" autocomplete="off">
        <label for="chatInput" class="sr-only" data-i18n="chat.placeholder"></label>
        <input id="chatInput" type="text" data-i18n-ph="chat.placeholder" maxlength="200">
        <button type="submit" class="chat-send" data-i18n-aria="chat.send">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l16-8-6 16-2.5-6.5L4 12z"/></svg>
        </button>
      </form>
    </section>`;
  document.body.appendChild(root);
  Chat.el = {
    root, launcher: root.querySelector(".chat-launcher"), panel: root.querySelector(".chat-panel"),
    body: root.querySelector("#chatBody"), form: root.querySelector("#chatForm"), input: root.querySelector("#chatInput")
  };
  applyI18n(root);

  Chat.el.launcher.addEventListener("click", e => {
    if (Chat.dragged) { Chat.dragged = false; e.preventDefault(); return; }   // 끌어서 옮긴 뒤에는 열지 않음
    chatToggle(!Chat.open);
  });
  chatDraggable();
  root.querySelector(".chat-close").addEventListener("click", () => chatToggle(false));
  root.querySelector('[data-act="quiz"]').addEventListener("click", quizStart);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && Chat.open) chatToggle(false); });
  Chat.el.form.addEventListener("submit", e => {
    e.preventDefault();
    const v = Chat.el.input.value.trim();
    if (!v) return;
    Chat.el.input.value = "";
    chatUser(v);
    chatHandleText(v);
  });
  // 빠른 답장 버튼
  Chat.el.body.addEventListener("click", e => {
    const b = e.target.closest("[data-reply]");
    if (!b || b.disabled) return;
    const group = b.closest(".chat-replies");
    if (group && group.dataset.once) group.querySelectorAll("button").forEach(x => { x.disabled = true; x.classList.toggle("is-picked", x === b); });
    chatReply(b.dataset.reply, b.dataset.value, b.textContent.trim());
  });
}

function chatToggle(open) {
  Chat.open = open;
  Chat.el.panel.hidden = !open;
  Chat.el.launcher.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("chat-open", open);
  if (open) {
    chatPlacePanel();
    if (!Chat.el.body.children.length) chatHello();
    setTimeout(() => Chat.el.input.focus(), 50);
  }
}

/* ---------- 드래그로 위치 옮기기 ----------
   - 런처: 끌어서 원하는 곳에 두면 위치를 기억 (오른쪽·아래 기준 거리로 저장)
   - 대화창: 머리 부분을 끌어서 옮기기 (데스크톱) */
const CHAT_POS_KEY = "ai-atlas-chat-pos";
const chatSmall = () => window.matchMedia("(max-width: 640px)").matches;
const chatClamp = (v, a, b) => Math.min(Math.max(v, a), Math.max(a, b));

function chatApplyPos() {
  const l = Chat.el.launcher;
  let pos = null;
  try { pos = JSON.parse(localStorage.getItem(CHAT_POS_KEY)); } catch (e) {}
  if (!pos) { l.style.right = l.style.bottom = ""; return; }
  const w = l.offsetWidth, h = l.offsetHeight;
  l.style.right = chatClamp(pos.r, 8, innerWidth - w - 8) + "px";
  l.style.bottom = chatClamp(pos.b, 8, innerHeight - h - 8) + "px";
}

function dragHelper(handle, target, { onMove, onEnd, skip }) {
  let sx, sy, rect, moved = false, id = null;
  const move = e => {
    if (id !== e.pointerId) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!moved && Math.hypot(dx, dy) < 6) return;
    if (!moved) { moved = true; target.classList.add("is-dragging"); }
    e.preventDefault();
    onMove(rect, dx, dy);
  };
  const end = e => {
    if (id !== e.pointerId) return;
    id = null;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", end);
    window.removeEventListener("pointercancel", end);
    if (moved) { target.classList.remove("is-dragging"); onEnd && onEnd(); }
  };
  handle.addEventListener("pointerdown", e => {
    if (e.button !== 0 || (skip && skip(e))) return;
    id = e.pointerId; sx = e.clientX; sy = e.clientY; moved = false;
    rect = target.getBoundingClientRect();
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  });
  handle.addEventListener("dragstart", e => e.preventDefault());
}

function chatDraggable() {
  const l = Chat.el.launcher, p = Chat.el.panel;
  chatApplyPos();
  dragHelper(l, l, {
    onMove(rect, dx, dy) {
      const x = chatClamp(rect.left + dx, 8, innerWidth - rect.width - 8);
      const y = chatClamp(rect.top + dy, 8, innerHeight - rect.height - 8);
      l.style.right = (innerWidth - x - rect.width) + "px";
      l.style.bottom = (innerHeight - y - rect.height) + "px";
      Chat.dragged = true;
    },
    onEnd() {
      const r = l.getBoundingClientRect();
      try { localStorage.setItem(CHAT_POS_KEY, JSON.stringify({ r: innerWidth - r.right, b: innerHeight - r.bottom })); } catch (e) {}
      setTimeout(() => { Chat.dragged = false; }, 0);
    }
  });
  // 대화창 머리를 끌어서 옮기기 (버튼 위에서는 무시)
  dragHelper(p.querySelector(".chat-head"), p, {
    skip: e => chatSmall() || e.target.closest("button"),
    onMove(rect, dx, dy) {
      p.style.left = chatClamp(rect.left + dx, 8, innerWidth - rect.width - 8) + "px";
      p.style.top = chatClamp(rect.top + dy, 8, innerHeight - rect.height - 8) + "px";
      p.style.right = p.style.bottom = "auto";
    }
  });
  window.addEventListener("resize", () => { chatApplyPos(); if (Chat.open) chatPlacePanel(); });
}

/* 대화창을 런처 근처에 열기 (화면 밖으로 나가지 않게) */
function chatPlacePanel() {
  const p = Chat.el.panel;
  if (chatSmall()) { p.style.left = p.style.top = p.style.right = p.style.bottom = ""; return; }
  const r = Chat.el.launcher.getBoundingClientRect();
  const w = p.offsetWidth, h = p.offsetHeight;
  const left = r.left + r.width / 2 > innerWidth / 2 ? r.right - w : r.left;
  p.style.left = chatClamp(left, 12, innerWidth - w - 12) + "px";
  p.style.top = chatClamp(r.bottom - h, 12, innerHeight - h - 12) + "px";
  p.style.right = p.style.bottom = "auto";
}

/* ---------- 말풍선 ---------- */
function chatScroll() { Chat.el.body.scrollTop = Chat.el.body.scrollHeight; }

function chatUser(text) {
  const d = document.createElement("div");
  d.className = "msg msg-user";
  d.innerHTML = `<p>${escH(text)}</p>`;
  Chat.el.body.appendChild(d);
  chatScroll();
}

function chatBot(html, delay = 380) {
  return new Promise(resolve => {
    const typing = document.createElement("div");
    typing.className = "msg msg-bot is-typing";
    typing.innerHTML = `<img class="msg-avatar" src="${AVATAR}" alt=""><div class="bubble"><span class="dots"><i></i><i></i><i></i></span></div>`;
    Chat.el.body.appendChild(typing);
    chatScroll();
    setTimeout(() => {
      typing.classList.remove("is-typing");
      typing.querySelector(".bubble").innerHTML = html;
      chatScroll();
      resolve(typing);
    }, delay);
  });
}

function repliesHTML(items, once = false) {
  return `<div class="chat-replies"${once ? ' data-once="1"' : ""}>${items.map(([act, val, label]) =>
    `<button type="button" data-reply="${act}" data-value="${escH(val ?? "")}">${escH(label)}</button>`).join("")}</div>`;
}

function chatAppendReplies(items, once) {
  const wrap = document.createElement("div");
  wrap.className = "msg-replies";
  wrap.innerHTML = repliesHTML(items, once);
  Chat.el.body.appendChild(wrap);
  chatScroll();
}

/* 추천 결과 카드 */
function chatCardsHTML(list, reasons = true) {
  return `<div class="chat-cards">${list.map(s => {
    const tags = [];
    if (reasons) {
      if (s.star) tags.push(t("reason.star"));
      if (s.price === "free") tags.push(t("reason.freeOnly"));
      else if (s.price === "mix") tags.push(t("reason.free"));
      if (KO_FRIENDLY.has(s.name)) tags.push(t("reason.ko"));
      if (!NEEDS_INSTALL.has(s.name)) tags.push(t("reason.web"));
    }
    return `<article class="chat-card" style="--cc:${getCategory(s.cat).color}">
      <div class="chat-card__head">
        ${logoHTML(s)}
        <div class="chat-card__title"><strong>${escH(s.name)}</strong><span>${escH(pick(getSub(s.cat, s.sub).name))}</span></div>
        ${favBtnHTML(s)}
      </div>
      <p>${escH(pick(s.intro))}</p>
      ${tags.length ? `<div class="chat-card__tags">${tags.map(x => `<span>${escH(x)}</span>`).join("")}</div>` : ""}
      <div class="chat-card__foot">
        ${priceBadge(s.price)}
        <a href="${escH(s.url)}" target="_blank" rel="noopener noreferrer">${t("chat.visit")} ↗</a>
      </div>
    </article>`;
  }).join("")}</div>`;
}

/* ---------- 대화 흐름 ---------- */
async function chatHello() {
  await chatBot(`<p>${t("chat.hello")}</p>`, 200);
  await chatBot(`<p>${t("chat.hello2")}</p>`, 300);
  chatAppendReplies([
    ["quiz", "", t("chat.quiz")],
    ["sets", "", t("chat.sets")],
    ["ask", t("chat.ex1"), t("chat.ex1")],
    ["ask", t("chat.ex2"), t("chat.ex2")],
    ["ask", t("chat.ex3"), t("chat.ex3")],
    ["ask", t("chat.ex4"), t("chat.ex4")]
  ]);
}

function chatReply(act, value, label) {
  if (act === "quiz") { chatUser(label); return quizStart(); }
  if (act === "sets") { chatUser(label); return chatSets(); }
  if (act === "ask") { chatUser(value); return chatHandleText(value); }
  if (act === "refine") { chatUser(label); return chatRecommend({ ...Chat.last, conds: { ...Chat.last.conds, [value]: true } }); }
  if (act === "quizAns") return quizAnswer(value, label);
}

function chatHandleText(text) {
  const low = text.toLowerCase();
  if (Chat.quiz) Chat.quiz = null;
  if (/퀴즈|quiz|クイズ|测验/.test(low)) return quizStart();
  if (/세트|set|セット|套装/.test(low) && !detectIntents(text).length) return chatSets();
  chatRecommend({ text });
}

async function chatRecommend(opts) {
  const r = recommend({ ...opts, limit: 3 });
  Chat.last = { text: opts.text || "", cat: opts.cat, sub: opts.sub, conds: r.conds };
  if (!r.list.length) {
    await chatBot(`<p>${t("chat.none")}</p>`);
    return chatAppendReplies([
      ["quiz", "", t("chat.quiz")],
      ["ask", t("chat.ex1"), t("chat.ex1")],
      ["ask", t("chat.ex2"), t("chat.ex2")]
    ]);
  }
  const top = r.top || { cat: r.list[0].cat, sub: r.list[0].sub };
  const area = `${pick(getCategory(top.cat).name)} › ${pick(getSub(top.cat, top.sub).name)}`;
  const condNames = Object.keys(r.conds).filter(k => r.conds[k] && k !== "freeOnly").map(k => t("cond." + k));
  let html = `<p>${t("chat.found", { area: escH(area) })}</p>`;
  if (condNames.length) html += `<p class="muted">${t("chat.foundCond", { conds: condNames.join(" · ") })}</p>`;
  html += chatCardsHTML(r.list);
  html += `<a class="chat-more" href="tools.html#${top.cat}/${top.sub}">${t("chat.more")} →</a>`;
  await chatBot(html, 500);
  const follow = [];
  if (!r.conds.free) follow.push(["refine", "free", t("chat.freeAgain")]);
  if (!r.conds.ko) follow.push(["refine", "ko", t("chat.koAgain")]);
  follow.push(["quiz", "", t("chat.quiz")]);
  chatAppendReplies(follow);
}

async function chatSets() {
  const html = `<p>${t("chat.setsIntro")}</p><div class="chat-sets">${SETS.map(set => `
    <a class="chat-set" href="tools.html#set-${set.id}">
      <img src="${set.icon}" alt="">
      <span><strong>${escH(pick(set.title))}</strong><small>${escH(pick(set.desc))}</small></span>
    </a>`).join("")}</div>`;
  await chatBot(html, 400);
}

/* ---------- AI 찾기 퀴즈 ---------- */
function quizStart() {
  Chat.quiz = { step: 1, cat: null, sub: null, conds: {} };
  if (!Chat.open) chatToggle(true);
  chatBot(`<p>${t("chat.quizStart")}</p>`, 250).then(quizAsk);
}

async function quizAsk() {
  const q = Chat.quiz;
  if (!q) return;
  const step = `<span class="quiz-step">${t("quiz.step", { n: q.step })}</span>`;
  let text, opts;
  if (q.step === 1) {
    text = t("quiz.q1");
    opts = CATEGORIES.map(c => ["quizAns", c.id, pick(c.name)]);
  } else if (q.step === 2) {
    text = t("quiz.q2");
    opts = getCategory(q.cat).subs.map(s => ["quizAns", s.id, pick(s.name)]);
  } else if (q.step === 3) {
    text = t("quiz.q3");
    opts = [["quizAns", "freeOnly", t("quiz.b1")], ["quizAns", "free", t("quiz.b2")], ["quizAns", "any", t("quiz.b3")]];
  } else if (q.step === 4) {
    text = t("quiz.q4");
    opts = [["quizAns", "ko", t("quiz.k1")], ["quizAns", "any", t("quiz.k2")]];
  } else {
    text = t("quiz.q5");
    opts = [["quizAns", "web", t("quiz.w1")], ["quizAns", "any", t("quiz.w2")]];
  }
  await chatBot(`${step}<p><strong>${text}</strong></p>`, 300);
  chatAppendReplies(opts, true);
}

function quizAnswer(value, label) {
  const q = Chat.quiz;
  if (!q) return;
  chatUser(label);
  if (q.step === 1) q.cat = value;
  else if (q.step === 2) q.sub = value;
  else if (value !== "any") q.conds[value] = true;
  if (q.step < 5) { q.step++; return quizAsk(); }
  quizResult();
}

async function quizResult() {
  const q = Chat.quiz;
  Chat.quiz = null;
  // 조건에 딱 맞는 것을 먼저 고르고, 3개가 안 되면 조건을 하나씩 풀어 가며 채우기
  const order = ["web", "ko", "freeOnly", "free"];
  let conds = { ...q.conds }, relaxed = false;
  const pickList = c => recommend({ cat: q.cat, sub: q.sub, conds: c, limit: 6 }).list.filter(s => s.cat === q.cat);
  const r = { list: pickList(conds).slice(0, 3) };
  for (const k of order) {
    if (r.list.length >= 3) break;
    if (!conds[k]) continue;
    conds = { ...conds }; delete conds[k];
    for (const s of pickList(conds)) {
      if (r.list.length >= 3) break;
      if (!r.list.some(x => x.name === s.name)) { r.list.push(s); relaxed = true; }
    }
  }
  Chat.last = { cat: q.cat, sub: q.sub, conds };
  let html = `<p><strong>${t("quiz.result")}</strong></p>`;
  if (relaxed) html += `<p class="muted">${t("quiz.relaxed")}</p>`;
  html += chatCardsHTML(r.list);
  html += `<a class="chat-more" href="tools.html#${q.cat}/${q.sub}">${t("chat.more")} →</a>`;
  await chatBot(html, 600);
  chatAppendReplies([["quiz", "", t("quiz.again")], ["sets", "", t("chat.sets")]]);
}

document.addEventListener("DOMContentLoaded", chatBuild);
document.addEventListener("langchange", () => { if (Chat.el.root) applyI18n(Chat.el.root); });
