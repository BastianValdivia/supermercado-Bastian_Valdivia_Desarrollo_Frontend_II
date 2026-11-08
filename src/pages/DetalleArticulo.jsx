import { useParams } from 'react-router-dom'
import { useInventario } from '../context/useInventario.js'
import { ACCIONES } from '../context/inventarioReducer.js'
import ImagenArticulo from '../components/ImagenArticulo.jsx'
import { formatearPrecio } from '../utils/formato.js'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/ui/Button.jsx'

/**
 * Pantalla: detalle de un artículo (ruta dinámica /articulos/:id).
 * Lee el id con useParams y busca el artículo en el inventario global.
 * Cada clic en "Agregar al carrito" suma 1 unidad al carrito y resta 1 al stock.
 */
function DetalleArticulo() {
  const { id } = useParams()
  const { inventario, carrito, dispatch } = useInventario()

  const articulo = inventario.find((a) => a.id === id)

  if (!articulo) {
    return (
      <>
        <PageHero
          titulo="Producto no encontrado"
          migas={[{ texto: 'Inicio', to: '/' }, { texto: 'Producto no encontrado' }]}
        />
        <div className="mx-auto max-w-2xl px-4 py-10 text-center">
          <p className="mb-6 text-muted">El producto que buscas no existe en nuestro catálogo.</p>
          <Button to="/">Volver a Nuestros Productos</Button>
        </div>
      </>
    )
  }

  const agotado = articulo.cantidad === 0
  const enCarrito = carrito.find((linea) => linea.id === articulo.id)?.cantidad ?? 0

  return (
    <>
      <PageHero
        titulo={articulo.nombre}
        migas={[
          { texto: 'Inicio', to: '/' },
          { texto: 'Nuestros Productos', to: '/' },
          { texto: articulo.nombre },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <article className="tarjeta grid overflow-hidden md:grid-cols-2">
          <ImagenArticulo key={articulo.id} articulo={articulo} className="min-h-64" emojiClassName="text-8xl" />

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <span className="badge self-start">{articulo.categoria}</span>
            <h2 className="text-2xl">{articulo.nombre}</h2>
            {articulo.marca && (
              <p className="-mt-3 text-sm font-semibold text-muted">Marca: {articulo.marca}</p>
            )}
            <p className="text-3xl font-extrabold text-primary">
              {formatearPrecio(articulo.precio)}
            </p>
            <p className="text-muted">
              {articulo.descripcion || 'Sin descripción.'}
            </p>

            <p className="text-sm" aria-live="polite">
              {agotado ? (
                <span className="badge-agotado">Sin stock</span>
              ) : (
                <>
                  <span className="font-semibold">Disponibles:</span> {articulo.cantidad}
                </>
              )}
              {enCarrito > 0 && (
                <span className="ml-3 text-muted">En tu carrito: {enCarrito}</span>
              )}
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                disabled={agotado}
                onClick={() => dispatch({ type: ACCIONES.AGREGAR_AL_CARRITO, id: articulo.id })}
              >
                Agregar al carrito
              </Button>
              <Button variant="outline" to="/carrito">Ver carrito</Button>
            </div>
          </div>
        </article>

        <div className="mt-6">
          <Button variant="outline" to="/">← Volver a Nuestros Productos</Button>
        </div>
      </div>
    </>
  )
}

export default DetalleArticulo
