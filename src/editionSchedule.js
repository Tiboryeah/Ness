// Ventana del cumpleaños en hora del centro de México (UTC-6, sin horario de verano).
export const BIRTHDAY_START = new Date('2026-10-13T00:00:00-06:00')
export const BIRTHDAY_END = new Date('2026-10-14T00:00:00-06:00')

// ?edicion=contador | cumple | clasica fuerza una edición para probarla.
export function getEdition(now = new Date()) {
  const forced = new URLSearchParams(window.location.search).get('edicion')
  if (['contador', 'cumple', 'clasica'].includes(forced)) return forced

  if (now < BIRTHDAY_START) return 'contador'
  if (now < BIRTHDAY_END) return 'cumple'
  return 'clasica'
}
