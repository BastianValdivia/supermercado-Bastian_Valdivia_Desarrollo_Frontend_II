/**
 * Reducer del estado global: inventario + carrito.
 *
 * Forma del estado:
 *   {
 *     inventario: [{ id, nombre, marca, categoria, precio, cantidad, descripcion }],
 *     carrito:    [{ id, cantidad }]
 *   }
 *
 * El carrito solo guarda { id, cantidad }; el nombre y el precio se leen del
 * inventario, así nunca quedan desincronizados.
 *
 * Invariante: para cada artículo,
 *   cantidad en inventario + cantidad en el carrito = stock original.
 *
 * Nunca se muta el estado: siempre se devuelven arreglos y objetos nuevos.
 */

export const ACCIONES = {
  AGREGAR_ARTICULO: 'AGREGAR_ARTICULO',
  AGREGAR_AL_CARRITO: 'AGREGAR_AL_CARRITO',
  AUMENTAR_CANTIDAD: 'AUMENTAR_CANTIDAD',
  DISMINUIR_CANTIDAD: 'DISMINUIR_CANTIDAD',
}

export function inventarioReducer(state, action) {
  switch (action.type) {
    // action.articulo: artículo nuevo completo (con su id)
    case ACCIONES.AGREGAR_ARTICULO:
      return { ...state, inventario: [...state.inventario, action.articulo] }

    // action.id: resta 1 al inventario y suma 1 a la línea del carrito.
    // AUMENTAR_CANTIDAD (botón "+" del carrito) hace exactamente lo mismo.
    case ACCIONES.AGREGAR_AL_CARRITO:
    case ACCIONES.AUMENTAR_CANTIDAD: {
      const articulo = state.inventario.find((a) => a.id === action.id)
      if (!articulo || articulo.cantidad === 0) return state // sin stock

      const linea = state.carrito.find((l) => l.id === action.id)
      return {
        inventario: state.inventario.map((a) =>
          a.id === action.id ? { ...a, cantidad: a.cantidad - 1 } : a,
        ),
        carrito: linea
          ? state.carrito.map((l) =>
              l.id === action.id ? { ...l, cantidad: l.cantidad + 1 } : l,
            )
          : [...state.carrito, { id: action.id, cantidad: 1 }],
      }
    }

    // action.id: devuelve 1 al inventario y resta 1 a la línea.
    // Si la línea llega a 0, se elimina del carrito.
    case ACCIONES.DISMINUIR_CANTIDAD: {
      const linea = state.carrito.find((l) => l.id === action.id)
      if (!linea) return state

      return {
        inventario: state.inventario.map((a) =>
          a.id === action.id ? { ...a, cantidad: a.cantidad + 1 } : a,
        ),
        carrito:
          linea.cantidad === 1
            ? state.carrito.filter((l) => l.id !== action.id)
            : state.carrito.map((l) =>
                l.id === action.id ? { ...l, cantidad: l.cantidad - 1 } : l,
              ),
      }
    }

    default:
      return state
  }
}
