# KBSTARFinance — Simulasi UI v4 / Tahap 3

## Baseline
Tahap 1 (`index.html`) dan Tahap 2 (`login.html`) berasal dari v3.
- `index.html` tidak diubah.
- `login.html` hanya diubah pada aksi login sukses agar menuju `identitas.html`.

## Alur
`index.html` → `login.html` → `identitas.html`

Login simulasi:
- Email: `demo@simulasi.test`
- Password: `Demo123!`

## Tahap 3
Field:
1. Nama Lengkap
2. NIK Demo — tepat 16 digit angka
3. Nama Ibu Kandung

Tombol `Lanjutkan` hanya menandai Tahap 3 selesai pada variabel JavaScript in-memory. Tidak ada Tahap 4/redirect lanjutan.

## Keamanan simulasi
- Tidak ada backend/database/API.
- CSP: `connect-src 'none'`.
- Tidak ada fetch/XHR.
- Tidak ada localStorage/sessionStorage/cookie aplikasi.
- Form meminta data dummy dan memperingatkan untuk tidak menggunakan NIK/identitas asli.
