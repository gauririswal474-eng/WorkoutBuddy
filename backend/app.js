import express from 'express'
import cors from 'cors'
import workoutRoutes from './routes/workouts.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || true }))
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Workout Buddy API is running' }))
app.use('/api/workouts', workoutRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
