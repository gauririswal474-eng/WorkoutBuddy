# Workout Buddy (MERN CRUD + Context)

- `backend/`: Express + MongoDB Atlas + Mongoose REST API (see `backend/Readme.md`)
- `frontend/`: React app using Context + useReducer (see `frontend/Readme.md`)

## How to run both
1. Create a free cluster on MongoDB Atlas, add a database user, allow your IP in Network Access and copy the connection string.
2. Backend:
   ```
   cd backend
   npm install
   cp .env.example .env     # paste your Atlas string into MONGO_URI
   npm run dev
   ```
3. Frontend (new terminal):
   ```
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
4. Open `http://localhost:5173`.

On Windows PowerShell use `copy .env.example .env` instead of `cp`.
