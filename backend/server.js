import express from 'express '

import cors from 'cors'
import pool from './models/db.js'
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())


app.get('/api/health', async (req, res) => {

  const result = await pool.query('SELECT 1')

  res.json({ status: 'ok', db: 'connected' })
})


app.get('/api/todos', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM todos ORDER BY created_at DESC'
  )
  res.json(rows)
})




app.post('/api/todos', async (req, res) => {
  const { title } = req.body

  const { rows } = await pool.query(


    'INSERT INTO todos (title) VALUES ($1) RETURNING *'

    [title]


  )

  res.status(201).json(rows[0])
})


app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const { rows } = await pool.query(



    'UPDATE todos SET completed=$1 WHERE id=$2 RETURNING *'

    [completed, id]
  )

  res.json(rows[0])
})




app.delete('/api/todos/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id=$1', [req.params.id])

  res.status(204).send()
})



app.listen(PORT, () =>  console.log(` running on http://localhost:${PORT}`))
