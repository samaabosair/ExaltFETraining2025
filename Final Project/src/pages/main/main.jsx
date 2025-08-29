import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { auth } from "../../services/firebase";
import { getCars, deleteCar } from "../../services/carService";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Sidebar from "../../components/Sidebar";
import CarsList from "../car/CarsList";
import HistoryTable from "../car/HistoryTable";
import AddCarModal from "../admin/AddCarModal";

import { carsSectionStyle, carsHeaderStyle, addCarButtonStyle } from "./MainPage.styles";

function MainPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("cars");
  const [loadingUser, setLoadingUser] = useState(true);
  const [showModalAddCar, setShowModalAddCar] = useState(false);

  const queryClient = useQueryClient();

  const { data: cars = [], isLoading: isLoadingCars, isError: isCarsError } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => queryClient.invalidateQueries(["cars"]),
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(
          user.uid === "349XyZqFF9QAwwrkwT52iVQibHk2" || user.email === "admin@admin.com"
        );
      } else {
        setIsAdmin(false);
      }
      setLoadingUser(false);
    });
    return () => unsub();
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

      <Container fluid className="mt-4 flex-grow-1">
        <Row>
          {/* Sidebar only for normal users */}
          {!isAdmin && (
            <Col md={2}>
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isAdmin={isAdmin}
                loadingUser={loadingUser}
              />
            </Col>
          )}

          <Col md={isAdmin ? 12 : 10}>
            {(isAdmin || activeTab === "cars") && (
              <div style={carsSectionStyle}>
                {/* Header for Cars List */}
                <div style={carsHeaderStyle}>
                  <h4 style={{ margin: 0 }}>Cars List</h4>

                  {isAdmin && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {/* Add Car button */}
                      <button
                        style={addCarButtonStyle}
                        onClick={() => setShowModalAddCar(true)}
                      >
                        +
                      </button>

                    </div>
                  )}
                </div>

                {/* Cars list */}
                {isLoadingCars && <p>Loading cars...</p>}
                {isCarsError && <p style={{ color: "red" }}>Failed to load cars.</p>}
                {!isLoadingCars && !isCarsError && (
                  <CarsList cars={cars} isAdmin={isAdmin} deleteMutation={deleteMutation} />
                )}

                {/* Add Car modal */}
                <AddCarModal
                  show={showModalAddCar}
                  handleClose={() => setShowModalAddCar(false)}
                />
              </div>
            )}

            {!isAdmin && activeTab === "history" && <HistoryTable />}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default MainPage;
