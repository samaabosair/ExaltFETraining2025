// src/components/Sidebar.jsx
import React from "react";
import { ListGroup } from "react-bootstrap";
import { listGroupStyle, itemStyle, itemHoverStyle } from "./Sidebar.styles";

function Sidebar({ activeTab, setActiveTab, isAdmin, loadingUser }) {
  // أثناء تحميل بيانات المستخدم، لا نعرض Sidebar
  if (loadingUser) return null;

  return (
    <ListGroup variant="flush" style={listGroupStyle}>
      <ListGroup.Item
        action
        style={itemStyle(activeTab === "cars")}
        onClick={() => setActiveTab("cars")}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, itemStyle(activeTab === "cars"))}
      >
        Cars
      </ListGroup.Item>

      {!isAdmin && (
        <ListGroup.Item
          action
          style={itemStyle(activeTab === "history")}
          onClick={() => setActiveTab("history")}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, itemStyle(activeTab === "history"))}
        >
          History
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default Sidebar;
