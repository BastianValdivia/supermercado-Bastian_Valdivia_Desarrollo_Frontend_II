/**
 * Textos de los banners que aparecen encima del buscador en "Nuestros Productos".
 * Hay uno por cada categoría; la opción "Todas" usa el banner general
 * (BANNER_GENERAL, más abajo), con otro diseño.
 */
export const BANNERS_CATEGORIAS = {
  Lácteos: {
    antes: 'Cada día',
    titulo: 'FRESCURA',
    resalte: 'EN LÁCTEOS',
    despues: '¡DIRECTO A TU MESA!',
    emojis: ['🥛', '🧀'],
    imagen: 'lacteos.png',
  },
  Panadería: {
    antes: 'Siempre',
    titulo: 'CRUJIENTE',
    resalte: 'EN PANADERÍA',
    despues: '¡TODOS LOS DÍAS!',
    emojis: ['🍞', '🥖'],
    imagen: 'panificados.png',
  },
  Bebidas: {
    antes: 'Para cada ocasión',
    titulo: 'REFRESCANTE',
    resalte: 'EN BEBIDAS',
    despues: '¡BIEN FRESCAS!',
    emojis: ['🥤', '🧃'],
    imagen: 'bebidas.png',
  },
  Carnes: {
    antes: 'En AND somos',
    titulo: 'EXPERTOS',
    resalte: 'EN CARNES',
    despues: '¡TODO EL AÑO!',
    emojis: ['🥩', '🍗'],
    imagen: 'carnes.png',
  },
  Limpieza: {
    antes: 'Tu hogar',
    titulo: 'IMPECABLE',
    resalte: 'CON LIMPIEZA',
    despues: '¡A BUEN PRECIO!',
    emojis: ['🧴', '🧽'],
    imagen: 'articulos-limpieza.png',
  },
}

/**
 * Banner general: se muestra cuando está seleccionada "Todas" (la opción
 * por defecto). Es una promoción de la tienda, no de una categoría.
 *  - etiqueta: texto pequeño sobre la oferta
 *  - desde:    palabra pequeña antes del porcentaje
 *  - descuento: número grande (sin el símbolo %)
 *  - sufijo:   palabra pequeña bajo el porcentaje
 *  - mensaje:  frase a la derecha
 *  - emojis:   productos que acompañan la oferta
 *  - imagen:   (opcional) archivo de public/img/banners/ que reemplaza a los
 *              emojis (ver arriba). Con null se muestran los emojis.
 */
export const BANNER_GENERAL = {
  etiqueta: 'Oferta todo medio de pago',
  desde: 'Hasta',
  descuento: '25',
  sufijo: 'dcto.',
  mensaje: 'Básicos para tu despensa',
  emojis: ['🥛', '🍞', '🥤', '🥩', '🧴'],
  imagen: 'articulos-varios.png',
}
