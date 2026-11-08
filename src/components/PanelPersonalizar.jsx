import { useEffect, useRef, useState } from 'react'
import { usePersonalizacion } from '../context/usePersonalizacion.js'
import { TEMAS, LOGOS } from '../data/temas.js'

/**
 * Opción "Personalizar" de la barra de navegación: un botón que abre un
 * panel desplegable para que el usuario elija combinaciones de paleta de
 * colores y logo del sitio.
 *
 * - En escritorio el botón muestra solo el ícono y el panel se despliega
 *   bajo él, alineado a la derecha.
 * - En móvil forma parte del menú: el botón lleva texto y el panel se
 *   muestra dentro del mismo menú.
 * - Se cierra con Escape o al hacer clic fuera del panel.
 *
 * Props:
 *  - estiloBoton: clases extra para el botón (las usa el Navbar para el
 *    tema navideño, donde el fondo es oscuro).
 */
function PanelPersonalizar({ estiloBoton = '' }) {
  const { temaId, logo, elegirTema, elegirLogo, restablecer } = usePersonalizacion()
  const [abierto, setAbierto] = useState(false)
  const contenedorRef = useRef(null)
  const botonRef = useRef(null)

  // Escape y clic fuera cierran el panel.
  useEffect(() => {
    if (!abierto) return undefined

    function alPulsarTecla(evento) {
      if (evento.key === 'Escape') {
        setAbierto(false)
        botonRef.current?.focus()
      }
    }
    function alHacerClic(evento) {
      if (contenedorRef.current && !contenedorRef.current.contains(evento.target)) {
        setAbierto(false)
      }
    }

    window.addEventListener('keydown', alPulsarTecla)
    document.addEventListener('mousedown', alHacerClic)
    return () => {
      window.removeEventListener('keydown', alPulsarTecla)
      document.removeEventListener('mousedown', alHacerClic)
    }
  }, [abierto])

  const base = import.meta.env.BASE_URL

  return (
    <div ref={contenedorRef} className="md:relative">
      <button
        ref={botonRef}
        type="button"
        onClick={() => setAbierto((valor) => !valor)}
        aria-expanded={abierto}
        aria-controls="panel-personalizar"
        title="Personalizar el sitio"
        className={`btn btn-outline w-full md:w-auto md:!px-2.5 ${estiloBoton}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.300-.3-.4-.5-.8-.5-1.300 0-1 .8-1.700 1.800-1.700H17a4 4 0 0 0 4-4C21 6.700 17 3 12 3z" />
          <circle cx="7.500" cy="11" r="1" />
          <circle cx="10" cy="7.500" r="1" />
          <circle cx="14.500" cy="7.500" r="1" />
        </svg>
        {/* Texto visible en el menú móvil; en escritorio solo para lectores de pantalla */}
        <span className="md:sr-only">Personalizar</span>
      </button>

      {abierto && (
        <section
          id="panel-personalizar"
          aria-label="Personalizar el sitio"
          className="tarjeta mt-2 max-h-[80vh] w-full overflow-y-auto p-4 text-left text-ink shadow-lg md:absolute md:right-0 md:top-full md:z-30 md:mt-3 md:w-[21rem]"
        >
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-base">Personalizar</h2>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar el panel"
              className="rounded-lg p-1 text-muted hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <p className="mb-4 text-xs text-muted">
            Prueba combinaciones. Lo que elijas se recuerda en este navegador.
          </p>

          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
            Paleta de colores
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {TEMAS.map((tema) => {
              const activo = tema.id === temaId
              return (
                <button
                  key={tema.id}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => elegirTema(tema.id)}
                  className={`flex flex-col items-start gap-2 rounded-lg border p-2.5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    activo
                      ? 'border-primary ring-2 ring-primary/25'
                      : 'border-line hover:border-primary'
                  }`}
                >
                  <span className="flex -space-x-1" aria-hidden="true">
                    {tema.muestra.map((color) => (
                      <span
                        key={color}
                        className="h-5 w-5 rounded-full ring-2 ring-surface"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                  <span className="text-xs font-semibold leading-tight">{tema.nombre}</span>
                </button>
              )
            })}
          </div>

          <h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide text-muted">Logo</h3>
          <div className="grid grid-cols-3 gap-2">
            {LOGOS.map((opcion) => {
              const activo = opcion.archivo === logo
              return (
                <button
                  key={opcion.archivo}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => elegirLogo(opcion.archivo)}
                  className={`flex flex-col items-center gap-1 rounded-lg border bg-surface p-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    activo
                      ? 'border-primary ring-2 ring-primary/25'
                      : 'border-line hover:border-primary'
                  }`}
                >
                  <img
                    src={`${base}img/${opcion.archivo}`}
                    alt=""
                    className="h-10 w-full object-contain"
                  />
                  <span className="text-xs font-semibold">{opcion.nombre}</span>
                </button>
              )
            })}
          </div>

          <button type="button" onClick={restablecer} className="btn btn-outline mt-4 w-full">
            Restablecer valores originales
          </button>
        </section>
      )}
    </div>
  )
}

export default PanelPersonalizar
