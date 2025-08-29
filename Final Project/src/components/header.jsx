import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

import {
  navbarStyle,
  brandStyle,
  brandTextStyle,
  logoutButtonStyle
} from "./Header.styles";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        {/* Logo + Title */}
        <Navbar.Brand style={brandStyle}>
          <Image
            src="/carlogo.jpg"
            alt="Logo"
            width={40}
            height={40}
            roundedCircle
          />
          <span style={brandTextStyle}>Car Rental</span>
        </Navbar.Brand>

        {/* Right side */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            {isLoggedIn && (
              <Button
                variant="outline-warning"
                size="sm"
                onClick={handleLogout}
                style={logoutButtonStyle}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
