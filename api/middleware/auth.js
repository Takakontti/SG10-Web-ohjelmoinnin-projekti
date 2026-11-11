import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { pool } from '../models/db.js'

dotenv.config()

const requireAuth = async (req, res, next) => {
  const token = req.cookies?.auth

  if (!token)
    return res.status(401).json({ error: 'Kirjautuminen vaaditaan' })

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'], issuer: 'MovCha'
    })
  } catch {
    return res.status(401).json({ error: 'Istunto ei ole voimassa' })
  }

  try {
    const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [payload.sub])

    if (result.rows.length === 0)
      return res.status(401).json({ error: 'Käyttäjää ei löydy' })

    req.user = result.rows[0]
    return next()
  } catch (error) {
    return next(error)
  }
}

export { requireAuth }