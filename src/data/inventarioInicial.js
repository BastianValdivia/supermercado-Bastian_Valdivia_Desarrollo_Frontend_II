/**
 * Datos iniciales del inventario y lista de categorías.
 *
 * No hay backend ni persistencia: al recargar la página, el inventario
 * vuelve a estos valores.
 *
 * Cada artículo:
 *  - id: string (useParams devuelve strings, por eso todos los ids lo son)
 *  - marca: marca comercial del producto (obligatoria en el formulario)
 *  - categoria: tipo de producto (Lácteos, Panadería...)
 *  - cantidad: stock disponible en el inventario
 *  - imagen: nombre del archivo en public/img/productos/ (opcional; si falta
 *    o no existe, se muestra el emoji de la categoría)
 */

// Categorías compartidas por el filtro y por el formulario de "Agregar".
// El icono se usa como imagen de respaldo cuando un artículo no tiene foto.
export const CATEGORIAS = [
  { nombre: 'Lácteos', icono: '🥛' },
  { nombre: 'Panadería', icono: '🍞' },
  { nombre: 'Bebidas', icono: '🥤' },
  { nombre: 'Carnes', icono: '🥩' },
  { nombre: 'Limpieza', icono: '🧴' },
]

export function iconoDeCategoria(nombre) {
  return CATEGORIAS.find((c) => c.nombre === nombre)?.icono ?? '🛒'
}

export const inventarioInicial = [
  {
    id: '1',
    imagen: 'leche-entera-1l.png',
    nombre: 'Leche entera 1 L',
    marca: 'Colún',
    categoria: 'Lácteos',
    precio: 1190,
    cantidad: 24,
    descripcion: 'Leche entera de larga vida, ideal para el desayuno y la repostería.',
  },
  {
    id: '2',
    imagen: 'yogur-natural-125g.jpeg',
    nombre: 'Yogur natural 125 g',
    marca: 'Soprole',
    categoria: 'Lácteos',
    precio: 450,
    cantidad: 40,
    descripcion: 'Yogur natural elaborado con leche fresca, cremoso y sin azúcar agregada.',
  },
  {
    id: '3',
    imagen: 'queso-gauda-laminado-250g.png',
    nombre: 'Queso gauda laminado 250 g',
    marca: 'Colún',
    categoria: 'Lácteos',
    precio: 3290,
    cantidad: 12,
    descripcion: 'Láminas de queso gauda elaborado con leche de vaca, para sándwiches y tostadas.',
  },
  {
    id: '4',
    imagen: 'pan-marraqueta-1kg.jpeg',
    nombre: 'Pan marraqueta 1 kg',
    marca: 'AND Panadería',
    categoria: 'Panadería',
    precio: 2490,
    cantidad: 18,
    descripcion: 'Marraquetas crujientes horneadas durante el día.',
  },
  {
    id: '5',
    imagen: 'pan-molde-integral.jpeg',
    nombre: 'Pan de molde integral',
    marca: 'Ideal',
    categoria: 'Panadería',
    precio: 2190,
    cantidad: 2,
    descripcion: 'Pan de molde integral con semillas. Stock limitado.',
  },
  {
    id: '6',
    imagen: 'agua-mineral-1-5l.jpeg',
    nombre: 'Agua mineral 1,5 L',
    marca: 'Cachantun',
    categoria: 'Bebidas',
    precio: 790,
    cantidad: 60,
    descripcion: 'Agua mineral sin gas en botella retornable.',
  },
  {
    id: '7',
    imagen: 'jugo-naranja-1l.webp',
    nombre: 'Jugo de naranja 1 L',
    marca: 'Watts',
    categoria: 'Bebidas',
    precio: 1590,
    cantidad: 20,
    descripcion: 'Jugo de naranja exprimido, sin conservantes.',
  },
  {
    id: '8',
    imagen: 'bebida-cola-2l.jpeg',
    nombre: 'Bebida cola 2 L',
    marca: 'Coca-Cola',
    categoria: 'Bebidas',
    precio: 1890,
    cantidad: 30,
    descripcion: 'Bebida cola en formato familiar.',
  },
  {
    id: '9',
    imagen: 'pechuga-pollo-1kg.jpeg',
    nombre: 'Pechuga de pollo 1 kg',
    marca: 'Ariztía',
    categoria: 'Carnes',
    precio: 5490,
    cantidad: 20,
    descripcion: 'Pechuga de pollo fresca, sin piel y lista para cocinar.',
  },
  {
    id: '10',
    imagen: 'posta-rosada-1kg.webp',
    nombre: 'Posta rosada 1 kg',
    marca: 'AND Carnes',
    categoria: 'Carnes',
    precio: 8990,
    cantidad: 15,
    descripcion: 'Corte de vacuno magro, ideal para asar o para guisos.',
  },
  {
    id: '11',
    imagen: 'detergente-liquido-3l.jpeg',
    nombre: 'Detergente líquido 3 L',
    marca: 'Omo',
    categoria: 'Limpieza',
    precio: 6990,
    cantidad: 10,
    descripcion: 'Detergente líquido concentrado para ropa blanca y de color.',
  },
  {
    id: '12',
    imagen: 'detergente-750ml.jpeg',
    nombre: 'Detergente 750 ml',
    marca: 'Quix',
    categoria: 'Limpieza',
    precio: 1990,
    cantidad: 15,
    descripcion: 'Lavaloza con aroma a limón, desengrasante.',
  },
  {
    id: '13',
    imagen: 'leche-descremada-1l.jpeg',
    nombre: 'Leche descremada 1 L',
    marca: 'Colún',
    categoria: 'Lácteos',
    precio: 1190,
    cantidad: 18,
    descripcion: 'Leche descremada de larga vida, baja en grasa.',
  },
  {
    id: '14',
    imagen: 'leche-deslactosada.webp',
    nombre: 'Leche sin lactosa 1 L',
    marca: 'Soprole',
    categoria: 'Lácteos',
    precio: 1490,
    cantidad: 10,
    descripcion: 'Leche semidescremada sin lactosa, fácil de digerir.',
  },
]
