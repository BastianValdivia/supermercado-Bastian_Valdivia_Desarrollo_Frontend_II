import { useLayoutEffect, useState } from 'react'
import { PersonalizacionContext } from './personalizacionContext.js'
import { TEMAS, LOGOS, TEMA_INICIAL, LOGO_INICIAL } from '../data/temas.js'

const CLAVE_TEMA = 'and-tema'
const CLAVE_LOGO = 'and-logo'

// Lee un valor guardado; si no existe, no es válido o el navegador no
// permite leer el almacenamiento, devuelve el valor por defecto.
function leer(clave, valoresValidos, porDefecto) {
  try {
    const guardado = window.localStorage.getItem(clave)
    return valoresValidos.includes(guardado) ? guardado : porDefecto
  } catch {
    return porDefecto
  }
}

function guardar(clave, valor) {
  try {
    window.localStorage.setItem(clave, valor)
  } catch {
    // Sin almacenamiento disponible: la elección sigue valiendo hasta recargar.
  }
}

/**
 * Personalización visual: paleta de colores y logo elegidos.
 *  - La paleta se aplica sobreescribiendo las variables CSS del tema en <html>
 *    (todo el sitio usa esas variables, así que cambia entero).
 *  - La elección se recuerda en el navegador para que sobreviva a recargas.
 */
export function PersonalizacionProvider({ children }) {
  const [temaId, setTemaId] = useState(() =>
    leer(CLAVE_TEMA, TEMAS.map((t) => t.id), TEMA_INICIAL),
  )
  const [logo, setLogo] = useState(() =>
    leer(CLAVE_LOGO, LOGOS.map((l) => l.archivo), LOGO_INICIAL),
  )

  // Aplica la paleta antes de que el navegador pinte (evita un parpadeo).
  useLayoutEffect(() => {
    const raiz = document.documentElement
    // Primero se limpia cualquier variable puesta por otra paleta...
    TEMAS.forEach((tema) => {
      Object.keys(tema.variables ?? {}).forEach((variable) => raiz.style.removeProperty(variable))
    })
    // ...y luego se aplica la elegida (la de por defecto no tiene variables: usa theme.css).
    const elegido = TEMAS.find((tema) => tema.id === temaId)
    Object.entries(elegido?.variables ?? {}).forEach(([variable, valor]) => {
      raiz.style.setProperty(variable, valor)
    })
  }, [temaId])

  function elegirTema(id) {
    setTemaId(id)
    guardar(CLAVE_TEMA, id)
  }

  function elegirLogo(archivo) {
    setLogo(archivo)
    guardar(CLAVE_LOGO, archivo)
  }

  function restablecer() {
    elegirTema(TEMA_INICIAL)
    elegirLogo(LOGO_INICIAL)
  }

  return (
    <PersonalizacionContext.Provider
      value={{ temaId, logo, elegirTema, elegirLogo, restablecer }}
    >
      {children}
    </PersonalizacionContext.Provider>
  )
}
