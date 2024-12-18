import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Navbar, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_ENDPOINT } from './Api';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to Dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Validate fields
    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_ENDPOINT}/api/auth/login`, {
        username,
        password: password, // Assuming this is correct as per backend requirements
      });

      if (response.data?.token) {
        // Store the token and user info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ username }));
        setIsAuthenticated(true); // Update authentication state in App
        navigate('/Dashboard', { replace: true });
      } else {
        setError('Unexpected response from server. Please try again later.');
      }
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);

      // Handle different error statuses
      if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else if (err.response?.status === 400) {
        setError('Invalid request. Please check your input.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar
        style={{
          background: 'linear-gradient(135deg,rgb(22, 65, 10) 0%, #2575fc 100%)',
          padding: '1rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#fff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            PORN HUB
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-md-center" style={{ marginTop: '10vh' }}>
          <Col md={4}>
            <div
              className="card"
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                borderRadius: '12px',
                background: '#ffffff',
                padding: '20px',
              }}
            >
              <div className="card-body">
                <h4
                  className="text-center"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: '700',
                    color: '#333',
                  }}
                >
                  Login
                </h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      style={{
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        padding: '10px',
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={{
                          borderRadius: '5px',
                          border: '1px solid #ddd',
                          padding: '10px',
                        }}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{
                          borderRadius: '0 5px 5px 0',
                          background: '#6a11cb',
                          color: '#fff',
                          border: 'none',
                        }}
                      >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </Form.Group>
                  {error && (
                    <p
                      className="text-danger mt-2"
                      style={{
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  <Button
                    variant="dark"
                    type="submit"
                    className="w-100 mt-3"
                    style={{
                      background: 'linear-gradient(135deg,rgb(13, 78, 9) 0%, #2575fc 100%)',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '12px 0',
                      fontWeight: 'bold',
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <div className="text-center mt-3">
                    <Link
                      to="/Register"
                      className="text-decoration-none"
                      style={{
                        color: '#6a11cb',
                        fontWeight: 'bold',
                      }}
                    >
                      Create an account
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;