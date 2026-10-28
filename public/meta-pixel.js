/* ALGORA — Pixel de Meta (solo con permiso de cookies de publicidad).
   El ID sale de meta-config.js, que se genera al desplegar con la variable de entorno
   META_PIXEL_ID de Vercel (scripts/build-meta-config.js). Sin ID o sin permiso no se carga
   nada de Meta. Eventos:
     PageView     al cargar la pagina;
     ViewContent  en las paginas por giro (content_name: giro);
     Contact      al tocar un enlace de WhatsApp (content_name: pagina);
     Lead         al tocar "Prueba gratis / Crear mi cuenta" (content_name: pagina, content_category: giro). */
(function () {
  var GIROS = ['restaurantes', 'citas', 'clinicas', 'gimnasios', 'hoteles', 'tiendas', 'veterinarias', 'eventos', 'monedero'];
  var started = false;

  function page() { return (location.pathname.replace(/^\/+|\.html$|\/+$/g, '') || 'inicio'); }

  function consentOk() {
    try { var c = window.ALGORA_CONSENT && window.ALGORA_CONSENT.get(); return !!(c && c.ads === true); } catch (e) { return false; }
  }

  function boot() {
    var id = window.ALGORA_META && window.ALGORA_META.pixelId;
    if (started || !id || !/^\d{5,25}$/.test(id) || !consentOk()) return;
    started = true;
    /* Codigo base de Meta (equivalente al oficial, sin script en linea). */
    var f = window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
    if (!window._fbq) window._fbq = f;
    f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
    var s = document.createElement('script'); s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
    f('init', id);
    f('track', 'PageView');
    var p = page();
    if (GIROS.indexOf(p) >= 0) f('track', 'ViewContent', { content_name: p });
  }

  // Clics: WhatsApp (Contact) y registro (Lead). Solo cuentan si el pixel ya se cargo.
  document.addEventListener('click', function (e) {
    if (!started || !window.fbq) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.href || '';
    if (/(^|\/\/)(wa\.me|api\.whatsapp\.com)\//.test(href)) { window.fbq('track', 'Contact', { content_name: page() }); return; }
    try {
      var u = new URL(href);
      if (/(^|\.)algorapos\.com\.mx$/.test(u.hostname) && u.searchParams.get('registro') === '1') {
        window.fbq('track', 'Lead', { content_name: page(), content_category: u.searchParams.get('giro') || undefined });
      }
    } catch (err) { /* */ }
  }, true);

  window.addEventListener('algora-consent', boot);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
