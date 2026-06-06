# 25 Dalil Jamuan Walimah - Android WebView

Project ini adalah Android WebView native berbasis Java untuk menjalankan bundle HTML/CSS/JS offline.

## Struktur penting

- File website berada di `app/src/main/assets/`
- Database JS berada di `app/src/main/assets/js/db/`
- WebView membuka `file:///android_asset/index.html`
- Tombol print memakai `window.AndroidPrint.printPage()` di APK dan fallback ke `window.print()` di browser biasa.

## Cara build lewat GitHub Actions

1. Upload semua isi folder project ini ke repository GitHub.
2. Buka tab **Actions**.
3. Pilih workflow **Build APK - 25 Dalil Jamuan Walimah**.
4. Klik **Run workflow**.
5. Setelah selesai, buka hasil workflow.
6. Download artifact bernama **25-Dalil-Jamuan-Walimah-debug-apk**.
7. Ekstrak artifact ZIP dari GitHub, lalu instal file APK debug di Android.

## Catatan instal APK

Jika Android menolak instal dari luar Play Store, aktifkan izin **Install unknown apps / Instal aplikasi tidak dikenal** untuk aplikasi yang digunakan membuka APK, misalnya File Manager, Chrome, atau Google Drive.
