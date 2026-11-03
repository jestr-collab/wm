const EMAIL = "tacocarts@gmail.com";

// PRODUCTS
// Names are placeholders — change them here and the site updates.
// To add a photo: save it in img/carts/ and add its name to "photos". The first photo is the main one.
const CATEGORIES = [
  { id: "taco", title: "Taco & Griddle Carts" },
  { id: "full", title: "Full Setup Carts" },
  { id: "more", title: "Salsa Bars, Grills & More" }
];

const PRODUCTS = [
  // Taco & griddle carts
  { cat: "taco", name: "Yellow Griddle & Fryer Cart", photos: ["yellow-fryer-1.jpg", "yellow-fryer-2.jpg"],
    text: "Griddle, fryer, deep well, fold-out side tray and an overhead shelf. Painted yellow." },
  { cat: "taco", name: "Red Griddle & Cazo Cart", photos: ["red-cazo-1.jpg", "red-cazo-2.jpg"],
    text: "Long griddle with a round cazo for carnitas or suadero, a deep well, side tray and overhead shelf. Painted red." },
  { cat: "taco", name: "Diamond Trompo Cart", photos: ["diamond-trompo-1.jpg", "diamond-trompo-2.jpg"],
    text: "Diamond-pattern stainless with a trompo box for al pastor, griddle, wells and holders on the side." },
  { cat: "taco", name: "Stainless Trompo & Griddle Cart", photos: ["trompo-griddle-1.jpg"],
    text: "All stainless with a trompo box, long griddle and an overhead shelf." },
  { cat: "taco", name: "Al Pastor Griddle Cart", photos: ["pastor-griddle-1.jpg"],
    text: "Vertical broiler for al pastor next to a griddle, on a black steel frame." },
  { cat: "taco", name: "Blue Griddle Cart", photos: ["blue-griddle-1.jpg"],
    text: "Griddle with steam pans on a light blue frame. Simple and easy to move." },
  { cat: "taco", name: "Stainless Taco Bar", photos: ["taco-bar-1.jpg"],
    text: "Griddle, steam pans, six round wells and a glass sneeze guard." },
  { cat: "taco", name: "Fryer & Burner Cart", photos: ["fryer-burner-1.jpg"],
    text: "Two fryer baskets and two ring burners for pots, on a black steel frame." },

  // Full setups
  { cat: "full", name: "Griddle Cart with Fridge", photos: ["fridge-griddle-1.jpg", "fridge-griddle-2.jpg"],
    text: "Three griddles, a refrigerated prep station and an overhead shelf with glass." },
  { cat: "full", name: "Full Kitchen Cart", photos: ["full-kitchen-1.jpg"],
    text: "Steam wells, burners, flat top and a fridge — a whole kitchen on wheels." },
  { cat: "full", name: "Steam Table & Griddle Cart", photos: ["steam-griddle-1.jpg", "steam-griddle-2.jpg"],
    text: "Two griddles, a food warmer and steam pans, with sliding doors below and an overhead shelf." },
  { cat: "full", name: "Steam Table Cart with Warming Drawer", photos: ["steam-warmer-1.jpg"],
    text: "Five-pan steam table, warming drawer, storage drawers and an overhead shelf." },

  // More
  { cat: "more", name: "Topping Bar", photos: ["topping-bar-1.jpg"],
    text: "Sixteen pans with lids under a sneeze guard. Great for salsas and toppings." },
  { cat: "more", name: "Round-Well Cart", photos: ["round-well-1.jpg"],
    text: "All stainless with six large and two small round wells." },
  { cat: "more", name: "Bar Cart with Ice Well", photos: ["bar-cart-1.jpg"],
    text: "Stainless top with a lid, deep ice well and an open shelf below." },
  { cat: "more", name: "Stainless Shelf Cart", photos: ["shelf-cart-1.jpg"],
    text: "Stainless top with two shelves underneath. Good for storage or a serving counter." },
  { cat: "more", name: "Charcoal Grill Cart", photos: ["charcoal-grill-1.jpg"],
    text: "Charcoal grill with a hinged lid on a rolling frame." },
  { cat: "more", name: "Cazo Stand", photos: ["cazo-stand-1.jpg"],
    text: "Heavy steel stand that holds a cazo over the burner." }
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function cartHTML(p, index) {
  const main = `img/carts/${p.photos[0]}`;
  const thumbs = p.photos.length > 1
    ? `<div class="thumbs">${p.photos.map((ph, i) => `
        <button type="button" class="thumb${i === 0 ? " active" : ""}" data-src="img/carts/${esc(ph)}" aria-label="Photo ${i + 1} of ${esc(p.name)}">
          <img src="img/carts/${esc(ph)}" alt="" loading="lazy">
        </button>`).join("")}</div>`
    : "";
  return `
    <div class="cart">
      <button type="button" class="cart-photo" data-zoom aria-label="See larger photo of ${esc(p.name)}">
        <img src="${esc(main)}" alt="${esc(p.name)}" loading="lazy">
        ${p.photos.length > 1 ? `<span class="photo-count">${p.photos.length} photos</span>` : ""}
      </button>
      ${thumbs}
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.text)}</p>
      <a class="button" href="#contact" data-cart="${index}">Ask About This Cart</a>
    </div>`;
}

function renderCarts() {
  const wrap = document.getElementById("cart-grid");
  wrap.innerHTML = CATEGORIES.map((c) => `
    <div class="cart-group">
      <h3 class="group-title">${esc(c.title)}</h3>
      <div class="cart-grid">
        ${PRODUCTS.map((p, i) => (p.cat === c.id ? cartHTML(p, i) : "")).join("")}
      </div>
    </div>`).join("");

  const select = document.getElementById("cart-select");
  PRODUCTS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.name;
    select.append(opt);
  });
}

function wireForm() {
  const form = document.getElementById("quote-form");
  const error = document.getElementById("form-error");
  const thanks = document.getElementById("form-thanks");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const ok = d.name.trim().length > 1 && (d.phone.match(/\d/g) || []).length >= 7 && d.message.trim().length > 2;
    error.hidden = ok;
    if (!ok) return;
    const lines = [`Name: ${d.name}`, `Phone: ${d.phone}`];
    if (d.email) lines.push(`Email: ${d.email}`);
    lines.push(`Cart: ${d.cart || "Not sure / custom"}`, "", d.message);
    const subject = `Quote request - ${d.cart || "Custom cart"} - ${d.name}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    thanks.hidden = false;
  });
}

function wireLightbox() {
  const box = document.getElementById("lightbox");
  const img = box.querySelector("img");
  document.addEventListener("click", (event) => {
    const zoom = event.target.closest("[data-zoom]");
    if (zoom) {
      const src = zoom.querySelector("img");
      img.src = src.src;
      img.alt = src.alt;
      box.showModal();
    }
  });
  box.addEventListener("click", () => box.close());
}

function init() {
  document.getElementById("year").textContent = String(new Date().getFullYear());
  renderCarts();
  wireForm();
  wireLightbox();

  document.addEventListener("click", (event) => {
    const thumb = event.target.closest(".thumb");
    if (thumb) {
      const cart = thumb.closest(".cart");
      cart.querySelector(".cart-photo img").src = thumb.dataset.src;
      cart.querySelectorAll(".thumb").forEach((t) => t.classList.toggle("active", t === thumb));
      return;
    }
    const link = event.target.closest("[data-cart]");
    if (link) {
      const product = PRODUCTS[Number(link.dataset.cart)];
      if (!product) return;
      document.getElementById("cart-select").value = product.name;
      const msg = document.querySelector('#quote-form [name="message"]');
      if (!msg.value.trim()) msg.value = `Hi, I'm interested in the ${product.name}. `;
    }
  });

  const burger = document.querySelector(".burger");
  const nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

init();
