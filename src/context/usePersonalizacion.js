import { useContext } from 'react'
import { PersonalizacionContext } from './personalizacionContext.js'

/** Hook: const { temaId, logo, elegirTema, elegirLogo, restablecer } = usePersonalizacion() */
export function usePersonalizacion() {
  const contexto = useContext(PersonalizacionContext)
  if (contexto === null) {
    throw new Error('usePersonalizacion debe usarse dentro de <PersonalizacionProvider>')
  }
  return contexto
}
