import { formatearPrecio } from '../utils/formato.js'

/**
 * Tabla con todos los artículos del inventario (solo lectura).
 *  - articulos: lista completa del inventario (viene del estado global)
 *  - onSimular(accion): se llama con 'editar' o 'eliminar' al pulsar el botón
 *    de una fila. Esos botones todavía NO hacen nada real: quien usa la tabla
 *    solo muestra un aviso de una implementacion futura pendiente.
 */
function TablaInventario({ articulos, onSimular }) {
  if (articulos.length === 0) {
    return (
      <div className="tarjeta p-8 text-center text-muted">
        El inventario está vacío. Agrega el primer artículo con el formulario.
      </div>
    )
  }

  return (
    <div className="tarjeta overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="bg-primary-soft text-primary-dark">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Nombre</th>
              <th scope="col" className="px-4 py-3 font-bold">Marca</th>
              <th scope="col" className="px-4 py-3 font-bold">Tipo de producto</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">Precio</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">Stock</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((articulo) => (
              <tr key={articulo.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{articulo.nombre}</td>
                <td className="px-4 py-3">{articulo.marca || '—'}</td>
                <td className="px-4 py-3">
                  <span className="badge">{articulo.categoria}</span>
                </td>
                <td className="px-4 py-3 text-right">{formatearPrecio(articulo.precio)}</td>
                <td className="px-4 py-3 text-right">
                  {articulo.cantidad === 0 ? (
                    <span className="badge-agotado">Sin stock</span>
                  ) : (
                    articulo.cantidad
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline !px-3 !py-1.5"
                      aria-label={`Editar ${articulo.nombre} (próximamente)`}
                      onClick={() => onSimular('editar')}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline !px-3 !py-1.5 !text-danger hover:!border-danger"
                      aria-label={`Eliminar ${articulo.nombre} (próximamente)`}
                      onClick={() => onSimular('eliminar')}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaInventario
