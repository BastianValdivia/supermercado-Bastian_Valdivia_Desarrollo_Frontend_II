import { useState } from 'react'
import { SesionContext } from './sesionContext.js'
import { CREDENCIALES_DEMO } from '../data/credencialesDemo.js'

/**
 * Sesión simulada: un solo dato (¿es administrador?) que vive en memoria.
 * Está separada del inventario y del carrito porque responde a eventos
 * distintos. Al recargar la página, la sesión se cierra.
 */
export function SesionProvider({ children }) {
  const [esAdmin, setEsAdmin] = useState(false)

  // Devuelve true si las credenciales coinciden con las de demostración.
  function iniciarSesion(usuario, clave) {
    const correcto =
      usuario.trim() === CREDENCIALES_DEMO.usuario && clave === CREDENCIALES_DEMO.clave
    setEsAdmin(correcto)
    return correcto
  }

  function cerrarSesion() {
    setEsAdmin(false)
  }

  return (
    <SesionContext.Provider value={{ esAdmin, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  )
}
