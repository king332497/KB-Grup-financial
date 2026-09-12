(() => {
  'use strict';
  const frame = document.getElementById('app');
  if (!frame) return;
  const VERSION = 'kbstar-mobile-premium-v1-20260912';
  let cssPromise = null;

  function getCss() {
    if (!cssPromise) {
      const url = new URL('mobile-kbstar-premium.css?v=' + VERSION, document.baseURI).href;
      cssPromise = fetch(url, {cache:'no-store'}).then(r => {
        if (!r.ok) throw new Error('mobile CSS ' + r.status);
        return r.text();
      });
    }
    return cssPromise;
  }

  async function install() {
    let d;
    try { d = frame.contentDocument; } catch { return; }
    if (!d?.head || !d.documentElement) return;
    d.documentElement.setAttribute('data-kb-mobile-premium','1');
    let style = d.getElementById('kb-mobile-kbstar-premium-style');
    if (!style) {
      style = d.createElement('style');
      style.id = 'kb-mobile-kbstar-premium-style';
      style.dataset.version = VERSION;
      d.head.appendChild(style);
    }
    try {
      style.textContent = await getCss();
    } catch (err) {
      console.warn('KBstar mobile premium CSS failed:', err);
    }
  }

  frame.addEventListener('load', install);
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') install();
})();