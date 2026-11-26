import "./styles.css";
import { initFirebase, trackEvent, storeConfig } from "./firebase.js";
import { CATEGORIES, PRODUCTS, TESTIMONIALS, FAQS } from "./data/products.js";

const CART_STORAGE_KEY = "racik_bumi_cart_v1";

let activeCategory = "semua";
let cart = loadCart();
let toastTimer = null;

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Abaikan jika storage tidak tersedia
  }
}

function showToast(message) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 2400);
}

function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}

function addToCart(productId) {
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} ditambahkan ke keranjang`);
  trackEvent("add_to_cart", {
    currency: "IDR",
    value: product.price,
    items: [{ item_id: product.id, item_name: product.name, item_category: product.categoryLabel }]
  });
}

function updateCartQty(productId, delta) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function renderFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(
    (cat) => `
      <button
        type="button"
        class="filter-btn ${cat.id === activeCategory ? "is-active" : ""}"
        role="tab"
        aria-selected="${cat.id === activeCategory}"
        data-category="${cat.id}"
      >
        ${cat.label}
      </button>
    `
  ).join("");

  container.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      renderFilters();
      renderProducts();
      trackEvent("filter_catalog", { category: activeCategory });
    });
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const list =
    activeCategory === "semua"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeCategory);

  grid.innerHTML = list
    .map(
      (product) => `
      <article class="product-card">
        <div class="product-thumb" data-open-modal="${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="badge badge-${product.badgeTone}">${product.badge}</span>
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span>${product.categoryLabel}</span>
            <span>${product.unit}</span>
          </div>
          <h3 class="product-title" data-open-modal="${product.id}">${product.name}</h3>
          <p class="product-desc">${product.shortDesc}</p>
          <div class="product-footer">
            <span class="product-price">${formatRupiah(product.price)}</span>
            <div class="product-actions">
              <button
                type="button"
                class="btn-detail"
                data-open-modal="${product.id}"
                aria-label="Lihat detail ${product.name}"
                title="Detail produk"
              >
                i
              </button>
              <button type="button" class="btn-add" data-add-cart="${product.id}">
                + Keranjang
              </button>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  grid.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.addCart));
  });

  grid.querySelectorAll("[data-open-modal]").forEach((el) => {
    el.addEventListener("click", () => openProductModal(el.dataset.openModal));
  });
}

function openProductModal(productId) {
  const product = PRODUCTS.find((item) => item.id === productId);
  const modal = document.getElementById("productModal");
  const body = document.getElementById("modalBody");
  if (!product || !modal || !body) return;

  body.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="modal-info">
        <span class="section-kicker">${product.categoryLabel} • ${product.unit}</span>
        <h3 id="modalTitle">${product.name}</h3>
        <div class="modal-price">${formatRupiah(product.price)}</div>
        <p>${product.shortDesc}</p>
        <div class="modal-specs">
          <div>
            <strong>Komposisi Utama</strong>
            <span>${product.ingredients}</span>
          </div>
          <div>
            <strong>Keunggulan / Manfaat</strong>
            <span>${product.benefits}</span>
          </div>
          <div>
            <strong>Penyimpanan</strong>
            <span>${product.shelfLife}</span>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-block" id="modalAddBtn">
          Tambah ke Keranjang — ${formatRupiah(product.price)}
        </button>
      </div>
    </div>
  `;

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  document.getElementById("modalAddBtn")?.addEventListener("click", () => {
    addToCart(product.id);
    closeProductModal();
  });

  trackEvent("view_item", {
    currency: "IDR",
    value: product.price,
    items: [{ item_id: product.id, item_name: product.name }]
  });
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function renderCart() {
  const countEl = document.getElementById("cartCount");
  const listEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  if (!countEl || !listEl || !subtotalEl) return;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = String(totalItems);

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty">
        <strong>Keranjang masih kosong</strong>
        <p>Yuk pilih jamu segar atau roti hangat favorit Anda dari katalog.</p>
      </div>
    `;
    subtotalEl.textContent = formatRupiah(0);
    return;
  }

  let subtotal = 0;
  listEl.innerHTML = cart
    .map((entry) => {
      const product = PRODUCTS.find((p) => p.id === entry.id);
      if (!product) return "";
      const lineTotal = product.price * entry.qty;
      subtotal += lineTotal;
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <div class="cart-item-top">
              <strong>${product.name}</strong>
              <span>${formatRupiah(lineTotal)}</span>
            </div>
            <div class="cart-item-unit">${product.unit} • ${formatRupiah(product.price)}</div>
            <div class="cart-item-controls">
              <div class="qty-control">
                <button type="button" data-qty-minus="${product.id}" aria-label="Kurangi jumlah">&minus;</button>
                <span>${entry.qty}</span>
                <button type="button" data-qty-plus="${product.id}" aria-label="Tambah jumlah">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  subtotalEl.textContent = formatRupiah(subtotal);

  listEl.querySelectorAll("[data-qty-minus]").forEach((btn) => {
    btn.addEventListener("click", () => updateCartQty(btn.dataset.qtyMinus, -1));
  });
  listEl.querySelectorAll("[data-qty-plus]").forEach((btn) => {
    btn.addEventListener("click", () => updateCartQty(btn.dataset.qtyPlus, 1));
  });
}

function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (!drawer) return;
  drawer.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (!drawer) return;
  drawer.hidden = true;
  document.body.style.overflow = "";
}

function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    showToast("Pilih minimal 1 produk terlebih dahulu ya.");
    return;
  }

  const name = document.getElementById("customerName")?.value.trim() || "-";
  const note = document.getElementById("customerNote")?.value.trim() || "-";

  let subtotal = 0;
  const lines = cart
    .map((entry, idx) => {
      const product = PRODUCTS.find((p) => p.id === entry.id);
      if (!product) return "";
      const lineTotal = product.price * entry.qty;
      subtotal += lineTotal;
      return `${idx + 1}. ${product.name} (${product.unit}) x${entry.qty} = ${formatRupiah(lineTotal)}`;
    })
    .filter(Boolean);

  const message = [
    "Halo Racik Bumi, saya ingin memesan:",
    "",
    ...lines,
    "",
    `Estimasi Total: ${formatRupiah(subtotal)}`,
    `Nama: ${name}`,
    `Catatan/Alamat: ${note}`,
    "",
    "Mohon info ketersediaan & total ongkirnya. Terima kasih!"
  ].join("\n");

  trackEvent("begin_checkout", {
    currency: "IDR",
    value: subtotal,
    item_count: cart.reduce((sum, item) => sum + item.qty, 0)
  });

  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

function renderTestimonials() {
  const grid = document.getElementById("testimonialGrid");
  if (!grid) return;

  grid.innerHTML = TESTIMONIALS.map(
    (item) => `
      <article class="testimonial-card reveal">
        <blockquote>“${item.quote}”</blockquote>
        <div class="testimonial-author">
          <strong>${item.name}</strong>
          <span>${item.role}</span>
        </div>
      </article>
    `
  ).join("");
}

function renderFaqs() {
  const list = document.getElementById("faqList");
  if (!list) return;

  list.innerHTML = FAQS.map(
    (faq, index) => `
      <div class="faq-item ${index === 0 ? "is-open" : ""}">
        <button type="button" class="faq-trigger" aria-expanded="${index === 0}">
          <span>${faq.question}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-panel" ${index === 0 ? "" : "hidden"}>
          ${faq.answer}
        </div>
      </div>
    `
  ).join("");

  list.querySelectorAll(".faq-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".faq-item");
      const panel = item.querySelector(".faq-panel");
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      panel.hidden = !isOpen;
    });
  });
}

function hydrateStoreContacts() {
  const igHandle = storeConfig.instagramHandle.replace(/^@/, "");
  const igUrl = `https://instagram.com/${igHandle}`;
  const defaultWaUrl = buildWhatsAppUrl(
    "Halo Racik Bumi, saya ingin bertanya tentang jamu tradisional dan roti olahan UMKM hari ini."
  );

  const addressEl = document.getElementById("storeAddressDisplay");
  const footerAddressEl = document.getElementById("footerAddress");
  const igDisplayEl = document.getElementById("instagramDisplay");
  const footerIgEl = document.getElementById("footerIgLink");
  const footerWaEl = document.getElementById("footerWaLink");
  const mobileWaEl = document.getElementById("mobileWaBtn");
  const yearEl = document.getElementById("currentYear");

  if (addressEl) addressEl.textContent = storeConfig.storeAddress;
  if (footerAddressEl) footerAddressEl.textContent = storeConfig.storeAddress;
  if (igDisplayEl) igDisplayEl.textContent = `@${igHandle}`;
  if (footerIgEl) {
    footerIgEl.href = igUrl;
    footerIgEl.textContent = `Instagram @${igHandle}`;
  }
  if (footerWaEl) {
    footerWaEl.href = defaultWaUrl;
    footerWaEl.target = "_blank";
    footerWaEl.rel = "noopener noreferrer";
  }
  if (mobileWaEl) {
    mobileWaEl.href = defaultWaUrl;
    mobileWaEl.target = "_blank";
    mobileWaEl.rel = "noopener noreferrer";
  }
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function bindEvents() {
  const header = document.getElementById("siteHeader");
  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
    },
    { passive: true }
  );

  document.getElementById("openCartBtn")?.addEventListener("click", openCartDrawer);
  document.getElementById("closeCartBtn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("checkoutWaBtn")?.addEventListener("click", checkoutViaWhatsApp);

  document.getElementById("cartDrawer")?.addEventListener("click", (event) => {
    if (event.target.id === "cartDrawer") closeCartDrawer();
  });

  document.getElementById("closeModalBtn")?.addEventListener("click", closeProductModal);
  document.getElementById("productModal")?.addEventListener("click", (event) => {
    if (event.target.id === "productModal") closeProductModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProductModal();
      closeCartDrawer();
    }
  });

  document.getElementById("heroWaBtn")?.addEventListener("click", () => {
    trackEvent("click_whatsapp_cta", { location: "hero" });
    window.open(
      buildWhatsAppUrl("Halo Racik Bumi, saya ingin konsultasi & pesan jamu tradisional serta roti rumahan."),
      "_blank",
      "noopener,noreferrer"
    );
  });

  document.getElementById("hampersWaBtn")?.addEventListener("click", () => {
    trackEvent("click_whatsapp_cta", { location: "hampers" });
    window.open(
      buildWhatsAppUrl("Halo Racik Bumi, saya tertarik dengan paket Snack Box / Hampers Sehat / Reseller. Boleh minta katalog lengkapnya?"),
      "_blank",
      "noopener,noreferrer"
    );
  });

  document.querySelectorAll("[data-jump-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.jumpCategory;
      renderFilters();
      renderProducts();
      document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  mobileMenuBtn?.addEventListener("click", () => {
    const isHidden = mobileNav.hidden;
    mobileNav.hidden = !isHidden;
    mobileMenuBtn.setAttribute("aria-expanded", String(isHidden));
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.hidden = true;
      mobileMenuBtn?.setAttribute("aria-expanded", "false");
    });
  });
}

function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

async function bootstrap() {
  hydrateStoreContacts();
  renderFilters();
  renderProducts();
  renderCart();
  renderTestimonials();
  renderFaqs();
  bindEvents();
  setupScrollReveal();
  await initFirebase();
}

bootstrap();
