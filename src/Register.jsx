import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import "bootstrap/dist/css/bootstrap.css";  
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  
import Button from 'react-bootstrap/Button';  
import Form from 'react-bootstrap/Form';  
import { API_ENDPOINT } from './Api';  

function Register() {  
    const navigate = useNavigate();  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [error, setError] = useState('');  
    const [success, setSuccess] = useState('');  

    useEffect(() => {  
        const token = localStorage.getItem('token');  
        if (token) {  
            navigate("/dashboard");  
        }  
    }, [navigate]);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        setError('');  
        setSuccess('');  

        if (password !== confirmPassword) {  
            setError("Passwords do not match.");  
            return;  
        }  

        try {  
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, {  
                username,  
                password  
            });  

            if (response.data.success) {  
                setSuccess('Registration successful! You can now log in.');  
                setTimeout(() => {   
                    navigate("/login");  
                }, 2000);  
            } else {  
                setError('Registration failed. Please try again.');  
            }  
        } catch (err) {  
            if (err.response?.status === 409) {  
                setError('Username already exists');  
            } else {  
                setError('An unexpected error occurred during registration.');  
            }  
            console.error('Registration error:', err);  
        }  
    };  

    const commonInputStyle = { 
        borderRadius: '4px', 
        marginBottom: '10px', 
        height: '32px', 
        fontSize: '14px', 
        padding: '4px 8px' 
    };

    return (  
        <div style={{  
            background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',  
            height: '100vh',  
            display: 'flex',  
            alignItems: 'center',  
            justifyContent: 'center',  
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",  
        }}>  
            <Container>  
                <Row className="justify-content-md-center">  
                    <Col md={4}>  
                        <div className="card" style={{  
                            backgroundColor: '#ffffff',  
                            borderRadius: '10px',  
                            padding: '20px',  
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  
                        }}>  
                            <h2 style={{  
                                color: '#3b3a36',  
                                fontWeight: '600',  
                                fontSize: '18px',  
                                marginBottom: '15px',  
                                textAlign: 'center',  
                            }}>  
                                Register  
                            </h2>  

                            <Form onSubmit={handleSubmit}>  
                                <Form.Group controlId="formUsername">  
                                    <Form.Label style={{ fontSize: '12px', fontWeight: '600', color: '#3b3a36' }}>  
                                        Username:  
                                    </Form.Label>  
                                    <Form.Control  
                                        type="text"  
                                        placeholder="Enter Username"  
                                        value={username}  
                                        onChange={(e) => setUsername(e.target.value)}  
                                        required  
                                        style={commonInputStyle}  
                                    />  
                                </Form.Group>  

                                <Form.Group controlId="formPassword">  
                                    <Form.Label style={{ fontSize: '12px', fontWeight: '600', color: '#3b3a36' }}>  
                                        Password:  
                                    </Form.Label>  
                                    <Form.Control  
                                        type="password"  
                                        placeholder="Enter Password"  
                                        value={password}  
                                        onChange={(e) => setPassword(e.target.value)}  
                                        required  
                                        style={commonInputStyle}  
                                    />  
                                </Form.Group>  

                                <Form.Group controlId="formConfirmPassword">  
                                    <Form.Label style={{ fontSize: '12px', fontWeight: '600', color: '#3b3a36' }}>  
                                        Confirm Password:  
                                    </Form.Label>  
                                    <Form.Control  
                                        type="password"  
                                        placeholder="Confirm Password"  
                                        value={confirmPassword}  
                                        onChange={(e) => setConfirmPassword(e.target.value)}  
                                        required  
                                        style={commonInputStyle}  
                                    />  
                                </Form.Group>  

                                <div style={{ marginTop: '10px', marginBottom: '15px' }}>  
                                    {error && <p style={{ color: 'red', fontSize: '12px', fontWeight: '600' }}>{error}</p>}  
                                    {success && <p style={{ color: 'green', fontSize: '12px', fontWeight: '600' }}>{success}</p>}  
                                </div>  

                                <Button  
                                    variant="primary"  
                                    type="submit"  
                                    style={{  
                                        width: '100%',  
                                        borderRadius: '4px',  
                                        backgroundColor: '#5c4d3f',  
                                        borderColor: '#5c4d3f',  
                                        padding: '6px 0',  
                                        fontSize: '14px',  
                                    }}  
                                >  
                                    Register  
                                </Button>  
                            </Form>  
                        </div>  
                    </Col>  
                </Row>  
            </Container>  
        </div>  
    );  
}  

export default Register;
