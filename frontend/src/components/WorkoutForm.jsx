import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.js'
import { createWorkout } from '../api.js'

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const workout = await createWorkout({ title, load, reps })
      dispatch({ type: 'CREATE_WORKOUT', payload: workout })
      setTitle(''); setLoad(''); setReps('')
      setError(null); setEmptyFields([])
    } catch (err) {
      setError(err.message)
      setEmptyFields(err.emptyFields || [])
    } finally {
      setSaving(false)
    }
  }

  const cls = (name) => (emptyFields.includes(name) ? 'error' : '')

  return (
    <form className="create" onSubmit={handleSubmit} noValidate>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={cls('title')} />

      <label>Load (in Kg's):</label>
      <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className={cls('load')} />

      <label>Reps:</label>
      <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className={cls('reps')} />

      <button disabled={saving}>{saving ? 'Adding...' : 'Add Workout'}</button>
      {error && <div className="error-box">{error}</div>}
    </form>
  )
}
