import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cardStyle, cardImageStyle, cardDescriptionStyle } from "./CarsList.styles";

function CarsList({ cars = [], isAdmin, deleteMutation }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!cars || cars.length === 0) {
    return <p>No cars available.</p>;
  }

  return (
    <Row xs={1} md={3} className="g-4">
      {cars.map((car) => {
        if (!car) return null; // safety check

        const isHovered = hoveredCard === car.id;

        return (
          <Col key={car.id}>
            <Card
              className="h-100"
              style={cardStyle(car.status === "unavailable", isHovered)}
              onClick={() => navigate(`/car/${car.id}`)}
              onMouseEnter={() => setHoveredCard(car.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {car.images && car.images[0] && (
                <Card.Img
                  variant="top"
                  src={car.images[0]}
                  alt={car.brand || "Car"}
                  style={cardImageStyle}
                />
              )}

              <Card.Body>
                <Card.Title>{car.brand || "Unknown Brand"}</Card.Title>
                <Card.Text style={cardDescriptionStyle}>
                  {car.description || "No description available"}
                </Card.Text>
                <Card.Text>
                  <strong>${car.price || 0}/day</strong>
                </Card.Text>
                <Card.Text>Status: {car.status || "Unknown"}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default CarsList;
