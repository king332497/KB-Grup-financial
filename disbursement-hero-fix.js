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
      if (hero.dataset.premiumHeroInstalled === 'kbstar-final-v4') return true;

      hero.dataset.premiumHeroInstalled = 'kbstar-final-v4';
      hero.classList.add('ks-premium-disbursement-hero');

      hero.querySelectorAll('.ks-premium-disbursement-visual').forEach(el => el.remove());
      Array.from(hero.children).forEach(el => { el.style.display = 'none'; });

      const visual = d.createElement('div');
      visual.className = 'ks-premium-disbursement-visual';
      visual.setAttribute('aria-hidden', 'true');

      const img = d.createElement('img');
      img.src = new URL('assets/hero-kbstar-rekening-final.webp?v=kbstar-final-v4-20260912', d.baseURI).href;
      img.alt = '';
      img.decoding = 'async';
      img.loading = 'eager';
      visual.appendChild(img);
      hero.appendChild(visual);

      d.getElementById('ks-premium-disbursement-style-final')?.remove();
      const style = d.createElement('style');
      style.id = 'ks-premium-disbursement-style-final';
      style.textContent = `
        #ks-disbursement-account .ks-premium-disbursement-hero{
          position:relative!important;
          overflow:hidden!important;
          width:100%!important;
          height:clamp(220px,25vw,290px)!important;
          min-height:0!important;
          border-radius:24px!important;
          background:linear-gradient(135deg,#35115f 0%,#67269a 48%,#f2c936 100%)!important;
          box-shadow:0 20px 54px rgba(72,24,112,.20)!important;
          isolation:isolate!important;
        }
        #ks-disbursement-account .ks-premium-disbursement-visual{
          display:flex!important;
          position:absolute!important;
          inset:0!important;
          z-index:1!important;
          align-items:center!important;
          justify-content:center!important;
          overflow:hidden!important;
          background:linear-gradient(135deg,#35115f 0%,#6b2ca4 52%,#f3ca3c 100%)!important;
        }
        #ks-disbursement-account .ks-premium-disbursement-visual img{
          display:block!important;
          width:100%!important;
          height:100%!important;
          object-fit:contain!important;
          object-position:center!important;
          filter:none!important;
          transform:translate3d(0,0,0) scale(1)!important;
          animation:ksHeroMoveFinal 16s cubic-bezier(.4,0,.2,1) infinite alternate!important;
          will-change:transform!important;
          backface-visibility:hidden!important;
        }
        #ks-disbursement-account .ks-premium-disbursement-hero::before{
          content:"";
          position:absolute;
          inset:-40% -28%;
          z-index:3;
          pointer-events:none;
          background:linear-gradient(112deg,transparent 43%,rgba(255,255,255,.05) 47%,rgba(255,226,102,.34) 50%,rgba(255,255,255,.07) 53%,transparent 57%);
          animation:ksHeroSweepFinal 8.5s ease-in-out infinite;
        }
        #ks-disbursement-account .ks-premium-disbursement-hero::after{
          content:"";
          position:absolute;
          inset:0;
          z-index:2;
          pointer-events:none;
          background:radial-gradient(circle at 75% 48%,rgba(255,222,95,.12),transparent 34%);
          animation:ksHeroGlowFinal 6s ease-in-out infinite;
        }
        @keyframes ksHeroMoveFinal{
          0%{transform:translate3d(-.15%,0,0) scale(1)}
          50%{transform:translate3d(.18%,-.12%,0) scale(1.006)}
          100%{transform:translate3d(-.08%,.10%,0) scale(1.003)}
        }
        @keyframes ksHeroSweepFinal{
          0%,22%{transform:translateX(-54%);opacity:0}
          48%{opacity:.82}
          76%,100%{transform:translateX(54%);opacity:0}
        }
        @keyframes ksHeroGlowFinal{
          0%,100%{opacity:.35}
          50%{opacity:.78}
        }
        @media(max-width:700px){
          #ks-disbursement-account .ks-premium-disbursement-hero{height:220px!important;border-radius:20px!important}
        }
        @media(max-width:430px){
          #ks-disbursement-account .ks-premium-disbursement-hero{height:205px!important;border-radius:18px!important}
          #ks-disbursement-account .ks-premium-disbursement-visual img{animation-duration:18s!important}
        }
        @media(prefers-reduced-motion:reduce){
          #ks-disbursement-account .ks-premium-disbursement-visual img,
          #ks-disbursement-account .ks-premium-disbursement-hero::before,
          #ks-disbursement-account .ks-premium-disbursement-hero::after{animation:none!important}
        }
      `;
      d.head.appendChild(style);
      return true;
    };

    if (apply()) return;
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(d.body, {subtree:true, childList:true});
    d.defaultView?.setTimeout(() => observer.disconnect(), 10000);
  }

  frame.addEventListener('load', install);
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') install();
})();
