/* ==========================================================
   JUEGO DEL DADO: tablero con cuadros tapados
   ========================================================== */

const CUADROS = 12;
const CARAS_DADO = '⚀⚁⚂⚃⚄⚅';

let premios = [];          // lo que esconde cada cuadro
let posicion = -1;         // cuadro donde está la ficha
let ocupado = false;       // true mientras el dado gira o la ficha se mueve

// Mezcla descuentos, datos curiosos y un cuadro vacío, en orden aleatorio
function crearPremios() {
  const lista = [
    ...DESCUENTOS.map((valor) => ({ tipo: 'descuento', valor })),
    ...DATOS_CURIOSOS.map((texto) => ({ tipo: 'dato', texto })),
    { tipo: 'vacio' },
  ];
  return lista.sort(() => Math.random() - 0.5);
}

function dibujarTablero() {
  premios = crearPremios();
  premios.forEach((_, i) => {
    const cuadro = document.createElement('div');
    cuadro.className = 'cuadro';
    cuadro.id = 'cuadro-' + i;
    cuadro.textContent = '?';
    $('#tablero').appendChild(cuadro);
  });
}

// Gira el dado ~0,8 segundos y luego mueve la ficha
function lanzarDado() {
  if (ocupado) return;
  ocupado = true;

  const dado = $('#dado');
  const boton = $('#boton-lanzar');
  dado.classList.add('girando');
  boton.disabled = true;

  const caras = setInterval(() => {
    dado.textContent = CARAS_DADO[Math.floor(Math.random() * 6)];
  }, 90);

  setTimeout(() => {
    clearInterval(caras);
    dado.classList.remove('girando');
    const resultado = 1 + Math.floor(Math.random() * 6);
    dado.textContent = CARAS_DADO[resultado - 1];
    moverFicha(resultado);
  }, 800);
}

// Mueve la ficha cuadro por cuadro y al final revela el premio
function moverFicha(pasos) {
  let dados = 0;
  const avance = setInterval(() => {
    if (posicion >= 0) $('#cuadro-' + posicion).classList.remove('activo');
    posicion = (posicion + 1) % CUADROS;
    $('#cuadro-' + posicion).classList.add('activo');

    if (++dados === pasos) {
      clearInterval(avance);
      revelarCuadro(posicion);
    }
  }, 260);
}

// Voltea el cuadro y muestra el descuento o dato curioso
function revelarCuadro(i) {
  const cuadro = $('#cuadro-' + i);
  const premio = premios[i];
  const mensaje = $('#mensaje-juego');

  if (cuadro.classList.contains('abierto')) {
    mensaje.innerHTML = 'Este cuadro ya estaba descubierto. Lanza otra vez.';
  } else {
    cuadro.classList.add('abierto');

    if (premio.tipo === 'descuento') {
      cuadro.classList.add('descuento');
      cuadro.textContent = premio.valor + '%';
      const mejoro = aplicarDescuento(premio.valor);
      mensaje.innerHTML = `<b>¡Descuento del ${premio.valor}%!</b><br>` +
        (mejoro ? 'Ya está aplicado en tu pedido.' : 'Tu mejor descuento sigue activo.');
    } else if (premio.tipo === 'dato') {
      cuadro.textContent = '💡';
      mensaje.innerHTML = '<b>Dato curioso</b><br>' + premio.texto;
    } else {
      cuadro.textContent = '🍓';
      mensaje.innerHTML = '<b>¡Sigue jugando!</b><br>Este cuadro no tenía premio.';
    }
  }

  ocupado = false;
  $('#boton-lanzar').disabled = false;
}

function iniciarJuego() {
  dibujarTablero();
  $('#boton-lanzar').onclick = lanzarDado;
}
