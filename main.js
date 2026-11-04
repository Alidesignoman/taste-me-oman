/* ===== Cart logic (no DOM) — money is handled in baisa (1 OMR = 1000) to avoid rounding errors ===== */
const Cart = {
  baisa: (omr) => Math.round(omr * 1000),
  format: (b) => (b / 1000).toFixed(3) + " OMR",
  lines(qty, menu, cats) {
    const out = [];
    cats.forEach((c) => menu.forEach((m) => {
      const q = qty[m.id] || 0;
      if (m.category === c.key && q > 0) out.push({ item: m, qty: q, total: Cart.baisa(m.price) * q });
    }));
    return out;
  },
  count: (lines) => lines.reduce((s, l) => s + l.qty, 0),
  total: (lines) => lines.reduce((s, l) => s + l.total, 0),
  message(lines, cats, siteName) {
    let t = `Hello ${siteName}, I would like to place an order:\n`;
    cats.forEach((c) => {
      const group = lines.filter((l) => l.item.category === c.key);
      if (!group.length) return;
      t += `\n${c.label}:\n`;
      group.forEach((l) => { t += `• ${l.item.name} (${l.item.pieces} ${l.item.pieces === 1 ? "piece" : "pieces"}) × ${l.qty} — ${Cart.format(l.total)}\n`; });
    });
    return t + `\nTotal: ${Cart.format(Cart.total(lines))}\n\nPlease confirm my order. Thank you!`;
  },
  url: (number, msg) => `https://wa.me/${number}?text=${encodeURIComponent(msg)}`
};

if (typeof module !== "undefined") module.exports = Cart;

/* ===== Page ===== */
if (typeof document !== "undefined") {
  const qty = {};
  const $ = (s) => document.querySelector(s);
  const grid = $("#menuGrid"), tabs = $("#tabs"), bar = $("#cartBar"), backdrop = $("#sheetBackdrop");
  let activeCat = CATEGORIES[0].key;

  const pc = (n) => `<span class="num">${n}</span> ${n === 1 ? "piece" : "pieces"}`;
  const icon = { minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>', plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' };
  const stepper = (id, name) => `
    <button class="step-btn" data-act="dec" data-id="${id}" aria-label="Remove one ${name}">${icon.minus}</button>
    <span class="step-qty num" aria-live="polite">0</span>
    <button class="step-btn" data-act="inc" data-id="${id}" aria-label="Add one ${name}">${icon.plus}</button>`;

  tabs.innerHTML = CATEGORIES.map((c) => `<button class="tab" role="tab" data-cat="${c.key}" aria-selected="false">${c.label}<span class="tab-dot" hidden></span></button>`).join("");
  grid.innerHTML = MENU.map((m) => `
    <article class="card" data-cat="${m.category}" data-id="${m.id}" hidden>
      <div class="card-photo"><img src="${m.image}" alt="${m.name}" loading="lazy" decoding="async"><span class="pieces">${pc(m.pieces)}</span></div>
      <div class="card-body">
        <h3>${m.name}</h3>
        <p class="desc">${m.description}</p>
        ${m.note ? `<p class="serves">${m.note.replace(/\d+/g, '<span class="num">$&</span>')}</p>` : ""}
        <div class="buy">
          <div class="price"><strong class="num">${m.price} OMR</strong><small>${m.pieces === 1 ? pc(1) : "per order of " + pc(m.pieces)}</small></div>
          <div class="qty-area">
            <button class="add-btn" data-act="inc" data-id="${m.id}">Add to order</button>
            <div class="stepper" hidden role="group" aria-label="Number of orders of ${m.name}">${stepper(m.id, m.name)}</div>
          </div>
        </div>
      </div>
    </article>`).join("");

  function showCategory(key, animate) {
    activeCat = key;
    tabs.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", t.dataset.cat === key));
    grid.querySelectorAll(".card").forEach((c) => {
      const on = c.dataset.cat === key;
      c.hidden = !on;
      c.classList.remove("enter");
      if (on && animate) { void c.offsetWidth; c.classList.add("enter"); }
    });
  }

  function sync() {
    const lines = Cart.lines(qty, MENU, CATEGORIES), n = Cart.count(lines);
    grid.querySelectorAll(".card").forEach((c) => {
      const q = qty[c.dataset.id] || 0;
      c.querySelector(".add-btn").hidden = q > 0;
      c.querySelector(".stepper").hidden = q === 0;
      c.querySelector(".step-qty").textContent = q;
      c.classList.toggle("selected", q > 0);
    });
    tabs.querySelectorAll(".tab").forEach((t) => { t.querySelector(".tab-dot").hidden = !lines.some((l) => l.item.category === t.dataset.cat); });
    bar.hidden = n === 0;
    $("#barCount").innerHTML = `<span class="num">${n}</span> ${n === 1 ? "item" : "items"}`;
    $("#barTotal").textContent = Cart.format(Cart.total(lines));
    bar.classList.remove("bump"); void bar.offsetWidth; bar.classList.add("bump");
    $("#cartLines").innerHTML = lines.map((l) => `
      <li class="line">
        <div class="line-info"><b>${l.item.name}</b><span>${pc(l.item.pieces)} × <span class="num">${l.qty}</span></span></div>
        <div class="stepper small">${stepper(l.item.id, l.item.name).replace('<span class="step-qty"', '<span class="step-qty"')}</div>
        <div class="line-total num">${Cart.format(l.total)}</div>
      </li>`).join("");
    document.querySelectorAll("#cartLines .step-qty").forEach((el, i) => { el.textContent = lines[i].qty; });
    $("#sheetTotal").textContent = Cart.format(Cart.total(lines));
    if (n > 0) $("#confirmOrder").href = Cart.url(SITE.whatsappNumber, Cart.message(lines, CATEGORIES, SITE.businessName));
    if (n === 0) closeSheet();
  }

  function change(id, d) { qty[id] = Math.max(0, (qty[id] || 0) + d); sync(); }
  function openSheet() { backdrop.hidden = false; document.body.classList.add("lock"); requestAnimationFrame(() => backdrop.classList.add("open")); }
  function closeSheet() { backdrop.classList.remove("open"); document.body.classList.remove("lock"); setTimeout(() => { if (!backdrop.classList.contains("open")) backdrop.hidden = true; }, 250); }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (b) return change(b.dataset.id, b.dataset.act === "inc" ? 1 : -1);
    const t = e.target.closest(".tab");
    if (t) {
      showCategory(t.dataset.cat, true);
      const menu = $("#menu"); if (window.scrollY > menu.offsetTop) menu.scrollIntoView({ behavior: "smooth" });
    }
  });
  $("#openCart").addEventListener("click", openSheet);
  $("#closeCart").addEventListener("click", closeSheet);
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeSheet(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !backdrop.hidden) closeSheet(); });
  $("#copyOrder").addEventListener("click", () => {
    const btn = $("#copyOrder"), lines = Cart.lines(qty, MENU, CATEGORIES);
    const text = Cart.message(lines, CATEGORIES, SITE.businessName);
    const done = () => { btn.textContent = "Copied. Paste it in WhatsApp: " + SITE.whatsappDisplay; };
    const fallback = () => { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (e) {} t.remove(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  });

  document.querySelectorAll("[data-ig]").forEach((a) => { a.href = SITE.instagramUrl; });
  document.querySelectorAll("[data-wa]").forEach((a) => { a.href = `https://wa.me/${SITE.whatsappNumber}`; });
  showCategory(activeCat, false); sync(); bar.hidden = true;
}
