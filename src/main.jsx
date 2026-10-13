import { StrictMode, Suspense, lazy, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import BirthdayCountdown from './components/BirthdayCountdown.jsx'
import { getCountdownTarget, getEdition } from './editionSchedule.js'

const BirthdayEdition = lazy(() => import('./BirthdayEdition.jsx'))
const ClassicEdition = lazy(() => import('./classic/ClassicEdition.jsx'))

const countdownTarget = getCountdownTarget()

const fallback = <div style={{ minHeight: '100vh', background: '#07050a' }} />

function Root() {
  const [edition, setEdition] = useState(() => getEdition())
  // Durante la escena de medianoche el cumpleaños ya vive debajo del contador
  const [underlay, setUnderlay] = useState(false)
  const prepare = useCallback(() => setUnderlay(true), [])
  const finish = useCallback(() => setEdition('cumple'), [])

  // Cada edición ocupa siempre el mismo lugar en el árbol, así al quitar el contador
  // la página del cumpleaños no se vuelve a montar ni parpadea.
  return (
    <>
      {(edition === 'cumple' || underlay) && (
        <Suspense fallback={fallback}><BirthdayEdition /></Suspense>
      )}
      {edition === 'clasica' && (
        <Suspense fallback={fallback}><ClassicEdition /></Suspense>
      )}
      {edition === 'contador' && (
        <BirthdayCountdown target={countdownTarget} onPrepare={prepare} onFinish={finish} />
      )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
