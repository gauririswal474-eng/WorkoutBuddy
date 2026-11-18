import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

// Global state handled with useReducer
export function workoutsReducer(state, action) {
  switch (action.type) {
    case 'SET_WORKOUTS': // set the list from the backend
      return { workouts: action.payload }
    case 'CREATE_WORKOUT': // add a new workout after POST (latest first)
      return { workouts: [action.payload, ...state.workouts] }
    case 'DELETE_WORKOUT': // remove a workout after DELETE
      return { workouts: state.workouts.filter((w) => w._id !== action.payload._id) }
    default:
      return state
  }
}

export function WorkoutsProvider({ children }) {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: [] })
  return <WorkoutsContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutsContext.Provider>
}
