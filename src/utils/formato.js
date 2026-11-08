/** Formatea un número como precio en pesos: 1190 -> "$1.190" */
export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`
}
