import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
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

          <Button variant="primary" type="submit" className="login-button">
            Rekisteröidy
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;