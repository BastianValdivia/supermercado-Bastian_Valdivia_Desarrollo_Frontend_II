import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInventario } from '../context/useInventario.js'
import { ACCIONES } from '../context/inventarioReducer.js'
import { CATEGORIAS } from '../data/inventarioInicial.js'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/ui/Button.jsx'

const VALORES_VACIOS = {
  nombre: '',
  marca: '',
  categoria: '',
  precio: '',
  cantidad: '',
  descripcion: '',
}

/** Devuelve un objeto { campo: 'mensaje' } con los errores encontrados. */
function validar(valores) {
  const errores = {}

  if (!valores.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
  }

  if (!valores.marca.trim()) {
    errores.marca = 'La marca es obligatoria.'
  }

  if (!valores.categoria) {
    errores.categoria = 'Selecciona un tipo de producto.'
  }

  const precio = Number(valores.precio)
  if (valores.precio.trim() === '' || !(precio > 0)) {
    errores.precio = 'Ingresa un precio mayor que 0.'
  }

  const cantidad = Number(valores.cantidad)
  if (valores.cantidad.trim() === '' || !Number.isInteger(cantidad) || cantidad < 0) {
    errores.cantidad = 'Ingresa una cantidad entera (0 o más).'
  }

  return errores
}

/**
 * Pantalla del administrador para agregar artículos (/agregar).
 * Formulario controlado (estado local: valores, errores y mensaje). Al enviar
 * un formulario válido se despacha la acción al estado global; el artículo
 * nuevo se ve en la tabla de /inventario.
 */
function AgregarArticulo() {
  const { dispatch } = useInventario()
  const [valores, setValores] = useState(VALORES_VACIOS)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('') // resultado de agregar un artículo

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setValores({ ...valores, [name]: value })
    // Al corregir un campo, se limpia su error.
    if (errores[name]) setErrores({ ...errores, [name]: undefined })
  }

  function manejarEnvio(evento) {
    evento.preventDefault()

    const erroresEncontrados = validar(valores)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    const nombre = valores.nombre.trim()
    dispatch({
      type: ACCIONES.AGREGAR_ARTICULO,
      articulo: {
        id: crypto.randomUUID(),
        nombre,
        marca: valores.marca.trim(),
        categoria: valores.categoria,
        precio: Number(valores.precio),
        cantidad: Number(valores.cantidad),
        descripcion: valores.descripcion.trim(),
      },
    })

    // Se queda en esta pantalla y avisa; el mensaje enlaza al inventario.
    setValores(VALORES_VACIOS)
    setErrores({})
    setMensaje(`Se agregó «${nombre}» al inventario.`)
  }

  // Clases de un campo según tenga o no error.
  const claseCampo = (nombre) => `campo ${errores[nombre] ? 'campo-error' : ''}`

  return (
    <>
      <PageHero
        titulo="Agregar artículo"
        migas={[
          { texto: 'Inicio', to: '/' },
          { texto: 'Agregar artículo' },
        ]}
      />

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <section aria-labelledby="titulo-formulario" className="mx-auto max-w-2xl">
          <h2 id="titulo-formulario" className="mb-4 text-xl">Datos del artículo</h2>

          {mensaje && (
            <p role="status" className="mb-4 rounded-lg bg-primary-soft px-4 py-3 text-sm font-semibold text-primary-dark">
              {mensaje}{' '}
              <Link to="/inventario" className="underline hover:no-underline">Ver inventario</Link>
            </p>
          )}

          <form onSubmit={manejarEnvio} noValidate className="tarjeta space-y-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="etiqueta">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={valores.nombre}
                  onChange={manejarCambio}
                  className={claseCampo('nombre')}
                  aria-invalid={Boolean(errores.nombre)}
                  placeholder="Ej: Arroz grano largo 1 kg"
                />
                {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}
              </div>

              <div>
                <label htmlFor="marca" className="etiqueta">Marca</label>
                <input
                  id="marca"
                  name="marca"
                  type="text"
                  value={valores.marca}
                  onChange={manejarCambio}
                  className={claseCampo('marca')}
                  aria-invalid={Boolean(errores.marca)}
                  placeholder="Ej: Tucapel"
                />
                {errores.marca && <p className="mensaje-error">{errores.marca}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="etiqueta">Tipo de producto</label>
              <select
                id="categoria"
                name="categoria"
                value={valores.categoria}
                onChange={manejarCambio}
                className={claseCampo('categoria')}
                aria-invalid={Boolean(errores.categoria)}
              >
                <option value="">Selecciona un tipo de producto</option>
                {CATEGORIAS.map((c) => (
                  <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
              {errores.categoria && <p className="mensaje-error">{errores.categoria}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="precio" className="etiqueta">Precio ($)</label>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  min="0"
                  step="1"
                  value={valores.precio}
                  onChange={manejarCambio}
                  className={claseCampo('precio')}
                  aria-invalid={Boolean(errores.precio)}
                />
                {errores.precio && <p className="mensaje-error">{errores.precio}</p>}
              </div>

              <div>
                <label htmlFor="cantidad" className="etiqueta">Cantidad disponible</label>
                <input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  min="0"
                  step="1"
                  value={valores.cantidad}
                  onChange={manejarCambio}
                  className={claseCampo('cantidad')}
                  aria-invalid={Boolean(errores.cantidad)}
                />
                {errores.cantidad && <p className="mensaje-error">{errores.cantidad}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="descripcion" className="etiqueta">
                Descripción <span className="font-normal text-muted">(opcional)</span>
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="3"
                value={valores.descripcion}
                onChange={manejarCambio}
                className="campo"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Agregar al inventario</Button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default AgregarArticulo
