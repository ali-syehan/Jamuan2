25 DALIL JAMUAN WALIMAH
========================

Nama Aplikasi:
25 Dalil Jamuan Walimah

Pembuat:
Irfan Zidny Wahab Al-Hasib

Programed by:
Ali Syehan


DESKRIPSI SINGKAT
-----------------
Aplikasi ini adalah aplikasi HTML offline untuk membaca 25 Dalil Jamuan Walimah.

Aplikasi berjalan secara lokal/offline dan memakai file:
- index.html
- style.css
- app.js
- database JS lokal di folder js/db/


STRUKTUR FILE FINAL
-------------------
index.html
style.css
app.js
README.txt

js/db/db-zodiak-penguasa.js
js/db/db-poin-planet.js
js/db/db-aspek-merkurius.js
js/db/db-tafsir-planet-jamuan.js
js/db/db-tafsir-25-dalil.js
js/db/tafsir-engine-25-dalil.js


FUNGSI MASING-MASING FILE
-------------------------

1. index.html
Halaman utama aplikasi.

2. style.css
Tampilan aplikasi, tema maroon, responsif, dan print.

3. app.js
Logika utama aplikasi: input Event Chart, hasil tafsir, resume, print, dan navigasi halaman.

4. js/db/db-zodiak-penguasa.js
Database zodiak dan planet penguasa tradisional.

5. js/db/db-poin-planet.js
Database status Sa‘ad/Nahas/Netral dan poin planet.

6. js/db/db-aspek-merkurius.js
Database khusus untuk menghakimi Merkurius menjadi Sa‘ad/Nahas/Netral.

7. js/db/db-tafsir-planet-jamuan.js
Database tafsir planet untuk konteks jamuan/kegiatan.

8. js/db/db-tafsir-25-dalil.js
Database 25 dalil, sumber baca, peruntukan, dan tafsir kunci.

9. js/db/tafsir-engine-25-dalil.js
Engine bantu untuk membaca dominasi Sa‘ad/Nahas, tafsir kunci, resume, dan data yang dibaca.


CARA MENJALANKAN
----------------

1. Simpan semua file sesuai struktur folder.
2. Buka file index.html di browser.
3. Untuk Android WebView/APK, masukkan semua file ke folder assets.
4. Pastikan urutan script di index.html benar.


URUTAN SCRIPT WAJIB
-------------------

<script src="js/db/db-zodiak-penguasa.js"></script>
<script src="js/db/db-poin-planet.js"></script>
<script src="js/db/db-aspek-merkurius.js"></script>
<script src="js/db/db-tafsir-planet-jamuan.js"></script>
<script src="js/db/db-tafsir-25-dalil.js"></script>
<script src="js/db/tafsir-engine-25-dalil.js"></script>
<script src="app.js"></script>


CATATAN
-------

- Aplikasi berjalan offline.
- Tidak memakai API.
- Tidak memakai server.
- Tidak memakai database online.
- File db-tafsir-aspek-planet-event.js tidak dipakai.
- File db-tafsir-template-cerita.js tidak dipakai.
- Print di WebView Android membutuhkan AndroidPrint.printPage() jika ingin simpan PDF dari APK.
