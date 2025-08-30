import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../../services/carService";
import { Container, Row, Col, Card, Image, Button, Carousel } from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { pageStyle, carouselImageStyle, cardStyle, descriptionStyle } from "./CarDetails.styles";
import EditCarModal from "../admin/EditCarModal";
import RentalModal from "../rentals/RentalModal";

function CarDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRentalModal, setShowRentalModal] = useState(false);

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      window.location.href = "/main";
    },
  });

  const car = cars.find((c) => c.id === id);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setIsAdmin(user.uid === "349XyZqFF9QAwwrkwT52iVQibHk2");
    });
    return () => unsub();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!car) return <p>Car not found.</p>;

  const now = new Date().getTime();

  const isUnavailableToday = car.status === "unavailable" ||
    car.rentals?.some(r => {
      const [startStr, endStr] = r.period.split(" - ");
      const start = Number(startStr);
      const end = Number(endStr);
      return now >= start && now <= (end - 1);
    });

  return (
    <div style={pageStyle}>
      <Header />

      <Container fluid className="mt-4 flex-grow-1">
        <Row className="justify-content-center">
          <Col md={8}>
            {car.images && car.images.length > 0 && (
              <Carousel variant="dark" className="mb-4">
                {car.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={img}
                      alt={`${car.brand} ${index + 1}`}
                      fluid
                      rounded
                      style={carouselImageStyle}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}

            <Card style={cardStyle}>
              <h2>{car.brand}</h2>
              <p style={descriptionStyle}>{car.description}</p>
              <h4>${car.price}/day</h4>
              <p>Status: {isUnavailableToday ? "Not Available" : "Available"}</p>

              {isAdmin ? (
                <div>
                  <Button variant="warning" className="me-2" onClick={() => setShowEditModal(true)}>Edit</Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteMutation.mutate(car.id)}
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="warning"
                  disabled={isUnavailableToday}
                  style={{
                    cursor: isUnavailableToday ? "not-allowed" : "pointer",
                    opacity: isUnavailableToday ? 0.5 : 1,
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setShowRentalModal(true)}
                >
                  {isUnavailableToday ? "Not Available" : "Rent Now"}
                </Button>
              )}
            </Card>
          </Col>
        </Row>

        <EditCarModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          car={car}
        />

        <RentalModal
          show={showRentalModal}
          handleClose={() => setShowRentalModal(false)}
          car={car}
        />
      </Container>

      <Footer />
    </div>
  );
}

export default CarDetails;
