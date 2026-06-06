/*
  js/db/db-aspek-merkurius.js
  Database khusus aturan Merkurius untuk aplikasi HTML offline "25 Dalil Jamuan Walimah".

  Fungsi:
  - Menentukan apakah Merkurius dihukumi Sa‘ad, Nahas, atau Netral.
  - Dipakai hanya ketika dalam Event Chart sebuah Bayt hanya berisi Merkurius.
  - Bukan database tafsir aspek panjang.
  - Tidak memakai module export/import, fetch, atau database online.

  Total data: 5 aspek x 11 planet/titik = 55 item.
*/

const DB_ASPEK_MERKURIUS = [
  {
    aspek: "conjunction",
    planetAspek: "sun",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius conjunction Matahari",
    keterangan: "Merkurius dihukumi Sa‘ad karena conjunction mengikuti sifat Matahari yang bersifat Sa‘ad."
  },
  {
    aspek: "conjunction",
    planetAspek: "moon",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius conjunction Bulan",
    keterangan: "Merkurius dihukumi Sa‘ad karena conjunction mengikuti sifat Bulan yang bersifat Sa‘ad."
  },
  {
    aspek: "conjunction",
    planetAspek: "venus",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius conjunction Venus",
    keterangan: "Merkurius dihukumi Sa‘ad karena conjunction mengikuti sifat Venus yang bersifat Sa‘ad."
  },
  {
    aspek: "conjunction",
    planetAspek: "mars",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius conjunction Mars",
    keterangan: "Merkurius dihukumi Nahas karena conjunction mengikuti sifat Mars yang bersifat Nahas."
  },
  {
    aspek: "conjunction",
    planetAspek: "jupiter",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius conjunction Jupiter",
    keterangan: "Merkurius dihukumi Sa‘ad karena conjunction mengikuti sifat Jupiter yang bersifat Sa‘ad besar."
  },
  {
    aspek: "conjunction",
    planetAspek: "saturn",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius conjunction Saturnus",
    keterangan: "Merkurius dihukumi Nahas karena conjunction mengikuti sifat Saturnus yang bersifat Nahas besar."
  },
  {
    aspek: "conjunction",
    planetAspek: "uranus",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius conjunction Uranus",
    keterangan: "Merkurius dihukumi Nahas karena conjunction mengikuti sifat Uranus yang bersifat Nahas kuat."
  },
  {
    aspek: "conjunction",
    planetAspek: "neptune",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius conjunction Neptunus",
    keterangan: "Merkurius dihukumi Sa‘ad karena conjunction mengikuti sifat Neptunus yang bersifat Cenderung Sa‘ad."
  },
  {
    aspek: "conjunction",
    planetAspek: "pluto",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius conjunction Pluto",
    keterangan: "Merkurius dihukumi Netral karena conjunction dengan Pluto yang bersifat netral atau hanya titik chart."
  },
  {
    aspek: "conjunction",
    planetAspek: "ac",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius conjunction AC",
    keterangan: "Merkurius dihukumi Netral karena conjunction dengan AC yang bersifat netral atau hanya titik chart."
  },
  {
    aspek: "conjunction",
    planetAspek: "mc",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius conjunction MC",
    keterangan: "Merkurius dihukumi Netral karena conjunction dengan MC yang bersifat netral atau hanya titik chart."
  },
  {
    aspek: "sextile",
    planetAspek: "sun",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius sextile Matahari",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Matahari melalui aspek sextile."
  },
  {
    aspek: "sextile",
    planetAspek: "moon",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius sextile Bulan",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Bulan melalui aspek sextile."
  },
  {
    aspek: "sextile",
    planetAspek: "venus",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius sextile Venus",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Venus melalui aspek sextile."
  },
  {
    aspek: "sextile",
    planetAspek: "mars",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius sextile Mars",
    keterangan: "Merkurius dihukumi Netral karena aspek sextile cenderung baik, tetapi Mars bersifat Nahas."
  },
  {
    aspek: "sextile",
    planetAspek: "jupiter",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius sextile Jupiter",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Jupiter melalui aspek sextile."
  },
  {
    aspek: "sextile",
    planetAspek: "saturn",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius sextile Saturnus",
    keterangan: "Merkurius dihukumi Netral karena aspek sextile cenderung baik, tetapi Saturnus bersifat Nahas besar."
  },
  {
    aspek: "sextile",
    planetAspek: "uranus",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius sextile Uranus",
    keterangan: "Merkurius dihukumi Netral karena aspek sextile cenderung baik, tetapi Uranus bersifat Nahas kuat."
  },
  {
    aspek: "sextile",
    planetAspek: "neptune",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius sextile Neptunus",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Neptunus melalui aspek sextile."
  },
  {
    aspek: "sextile",
    planetAspek: "pluto",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius sextile Pluto",
    keterangan: "Merkurius dihukumi Netral karena aspek sextile dengan Pluto tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "sextile",
    planetAspek: "ac",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius sextile AC",
    keterangan: "Merkurius dihukumi Netral karena aspek sextile dengan AC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "sextile",
    planetAspek: "mc",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius sextile MC",
    keterangan: "Merkurius dihukumi Netral karena aspek sextile dengan MC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "trine",
    planetAspek: "sun",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius trine Matahari",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Matahari melalui aspek trine."
  },
  {
    aspek: "trine",
    planetAspek: "moon",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius trine Bulan",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Bulan melalui aspek trine."
  },
  {
    aspek: "trine",
    planetAspek: "venus",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius trine Venus",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Venus melalui aspek trine."
  },
  {
    aspek: "trine",
    planetAspek: "mars",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius trine Mars",
    keterangan: "Merkurius dihukumi Netral karena aspek trine cenderung baik, tetapi Mars bersifat Nahas."
  },
  {
    aspek: "trine",
    planetAspek: "jupiter",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius trine Jupiter",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Jupiter melalui aspek trine."
  },
  {
    aspek: "trine",
    planetAspek: "saturn",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius trine Saturnus",
    keterangan: "Merkurius dihukumi Netral karena aspek trine cenderung baik, tetapi Saturnus bersifat Nahas besar."
  },
  {
    aspek: "trine",
    planetAspek: "uranus",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius trine Uranus",
    keterangan: "Merkurius dihukumi Netral karena aspek trine cenderung baik, tetapi Uranus bersifat Nahas kuat."
  },
  {
    aspek: "trine",
    planetAspek: "neptune",
    statusMerkurius: "saad",
    poinMerkurius: 1,
    label: "Merkurius trine Neptunus",
    keterangan: "Merkurius dihukumi Sa‘ad karena mendapat dukungan baik dari Neptunus melalui aspek trine."
  },
  {
    aspek: "trine",
    planetAspek: "pluto",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius trine Pluto",
    keterangan: "Merkurius dihukumi Netral karena aspek trine dengan Pluto tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "trine",
    planetAspek: "ac",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius trine AC",
    keterangan: "Merkurius dihukumi Netral karena aspek trine dengan AC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "trine",
    planetAspek: "mc",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius trine MC",
    keterangan: "Merkurius dihukumi Netral karena aspek trine dengan MC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "square",
    planetAspek: "sun",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square Matahari",
    keterangan: "Merkurius dihukumi Netral karena aspek square bersifat berat, tetapi planet yang terlibat adalah Matahari yang bersifat Sa‘ad."
  },
  {
    aspek: "square",
    planetAspek: "moon",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square Bulan",
    keterangan: "Merkurius dihukumi Netral karena aspek square bersifat berat, tetapi planet yang terlibat adalah Bulan yang bersifat Sa‘ad."
  },
  {
    aspek: "square",
    planetAspek: "venus",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square Venus",
    keterangan: "Merkurius dihukumi Netral karena aspek square bersifat berat, tetapi planet yang terlibat adalah Venus yang bersifat Sa‘ad."
  },
  {
    aspek: "square",
    planetAspek: "mars",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius square Mars",
    keterangan: "Merkurius dihukumi Nahas karena aspek square bersifat berat dan mengenai Mars yang bersifat Nahas."
  },
  {
    aspek: "square",
    planetAspek: "jupiter",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square Jupiter",
    keterangan: "Merkurius dihukumi Netral karena aspek square bersifat berat, tetapi planet yang terlibat adalah Jupiter yang bersifat Sa‘ad besar."
  },
  {
    aspek: "square",
    planetAspek: "saturn",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius square Saturnus",
    keterangan: "Merkurius dihukumi Nahas karena aspek square bersifat berat dan mengenai Saturnus yang bersifat Nahas besar."
  },
  {
    aspek: "square",
    planetAspek: "uranus",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius square Uranus",
    keterangan: "Merkurius dihukumi Nahas karena aspek square bersifat berat dan mengenai Uranus yang bersifat Nahas kuat."
  },
  {
    aspek: "square",
    planetAspek: "neptune",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square Neptunus",
    keterangan: "Merkurius dihukumi Netral karena aspek square bersifat berat, tetapi planet yang terlibat adalah Neptunus yang bersifat Cenderung Sa‘ad."
  },
  {
    aspek: "square",
    planetAspek: "pluto",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square Pluto",
    keterangan: "Merkurius dihukumi Netral karena aspek square dengan Pluto tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "square",
    planetAspek: "ac",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square AC",
    keterangan: "Merkurius dihukumi Netral karena aspek square dengan AC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "square",
    planetAspek: "mc",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius square MC",
    keterangan: "Merkurius dihukumi Netral karena aspek square dengan MC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "opposition",
    planetAspek: "sun",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition Matahari",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition bersifat berat, tetapi planet yang terlibat adalah Matahari yang bersifat Sa‘ad."
  },
  {
    aspek: "opposition",
    planetAspek: "moon",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition Bulan",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition bersifat berat, tetapi planet yang terlibat adalah Bulan yang bersifat Sa‘ad."
  },
  {
    aspek: "opposition",
    planetAspek: "venus",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition Venus",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition bersifat berat, tetapi planet yang terlibat adalah Venus yang bersifat Sa‘ad."
  },
  {
    aspek: "opposition",
    planetAspek: "mars",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius opposition Mars",
    keterangan: "Merkurius dihukumi Nahas karena aspek opposition bersifat berat dan mengenai Mars yang bersifat Nahas."
  },
  {
    aspek: "opposition",
    planetAspek: "jupiter",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition Jupiter",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition bersifat berat, tetapi planet yang terlibat adalah Jupiter yang bersifat Sa‘ad besar."
  },
  {
    aspek: "opposition",
    planetAspek: "saturn",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius opposition Saturnus",
    keterangan: "Merkurius dihukumi Nahas karena aspek opposition bersifat berat dan mengenai Saturnus yang bersifat Nahas besar."
  },
  {
    aspek: "opposition",
    planetAspek: "uranus",
    statusMerkurius: "nahas",
    poinMerkurius: -1,
    label: "Merkurius opposition Uranus",
    keterangan: "Merkurius dihukumi Nahas karena aspek opposition bersifat berat dan mengenai Uranus yang bersifat Nahas kuat."
  },
  {
    aspek: "opposition",
    planetAspek: "neptune",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition Neptunus",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition bersifat berat, tetapi planet yang terlibat adalah Neptunus yang bersifat Cenderung Sa‘ad."
  },
  {
    aspek: "opposition",
    planetAspek: "pluto",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition Pluto",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition dengan Pluto tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "opposition",
    planetAspek: "ac",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition AC",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition dengan AC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  },
  {
    aspek: "opposition",
    planetAspek: "mc",
    statusMerkurius: "netral",
    poinMerkurius: 0,
    label: "Merkurius opposition MC",
    keterangan: "Merkurius dihukumi Netral karena aspek opposition dengan MC tidak memberi keputusan Sa‘ad atau Nahas yang jelas."
  }
];

function normalisasiTeksAspekMerkurius(nilai) {
  return String(nilai || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function cariAspekMerkurius(aspek, planetAspek) {
  const aspekDicari = normalisasiTeksAspekMerkurius(aspek);
  const planetDicari = normalisasiTeksAspekMerkurius(planetAspek);

  return DB_ASPEK_MERKURIUS.find(function (item) {
    return item.aspek === aspekDicari && item.planetAspek === planetDicari;
  }) || null;
}

function hakimMerkurius(aspek, planetAspek) {
  const data = cariAspekMerkurius(aspek, planetAspek);

  if (!data) {
    return {
      status: "netral",
      poin: 0,
      label: "Merkurius belum dihukumi",
      keterangan: "Data aspek Merkurius belum tersedia."
    };
  }

  return {
    status: data.statusMerkurius,
    poin: data.poinMerkurius,
    label: data.label,
    keterangan: data.keterangan
  };
}

if (typeof window !== "undefined") {
  window.DB_ASPEK_MERKURIUS = DB_ASPEK_MERKURIUS;
  window.cariAspekMerkurius = cariAspekMerkurius;
  window.hakimMerkurius = hakimMerkurius;
}
