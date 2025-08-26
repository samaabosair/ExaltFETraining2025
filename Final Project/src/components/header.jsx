// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import AddCarModal from "../pages/admin/AddCarModal";

function Header({  }) {
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
    <Navbar bg="black" expand="lg" className="shadow-sm mb-3 py-2">
      <Container>
        <Navbar.Brand
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Image
            src="/carlogo.jpg" 
            alt="Logo"
            width={40}
            height={40}
            roundedCircle
          />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              color: "#ffdd57",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
          >
            Car Rental
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            {isAdmin && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              style={{ fontWeight: "bold" }}
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
