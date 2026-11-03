const PHONE_TEL = "+15622217973";
const EMAILS = "info@elcharrotacocarts.com,tacocarts@gmail.com";

const PRODUCTS = [
  {
    id: "charcoal",
    code: "EC-02",
    name: "Charcoal Griddle",
    summary: "Two steamers, a side tray, and a propane tank holder.",
    finish: "Charcoal",
    body: "#3a3f46",
    ink: "#f4f0e6",
    top: "Griddle",
    steamLabel: "2 steamers",
    note: "Side tray",
    steamers: 2,
    trompo: false,
    comal: false,
    burners: 0,
    tank: true,
    tray: true,
    counter: false,
    kind: "griddle",
    tags: ["griddles", "steam"]
  },
  {
    id: "harbor",
    code: "EC-03",
    name: "Harbor Blue",
    summary: "Same layout as the charcoal cart, in blue.",
    finish: "Blue",
    body: "#1d4e8c",
    ink: "#f4f0e6",
    top: "Griddle",
    steamLabel: "2 steamers",
    note: "Side tray",
    steamers: 2,
    trompo: false,
    comal: false,
    burners: 0,
    tank: true,
    tray: true,
    counter: false,
    kind: "griddle",
    tags: ["griddles", "steam"]
  },
  {
    id: "convex",
    code: "EC-24",
    name: "Convex 24",
    summary: "24-inch griddle, one steamer, and a convex comal.",
    finish: "Stainless",
    body: "#c5ced6",
    ink: "#1a1c1f",
    top: "24 in",
    steamLabel: "1 steamer",
    note: "Convex comal",
    steamers: 1,
    trompo: false,
    comal: true,
    burners: 0,
    tank: true,
    tray: false,
    counter: false,
    kind: "griddle",
    tags: ["griddles", "steam"]
  },
  {
    id: "amarillo",
    code: "EC-36",
    name: "Amarillo 36",
    summary: "36-inch griddle and four steamers, in yellow. A comal can be added.",
    finish: "Yellow",
    body: "#e2b434",
    ink: "#1c1404",
    top: "36 in",
    steamLabel: "4 steamers",
    note: "Comal on request",
    steamers: 4,
    trompo: false,
    comal: false,
    burners: 0,
    tank: true,
    tray: false,
    counter: false,
    kind: "griddle",
    tags: ["griddles", "steam"]
  },
  {
    id: "comal",
    code: "EC-04",
    name: "Comal Doble",
    summary: "Two large burners and a wide comal for tortillas.",
    finish: "Oxide",
    body: "#8c3d32",
    ink: "#f6efe8",
    top: "Comal",
    steamLabel: "No steamers",
    note: "2 burners",
    steamers: 0,
    trompo: false,
    comal: true,
    burners: 2,
    tank: true,
    tray: false,
    counter: false,
    kind: "griddle",
    tags: ["griddles"]
  },
  {
    id: "six",
    code: "EC-06",
    name: "Six-Steamer Grill",
    summary: "Six steamers with side counter space.",
    finish: "Stainless",
    body: "#d5dbe1",
    ink: "#1a1c1f",
    top: "Grill",
    steamLabel: "6 steamers",
    note: "Side counter",
    steamers: 6,
    trompo: false,
    comal: false,
    burners: 0,
    tank: true,
    tray: false,
    counter: true,
    kind: "griddle",
    tags: ["steam"]
  },
  {
    id: "pastor",
    code: "EC-20",
    name: "Al Pastor Deluxe",
    summary: "20-inch griddle with an al pastor trompo.",
    finish: "Brick",
    body: "#7c2f34",
    ink: "#f6efe8",
    top: "20 in",
    steamLabel: "No steamers",
    note: "Trompo",
    steamers: 0,
    trompo: true,
    comal: false,
    burners: 0,
    tank: true,
    tray: false,
    counter: false,
    kind: "griddle",
    tags: ["griddles", "pastor"]
  },
  {
    id: "trompo",
    code: "EC-61",
    name: "Trompo Line",
    summary: "Griddle, six steamers, and an al pastor trompo.",
    finish: "Stainless",
    body: "#c9d0d7",
    ink: "#1a1c1f",
    top: "Griddle",
    steamLabel: "6 steamers",
    note: "Trompo",
    steamers: 6,
    trompo: true,
    comal: false,
    burners: 0,
    tank: true,
    tray: false,
    counter: false,
    kind: "griddle",
    tags: ["griddles", "steam", "pastor"]
  },
  {
    id: "salsa",
    code: "EC-08",
    name: "Salsa Bar",
    summary: "Eight third-size pans under glass, with doors.",
    finish: "Black",
    body: "#2a2e33",
    ink: "#f3efe6",
    top: "8 pans",
    steamLabel: "No steamers",
    note: "Glass doors",
    steamers: 0,
    trompo: false,
    comal: false,
    burners: 0,
    tank: false,
    tray: false,
    counter: false,
    kind: "salsa",
    tags: ["service"]
  }
];

let lastTrigger = null;

// Photos: drop real photos into the img/ folder with these names and they show up automatically.
//   img/hero.jpg, img/shop-welding.jpg, img/shop-carts.jpg, img/shop-detail.jpg, img/shop-team.jpg
//   img/carts/<cart id>.jpg  (for example img/carts/trompo.jpg, img/carts/harbor.jpg)
// Until a photo exists, carts show the drawing. Shop photos show a labeled placeholder only while
// you preview the file on your own computer; on the live site, missing shop photos are hidden.
const IS_DRAFT = location.protocol === "file:" || /^(localhost|127\.|0\.0\.0\.0|192\.168\.)/.test(location.hostname);

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function specLine(product) {
  const parts = [product.top, product.steamLabel];
  if (product.note && product.note.toLowerCase() !== product.finish.toLowerCase()) parts.push(product.note);
  parts.push(product.finish);
  return parts.join(" · ");
}

function cartSVG(product, suffix) {
  const gid = `${product.id}-${suffix}`;
  const body = `
    <rect x="118" y="236" width="530" height="156" fill="${product.body}" stroke="#1c2126" stroke-width="3"/>
    <rect x="118" y="236" width="530" height="12" fill="#ffffff" fill-opacity="0.22"/>
    <rect x="118" y="372" width="530" height="20" fill="#000000" fill-opacity="0.28"/>
    <path d="M380 258 V376" stroke="${product.ink}" stroke-opacity="0.35" stroke-width="2"/>
    <rect x="146" y="282" width="150" height="40" rx="4" fill="#b8321f" stroke="#1c2126" stroke-width="2"/>
    <text x="221" y="309" text-anchor="middle" fill="#f6efe3" font-family="Alfa Slab One, Rockwell, Georgia, serif" font-size="19">EL CHARRO</text>
  `;
  const tray = product.tray ? `<rect x="40" y="348" width="86" height="14" fill="#2a3036"/>` : "";
  const counter = product.counter ? `<rect x="630" y="214" width="120" height="16" fill="#2a3036"/>` : "";
  return `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="steel-${gid}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#f7f9fb"/>
          <stop offset="0.45" stop-color="#d0d7de"/>
          <stop offset="1" stop-color="#8d98a2"/>
        </linearGradient>
      </defs>
      <ellipse cx="400" cy="470" rx="290" ry="14" fill="#5a3e22" opacity="0.22"/>
      <path d="M118 318 H46 V148" fill="none" stroke="#2a3036" stroke-width="14" stroke-linejoin="miter"/>
      <rect x="30" y="132" width="32" height="18" fill="#1a1d21"/>
      ${tray}
      ${body}
      ${product.kind === "salsa" ? salsaTop(product) : cookTop(product, gid)}
      ${counter}
      ${wheels(gid)}
      ${product.tank ? tank() : ""}
    </svg>
  `;
}

function cookTop(product, gid) {
  const bayX = 158;
  const bayW = product.trompo ? 300 : product.comal ? 250 : 450;
  return `
    <rect x="138" y="128" width="490" height="36" fill="#3e4650"/>
    <rect x="138" y="164" width="490" height="74" fill="url(#steel-${gid})" stroke="#1c2126" stroke-width="2.5"/>
    <rect x="138" y="224" width="490" height="12" fill="#6d7782"/>
    ${burnerMarks(product)}
    ${product.comal ? `<ellipse cx="520" cy="200" rx="86" ry="22" fill="#e4eaee" stroke="#1c2126" stroke-width="2.5"/>` : ""}
    ${steamerRow(product.steamers, bayX, 164, bayW)}
    ${product.trompo ? trompo() : ""}
  `;
}

function salsaTop(product) {
  const colors = ["#b4332a", "#2f7d4a", "#d4a24a", "#6a3b2c", "#d45a3c", "#245c43", "#e0c56a", "#8d3d4a"];
  const pans = colors.map((color, index) => {
    const x = 168 + index * 56;
    return `<rect x="${x}" y="186" width="46" height="32" rx="2" fill="${color}" stroke="#1c2126" stroke-width="1.5"/>`;
  }).join("");
  return `
    <rect x="150" y="118" width="470" height="118" fill="rgba(255,255,255,0.16)" stroke="${product.ink}" stroke-width="2.5"/>
    <path d="M150 168 H620" stroke="${product.ink}" stroke-opacity="0.7" stroke-width="1.5"/>
    ${pans}
    <rect x="250" y="278" width="92" height="78" fill="none" stroke="${product.ink}" stroke-width="1.8"/>
    <rect x="356" y="278" width="92" height="78" fill="none" stroke="${product.ink}" stroke-width="1.8"/>
    <rect x="334" y="312" width="12" height="4" fill="${product.ink}"/>
    <rect x="440" y="312" width="12" height="4" fill="${product.ink}"/>
  `;
}

function burnerMarks(product) {
  if (!product.burners) return "";
  let marks = "";
  for (let i = 0; i < product.burners; i += 1) {
    const cx = 230 + i * 96;
    marks += `<circle cx="${cx}" cy="200" r="20" fill="none" stroke="#2a3036" stroke-width="3.5"/>
      <circle cx="${cx}" cy="200" r="5" fill="#ff4d1c"/>`;
  }
  return marks;
}

function steamerRow(count, x, baseY, width) {
  if (!count) return "";
  const gap = 12;
  const sw = Math.min(58, (width - gap * (count - 1)) / count);
  const row = count * sw + (count - 1) * gap;
  const start = x + Math.max(0, (width - row) / 2);
  let out = "";
  for (let i = 0; i < count; i += 1) {
    const cx = start + i * (sw + gap) + sw / 2;
    out += steamer(cx, baseY, sw);
  }
  return out;
}

function steamer(cx, baseY, sw) {
  const sh = sw * 1.05;
  const x = cx - sw / 2;
  const ry = Math.max(5, sw * 0.2);
  const top = baseY - sh;
  return `
    <ellipse cx="${cx}" cy="${baseY}" rx="${sw / 2}" ry="${ry}" fill="#8e98a2"/>
    <path d="M${x} ${top + ry} h${sw} v${sh - ry} h-${sw} z" fill="#e7edf2" stroke="#1c2126" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${top + ry}" rx="${sw / 2}" ry="${ry}" fill="#f8fafc" stroke="#1c2126" stroke-width="2"/>
    <rect x="${cx - 3}" y="${top - 6}" width="6" height="12" rx="1" fill="#2a3036"/>
  `;
}

function trompo() {
  return `
    <g>
      <rect x="572" y="46" width="8" height="124" fill="#c6a15b"/>
      <polygon points="576,78 640,164 512,164" fill="#6e2e24"/>
      <polygon points="576,112 622,164 530,164" fill="#8f4030"/>
      <polygon points="576,138 602,164 550,164" fill="#c46a48"/>
      <ellipse cx="576" cy="164" rx="64" ry="12" fill="#5c261c" stroke="#1c2126" stroke-width="2"/>
      <circle cx="576" cy="44" r="7" fill="#eef2f5" stroke="#1c2126" stroke-width="2"/>
    </g>
  `;
}

function wheels(gid) {
  return [210, 548].map((cx) => `
    <g>
      <circle cx="${cx}" cy="412" r="52" fill="#14171b" stroke="#9aa3ad" stroke-width="3"/>
      <circle cx="${cx}" cy="412" r="28" fill="url(#steel-${gid})" stroke="#1c2126" stroke-width="2.5"/>
      <circle cx="${cx}" cy="412" r="8" fill="#ff4d1c"/>
      <circle cx="${cx}" cy="412" r="3" fill="#1a1c1f"/>
    </g>
  `).join("");
}

function tank() {
  return `
    <g>
      <rect x="648" y="318" width="18" height="10" fill="#2a3036"/>
      <rect x="664" y="268" width="58" height="112" rx="26" fill="#d5dce3" stroke="#1c2126" stroke-width="2.5"/>
      <rect x="678" y="248" width="30" height="22" rx="2" fill="#2c3136"/>
      <circle cx="693" cy="300" r="6" fill="#c44722"/>
    </g>
  `;
}

function showFallback(slot) {
  const fb = slot.dataset.fallback || "";
  if (fb.startsWith("cart:")) {
    const product = PRODUCTS.find((item) => item.id === fb.slice(5));
    if (product) {
      slot.innerHTML = `<div class="art">${cartSVG(product, slot.closest(".card") ? "card" : "hero")}</div>`;
      return;
    }
  }
  if (IS_DRAFT) {
    const todo = document.createElement("div");
    todo.className = "photo-todo";
    todo.innerHTML = `<span><b>Photo goes here</b>${esc(slot.dataset.label || "")}<br><small>${esc(slot.dataset.photo)}</small></span>`;
    slot.replaceChildren(todo);
  } else {
    const fig = slot.closest("figure") || slot;
    fig.hidden = true;
    const gallery = slot.closest(".gallery");
    if (gallery && !gallery.querySelector("figure:not([hidden])")) gallery.hidden = true;
  }
}

function mountPhotos(root) {
  root.querySelectorAll(".photo[data-photo]").forEach((slot) => {
    if (slot.dataset.mounted) return;
    slot.dataset.mounted = "1";
    const img = new Image();
    img.alt = slot.dataset.alt || "";
    img.decoding = "async";
    img.onload = () => slot.replaceChildren(img);
    img.onerror = () => showFallback(slot);
    img.src = slot.dataset.photo;
  });
}

function renderCatalogue(filter) {
  const grid = document.getElementById("catalogue-grid");
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty-note");
  const items = PRODUCTS.filter((product) => filter === "all" || product.tags.includes(filter));
  grid.innerHTML = items.map((product) => {
    const chips = [product.top, product.steamLabel.startsWith("No") ? "" : product.steamLabel, product.note, product.tank ? "Propane holder" : ""]
      .filter((v, i, all) => v && all.indexOf(v) === i);
    return `
    <article class="card" id="cart-${product.id}">
      <div class="photo" data-photo="img/carts/${esc(product.id)}.jpg" data-alt="${esc(product.name)} taco cart" data-fallback="cart:${esc(product.id)}"></div>
      <div class="card-body">
        <div class="card-top">
          <h3>${esc(product.name)}</h3>
          <span class="swatch"><i style="background:${esc(product.body)}"></i>${esc(product.finish)}</span>
        </div>
        <p>${esc(product.summary)}</p>
        <ul class="chips">${chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        <button class="btn btn-dark" type="button" data-order="${esc(product.id)}">Ask about this cart</button>
      </div>
    </article>`;
  }).join("");
  if (count) count.textContent = `${items.length} ${items.length === 1 ? "cart" : "carts"}`;
  empty.hidden = items.length !== 0;
  mountPhotos(grid);
}

function field(form, name) {
  return form.querySelector(`[name="${name}"]`);
}

function readForm(form) {
  const data = new FormData(form);
  return {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    email: String(data.get("email") || "").trim(),
    business: String(data.get("business") || "").trim(),
    contact: String(data.get("contact") || "").trim(),
    quantity: String(data.get("quantity") || "1").trim(),
    needed: String(data.get("needed") || "").trim(),
    service: String(data.get("service") || "").trim(),
    finish: String(data.get("finish") || "").trim(),
    build: String(data.get("build") || "").trim(),
    message: String(data.get("message") || "").trim(),
    cartId: String(data.get("cartId") || "").trim(),
    cartName: String(data.get("cartName") || "").trim(),
    spec: String(data.get("spec") || "").trim(),
    gear: data.getAll("gear").map(String)
  };
}

function clearErrors(form) {
  form.querySelectorAll("[data-error-for]").forEach((node) => {
    node.textContent = "";
  });
  form.querySelectorAll("[aria-invalid]").forEach((node) => node.removeAttribute("aria-invalid"));
  const alert = form.querySelector("[data-alert]");
  if (alert) {
    alert.hidden = true;
    alert.textContent = "";
  }
}

function validate(form, data) {
  clearErrors(form);
  const errors = [];
  const set = (name, message) => {
    errors.push(message);
    const slot = form.querySelector(`[data-error-for="${name}"]`);
    const input = field(form, name);
    if (slot) slot.textContent = message;
    if (input) input.setAttribute("aria-invalid", "true");
  };
  if (data.name.length < 2) set("name", "Add your name.");
  if ((data.phone.match(/\d/g) || []).length < 7) set("phone", "Add a phone number.");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) set("email", "That email looks incomplete.");
  if (data.cartId === "custom" && data.message.length < 8) set("message", "Tell the shop what the cart has to do.");
  const alert = form.querySelector("[data-alert]");
  if (errors.length && alert) {
    alert.hidden = false;
    alert.textContent = "Check the highlighted fields, or call the shop.";
    const first = form.querySelector("[aria-invalid='true']");
    first?.focus();
  }
  return errors.length === 0;
}

function compose(data) {
  const lines = [
    "Hi El Charro, I'd like a quote.",
    "",
    `Cart: ${data.cartName}`
  ];
  if (data.spec) lines.push(`Spec: ${data.spec}`);
  if (data.finish) lines.push(`Finish / color: ${data.finish}`);
  if (data.quantity) lines.push(`Quantity: ${data.quantity}`);
  if (data.service) lines.push(`Service: ${data.service}`);
  if (data.build) lines.push(`Build: ${data.build}`);
  if (data.gear.length) lines.push(`Include: ${data.gear.join(", ")}`);
  lines.push("", `Name: ${data.name}`, `Phone: ${data.phone}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.business) lines.push(`Business: ${data.business}`);
  if (data.contact) lines.push(`Preferred contact: ${data.contact}`);
  if (data.needed) lines.push(`Needed by: ${data.needed}`);
  lines.push("", "Notes:", data.message || "Same as the cart on your website.");
  lines.push("", "Please call me with a price. Thank you!");
  return lines.join("\n");
}

function shortText(data) {
  const bits = [
    "Hi El Charro, quote request",
    data.cartName,
    data.quantity ? `Qty ${data.quantity}` : "",
    data.name,
    data.phone,
    data.message
  ].filter(Boolean);
  const text = bits.join(". ");
  return text.length > 280 ? `${text.slice(0, 277)}...` : text;
}

function smsHref(text) {
  const body = encodeURIComponent(text);
  const apple = /iPhone|iPad|iPod/.test(navigator.userAgent);
  return apple ? `sms:${PHONE_TEL}&body=${body}` : `sms:${PHONE_TEL}?body=${body}`;
}

function showTicket(form, data) {
  const text = compose(data);
  const result = form.querySelector(".result");
  const fields = form.querySelector(".fields");
  result.replaceChildren();

  const title = document.createElement("h3");
  title.textContent = "Almost done — send it.";
  const copy = document.createElement("p");
  copy.textContent = "Tap a button below to email or text this to the shop. We'll call you back during shop hours, 8:00am–5:00pm.";
  const pre = document.createElement("pre");
  pre.className = "order-text";
  pre.textContent = text;

  const actions = document.createElement("div");
  actions.className = "result-actions";

  const subject = data.cartId === "custom"
    ? `Custom cart quote — ${data.name}`
    : `Quote: ${data.cartName} — ${data.name}`;
  const mail = document.createElement("a");
  mail.className = "btn btn-red";
  mail.href = `mailto:${EMAILS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  mail.textContent = "Send by email";

  const sms = document.createElement("a");
  sms.className = "btn btn-outline";
  sms.href = smsHref(shortText(data));
  sms.textContent = "Text the shop";

  const call = document.createElement("a");
  call.className = "btn btn-outline";
  call.href = `tel:${PHONE_TEL}`;
  call.textContent = "Call (562) 221-7973";

  const copyBtn = document.createElement("button");
  copyBtn.className = "btn btn-outline";
  copyBtn.type = "button";
  copyBtn.textContent = "Copy message";
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied";
    } catch {
      copyBtn.textContent = "Copy blocked — use email";
    }
  });

  const edit = document.createElement("button");
  edit.className = "btn btn-outline";
  edit.type = "button";
  edit.textContent = "Edit message";
  edit.addEventListener("click", () => {
    result.hidden = true;
    fields.hidden = false;
    field(form, "name")?.focus();
  });

  actions.append(mail, sms, call, copyBtn, edit);
  result.append(title, copy, pre, actions);
  fields.hidden = true;
  result.hidden = false;
  title.focus?.();
  result.scrollIntoView({ block: "nearest" });
}

function wireForm(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = readForm(form);
    if (!validate(form, data)) return;
    showTicket(form, data);
  });
}

function openOrder(id, trigger) {
  const product = PRODUCTS.find((item) => item.id === id);
  const dialog = document.getElementById("order-dialog");
  const form = document.getElementById("order-form");
  if (!product || !dialog || !form) return;
  lastTrigger = trigger || null;
  form.querySelector(".fields").hidden = false;
  form.querySelector(".result").hidden = true;
  document.getElementById("order-title").textContent = product.name;
  document.getElementById("order-spec").textContent = specLine(product);
  field(form, "cartId").value = product.id;
  field(form, "cartName").value = product.name;
  field(form, "spec").value = specLine(product);
  field(form, "finish").value = product.finish;
  if (location.hash !== `#order-${product.id}`) {
    history.replaceState(null, "", `#order-${product.id}`);
  }
  if (!dialog.open) dialog.showModal();
  field(form, "name")?.focus();
}

function closeMenu() {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  nav?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function init() {
  document.getElementById("year").textContent = String(new Date().getFullYear());

  mountPhotos(document);
  renderCatalogue("all");

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((item) => {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      renderCatalogue(button.dataset.filter);
    });
  });

  document.addEventListener("click", (event) => {
    const order = event.target.closest("[data-order]");
    if (order) {
      openOrder(order.dataset.order, order);
      return;
    }
    const interest = event.target.closest("[data-interest]");
    if (interest) {
      const note = field(document.getElementById("custom-form"), "message");
      const line = interest.dataset.interest;
      if (note && !note.value.includes(line)) {
        note.value = note.value ? `${note.value.trim()}\n${line}` : line;
      }
      document.getElementById("custom").scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      });
      note?.focus();
    }
  });

  wireForm(document.getElementById("order-form"));
  wireForm(document.getElementById("custom-form"));

  const dialog = document.getElementById("order-dialog");
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    if (location.hash.startsWith("#order-")) {
      history.replaceState(null, "", `${location.pathname}${location.search}`);
    }
    lastTrigger?.focus();
  });

  const toggle = document.querySelector(".nav-toggle");
  toggle.addEventListener("click", () => {
    const nav = document.getElementById("site-nav");
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.getElementById("site-nav").addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 880) closeMenu();
  });


  const hash = location.hash.replace("#", "");
  if (hash.startsWith("order-")) openOrder(hash.slice(6));
}

init();
