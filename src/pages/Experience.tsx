import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useExperienceStore } from '../store/experienceStore'
import ExperienceScene from '../components/scene/ExperienceScene'
import ResultOverlay from '../components/ResultOverlay'

export default function Experience() {
  const navigate = useNavigate()
  const outcome = useExperienceStore((s) => s.outcome)

  if (outcome === null) {
    navigate('/', { replace: true })
    return null
  }

  return (
    <div className="w-screen h-screen relative bg-bg">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ExperienceScene />
      </Canvas>
      <ResultOverlay />
    </div>
  )
}
