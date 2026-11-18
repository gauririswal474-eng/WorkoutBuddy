import { formatDistanceToNow } from 'date-fns'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.js'
import { deleteWorkout } from '../api.js'

export default function WorkoutDetails({ workout, onError }) {
  const { dispatch } = useWorkoutsContext()

  const handleDelete = async () => {
    try {
      const deleted = await deleteWorkout(workout._id)
      dispatch({ type: 'DELETE_WORKOUT', payload: deleted })
    } catch (err) {
      onError(err.message)
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (in Kgs): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p className="time">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <button className="delete" onClick={handleDelete} aria-label={`Delete ${workout.title}`} title="Delete">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  )
}
