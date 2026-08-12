# KBSTARFinance — Simulasi UI

File utama: `index.html`

Karakteristik:
- Replikasi visual mobile-first berdasarkan screenshot referensi.
- Tidak ada backend.
- Tidak ada form data sensitif.
- Tidak menggunakan localStorage/sessionStorage/database.
- CTA aktif, secara default hanya mengarah ke bagian `#simulasi`.
- Ada badge jelas "SIMULASI UI · BUKAN SITUS RESMI" untuk menghindari kesan sebagai situs bank resmi.

Untuk menghubungkan tombol ke halaman demo lain, edit:
`const NEXT_URL = "#simulasi";`

Contoh:
`const NEXT_URL = "/pengajuan-demo.html";`

Catatan:
Tampilan dibuat dari HTML/CSS, bukan memakai screenshot sebagai background, sehingga tetap responsif.
