import { useContext } from 'react'
import { InventarioContext } from './inventarioContext.js'

/**
 * Hook para leer el estado global desde cualquier componente:
 *   const { inventario, carrito, dispatch } = useInventario()
 */
export function useInventario() {
  const contexto = useContext(InventarioContext)
  if (contexto === null) {
    throw new Error('useInventario debe usarse dentro de <InventarioProvider>')
  }
  return contexto
}
