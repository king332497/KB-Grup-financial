# KBSTARFinance — Simulasi UI Tahap 1–9

## Alur

`index.html` → `login.html` → `identitas.html` → `verifikasi.html` → `profil-pengajuan.html` (Tahap 5–7) → `tahap8.html` → Konfirmasi PIN Demo → `tahap9.html`

## Tahap 8

- Scan wajah **demo**: animasi UI, tanpa akses kamera / biometrik.
- Upload dokumen **demo**: pilih file dummy; file tidak dibaca, tidak dikirim, dan referensi input segera dilepas.
- Tanda tangan **demo**: coretan canvas lokal, tidak diekspor/disimpan/dikirim.
- Tombol **Selesaikan Pengajuan** baru aktif setelah ketiga interaksi demo selesai.
- Tombol tersebut membuka **Konfirmasi PIN Demo** terlebih dahulu.

## PIN Demo

- Tepat 6 digit angka.
- Semua kombinasi 6 digit diterima.
- Tidak dicocokkan dengan PIN tertentu.
- Tidak ada backend/API/Telegram.
- Tidak ada localStorage/sessionStorage/cookie aplikasi.
- Nilai PIN dikosongkan setelah valid.
- Jangan menggunakan PIN ATM, kartu debit, atau mobile banking asli.

## Tahap 9

Halaman **Menganalisis Pengajuan Simulasi** hanya menjalankan animasi frontend. Tidak ada scoring kredit atau keputusan kredit nyata.

## Baseline

Tahap 1–4 tidak diubah dari paket v6. Perubahan pada `profil-pengajuan.html` hanya pada akhir Tahap 7 agar mengarah ke Tahap 8.
