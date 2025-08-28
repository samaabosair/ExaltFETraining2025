import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { footerStyle, titleStyle, textStyle, linkStyle } from "./Footer.styles";

function Footer() {
  return (
    <footer style={footerStyle}>
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={6}>
            <h5 style={titleStyle}>Car Rental</h5>
            <p style={textStyle}>© {new Date().getFullYear()} All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <a href="#" style={linkStyle}>Privacy</a>
            <a href="#" style={linkStyle}>Terms</a>
            <a href="#" style={linkStyle}>Contact</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
