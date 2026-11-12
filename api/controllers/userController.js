import { registerUser, checkForExistingUser, verifyUser, getUserByID} from '../models/user.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const cookieName = 'auth'
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
}

function issueCookie(res, user) {
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30m', algorithm: 'HS256', issuer: 'MovCha'
  })
  res.cookie(cookieName, token, { ...cookieOptions, maxAge: 30 * 60 * 1000 })
}

const login = async (req, res, next) => {
    const { username, password } = req.body || {}

    // Tarkistetaan että tarvitut kentät ei ole tyhjät tai niissä ei ole pelkkiä välilyöntejä.
    if ([username, password].some((value) => typeof value !== 'string' || value.trim() === '')) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    try {
      const result = await verifyUser(username, password)
      if (result) {
        issueCookie(res, result)
        return res.status(200).json({ message: 'Login successful'})
      }
      else {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
    }
    catch(err) {
      next(err)
    }
  }, 
  createUser = async (req, res, next) => {
    const { email, username, password } = req.body || {}

    if ([email, username, password].some((value) => typeof value !== 'string' || value.trim() === '')) {
      return res.status(400).json({ message: 'Email, Username and password are required' })
    }
    
    // Tarkistetaan salasanan pituus ja monimutkaisuus.
    if (!password || password.length < 8) {
      return res.status(422).json({ message: 'Password must be at least 8 characters' })
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(422).json({ message: 'Password must contain at least one uppercase letter' })
    }
    if (!/[a-z]/.test(password)) {
      return res.status(422).json({ message: 'Password must contain at least one lowercase letter' })
    }
    if (!/[0-9]/.test(password)) {
      return res.status(422).json({ message: 'Password must contain at least one number' })
    }
    if (!/[!@#$%&*,.?":]/.test(password)) {
      return res.status(422).json({ message: 'Password must contain at least one special character' })
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: 'The provided email address is not valid' })
    }
    if (username.length === 0 || username.trim() === '') {
      return res.status(422).json({ message: 'Username is required' })
    }

    try {
    // Tarkistetaan, että sähköposti ja käyttäjänimi ei ole käytössä.
      const existingUser = await checkForExistingUser(email, username)

      if (existingUser.rows.some((data) => data.username === username)) {
        return res.status(409).json({ message: 'The username is already in use' })
      }
      if (existingUser.rows.some((data) => data.email === email)) {
        return res.status(409).json({ message: 'The email is already in use' })
      }

      const result = await registerUser(email, username, password)
      return res.status(201).json({ message: 'User created successfully', user: result.rows[0] })
    } 
    catch (error) {
      next(error)
    }
  }, 
  logout = (req, res) => {
    res.clearCookie(cookieName, cookieOptions)
    res.status(200).json({ message: 'Logout successful' })
  }, 
  getUser = async (req, res, next) => {
    try {
      const userData = await getUserByID(req.body.id)
      const username = userData[0].username
      return res.status(200).json({ message: 'User found succesfully', username })
    }
    catch (error) {
      next(error)
    }
  }

export {
  createUser,
  login,
  logout,
  getUser
}