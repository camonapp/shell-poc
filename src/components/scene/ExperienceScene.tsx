import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useExperienceStore } from '../../store/experienceStore'
import type { Outcome, Phase } from '../../store/experienceStore'

interface DrumProps {
  x: number
}

function Drum({ x }: DrumProps) {
  const { outcome, phase } = useExperienceStore()
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current && phase === 'animating') {
      meshRef.current.rotation.x += delta * 8
    }
  })

  const color = getDrumColor(phase, outcome)

  return (
    <mesh ref={meshRef} position={[x, 0, 0]}>
      <cylinderGeometry args={[0.38, 0.38, 1.6, 32]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
    </mesh>
  )
}

function getDrumColor(phase: Phase, outcome: Outcome): string {
  if (phase === 'result') {
    return outcome === 'success' ? '#22c55e' : '#ef4444'
  }
  return phase === 'animating' ? '#a855f7' : '#6366f1'
}

export default function ExperienceScene() {
  const { outcome, setPhase } = useExperienceStore()

  useEffect(() => {
    if (outcome === null) return
    setPhase('animating')
    const timer = setTimeout(() => setPhase('result'), 3000)
    return () => clearTimeout(timer)
  }, [outcome, setPhase])

  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <Stars radius={80} depth={50} count={2500} factor={4} saturation={0} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 6, 5]} intensity={1.2} />
      <pointLight position={[0, 0, 4]} color="#6366f1" intensity={3} />

      <Drum x={-1.2} />
      <Drum x={0} />
      <Drum x={1.2} />
    </>
  )
}
