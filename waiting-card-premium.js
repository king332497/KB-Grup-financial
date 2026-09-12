/* Visual-only enhancement. The existing PIN, countdown and result controller owns all state. */
(() => {
  'use strict';
  const frame = document.getElementById('app');
  if (!frame) return;

  function install() {
    let d;
    try { d = frame.contentDocument; } catch { return; }
    if (!d?.head || !d.body || !d.defaultView) return;
    const w = d.defaultView;

    function apply() {
      const card = d.getElementById('ks-approval-countdown');
      if (!card) return false;
      if (card.dataset.waitingPremium === '1') return true;
      const head = card.querySelector('.ksa-wait-head');
      const timer = d.getElementById('ks-approval-countdown-time');
      const progress = d.getElementById('ks-approval-countdown-progress');
      if (!head || !timer || !progress || !card.contains(timer) || !card.contains(progress)) return false;

      if (!d.getElementById('kswm-style')) {
        const style = d.createElement('style');
        style.id = 'kswm-style';
        style.textContent = `
#ks-approval-countdown.kswm,#ks-approval-countdown.kswm *{box-sizing:border-box}
#ks-approval-countdown.kswm{position:relative;isolation:isolate;overflow:hidden;margin:22px 0 0;padding:26px 28px 0;border:1px solid #dac4ed;border-radius:26px;color:#fff;background:radial-gradient(ellipse at 95% 10%,#b261de66,transparent 55%),linear-gradient(118deg,#602098,#7c26bd 60%,#8c39c8);box-shadow:0 18px 40px #59218d20,inset 0 1px 0 #ffffff26}
#ks-approval-countdown.kswm[hidden]{display:none!important}
#ks-approval-countdown.kswm::before{content:"";position:absolute;inset:-60% -50%;z-index:-1;pointer-events:none;background:linear-gradient(110deg,transparent 43%,#fff5ba16 48%,#ffe5813b 50%,#fff5ba12 52%,transparent 57%);animation:kswmSweep 12s ease-in-out infinite}
#ks-approval-countdown.kswm::after{content:"";position:absolute;width:360px;height:360px;right:-150px;bottom:34px;z-index:-1;border:40px solid #ffffff06;border-radius:50%;pointer-events:none;animation:kswmFloat 14s ease-in-out infinite}
#ks-approval-countdown .kswm-top{display:flex;align-items:center;justify-content:space-between;gap:14px;padding-bottom:20px;border-bottom:1px solid #ffffff24}
#ks-approval-countdown .kswm-brand{display:flex;align-items:baseline;gap:9px;white-space:nowrap}
#ks-approval-countdown .kswm-brand strong{font-size:26px;line-height:1;letter-spacing:-1px;font-weight:650}
#ks-approval-countdown .kswm-brand b{color:#ffe34f;font-size:20px;font-weight:800}
#ks-approval-countdown .kswm-brand small{color:#efe1fc;font-size:10px;letter-spacing:.2px}
#ks-approval-countdown .kswm-pause{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:36px;padding:7px 11px;border:1px solid #ffffff45;border-radius:999px;background:#ffffff10;color:#fff;font:600 10px/1.4 'Segoe UI',Arial,sans-serif;cursor:pointer;flex-shrink:0}
#ks-approval-countdown .kswm-pause:hover{background:#ffffff20}
#ks-approval-countdown .kswm-pause:focus-visible{outline:3px solid #ffe34f;outline-offset:3px}
#ks-approval-countdown .kswm-pause svg{width:12px;height:12px;flex:none}
#ks-approval-countdown.kswm .ksa-wait-head{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 194px;align-items:center;gap:30px;padding:26px 0 20px}
#ks-approval-countdown.kswm .ksa-wait-head>div{min-width:0}
#ks-approval-countdown .kswm-eyebrow{display:flex;align-items:center;gap:8px;margin-bottom:13px;color:#ffeb92;font-size:10px;font-weight:700;letter-spacing:1.5px;line-height:1.5}
#ks-approval-countdown .kswm-eyebrow::before{content:"";width:6px;height:6px;flex:none;border-radius:50%;background:#ffe34f;box-shadow:0 0 0 5px #ffe34f14;animation:kswmPulse 4s ease-in-out infinite}
#ks-approval-countdown.kswm h4{max-width:460px;margin:0 0 12px;font-size:clamp(23px,3.3vw,33px);font-weight:750;line-height:1.18;letter-spacing:-.6px;color:#fff;text-wrap:balance}
#ks-approval-countdown.kswm .ksa-wait-head p{max-width:440px;margin:0;font-size:13px;line-height:1.75;color:#f1e5fb}
#ks-approval-countdown .kswm-timer{position:relative;width:184px;height:184px;display:flex;flex-direction:column;align-items:center;justify-content:center;justify-self:center;border:1px solid #f9de803b;border-radius:50%;background:radial-gradient(circle at 40% 25%,#ffffff13,#48216b2e);box-shadow:inset 0 0 0 9px #ffffff03,0 12px 28px #3c116223}
#ks-approval-countdown .kswm-timer::before{content:"";position:absolute;inset:13px;border:1px solid #ffffff1c;border-radius:50%;pointer-events:none}
#ks-approval-countdown .kswm-timer::after{content:"";position:absolute;inset:22px;z-index:-1;border-radius:50%;background:radial-gradient(circle,#ffd95625,transparent 70%);pointer-events:none;animation:kswmPulse 5s ease-in-out infinite}
#ks-approval-countdown .kswm-ring{position:absolute;inset:-5px;border:1px solid transparent;border-top-color:#ffe587;border-right-color:#ffe58765;border-radius:50%;pointer-events:none;animation:kswmOrbit 18s linear infinite}
#ks-approval-countdown .kswm-ring::before{content:"";position:absolute;top:25px;right:21px;width:7px;height:7px;border-radius:50%;background:#ffe997;box-shadow:0 0 13px #ffe37b88}
#ks-approval-countdown .kswm-clock{display:block;width:19px;height:19px;margin-bottom:8px;color:#ffe596}
#ks-approval-countdown.kswm #ks-approval-countdown-time{position:relative;display:block;flex:none;color:#fff8d8;font:750 43px/1.1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:-1.5px;font-variant-numeric:tabular-nums;text-shadow:0 2px 18px #ffe38724}
#ks-approval-countdown .kswm-timer-label{margin-top:9px;color:#f1e1fb;font-size:9px;letter-spacing:1.6px;line-height:1.4}
#ks-approval-countdown .kswm-progress-label{display:flex;justify-content:space-between;gap:14px;color:#f2e4fd;font-size:10px;line-height:1.5;margin:0 0 9px}
#ks-approval-countdown .kswm-progress-label span:last-child{color:#ffe993}
#ks-approval-countdown.kswm #ks-approval-countdown-progress{position:relative;height:7px;margin:0 0 22px;border-radius:99px;overflow:hidden;background:#ffffff2b}
#ks-approval-countdown.kswm #ks-approval-countdown-progress i{height:100%;border-radius:inherit;background:linear-gradient(90deg,#ffe34f,#fff3b0);transform-origin:left center;box-shadow:0 0 12px #ffd43833}
#ks-approval-countdown.kswm #ks-approval-countdown-progress::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent,#ffffff50,transparent);animation:kswmShimmer 5.5s ease-in-out infinite}
#ks-approval-countdown.kswm .ksa-wait-note{position:relative;margin:0 -28px;padding:16px 28px;border-top:1px solid #ede0f4;color:#694d79;background:linear-gradient(100deg,#fbf7fe,#fffaf0);font-size:11px;line-height:1.75}
#ks-approval-countdown.kswm[data-motion-paused="true"]::before,#ks-approval-countdown.kswm[data-motion-paused="true"]::after,#ks-approval-countdown.kswm[data-motion-paused="true"] *,#ks-approval-countdown.kswm[data-motion-paused="true"] *::before,#ks-approval-countdown.kswm[data-motion-paused="true"] *::after{animation-play-state:paused!important}
@keyframes kswmSweep{0%,18%{transform:translate3d(-35%,0,0);opacity:0}45%{opacity:.65}78%,100%{transform:translate3d(35%,0,0);opacity:0}}
@keyframes kswmFloat{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-12px,-8px,0)}}
@keyframes kswmPulse{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes kswmOrbit{to{transform:rotate(360deg)}}
@keyframes kswmShimmer{0%,20%{transform:translate3d(-100%,0,0);opacity:0}45%{opacity:.5}80%,100%{transform:translate3d(100%,0,0);opacity:0}}
@media(max-width:600px){#ks-approval-countdown.kswm{padding:21px 20px 0;border-radius:22px}#ks-approval-countdown .kswm-top{padding-bottom:17px}#ks-approval-countdown .kswm-brand small{display:none}#ks-approval-countdown.kswm .ksa-wait-head{grid-template-columns:1fr;gap:22px;padding:22px 0}#ks-approval-countdown.kswm h4{font-size:26px;max-width:340px}#ks-approval-countdown.kswm .ksa-wait-head p{font-size:12px}#ks-approval-countdown .kswm-timer{width:160px;height:160px}#ks-approval-countdown .kswm-ring::before{top:21px;right:18px}#ks-approval-countdown.kswm #ks-approval-countdown-time{font-size:40px}#ks-approval-countdown.kswm .ksa-wait-note{margin:0 -20px;padding:14px 20px}#ks-approval-countdown .kswm-progress-label{font-size:9px}}
@media(max-width:360px){#ks-approval-countdown.kswm{padding:18px 16px 0}#ks-approval-countdown .kswm-brand strong{font-size:24px}#ks-approval-countdown.kswm h4{font-size:24px}#ks-approval-countdown.kswm .ksa-wait-note{margin:0 -16px;padding:13px 16px}#ks-approval-countdown .kswm-pause{padding:7px 9px}}
@media(prefers-reduced-motion:reduce){#ks-approval-countdown.kswm::before,#ks-approval-countdown.kswm::after,#ks-approval-countdown.kswm *,#ks-approval-countdown.kswm *::before,#ks-approval-countdown.kswm *::after{animation:none!important;transition:none!important}#ks-approval-countdown .kswm-pause{display:none}}
        `;
        d.head.appendChild(style);
      }

      const top = d.createElement('div');
      top.className = 'kswm-top';
      top.innerHTML = '<div class="kswm-brand"><strong><b>KB</b>star</strong><small>by KB Bank</small></div><button type="button" class="kswm-pause" aria-pressed="false" aria-label="Jeda animasi dekoratif; countdown tetap berjalan"><svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><path d="M3 2h2v8H3zm4 0h2v8H7z"/></svg><span>Jeda animasi</span></button>';
      card.prepend(top);
      const eyebrow = d.createElement('div');
      eyebrow.className = 'kswm-eyebrow';
      eyebrow.textContent = 'PROSES PENGAJUAN';
      head.firstElementChild.prepend(eyebrow);

      const clock = d.createElement('div');
      clock.className = 'kswm-timer';
      clock.innerHTML = '<span class="kswm-ring" aria-hidden="true"></span><svg class="kswm-clock" aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      // Move, never recreate: the existing controller keeps this exact timer node.
      timer.before(clock);
      clock.appendChild(timer);
      const timerLabel = d.createElement('span');
      timerLabel.className = 'kswm-timer-label';
      timerLabel.textContent = 'SISA WAKTU';
      timerLabel.setAttribute('aria-hidden','true');
      clock.appendChild(timerLabel);
      const progressLabel = d.createElement('div');
      progressLabel.className = 'kswm-progress-label';
      progressLabel.innerHTML = '<span>Waktu tunggu berjalan</span><span>Hasil setelah 00:00</span>';
      progress.before(progressLabel);

      const pause = top.querySelector('button');
      let paused = false;
      const setMotion = () => { card.dataset.motionPaused = String(paused || d.hidden); };
      pause.addEventListener('click', () => {
        paused = !paused;
        pause.setAttribute('aria-pressed',String(paused));
        pause.setAttribute('aria-label',(paused?'Lanjutkan':'Jeda') + ' animasi dekoratif; countdown tetap berjalan');
        pause.querySelector('span').textContent = paused ? 'Lanjutkan animasi' : 'Jeda animasi';
        setMotion();
      });
      d.addEventListener('visibilitychange',setMotion);
      setMotion();
      card.classList.add('kswm');
      card.dataset.waitingPremium = '1';
      return true;
    }

    if (apply()) return;
    const observer = new w.MutationObserver(() => { if (apply()) observer.disconnect(); });
    observer.observe(d.body,{childList:true,subtree:true});
    const timeout = w.setTimeout(() => observer.disconnect(),10000);
    w.addEventListener('pagehide',() => { observer.disconnect(); w.clearTimeout(timeout); },{once:true});
  }
  frame.addEventListener('load',install);
  if (frame.contentDocument?.readyState === 'complete') install();
})();
