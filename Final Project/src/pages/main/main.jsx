// src/pages/MainPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, ListGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { getCars, deleteCar } from "../../services/carService";
import AddCarModal from "../admin/AddCarModal";
import Header from "../../components/header";

function MainPage() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("cars"); // "cars" or "history"

  // Fetch cars
  const fetchCars = async () => {
    const carsList = await getCars();
    setCars(carsList);
  };

  useEffect(() => {
    fetchCars();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(user.uid === "349XyZqFF9QAwwrkwT52iVQibHk2");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (carId) => {
    await deleteCar(carId);
    fetchCars();
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#242424", color: "#fff" }}>
      <Header />   
      <Container fluid className="mt-4">
        <Row>
          {/* Sidebar */}
          <Col md={2}>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                active={activeTab === "cars"}
                onClick={() => setActiveTab("cars")}
                style={{ cursor: "pointer", backgroundColor: activeTab === "cars" ? "#555" : "" }}
              >
                Cars
              </ListGroup.Item>
              <ListGroup.Item
                action
                active={activeTab === "history"}
                onClick={() => setActiveTab("history")}
                style={{ cursor: "pointer", backgroundColor: activeTab === "history" ? "#555" : "" }}
              >
                History
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Main Content */}
          <Col md={10}>
            {activeTab === "cars" && (
              <>
       


                <Row xs={1} md={3} className="g-4">
                  {cars.map((car) => (
                    <Col key={car.id}>
                      <Card className="h-100" style={{ opacity: car.status === "unavailable" ? 0.5 : 1 }}>
                        {car.images && car.images[0] && (
                          <Card.Img variant="top" src={car.images[0]} alt={car.brand} />
                        )}
                        <Card.Body>
                          <Card.Title>{car.brand}</Card.Title>
                          <Card.Text>{car.description}</Card.Text>
                          <Card.Text><strong>${car.price}/day</strong></Card.Text>

                          {isAdmin && (
                            <>
                              <Button variant="warning" size="sm" className="me-2">
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(car.id)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}

            {activeTab === "history" && (
              <Card className="p-3 shadow">
                <h4>Rental History</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Car</th>
                      <th>User</th>
                      <th>Rent Date</th>
                      <th>Return Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example row, replace with real data */}
                    <tr>
                      <td>1</td>
                      <td>Toyota Corolla</td>
                      <td>John Doe</td>
                      <td>2025-08-20</td>
                      <td>2025-08-25</td>
                      <td>Returned</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;
