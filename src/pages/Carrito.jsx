import { useInventario } from '../context/useInventario.js'
import { ACCIONES } from '../context/inventarioReducer.js'
import { formatearPrecio } from '../utils/formato.js'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/ui/Button.jsx'

/**
 * Pantalla: carrito de compras.
 * El carrito solo guarda { id, cantidad }; el nombre, el precio y el stock
 * se leen del inventario. "−" devuelve una unidad al inventario y "+" la
 * descuenta (se deshabilita cuando ya no queda stock).
 */
function Carrito() {
  const { inventario, carrito, dispatch } = useInventario()

  const lineas = carrito
    .map((linea) => ({
      ...linea,
      articulo: inventario.find((a) => a.id === linea.id),
    }))
    .filter((linea) => linea.articulo)

  const total = lineas.reduce(
    (suma, linea) => suma + linea.articulo.precio * linea.cantidad,
    0,
  )

  return (
    <>
      <PageHero
        titulo="Carrito de compras"
        migas={[{ texto: 'Inicio', to: '/' }, { texto: 'Carrito' }]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10">
        {lineas.length === 0 ? (
          <div className="tarjeta p-8 text-center">
            <p className="mb-6 text-muted">Todavía no agregaste ningún producto al carrito.</p>
            <Button to="/">Ir a Nuestros Productos</Button>
          </div>
        ) : (
          <div className="tarjeta overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-primary-soft text-primary-dark">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Producto</th>
                    <th scope="col" className="px-4 py-3 font-bold">Precio</th>
                    <th scope="col" className="px-4 py-3 text-center font-bold">Cantidad</th>
                    <th scope="col" className="px-4 py-3 text-right font-bold">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {lineas.map(({ id, cantidad, articulo }) => (
                    <tr key={id} className="border-t border-line">
                      <td className="px-4 py-3 font-semibold">{articulo.nombre}</td>
                      <td className="px-4 py-3">{formatearPrecio(articulo.precio)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            className="btn btn-outline h-8 w-8 !p-0"
                            aria-label={`Disminuir cantidad de ${articulo.nombre}`}
                            onClick={() => dispatch({ type: ACCIONES.DISMINUIR_CANTIDAD, id })}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold" aria-live="polite">
                            {cantidad}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline h-8 w-8 !p-0"
                            aria-label={`Aumentar cantidad de ${articulo.nombre}`}
                            disabled={articulo.cantidad === 0}
                            onClick={() => dispatch({ type: ACCIONES.AUMENTAR_CANTIDAD, id })}
                          >
                            +
                          </button>
                        </div>
                        <p className="mt-1 text-center text-xs text-muted">
                          {articulo.cantidad === 0
                            ? 'Sin más stock'
                            : `Quedan ${articulo.cantidad} disponibles`}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {formatearPrecio(articulo.precio * cantidad)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-line bg-canvas px-4 py-4">
              <Button variant="outline" to="/">Seguir viendo productos</Button>
              <p className="text-lg font-extrabold">
                Total: <span className="text-primary">{formatearPrecio(total)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Carrito
