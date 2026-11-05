/* ==========================================================
   PEDIDO: carrito, descuento y envío por WhatsApp
   ========================================================== */

// Cantidad de frascos de cada sabor
const carrito = { maracuya: 0, lulo: 0, mango: 0 };

// Descuento ganado en el juego (porcentaje)
let descuento = 0;

// Agrega un frasco (lo usa el botón de la historia)
function agregarAlPedido(sabor) {
  carrito[sabor]++;
  dibujarPedido();
  mostrarAviso('1 frasco de ' + SABORES[sabor].nombre + ' agregado');
}

// Guarda un descuento si es mejor que el actual. Devuelve true si cambió.
function aplicarDescuento(porcentaje) {
  if (porcentaje <= descuento) return false;
  descuento = porcentaje;
  dibujarPedido();
  return true;
}

// Calcula subtotal, descuento y total
function calcularTotales() {
  const frascos = Object.values(carrito).reduce((suma, n) => suma + n, 0);
  const subtotal = frascos * PRECIO;
  const rebaja = Math.round(subtotal * descuento / 100);
  return { frascos, subtotal, rebaja, total: subtotal - rebaja };
}

// Dibuja filas, resumen, campo de nombre y botón
function dibujarPedido() {
  const { frascos, subtotal, rebaja, total } = calcularTotales();
  const nombreGuardado = ($('#nombre') || {}).value || '';

  const filas = Object.keys(SABORES).map((k) => `
    <div class="pedido__fila" style="--color:${SABORES[k].color}">
      <i></i>
      <b>${SABORES[k].nombre}</b>
      <div class="cantidad">
        <button data-sabor="${k}" data-cambio="-1" aria-label="Quitar ${SABORES[k].nombre}">−</button>
        <span>${carrito[k]}</span>
        <button data-sabor="${k}" data-cambio="1" aria-label="Agregar ${SABORES[k].nombre}">+</button>
      </div>
    </div>`).join('');

  const lineaDescuento = descuento
    ? `<div><span>Descuento del juego (${descuento}%)</span><span>−${dinero(rebaja)}</span></div>`
    : '';

  $('#pedido-contenido').innerHTML = `
    ${filas}
    <div class="resumen">
      <div><span>Subtotal (${frascos} frascos)</span><span>${dinero(subtotal)}</span></div>
      ${lineaDescuento}
      <div class="total"><span>Total</span><span>${dinero(total)}</span></div>
    </div>
    <input id="nombre" placeholder="Tu nombre" aria-label="Tu nombre" value="${nombreGuardado}">
    <button class="boton-whatsapp" id="enviar" ${frascos ? '' : 'disabled'}>
      ${frascos ? 'Enviar pedido por WhatsApp' : 'Agrega al menos un frasco'}
    </button>`;

  // Botones − y +
  $$('.cantidad button').forEach((boton) => {
    boton.onclick = () => {
      const k = boton.dataset.sabor;
      carrito[k] = Math.max(0, carrito[k] + Number(boton.dataset.cambio));
      dibujarPedido();
    };
  });

  $('#enviar').onclick = enviarPorWhatsApp;
}

// Arma el mensaje y abre WhatsApp
function enviarPorWhatsApp() {
  const { total } = calcularTotales();

  const lineas = Object.keys(SABORES)
    .filter((k) => carrito[k] > 0)
    .map((k) => `• ${carrito[k]} x ${SABORES[k].nombre}`)
    .join('\n');

  const mensaje =
    'Hola, quiero hacer un pedido de Mermeladas Gourmet:\n' +
    lineas + '\n' +
    (descuento ? `Descuento del juego: ${descuento}%\n` : '') +
    `Total: ${dinero(total)}\n` +
    `Nombre: ${$('#nombre').value || '(sin nombre)'}`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`, '_blank');
}
