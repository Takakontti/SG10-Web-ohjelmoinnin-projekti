import { Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import './Login.css'

const API_URL = '/api'

export const LoginPost = async (username, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { username, password })
  return response.data
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const mainPage = () => {
    navigate('/')
  }

  const authPage = () => {
    navigate('/Authentication/Register')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!username.trim()) newErrors.username = 'Käyttäjätunnus vaaditaan.'
    if (!password.trim()) newErrors.password = 'Salasana vaaditaan.'
    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formErrors = validateForm()
    setErrors(formErrors)
    // Jos löytyy erroreja kutsutaan return heti ja ei lähetetä kirjautumis kutsua.
    if (Object.keys(formErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    try {
      await LoginPost(username, password)
      navigate('/', { state: { loginSuccess: true }, replace: true })
    } catch {
      setErrors({ form: 'Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Kirjaudu sisään</h2>
        <Form onSubmit={handleSubmit}>
          {errors.form && <Alert variant="danger" role="alert">{errors.form}</Alert>}
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Käyttäjätunnus:</Form.Label>
            <Form.Control
              type="username"
              placeholder="Käyttäjätunnus"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                // Tyhjentää errorit kun kenttään kirjoitetaan
                setErrors((currentErrors) => ({ ...currentErrors, username: undefined, form: undefined }))
              }}
              isInvalid={Boolean(errors.username)}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Salasana:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Salasana"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                // Tyhjentää errorit kun kenttään kirjoitetaan
                setErrors((currentErrors) => ({ ...currentErrors, password: undefined, form: undefined }))
              }}
              isInvalid={Boolean(errors.password)}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
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