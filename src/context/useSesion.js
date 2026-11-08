import { useContext } from 'react'
import { SesionContext } from './sesionContext.js'

/** Hook: const { esAdmin, iniciarSesion, cerrarSesion } = useSesion() */
export function useSesion() {
  const contexto = useContext(SesionContext)
  if (contexto === null) {
    throw new Error('useSesion debe usarse dentro de <SesionProvider>')
  }
  return contexto
}
