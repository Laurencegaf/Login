import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'; 
import { API_ENDPOINT } from './Api';

function Dashboard() {
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();
    
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            
            setUser(null);
            navigate("/login");
            return;
        }

        try {
            const decoded_token = jwtDecode(token); 
            console.log("Decoded Token:", decoded_token); 

            if (decoded_token && decoded_token.username) {
                setUser(decoded_token); 
            } else {
               
                setUser(null);
                navigate("/login");
            }
        } catch (error) {
            console.error("Error decoding token", error);
            setUser(null); 
            navigate("/login"); 
        }
    }, [navigate]); nges

   
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setUser(null); 
        navigate("/login"); 
    };

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home" style={{ color: '#5c4d3f' }}>Scent Aura</Navbar.Brand> 
                    <Nav className="me-auto">
                        <Nav.Link href="#home" style={{ color: '#5c4d3f' }}>Catalogue</Nav.Link>
                        <Nav.Link href="#series" style={{ color: '#5c4d3f' }}>Shop</Nav.Link>
                        <Nav.Link href="#movies" style={{ color: '#5c4d3f' }}>Solutions</Nav.Link>
                    </Nav>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown title={user ? `User: ${user.username}` : 'Loading...'} id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Add more Dashboard content here */}
        </>
    );
}

export default Dashboard;
