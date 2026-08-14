# FINAL VERIFICATION — KBSTARFinance Simulasi + Admin Realtime

Versi: 3.0.0

## Perbaikan final

- Presence session tidak lagi bergantung pada POST heartbeat saja.
- `bootstrap` menerima current `routeCode`, sehingga browser yang langsung berada di Tahap 5 tercatat sebagai **Tahap 5**, bukan default Halaman Depan.
- Polling command juga membawa `routeCode` aktif dan menjadi heartbeat cadangan.
- Deteksi Tahap 5/6/7 menggunakan DOM + URL sebagai fallback, sehingga lebih tahan terhadap perbedaan WebView/in-app browser.
- Perubahan `history.pushState()` / `replaceState()` langsung memicu sinkronisasi current page.
- Polling remote navigation tidak dihentikan hanya karena tab sedang background.
- Runtime diberi cache-buster `simulation-runtime.js?v=3` agar browser tidak mempertahankan runtime lama setelah redeploy.
- Namespace Redis dinaikkan ke `kb-sim:v3`, sehingga daftar session lama dari versi sebelumnya tidak tercampur dengan versi final.
- Tidak ada perubahan visual terhadap Tahap 1–10 selain query cache-buster pada tag script.

## Pengujian otomatis

- `node -c` seluruh JavaScript: PASS
- `npm test`: PASS
  - static-security-test: PASS
  - runtime-navigation-test: PASS
- Regression test direct Tahap 5 -> Admin route `PROFIL`: PASS
- Regression polling Tahap 6 -> Admin route `DETAIL_PINJAMAN`: PASS
- Admin auth + CSRF: PASS
- Whitelist route: PASS
- Arbitrary URL rejection: PASS
- Remote command + acknowledgement `SUCCESS`: PASS
- Offline user rejection: PASS
- Audit log tanpa data sensitif: PASS
- Redis env compatibility `KV_REST_API_URL` / `KV_REST_API_TOKEN`: PASS

## Baseline visual

File HTML Tahap 1–10 dibandingkan dengan baseline sebelumnya. Setelah mengabaikan perubahan query cache-buster `?v=3`, konten HTML seluruh halaman user identik dengan baseline. Tidak ada CSS, layout, card, form, typography, atau responsive rule yang diubah pada perbaikan realtime final.

## Deployment Vercel

Environment Variables minimum:

- `ADMIN_PASSWORD` **atau** `ADMIN_PASSWORD_HASH`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

Variable Redis biasanya sudah dibuat otomatis ketika Upstash for Redis dihubungkan ke project Vercel.

Setelah upload/redeploy, verifikasi:

1. `/api/health` -> `ok:true`, `redisConfigured:true`, `redisReachable:true`, `adminCredentialConfigured:true`.
2. `/admin` -> login admin.
3. Buka website user pada browser/HP.
4. Admin harus melihat current page yang benar, termasuk Tahap 5.
5. Jalankan `Pindahkan` ke route whitelist.
6. Browser user berpindah dan Audit Log berubah dari `SENT` menjadi `SUCCESS`.

## Batas verifikasi

Environment pembuatan artifact memblokir navigasi Chromium ke URL lokal/file, sehingga render-browser ulang final tidak dapat dijalankan di sini. Perubahan final tidak menyentuh CSS/layout; mobile visual tetap berasal dari baseline yang sebelumnya telah diuji. Pengujian runtime/backend final dilakukan melalui Node integration tests dan syntax/security checks.

## v4 credential hotfix
- `ADMIN_PASSWORD` sekarang diprioritaskan bila tersedia.
- `ADMIN_PASSWORD_HASH` hanya menjadi fallback jika `ADMIN_PASSWORD` tidak diset.
- `/api/health` menampilkan `adminCredentialMode` (`password`, `hash`, atau `none`) tanpa membocorkan nilai credential.
- Ditambahkan regression test untuk mencegah stale/shared `ADMIN_PASSWORD_HASH` mengalahkan password project yang aktif.
