// Textos del diseño principal según la ocasión.
// 'siempre' es la página de todos los días; 'cumple' es la edición del 13 de octubre (se revive desde Momentos).

const SHARED_WORLD = [
  'El fulgor ámbar de criaturas de ojos felinos, frutos dulces que guardan verano bajo la piel, notas que desgarran el silencio entre guitarras y metales, y melodías que sólo tú sabrías reconocer aun con los ojos cerrados.',
  'También habitan aquí ciertas historias nacidas entre la oscuridad de Tokio, flores que parecen conocer secretos que nunca se pronuncian y pequeños rastros de esa ternura tuya que, incluso entre lo sombrío, insiste en permanecer intacta.',
];

export const OCCASIONS = {
  siempre: {
    initialTrack: 'maldita',
    celebrateOnStart: false,
    showBirthdayCard: false,
    showMoments: true,
    landing: {
      topline: ['† ARCHIVO SENTIMENTAL', 'MMXXVI †'],
      pill: '† PARA RATITA // MI REINA ✟',
      titleLead: 'Para',
      titleName: 'Ratita',
      subtitle: 'Canciones que desgarran, flores oscuras, criaturas en sombras y los momentos que nos vamos guardando. Tu universo, escondido en un rincón de la noche.',
      entryLabel: 'Abrir el rincón de Ratita',
      entryHint: 'Entrar al universo †',
    },
    header: { tag: '✟ Mi Reina', subtext: 'Un rincón de Tibo' },
    gallery: {
      kicker: 'Colección · 01—09',
      subtitle: 'Nueve fragmentos interactivos. Algunos se muestran; otros esperan ser recordados.',
    },
    intro: {
      badge: 'Para Ratita · Para leer despacio',
      title: <>Hay universos que<br />merecen ser <em>guardados.</em></>,
      paragraphs: [
        { text: 'Ratita, entre estas sombras he dejado escondidos pequeños fragmentos de tu mundo.' },
        ...SHARED_WORLD.map((text) => ({ text })),
        { text: 'Nada en este rincón está aquí por accidente.', className: 'intro-accent-paragraph' },
        { text: 'Cada detalle guarda una pista, un recuerdo o una pequeña parte de ti.' },
        { text: 'Y cuando quieras volver a vivir algo, busca los Momentos: ahí guardo las noches que no quiero que se pierdan.', className: 'intro-whisper' },
        { text: 'Porque hay noches que merecen quedarse para siempre.', className: 'intro-closing-phrase' },
      ],
    },
    note: {
      kicker: 'UNA CERTEZA PARA GUARDAR',
      quotes: ['“Estoy seguro que puedes entrar a estudiar música en Bellas Artes, confía en ti.”'],
      sign: '— Tibo',
    },
    footer: {
      kicker: 'SIN CENSURA · SIN FILTROS · HECHO A MANO',
      signature: <>Hecho para <strong>Ratita</strong><br />con todo el cariño de <strong>Tibo</strong>.</>,
      stamp: <>LOVE<br />NOISE</>,
    },
  },

  cumple: {
    initialTrack: 'loveofmylife',
    celebrateOnStart: true,
    showBirthdayCard: true,
    showMoments: false,
    landing: {
      topline: ['† 13.10 · ISSUE MMXXVI · UNHOLY ROMANCE', 'SIN CENSURA †'],
      pill: '† PUNK PROMISE // PARA MI PROMETIDA & REINA ✟',
      titleLead: '¡Feliz Cumpleaños,',
      titleName: 'Ratita!',
      subtitle: 'Guitarras desgarradoras, flores oscuras, criaturas en sombras y un pacto de amor eterno. Hoy celebramos tu vida y el primer cumpleaños como prometidos.',
      entryLabel: 'Abrir el ritual de celebración de Ratita',
      entryHint: 'Entrar al ritual nocturno †',
    },
    header: { tag: '✟ Prometida', subtext: '13.10 // Ritual de Cumpleaños' },
    gallery: {
      kicker: 'Colección Especial · 01—10',
      subtitle: 'Diez fragmentos interactivos. Celebrando tu cumpleaños número especial y el comienzo de nuestro para siempre.',
    },
    intro: {
      badge: '13 de Octubre · Edición Prometida',
      title: <>Hay universos que<br />merecen ser <em>celebrados.</em></>,
      paragraphs: [
        {
          className: 'intro-birthday-callout',
          text: <><strong>¡Feliz Cumpleaños, mi amada Ratita!</strong> Hoy es 13 de octubre, y entre todas las fechas posibles, esta es la más sagrada para mí: el día en que nació la mujer que ilumina mi vida entera, y que ahora tengo el honor inmenso de llamar <strong>mi prometida</strong>.</>,
        },
        { text: 'Ratita, entre estas sombras he dejado escondidos pequeños fragmentos de tu mundo.' },
        ...SHARED_WORLD.map((text) => ({ text })),
        { text: "Hoy no solo celebro tu vida: celebro nuestro 'sí' y la promesa de caminar juntos hasta el último amanecer.", className: 'intro-accent-paragraph' },
        { text: 'Cada detalle guarda una pista, un recuerdo, una melodía y un pedazo de mi alma dedicado a ti.' },
        { text: 'Pide un deseo frente al pastel, escucha nuestra música y disfruta tu rincón...', className: 'intro-whisper' },
        { text: 'Porque todo lo hermoso que existe en este lugar fue hecho para hacerte sonreír.', className: 'intro-closing-phrase' },
      ],
    },
    note: {
      kicker: 'DOS CERTEZAS PARA GUARDAR',
      quotes: [
        '“Estoy seguro que puedes entrar a estudiar música en Bellas Artes, confía en ti.”',
        '“Y tengo la certeza más hermosa de todas: eres el amor de mi vida, mi mejor decisión y la prometida más increíble del mundo.”',
      ],
      sign: '— Tibo, tu prometido',
    },
    footer: {
      kicker: '13 DE OCTUBRE · CUMPLEAÑOS & COMPROMISO',
      signature: <>Hecho para <strong>Ratita</strong>, mi Reina y Futura Esposa<br />con todo el amor infinito de <strong>Tibo</strong>.</>,
      stamp: <>FOREVER<br />NOISE</>,
    },
  },
};
