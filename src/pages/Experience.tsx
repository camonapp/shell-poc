import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useExperienceStore } from '../store/experienceStore'
import type { Outcome } from '../store/experienceStore'
import ExperienceScene from '../components/scene/ExperienceScene'
import ResultOverlay from '../components/ResultOverlay'
import Loading from '../components/Loading'

function parseOutcome(): Outcome {
  const raw = new URLSearchParams(window.location.search).get('outcome')
  return raw === 'success' || raw === 'error' ? raw : null
}

export default function Experience() {
  const navigate = useNavigate()
  const { outcome, setOutcome } = useExperienceStore()
  const [initialOutcome] = useState<Outcome>(parseOutcome)

  useEffect(() => {
    if (initialOutcome !== null) {
      setOutcome(initialOutcome)
    }
    navigate('/experience', { replace: true })
  }, [initialOutcome, navigate, setOutcome])

  if (outcome === null) return <Loading />

  return (
    <div className="w-screen h-screen relative bg-bg">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ExperienceScene />
      </Canvas>
      <ResultOverlay />
    </div>
  )
}
