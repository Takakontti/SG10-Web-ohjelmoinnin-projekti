import { verifyUser } from '../models/login.js'

const login = async (req, res, next) => {
  const { email, username, password } = req.body

  try {
    const result = await verifyUser(email, username, password)
    if (result) {
      return res.status(200).json({ message: "Login succesful", token: "ABC"})
    }
    else {
      return res.status(401).json({ message: "Invalid credentials" })
    }
  }
  catch(err) {
    next(err)
  }
}

export { 
  login 
}