import { Link } from 'react-router-dom'

/**
 * Banner superior de cada pantalla: título + ruta de navegación.
 */
function PageHero({ titulo, migas = [], imagen }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-dark to-primary text-white">
      {imagen && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/${imagen})` }}
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-dark/70" />
        </>
      )}

      <div className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h1 className="text-3xl sm:text-4xl">{titulo}</h1>
        <div className="mx-auto mt-3 h-1 w-14 rounded bg-accent" />

        {migas.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mt-4 text-sm text-white/85">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              {migas.map((miga, indice) => (
                <li key={indice} className="flex items-center gap-2">
                  {indice > 0 && <span aria-hidden="true">·</span>}
                  {miga.to ? (
                    <Link to={miga.to} className="hover:text-accent">
                      {miga.texto}
                    </Link>
                  ) : (
                    <span aria-current="page">{miga.texto}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  )
}

export default PageHero
