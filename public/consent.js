/* ALGORA — Aviso de cookies (informativo).
   Este sitio no usa cookies de rastreo, analitica ni publicidad. Solo se guarda en este
   navegador que ya viste el aviso (almacenamiento tecnico). Si en el futuro se agrega
   analitica, este aviso debe cambiar a "Aceptar / Rechazar" y cargarla solo si aceptan. */
(function () {
  var KEY = 'algora_cookie_notice_v1';
  try { if (localStorage.getItem(KEY)) return; } catch (e) { /* modo privado: mostrar */ }

  var css = '' +
    '.ckn{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;' +
    'background:rgba(13,12,11,.96);border:1px solid rgba(216,166,87,.35);border-radius:18px;padding:18px 20px;' +
    'box-shadow:0 20px 60px rgba(0,0,0,.6);color:#ECE8DF;font:400 14px/1.55 Inter,system-ui,sans-serif;' +
    'display:flex;gap:16px;align-items:center;flex-wrap:wrap;transform:translateY(20px);opacity:0;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .5s}' +
    '.ckn.on{transform:none;opacity:1}' +
    '.ckn p{flex:1 1 280px;margin:0;color:#c9c4b8}' +
    '.ckn b{color:#ECE8DF;font-weight:600}' +
    '.ckn a{color:#D8A657;text-decoration:underline;text-underline-offset:2px}' +
    '.ckn button{flex:none;cursor:pointer;border:1px solid #D8A657;background:#D8A657;color:#060606;font:600 14px Inter,system-ui,sans-serif;' +
    'padding:10px 22px;border-radius:999px;transition:background .2s}' +
    '.ckn button:hover{background:#e9c98f}' +
    '.ckn button:focus-visible{outline:2px solid #ECE8DF;outline-offset:2px}';

  function show() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement('div');
    box.className = 'ckn'; box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Aviso de cookies');
    box.innerHTML = '<p><b>Tu privacidad importa.</b> Este sitio no usa cookies de rastreo ni de publicidad; solo ' +
      'lo técnicamente necesario para funcionar. Los pagos se procesan de forma segura con Stripe. ' +
      'Consulta el <a href="https://www.algorapos.com.mx/cookies" target="_blank" rel="noopener">Aviso de cookies</a> y el ' +
      '<a href="https://www.algorapos.com.mx/privacidad" target="_blank" rel="noopener">Aviso de privacidad</a>.</p>' +
      '<button type="button">Entendido</button>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('on'); }); });
    box.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) { /* */ }
      box.classList.remove('on');
      setTimeout(function () { box.remove(); }, 500);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
