# Racik Bumi — Landing Page UMKM

Landing page resmi untuk UMKM **Racik Bumi** (`racik-bumi.web.app`), dibangun dengan **Vite + Firebase SDK + Firebase Hosting** di dalam project Firebase `pustakakarya-id`.

## Struktur Project

- `.env` — Variabel lingkungan Firebase & kontak UMKM (tidak ikut di-commit ke Git).
- `.env.example` — Template variabel lingkungan.
- `firebase.json` & `.firebaserc` — Konfigurasi Firebase Hosting multi-site (`site: "racik-bumi"`, project `pustakakarya-id`).
- `src/firebase.js` — Inisialisasi Firebase App & Firebase Analytics via `import.meta.env`.
- `src/data/products.js` — Data katalog produk (jamu tradisional, roti, makanan ringan, paket hemat), testimoni, dan FAQ yang mudah diubah.
- `src/main.js` & `src/styles.css` — Interaksi keranjang belanja, modal detail produk, checkout WhatsApp, dan tampilan responsif.
- `public/images/` — Aset foto produk & hero.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

## Mengubah Nomor WhatsApp / Alamat / Instagram

Edit file `.env`:

```env
VITE_WHATSAPP_NUMBER=6281234567890
VITE_INSTAGRAM_HANDLE=racikbumi.id
VITE_STORE_ADDRESS=Jl. Nusantara Asri No. 18, Yogyakarta
```

## Deploy ke Firebase Hosting (`racik-bumi.web.app`)

1. Login ke akun Google Firebase (cukup sekali):
   ```bash
   npm run firebase:login
   ```
   *(Atau install global terlebih dahulu: `npm install -g firebase-tools`, lalu `firebase login`)*

2. Build dan deploy ke site `racik-bumi`:
   ```bash
   npm run deploy
   ```
   Perintah ini otomatis menjalankan `vite build` ke folder `dist/` lalu `firebase deploy --only hosting:racik-bumi`.
