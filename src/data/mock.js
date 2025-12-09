export const datosEcologicos = {
  menuItems: [
    { id: 'inicio', nombre: 'Inicio' },
    { id: 'video', nombre: 'Video' },
    { id: 'impacto', nombre: 'Impacto' },
    { id: 'qr', nombre: 'QR' }
  ],

  // Imagen de fondo personalizada del usuario
  imagenHero: '/assets/itq_fond.jpg',

  problemaPlasticos: {
    descripcion: 'Los plásticos representan una de las mayores amenazas ambientales de nuestro tiempo. Su producción masiva y mal manejo están causando daños irreversibles.',
    puntos: [
      'Tardan cientos de años en degradarse',
      'Contaminan océanos y ecosistemas',
      'Afectan la vida marina y terrestre',
      'Liberan microplásticos tóxicos'
    ],
    imagen: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },

  primerVideo: {
    url: 'https://www.youtube.com/embed/glsODVQm3A4',  // Video actualizado del usuario
    titulo: 'El impacto de los plásticos'
  },

  impactoAmbiental: {
    descripcion: 'El impacto ambiental de los plásticos es devastador. Cada año, millones de toneladas de residuos plásticos contaminar nuestro planeta.',
    estadisticas: [
      { numero: '8M', descripcion: 'Toneladas en océanos' },
      { numero: '500', descripcion: 'Años para degradarse' },
      { numero: '1M', descripcion: 'Aves muertas anualmente' },
      { numero: '100K', descripcion: 'Animales marinos afectados' }
    ],
    imagen: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },

  rechazar: {
    descripcion: 'La primera R es rechazar. Evita productos con exceso de empaque plástico y opta por alternativas sostenibles.',
    acciones: [
      'Lleva tu propia bolsa reutilizable',
      'Evita productos con empaque excesivo',
      'Elige productos con envases alternativos',
      'Rechaza sorbetes y cubiertos plásticos'
    ],
    imagen: '/assets/itq_imgRechaza.jpg'  // Imagen personalizada del usuario
  },

  reutilizar: {
    descripcion: 'Antes de desechar, piensa en cómo puedes darle una segunda vida a los objetos plásticos.',
    ideas: [
      'Usa botellas como macetas',
      'Convierte envases en organizadores',
      'Reutiliza bolsas de tela',
      'Crea juguetes o decoraciones'
    ],
    imagen: '/assets/itq_imgreusa.jpg'  // Imagen personalizada del usuario
  },

  reciclar: {
    descripcion: 'El reciclaje es fundamental para reducir el impacto ambiental. Aprende a separar correctamente tus residuos.',
    pasos: [
      'Limpia los envases antes de reciclar',
      'Separa por tipo de plástico',
      'Deposita en contenedores apropiados',
      'Infórmate sobre el reciclaje en tu sector'
    ],
    imagen: '/assets/Itq_ImgRecolectar.jpg'  // Imagen personalizada del usuario
  },

  segundoVideo: {
    url: 'https://www.youtube.com/embed/iqaIJekthXA',  // Video actualizado del usuario
    titulo: 'Soluciones innovadoras'
  },

  imagenQR: '/assets/itq_qr.jpg',  // Imagen QR personalizada del usuario
  enlaceQR: 'https://docs.google.com/forms/d/e/1FAIpQLSfm4yvmnhAtCxRZ7W7vIHcFY11L900ebAMzKm5pv9EEKcg-bw/viewform'  // Enlace actualizado
};