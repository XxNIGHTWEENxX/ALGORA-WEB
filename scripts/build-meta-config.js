// ===== ALGORA web — Configuracion de Meta al desplegar (Vercel) =====
// El sitio es estatico: el navegador no lee variables de entorno. Este paso corre en Vercel
// antes de publicar y escribe public/meta-config.js con el ID del pixel (META_PIXEL_ID) y,
// si existe, pone el valor de verificacion del dominio (META_DOMAIN_VERIFICATION) en la
// etiqueta de public/index.html. Sin variables deja el pixel apagado. Nunca hace fallar el
// despliegue.
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'public');
const pixel = String(process.env.META_PIXEL_ID || '').trim();
const verify = String(process.env.META_DOMAIN_VERIFICATION || '').trim();

try {
  const id = /^\d{5,25}$/.test(pixel) ? pixel : '';
  fs.writeFileSync(path.join(pub, 'meta-config.js'),
    '/* Generado al desplegar (scripts/build-meta-config.js). No editar. */\n' +
    `window.ALGORA_META = { pixelId: ${JSON.stringify(id)} };\n`);
  console.log(id ? 'meta-config: pixel configurado' : 'meta-config: sin META_PIXEL_ID, pixel apagado');
} catch (e) {
  console.log('meta-config: no se pudo escribir', e && e.message);
}

try {
  if (/^[a-z0-9]{10,80}$/i.test(verify)) {
    const f = path.join(pub, 'index.html');
    const html = fs.readFileSync(f, 'utf8');
    const out = html.replace('content="VALOR_QUE_COPIE_ALAN"', `content="${verify}"`);
    if (out !== html) { fs.writeFileSync(f, out); console.log('meta-config: verificacion de dominio puesta'); }
  }
} catch (e) {
  console.log('meta-config: no se pudo poner la verificacion', e && e.message);
}
