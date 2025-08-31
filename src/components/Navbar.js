import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Dads Gone Wild</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/adventures">Adventures</Nav.Link>
          <Nav.Link as={Link} to="/locations">Locations</Nav.Link>
          <Nav.Link as={Link} to="/maps">Trail Maps</Nav.Link>
          <Nav.Link as={Link} to="/booking" className="text-warning">Book Now</Nav.Link>
          <Nav.Link as={Link} to="/waitlist" className="text-info">Join Waitlist</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link} to="/terms">Terms</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
