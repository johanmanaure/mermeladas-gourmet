/* ==========================================================
   PREGUNTAS FRECUENTES: acordeón
   ========================================================== */

function iniciarFaq() {
  $('#faq-lista').innerHTML = PREGUNTAS.map(([pregunta, respuesta]) => `
    <div class="pregunta">
      <button aria-expanded="false">${pregunta}</button>
      <div class="pregunta__respuesta"><p>${respuesta}</p></div>
    </div>`).join('');

  $$('.pregunta button').forEach((boton) => {
    boton.onclick = () => {
      const item = boton.parentNode;
      const abrir = !item.classList.contains('abierta');

      // Cierra todas y abre solo la elegida
      $$('.pregunta').forEach((p) => {
        p.classList.remove('abierta');
        p.querySelector('button').setAttribute('aria-expanded', false);
      });

      if (abrir) {
        item.classList.add('abierta');
        boton.setAttribute('aria-expanded', true);
      }
    };
  });
}
