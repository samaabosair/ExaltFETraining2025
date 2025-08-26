// src/pages/MainPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, ListGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { getCars, deleteCar } from "../../services/carService";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar";
import CarsList from "../car/CarsList";
import HistoryTable from "../car/HistoryTable";

function MainPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("cars"); // "cars" or "history"
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(user.uid === "349XyZqFF9QAwwrkwT52iVQibHk2");
      }
    });
    return () => unsubscribe();
  }, []);

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

    {/* Main content should grow and push footer down */}
    <Container fluid className="mt-4 flex-grow-1">
     <Row>
  {/* Sidebar */}
  <Col md={2}>
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  </Col>

  {/* Main Content */}
  <Col md={10}>
    {activeTab === "cars" && (
      <>
        {isLoading && <p>Loading cars...</p>}
        {isError && <p style={{ color: "red" }}>Failed to load cars.</p>}

        <CarsList cars={cars} isAdmin={isAdmin} deleteMutation={deleteMutation} />
      </>
    )}

    {activeTab === "history" && (
      <HistoryTable history={[{ car: "Toyota Corolla", user: "John Doe", rentDate: "2025-08-20", returnDate: "2025-08-25", status: "Returned" }]} />
    )}
  </Col>
</Row>

    </Container>

    {/* Footer stays at bottom */}
    <Footer />
  </div>
);

}

export default MainPage;
