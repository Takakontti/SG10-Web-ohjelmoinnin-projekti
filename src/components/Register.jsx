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
  const [success, setSuccess] = useState ({})

  const navigate = useNavigate()

  const mainPage = () => {
    navigate('/Authentication/Login')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) newErrors.email = 'Sähköpostiosoite vaaditaan.'
    if (!username.trim()) newErrors.username = 'Käyttäjätunnus vaaditaan.'
    if (!password.trim()) newErrors.password = 'Salasana vaaditaan.'
    // Jos löytyy tyhjiä kenttiä, palautetaan virheet ja ei tarkisteta muita sääntöjä.
    if (newErrors.email || newErrors.username || newErrors.password) return newErrors
    if (!/[!@#$€£%&*,.?":+-]/.test(password)) newErrors.form = 'Salasanan täytyy sisältää vähintään yksi erikoismerkki'
    if (password.length < 8 && password.length !== 0) newErrors.form = 'Salasanan pitää olla vähintään 8 merkkiä pitkä.'
    if (/[\^¨~¿;|§½\\/{}()<>`´¸\[\]]/.test(password)) newErrors.form = 'Sallitut erikoismerkit ovat: !@#$€£%&*,.?":+-'
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
      function redirect(){
        navigate('/Authentication/Login', { state: { RegisterSuccess: true }, replace: true })
      }
      setSuccess({form: 'Rekisteröinti onnistui! Sinut uudelleenohjataan 3 sekunnin päästä'})
      setTimeout(redirect,3000)
    } catch(error) {
      const errmesg = error.response.data.message

      function translateErr() {
        switch (errmesg) {
          case 'Password must contain at least one uppercase letter':
            return ('Salasanan täytyy sisältää vähintään yksi iso kirjain')
          case 'Password must contain at least one lowercase letter':
            return ('Salasanan täytyy sisältää vähintään yksi pieni kirjain')
          case 'Password must contain at least one number':
            return ('Salasanan täytyy sisältää vähintään yksi numero')
          case 'Password must contain at least one special character':
            return ('Salasanan täytyy sisältää vähintään yksi erikoismerkki')
          case 'The email is already in use':
            return ('Sähköpostiosoite on jo käytössä')
          case 'The username is already in use':
            return ('Käyttäjänimi on jo käytössä')
          case 'Password contains invalid special characters valid characters are: !@#$€£%&*,.?":+-':
            return ('Sallitut erikoismerkit ovat: !@#$€£%&*,.?":+-')
          default:
            return errmesg
        }
      }

      const errMsgFI = translateErr()
      setErrors({ form: errMsgFI})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-form-container">
        <Button className='back-button' onClick={mainPage}>
          <i className='bi bi-arrow-left-square' aria-hidden='true' />
        </Button>
        <h2 className="register-title">Rekisteröidy</h2>
        <Form onSubmit={handleSubmit}>
          {errors.form && <Alert className='register-error' variant="danger" role="alert">{errors.form}</Alert>}
          {success.form && <Alert className='register-success' variant="success" role="alert">{success.form}</Alert>}
          <Form.Group className="register-field-group" controlId="formBasicEmail">
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
            {errors.email && (
              <Form.Control.Feedback type="invalid" role="alert">{errors.email}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="register-field-group" controlId="formBasicUsername">
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
            {errors.username && (
              <Form.Control.Feedback type="invalid" role="alert">{errors.username}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="register-field-group" controlId="formBasicPassword">
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
            {errors.password && (
              <Form.Control.Feedback type="invalid" role="alert">{errors.password}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="register-button" disabled={isSubmitting}>
            {isSubmitting ? 'Rekisteröidytään...' : 'Rekisteröidy'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Register