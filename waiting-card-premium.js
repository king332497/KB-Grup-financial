/* Visual-only KBstar waiting card. Read existing progress; never own PIN, time or navigation. */
(() => {
  'use strict';
  const frame = document.getElementById('app');
  if (!frame) return;
  const VERSION = 'cinematic-v2';

  function install() {
    let d;
    try { d = frame.contentDocument; } catch { return; }
    if (!d?.head || !d.body || !d.defaultView) return;
    const w = d.defaultView;

    function apply() {
      const card = d.getElementById('ks-approval-countdown');
      if (!card) return false;
      if (card.dataset.waitingPremium === VERSION) return true;
      const head = card.querySelector('.ksa-wait-head');
      const timer = d.getElementById('ks-approval-countdown-time');
      const progress = d.getElementById('ks-approval-countdown-progress');
      if (!head?.firstElementChild || !timer || !progress || !card.contains(timer) || !card.contains(progress)) return false;

      if (typeof card.kswmCleanup === 'function') card.kswmCleanup();
      let style = d.getElementById('kswm-style');
      if (!style) { style = d.createElement('style'); style.id = 'kswm-style'; d.head.appendChild(style); }
      style.textContent = `
#ks-approval-countdown.kswm,#ks-approval-countdown.kswm *{box-sizing:border-box}
#ks-approval-countdown.kswm{position:relative;isolation:isolate;overflow:hidden;margin:22px 0 0;padding:26px 30px 0;border:1px solid #d7bdeb;border-radius:28px;color:#fff;background:radial-gradient(ellipse at 94% 5%,#c484eb65,transparent 52%),linear-gradient(115deg,#63209f,#7f2bc0 55%,#9a45d0);box-shadow:0 20px 44px #6b289823,inset 0 1px 0 #ffffff4d}
#ks-approval-countdown.kswm[hidden]{display:none!important}
#ks-approval-countdown.kswm::before{content:"";position:absolute;left:-45%;top:0;width:45%;height:2px;background:linear-gradient(90deg,transparent,#fff6c4,#ffd450,transparent);animation:kswmEdge 11s ease-in-out infinite;pointer-events:none;z-index:3}
#ks-approval-countdown.kswm::after{content:"";position:absolute;inset:-65% -40%;z-index:0;pointer-events:none;background:linear-gradient(112deg,transparent 44%,#fff4c408 48%,#ffe7a326 50%,#fff4c408 52%,transparent 56%);animation:kswmSweep 15s ease-in-out infinite}
#ks-approval-countdown .kswm-atmosphere{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
#ks-approval-countdown .kswm-parallax{position:absolute;inset:-10%;transform:translate3d(var(--kswm-x,0px),var(--kswm-y,0px),0)}
#ks-approval-countdown .kswm-slow-zoom{position:absolute;inset:0;background:radial-gradient(ellipse at 88% 10%,#e1b2ff16,transparent 60%);transform-origin:75% 42%;animation:kswmZoom 24s ease-in-out infinite}
#ks-approval-countdown .kswm-aura{position:absolute;right:-15%;top:8%;width:68%;height:85%;border-radius:50%;background:radial-gradient(ellipse,#dfb5ff2e,transparent 66%);animation:kswmDrift 18s ease-in-out infinite}
#ks-approval-countdown .kswm-aura-b{right:32%;top:18%;width:48%;height:58%;background:radial-gradient(ellipse,#d2a6ff19,transparent 70%);animation-duration:23s;animation-direction:reverse}
#ks-approval-countdown .kswm-particles{position:absolute;right:0;top:16%;width:34%;height:65%}
#ks-approval-countdown .kswm-particles i{position:absolute;left:17%;top:22%;width:3px;height:3px;background:#fff1ae;border-radius:50%;box-shadow:0 0 8px #ffe6996b;opacity:.3;animation:kswmParticle 9s ease-in-out infinite}
#ks-approval-countdown .kswm-particles i:nth-child(2){left:86%;top:34%;width:2px;height:2px;animation-duration:13s;animation-delay:-4s}
#ks-approval-countdown .kswm-particles i:nth-child(3){left:26%;top:84%;animation-duration:11s;animation-delay:-7s}
#ks-approval-countdown .kswm-particles i:nth-child(4){left:82%;top:74%;width:4px;height:4px;animation-duration:16s;animation-delay:-5s}
#ks-approval-countdown .kswm-particles i:nth-child(5){left:64%;top:7%;width:2px;height:2px;animation-duration:14s;animation-delay:-9s}
#ks-approval-countdown .kswm-top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:14px;padding-bottom:20px;border-bottom:1px solid #ffffff26}
#ks-approval-countdown .kswm-brand{display:flex;align-items:baseline;gap:10px;white-space:nowrap}
#ks-approval-countdown .kswm-brand strong{font-size:28px;line-height:1;letter-spacing:-1.1px;font-weight:650}
#ks-approval-countdown .kswm-brand b{color:#ffe34f;font-size:21px;font-weight:800}
#ks-approval-countdown .kswm-brand small{color:#f3e4ff;font-size:10px;letter-spacing:.2px}
#ks-approval-countdown .kswm-pause{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:40px;padding:8px 13px;border:1px solid #ffffff50;border-radius:999px;background:linear-gradient(120deg,#ffffff18,#ffffff08);box-shadow:inset 0 1px 0 #ffffff17;color:#fff;font:600 10px/1.4 'Segoe UI',Arial,sans-serif;cursor:pointer;flex-shrink:0}
#ks-approval-countdown .kswm-pause:hover{background:#ffffff25}
#ks-approval-countdown .kswm-pause:focus-visible{outline:3px solid #ffe34f;outline-offset:3px}
#ks-approval-countdown .kswm-pause svg{width:12px;height:12px;flex:none}
#ks-approval-countdown.kswm .ksa-wait-head{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) 252px;align-items:center;gap:28px;padding:30px 0 26px}
#ks-approval-countdown.kswm .ksa-wait-head>div{min-width:0}
#ks-approval-countdown .kswm-eyebrow{display:inline-flex;align-items:center;gap:9px;margin-bottom:15px;padding:7px 10px;border:1px solid #ffea9b40;border-radius:999px;background:#ffffff09;color:#ffefaa;font-size:9px;font-weight:700;letter-spacing:1.2px;line-height:1.5}
#ks-approval-countdown .kswm-eyebrow::before{content:"";width:5px;height:5px;flex:none;border-radius:50%;background:#ffe675;box-shadow:0 0 0 4px #ffe34f12;animation:kswmPulse 5s ease-in-out infinite}
#ks-approval-countdown.kswm h4{display:block;max-width:465px;margin:0 0 13px;font-size:clamp(25px,3.6vw,36px);font-weight:750;line-height:1.15;letter-spacing:-.8px;color:#fff;text-wrap:balance}
#ks-approval-countdown.kswm .ksa-wait-head p{max-width:400px;margin:0;font-size:13px;line-height:1.8;color:#f2e6fc}
#ks-approval-countdown .kswm-timer{position:relative;width:228px;height:228px;display:flex;flex-direction:column;align-items:center;justify-content:center;justify-self:center;border:1px solid #ffffff3a;border-radius:50%;background:linear-gradient(145deg,#e4bbff19,#ffffff05 48%,#5117813b);box-shadow:inset 0 2px 0 #ffffff38,inset 0 -6px 14px #4e177b45,0 16px 30px #46156f30}
#ks-approval-countdown .kswm-timer::before{content:"";position:absolute;inset:24px;border:1px solid #fff1bb35;border-radius:50%;background:radial-gradient(circle at 35% 18%,#dbaeff38,transparent 60%),linear-gradient(155deg,#8539b3,#64259c);box-shadow:inset 0 2px 3px #ffffff29,inset 0 -4px 14px #4d17742b,0 5px 12px #4b167332;pointer-events:none}
#ks-approval-countdown .kswm-timer::after{content:"";position:absolute;inset:29px;border-radius:50%;background:radial-gradient(circle at 50% 18%,#ffeaa21f,transparent 65%);pointer-events:none;animation:kswmPulse 8s ease-in-out infinite}
#ks-approval-countdown .kswm-depth{position:absolute;left:10%;right:10%;bottom:-12px;height:12px;border-radius:50%;background:radial-gradient(ellipse,#4d177d38,transparent 70%);pointer-events:none}
#ks-approval-countdown .kswm-timer svg.kswm-progress-ring{display:block;position:absolute;inset:0;width:100%;height:100%;overflow:visible;transform:rotate(-90deg);pointer-events:none}
#ks-approval-countdown .kswm-ring-track{fill:none;stroke:#ffffff26;stroke-width:5}
#ks-approval-countdown .kswm-ring-value{fill:none;stroke:url(#kswm-ring-gold);stroke-width:5;stroke-linecap:butt}
#ks-approval-countdown .kswm-ring-ticks{fill:none;stroke:#ffefbf62;stroke-width:2;stroke-dasharray:1 9}
#ks-approval-countdown .kswm-ring{position:absolute;inset:-10px;border:1px solid transparent;border-top-color:#fff0b979;border-left-color:#ffffff13;border-radius:50%;pointer-events:none;animation:kswmOrbit 28s linear infinite}
#ks-approval-countdown .kswm-ring::before{content:"";position:absolute;top:13%;right:13%;width:5px;height:5px;border-radius:50%;background:#fff0b0;box-shadow:0 0 10px #ffe48580}
#ks-approval-countdown .kswm-orbit-plane{position:absolute;inset:-17px;transform:translate3d(var(--kswm-x,0px),var(--kswm-y,0px),0) rotateX(64deg) rotateZ(-24deg);pointer-events:none}
#ks-approval-countdown .kswm-orbit-plane .kswm-ring{inset:0;border-top-color:#f3d57338;border-left-color:transparent;border-bottom-color:#f3d57326;animation-duration:22s;animation-direction:reverse}
#ks-approval-countdown .kswm-orbit-plane .kswm-ring::before{width:4px;height:4px;opacity:.65}
#ks-approval-countdown .kswm-glass{position:absolute;inset:27px;overflow:hidden;border-radius:50%;pointer-events:none}
#ks-approval-countdown .kswm-glass::before{content:"";position:absolute;inset:-30% -100%;background:linear-gradient(122deg,transparent 41%,#ffffff10 46%,#fff7d835 50%,#ffffff10 54%,transparent 59%);animation:kswmReflection 16s ease-in-out infinite}
#ks-approval-countdown .kswm-clock{position:relative;z-index:1;display:block;width:20px;height:20px;margin-bottom:9px;color:#ffe8a0}
#ks-approval-countdown.kswm #ks-approval-countdown-time{position:relative;z-index:1;display:block;flex:none;color:#fff8d8;font:750 48px/1.12 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:-1.8px;font-variant-numeric:tabular-nums;text-shadow:0 2px 0 #4d1a6d39,0 5px 18px #36125033;transform:none;animation:none}
#ks-approval-countdown .kswm-timer-label{position:relative;z-index:1;margin-top:10px;color:#f5eaff;font-size:9px;letter-spacing:1.8px;line-height:1.4}
#ks-approval-countdown .kswm-progress-label{position:relative;z-index:1;display:flex;justify-content:space-between;gap:14px;color:#f4e9fe;font-size:10px;line-height:1.5;margin:0 0 10px}
#ks-approval-countdown .kswm-progress-label span:last-child{color:#fff0a8}
#ks-approval-countdown .kswm-elapsed{font-weight:700;font-variant-numeric:tabular-nums}
#ks-approval-countdown.kswm #ks-approval-countdown-progress{position:relative;z-index:1;height:8px;margin:0 0 26px;border-radius:99px;overflow:hidden;background:#ffffff26;box-shadow:inset 0 1px 2px #48197133}
#ks-approval-countdown.kswm #ks-approval-countdown-progress i{height:100%;border-radius:inherit;background:linear-gradient(90deg,#ffd960,#fff3b8);transform-origin:left center;box-shadow:0 0 12px #ffd43833}
#ks-approval-countdown.kswm #ks-approval-countdown-progress::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent,#ffffff70,transparent);animation:kswmShimmer 6s ease-in-out infinite}
#ks-approval-countdown.kswm .ksa-wait-note{position:relative;z-index:1;margin:0 -30px;padding:16px 30px;border-top:1px solid #ede0f4;color:#694d79;background:linear-gradient(100deg,#fbf7fe,#fffaf0);font-size:11px;line-height:1.8}
#ks-approval-countdown.kswm[data-motion-paused="true"]::before,#ks-approval-countdown.kswm[data-motion-paused="true"]::after,#ks-approval-countdown.kswm[data-motion-paused="true"] *,#ks-approval-countdown.kswm[data-motion-paused="true"] *::before,#ks-approval-countdown.kswm[data-motion-paused="true"] *::after{animation-play-state:paused!important}
#ks-approval-countdown.kswm:not([hidden]) .kswm-top,#ks-approval-countdown.kswm:not([hidden]) .ksa-wait-head{animation:kswmEntrance .65s cubic-bezier(.2,.8,.2,1) both}
@keyframes kswmEntrance{from{opacity:0;transform:translate3d(0,8px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
@keyframes kswmZoom{0%,100%{transform:scale(1)}50%{transform:scale(1.055)}}
@keyframes kswmReflection{0%,24%{transform:translate3d(-32%,0,0);opacity:0}48%{opacity:.55}78%,100%{transform:translate3d(32%,0,0);opacity:0}}
@keyframes kswmEdge{0%,16%{transform:translate3d(0,0,0);opacity:0}35%{opacity:.9}76%,100%{transform:translate3d(325%,0,0);opacity:0}}
@keyframes kswmSweep{0%,18%{transform:translate3d(-36%,0,0);opacity:0}45%{opacity:.65}78%,100%{transform:translate3d(36%,0,0);opacity:0}}
@keyframes kswmDrift{0%,100%{transform:translate3d(0,0,0);opacity:.6}50%{transform:translate3d(-18px,12px,0);opacity:1}}
@keyframes kswmParticle{0%,100%{transform:translate3d(0,6px,0);opacity:.2}50%{transform:translate3d(6px,-12px,0);opacity:.8}}
@keyframes kswmPulse{0%,100%{opacity:.45}50%{opacity:.9}}
@keyframes kswmOrbit{to{transform:rotate(360deg)}}
@keyframes kswmShimmer{0%,20%{transform:translate3d(-100%,0,0);opacity:0}45%{opacity:.5}80%,100%{transform:translate3d(100%,0,0);opacity:0}}
@media(max-width:680px){#ks-approval-countdown.kswm{padding:22px 22px 0;border-radius:24px}#ks-approval-countdown.kswm .ksa-wait-head{grid-template-columns:minmax(0,1fr) 206px;gap:20px}#ks-approval-countdown .kswm-timer{width:186px;height:186px}#ks-approval-countdown.kswm #ks-approval-countdown-time{font-size:41px}#ks-approval-countdown.kswm h4{font-size:27px}#ks-approval-countdown.kswm .ksa-wait-note{margin:0 -22px;padding:15px 22px}}
@media(max-width:540px){#ks-approval-countdown.kswm{padding:21px 20px 0;border-radius:23px}#ks-approval-countdown .kswm-top{padding-bottom:17px}#ks-approval-countdown .kswm-brand small{display:none}#ks-approval-countdown.kswm .ksa-wait-head{grid-template-columns:1fr;gap:29px;padding:23px 0 30px}#ks-approval-countdown.kswm h4{font-size:28px;max-width:340px}#ks-approval-countdown.kswm .ksa-wait-head p{font-size:12px}#ks-approval-countdown .kswm-timer{width:206px;height:206px}#ks-approval-countdown.kswm #ks-approval-countdown-time{font-size:44px}#ks-approval-countdown .kswm-particles{top:43%;width:100%;height:40%}#ks-approval-countdown.kswm .ksa-wait-note{margin:0 -20px;padding:14px 20px}#ks-approval-countdown .kswm-progress-label{font-size:9px}#ks-approval-countdown .kswm-pause{min-height:44px}}
@media(max-width:360px){#ks-approval-countdown.kswm{padding:18px 16px 0}#ks-approval-countdown .kswm-brand strong{font-size:25px}#ks-approval-countdown.kswm h4{font-size:25px}#ks-approval-countdown.kswm .ksa-wait-note{margin:0 -16px;padding:13px 16px}#ks-approval-countdown .kswm-pause{padding:8px 9px}#ks-approval-countdown .kswm-timer{width:190px;height:190px}}
@media(prefers-reduced-motion:reduce){#ks-approval-countdown.kswm::before,#ks-approval-countdown.kswm::after,#ks-approval-countdown.kswm *,#ks-approval-countdown.kswm *::before,#ks-approval-countdown.kswm *::after{animation:none!important;transition:none!important}#ks-approval-countdown .kswm-pause{display:none}#ks-approval-countdown .kswm-parallax{transform:none}#ks-approval-countdown .kswm-orbit-plane{transform:rotateX(64deg) rotateZ(-24deg)}}
      `;

      // Remove only decorations from an older visual version. Keep controller-owned nodes.
      card.querySelectorAll('.kswm-top,.kswm-atmosphere,.kswm-eyebrow,.kswm-progress-label').forEach(el => el.remove());
      const top = d.createElement('div');
      top.className = 'kswm-top';
      top.innerHTML = '<div class="kswm-brand"><strong><b>KB</b>star</strong><small>by KB Bank</small></div><button type="button" class="kswm-pause" aria-pressed="false" aria-label="Jeda animasi dekoratif; countdown tetap berjalan"><svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><path d="M3 2h2v8H3zm4 0h2v8H7z"/></svg><span>Jeda animasi</span></button>';
      card.prepend(top);
      const atmosphere = d.createElement('div');
      atmosphere.className = 'kswm-atmosphere';
      atmosphere.setAttribute('aria-hidden','true');
      atmosphere.innerHTML = '<div class="kswm-parallax"><div class="kswm-slow-zoom"><span class="kswm-aura"></span><span class="kswm-aura kswm-aura-b"></span><div class="kswm-particles"><i></i><i></i><i></i><i></i><i></i></div></div></div>';
      card.prepend(atmosphere);
      const eyebrow = d.createElement('div');
      eyebrow.className = 'kswm-eyebrow';
      eyebrow.textContent = 'PROSES PENGAJUAN';
      head.firstElementChild.prepend(eyebrow);

      const oldClock = head.querySelector('.kswm-timer');
      const clock = d.createElement('div');
      clock.className = 'kswm-timer';
      clock.innerHTML = '<span class="kswm-depth" aria-hidden="true"></span><span class="kswm-glass" aria-hidden="true"></span><span class="kswm-ring" aria-hidden="true"></span><span class="kswm-orbit-plane" aria-hidden="true"><span class="kswm-ring"></span></span><svg class="kswm-progress-ring" viewBox="0 0 240 240" aria-hidden="true"><defs><linearGradient id="kswm-ring-gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff6cf"/><stop offset=".45" stop-color="#ffdc68"/><stop offset="1" stop-color="#fff2b3"/></linearGradient></defs><circle class="kswm-ring-ticks" cx="120" cy="120" r="116"/><circle class="kswm-ring-track" cx="120" cy="120" r="104"/><circle class="kswm-ring-value" cx="120" cy="120" r="104" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="0"/></svg><svg class="kswm-clock" aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      (oldClock || timer).before(clock);
      clock.appendChild(timer);
      if (oldClock) oldClock.remove();
      const timerLabel = d.createElement('span');
      timerLabel.className = 'kswm-timer-label';
      timerLabel.textContent = 'SISA WAKTU';
      timerLabel.setAttribute('aria-hidden','true');
      clock.appendChild(timerLabel);
      const progressLabel = d.createElement('div');
      progressLabel.className = 'kswm-progress-label';
      progressLabel.innerHTML = '<span>Waktu berlalu · <b class="kswm-elapsed">0%</b></span><span>Hasil setelah 00:00</span>';
      progressLabel.setAttribute('aria-hidden','true');
      progress.before(progressLabel);

      const ring = clock.querySelector('.kswm-ring-value');
      const elapsedLabel = progressLabel.querySelector('.kswm-elapsed');
      function syncRing() {
        // Single source of truth: existing controller updates these ARIA progress values.
        const values = ['aria-valuemin','aria-valuemax','aria-valuenow'].map(name => progress.getAttribute(name));
        const [min,max,now] = values.map(Number);
        if (values.some(value => value === null || value.trim() === '') || ![min,max,now].every(Number.isFinite) || max <= min) {
          ring.setAttribute('visibility','hidden'); elapsedLabel.textContent = '—'; return;
        }
        const elapsed = Math.min(1, Math.max(0, (now - min) / (max - min)));
        ring.removeAttribute('visibility');
        ring.setAttribute('stroke-dashoffset',String(Number((elapsed * 100).toFixed(4))));
        elapsedLabel.textContent = Math.floor(elapsed * 100) + '%';
      }
      const progressObserver = new w.MutationObserver(syncRing);
      const observeProgress = () => progressObserver.observe(progress,{attributes:true,attributeFilter:['aria-valuemin','aria-valuemax','aria-valuenow']});
      observeProgress();
      syncRing();

      const pause = top.querySelector('button');
      const finePointer = w.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 701px)');
      const reducedMotion = w.matchMedia('(prefers-reduced-motion: reduce)');
      let paused = false, inView = true, suspended = false;
      let raf = 0, lastFrame = 0, x = 0, y = 0, targetX = 0, targetY = 0;
      const canParallax = () => finePointer.matches && !reducedMotion.matches && card.dataset.motionPaused !== 'true';
      function resetParallax() {
        if (raf) w.cancelAnimationFrame(raf);
        raf = 0; lastFrame = 0; x = y = targetX = targetY = 0;
        card.style.setProperty('--kswm-x','0px');
        card.style.setProperty('--kswm-y','0px');
      }
      function renderParallax(stamp) {
        raf = 0;
        if (!canParallax()) { resetParallax(); return; }
        const delta = lastFrame ? Math.min(64,stamp-lastFrame) : 16;
        const ease = 1-Math.exp(-delta/115);
        lastFrame = stamp;
        x += (targetX-x)*ease; y += (targetY-y)*ease;
        card.style.setProperty('--kswm-x',x.toFixed(3)+'px');
        card.style.setProperty('--kswm-y',y.toFixed(3)+'px');
        if (Math.abs(targetX-x)+Math.abs(targetY-y) > .02) raf = w.requestAnimationFrame(renderParallax);
        else lastFrame = 0;
      }
      function pointerMove(event) {
        if (event.pointerType !== 'mouse' || !canParallax()) return;
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        targetX = Math.max(-1,Math.min(1,((event.clientX-rect.left)/rect.width-.5)*2))*8;
        targetY = Math.max(-1,Math.min(1,((event.clientY-rect.top)/rect.height-.5)*2))*5;
        if (!raf) raf = w.requestAnimationFrame(renderParallax);
      }
      function pointerLeave() {
        targetX = targetY = 0;
        if (canParallax() && !raf) raf = w.requestAnimationFrame(renderParallax);
      }
      // Pause decorative motion only. Ring and timer still read the controller's progress.
      function setMotion() {
        card.dataset.motionPaused = String(paused || d.hidden || card.hidden || !inView || suspended || reducedMotion.matches);
        if (!canParallax()) resetParallax();
      }
      pause.addEventListener('click', () => {
        paused = !paused;
        pause.setAttribute('aria-pressed',String(paused));
        pause.setAttribute('aria-label',(paused?'Lanjutkan':'Jeda') + ' animasi dekoratif; countdown tetap berjalan');
        pause.querySelector('span').textContent = paused ? 'Lanjutkan animasi' : 'Jeda animasi';
        pause.querySelector('path').setAttribute('d',paused?'M3 2l7 4-7 4z':'M3 2h2v8H3zm4 0h2v8H7z');
        setMotion();
      });
      const visibilityObserver = new w.MutationObserver(setMotion);
      const observeVisibility = () => visibilityObserver.observe(card,{attributes:true,attributeFilter:['hidden']});
      observeVisibility();
      const viewportObserver = typeof w.IntersectionObserver === 'function' ? new w.IntersectionObserver(entries => {
        inView = entries.some(entry => entry.isIntersecting); setMotion();
      }) : null;
      viewportObserver?.observe(card);
      const onVisibility = () => { setMotion(); if (!d.hidden) syncRing(); };
      const onPageHide = () => {
        suspended = true; progressObserver.disconnect(); visibilityObserver.disconnect();
        viewportObserver?.disconnect(); setMotion();
      };
      const onPageShow = () => {
        suspended = false; observeProgress(); observeVisibility(); viewportObserver?.observe(card);
        syncRing(); setMotion();
      };
      card.addEventListener('pointermove',pointerMove,{passive:true});
      card.addEventListener('pointerleave',pointerLeave,{passive:true});
      finePointer.addEventListener('change',setMotion);
      reducedMotion.addEventListener('change',setMotion);
      d.addEventListener('visibilitychange',onVisibility);
      w.addEventListener('pagehide',onPageHide);
      w.addEventListener('pageshow',onPageShow);
      // Cleanup is local to this card; no global timer, routing or storage hooks.
      card.kswmCleanup = () => {
        onPageHide();
        card.removeEventListener('pointermove',pointerMove);
        card.removeEventListener('pointerleave',pointerLeave);
        finePointer.removeEventListener('change',setMotion);
        reducedMotion.removeEventListener('change',setMotion);
        d.removeEventListener('visibilitychange',onVisibility);
        w.removeEventListener('pagehide',onPageHide);
        w.removeEventListener('pageshow',onPageShow);
      };
      setMotion();
      card.classList.add('kswm');
      card.dataset.waitingPremium = VERSION;
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
