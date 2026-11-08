import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import './Login.css'

const API_URL = 'http://localhost:5173/api'

export const LoginPost = async (username, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { username, password}) // Not sure if route is right
  return response.data
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const mainPage = () => {
    navigate('/')
  }

  const authPage = () => {
    navigate('/Authentication/Register')
  }

  const validateForm = () => {
    const newErrors = {}
    if(!username) newErrors.username = 'Username is required'
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      //setErrors('Please enter inputs in all fields.');
      return
    }

    try {
      const userData = await LoginPost(username, password)
      console.log('Login successful:', userData)
      // Store the user data here?
    } catch (error){
      //setErrors({ from: 'Käyttäjän luonti epäonnistui.'})
    }
    console.log('Login attempted with:', { username, password })
    // Here you would typically send a request to your server
        
  }

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Kirjaudu sisään</h2>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Käyttäjätunnus</Form.Label>
            <Form.Control
              type="username"
              placeholder="Käyttäjätunnus"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Salasana</Form.Label>
            <Form.Control
              type="password"
              placeholder="Salasana"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Kirjaudu sisään
          </Button>
          <div className='buttons'>
            <Button className='login-buttons' onClick={mainPage}>Takaisin</Button>
            <Button className='login-buttons' onClick={authPage}>Rekisteröidy</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login