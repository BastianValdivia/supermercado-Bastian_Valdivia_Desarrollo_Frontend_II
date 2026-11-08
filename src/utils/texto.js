/**
 * Normaliza un texto para comparar: minúsculas y sin tildes.
 */
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}
