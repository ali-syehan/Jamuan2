/* =========================================================
   db-zodiak-penguasa.js
   Database Zodiak / Buruj dan Planet Penguasa Tradisional
   Aplikasi: 25 Dalil Jamuan Walimah
   Mode: Offline HTML / CSS / JS
   ========================================================= */

const DB_ZODIAK_PENGUASA = {
  aries: {
    id: "aries",
    nama: "Aries",
    arab: "Hamal",
    penguasa: ["mars"],
    keterangan: "Mars adalah penguasa Aries."
  },

  taurus: {
    id: "taurus",
    nama: "Taurus",
    arab: "Tsaur",
    penguasa: ["venus"],
    keterangan: "Venus adalah penguasa Taurus."
  },

  gemini: {
    id: "gemini",
    nama: "Gemini",
    arab: "Jauza",
    penguasa: ["mercury"],
    keterangan: "Merkurius adalah penguasa Gemini."
  },

  cancer: {
    id: "cancer",
    nama: "Cancer",
    arab: "Sarathan",
    penguasa: ["moon"],
    keterangan: "Bulan adalah penguasa Cancer."
  },

  leo: {
    id: "leo",
    nama: "Leo",
    arab: "Asad",
    penguasa: ["sun"],
    keterangan: "Matahari adalah penguasa Leo."
  },

  virgo: {
    id: "virgo",
    nama: "Virgo",
    arab: "Sunbulah",
    penguasa: ["mercury"],
    keterangan: "Merkurius adalah penguasa Virgo."
  },

  libra: {
    id: "libra",
    nama: "Libra",
    arab: "Mizan",
    penguasa: ["venus"],
    keterangan: "Venus adalah penguasa Libra."
  },

  scorpio: {
    id: "scorpio",
    nama: "Scorpio",
    arab: "Aqrab",
    penguasa: ["mars"],
    keterangan: "Mars adalah penguasa Scorpio."
  },

  sagittarius: {
    id: "sagittarius",
    nama: "Sagitarius",
    arab: "Qaus",
    penguasa: ["jupiter"],
    keterangan: "Jupiter adalah penguasa Sagitarius."
  },

  capricorn: {
    id: "capricorn",
    nama: "Capricorn",
    arab: "Jadi",
    penguasa: ["saturn"],
    keterangan: "Saturnus adalah penguasa Capricorn."
  },

  aquarius: {
    id: "aquarius",
    nama: "Aquarius",
    arab: "Dalwu",
    penguasa: ["saturn"],
    keterangan: "Saturnus adalah penguasa Aquarius."
  },

  pisces: {
    id: "pisces",
    nama: "Pisces",
    arab: "Hut",
    penguasa: ["jupiter"],
    keterangan: "Jupiter adalah penguasa Pisces."
  }
};

/* =========================================================
   Fungsi Ambil Planet Penguasa Zodiak
   Contoh:
   getPenguasaZodiak("cancer") -> ["moon"]
   ========================================================= */

function getPenguasaZodiak(zodiakId) {
  if (!zodiakId) return [];

  const id = String(zodiakId).toLowerCase().trim();
  const data = DB_ZODIAK_PENGUASA[id];

  if (!data || !Array.isArray(data.penguasa)) {
    return [];
  }

  return data.penguasa;
}

/* =========================================================
   Fungsi Ambil Nama Zodiak
   Contoh:
   getNamaZodiak("leo") -> "Leo"
   ========================================================= */

function getNamaZodiak(zodiakId) {
  if (!zodiakId) return "";

  const id = String(zodiakId).toLowerCase().trim();
  const data = DB_ZODIAK_PENGUASA[id];

  if (!data || !data.nama) {
    return "";
  }

  return data.nama;
}

/* =========================================================
   Fungsi Ambil Data Lengkap Zodiak
   Contoh:
   getDataZodiak("aries") -> object lengkap Aries
   ========================================================= */

function getDataZodiak(zodiakId) {
  if (!zodiakId) return null;

  const id = String(zodiakId).toLowerCase().trim();
  const data = DB_ZODIAK_PENGUASA[id];

  if (!data) {
    return null;
  }

  return data;
}

/* =========================================================
   Daftarkan ke window agar bisa dipakai oleh app.js
   Tanpa module export/import
   ========================================================= */

if (typeof window !== "undefined") {
  window.DB_ZODIAK_PENGUASA = DB_ZODIAK_PENGUASA;
  window.getPenguasaZodiak = getPenguasaZodiak;
  window.getNamaZodiak = getNamaZodiak;
  window.getDataZodiak = getDataZodiak;
}
