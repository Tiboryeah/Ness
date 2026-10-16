// Fechas en hora del centro de México (UTC-6, sin horario de verano).
export const BIRTHDAY_START = new Date('2026-10-13T00:00:00-06:00')
// Le pidió ser su novia con "Kumbala" la noche del 15 de septiembre; ya era 16.
export const TOGETHER_SINCE = new Date('2026-09-16T00:00:00-06:00')
export const MONTH_START = new Date('2026-10-16T00:00:00-06:00')
export const MONTH_END = new Date('2026-10-17T00:00:00-06:00')

// Vistas que se pueden abrir con ?momento=… (así se reviven desde la sección Momentos)
export const VIEWS = ['principal', 'ritual', 'cumple', 'mes-contador', 'mes', 'clasica']

// Enlaces antiguos de prueba (?edicion=…) siguen funcionando
const LEGACY = { contador: 'ritual', cumple: 'cumple', clasica: 'clasica' }

const params = () => new URLSearchParams(window.location.search)

export function getView(now = new Date()) {
  const forced = params().get('momento') ?? LEGACY[params().get('edicion')]
  if (VIEWS.includes(forced)) return forced

  if (now < MONTH_START) return 'mes-contador'
  if (now < MONTH_END) return 'mes'
  return 'principal'
}

// A qué hora llega a cero cada cuenta regresiva.
// Si la fecha ya pasó (se está reviviendo como recuerdo) arranca a unos segundos del final.
// ?prueba=N fuerza N segundos para ensayar la transición.
export function getCountdownTarget(date, now = Date.now()) {
  const seconds = Number(params().get('prueba'))
  if (seconds > 0) return new Date(now + seconds * 1000)
  if (date.getTime() <= now) return new Date(now + 20000)
  return date
}

export const momentUrl = (view) => `/?momento=${view}`
