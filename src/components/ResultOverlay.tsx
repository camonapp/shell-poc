import { useNavigate } from 'react-router-dom'
import { useExperienceStore } from '../store/experienceStore'

export default function ResultOverlay() {
  const { outcome, phase, reset } = useExperienceStore()
  const navigate = useNavigate()

  if (phase !== 'result') return null

  const isSuccess = outcome === 'success'

  const handleComplete = () => {
    window.parent.postMessage({ type: 'experience:complete', success: isSuccess }, '*')

    reset()
    navigate('/')
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/65 backdrop-blur-md">
      <h2 className={`text-4xl font-bold ${isSuccess ? 'text-success' : 'text-error'}`}>
        {isSuccess ? '¡Ganaste!' : 'Mejor suerte la próxima'}
      </h2>
      <button
        onClick={handleComplete}
        className={`px-10 py-3 text-base font-semibold rounded-lg border-0 cursor-pointer text-white ${isSuccess ? 'bg-success' : 'bg-error'}`}
      >
        {isSuccess ? 'Continuar' : 'Cerrar'}
      </button>
    </div>
  )
}
