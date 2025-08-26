import React from "react";
import { Card, Button } from "react-bootstrap";

function CarCard({ car, isAdmin, onClick, deleteMutation }) {
  return (
    <Card
      className="h-100 text-light"
      style={{
        cursor: "pointer",
        background: "linear-gradient(145deg, #413e3e, #2a2a2a)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        opacity: car.status === "unavailable" ? 0.5 : 1,
        transition: "all 0.3s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.4)";
      }}
    >
      {car.images && car.images[0] && (
        <Card.Img
          variant="top"
          src={car.images[0]}
          alt={car.brand}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <Card.Body>
        <Card.Title>{car.brand}</Card.Title>
        <Card.Text>{car.description}</Card.Text>
        <Card.Text>
          <strong>${car.price}/day</strong>
        </Card.Text>

        {isAdmin && (
          <div onClick={(e) => e.stopPropagation()}>
            <Button variant="warning" size="sm" className="me-2">
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteMutation.mutate(car.id)}
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default CarCard;
