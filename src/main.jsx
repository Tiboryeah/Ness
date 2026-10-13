import { StrictMode, Suspense, lazy, useState } from 'react'
import { createRoot } from 'react-dom/client'
import BirthdayCountdown from './components/BirthdayCountdown.jsx'
import { BIRTHDAY_START, getEdition } from './editionSchedule.js'

const BirthdayEdition = lazy(() => import('./BirthdayEdition.jsx'))
const ClassicEdition = lazy(() => import('./classic/ClassicEdition.jsx'))

function Root() {
  const [edition, setEdition] = useState(() => getEdition())

  if (edition === 'contador') {
    return <BirthdayCountdown target={BIRTHDAY_START} onFinish={() => setEdition('cumple')} />
  }

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#07050a' }} />}>
      {edition === 'cumple' ? <BirthdayEdition /> : <ClassicEdition />}
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
