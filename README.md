# AND Supermercados: gestión de inventario

Actividades de **Desarrollo Frontend II (PFY2202)**: sitio web de un supermercado con gestión de inventario, desarrollado con **React**, **React Router**, **Context + useReducer** y **Tailwind CSS**. Incluye lo pedido en la Formativa 2 (menú que navega a dos páginas, formulario para ingresar artículos con nombre, marca y tipo de producto, y tabla con el inventario) y lo de la sumativa de la Semana 3 (filtro, detalle y carrito).

Proyecto académico. No hay backend ni persistencia: al recargar la página, el inventario y la sesión vuelven a su estado inicial.

- **Autor:** Bastián Andrés Valdivia Miranda
- **Repositorio:** https://github.com/BastianValdivia/supermercado-Bastian_Valdivia_Desarrollo_Frontend_II

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12 o superior).

```bash
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173/).

Para generar la versión de producción: `npm run build`.

## Acceso privado (simulado)

Hay dos roles:

- **Visitante:** ve los productos, busca y filtra, abre el detalle y usa el carrito.
- **Administrador:** además puede **agregar artículos** al inventario (`/agregar`) y ver el inventario completo en una tabla (`/inventario`). Estos dos links solo aparecen en el menú después de iniciar sesión.

**Para ver las pantallas "Agregar artículo" e "Inventario":** pulsar **Acceso privado** en la barra de navegación y luego *Ingresar* (las credenciales ya vienen escritas).

El botón **Acceso privado** de la barra de navegación lleva a un login con las credenciales de demostración ya escritas (**usuario `admin`, contraseña `admin`**); basta con pulsar *Ingresar*. La autenticación es **solo simulada**: los valores están en `src/data/credencialesDemo.js` y no hay seguridad real. Su único fin es separar quién puede cargar productos.

Si se intenta entrar a `/agregar` o a `/inventario` sin sesión, se redirige a `/login` y, tras ingresar, se vuelve a esa pantalla.

En `/agregar`, `/inventario` y `/login` no se muestran la franja promocional, "Retira tu compra en 3 simples pasos" ni el newsletter, porque son pantallas de gestión o de ingreso, no de compra. En el resto de las rutas sí aparecen. Las rutas sin promoción están en `RUTAS_SIN_PROMOCION`, al inicio de `components/Layout.jsx`.

## Funcionalidades

| Funcionalidad | Dónde |
|---|---|
| Listar todos los productos (Nuestros Productos) | `pages/ListaArticulos.jsx` |
| Filtrar por categoría (sin perder los datos originales) | `pages/ListaArticulos.jsx`: la categoría es estado local y la lista visible se calcula con `filter` a partir del inventario |
| Buscar un producto por texto (nombre, marca o descripción) | `pages/ListaArticulos.jsx`: se combina con el filtro de categoría; ignora mayúsculas y tildes |
| Agregar un artículo al inventario: nombre, marca, tipo de producto, precio, cantidad y descripción, con validación (solo administrador). Al agregar, un mensaje enlaza a la tabla | `pages/AgregarArticulo.jsx` (`/agregar`) |
| Página con una tabla de todos los artículos del inventario (nombre, marca, tipo, precio y stock; solo administrador) | `pages/Inventario.jsx` (`/inventario`) + `components/TablaInventario.jsx` |
| Botones **Editar** y **Eliminar** de la tabla: solo simulan la acción. Muestran un aviso fijo en pantalla ("Próximamente: este botón solo simula la acción de ...; todavía no tiene una implementación real") y no modifican el inventario | `components/TablaInventario.jsx` + `pages/Inventario.jsx` |
| Detalle de un artículo, con opción de agregarlo al carrito | `pages/DetalleArticulo.jsx` (ruta dinámica `/articulos/:id`) |
| Carrito: aumentar o disminuir cantidades, con el inventario actualizándose | `pages/Carrito.jsx` + `context/inventarioReducer.js` |
| Newsletter con modal de éxito simulado (validación de correo, sin backend) | `components/Newsletter.jsx` |
| Sección "Retira tu compra en 3 simples pasos" | `components/PasosRetiro.jsx` |
| Medios de pago internacionales en el footer (Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay) | `components/MediosDePago.jsx` |
| Acceso privado simulado | `pages/Login.jsx`, `context/SesionProvider.jsx`, `components/RutaProtegida.jsx` |

Al agregar un artículo al carrito se resta una unidad del inventario; al disminuir la cantidad en el carrito se devuelve. No se puede superar el stock disponible ni bajar de cero (si una línea llega a 0, se elimina del carrito).

## Rutas

| Ruta | Pantalla | Acceso |
|---|---|---|
| `/` | Nuestros Productos: lista, categorías y búsqueda | Público |
| `/articulos/:id` | Detalle de un producto | Público |
| `/carrito` | Carrito de compras | Público |
| `/login` | Acceso privado | Público |
| `/agregar` | Agregar artículo: formulario | Solo administrador |
| `/inventario` | Inventario: tabla con todos los artículos | Solo administrador |

Todas están definidas en `src/AppRoutes.jsx`, dentro de un `Layout` (navbar + `Outlet` + footer, más las secciones promocionales según la ruta), con carga diferida (`React.lazy` + `Suspense`). Las rutas privadas se agrupan bajo `RutaProtegida`.

## Estado global

`context/` contiene el estado compartido de la aplicación:

- `inventarioReducer.js`: reducer con las acciones `AGREGAR_ARTICULO`, `AGREGAR_AL_CARRITO`, `AUMENTAR_CANTIDAD` y `DISMINUIR_CANTIDAD`. Cada artículo del inventario es `{ id, nombre, marca, categoria, precio, cantidad, descripcion, imagen? }`; la `categoria` es el tipo de producto.
- `InventarioProvider.jsx` + `useInventario.js`: `useReducer` + `Context` con `{ inventario, carrito, dispatch }`.
- `SesionProvider.jsx` + `useSesion.js`: sesión simulada del administrador (`{ esAdmin, iniciarSesion, cerrarSesion }`), separada del inventario porque responde a eventos distintos.

El carrito guarda solo `{ id, cantidad }`; el nombre y el precio se leen del inventario para que nunca queden desincronizados.

## Estilos

Tailwind CSS v3 con un tema propio:

- **`src/styles/theme.css`**: única fuente de la paleta y la tipografía (variables CSS). Para cambiar los colores del sitio basta con editar los valores de ese archivo.
- **`tailwind.config.js`**: mapea los colores y la fuente a esas variables (`bg-primary`, `text-accent`, etc.).
- **`src/index.css`**: estilos base y clases reutilizables con `@apply` (`.btn`, `.tarjeta`, `.campo`, `.badge`...).
- **`components/ui/Button.jsx`**: botón reutilizable con variantes.

Tipografía: Montserrat (paquete `@fontsource-variable/montserrat`, sin depender de internet).

### Probar paletas de colores y logos (panel "Personalizar")

En la esquina inferior derecha hay un botón flotante **Personalizar**. Abre un panel con:

- **Paleta de colores:** Verde AND (la original), Azul océano, Granate y dorado, y Ciruela y coral. Cambia los colores de todo el sitio a la vez.
- **Logo:** alterna entre seis opciones de `public/img/`: `logo.png` (Logo 1), `logo-1.png` (Logo 2), `logo-2.png` (Logo 3), `logo-3.png` (Logo 4), `logo-4.png` (Logo 5) y `logo-5.png` (Logo 6, el navideño: con este logo el navbar y el encabezado de inicio cambian a un cielo azul con nieve animada). Para cambiar uno, reemplaza el archivo con el mismo nombre. Conviene que todos tengan el mismo lienzo (672 × 371 px, PNG con fondo transparente y un margen de unos 15 px) para que se vean del mismo tamaño en el navbar y el hero.
- **Restablecer:** vuelve a la paleta y al logo originales.

La elección se recuerda en el navegador. Las paletas se editan en `src/data/temas.js` (la original sigue en `src/styles/theme.css`). Cuando se decida la combinación final, se fija en el proyecto y se quita el panel eliminando `<PanelPersonalizar />` de `src/components/Layout.jsx`.

### Cambiar el logo y las imágenes

- **Logo:** `public/img/logo.png`. Se reemplaza guardando el nuevo archivo con el mismo nombre (se recomienda PNG con fondo transparente).
- **Foto del encabezado de "Nuestros Productos":** `public/img/hero-productos.webp`. Se reemplaza con el mismo nombre (se recomienda una foto horizontal de al menos 1600 px de ancho y menos de 300 KB). La foto ocupa la parte derecha del encabezado y se funde con el fondo claro de la izquierda, donde van el logo, el título, el lema y los datos (componente `HeroMarca`). Las demás pantallas usan `PageHero`, que acepta la prop `imagen` con una capa verde encima.
- **Fotos de los productos:** guárdalas en `public/img/productos/` con el nombre que indica el campo `imagen` de cada artículo en `src/data/inventarioInicial.js` (por ejemplo `leche-entera-1l.jpg`). Si descargas una imagen con otra extensión (PNG, WebP), cambia solo la extensión en ese campo. Se recomienda una foto cuadrada o vertical con fondo blanco, de unos 600 px y menos de 100 KB. Si un artículo no tiene `imagen` o el archivo no existe, se muestra el emoji de su categoría (así se ven también los artículos agregados desde el formulario). El componente es `components/ImagenArticulo.jsx`.
- **Banners de categoría:** los textos están en `src/data/bannersCategorias.js` y el diseño en `src/components/BannerCategoria.jsx`. Cada banner tiene un campo `imagen` opcional: si se indica el nombre de un archivo guardado en `public/img/banners/` (PNG o WebP con fondo transparente), se muestra en lugar de los emojis; con `null` se siguen mostrando los emojis. El banner de "Todas" es el general (`BANNER_GENERAL`).
- **Medios de pago:** la lista está en `MEDIOS` al inicio de `src/components/MediosDePago.jsx`; cada uno es una insignia SVG sobre pastilla blanca.
- **Newsletter:** los textos están en `src/components/Newsletter.jsx`. Al enviar un correo válido solo se abre un modal; cuando exista backend, la llamada real va en `manejarEnvio()`.
- **Franja promocional:** el monto y el mensaje de "Despacho gratis" están como constantes al inicio de `src/components/FranjaPromo.jsx`.

## Estructura

```
supermercado-and/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── public/img/
│   ├── logo.png
│   ├── hero-productos.webp
│   ├── banners/                  # imágenes opcionales de los banners
│   └── productos/                # fotos de los productos
└── src/
    ├── main.jsx                  # BrowserRouter + SesionProvider + InventarioProvider
    ├── App.jsx                   # renderiza <AppRoutes />
    ├── AppRoutes.jsx             # todas las rutas (lazy + Suspense + ruta protegida)
    ├── index.css                 # Tailwind + clases con @apply
    ├── styles/theme.css          # paleta y tipografía (variables CSS)
    ├── data/
    │   ├── inventarioInicial.js  # artículos iniciales y categorías
    │   ├── bannersCategorias.js  # textos (e imágenes) de los banners
    │   ├── temas.js              # paletas y logos del panel "Personalizar"
    │   └── credencialesDemo.js   # usuario y contraseña de la demo
    ├── utils/                    # formato de precios y normalización de texto
    ├── context/                  # estado global (inventario y sesión)
    ├── components/
    │   ├── Layout.jsx
    │   ├── Navbar.jsx
    │   ├── Footer.jsx            # enlaces + medios de pago
    │   ├── PasosRetiro.jsx       # "Retira tu compra en 3 simples pasos" (sobre el newsletter)
    │   ├── Newsletter.jsx        # banda de newsletter + modal de éxito simulado
    │   ├── MediosDePago.jsx      # insignias SVG de tarjetas y billeteras globales
    │   ├── FranjaPromo.jsx       # franja "Despacho gratis" bajo el navbar
    │   ├── PageHero.jsx          # encabezado simple de las demás pantallas
    │   ├── HeroMarca.jsx         # encabezado con logo y foto (Nuestros Productos)
    │   ├── BannerCategoria.jsx   # banner sobre el buscador
    │   ├── IconoCategoria.jsx    # iconos de trazo del filtro
    │   ├── Logo.jsx              # logo elegido (navbar y hero)
    │   ├── PanelPersonalizar.jsx # botón flotante: probar paletas y logos
    │   ├── ArticuloCard.jsx
    │   ├── TablaInventario.jsx   # tabla del inventario (usada en /inventario)
    │   ├── ImagenArticulo.jsx    # foto del producto (con emoji de respaldo)
    │   ├── RutaProtegida.jsx
    │   └── ui/Button.jsx
    └── pages/
        ├── ListaArticulos.jsx
        ├── AgregarArticulo.jsx   # admin: formulario para agregar artículos
        ├── Inventario.jsx        # admin: tabla del inventario (botones simulados)
        ├── DetalleArticulo.jsx
        ├── Carrito.jsx
        └── Login.jsx
```
