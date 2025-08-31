import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Sidebar from "../../components/Sidebar";
import HistoryTable from "../car/HistoryTable";

function HistoryPage() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#242424", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container fluid className="mt-4 flex-grow-1">
        <Row>
          <Col md={2}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={false} loadingUser={false} />
          </Col>
          <Col md={10}>
            <HistoryTable />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default HistoryPage;
