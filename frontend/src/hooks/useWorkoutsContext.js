import { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutsContext.jsx'

export function useWorkoutsContext() {
  const context = useContext(WorkoutsContext)
  if (!context) throw new Error('useWorkoutsContext must be used inside WorkoutsProvider')
  return context
}
