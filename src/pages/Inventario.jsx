import { useEffect, useState } from 'react'
import { useInventario } from '../context/useInventario.js'
import PageHero from '../components/PageHero.jsx'
import TablaInventario from '../components/TablaInventario.jsx'
import Button from '../components/ui/Button.jsx'

/**
 * Pantalla del administrador con todos los artículos del inventario (/inventario).
 * Lee el inventario del estado global y lo muestra en una tabla.
 *
 * Los botones Editar y Eliminar de cada fila todavía NO tienen implementación:
 * solo muestran un aviso fijo de "próximamente".
 */
function Inventario() {
  const { inventario } = useInventario()
  const [aviso, setAviso] = useState(null) // aviso de los botones simulados: { texto }

  // Cada clic crea un objeto nuevo, así que el aviso se renueva aunque se
  // pulse dos veces el mismo botón.
  function simularAccion(accion) {
    setAviso({ texto: `Próximamente: este botón solo simula la acción de ${accion}. Todavía no tiene una implementación real.` })
  }

  // El aviso se oculta solo a los 6 segundos.
  useEffect(() => {
    if (!aviso) return undefined
    const temporizador = setTimeout(() => setAviso(null), 6000)
    return () => clearTimeout(temporizador)
  }, [aviso])

  return (
    <>
      <PageHero
        titulo="Inventario"
        migas={[
          { texto: 'Inicio', to: '/' },
          { texto: 'Inventario' },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl">
            Inventario actual <span className="text-base font-semibold text-muted">({inventario.length})</span>
          </h2>
          <Button to="/agregar">Agregar artículo</Button>
        </div>

        <TablaInventario articulos={inventario} onSimular={simularAccion} />
      </div>

      {/* Aviso fijo en la pantalla: se ve sin importar en qué fila se pulsó. */}
      {aviso && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md rounded-xl bg-ink px-5 py-4 text-sm font-semibold text-white shadow-lg"
        >
          {aviso.texto}
        </div>
      )}
    </>
  )
}

export default Inventario
