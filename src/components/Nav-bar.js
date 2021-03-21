import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import NavDropdown from "react-bootstrap/NavDropdown";

import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar({ currentUser }) {
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    //closeMobileMenu();
    //setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      //setError("Failed to log out");
    }
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Calendar Dark Side</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="disabled" disabled>{currentUser.displayName}</Nav.Link>
            {/*
            <Nav.Link href="#features">Features</Nav.Link>
            
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            */}
          </Nav>

          <Nav>
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
