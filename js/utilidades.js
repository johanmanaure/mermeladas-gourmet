/* ==========================================================
   UTILIDADES: atajos que usan todos los demás archivos
   ========================================================== */

// Atajos para buscar elementos
const $  = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Da formato de pesos: 18000 -> $18.000
function dinero(numero) {
  return '$' + numero.toLocaleString('es-CO');
}

// Muestra un aviso breve abajo de la pantalla
function mostrarAviso(texto) {
  const aviso = $('#aviso');
  aviso.textContent = texto;
  aviso.classList.add('visible');
  setTimeout(() => aviso.classList.remove('visible'), 1800);
}
