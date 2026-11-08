/**
 * Paletas de colores y logos para PROBAR combinaciones desde el panel
 * "Personalizar" (botón flotante abajo a la derecha).
 * Logos
 *  - Los archivos están en public/img/
 */
export const TEMAS = [
  {
    id: 'verde',
    nombre: 'Verde AND',
    variables: null,
    muestra: ['#0a6b35', '#e8943c', '#e6f2ea'],
  },
  {
    id: 'azul',
    nombre: 'Azul océano',
    variables: {
      '--color-primary': '21 94 168',
      '--color-primary-dark': '12 52 98',
      '--color-primary-soft': '228 238 248',
      '--color-accent': '240 150 40',
      '--color-accent-dark': '214 124 20',
      '--color-ink': '24 33 46',
      '--color-muted': '92 104 120',
      '--color-line': '220 228 236',
      '--color-canvas': '244 247 250',
    },
    muestra: ['#155ea8', '#f09628', '#e4eef8'],
  },
  {
    id: 'granate',
    nombre: 'Granate y dorado',
    variables: {
      '--color-primary': '158 30 60',
      '--color-primary-dark': '98 16 38',
      '--color-primary-soft': '250 232 237',
      '--color-accent': '232 170 50',
      '--color-accent-dark': '200 140 30',
      '--color-ink': '40 28 32',
      '--color-muted': '110 96 100',
      '--color-line': '234 222 226',
      '--color-canvas': '250 246 247',
    },
    muestra: ['#9e1e3c', '#e8aa32', '#fae8ed'],
  },
  {
    id: 'ciruela',
    nombre: 'Ciruela y coral',
    variables: {
      '--color-primary': '106 52 140',
      '--color-primary-dark': '62 28 88',
      '--color-primary-soft': '242 233 248',
      '--color-accent': '244 128 96',
      '--color-accent-dark': '220 100 70',
      '--color-ink': '34 26 40',
      '--color-muted': '104 94 112',
      '--color-line': '230 222 236',
      '--color-canvas': '249 246 251',
    },
    muestra: ['#6a348c', '#f48060', '#f2e9f8'],
  },
]

export const LOGOS = [
  { archivo: 'logo.png', nombre: 'Logo 1' },
  { archivo: 'logo-1.png', nombre: 'Logo 2' },
  { archivo: 'logo-2.png', nombre: 'Logo 3' },
  { archivo: 'logo-3.png', nombre: 'Logo 4' },
  { archivo: 'logo-4.png', nombre: 'Logo 5' },
  { archivo: 'logo-5.png', nombre: 'Logo 6' },

]

export const TEMA_INICIAL = TEMAS[0].id
export const LOGO_INICIAL = LOGOS[0].archivo
