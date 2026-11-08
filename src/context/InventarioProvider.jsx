import { useReducer } from 'react'
import { InventarioContext } from './inventarioContext.js'
import { inventarioReducer } from './inventarioReducer.js'
import { inventarioInicial } from '../data/inventarioInicial.js'

const estadoInicial = { inventario: inventarioInicial, carrito: [] }

/**
 * Provider del estado global. Envuelve la aplicación en main.jsx y expone
 * { inventario, carrito, dispatch } a cualquier componente (ver useInventario).
 */
export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(inventarioReducer, estadoInicial)

  return (
    <InventarioContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventarioContext.Provider>
  )
}
