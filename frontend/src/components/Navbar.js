// NavigationBar.js

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function NavigationBar() {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" style={{ marginLeft: "10px" }}>Student Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ">
          <Nav.Link href="/studentcrud">Home</Nav.Link>
        </Nav>
        <Button variant="outline-light" style={{ marginLeft: "1150px" }} onClick={handleLogout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
