/* ==========================================================
   ANIMACIONES: título, franja, scroll, contadores y mouse
   ========================================================== */

// Título de la portada: cada palabra cae con su propio retraso
function animarTitulo() {
  const lineas = ['Fruta colombiana,', 'en un frasco.'];

  $('#titulo').innerHTML = lineas.map((linea, j) =>
    linea.split(' ').map((palabra, i) =>
      `<span class="palabra" style="animation-delay:${(j * 2 + i) * 0.15}s">${palabra}</span>`
    ).join(' ')
  ).join('<br>');
}

// Franja que se desplaza sin parar (el contenido se repite 8 veces)
function dibujarFranja() {
  const bloque = '<span>🍈 Maracuyá</span><span>🍏 Lulo</span><span>🥭 Mango</span>';
  $('#franja-contenido').innerHTML = bloque.repeat(8);
}

// Cuenta de 0 hasta el número final
function contarHasta(elemento) {
  const meta = Number(elemento.dataset.numero);
  const salto = Math.max(1, Math.ceil(meta / 30));
  let valor = 0;

  const conteo = setInterval(() => {
    valor = Math.min(meta, valor + salto);
    elemento.textContent = valor;
    if (valor === meta) clearInterval(conteo);
  }, 40);
}

// Los elementos con clase "escalonado" hacen aparecer a sus hijos uno tras otro
function prepararEscalonado() {
  $$('.escalonado > *').forEach((hijo, i) => {
    hijo.classList.add('aparece');
    hijo.style.transitionDelay = (i % 6) * 0.09 + 's';
  });
}

// Muestra cada elemento ".aparece" cuando entra en pantalla
function revelarAlScroll() {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;

      entrada.target.classList.add('visible');
      const numero = entrada.target.querySelector('[data-numero]');
      if (numero) contarHasta(numero);

      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });

  $$('.aparece').forEach((el) => observador.observe(el));
}

// Barra de progreso arriba y relleno de la línea de tiempo
function seguirScroll() {
  addEventListener('scroll', () => {
    const maximo = document.documentElement.scrollHeight - innerHeight;
    $('#barra-progreso').style.width = (scrollY / maximo * 100) + '%';

    const caja = $('#linea-tiempo').getBoundingClientRect();
    const avance = (innerHeight * 0.7 - caja.top) / caja.height;
    $('#linea-tiempo').style.setProperty('--avance', Math.min(1, Math.max(0, avance)));
  }, { passive: true });
}

// Frascos de la portada se inclinan con el mouse y las tarjetas brillan
function seguirMouse() {
  $('#inicio').addEventListener('mousemove', (e) => {
    const frascos = $('#frascos-portada');
    frascos.style.setProperty('--mx', (e.clientX / innerWidth - 0.5) * 2);
    frascos.style.setProperty('--my', (e.clientY / innerHeight - 0.5) * 2);
  });

  $$('.tarjeta').forEach((tarjeta) => {
    tarjeta.addEventListener('mousemove', (e) => {
      const caja = tarjeta.getBoundingClientRect();
      tarjeta.style.setProperty('--x', e.clientX - caja.left + 'px');
      tarjeta.style.setProperty('--y', e.clientY - caja.top + 'px');
    });
  });
}

function iniciarAnimaciones() {
  animarTitulo();
  dibujarFranja();
  prepararEscalonado();
  revelarAlScroll();
  seguirScroll();
  seguirMouse();
}
