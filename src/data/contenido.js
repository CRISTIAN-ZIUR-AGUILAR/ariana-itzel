// =============================================================================
//  CONFIGURACIÓN CENTRALIZADA - CUMPLEAÑOS DE ARIANA ITZEL ✨
//  Modifica aquí los textos, fechas, fotos y preguntas cuando lo desees.
// =============================================================================

export const configCumple = {
  // Información principal
  nombreElla: "Ariana Itzel",
  nombreEl: "Cristian",
  apodoCariñoso: "Mi reina hermosa",

  // Fecha para el contador de tiempo juntos (Año-Mes-DíaTHora:Min:Seg)
  // Configurado desde el domingo 4 de octubre de este año:
  fechaInicioJuntos: "2026-10-04T00:00:00",

  // Audio de fondo (debe estar en public/assets/cancion.mp3)
  musica: {
    archivo: "./assets/cancion.mp3",
    titulo: "No sé vivir si no es contigo",
  },

  // 1. INTRODUCCIÓN
  intro: {
    etiqueta: "Un detalle con mucho cariño",
    titulo: "Feliz Cumpleaños,",
    nombreDestacado: "Ariana Itzel ✨",
    mensajeInicial: "Aunque llevamos poco tiempo de conocernos, cada plática, cada risa y cada momento contigo se ha sentido muy especial. Quería prepararte este rincón interactivo para celebrar tu día.",
    botonAbrir: "Toca para abrir tu sorpresa 🎁",
  },

  // 2. MINI TRIVIA PERSONALIZADA (3 Preguntas)
  preguntasTrivia: [
    {
      id: 1,
      numero: "01",
      pregunta: "¿Dónde fue el lugar de nuestra primera cita?",
      opciones: [
        "En una plaza comercial viendo películas",
        "En un parque de tu pueblo, San Bartolo",
        "En una cafetería del centro",
      ],
      respuestaCorrecta: 1,
      mensajeExito: "¡Exacto! En el parque de tu pueblo, San Bartolo... donde empezó a escribirse lo más bonito de mi vida ❤️",
      icono: "MapPin",
    },
    {
      id: 2,
      numero: "02",
      pregunta: "¿Cuál es la canción que se convirtió en nuestra canción?",
      opciones: [
        "No sé vivir si no es contigo",
        "Cien años",
        "Motivos",
      ],
      respuestaCorrecta: 0,
      mensajeExito: "¡Nuestra canción! Y es que la verdad no sé vivir si no es contigo ✨🎶",
      icono: "Music",
    },
    {
      id: 3,
      numero: "03",
      pregunta: "¿Qué tipo de música nos gusta y tenemos pendiente bailar?",
      opciones: [
        "Salsa y bachata tradicional",
        "Música carnavalera / muertera",
        "Pop en inglés de los 80s",
      ],
      respuestaCorrecta: 1,
      mensajeExito: "¡Eso! La música carnavalera y muertera... ¡tenemos ese baile pendiente! 💃🕺",
      icono: "Sparkles",
    },
  ],

  // 3. RECUERDOS (CARRUSEL DE FOTOS & POLAROIDS)
  // Con tus fotos y video reales de public/assets/fotos/
  recuerdos: [
    {
      id: 1,
      foto: "./assets/fotos/1.jpeg",
      titulo: "El Primer 'Hola' 💬",
      subtitulo: "6 de septiembre",
      descripcion: "Ese primer mensaje que sin saberlo se convertiría en el inicio de algo tan bonito.",
      colorGradiente: "from-pink-500/30 via-rose-500/20 to-purple-600/30",
    },
    {
      id: 2,
      foto: "./assets/fotos/2.jpeg",
      titulo: "El Día que Nos Conocimos ✨",
      subtitulo: "Domingo, 4 de octubre",
      descripcion: "Verte por primera vez en persona y confirmar que tu sonrisa y tu vibra iluminan todo a su alrededor.",
      colorGradiente: "from-amber-500/30 via-rose-500/20 to-pink-600/30",
    },
    {
      id: 3,
      foto: "./assets/fotos/3.jpeg",
      titulo: "Primera Cita en San Bartolo 📍",
      subtitulo: "En el parque de tu pueblo",
      descripcion: "Caminar juntos, platicar por horas y descubrir que contigo cualquier rincón se vuelve especial.",
      colorGradiente: "from-indigo-500/30 via-purple-500/20 to-pink-600/30",
    },
    {
      id: 4,
      foto: "./assets/fotos/7.mp4",
      webm: "./assets/fotos/7.webm",
      poster: "./assets/fotos/7_poster.jpg",
      cancionFondo: "./assets/cuidare_de_ti.mp3",
      cancionTitulo: "Horacio Palencia - Cuidaré De Ti",
      tipo: "video",
      titulo: "Video de Nuestra Primera Cita 🎬✨",
      subtitulo: "Grabado en San Bartolo",
      descripcion: "Ese momento especial en video con 'Cuidaré de ti' de fondo... donde los nervios y las sonrisas lo decían todo.",
      colorGradiente: "from-amber-500/30 via-rose-500/20 to-red-600/30",
    },
    {
      id: 5,
      foto: "./assets/fotos/4.jpeg",
      titulo: "Mis Tocadas y Tus Abrazos 🎺❤️",
      subtitulo: "El mejor descanso",
      descripcion: "Ir a abrazarte en los ratitos libres de las tocadas. Acercarme a ti y sentirme tan querido como un niño chiquito.",
      colorGradiente: "from-rose-500/30 via-red-500/20 to-amber-600/30",
    },
    {
      id: 6,
      foto: "./assets/fotos/5.jpeg",
      titulo: "La Envidia de Mis Amigos 🙈✨",
      subtitulo: "Aguantando el frío por mí",
      descripcion: "Verte ahí apoyándome entre la gente aunque haga frío, y darte ese beso que deja a todos mis amigos con envidia.",
      colorGradiente: "from-fuchsia-500/30 via-pink-500/20 to-rose-600/30",
    },
    {
      id: 7,
      foto: "./assets/fotos/6.jpeg",
      titulo: "Risas y Momentos Juntos 🥰",
      subtitulo: "Cada instante cuenta",
      descripcion: "Disfrutar de tu compañía, de tus ocurrencias y de lo bonito que se siente estar a tu lado.",
      colorGradiente: "from-purple-500/30 via-rose-500/20 to-pink-600/30",
    },
    {
      id: 8,
      foto: "./assets/fotos/8.jpeg",
      titulo: "La Cumpleañera Más Linda 💖",
      subtitulo: "Celebrándote a ti",
      descripcion: "Gracias por existir, por tu ternura y por hacer que todo se sienta tan especial.",
      colorGradiente: "from-rose-500/30 via-pink-500/20 to-amber-600/30",
    },
  ],

  // 4. CARTA FINAL Y VALES
  carta: {
    remitente: "De Cristian para Ariana Itzel",
    fecha: "En tu cumpleaños",
    saludo: "Querida Ariana Itzel,",
    parrafos: [
      "Hoy es tu día y no quería dejar pasar tu cumpleaños sin prepararte un detalle diferente y hecho con mucho cariño.",
      "Sé que llevamos poco tiempo de conocernos, pero desde aquel 6 de septiembre con el primer 'hola' y ese domingo 4 de octubre que nos vimos en persona en San Bartolo, todo se ha sentido súper bonito y natural.",
      "Valoro muchísimo cada momento que pasamos juntos: esos ratitos en los descansos de las tocadas en los que voy corriendo a abrazarte, y la envidia que me tienen mis amigos cada vez que te beso frente a ellos. Pero sobre todo, lo especial que me siento cuando me acerco a ti cuando no ando tocando; contigo me siento tan querido, como niño chiquito. Y el que vayas a verme a mis tocadas, que me acompañes y que hasta te aguantes el frío con tal de estar ahí conmigo, no sabes cuánto me llega al corazón.",
      "Deseo de corazón que este nuevo año de vida te traiga muchísimas cosas buenas, metas cumplidas y momentos felices. Y ojalá sigamos coincidiendo en más salidas, tocadas (prometo siempre cuidarte del frío) y que pronto tengamos nuestra primera ida a la feria y ese baile pendiente para seguir conociéndonos mucho más.",
    ],
    despedida: "¡Muy feliz cumpleaños, Ari! Pásala increíble hoy y siempre.",
    firma: "Con mucho cariño, Cristian ✨",
  },

  // VALES TIPO "RASCA Y GANA"
  vales: [
    {
      id: "vale-baile",
      titulo: "Ir a un Baile o Concierto 💃🕺",
      etiqueta: "Vale de Aventura",
      descripcion: "Vale por ir a bailar o a un concierto a cantar y disfrutar con todo el ritmo a tu lado.",
      icono: "Music",
      color: "from-pink-500 to-rose-600",
      detalles: "¡Tú eliges el evento y la música, cero excusas!",
    },
    {
      id: "vale-mirador",
      titulo: "Mirador de la Guelaguetza & Velada 🌆✨",
      etiqueta: "Vale Romántico",
      descripcion: "Vale por subir al mirador de la Guelaguetza a ver el atardecer y las luces de la ciudad, seguido de una velada caminando por el centro.",
      icono: "Moon",
      color: "from-amber-400 to-rose-500",
      detalles: "Cafecito, pláticas bonitas y una vista increíble.",
    },
    {
      id: "vale-campamento",
      titulo: "Campamento en un Pueblo Mágico 🏕️🌲",
      etiqueta: "Vale Escapada",
      descripcion: "Vale por una escapada a acampar en algún Pueblo Mágico — Noche bajo las estrellas, fogata y desconectarnos de todo.",
      icono: "Tent",
      color: "from-emerald-500 to-teal-600",
      detalles: "Promesa de cero frío y una aventura inolvidable juntos.",
    },
    {
      id: "vale-restaurante",
      titulo: "Cena en un Restaurante 🍽️🍷",
      etiqueta: "Vale Especial",
      descripcion: "Vale por ir a comer al restaurante que más se te antoje — Comida rica, postrecito y consentirte al 100%.",
      icono: "Utensils",
      color: "from-purple-500 to-indigo-600",
      detalles: "Tú eliges el lugar y todo lo que quieras pedir.",
    },
  ],
};

