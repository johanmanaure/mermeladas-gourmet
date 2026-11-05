/* ==========================================================
   VISOR: abre el frasco con vuelta + información
   ========================================================== */

let temporizadorVisor = null;   // espera antes de abrir al pasar el mouse
let bloqueoVisor = 0;           // evita que se reabra justo después de cerrar
let origenVisor = null;         // frasco que abrió el visor

const tieneMouse = () => matchMedia('(hover: hover)').matches;

function abrirVisor(sabor, origen) {
  const visor = $('#visor');
  if (visor.classList.contains('abierto')) return;

  const s = SABORES[sabor];
  origenVisor = origen;

  // Lado izquierdo: foto o frasco dibujado
  $('#visor-imagen').innerHTML = imagenFrasco(sabor, 240, 440);
  visor.style.setProperty('--acento', s.color);

  // Lado derecho: información (--i es el orden de entrada)
  $('#visor-info').innerHTML = `
    <h3 id="visor-titulo" class="paso" style="--i:0">${s.nombre}</h3>
    <p class="visor__lema paso" style="--i:1">${s.titulo}</p>
    <p class="paso" style="--i:2">${s.historia[0]}</p>
    <ul class="visor__datos paso" style="--i:3">
      <li><b>Peso</b> ${s.peso}</li>
      <li><b>Ingredientes</b> ${s.ingredientes}</li>
    </ul>
    <div class="notas paso" style="--i:4">${s.notas.map((n) => `<i>${n}</i>`).join('')}</div>
    <p class="visor__precio paso" style="--i:5">${dinero(PRECIO)}</p>
    <div class="visor__botones paso" style="--i:6">
      <button class="boton" id="visor-agregar">Agregar al pedido</button>
      <button class="boton boton--borde" id="visor-volver">Volver</button>
    </div>`;

  $('#visor-agregar').onclick = () => agregarAlPedido(sabor);
  $('#visor-volver').onclick = cerrarVisor;

  document.body.style.overflow = 'hidden';
  visor.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    visor.classList.add('abierto');
    $('#visor-volver').focus({ preventScroll: true });
  });
}

function cerrarVisor() {
  const visor = $('#visor');
  if (!visor.classList.contains('abierto')) return;

  visor.classList.remove('abierto');
  visor.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  bloqueoVisor = Date.now() + 800;
  if (origenVisor) origenVisor.focus({ preventScroll: true });
}

function iniciarVisor() {
  const frascos = $('#frascos-portada');

  // Clic o toque (celular) y teclado (Enter / espacio)
  frascos.addEventListener('click', (e) => {
    const f = e.target.closest('.flotante');
    if (f) abrirVisor(f.dataset.sabor, f);
  });

  frascos.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const f = e.target.closest('.flotante');
    if (f) { e.preventDefault(); abrirVisor(f.dataset.sabor, f); }
  });

  // Mouse encima (solo en dispositivos con mouse)
  frascos.addEventListener('mouseover', (e) => {
    if (!tieneMouse()) return;
    const f = e.target.closest('.flotante');
    if (!f || f.contains(e.relatedTarget)) return;

    clearTimeout(temporizadorVisor);
    temporizadorVisor = setTimeout(() => {
      if (Date.now() > bloqueoVisor) abrirVisor(f.dataset.sabor, f);
    }, 200);
  });

  frascos.addEventListener('mouseout', (e) => {
    const f = e.target.closest('.flotante');
    if (f && !f.contains(e.relatedTarget)) clearTimeout(temporizadorVisor);
  });

  // Cerrar: clic fuera del contenido o tecla Esc
  $('#visor').addEventListener('click', (e) => {
    if (e.target.id === 'visor') cerrarVisor();
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarVisor();
  });
}