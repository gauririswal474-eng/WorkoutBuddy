import { useEffect, useState } from 'react'
import { useWorkoutsContext } from './hooks/useWorkoutsContext.js'
import { getWorkouts } from './api.js'
import WorkoutDetails from './components/WorkoutDetails.jsx'
import WorkoutForm from './components/WorkoutForm.jsx'

export default function App() {
  const { workouts, dispatch } = useWorkoutsContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      dispatch({ type: 'SET_WORKOUTS', payload: await getWorkouts() })
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header><h1>Workout Budyyy</h1></header>
      <main className="pages">
        <section className="workouts">
          {error && <div className="error-box">{error} <button className="link" onClick={load}>Retry</button></div>}
          {loading && <p>Loading workouts...</p>}
          {!loading && !error && workouts.length === 0 && <p>No workouts yet. Add your first one!</p>}
          {workouts.map((w) => <WorkoutDetails key={w._id} workout={w} onError={setError} />)}
        </section>
        <WorkoutForm />
      </main>
    </>
  )
}
