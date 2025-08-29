import React, { useState } from "react";
import { Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cardStyle, cardImageStyle, cardDescriptionStyle } from "./CarsList.styles";

function CarsList({ cars = [], isAdmin }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!cars || cars.length === 0) return <p>No cars available.</p>;

  const today = new Date().getTime();

  return (
    <Row xs={1} md={3} className="g-4">
      {cars.map((car) => {
        if (!car) return null;

        const isHovered = hoveredCard === car.id;

        const isUnavailable = !isAdmin && (
          car.status === "unavailable" ||
          car.rentals?.some(r => {
            const [start, end] = r.period.split(" - ").map(Number);
            return today >= start && today <= end;
          })
        );

        const cardContent = (
          <Card
            className="h-100"
            style={{
              ...cardStyle(isUnavailable, isHovered),
              cursor: isUnavailable && !isAdmin ? "not-allowed" : "pointer",
              opacity: isUnavailable && !isAdmin ? 0.5 : 1,
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              if (!isUnavailable || isAdmin) navigate(`/car/${car.id}`);
            }}
            onMouseEnter={() => setHoveredCard(car.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {car.images?.[0] && (
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
            </Card.Body>
          </Card>
        );

        return (
          <Col key={car.id}>
            {isUnavailable && !isAdmin ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${car.id}`}>Not Available</Tooltip>}
              >
                <div>{cardContent}</div>
              </OverlayTrigger>
            ) : (
              cardContent
            )}
          </Col>
        );
      })}
    </Row>
  );
}

export default CarsList;
