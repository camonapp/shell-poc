import { create } from 'zustand'

export type Outcome = 'success' | 'error' | null
export type Phase = 'idle' | 'animating' | 'result'

interface ExperienceState {
  outcome: Outcome
  phase: Phase
  setOutcome: (outcome: Outcome) => void
  setPhase: (phase: Phase) => void
  reset: () => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  outcome: null,
  phase: 'idle',
  setOutcome: (outcome) => set({ outcome }),
  setPhase: (phase) => set({ phase }),
  reset: () => set({ outcome: null, phase: 'idle' }),
}))
