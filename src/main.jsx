import { StrictMode, Suspense, lazy, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import BirthdayCountdown from './components/BirthdayCountdown.jsx'
import MonthCountdown from './components/month/MonthCountdown.jsx'
import BackToMoments from './components/BackToMoments.jsx'
import { BIRTHDAY_START, MONTH_START, getCountdownTarget, getView } from './editionSchedule.js'

const MainEdition = lazy(() => import('./MainEdition.jsx'))
const BirthdayEdition = lazy(() => import('./BirthdayEdition.jsx'))
const MonthAnniversary = lazy(() => import('./components/month/MonthAnniversary.jsx'))
const ClassicEdition = lazy(() => import('./classic/ClassicEdition.jsx'))

const fallback = <div style={{ minHeight: '100vh', background: '#07050a' }} />

// Cada cuenta regresiva termina revelando su página, que ya está montada debajo
const COUNTDOWNS = {
  ritual: { Countdown: BirthdayCountdown, date: BIRTHDAY_START, next: 'cumple' },
  'mes-contador': { Countdown: MonthCountdown, date: MONTH_START, next: 'mes' },
}

function Root() {
  const [view, setView] = useState(() => getView())
  const [underlay, setUnderlay] = useState(false)
  const [target] = useState(() => COUNTDOWNS[view] && getCountdownTarget(COUNTDOWNS[view].date))
  const countdown = COUNTDOWNS[view]
  const prepare = useCallback(() => setUnderlay(true), [])
  const finish = useCallback(() => setView((v) => COUNTDOWNS[v]?.next ?? v), [])

  const shows = (page) => view === page || (underlay && countdown?.next === page)

  // Cada página ocupa siempre el mismo lugar en el árbol: al quitar la cuenta regresiva
  // la página revelada no se vuelve a montar ni parpadea.
  return (
    <>
      {shows('principal') && <Suspense fallback={fallback}><MainEdition /></Suspense>}
      {shows('cumple') && <Suspense fallback={fallback}><BirthdayEdition /></Suspense>}
      {shows('mes') && <Suspense fallback={fallback}><MonthAnniversary /></Suspense>}
      {shows('clasica') && <Suspense fallback={fallback}><ClassicEdition /></Suspense>}
      {countdown && <countdown.Countdown target={target} onPrepare={prepare} onFinish={finish} />}
      {['cumple', 'clasica'].includes(view) && <BackToMoments />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
