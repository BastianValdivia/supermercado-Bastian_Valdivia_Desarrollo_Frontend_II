import { Link } from 'react-router-dom'
import ImagenArticulo from './ImagenArticulo.jsx'
import { formatearPrecio } from '../utils/formato.js'

/**
 * Tarjeta de un artículo en la lista. Toda la tarjeta es un enlace al
 * detalle (/articulos/:id).
 */
function ArticuloCard({ articulo }) {
  const agotado = articulo.cantidad === 0

  return (
    <Link
      to={`/articulos/${articulo.id}`}
      className="tarjeta group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <ImagenArticulo key={articulo.id} articulo={articulo} className="h-36" emojiClassName="text-6xl" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="badge self-start">{articulo.categoria}</span>
        <h3 className="text-base font-semibold leading-snug group-hover:text-primary">
          {articulo.nombre}
        </h3>
        {articulo.marca && <p className="-mt-1 text-xs font-semibold text-muted">{articulo.marca}</p>}

        <div className="mt-auto flex items-end justify-between pt-2">
          <p className="text-lg font-bold text-primary">{formatearPrecio(articulo.precio)}</p>
          {agotado ? (
            <span className="badge-agotado">Sin stock</span>
          ) : (
            <span className="text-xs text-muted">Stock: {articulo.cantidad}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ArticuloCard
