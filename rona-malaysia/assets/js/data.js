/* Data used by the interactive pages. Kept external as required. */

var RONA_FACTS = [
  "Malaysia memiliki masyarakat multikultural dengan tradisi Melayu, Tionghoa, India, serta komunitas pribumi Sabah dan Sarawak.",
  "Dondang Sayang memadukan musik, nyanyian, dan pantun yang dilantunkan secara berbalas.",
  "Mak Yong merupakan seni teater tradisional Kelantan yang menggabungkan lakon, musik, gerak, dan busana.",
  "Songket dikenal melalui tenunan bermotif yang menggunakan benang berkilau untuk menciptakan kesan mewah.",
  "Nasi lemak biasanya disajikan bersama sambal, ikan bilis, kacang tanah, mentimun, dan telur.",
  "Rumah tradisional Melayu dirancang menyesuaikan iklim tropis, antara lain melalui bentuk panggung dan bukaan udara.",
  "Bahasa Melayu adalah bahasa kebangsaan Malaysia, sementara beragam bahasa lain tetap hidup dalam masyarakat.",
  "Kompang sering dimainkan secara berkelompok dalam perayaan dan upacara masyarakat Melayu."
];

var RONA_PHRASES = {
  sapaan: [
    { malay: "Selamat datang", meaning: "Selamat datang", note: "Sapaan untuk menyambut tamu." },
    { malay: "Apa khabar?", meaning: "Apa kabar?", note: "Digunakan untuk menanyakan keadaan." },
    { malay: "Khabar baik", meaning: "Kabar baik", note: "Jawaban umum untuk Apa khabar?" },
    { malay: "Terima kasih", meaning: "Terima kasih", note: "Ungkapan penghargaan." }
  ],
  perjalanan: [
    { malay: "Di manakah stesen?", meaning: "Di mana stasiun?", note: "Berguna saat mencari transportasi." },
    { malay: "Berapa harganya?", meaning: "Berapa harganya?", note: "Berguna saat berbelanja." },
    { malay: "Tolong tunjukkan jalan", meaning: "Tolong tunjukkan jalan", note: "Meminta petunjuk arah." },
    { malay: "Saya mahu ke sana", meaning: "Saya ingin pergi ke sana", note: "Menyatakan tujuan perjalanan." }
  ],
  makanan: [
    { malay: "Saya mahu nasi lemak", meaning: "Saya ingin nasi lemak", note: "Memesan makanan." },
    { malay: "Tidak pedas, ya", meaning: "Jangan pedas, ya", note: "Meminta tingkat kepedasan rendah." },
    { malay: "Sedap sekali!", meaning: "Enak sekali!", note: "Memberi pujian untuk makanan." },
    { malay: "Boleh tambah air?", meaning: "Boleh tambah air?", note: "Meminta tambahan minuman." }
  ]
};

var RONA_QUIZ = [
  {
    question: "Kapan Federasi Malaya mencapai kemerdekaan?",
    options: ["16 September 1963", "1 Januari 1960","31 Agustus 1957", "31 Desember 1965"],
    answer: 2
  },
  {
    question: "Seni pertunjukan Kelantan yang memadukan lakon, musik, dan gerak disebut...",
    options: ["Mak Yong", "Wayang Wong", "Kecak", "Ludruk"],
    answer: 0
  },
  {
    question: "Manakah yang merupakan tekstil tradisional dengan benang berkilau?",
    options: ["Denim", "Linen", "Flanel", "Songket"],
    answer: 3
  },
  {
    question: "Alat musik perkusi yang sering dimainkan berkelompok dalam perayaan Melayu adalah...",
    options: ["Sape", "Kompang", "Erhu", "Tabla"],
    answer: 1
  },
  {
    question: "Dondang Sayang dikenal sebagai seni yang memadukan musik dengan...",
    options: ["Lukisan dinding", "Ukiran batu", "Pantun berbalas", "Pertunjukan boneka"],
    answer: 2
  },
  {
    question: "Bahasa kebangsaan Malaysia adalah...",
    options: ["Bahasa Melayu", "Bahasa Thai", "Bahasa Jepang", "Bahasa Spanyol"],
    answer: 0
  },
  {
    question: "Makanan yang menggunakan nasi santan sebagai dasar hidangan adalah...",
    options: ["Roti canai", "Nasi lemak", "Cendol", "Satay"],
    answer: 1
  },
  {
    question: "Pembentukan negara Malaysia tercapai pada...",
    options: ["16 September 1963", "31 Agustus 1957", "16 September 1950", "1 Mei 1965"],
    answer: 0
  }
];

var RONA_VOTES = [
  { id: "kuliner", label: "Kuliner", icon: "🍛" },
  { id: "busana", label: "Busana", icon: "🧵" },
  { id: "seni", label: "Seni Pertunjukan", icon: "🎭" },
  { id: "arsitektur", label: "Arsitektur", icon: "🏠" }
];
