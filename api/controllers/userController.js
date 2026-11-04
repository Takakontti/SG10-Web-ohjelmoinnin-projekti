import { registerUser } from '../models/user.js'
import { checkForExistingUser } from '../models/user.js'
import validator from 'validator'

const createUser = async (req, res, next) => {
  const { email, username, password } = req.body
  

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
  if (username.length == 0) {
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
  } catch (error) {
    next(error)
  }

}

export {
  createUser
}