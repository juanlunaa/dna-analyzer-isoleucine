export interface TransitionType {
  id: string
  source: string
  target: string
  label: string
  isTransitionValid: boolean
  prevTransition: string | null
}
