export const CATEGORIES = [
  { id: "semua", label: "Semua Produk" },
  { id: "jamu", label: "Jamu Tradisional" },
  { id: "roti", label: "Roti & Kue" },
  { id: "camilan", label: "Makanan Ringan" },
  { id: "paket", label: "Paket Hemat" }
];

export const PRODUCTS = [
  {
    id: "kunyit-asam-segar",
    name: "Jamu Kunyit Asam Segar",
    category: "jamu",
    categoryLabel: "Jamu Tradisional",
    badge: "Terlaris",
    badgeTone: "gold",
    price: 18000,
    unit: "Botol 350 ml",
    image: "/images/jamu-kunyit-asam.jpg",
    shortDesc: "Perpaduan kunyit empu segar, asam jawa pilihan, dan gula aren murni dengan rasa segar seimbang.",
    ingredients: "Kunyit empu tua, asam jawa tanpa biji, gula aren organik, daun pandan, sejumput garam laut.",
    benefits: "Membantu menyegarkan badan, menjaga daya tahan tubuh, dan meredakan pegal setelah beraktivitas.",
    shelfLife: "Tahan 5 hari di kulkas (4°C). Nikmat disajikan dingin atau hangat."
  },
  {
    id: "beras-kencur-wangi",
    name: "Jamu Beras Kencur Wangi",
    category: "jamu",
    categoryLabel: "Jamu Tradisional",
    badge: "Favorit Keluarga",
    badgeTone: "forest",
    price: 18000,
    unit: "Botol 350 ml",
    image: "/images/jamu-beras-kencur.jpg",
    shortDesc: "Aroma kencur lembut berpadu beras sangrai wangi dan manis alami gula aren, ramah untuk semua usia.",
    ingredients: "Beras putih pilihan sangrai, rimpang kencur segar, jahe emprit, gula aren, kayu manis.",
    benefits: "Menambah kebugaran harian, menghangatkan tenggorokan, dan membantu memulihkan stamina.",
    shelfLife: "Tahan 4 hari di kulkas. Kocok perlahan sebelum dinikmati."
  },
  {
    id: "wedang-jahe-merah",
    name: "Wedang Jahe Merah Rempah",
    category: "jamu",
    categoryLabel: "Jamu Tradisional",
    badge: "Hangat Alami",
    badgeTone: "terra",
    price: 20000,
    unit: "Botol 350 ml",
    image: "/images/jamu-beras-kencur.jpg",
    shortDesc: "Seduhan jahe merah pedas hangat dengan serai, kapulaga, dan cengkeh untuk menemani malam atau cuaca hujan.",
    ingredients: "Jahe merah segar, serai geprek, kayu manis Ceylon, cengkeh, kapulaga, gula aren murni.",
    benefits: "Menghangatkan tubuh, melegakan pernapasan, dan cocok diminum saat masuk angin atau lelah.",
    shelfLife: "Tahan 6 hari di kulkas. Dapat dihangatkan kembali tanpa direbus mendidih."
  },
  {
    id: "roti-sisir-mentega",
    name: "Roti Sisir Mentega Klasik",
    category: "roti",
    categoryLabel: "Roti & Kue",
    badge: "Baru Panggang",
    badgeTone: "terra",
    price: 26000,
    unit: "1 Loyang (8 potong)",
    image: "/images/roti-artisan-umkm.jpg",
    shortDesc: "Roti rumahan bertekstur lembut berserat halus dengan olesan mentega harum dan manis tipis yang bikin rindu.",
    ingredients: "Tepung terigu protein tinggi, susu segar, kuning telur kampung, mentega pilihan, gula tebu alami.",
    benefits: "Tanpa pengawet dan tanpa pelembut kimia. Dipanggang dalam batch kecil setiap pagi.",
    shelfLife: "Tahan 3 hari di suhu ruang dalam wadah tertutup rapat."
  },
  {
    id: "milk-bun-pandan-cokelat",
    name: "Roti Susu Pandan & Cokelat",
    category: "roti",
    categoryLabel: "Roti & Kue",
    badge: "Terlaris",
    badgeTone: "gold",
    price: 28000,
    unit: "Box isi 4 pcs",
    image: "/images/roti-artisan-umkm.jpg",
    shortDesc: "Roti susu empuk beraroma sari daun pandan asli dengan isian krim cokelat hitam rumahan yang lembut.",
    ingredients: "Sari pandan suji segar, susu full cream, mentega tawar, cokelat couverture, ragi alami.",
    benefits: "Cocok sebagai bekal anak, teman minum jamu sore, atau suguhan tamu di rumah.",
    shelfLife: "Tahan 2 hari di suhu ruang atau 4 hari di kulkas (hangatkan 10 detik sebelum santap)."
  },
  {
    id: "bolu-pisang-gula-aren",
    name: "Bolu Pisang Gula Aren",
    category: "roti",
    categoryLabel: "Roti & Kue",
    badge: "Resep Warisan",
    badgeTone: "forest",
    price: 35000,
    unit: "Loaf 450 gr",
    image: "/images/camilan-kudapan-umkm.jpg",
    shortDesc: "Bolu pisang raja matang pohon yang lembap, harum kayu manis, dan manis legit alami dari gula aren.",
    ingredients: "Pisang raja matang, gula aren bubuk, telur segar, kayu manis bubuk, taburan kenari panggang.",
    benefits: "Manis pas tidak bikin enek, kaya serat alami pisang, dan pas untuk hantaran keluarga.",
    shelfLife: "Tahan 4 hari di suhu ruang atau 7 hari di kulkas."
  },
  {
    id: "keripik-singkong-rempah",
    name: "Keripik Singkong & Pisang Rempah",
    category: "camilan",
    categoryLabel: "Makanan Ringan",
    badge: "Renyah UMKM",
    badgeTone: "gold",
    price: 16000,
    unit: "Pouch 180 gr",
    image: "/images/camilan-kudapan-umkm.jpg",
    shortDesc: "Irisan tipis singkong dan pisang kepok petani lokal yang digoreng renyah lalu dibalut bumbu rempah gurih-manis.",
    ingredients: "Singkong mentega / pisang kepok lokal, minyak kelapa, daun jeruk, bawang putih, gula aren.",
    benefits: "Bebas pewarna buatan, menggunakan minyak bersih yang rutin diganti, dikemas dengan zip-lock.",
    shelfLife: "Tahan 4 minggu dalam kemasan tertutup rapat di tempat sejuk."
  },
  {
    id: "paket-harmoni-bumi",
    name: "Paket Harmoni Bumi",
    category: "paket",
    categoryLabel: "Paket Hemat",
    badge: "Hemat Rp 4.000",
    badgeTone: "forest",
    price: 58000,
    unit: "2 Jamu + 1 Roti Sisir",
    image: "/images/hero-racik-bumi.jpg",
    shortDesc: "Paket lengkap untuk sarapan sehat keluarga atau buah tangan: 2 botol jamu 350 ml (bebas pilih varian) + 1 Roti Sisir Mentega.",
    ingredients: "Pilih 2 varian jamu favorit (Kunyit Asam / Beras Kencur / Jahe Merah) + 1 loyang Roti Sisir klasik.",
    benefits: "Sudah termasuk tas kraft cantik bertali rami dan kartu ucapan singkat bila untuk hadiah.",
    shelfLife: "Dibuat segar di hari pengiriman agar tiba dalam kondisi terbaik."
  }
];

export const TESTIMONIALS = [
  {
    quote: "Kunyit asam racikan Ibu Ari segar banget, tidak langu dan manisnya pas dari gula aren. Roti sisirnya juga empuk seperti buatan sendiri di rumah.",
    name: "Ibu Ratna W.",
    role: "Pelanggan Keluarga • Sumber, Cirebon"
  },
  {
    quote: "Pesan 60 paket snack box isi roti susu dan botol jamu untuk pengajian dan rapat dekat area Al-Bahjah, semua tamu puas dan langsung tanya nomor pesannya.",
    name: "Dimas Prasetyo",
    role: "Koordinator Acara • Gegunung, Cirebon"
  },
  {
    quote: "Beras kencur dan bolu pisang gula arennya jadi stok wajib akhir pekan sekeluarga. Kemasannya rapi, bersih, dan pelayanannya sangat ramah.",
    name: "Siti Rahmawati",
    role: "Pelanggan Rutin • Kota Cirebon"
  }
];

export const FAQS = [
  {
    question: "Apakah jamu dan roti Racik Bumi menggunakan bahan pengawet?",
    answer: "Tidak sama sekali. Seluruh jamu kami racik sendiri di dapur rumahan dari rimpang segar dan gula aren asli tanpa pengawet maupun pemanis buatan. Roti kami pun dipanggang dalam jumlah terbatas setiap pagi agar selalu lembut dan segar."
  },
  {
    question: "Berapa lama daya tahan jamu dan roti?",
    answer: "Jamu tahan 4–6 hari bila disimpan di kulkas suhu 4°C (hindari suhu ruang terlalu lama). Roti rumahan tahan 2–3 hari di suhu ruang dalam wadah tertutup, sementara makanan ringan kering tahan hingga 4 minggu."
  },
  {
    question: "Bagaimana sistem pemesanan dan pengirimannya di area Cirebon?",
    answer: "Anda bisa memilih produk di katalog lalu klik 'Kirim Pesanan via WhatsApp' ke +62 856-8755-799. Tersedia pengiriman kurir lokal / Same-Day untuk area Sumber, Gegunung, sekitar Al-Bahjah, hingga Kota & Kabupaten Cirebon, atau ambil langsung di Pondok Mutiara (konfirmasi via WA terlebih dahulu)."
  },
  {
    question: "Apakah menerima pesanan Snack Box, Hampers, atau Reseller?",
    answer: "Tentu! Kami melayani pesanan Snack Box untuk pengajian, arisan, rapat, maupun acara keluarga mulai dari 20 paket (H-2), Hampers sehat dengan kartu ucapan personal, serta kerja sama titip jual / reseller."
  }
];
