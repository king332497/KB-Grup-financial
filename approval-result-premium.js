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
    const w = d.defaultView;
    const root = d.getElementById('kbstar-loan-hero');
    const actions = approval?.querySelector('.ksp-actions');
    if (!approval || !form || !confirm || !actions || !root) return;

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
      #ks-approved-result[hidden],#ks-approval-countdown[hidden]{display:none!important}
      #ks-approved-result .ksa-inner>div{min-width:0}
      #ks-approved-result h3{overflow-wrap:anywhere}
      #ks-approval-countdown{box-sizing:border-box;margin:22px 0 0;padding:24px;border:1px solid #d7b9ee;border-radius:22px;background:linear-gradient(135deg,#faf5ff,#fff9e5);color:#512079}
      #ks-approval-countdown .ksa-wait-head{display:flex;align-items:center;justify-content:space-between;gap:16px}
      #ks-approval-countdown .ksa-wait-head>div{min-width:0}
      #ks-approval-countdown h4{margin:0 0 5px;font-size:16px;line-height:1.4;color:#512079}
      #ks-approval-countdown p{margin:0;font-size:12px;line-height:1.65;color:#755b83}
      #ks-approval-countdown-time{flex:none;font:800 34px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;color:#6e23a9;font-variant-numeric:tabular-nums}
      #ks-approval-countdown-progress{height:7px;margin:18px 0 12px;border-radius:999px;overflow:hidden;background:#e9dff0}
      #ks-approval-countdown-progress i{display:block;height:100%;background:linear-gradient(90deg,#7627bc,#efbb28);transform:scaleX(0);transform-origin:left center;transition:transform .3s linear}
      #ks-approval-countdown .ksa-wait-note{font-size:11px}
      @media(max-width:430px){#ks-approval-countdown{padding:18px 16px;border-radius:18px}#ks-approval-countdown h4{font-size:14px}#ks-approval-countdown-time{font-size:28px}}
      @media(prefers-reduced-motion:reduce){#ks-approval-countdown-progress i{transition:none}}
    `;
    d.head.appendChild(style);

    const result = d.createElement('section');
    result.id = 'ks-approved-result';
    result.hidden = true;
    result.setAttribute('role','status');
    result.setAttribute('aria-live','polite');
    result.innerHTML = `
      <div class="ksa-inner">
        <div class="ksa-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="m7.8 12.2 2.6 2.6 5.8-6" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div><div class="ksa-kicker">HASIL PENGAJUAN</div><h3>PINJAMAN DISETUJUI!</h3><p>Waktu tunggu simulasi 5 menit telah selesai. Status ini bukan keputusan kredit bank. Anda tetap berada di halaman Persetujuan dan dapat membuka Dashboard melalui tombol di bawah.</p></div>
        <div class="ksa-badge">STATUS SIMULASI</div>
      </div>
      <div class="ksa-meta"><div><span>Status</span><strong>Disetujui</strong></div><div><span>Tahap</span><strong>Persetujuan selesai</strong></div><div><span>Berikutnya</span><strong>Dashboard KBstar-style</strong></div></div>
      <div class="ksa-actions"><a id="ks-approved-dashboard" href="dashboard-kbstar-premium.html">Buka Dashboard <span aria-hidden="true">→</span></a></div>`;

    actions.insertAdjacentElement('beforebegin', result);

    const countdown = d.createElement('section');
    countdown.id = 'ks-approval-countdown';
    countdown.hidden = true;
    countdown.setAttribute('aria-labelledby','ks-approval-countdown-title');
    countdown.innerHTML = `
      <div class="ksa-wait-head">
        <div><h4 id="ks-approval-countdown-title">Menunggu hasil persetujuan</h4><p>Tetap di halaman Persetujuan selama waktu tunggu berjalan.</p></div>
        <span id="ks-approval-countdown-time" role="timer" aria-live="off" aria-label="Sisa waktu tunggu">05:00</span>
      </div>
      <div id="ks-approval-countdown-progress" role="progressbar" aria-label="Waktu tunggu berlalu" aria-valuemin="0" aria-valuemax="300" aria-valuenow="0"><i></i></div>
      <p class="ksa-wait-note">Waktu tunggu simulasi: 5 menit. Notifikasi hasil baru muncul setelah 00:00. Ini bukan proses keputusan kredit bank.</p>`;
    result.insertAdjacentElement('beforebegin', countdown);

    const checks = Array.from(form.querySelectorAll('input[type="checkbox"]'));
    const time = d.getElementById('ks-approval-countdown-time');
    const progress = d.getElementById('ks-approval-countdown-progress');
    const bar = progress.querySelector('i');
    const waitMs = 5 * 60 * 1000;
    let phase = 'idle';
    let deadline = 0;
    let interval = 0;
    let originalConfirmHTML = confirm.innerHTML;
    let buttonLabel = null;

    function clearTimer() {
      if (interval) w.clearInterval(interval);
      interval = 0;
    }

    function reset() {
      if (phase === 'idle') return;
      phase = 'idle';
      deadline = 0;
      clearTimer();
      countdown.hidden = true;
      time.textContent = '05:00';
      progress.setAttribute('aria-valuenow','0');
      bar.style.transform = 'scaleX(0)';
      result.hidden = true;
      result.classList.remove('is-visible');
      approval.removeAttribute('aria-busy');
      approval.removeAttribute('data-approval-phase');
      approval.removeAttribute('data-consent-confirmed');
      checks.forEach(el => { el.checked = false; el.disabled = false; });
      confirm.innerHTML = originalConfirmHTML;
      confirm.disabled = true;
      const consentProgress = d.getElementById('ks-approval-progress');
      if (consentProgress) consentProgress.textContent = '0 dari ' + checks.length + ' pernyataan disetujui';
      if (!approval.hidden && title) title.textContent = 'KBStar · Persetujuan Pengajuan';
      if (status) status.textContent = 'Waktu tunggu dibatalkan. Periksa data dan konfirmasi persetujuan kembali.';
    }

    function tick() {
      if (phase !== 'waiting') return;
      if (approval.hidden || approval.dataset.consentConfirmed !== 'session-only') { reset(); return; }
      // Monotonic deadline: tab throttling or a wall-clock change cannot skip the wait.
      const remainingMs = Math.max(0, deadline - w.performance.now());
      const remaining = Math.ceil(remainingMs / 1000);
      const label = String(Math.floor(remaining / 60)).padStart(2,'0') + ':' + String(remaining % 60).padStart(2,'0');
      if (time.textContent !== label) time.textContent = label;
      buttonLabel.textContent = 'Menunggu ' + label;
      const elapsed = waitMs - remainingMs;
      progress.setAttribute('aria-valuenow',String(Math.floor(elapsed / 1000)));
      bar.style.transform = 'scaleX(' + Math.min(1, elapsed / waitMs) + ')';
      if (remainingMs > 0) return;

      phase = 'complete';
      clearTimer();
      approval.dataset.approvalPhase = 'complete';
      approval.removeAttribute('aria-busy');
      countdown.hidden = true;
      buttonLabel.textContent = '✓ Persetujuan Selesai';
      result.hidden = false;
      result.classList.add('is-visible');
      result.scrollIntoView({block:'nearest',behavior:w.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
      if (title) title.textContent = 'KBStar · Persetujuan Disetujui';
      if (status) status.textContent = 'Waktu tunggu simulasi 5 menit selesai. Status simulasi: pinjaman disetujui. Tetap di halaman Persetujuan.';
    }

    d.addEventListener('submit', event => {
      if (event.target !== form || approval.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (phase !== 'idle' || !checks.length || checks.some(el => !el.checked) || confirm.disabled) return;

      originalConfirmHTML = confirm.innerHTML;
      phase = 'waiting';
      deadline = w.performance.now() + waitMs;
      checks.forEach(el => { el.disabled = true; });
      approval.dataset.consentConfirmed = 'session-only';
      approval.dataset.approvalPhase = 'waiting';
      approval.setAttribute('aria-busy','true');
      confirm.disabled = true;
      // A child span avoids the legacy PIN script's direct-text label observer.
      buttonLabel = d.createElement('span');
      confirm.replaceChildren(buttonLabel);
      result.hidden = true;
      result.classList.remove('is-visible');
      const existingSuccess = d.getElementById('ks-approval-success');
      if (existingSuccess) existingSuccess.hidden = true;
      const existingError = d.getElementById('ks-approval-error');
      if (existingError) existingError.hidden = true;
      countdown.hidden = false;
      tick();
      interval = w.setInterval(tick,1000);
      countdown.scrollIntoView({block:'nearest',behavior:w.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
      if (title) title.textContent = 'KBStar · Persetujuan Pengajuan';
      if (status) status.textContent = 'Waktu tunggu simulasi 5 menit dimulai. Tetap di halaman Persetujuan.';
    }, true);

    // Leaving, changing the application, or resetting must invalidate a pending/result state.
    const observer = new w.MutationObserver(() => {
      if (phase !== 'idle' && (approval.hidden || approval.dataset.consentConfirmed !== 'session-only')) reset();
    });
    observer.observe(approval,{attributes:true,attributeFilter:['hidden','data-consent-confirmed']});
    root.addEventListener('ks-reset-view',reset);
    d.getElementById('ks-approval-back')?.addEventListener('click',reset,true);
    d.addEventListener('visibilitychange',() => { if (!d.hidden) tick(); });
    w.addEventListener('pagehide',reset);

  }

  frame.addEventListener('load', install);
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') install();
})();