import { BANNERS_CATEGORIAS, BANNER_GENERAL } from '../data/bannersCategorias.js'

// Las imágenes de los banners viven en public/img/banners/.
const rutaImagen = (archivo) => `${import.meta.env.BASE_URL}img/banners/${archivo}`

/**
 * Banner general (opción "Todas"): oferta a la izquierda, productos al
 * centro y mensaje a la derecha. Mismos colores del tema que los demás.
 */
function BannerGeneral() {
  const b = BANNER_GENERAL

  return (
    <div className="relative mb-4 overflow-hidden rounded-card bg-gradient-to-r from-primary-dark to-primary text-white shadow-sm">
      {/* Bolitas decorativas en los bordes */}
      <span aria-hidden="true" className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-accent" />
      <span aria-hidden="true" className="absolute -bottom-5 right-8 h-12 w-12 rounded-full bg-primary-soft/25" />
      <span aria-hidden="true" className="absolute -left-3 bottom-2 hidden h-8 w-8 rounded-full bg-accent/80 sm:block" />

      <div className="relative flex flex-col items-center gap-3 px-5 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <p className="mb-1 text-xs font-medium text-white/90">{b.etiqueta}</p>
          <div className="flex items-baseline gap-1.5 rounded-md bg-accent px-3 py-1 text-primary-dark">
            <span className="text-sm font-extrabold">{b.desde}</span>
            <span className="text-5xl font-extrabold leading-none tracking-tight">
              {b.descuento}
              <span className="text-3xl">%</span>
            </span>
            <span className="text-sm font-extrabold">{b.sufijo}</span>
          </div>
        </div>

        {b.imagen ? (
          <img
            src={rutaImagen(b.imagen)}
            alt=""
            className="h-20 w-auto max-w-full object-contain drop-shadow-md sm:h-24"
          />
        ) : (
          <div aria-hidden="true" className="flex items-center">
            {b.emojis.map((emoji, indice) => (
              <span
                key={emoji}
                className={`text-4xl drop-shadow-md sm:text-5xl ${indice > 0 ? '-ml-2' : ''} ${
                  indice % 2 === 0 ? '-rotate-6' : 'rotate-6 translate-y-1'
                }`}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}

        <p className="text-xl font-semibold leading-tight text-primary-soft sm:pr-10 sm:text-2xl">
          {b.mensaje}
        </p>
      </div>
    </div>
  )
}

/**
 * Banner que se muestra encima del buscador según la categoría elegida.
 * Los textos salen de data/bannersCategorias.js y los colores del tema
 * (degradado verde + trazo naranja)
 *
 * "Todas" muestra el banner general; si una categoría no tiene banner
 * definido, no se muestra nada.
 */
function BannerCategoria({ categoria }) {
  if (categoria === 'Todas') return <BannerGeneral />

  const banner = BANNERS_CATEGORIAS[categoria]
  if (!banner) return null

  return (
    <div className="relative mb-4 overflow-hidden rounded-card bg-gradient-to-r from-primary-dark to-primary text-white shadow-sm">
      <div className="flex flex-col items-center justify-center gap-x-6 gap-y-1 px-5 py-4 text-center sm:flex-row sm:pr-28">
        <p className="text-sm font-medium uppercase tracking-wide text-white/90 sm:text-base">
          {banner.antes}
        </p>

        <div className="flex flex-col items-center">
          <p className="text-3xl font-extrabold leading-none tracking-tight text-primary-soft sm:text-4xl">
            {banner.titulo}
          </p>
          <p className="-mt-1 -rotate-1 rounded-sm bg-accent px-3 py-0.5 text-lg font-extrabold uppercase leading-tight text-primary-dark sm:text-xl">
            {banner.resalte}
          </p>
        </div>

        <p className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
          {banner.despues}
        </p>
      </div>

      {/* Decoración a la derecha: imagen propia si hay, si no los emojis */}
      {banner.imagen ? (
        <img
          src={rutaImagen(banner.imagen)}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto max-w-[40%] object-contain object-right-bottom drop-shadow-md sm:block"
        />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 items-center sm:flex"
        >
          {banner.emojis.map((emoji, indice) => (
            <span
              key={emoji}
              className={`text-5xl drop-shadow-md ${indice === 0 ? 'rotate-12' : '-ml-3 -rotate-12 translate-y-2'}`}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default BannerCategoria
