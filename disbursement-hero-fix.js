(() => {
  'use strict';
  const frame = document.getElementById('app');
  if (!frame) return;

  function install() {
    let d;
    try { d = frame.contentDocument; } catch { return; }
    if (!d || !d.body) return;

    const apply = () => {
      const page = d.querySelector('#ks-disbursement-account');
      const hero = page?.querySelector('.ks-disbursement-video-hero');
      if (!page || !hero) return false;

      hero.dataset.premiumHeroInstalled = 'final-v3';
      hero.classList.add('ks-premium-disbursement-hero');

      hero.querySelectorAll('.ks-premium-disbursement-visual').forEach(el => el.remove());
      Array.from(hero.children).forEach(el => {
        if (!el.classList.contains('ks-premium-disbursement-visual')) el.style.display = 'none';
      });

      const visual = d.createElement('div');
      visual.className = 'ks-premium-disbursement-visual';
      const img = d.createElement('img');
      img.src = new URL('assets/kb-luxury-hero-visual.png?v=final-v3-20260912', d.baseURI).href;
      img.alt = '';
      visual.appendChild(img);
      hero.appendChild(visual);

      d.getElementById('ks-premium-disbursement-style-final')?.remove();
      const style = d.createElement('style');
      style.id = 'ks-premium-disbursement-style-final';
      style.textContent = `
        #ks-disbursement-account .ks-premium-disbursement-hero{position:relative!important;overflow:hidden!important;min-height:260px!important;border-radius:24px!important;background:#fff4cf!important;box-shadow:0 20px 55px rgba(146,98,15,.18)!important;isolation:isolate}
        #ks-disbursement-account .ks-premium-disbursement-visual{display:block!important;position:absolute!important;inset:0!important;z-index:1!important;overflow:hidden!important;background:#fff4cf!important}
        #ks-disbursement-account .ks-premium-disbursement-visual img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;filter:brightness(1.18) saturate(1.08) contrast(1.02)!important;transform:scale(1.02);animation:ksHeroMoveFinal 14s ease-in-out infinite alternate;will-change:transform}
        #ks-disbursement-account .ks-premium-disbursement-hero:before{content:"";position:absolute;inset:-35%;z-index:3;pointer-events:none;background:linear-gradient(112deg,transparent 42%,rgba(255,255,255,.10) 47%,rgba(255,221,92,.42) 50%,rgba(255,255,255,.10) 53%,transparent 58%);animation:ksHeroSweepFinal 7s ease-in-out infinite}
        #ks-disbursement-account .ks-premium-disbursement-hero:after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(circle at 70% 42%,rgba(255,223,105,.18),transparent 34%);animation:ksHeroGlowFinal 5s ease-in-out infinite}
        @keyframes ksHeroMoveFinal{0%{transform:scale(1.02) translate3d(-.4%,0,0)}50%{transform:scale(1.05) translate3d(.7%,-.5%,0)}100%{transform:scale(1.03) translate3d(-.2%,.4%,0)}}
        @keyframes ksHeroSweepFinal{0%,20%{transform:translateX(-55%);opacity:0}48%{opacity:1}78%,100%{transform:translateX(55%);opacity:0}}
        @keyframes ksHeroGlowFinal{0%,100%{opacity:.45}50%{opacity:1}}
        @media(max-width:430px){#ks-disbursement-account .ks-premium-disbursement-hero{min-height:215px!important;border-radius:20px!important}#ks-disbursement-account .ks-premium-disbursement-visual img{object-position:55% center!important;animation-duration:16s}}
        @media(prefers-reduced-motion:reduce){#ks-disbursement-account .ks-premium-disbursement-visual img,#ks-disbursement-account .ks-premium-disbursement-hero:before,#ks-disbursement-account .ks-premium-disbursement-hero:after{animation:none!important}}
      `;
      d.head.appendChild(style);
      return true;
    };

    if (apply()) return;
    const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
    observer.observe(d.body, {subtree:true, childList:true});
    d.defaultView?.setTimeout(() => observer.disconnect(), 10000);
  }

  frame.addEventListener('load', install);
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') install();
})();
