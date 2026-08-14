# KBSTARFinance — Simulasi UI v6 (Tahap 5–7)

## Alur

`index.html` → `login.html` → `identitas.html` → `verifikasi.html` → `profil-pengajuan.html#tahap-5` → Tahap 6 → Tahap 7

Tahap 5, 6, dan 7 berada dalam satu dokumen dan berpindah sebagai screen internal. Keputusan ini menjaga state demo hanya di memori JavaScript tanpa `localStorage`, `sessionStorage`, cookie, query-string data, API, atau backend.

## Tahap 5
- Status Pekerjaan
- Bidang Pekerjaan / Usaha
- Lama Bekerja / Lama Usaha
- Penghasilan Bulanan Demo
- Domisili Demo

## Tahap 6
- Jenis Pinjaman
- Nominal Pinjaman Demo (input + slider)
- Tenor 12/24/36/48/60 bulan
- Tujuan Pinjaman

Rentang slider Rp5 juta–Rp500 juta hanya demonstrasi kontrol UI dan bukan batas produk nyata.

## Tahap 7
- Ringkasan nominal, jenis, tenor, tujuan
- Profil pekerjaan demo
- Estimasi Cicilan Dasar = nominal ÷ tenor
- Disclaimer eksplisit bahwa angka belum memasukkan bunga/biaya dan bukan persetujuan kredit
- Tombol Konfirmasi Simulasi hanya mengubah state UI lokal
- Tidak ada Tahap 8

## Keamanan demo
- Tidak ada backend/database
- Tidak ada fetch/XHR/API
- Tidak ada Telegram/SMS/WhatsApp/email
- Tidak ada localStorage/sessionStorage/cookie aplikasi
- CSP `connect-src 'none'`
- Data Tahap 5–7 hanya memori halaman dan hilang saat refresh/keluar halaman
- Data identitas Tahap 3 tidak dipersist sehingga nama tidak ditarik ke ringkasan


## Tahap 8 — Verifikasi Lanjutan Demo

Alur terbaru: Tahap 7 → `tahap8.html`.

Komponen:
- Scan Wajah Demo: animasi CSS saja; tidak memakai kamera/getUserMedia.
- Upload Dokumen Demo: tombol berkas dummy + pemilih PDF lokal opsional. Isi file tidak dibaca dan input langsung dikosongkan.
- Tanda Tangan Demo: coretan canvas lokal; tidak disimpan, tidak diekspor, dan hilang saat refresh/resize.
- Tidak ada Tahap 9.

Keamanan Tahap 8:
- `connect-src 'none'`.
- Tidak ada fetch/XHR/FormData/FileReader/URL.createObjectURL.
- Tidak ada getUserMedia/mediaDevices.
- Tidak ada localStorage/sessionStorage/cookie.
- Tidak ada toDataURL/toBlob untuk tanda tangan.
