export const notFound = (req, res) => res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` })

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: Object.values(err.errors).map((e) => e.message).join(', '), emptyFields: Object.keys(err.errors) })
  }
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON in request body' })
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server' })
}
