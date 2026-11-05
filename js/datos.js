/* ==========================================================
   DATOS: lo que normalmente vas a editar
   ========================================================== */

// Tu número de WhatsApp con indicativo de país, sin + ni espacios
const WHATSAPP = '573000000000';

// Precio de cada frasco (en pesos)
const PRECIO = 18000;

// Fotos de los frascos (PNG con fondo transparente, en assets/img/).
// Si una foto no existe, se dibuja un frasco con CSS.
const FOTOS = {
  maracuya: 'assets/img/maracuya.png',
  lulo:     'assets/img/lulo.png',
  mango:    'assets/img/mango.png',
};

// Sabores: nombre, color, historia, notas y ficha de cada uno.
// "peso" e "ingredientes" salen en el visor (frasco que da la vuelta).
// Los valores de peso e ingredientes son de ejemplo: cámbialos por los reales.
const SABORES = {
  maracuya: {
    nombre: 'Maracuyá',
    color: '#F2B705',
    titulo: 'Una flor que cuenta una historia',
    historia: [
      'Los misioneros españoles vieron en su flor los símbolos de la Pasión de Cristo. De ahí viene el nombre «passion fruit».',
      'La cosechamos cuando la cáscara se arruga: ahí la pulpa está más dulce y aromática.',
    ],
    notas: ['Ácida', 'Aromática', 'Con yogur'],
    peso: '250 g',
    ingredientes: 'Pulpa de maracuyá, azúcar, jugo de limón',
  },
  lulo: {
    nombre: 'Lulo',
    color: '#8DBB2F',
    titulo: 'El tesoro de los Andes',
    historia: [
      'El lulo, o naranjilla, crece en laderas frescas y nubladas. Es pariente del tomate, aunque sabe a piña con fresa ácida.',
      'Lo pelamos a mano y cocinamos su pulpa verde para guardar ese golpe de frescura.',
    ],
    notas: ['Cítrica', 'Fresca', 'Con queso crema'],
    peso: '250 g',
    ingredientes: 'Pulpa de lulo, azúcar, jugo de limón',
  },
  mango: {
    nombre: 'Mango',
    color: '#FF8A1F',
    titulo: 'Sol dentro del frasco',
    historia: [
      'Un mango madura bajo el calor del valle durante meses. Esperamos a que huela a miel antes de cortarlo.',
      'Lo cocinamos a fuego lento, con trozos pequeños, para que sepa a fruta recién abierta.',
    ],
    notas: ['Dulce', 'Tropical', 'Con pan tostado'],
    peso: '250 g',
    ingredientes: 'Mango en trozos, azúcar, jugo de limón',
  },
};

// Datos curiosos que salen en el juego del dado
const DATOS_CURIOSOS = [
  'La flor de la maracuyá inspiró su nombre en inglés: «passion fruit».',
  'El lulo es pariente del tomate y de la berenjena.',
  'El mango pertenece a la misma familia botánica que el marañón.',
  'La mermelada cuaja gracias a la pectina de la fruta, el azúcar y un poco de acidez.',
  'La cáscara del lulo está cubierta de pelusa fina que se retira antes de usarla.',
  'Un árbol de mango puede dar fruta por más de cien años.',
];

// Descuentos escondidos en el tablero (porcentajes)
const DESCUENTOS = [5, 5, 10, 10, 15];

// Preguntas frecuentes: [pregunta, respuesta]
const PREGUNTAS = [
  ['¿Cómo hago el pedido?', 'Eliges tus frascos, escribes tu nombre y pulsas el botón verde. Se abre WhatsApp con tu pedido ya escrito.'],
  ['¿Cuánto cuesta cada frasco?', 'En esta vista previa cada frasco cuesta $18.000. Puedes cambiar el precio en js/datos.js.'],
  ['¿Cómo funciona el descuento del juego?', 'Si el dado cae en un cuadro con descuento, se aplica al total de tu pedido. Solo cuenta el mejor que ganes.'],
  ['¿Hay más sabores?', 'Por ahora son tres: maracuyá, lulo y mango. Pronto habrá lotes de temporada.'],
];