import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import './Register.css';

const API_URL = 'http://localhost:5173/api';

export const RegisterPost = async (email, username, password) => {
  const response = await axios.post(`${API_URL}/user/register`, { email, username, password});
  return response.data;
}

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const mainPage = () => {
        navigate('/Authentication/Login');
      }

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if(!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !username) {
      //setErrors('Please enter inputs in all fields.');
      return;
    }

    try {
      const userData = await RegisterPost(email, username, password);
      console.log('Register successful:', userData);
      // Store the user data here?
    } catch (error){
      //setErrors({ from: 'Käyttäjän luonti epäonnistui.'})
    }
    console.log('Register attempted with:', { email, username, password });
    // Here you would typically send a request to your server
    
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Rekisteröidy</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sähköposti osoite</Form.Label>
              <Form.Control
                type="email"
                placeholder="Sähköposti osoite"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

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

          <div className='button-box'>
            <Button className='register-buttons' onClick={mainPage}>Takaisin</Button>
            <Button variant="primary" type="submit" className="register-buttons">Rekisteröidy</Button>
          </div>

        </Form>
      </div>
    </div>
  );
}

export default Register;