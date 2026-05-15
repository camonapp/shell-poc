import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExperienceStore } from '../store/experienceStore'
import type { Outcome } from '../store/experienceStore'

function parseOutcome(): Outcome {
  const raw = new URLSearchParams(window.location.search).get('outcome')
  return raw === 'success' || raw === 'error' ? raw : null
}

export default function Home() {
  const navigate = useNavigate()
  const { outcome, setOutcome } = useExperienceStore()
  const [initialOutcome] = useState<Outcome>(parseOutcome)

  useEffect(() => {
    if (initialOutcome !== null) {
      setOutcome(initialOutcome)
      navigate('/', { replace: true })
    }
  }, [initialOutcome, navigate, setOutcome])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Shell POC</h1>
      {outcome !== null ? (
        <>
          <p className="text-sm">
            Outcome recibido: <strong>{outcome}</strong>
          </p>
          <button
            onClick={() => navigate('/experience')}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold cursor-pointer"
          >
            Ir a la experiencia
          </button>
        </>
      ) : (
        <p className="text-sm text-muted">Esperando outcome por query param...</p>
      )}
    </div>
  )
}
