/* ALGORA — Aviso de cookies con decision ("Aceptar" / "Solo necesarias").
   Publicidad y medicion (pixel de Meta) va APAGADA por defecto: solo se activa si la persona
   pulsa "Aceptar". La decision se guarda en localStorage (algora_consent_v2) y en la cookie
   propia algora_consent. algora.com.mx y algorapos.com.mx son dominios distintos: cada uno
   pide su decision. "Preferencias de cookies" (al pie de cada pagina) permite cambiarla.
   Este archivo tambien carga, en todas las paginas que lo usan:
     - attr-links.js: lleva las etiquetas del anuncio (utm_*, fbclid) a los enlaces de registro;
     - meta-config.js y meta-pixel.js: el pixel, que solo se carga si aceptaron. */
(function () {
  var KEY = 'algora_consent_v2';
  var EVT = 'algora-consent';

  function read() {
    try { var c = JSON.parse(localStorage.getItem(KEY) || 'null'); return c && typeof c.ads === 'boolean' ? c : null; } catch (e) { return null; }
  }
  function save(ads) {
    var c = { ads: !!ads, at: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* modo privado */ }
    try { document.cookie = 'algora_consent=' + (ads ? 'ads' : 'necessary') + '; Max-Age=' + (180 * 86400) + '; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); } catch (e) { /* */ }
    try { window.dispatchEvent(new CustomEvent(EVT, { detail: c })); } catch (e) { /* */ }
    return c;
  }
  window.ALGORA_CONSENT = { get: read, set: save, open: function () { show(true); } };

  var css = '' +
    '.ckn{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:600px;margin:0 auto;' +
    'background:rgba(13,12,11,.96);border:1px solid rgba(216,166,87,.35);border-radius:18px;padding:18px 20px;' +
    'box-shadow:0 20px 60px rgba(0,0,0,.6);color:#ECE8DF;font:400 14px/1.55 Inter,system-ui,sans-serif;' +
    'transform:translateY(20px);opacity:0;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .5s}' +
    '.ckn.on{transform:none;opacity:1}' +
    '.ckn p{margin:0;color:#c9c4b8}' +
    '.ckn b{color:#ECE8DF;font-weight:600}' +
    '.ckn a{color:#D8A657;text-decoration:underline;text-underline-offset:2px}' +
    '.ckn .row{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px}' +
    '.ckn button{cursor:pointer;min-height:44px;font:600 14px Inter,system-ui,sans-serif;padding:10px 20px;border-radius:999px;transition:background .2s}' +
    '.ckn .yes{border:1px solid #D8A657;background:#D8A657;color:#060606}' +
    '.ckn .yes:hover{background:#e9c98f}' +
    '.ckn .no{border:1px solid rgba(255,255,255,.3);background:transparent;color:#ECE8DF}' +
    '.ckn .no:hover{background:rgba(255,255,255,.08)}' +
    '.ckn button:focus-visible{outline:2px solid #ECE8DF;outline-offset:2px}' +
    '.ckn-pref{background:none;border:none;color:inherit;opacity:.75;text-decoration:underline;cursor:pointer;font:inherit;padding:0}';
  var styled = false;

  function show(force) {
    if (!force && read()) return;
    if (document.querySelector('.ckn')) return;
    if (!styled) { var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); styled = true; }
    var box = document.createElement('div');
    box.className = 'ckn'; box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Aviso de cookies');
    box.innerHTML = '<p><b>Tu privacidad importa.</b> Usamos lo técnicamente necesario para que el sitio funcione. ' +
      'Con tu permiso, también usamos cookies de <b>publicidad y medición (Meta)</b> para saber si llegaste por un anuncio. ' +
      'Puedes cambiarlo cuando quieras en "Preferencias de cookies". ' +
      '<a href="https://www.algorapos.com.mx/cookies" target="_blank" rel="noopener">Aviso de cookies</a> · ' +
      '<a href="https://www.algorapos.com.mx/privacidad" target="_blank" rel="noopener">Aviso de privacidad</a></p>' +
      '<div class="row"><button type="button" class="no">Solo necesarias</button><button type="button" class="yes">Aceptar</button></div>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('on'); }); });
    function close(ads) {
      var before = (read() || {}).ads === true;
      save(ads);
      box.classList.remove('on');
      setTimeout(function () { box.remove(); }, 500);
      // Retiro el permiso con el pixel ya cargado: se recarga para que no quede nada de Meta.
      if (before && !ads) setTimeout(function () { location.reload(); }, 300);
    }
    box.querySelector('.yes').addEventListener('click', function () { close(true); });
    box.querySelector('.no').addEventListener('click', function () { close(false); });
  }

  // Enlace "Preferencias de cookies" al pie de la pagina.
  function footerLink() {
    var f = document.querySelector('footer');
    if (!f || f.querySelector('.ckn-pref')) return;
    var p = document.createElement('p');
    p.style.cssText = 'margin:12px 0 0;text-align:center;font-size:12px';
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'ckn-pref'; b.textContent = 'Preferencias de cookies';
    b.addEventListener('click', function () { show(true); });
    p.appendChild(b);
    f.appendChild(p);
  }

  function load(src) { var s = document.createElement('script'); s.src = src; s.async = false; document.head.appendChild(s); }

  function start() {
    if (!styled) { var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); styled = true; }
    footerLink();
    load('/attr-links.js');
    load('/meta-config.js');
    load('/meta-pixel.js');
    show(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
