# Backend: Workout Buddy API (Express + MongoDB Atlas + Mongoose)

## Run
```
cd backend
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev
```
Edit `.env`:
| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `CLIENT_URL` | Frontend origin allowed by CORS (empty = allow all) |

## Structure
`models/Workout.js` (schema), `controllers/workoutController.js`, `routes/workouts.js`, `middleware/errorHandler.js`, `app.js`, `server.js`.

## Workout model
`title` (required), `load` (required number), `reps` (required number), plus `createdAt` / `updatedAt` timestamps.

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/workouts` | All workouts, latest first |
| POST | `/api/workouts` | Create a workout `{ title, load, reps }` |
| DELETE | `/api/workouts/:id` | Delete a workout by id |

## Validation and errors
Errors come back as `{ "error": "message", "emptyFields": ["title", ...] }` so the frontend can highlight fields.
- Missing fields: 400 (`Please fill in all the fields`)
- `load` below 0 / not a number, or `reps` not a whole number of 1 or more: 400
- Invalid id: 400, workout not found: 404, bad JSON: 400, unknown route: 404
