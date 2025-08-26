// src/pages/car/CarsList.jsx
import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CarsList({ cars = [], isAdmin, deleteMutation }) {
  const navigate = useNavigate();

  if (!cars || cars.length === 0) {
    return <p>No cars available.</p>;
  }

  return (
    <Row xs={1} md={3} className="g-4">
      {cars.map((car) => {
        if (!car) return null; // safety check

        return (
          <Col key={car.id}>
            <Card
              className="h-100"
              style={{
                opacity: car.status === "unavailable" ? 0.5 : 1,
                background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/car/${car.id}`)} // ⬅️ الانتقال لتفاصيل السيارة
            >
              {car.images && car.images[0] && (
                <Card.Img
                  variant="top"
                  src={car.images[0]}
                  alt={car.brand || "Car"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <Card.Body>
                <Card.Title>{car.brand || "Unknown Brand"}</Card.Title>
                <Card.Text>{car.description || "No description available"}</Card.Text>
                <Card.Text>
                  <strong>${car.price || 0}/day</strong>
                </Card.Text>
                <Card.Text>
                  Status: {car.status || "Unknown"}
                </Card.Text>

                {isAdmin && (
                  <>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={(e) => e.stopPropagation()} // عشان ما يدخل التفاصيل بالغلط
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMutation.mutate(car.id);
                      }}
                      disabled={deleteMutation.isLoading}
                    >
                      {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default CarsList;
