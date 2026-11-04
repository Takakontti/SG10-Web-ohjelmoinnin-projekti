import { pool } from './db.js'
import bcrypt from 'bcrypt'

const verifyUser = async (email, user, pwd) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1 AND username = $2', [email, user])
  const valid = bcrypt.compare(pwd, result.rows[0].password_hash)
  return valid
}

export { verifyUser }