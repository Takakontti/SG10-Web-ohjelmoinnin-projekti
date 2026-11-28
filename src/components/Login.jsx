import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './Login.css'

const API_URL = '/api'

const LoginPost = async (username, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { username, password })
  return response.data
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState ({})
  const redirectTimer = useRef(null)

  const navigate = useNavigate()

  // Black magic to remove redircet when page is unmounted.
  useEffect(() => {
    return () => clearTimeout(redirectTimer.current) 
  }, [])

  const mainPage = () => {
    navigate('/')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!username.trim()) newErrors.username = 'Käyttäjätunnus tai sähköposti vaaditaan.'
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

      setSuccess({form: 'Kirjautuminen onnistui! Sinut uudelleenohjataan 3 sekunnin päästä'})
      redirectTimer.current = setTimeout(() => {
        navigate('/', { state: { loginSuccess: true }, replace: true })
      }, 3000)
    } catch {
      setErrors({ form: 'Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana.' })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="login-wrapper">
      <div className="login-form-container">
      <Button className='back-button' onClick={mainPage}>
        <i className='bi bi-arrow-left-square' aria-hidden='true' />
      </Button>
        <h2 className="login-title">Kirjaudu sisään</h2>
        <Form onSubmit={handleSubmit}>
          {errors.form && <Alert className='login-error' variant="danger" role="alert">{errors.form}</Alert>}
          {success.form && <Alert className='login-success' variant="success" role="alert">{success.form}</Alert>}
          <Form.Group className="login-field-group" controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Käyttäjätunnus / Sähköposti"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                // Tyhjentää errorit kun kenttään kirjoitetaan
                setErrors((currentErrors) => ({ ...currentErrors, username: undefined, form: undefined }))
              }}
              isInvalid={Boolean(errors.username)}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid" role="alert">
                {errors.username}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="login-field-group" controlId="formBasicPassword">
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
            {errors.password && (
              <Form.Control.Feedback type="invalid" role="alert">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
          </Button>
          <p className="register-prompt">
            Ei tiliä? <Link to="/Authentication/Register">Rekisteröidy</Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Login
