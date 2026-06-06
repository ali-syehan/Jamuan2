/*
  tafsir-engine-25-dalil.js
  Fungsi final untuk membaca database tafsir offline.
  Bisa digabung ke app.js utama.
*/

function normalisasiStatus(status) {
  if (!status) return "netral";
  const s = String(status).toLowerCase().trim();
  if (s === "saad" || s === "sa'ad" || s === "baik" || s === "good") return "saad";
  if (s === "nahas" || s === "naas" || s === "buruk" || s === "berat" || s === "bad") return "nahas";
  return "netral";
}

function normalisasiAspek(aspek) {
  if (!aspek) return "";
  const a = String(aspek).toLowerCase().trim();
  if (a === "conj" || a === "conjunction" || a === "konjungsi") return "conjunction";
  if (a === "sextile" || a === "sekstil") return "sextile";
  if (a === "trine" || a === "trin") return "trine";
  if (a === "square" || a === "kuadrat") return "square";
  if (a === "opposition" || a === "oposisi") return "opposition";
  return a;
}

function cariTafsirDalil(idDalil) {
  return DB_TAFSIR_25_DALIL.find(item => item.id === Number(idDalil)) || null;
}

function cariTafsirPlanet(kodePlanet) {
  if (!kodePlanet) return null;
  return DB_TAFSIR_PLANET_EVENT[kodePlanet] || null;
}

function cariTafsirAspek(planetUtama, aspek, planetPendukung) {
  if (!planetUtama || !aspek || !planetPendukung) return null;
  const a = normalisasiAspek(aspek);
  return DB_TAFSIR_ASPEK_PLANET_EVENT.find(item =>
    item.planetUtama === planetUtama &&
    item.aspek === a &&
    item.planetPendukung === planetPendukung
  ) || null;
}

function escapeHTML(teks) {
  return String(teks ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function susunNarasiTafsirJamuan({
  idDalil,
  status,
  planetUtama,
  aspek,
  planetPendukung
}) {
  const statusNormal = normalisasiStatus(status);
  const aspekNormal = normalisasiAspek(aspek);

  const dalil = cariTafsirDalil(idDalil);
  if (!dalil) {
    return {
      ok: false,
      judul: "Dalil tidak ditemukan",
      html: "<p>Data dalil tidak ditemukan.</p>"
    };
  }

  const planetA = cariTafsirPlanet(planetUtama || dalil.planetDefaultUtama);
  const planetB = cariTafsirPlanet(planetPendukung || (dalil.planetDefaultPendukung || [])[0]);
  const aspekData = cariTafsirAspek(
    planetA ? planetA.kode : planetUtama,
    aspekNormal,
    planetB ? planetB.kode : planetPendukung
  );

  const labelStatus = DB_TAFSIR_TEMPLATE_CERITA.labelStatus[statusNormal] || "Netral / Campuran";
  const labelAspek = DB_TAFSIR_TEMPLATE_CERITA.labelAspek[aspekNormal] || aspekNormal || "-";

  const tafsirKunciDalil = dalil.tafsirKunci[statusNormal] || dalil.tafsirKunci.netral;
  const tafsirPeristiwaDalil = dalil.tafsirPeristiwa[statusNormal] || dalil.tafsirPeristiwa.netral;

  const pembuka = DB_TAFSIR_TEMPLATE_CERITA.pembuka[statusNormal];
  const penutup = DB_TAFSIR_TEMPLATE_CERITA.penutup[statusNormal];

  const teksPlanetUtama = planetA
    ? planetA.peranUtama + " " + (planetA[statusNormal] || "")
    : "Planet utama belum tersedia dalam database.";

  const teksPlanetPendukung = planetB
    ? planetB.peranPendukung + " " + (planetB[statusNormal] || "")
    : "Planet pendukung belum tersedia dalam database.";

  const tafsirKunciAspek = aspekData
    ? aspekData.tafsirKunci[statusNormal]
    : "Tafsir kunci aspek khusus belum tersedia untuk pasangan ini.";

  const tafsirPeristiwaAspek = aspekData
    ? aspekData.tafsirPeristiwa[statusNormal]
    : "Tafsir aspek khusus untuk pasangan planet ini belum tersedia. Aplikasi tetap menampilkan tafsir dalil dan tafsir planet umum.";

  const html = `
    <div class="card-tafsir-dalil">
      <h3>${escapeHTML(dalil.id)}. ${escapeHTML(dalil.judul)}</h3>

      <div class="tafsir-meta">
        <p><b>Status:</b> ${escapeHTML(labelStatus)}</p>
        <p><b>Bayt Utama:</b> ${escapeHTML(dalil.baytUtama.join(", "))}</p>
        <p><b>Planet Utama:</b> ${escapeHTML(planetA ? planetA.nama : planetUtama || "-")}</p>
        <p><b>Aspek:</b> ${escapeHTML(labelAspek)}</p>
        <p><b>Planet Pendukung:</b> ${escapeHTML(planetB ? planetB.nama : planetPendukung || "-")}</p>
      </div>

      <div class="box-tafsir-kunci">
        <h4>Tafsir Kunci</h4>
        <p>${escapeHTML(tafsirKunciDalil)}</p>
        <p>${escapeHTML(tafsirKunciAspek)}</p>
      </div>

      <div class="box-tafsir-peristiwa">
        <h4>Tafsir Peristiwa</h4>
        <p>${escapeHTML(pembuka)}</p>
        <p>${escapeHTML(tafsirPeristiwaDalil)}</p>
      </div>

      <div class="box-tafsir-planet">
        <h4>Pengaruh Planet</h4>
        <p>${escapeHTML(teksPlanetUtama)}</p>
        <p>${escapeHTML(teksPlanetPendukung)}</p>
      </div>

      <div class="box-tafsir-aspek">
        <h4>Pengaruh Aspek</h4>
        <p>${escapeHTML(tafsirPeristiwaAspek)}</p>
      </div>

      <div class="box-kesimpulan">
        <h4>Kesimpulan</h4>
        <p>${escapeHTML(penutup)}</p>
      </div>
    </div>
  `;

  return {
    ok: true,
    id: dalil.id,
    judul: dalil.judul,
    status: statusNormal,
    planetUtama: planetA ? planetA.kode : planetUtama,
    aspek: aspekNormal,
    planetPendukung: planetB ? planetB.kode : planetPendukung,
    tafsirKunciDalil,
    tafsirPeristiwaDalil,
    tafsirKunciAspek,
    tafsirPeristiwaAspek,
    html
  };
}

/*
  Contoh:
  const hasilTafsir = susunNarasiTafsirJamuan({
    idDalil: 5,
    status: "saad",
    planetUtama: "moon",
    aspek: "trine",
    planetPendukung: "venus"
  });
  document.getElementById("areaTafsir").innerHTML = hasilTafsir.html;
*/
