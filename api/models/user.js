import { pool } from './db.js'
import bcrypt from 'bcrypt'

const registerUser = async (email, user, pwd) => {
    const pwdhash = await bcrypt.hash(pwd, 10)
    const result = await pool.query('INSERT INTO users(email,username,password_hash) values ($1,$2,$3) RETURNING username, email', [email, user, pwdhash])
    return result
  },
  checkForExistingUser = async (email, user) => {
    const result = await pool.query('SELECT username, email FROM users WHERE email = $1 OR username = $2', [email, user])
    return result
  },
  verifyUser = async (email, user, pwd) => {
    const result = await pool.query('SELECT id, password_hash FROM users WHERE email = $1 AND username = $2', [email, user])
    if (result.rows.length === 0) {
      return false
    }
    const valid = await bcrypt.compare(pwd, result.rows[0].password_hash)
    if (!valid) {
      return false
    }

    return { id: result.rows[0].id }

  }

export { 
  registerUser,
  checkForExistingUser,
  verifyUser
}