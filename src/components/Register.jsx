import { Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import './Register.css'

const API_URL = '/api'

const RegisterPost = async (email, username, password) => {
  const response = await axios.post(`${API_URL}/user/register`, { email, username, password })
  return response.data
}

function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const mainPage = () => {
    navigate('/Authentication/Login')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) newErrors.email = 'Sähköpostiosoite vaaditaan.'
    if (!username.trim()) newErrors.username = 'Käyttäjätunnus vaaditaan.'
    if (password.length < 8) newErrors.password = 'Salasanan pitää olla vähintään 8 merkkiä pitkä.'
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
      await RegisterPost(email, username, password)
      navigate('/Authentication/Login', { state: { RegisterSuccess: true }, replace: true })
    } catch(error) {
      const errmesg = error.response.data.message
      setErrors({ form: errmesg})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-form-container">
        <h2 className="register-title">Rekisteröidy</h2>
        <Form onSubmit={handleSubmit}>
          {errors.form && <Alert className='register-alert' variant="danger" role="alert">{errors.form}</Alert>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sähköpostiosoite:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Sähköpostiosoite"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors((currentErrors) => ({ ...currentErrors, email: undefined, form: undefined}))
              }}
              isInvalid={Boolean(errors.email)}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Käyttäjätunnus:</Form.Label>
            <Form.Control
              type="username"
              placeholder="Käyttäjätunnus"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setErrors((currentErrors) => ({ ...currentErrors, username: undefined, form: undefined}))
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
                setErrors((currentErrors) => ({ ...currentErrors, password: undefined, form: undefined}))
              }}
              isInvalid={Boolean(errors.password)}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <div className='button-box'>
            <Button className='register-buttons' onClick={mainPage}>Takaisin</Button>
            <Button variant="primary" type="submit" className="register-buttons" disabled={isSubmitting}>
              {isSubmitting ? 'Rekisteröidytään...' : 'Rekisteröidy'}
            </Button>
          </div>

        </Form>
      </div>
    </div>
  )
}

export default Register