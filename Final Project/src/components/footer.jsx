import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "20px 0",
        marginTop: "40px",
        color: "#bbb",
      }}
    >
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={6}>
            <h5 style={{ color: "#fff" }}>🚗 Car Rental</h5>
            <p style={{ margin: 0, fontSize: "14px" }}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <a
              href="#"
              style={{ color: "#bbb", margin: "0 10px", textDecoration: "none" }}
            >
              Privacy
            </a>
            <a
              href="#"
              style={{ color: "#bbb", margin: "0 10px", textDecoration: "none" }}
            >
              Terms
            </a>
            <a
              href="#"
              style={{ color: "#bbb", margin: "0 10px", textDecoration: "none" }}
            >
              Contact
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
