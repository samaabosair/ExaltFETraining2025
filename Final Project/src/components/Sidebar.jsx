import React from "react";
import { ListGroup } from "react-bootstrap";

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item
        action
        active={activeTab === "cars"}
        onClick={() => setActiveTab("cars")}
        style={{
          cursor: "pointer",
          backgroundColor: activeTab === "cars" ? "#555" : "",
        }}
      >
        Cars
      </ListGroup.Item>
      <ListGroup.Item
        action
        active={activeTab === "history"}
        onClick={() => setActiveTab("history")}
        style={{
          cursor: "pointer",
          backgroundColor: activeTab === "history" ? "#555" : "",
        }}
      >
        History
      </ListGroup.Item>
    </ListGroup>
  );
}

export default Sidebar;
