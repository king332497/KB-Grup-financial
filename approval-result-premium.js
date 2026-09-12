(() => {
  'use strict';
  const frame = document.getElementById('app');
  if (!frame) return;

  function install() {
    let d;
    try { d = frame.contentDocument; } catch { return; }
    if (!d || !d.defaultView || d.getElementById('ks-approved-result')) return;

    const approval = d.getElementById('ks-approval-view');
    const form = d.getElementById('ks-approval-form');
    const confirm = d.getElementById('ks-approval-confirm');
    const title = d.querySelector('.ki-view-title');
    const status = d.querySelector('#kbstar-loan-hero .ks-status');
    if (!approval || !form || !confirm) return;

    const style = d.createElement('style');
    style.id = 'ks-approved-result-style';
    style.textContent = `
      #ks-approved-result{display:none;margin:22px 0 0;padding:0;border-radius:24px;overflow:hidden;background:linear-gradient(145deg,#2f0b50 0%,#5c1790 44%,#7a28b2 70%,#4b126f 100%);color:#fff;box-shadow:0 24px 64px rgba(64,20,91,.24);position:relative;isolation:isolate}
      #ks-approved-result.is-visible{display:block;animation:ksaEnter .48s cubic-bezier(.2,.8,.2,1)}
      #ks-approved-result:before{content:"";position:absolute;inset:-55% -18%;background:linear-gradient(112deg,transparent 42%,rgba(255,250,214,.06) 47%,rgba(255,226,91,.34) 50%,rgba(255,250,214,.07) 53%,transparent 58%);animation:ksaSweep 7s ease-in-out infinite;pointer-events:none}
      #ks-approved-result:after{content:"";position:absolute;width:260px;height:260px;right:-95px;top:-110px;border-radius:50%;background:radial-gradient(circle,#ffe76833,transparent 68%);pointer-events:none}
      #ks-approved-result .ksa-inner{position:relative;z-index:2;padding:28px 28px 25px;display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center}
      #ks-approved-result .ksa-icon{width:70px;height:70px;border-radius:22px;display:grid;place-items:center;background:linear-gradient(145deg,#fff5a9,#ffe44a 55%,#f3b91c);color:#4f176f;box-shadow:0 16px 32px rgba(255,214,54,.22),inset 0 1px 0 #fff9cf}
      #ks-approved-result .ksa-icon svg{width:38px;height:38px}
      #ks-approved-result .ksa-kicker{font-size:10px;font-weight:800;letter-spacing:1.7px;color:#ffe98b;margin-bottom:7px}
      #ks-approved-result h3{margin:0;color:#fff;font-size:clamp(25px,4vw,38px);line-height:1.08;letter-spacing:-1px}
      #ks-approved-result p{margin:9px 0 0;max-width:620px;color:rgba(255,255,255,.77);font-size:12px;line-height:1.75}
      #ks-approved-result .ksa-badge{align-self:start;padding:7px 10px;border-radius:999px;border:1px solid rgba(255,237,145,.28);background:rgba(255,255,255,.08);color:#ffe87e;font-size:9px;font-weight:800;letter-spacing:1px;white-space:nowrap}
      #ks-approved-result .ksa-meta{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(255,255,255,.10);border-top:1px solid rgba(255,255,255,.10)}
      #ks-approved-result .ksa-meta>div{padding:15px 18px;background:rgba(23,3,39,.22)}
      #ks-approved-result .ksa-meta span{display:block;color:rgba(255,255,255,.54);font-size:9px;margin-bottom:4px}
      #ks-approved-result .ksa-meta strong{font-size:11px;color:#fff;font-weight:700}
      #ks-approved-result .ksa-actions{position:relative;z-index:2;display:flex;justify-content:flex-end;padding:16px 18px 19px;border-top:1px solid rgba(255,255,255,.09)}
      #ks-approved-dashboard{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:46px;padding:12px 18px;border:0;border-radius:12px;background:#ffe500;color:#4b2d04;font:800 12px/1.4 inherit;text-decoration:none;box-shadow:0 10px 28px rgba(255,226,32,.20)}
      #ks-approved-dashboard:hover{background:#ffed59}
      @keyframes ksaEnter{from{opacity:0;transform:translateY(8px) scale(.99)}to{opacity:1;transform:none}}
      @keyframes ksaSweep{0%,18%{transform:translateX(-48%);opacity:0}45%{opacity:.8}72%,100%{transform:translateX(48%);opacity:0}}
      @media(max-width:700px){#ks-approved-result .ksa-inner{grid-template-columns:auto 1fr;padding:22px 18px}#ks-approved-result .ksa-badge{grid-column:1/-1;justify-self:start}#ks-approved-result .ksa-meta{grid-template-columns:1fr}#ks-approved-result .ksa-actions{padding:14px}#ks-approved-dashboard{width:100%}}
      @media(max-width:430px){#ks-approved-result{border-radius:20px}#ks-approved-result .ksa-icon{width:58px;height:58px;border-radius:18px}#ks-approved-result h3{font-size:28px}}
      @media(prefers-reduced-motion:reduce){#ks-approved-result,#ks-approved-result:before{animation:none!important}}
    `;
    d.head.appendChild(style);

    const result = d.createElement('section');
    result.id = 'ks-approved-result';
    result.setAttribute('role','status');
    result.setAttribute('aria-live','polite');
    result.innerHTML = `
      <div class="ksa-inner">
        <div class="ksa-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="m7.8 12.2 2.6 2.6 5.8-6" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div><div class="ksa-kicker">HASIL PENGAJUAN</div><h3>PINJAMAN DISETUJUI!</h3><p>Pengajuan pada sesi simulasi ini telah mencapai status disetujui. Halaman tetap berada di tahap Persetujuan agar ringkasan dapat ditinjau kembali sebelum membuka Dashboard.</p></div>
        <div class="ksa-badge">STATUS SIMULASI</div>
      </div>
      <div class="ksa-meta"><div><span>Status</span><strong>Disetujui</strong></div><div><span>Tahap</span><strong>Persetujuan selesai</strong></div><div><span>Berikutnya</span><strong>Dashboard KBstar-style</strong></div></div>
      <div class="ksa-actions"><a id="ks-approved-dashboard" href="dashboard-kbstar-premium.html">Buka Dashboard <span aria-hidden="true">→</span></a></div>`;

    approval.querySelector('.ksp-actions')?.insertAdjacentElement('beforebegin', result);

    d.addEventListener('submit', event => {
      if (event.target !== form || approval.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();

      const checks = Array.from(form.querySelectorAll('input[type="checkbox"]'));
      if (checks.some(el => !el.checked) || confirm.disabled) return;

      checks.forEach(el => { el.disabled = true; });
      approval.dataset.consentConfirmed = 'session-only';
      confirm.disabled = true;
      confirm.innerHTML = '✓ Persetujuan Selesai';

      const existingSuccess = d.getElementById('ks-approval-success');
      if (existingSuccess) existingSuccess.hidden = true;
      const existingError = d.getElementById('ks-approval-error');
      if (existingError) existingError.hidden = true;

      result.classList.add('is-visible');
      result.scrollIntoView({block:'nearest',behavior:'smooth'});
      if (title) title.textContent = 'KBStar · Persetujuan Disetujui';
      if (status) status.textContent = 'Status simulasi: pinjaman disetujui. Tetap di halaman Persetujuan.';
    }, true);
  }

  frame.addEventListener('load', install);
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') install();
})();