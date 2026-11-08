import { useState } from 'react'
import { useInventario } from '../context/useInventario.js'
import { CATEGORIAS } from '../data/inventarioInicial.js'
import { normalizar } from '../utils/texto.js'
import HeroMarca from '../components/HeroMarca.jsx'
import ArticuloCard from '../components/ArticuloCard.jsx'
import IconoCategoria from '../components/IconoCategoria.jsx'
import BannerCategoria from '../components/BannerCategoria.jsx'
import Button from '../components/ui/Button.jsx'

const TODAS = 'Todas'

/**
 * Pantalla: Nuestros Productos (lista con filtro por categoría y búsqueda).
 *
 * La categoría y el texto de búsqueda son estado LOCAL de esta pantalla
 * (nadie más los necesita). La lista que se muestra se CALCULA en cada
 * render a partir del inventario, aplicando ambos filtros; el inventario
 * original nunca se modifica ni se pierde.
 */
function ListaArticulos() {
  const { inventario } = useInventario()
  const [categoria, setCategoria] = useState(TODAS)
  const [busqueda, setBusqueda] = useState('')

  // La búsqueda ignora mayúsculas y tildes, y mira el nombre, la marca y la descripción.
  const termino = normalizar(busqueda.trim())

  const visibles = inventario
    .filter((articulo) => categoria === TODAS || articulo.categoria === categoria)
    .filter(
      (articulo) =>
        termino === '' || normalizar(`${articulo.nombre} ${articulo.marca ?? ''} ${articulo.descripcion}`).includes(termino),
    )

  // Dato del hero: artículos con stock (se recalcula solo al vender o agregar).
  const disponibles = inventario.filter((articulo) => articulo.cantidad > 0).length

  const hayFiltros = categoria !== TODAS || termino !== ''
  const opciones = [TODAS, ...CATEGORIAS.map((c) => c.nombre)]

  function limpiarFiltros() {
    setCategoria(TODAS)
    setBusqueda('')
  }

  return (
    <>
      <HeroMarca
        titulo="Nuestros Productos"
        lema="Tu cadena de confianza"
        imagen="hero-productos.webp"
        migas={[{ texto: 'Inicio', to: '/' }, { texto: 'Nuestros Productos' }]}
        datos={[
          { valor: disponibles, etiqueta: disponibles === 1 ? 'producto disponible' : 'productos disponibles' },
          { valor: CATEGORIAS.length, etiqueta: 'categorías' },
        ]}
      />

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[16rem_1fr]">
        <aside>
          <nav aria-label="Filtrar por categoría" className="tarjeta p-4 lg:sticky lg:top-24">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-dark">
              Categorías
            </h2>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 lg:flex-col lg:gap-y-2">
              {opciones.map((opcion) => {
                const activa = opcion === categoria
                return (
                  <li key={opcion}>
                    <button
                      type="button"
                      aria-pressed={activa}
                      onClick={() => setCategoria(opcion)}
                      className="group flex w-full items-center gap-2 rounded-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <IconoCategoria nombre={opcion} className="h-7 w-7 shrink-0 text-primary-dark" />
                      <span
                        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                          activa
                            ? 'bg-primary text-white'
                            : 'bg-primary-soft text-ink group-hover:bg-primary/20'
                        }`}
                      >
                        {opcion}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        <section aria-label="Nuestros productos">
          <BannerCategoria categoria={categoria} />

          <div className="relative mb-4">
            <label htmlFor="busqueda" className="sr-only">Buscar producto</label>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              id="busqueda"
              type="search"
              autoComplete="off"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar producto..."
              className="campo pl-10"
            />
          </div>

          <p className="mb-4 text-sm text-muted" aria-live="polite">
            {visibles.length} {visibles.length === 1 ? 'producto' : 'productos'}
            {categoria !== TODAS && ` en ${categoria}`}
            {termino !== '' && ` para “${busqueda.trim()}”`}
          </p>

          {visibles.length === 0 ? (
            <div className="tarjeta p-8 text-center">
              <p className="mb-4 text-muted">No encontramos productos con esos filtros.</p>
              {hayFiltros && (
                <Button variant="outline" onClick={limpiarFiltros}>Limpiar filtros</Button>
              )}
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibles.map((articulo) => (
                <li key={articulo.id}>
                  <ArticuloCard articulo={articulo} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}

export default ListaArticulos
