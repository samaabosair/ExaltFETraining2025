import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import AddCarModal from "../pages/admin/AddCarModal";
import { 
  navbarStyle, 
  brandStyle, 
  brandTextStyle, 
  adminButtonContainer,
  logoutButtonStyle 
} from "./Header.styles";

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModalAddCar, setShowModalAddCar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(user.uid === "349XyZqFF9QAwwrkwT52iVQibHk2");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
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

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            {isAdmin && (
              <div style={adminButtonContainer}>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => setShowModalAddCar(true)}
                >
                  +
                </Button>
                <AddCarModal
                  show={showModalAddCar}
                  handleClose={() => setShowModalAddCar(false)}
                />
              </div>
            )}
            <Button
              variant="outline-warning"
              size="sm"
              onClick={handleLogout}
              style={logoutButtonStyle}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
