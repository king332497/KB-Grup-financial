# KBSTARFinance — Simulasi UI + Admin Realtime untuk Vercel

Project simulasi frontend Tahap 1–10 dengan Admin Panel untuk monitoring anonymous session dan navigasi remote **hanya antar-route demo yang di-whitelist**.

## Arsitektur production

```text
Browser User Demo
  ├─ presence setiap ~5 detik
  └─ polling command setiap ~2,2 detik
          ↓
Vercel Functions (/api/*)
          ↓
Upstash Redis REST (shared state)
          ↑
Admin Panel
  └─ polling live sessions/audit setiap ~2,2 detik
```

State realtime tidak disimpan di memory Vercel Function.

## Route simulasi yang di-whitelist

- HOME
- LOGIN
- IDENTITAS
- VERIFIKASI
- PROFIL
- DETAIL_PINJAMAN
- RINGKASAN
- TAHAP_8
- PIN_DEMO
- TAHAP_9
- DASHBOARD

Admin tidak dapat mengirim URL bebas atau JavaScript.

## Deployment

Baca [`VERCEL-DEPLOY.md`](./VERCEL-DEPLOY.md).

## Environment Variables

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
ADMIN_PASSWORD_HASH   # direkomendasikan
ADMIN_ID              # opsional
```

Untuk test sementara, `ADMIN_PASSWORD` didukung sebagai alternatif `ADMIN_PASSWORD_HASH`.

## Health check

Setelah deployment:

```text
GET /api/health
```

Harus memberi `ok: true` sebelum Admin Panel digunakan.

## Test lokal source

```bash
npm test
```

Test mencakup route whitelist, CSRF, admin auth, anonymous session, online/offline, command navigation, audit SUCCESS, dan penolakan arbitrary URL menggunakan mock Redis lokal.

## Batasan simulasi

Tidak ada transfer, pencairan, pemeriksaan rekening nyata, OTP bank, PIN bank, CVV, kartu, atau integrasi API perbankan. Monitoring admin hanya menggunakan anonymous session ID dan metadata route.
