const BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/workouts`

// Wraps fetch: returns parsed JSON or throws an Error that carries the backend message and fields.
async function request(url, options) {
  let res
  try {
    res = await fetch(url, options)
  } catch {
    throw new Error('Cannot reach the server. Please try again.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`)
    err.emptyFields = data.emptyFields || []
    throw err
  }
  return data
}

export const getWorkouts = () => request(BASE)
export const createWorkout = (workout) =>
  request(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(workout) })
export const deleteWorkout = (id) => request(`${BASE}/${id}`, { method: 'DELETE' })
