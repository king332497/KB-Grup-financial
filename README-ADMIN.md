# Admin Panel — Vercel Realtime

URL setelah deploy:

```text
/admin
```

`vercel.json` me-rewrite `/admin` ke `/admin.html`.

## Yang ditampilkan Admin

- Anonymous Session ID 6 digit hex.
- Online / Offline.
- Current Page.
- Last Seen.
- Progress Tahap 0–10.
- Pending navigation command.
- Audit log route navigation.

Tidak ada field form, password, PIN, OTP, NIK, CVV, nomor kartu, atau credential bank di monitoring.

## Pindahkan User

1. Klik **Pindahkan** pada user Online.
2. Pilih route dari dropdown whitelist.
3. Klik **Pindahkan User**.
4. Konfirmasi **Ya, Pindahkan**.
5. Backend menyimpan command untuk anonymous session yang dituju selama maksimum 20 detik.
6. Browser session tersebut mengambil command melalui endpoint same-origin dan memvalidasi route sekali lagi melalui browser-side whitelist.
7. Browser menampilkan `Navigasi simulasi diperbarui.` lalu berpindah.
8. Halaman tujuan mengirim presence.
9. Audit berubah menjadi `SUCCESS` dan Admin Panel memperbarui Current Page tanpa refresh manual.

## Offline

Presence yang lebih lama dari 15 detik dianggap Offline. Move akan ditolak dengan `USER_OFFLINE`; command tidak di-queue untuk sesi yang kembali online nanti.

## Security

- Admin auth server-side.
- HttpOnly admin cookie.
- Shared admin session di Redis.
- CSRF token untuk action write.
- Same-origin validation.
- Shared login rate limit.
- Backend route whitelist.
- Browser route whitelist.
- Tidak ada arbitrary URL.
- Tidak ada eval/remote JavaScript.
- Audit log tidak menyimpan sensitive form data.
