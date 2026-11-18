import mongoose from 'mongoose'
import Workout from '../models/Workout.js'

// GET /api/workouts: all workouts, latest first
export const getWorkouts = async (req, res, next) => {
  try {
    res.status(200).json(await Workout.find({}).sort({ createdAt: -1 }))
  } catch (err) {
    next(err)
  }
}

// POST /api/workouts: create a workout (validates fields and returns which ones are wrong)
export const createWorkout = async (req, res, next) => {
  try {
    const { title, load, reps } = req.body || {}
    const emptyFields = []
    if (typeof title !== 'string' || !title.trim()) emptyFields.push('title')
    if (load === undefined || load === null || load === '') emptyFields.push('load')
    if (reps === undefined || reps === null || reps === '') emptyFields.push('reps')
    if (emptyFields.length) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    const invalidFields = []
    if (Number.isNaN(Number(load)) || Number(load) < 0) invalidFields.push('load')
    if (!Number.isInteger(Number(reps)) || Number(reps) < 1) invalidFields.push('reps')
    if (invalidFields.length) {
      return res.status(400).json({
        error: 'Load must be a number (0 or more) and reps must be a whole number (1 or more)',
        emptyFields: invalidFields,
      })
    }

    const workout = await Workout.create({ title: title.trim(), load: Number(load), reps: Number(reps) })
    res.status(201).json(workout)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/workouts/:id
export const deleteWorkout = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid workout id' })

    const workout = await Workout.findByIdAndDelete(id)
    if (!workout) return res.status(404).json({ error: 'Workout not found' })
    res.status(200).json(workout)
  } catch (err) {
    next(err)
  }
}
