# Frontend: Workout Buddy (React + Context + useReducer)

## Run
```
cd frontend
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev
```
`VITE_API_URL` is the backend URL (default `http://localhost:5000`). Start the backend first.

## State management
`src/context/WorkoutsContext.jsx` uses `useReducer` with actions:
- `SET_WORKOUTS`: set the list fetched from the backend
- `CREATE_WORKOUT`: add a workout after a successful POST
- `DELETE_WORKOUT`: remove a workout after a successful DELETE

`useWorkoutsContext` is a small hook to read the state and `dispatch`.

## UI
- Left: workout cards (title, load, reps, "x hours ago" via date-fns, delete icon)
- Right: "Add a New Workout" form with error message and red highlight on empty/invalid fields
- Two columns on desktop, stacked on mobile
