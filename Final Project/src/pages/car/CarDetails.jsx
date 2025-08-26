import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../services/carService";
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
import Sidebar from "../../components/Sidebar";

function CarDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState(""); // فقط للـSidebar

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const car = cars.find((c) => c.id === id);

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
        <Row>
          {/* Main Content */}
          <Col md={10}>
            <Row>
              <Col md={6}>
                {car.images && car.images.length > 0 && (
                  <Carousel variant="dark">
                    {car.images.map((img, index) => (
                      <Carousel.Item key={index}>
                        <Image
                          src={img}
                          alt={`${car.brand} ${index + 1}`}
                          fluid
                          rounded
                          style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </Col>

              <Col md={6}>
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

                  <Button variant="primary">Rent Now</Button>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default CarDetails;
