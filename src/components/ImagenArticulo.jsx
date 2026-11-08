import { useState } from 'react'
import { iconoDeCategoria } from '../data/inventarioInicial.js'

// Carpeta (dentro de public/) donde se guardan las fotos de los productos.
const CARPETA_IMAGENES = '/img/productos/'

/**
 * Foto de un artículo. Lee el nombre del archivo desde articulo.imagen y lo
 * busca en public/img/productos/. Si el artículo no tiene imagen (por ejemplo,
 * uno recién agregado con el formulario) o el archivo no existe, muestra el
 * emoji de su categoría, así que nunca queda un hueco roto.
 */
function ImagenArticulo({ articulo, className = '', emojiClassName = 'text-6xl' }) {
  const [fallo, setFallo] = useState(false)
  const mostrarFoto = Boolean(articulo.imagen) && !fallo

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${mostrarFoto ? 'bg-white' : 'bg-primary-soft'} ${className}`}
    >
      {mostrarFoto ? (
        <img
          src={`${CARPETA_IMAGENES}${articulo.imagen}`}
          alt={articulo.nombre}
          loading="lazy"
          onError={() => setFallo(true)}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className={emojiClassName} aria-hidden="true">
          {iconoDeCategoria(articulo.categoria)}
        </span>
      )}
    </div>
  )
}

export default ImagenArticulo
