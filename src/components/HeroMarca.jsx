import { Link } from 'react-router-dom'
import { usePersonalizacion } from '../context/usePersonalizacion.js'
import Logo from './Logo.jsx'

// Logo que activa el tema navideño (fondo oscuro, textos claros)
const LOGO_NAVIDENO = 'logo-5.png'

/**
 * Hero con identidad de marca (se usa en "Nuestros Productos").
 *
 * A la izquierda: ruta de navegación, logo grande, título, lema y datos.
 * A la derecha: una foto de producto que se funde con el fondo
 * mediante una máscara (clase .hero-foto en index.css).
 */
function HeroMarca({ titulo, lema, migas = [], datos = [], imagen }) {
  const base = import.meta.env.BASE_URL
  const { logo } = usePersonalizacion()

  const temaNavideno = logo === LOGO_NAVIDENO

  return (
    <section
      className={`relative isolate overflow-hidden ${
        temaNavideno
          ? 'bg-gradient-to-r from-[#07135a] via-[#0b1f7a] to-[#17409a]'
          : 'bg-primary-soft'
      }`}
    >
      {imagen && (
        <div
          aria-hidden="true"
          className="hero-foto absolute inset-y-0 right-0 -z-20 w-full bg-cover bg-center md:w-3/5"
          style={{
            backgroundImage: `url(${base}img/${imagen})`,
          }}
        />
      )}

      {/* Velo uniforme en móvil, para que el texto se lea sobre la foto */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 md:hidden ${
          temaNavideno ? 'bg-[#07135a]/85' : 'bg-primary-soft/85'
        }`}
      />

      <div className="mx-auto flex min-h-[17rem] max-w-6xl items-center px-4 py-8">
        <div className="max-w-md">
          {migas.length > 0 && (
            <nav
              aria-label="Ruta de navegación"
              className={`mb-4 text-xs ${
                temaNavideno ? 'text-white/70' : 'text-muted'
              }`}
            >
              <ol className="flex flex-wrap items-center gap-2">
                {migas.map((miga, indice) => (
                  <li key={indice} className="flex items-center gap-2">
                    {indice > 0 && <span aria-hidden="true">·</span>}
                    {miga.to ? (
                      <Link
                        to={miga.to}
                        className={
                          temaNavideno
                            ? 'hover:text-sky-200'
                            : 'hover:text-primary'
                        }
                      >
                        {miga.texto}
                      </Link>
                    ) : (
                      <span
                        aria-current="page"
                        className={`font-semibold ${
                          temaNavideno ? 'text-white' : 'text-ink'
                        }`}
                      >
                        {miga.texto}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <Logo className="mb-3 h-24 w-auto sm:h-32" />

          <h1
            className={`text-2xl sm:text-3xl ${
              temaNavideno ? 'text-white' : 'text-primary-dark'
            }`}
          >
            {titulo}
          </h1>
          <div className="mt-2 h-1 w-12 rounded bg-accent" />
          {lema && (
            <p
              className={`mt-3 text-sm font-medium ${
                temaNavideno ? 'text-white/80' : 'text-muted'
              }`}
            >
              {lema}
            </p>
          )}

          {datos.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {datos.map((dato) => (
                <li
                  key={dato.etiqueta}
                  className={`rounded-full px-3 py-1 text-xs shadow-sm ring-1 ${
                    temaNavideno
                      ? 'bg-white/10 text-white ring-white/25'
                      : 'bg-surface/80 text-ink ring-line'
                  }`}
                >
                  <span
                    className={`font-bold ${
                      temaNavideno ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    {dato.valor}
                  </span>{' '}
                  {dato.etiqueta}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroMarca