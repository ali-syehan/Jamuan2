/*
  db-tafsir-planet-jamuan.js
  Database tafsir planet untuk konteks jamuan / walimah / semua kegiatan.

  Catatan penting:
  - Output utama aplikasi memakai field: interpretasiJamuan
  - Field interpretasiUmum hanya untuk rujukan dokumen dan halaman Pendukung Data
  - File ini offline, tanpa module export/import, tanpa fetch, tanpa database online
*/

const DB_TAFSIR_PLANET_JAMUAN = {
  saturn: {
    id: "saturn",
    planet: "Saturnus",
    arab: "Zuhal",
    statusDasar: "Nahas besar",
    poinDasar: -2,
    interpretasiUmum:
      "Dingin dan kering, tabiat tanah, maskulin. Dalam tabel planet tujuh: logam timbal, rasa asam, bentuk pendek, warna hitam, usia tua renta. Status: Nahas besar / an-Nahs al-Akbar.",
    interpretasiJamuan:
      "Acara terasa berat, lambat, formal, kaku, tua, sepi, dingin, penuh batasan, ada rasa canggung, jarak sosial, keterlambatan, kekurangan, atau suasana kurang lepas. Jika muncul sebagai penanda baik, hasil tetap bisa ada, tetapi disertai kesulitan dan kegelisahan."
  },

  jupiter: {
    id: "jupiter",
    planet: "Jupiter",
    arab: "Musytari",
    statusDasar: "Sa‘ad besar",
    poinDasar: 2,
    interpretasiUmum:
      "Panas dan lembap, tabiat udara, seimbang, maskulin. Dalam tabel planet tujuh: logam timah putih, rasa manis, bentuk sedang, warna hijau, usia dewasa matang. Status: Sa‘ad besar / as-Sa‘d al-Akbar.",
    interpretasiJamuan:
      "Acara membawa kelapangan, penghormatan, kebaikan besar, suasana matang, ramah, berwibawa, penuh adab, diterima orang banyak, membawa manfaat, berkah, nasihat, tokoh mulia, atau kemudahan besar."
  },

  mars: {
    id: "mars",
    planet: "Mars",
    arab: "Mirrikh",
    statusDasar: "Nahas kecil",
    poinDasar: -1,
    interpretasiUmum:
      "Panas dan kering, tabiat api, maskulin. Dalam tabel planet tujuh: logam besi, rasa pahit, bentuk tinggi, warna merah, usia pemuda. Status: Nahas kecil / an-Nahs al-Ashgar.",
    interpretasiJamuan:
      "Acara berpotensi panas, tegang, terburu-buru, ada persaingan, suara keras, perdebatan, marah, ketidaksabaran, keributan kecil, atau tindakan tajam. Bisa juga menunjukkan kegiatan yang penuh energi, tetapi rawan gesekan."
  },

  sun: {
    id: "sun",
    planet: "Matahari",
    arab: "Syams",
    statusDasar: "Sa‘ad",
    poinDasar: 1,
    interpretasiUmum:
      "Panas, maskulin, tabiat api. Dalam tabel planet tujuh: logam emas, rasa pedas, bentuk bulat, warna kuning, usia masa muda. Status: Sa‘ad. Matahari dan Bulan disebut an-Nayyirain, dua cahaya besar.",
    interpretasiJamuan:
      "Acara terlihat terang, resmi, menonjol, ada tokoh utama, kehormatan, pusat perhatian, wibawa, nama baik, pengakuan, dan hal yang tampak di hadapan orang banyak. Jika terlalu kuat, suasana bisa menjadi terlalu dominan atau membuat pihak lain merasa kecil."
  },

  venus: {
    id: "venus",
    planet: "Venus",
    arab: "Zuhrah",
    statusDasar: "Sa‘ad kecil",
    poinDasar: 1,
    interpretasiUmum:
      "Panas dan lembap, tabiat air, feminin. Dalam tabel planet tujuh: logam tembaga, rasa berlemak, bentuk persegi, warna putih, usia remaja. Status: Sa‘ad kecil / as-Sa‘d al-Ashgar.",
    interpretasiJamuan:
      "Acara menyenangkan, indah, ramah, ada jamuan enak, hiasan, pakaian bagus, musik, keramahan, perempuan, rasa suka, keakraban, kesenangan, hadiah, atau suasana sosial yang lembut. Sangat cocok untuk membaca pesta, walimah, pertemuan indah, dan acara yang membawa kegembiraan."
  },

  mercury: {
    id: "mercury",
    planet: "Merkurius",
    arab: "‘Utharid",
    statusDasar: "Bercampur",
    poinDasar: 0,
    interpretasiUmum:
      "Temperamen seimbang antara lembap dan kering, panas dan dingin. Maskulin bersama yang maskulin, feminin bersama yang feminin. Dalam tabel planet tujuh: logam raksa, rasa hambar, bentuk halus/ramping, warna coklat, usia anak kecil. Status dokumen: bercampur; menjadi menguntungkan jika bersama planet sa‘ad, menjadi nahas jika bersama planet nahas. Untuk aplikasi: Merkurius Sa‘ad = +1, Merkurius Nahas = -1.",
    interpretasiJamuan:
      "Acara banyak percakapan, kabar, pesan, diskusi, tawar-menawar, kecerdasan, pengaturan, catatan, undangan, anak muda, pelayan informasi, atau orang yang banyak bicara. Jika Sa‘ad: komunikasi lancar. Jika Nahas: salah paham, gosip, ucapan membingungkan, janji tidak jelas, atau informasi keliru."
  },

  moon: {
    id: "moon",
    planet: "Bulan",
    arab: "Qamar",
    statusDasar: "Sa‘ad",
    poinDasar: 1,
    interpretasiUmum:
      "Dingin dan lembap, tabiat air, feminin. Dalam tabel planet tujuh: logam perak, rasa asin, bentuk tebal, warna tidak murni/keruh, usia bayi. Status: Sa‘ad. Bulan juga disebut sekutu Thali’ dan sekutu penguasa Thali’ dalam setiap persoalan.",
    interpretasiJamuan:
      "Acara sangat dipengaruhi suasana umum, perasaan, penerimaan, makanan, perubahan, keramaian, perempuan, keluarga, kelembutan, dan keadaan majelis dari awal ke akhir. Jika Bulan baik: penanya mudah diterima, suasana cair dan nyaman. Jika Bulan terkena nahas: suasana cepat berubah, tidak stabil, gelisah, atau ada rasa kurang nyaman."
  },

  uranus: {
    id: "uranus",
    planet: "Uranus",
    arab: "Uranus",
    statusDasar: "Nahas kuat / memberontak",
    poinDasar: -2,
    interpretasiUmum:
      "Disebut planet modern. Dalam dokumen: nahs mutamarrid, yaitu kesialan yang memberontak.",
    interpretasiJamuan:
      "Acara berpotensi tidak biasa, mendadak, melawan aturan, mengejutkan, kacau, ada perubahan tiba-tiba, sikap memberontak, orang bertindak di luar dugaan, atau susunan acara berubah tanpa rencana. Untuk poin aplikasi: -2."
  },

  neptune: {
    id: "neptune",
    planet: "Neptunus",
    arab: "Neptunus",
    statusDasar: "Cenderung Sa‘ad",
    poinDasar: 1,
    interpretasiUmum:
      "Disebut planet modern. Dalam dokumen: ma’il lis sa‘adah, cenderung membawa keberuntungan.",
    interpretasiJamuan:
      "Acara cenderung lembut, samar, penuh rasa, imajinatif, spiritual, terkesan halus, ada suasana larut, empati, musik, air mata, keharuan, atau kebersamaan batin. Tetapi karena sifatnya “cenderung”, hasilnya baik namun bisa kurang jelas. Untuk poin aplikasi: +1."
  },

  pluto: {
    id: "pluto",
    planet: "Pluto",
    arab: "Pluto",
    statusDasar: "Belum pasti / Netral",
    poinDasar: 0,
    interpretasiUmum:
      "Disebut planet modern, tetapi dokumen menyatakan hukum-hukumnya belum diketahui secara pasti karena penemuannya masih tergolong baru, ditemukan tahun 1930 M.",
    interpretasiJamuan:
      "Untuk menjaga kemurnian dari dokumen, Pluto tidak diberi tafsir khusus. Dalam aplikasi lebih aman dibuat: Belum pasti / netral / 0. Bisa ditampilkan sebagai data teknis, tetapi jangan dipakai sebagai sumber tafsir utama jika ingin tetap murni dari dokumen."
  }
};

function getTafsirPlanetJamuan(planetId) {
  if (!planetId) return null;

  const key = String(planetId).trim().toLowerCase();
  return DB_TAFSIR_PLANET_JAMUAN[key] || null;
}

function getInterpretasiJamuan(planetId) {
  const data = getTafsirPlanetJamuan(planetId);
  return data ? data.interpretasiJamuan : "";
}

function getInterpretasiUmumPlanet(planetId) {
  const data = getTafsirPlanetJamuan(planetId);
  return data ? data.interpretasiUmum : "";
}

if (typeof window !== "undefined") {
  window.DB_TAFSIR_PLANET_JAMUAN = DB_TAFSIR_PLANET_JAMUAN;
  window.getTafsirPlanetJamuan = getTafsirPlanetJamuan;
  window.getInterpretasiJamuan = getInterpretasiJamuan;
  window.getInterpretasiUmumPlanet = getInterpretasiUmumPlanet;
}
