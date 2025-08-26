// src/pages/car/CarDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCars, deleteCar } from "../../services/carService";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Carousel,
} from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CarDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = React.useState(false);

  // جلب السيارات
  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  // Mutation للحذف
  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      window.location.href = "/main"; // رجوع بعد الحذف
    },
  });

  const car = cars.find((c) => c.id === id);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // غير الـ UID ده حسب الأدمن عندك
        setIsAdmin(user.uid === "349XyZqFF9QAwwrkwT52iVQibHk2");
      }
    });
    return () => unsub();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#242424",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Container fluid className="mt-4 flex-grow-1">
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Carousel */}
            {car.images && car.images.length > 0 && (
              <Carousel variant="dark" className="mb-4">
                {car.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={img}
                      alt={`${car.brand} ${index + 1}`}
                      fluid
                      rounded
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}

            {/* Card تحت الصور */}
            <Card
              className="p-4"
              style={{
                background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            >
              <h2>{car.brand}</h2>
              <p>{car.description}</p>
              <h4>${car.price}/day</h4>
              <p>Status: {car.status}</p>

              {/* أزرار حسب نوع المستخدم */}
              {isAdmin ? (
                <div>
                  <Button variant="warning" className="me-2">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteMutation.mutate(car.id)}
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              ) : (
                <Button variant="primary">Rent Now</Button>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default CarDetails;
