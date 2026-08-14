# Final Verification — Admin Realtime

## Verified

- Admin authentication and admin-only authorization are enforced.
- Admin mutations require CSRF token and same-origin request.
- Users are identified only by an anonymous 6-character Session ID.
- Monitoring payload contains only Session ID, route code, last seen, online status, and derived progress.
- User form inputs, passwords, PIN Demo, OTP, NIK Demo, documents, signature canvas data, and bank-account input are not read by the monitoring runtime.
- Admin can select only the 11 backend-whitelisted internal route codes.
- Backend rejects arbitrary route input.
- Browser runtime maintains its own route whitelist and ignores unknown route codes.
- Online user navigation commands are delivered through SSE.
- A command becomes `SUCCESS` only after the session reports presence on the destination route.
- Admin receives the updated current page over SSE without manual refresh.
- Offline users are rejected with `User Offline — Tidak dapat dipindahkan`; commands are not queued.
- Successful and rejected offline move attempts are written to the audit log without sensitive data.
- Existing user-page CSS is byte-identical at the `<style>` block level to the frozen mobile baseline.
- 48 mobile layout checks across 320, 360, 390, and 430 px reported no horizontal page overflow and no JavaScript page errors in static render testing.

## Architecture

`Admin Panel → Node backend → SSE channel → demo browser → client route whitelist → internal navigation`

Admin session updates use a separate SSE channel so Live Users refresh automatically.

## Deployment constraint

This package uses in-memory session/realtime state and is designed for one stateful Node process. For multiple application instances, use shared session/realtime infrastructure (for example Redis pub/sub) and persistent audit storage.

## Test note

This sandbox blocks Chromium from opening localhost/file URLs. Therefore a full browser-to-localhost E2E run could not be executed here. The realtime backend was tested at HTTP/SSE integration level, and the browser navigation whitelist was separately executed in a JavaScript runtime unit test.
