/* ALGORA — Etiquetas del anuncio hasta el registro (no usa cookies de publicidad).
   Si la visita llega con utm_* o fbclid, se guardan (primer toque, 30 dias) y se agregan a
   los enlaces de registro de algorapos.com.mx: asi la etiqueta del anuncio no se pierde al
   pasar de algora.com.mx a algorapos.com.mx. Las del anuncio reemplazan a las fijas del
   enlace (utm_source=algora_web...); el giro del enlace se respeta. */
(function () {
  var KEY = 'algora_web_attr_v1';
  var TTL = 30 * 86400000;
  var FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];

  function current() {
    var a = null;
    try { a = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { /* */ }
    if (a && Date.now() - a.at > TTL) { a = null; try { localStorage.removeItem(KEY); } catch (e) { /* */ } }
    if (a) return a;
    var sp = new URLSearchParams(location.search), b = { at: Date.now() }, any = false;
    FIELDS.forEach(function (f) { var v = sp.get(f); if (v && v.trim()) { b[f] = v.trim().slice(0, 200); any = true; } });
    if (!any) return null;
    try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) { /* */ }
    return b;
  }

  function decorate(a) {
    var links = document.querySelectorAll('a[href*="algorapos.com.mx"]');
    for (var i = 0; i < links.length; i++) {
      try {
        var u = new URL(links[i].href);
        if (!/(^|\.)algorapos\.com\.mx$/.test(u.hostname)) continue;
        if (u.pathname !== '/' || u.searchParams.get('registro') !== '1') continue;
        FIELDS.forEach(function (f) { if (a[f]) u.searchParams.set(f, a[f]); });
        links[i].href = u.toString();
      } catch (e) { /* enlace raro: se deja igual */ }
    }
  }

  var a = current();
  if (!a) return;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { decorate(a); }); else decorate(a);
})();
