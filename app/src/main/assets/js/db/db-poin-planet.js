/*
  db-poin-planet.js
  Database poin/status planet untuk aplikasi offline "25 Dalil Jamuan Walimah".
  Tidak menggunakan module export/import, fetch, atau database online.
*/

const DB_POIN_PLANET = {
  moon: {
    id: "moon",
    nama: "Bulan",
    arab: "Qamar",
    keadaan: "Sa‘ad",
    status: "saad",
    poin: 1,
    keterangan: "Bulan dihukumi Sa‘ad dengan poin +1."
  },

  venus: {
    id: "venus",
    nama: "Venus",
    arab: "Zuhrah",
    keadaan: "Sa‘ad",
    status: "saad",
    poin: 1,
    keterangan: "Venus/Zuhrah dihukumi Sa‘ad dengan poin +1."
  },

  sun: {
    id: "sun",
    nama: "Matahari",
    arab: "Syams",
    keadaan: "Sa‘ad",
    status: "saad",
    poin: 1,
    keterangan: "Matahari/Syams dihukumi Sa‘ad dengan poin +1."
  },

  jupiter: {
    id: "jupiter",
    nama: "Jupiter",
    arab: "Musytari",
    keadaan: "Sa‘ad besar",
    status: "saad",
    poin: 2,
    keterangan: "Jupiter/Musytari dihukumi Sa‘ad besar dengan poin +2."
  },

  mars: {
    id: "mars",
    nama: "Mars",
    arab: "Mirrikh",
    keadaan: "Nahas",
    status: "nahas",
    poin: -1,
    keterangan: "Mars/Mirrikh dihukumi Nahas dengan poin -1."
  },

  saturn: {
    id: "saturn",
    nama: "Saturnus",
    arab: "Zuhal",
    keadaan: "Nahas besar",
    status: "nahas",
    poin: -2,
    keterangan: "Saturnus/Zuhal dihukumi Nahas besar dengan poin -2."
  },

  uranus: {
    id: "uranus",
    nama: "Uranus",
    arab: "Uranus",
    keadaan: "Nahas kuat / memberontak",
    status: "nahas",
    poin: -2,
    keterangan: "Uranus dihukumi Nahas kuat/memberontak dengan poin -2."
  },

  neptune: {
    id: "neptune",
    nama: "Neptunus",
    arab: "Neptunus",
    keadaan: "Cenderung Sa‘ad",
    status: "saad",
    poin: 1,
    keterangan: "Neptunus dihukumi cenderung Sa‘ad dengan poin +1."
  },

  pluto: {
    id: "pluto",
    nama: "Pluto",
    arab: "Pluto",
    keadaan: "Netral",
    status: "netral",
    poin: 0,
    keterangan: "Pluto dihukumi Netral dengan poin 0."
  },

  mercury: {
    id: "mercury",
    nama: "Merkurius",
    arab: "‘Utharid",
    keadaan: "Netral / belum dihukumi",
    status: "netral",
    poin: 0,
    keterangan: "Merkurius biasa belum dihukumi tetap. Hasil final Merkurius ditentukan oleh db-aspek-merkurius.js."
  },

  mercury_saad: {
    id: "mercury_saad",
    nama: "Merkurius",
    arab: "‘Utharid",
    keadaan: "Sa‘ad",
    status: "saad",
    poin: 1,
    keterangan: "Merkurius/‘Utharid ketika dihukumi Sa‘ad bernilai poin +1."
  },

  mercury_nahas: {
    id: "mercury_nahas",
    nama: "Merkurius",
    arab: "‘Utharid",
    keadaan: "Nahas",
    status: "nahas",
    poin: -1,
    keterangan: "Merkurius/‘Utharid ketika dihukumi Nahas bernilai poin -1."
  },

  mercury_netral: {
    id: "mercury_netral",
    nama: "Merkurius",
    arab: "‘Utharid",
    keadaan: "Netral / belum dihukumi",
    status: "netral",
    poin: 0,
    keterangan: "Merkurius/‘Utharid ketika belum dihukumi bernilai Netral dengan poin 0."
  },

  ac: {
    id: "ac",
    nama: "AC",
    arab: "Ascendant",
    keadaan: "Titik chart",
    status: "netral",
    poin: 0,
    keterangan: "AC/Ascendant adalah titik chart, bukan planet Sa‘ad atau Nahas, sehingga poinnya 0."
  },

  mc: {
    id: "mc",
    nama: "MC",
    arab: "Midheaven",
    keadaan: "Titik chart",
    status: "netral",
    poin: 0,
    keterangan: "MC/Midheaven adalah titik chart, bukan planet Sa‘ad atau Nahas, sehingga poinnya 0."
  }
};

function getPoinPlanet(planetId) {
  if (!planetId) return null;

  const id = String(planetId).trim().toLowerCase();
  return DB_POIN_PLANET[id] || null;
}

function formatPoinPlanet(poin) {
  const angka = Number(poin);

  if (Number.isNaN(angka)) return "0";
  if (angka > 0) return "+" + angka;
  if (angka < 0) return String(angka);
  return "0";
}

function getLabelPoinPlanet(planetId) {
  const data = getPoinPlanet(planetId);

  if (!data) return "Planet tidak ditemukan";

  return data.nama + " | " + data.keadaan + " | " + formatPoinPlanet(data.poin);
}

if (typeof window !== "undefined") {
  window.DB_POIN_PLANET = DB_POIN_PLANET;
  window.getPoinPlanet = getPoinPlanet;
  window.getLabelPoinPlanet = getLabelPoinPlanet;
  window.formatPoinPlanet = formatPoinPlanet;
}
