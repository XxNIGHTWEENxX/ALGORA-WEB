# Plan: agregar el plan POS + Restaurante ($1,049) al sitio algora.com.mx

ALGORA · octubre 2026 · Plan escrito en Cowork para que Claude Code lo implemente.

## Objetivo

El plan **POS + Restaurante** ya existe en la app y en los materiales de venta (PDF y mensajes). En la web no aparece, así que un cliente que lee el PDF y entra a la página no lo encuentra. Hay que mostrarlo en la página de restaurantes y en la tabla general de precios, con su botón de registro.

## Contexto (ya existe, no hay que crearlo)

- **App (algora-pos):** `src/app/api/billing/route.ts` ya tiene `BUNDLE_RES = { monthly: 1049, annual: 10490 }` y el producto `pos_res`: una licencia POS en tier `full` que con la misma suscripción activa el módulo Restaurante completo (lo hace el webhook). `SubscriptionScreen.tsx` y `LicenseGate.tsx` ya lo ofrecen.
- **Sitio:** `public/eventos.html` ya muestra una tarjeta "POS + Restaurante $1,049". Úsala como referencia del marcado.
- **Materiales de venta ya actualizados** (`AGORA/Ventas_Directas/`). La web debe decir lo mismo:
  - **Restaurante Lite, $799:** punto de venta, mesas, cuentas y comensales, dividir y cobrar, corte de caja.
  - **POS + Restaurante, $1,049 (anual $10,490):** punto de venta completo, inventario y facturación CFDI 4.0, mesas, cuentas y comensales, cocina, barra, recetas e insumos, Aura con IA.
  - **Suite Restaurante, $1,649 (anual $16,490):** todo lo de POS + Restaurante, más pedidos por QR en la mesa, eventos con venta de boletos y acceso con QR, tienda y menú en línea, y agenda y reservaciones con anticipo.

## Reglas

- Sin emojis.
- Respeta el estilo, las clases y las animaciones actuales (`rv`, `tilt`, `--d`); no inventes componentes nuevos.
- No toques el resto de las páginas ni el `index.html` fuera de la sección de precios.

## Cambios

### 1. `public/restaurantes.html`, sección `#plan`

1. Cambia el contenedor a tres tarjetas: `<div class="plans few" style="--n:3">`.
2. Inserta la tarjeta nueva entre "Restaurante Lite" y "Suite Restaurante". Reajusta los `--d` a 0.00s, 0.08s y 0.16s.

```html
<div class="rv" style="--d:0.08s"><div class="plan tilt"><h4>POS + Restaurante</h4><div class="pr">$1,049<small> /mes</small></div><ul><li>POS completo con inventario y facturación</li><li>Mesas, cuentas y comensales</li><li>Cocina, barra, recetas e insumos</li><li>Aura con IA</li></ul><a class="btn ghost" href="https://algorapos.com.mx/?registro=1&amp;giro=restaurante&amp;utm_source=algora_web&amp;utm_medium=landing_restaurante_plan_pos_res&amp;utm_campaign=reel_restaurante&amp;plan=pos_res">Empezar 14 días gratis</a></div></div>
```

3. Cambia la lista de "Suite Restaurante" para que no repita y quede igual que el PDF:

```html
<ul><li>Todo lo de POS + Restaurante</li><li>Pedidos por QR en la mesa</li><li>Eventos y boletos con QR</li><li>Tienda y menú en línea</li><li>Agenda y reservaciones con anticipo</li></ul>
```

4. Revisa que `.plans.few` con `--n:3` quede centrado en escritorio y en una sola columna abajo de 860 px. Ya existe esa regla; solo confírmala.
5. En `plans-note` agrega el pago anual: "Precios en MXN, IVA incluido. Pago anual: POS + Restaurante $10,490 y Suite $16,490." Deja el enlace "Ver todos los planes".

### 2. `public/index.html`, sección `#precios`

1. Agrega una sexta tarjeta, **POS + tu giro, $1,049 /mes**, entre "ALGORA Todo" y "Suite por giro". Texto: "POS completo + tu módulo: restaurante, gimnasio, hotel, clínica o veterinaria. Sin tienda ni agenda."
   - Botón "Empezar gratis" con `utm_medium=precio_pos_giro&plan=pos_giro`.
   - La app ya tiene los productos `pos_res`, `pos_gym`, `pos_hotel`, `pos_clinic` y `pos_vet` a $1,049.
2. Con seis tarjetas, cambia `.plans` en escritorio de `repeat(5,1fr)` a `repeat(3,1fr)`, para que queden dos filas de tres. Deja igual los cortes de 1100, 860 y 520 px.
3. En la nota de precios, agrega "POS + giro" a la lista de planes que traen 2 meses gratis en pago anual.

### 3. `public/pos.html`, sección `#entrada` (tiers)

1. Agrega el tier **POS + tu giro, $1,049 /mes** entre "Todo" y "Suite por giro". Descripción: "POS completo + tu módulo especializado, sin tienda ni agenda."
2. Ajusta `.tiers` a `repeat(5,1fr)` en escritorio y `repeat(3,1fr)` abajo de 1100 px. Si cinco columnas quedan apretadas, usa `repeat(3,1fr)` desde escritorio. Lo que importa es que no se corte el precio.

### 4. Verificación en la app (algora-pos)

Hazla antes de dar por terminado; es solo revisión, sin cambiar código.

1. **Pedido por QR con `pos_res` sin licencia Web.** El interruptor "Pedido por QR en la mesa" vive en Tienda Online > Configuración (`StoreConfigPanel`), que se habilita con la licencia de tienda (`canUseStore`). El menú público `/r/[token]` usa `/api/store/[businessId]/products`.
   - Confirma si un negocio con `pos_res`, sin licencia Web, puede activar y usar el pedido por QR.
   - Reporta el resultado a Alan. **No cambies el gating sin su decisión.**
   - Por ahora el material comercial pone el QR solo en la Suite.
2. **Parámetro `plan` del registro (ver `REGISTRO_DIRECTO_PLAN.md`).** Si ya se implementó, agrega los valores `pos_res` y `pos_giro`. Con `pos_giro` y el `giro` del registro, la pantalla de Suscripción resalta el producto correspondiente (`pos_res`, `pos_gym`, `pos_hotel`, `pos_clinic`, `pos_vet`). Si no se ha implementado, solo deja anotados los dos valores nuevos en ese plan.

### 5. Revisión final y despliegue

1. Abre `restaurantes.html`, `index.html` y `pos.html` a 1440, 768 y 375 px. Las tarjetas no deben encimarse ni cortar el precio.
2. Comprueba que los botones nuevos abran `algorapos.com.mx/?registro=1...` con el `plan` y el `utm_medium` correctos.
3. Revisa que los precios coincidan en las tres páginas y con `billing/route.ts`: $799, $1,049, $1,199 y $1,649 al mes; anual $10,490 y $16,490.
4. Actualiza el mensaje de commit en `algora-web/git-push.bat`: una sola línea, con saltos de línea CRLF. Por ejemplo: `Sitio: plan POS + Restaurante 1049 en restaurantes, precios y POS`. Alan corre el `.bat`.

### 6. Coherencia con `public/eventos.html`

`eventos.html` ya muestra POS + Restaurante y Suite Restaurante. Revisa que sus listas no contradigan las de `restaurantes.html`: los eventos y boletos con QR deben aparecer en la Suite. Si `eventos.html` también los pone en POS + Restaurante, no lo cambies; solo repórtamelo para decidir.

## Fuera de alcance (solo si Alan lo pide)

- Las mismas tarjetas $1,049 en `clinicas.html` (POS + Clínica), `gimnasios.html` (POS + Gimnasio) y `hoteles.html` (POS + Hotel).
