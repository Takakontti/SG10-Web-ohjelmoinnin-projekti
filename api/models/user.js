import { pool } from './db.js'
import bcrypt from 'bcrypt'

const registerUser = async (email, user, pwd) => {
    const pwdhash = await bcrypt.hash(pwd, 10)
    const result = await pool.query('INSERT INTO users(email,username,password_hash) values ($1,$2,$3) RETURNING username, email', [email, user, pwdhash])
    return result
}

export { 
    registerUser 
}