import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { listGroupStyle, itemStyle, itemHoverStyle } from "./Sidebar.styles";

function Sidebar({ isAdmin, loadingUser }) {
  const location = useLocation();

  if (loadingUser) return null;

  return (
    <ListGroup variant="flush" style={listGroupStyle}>
      <ListGroup.Item
        as={Link}
        to="/main"
        style={itemStyle(location.pathname === "/main")}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, itemStyle(location.pathname === "/main"))}
      >
        Cars
      </ListGroup.Item>

      {!isAdmin && (
        <ListGroup.Item
          as={Link}
          to="/history"
          style={itemStyle(location.pathname === "/history")}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, itemStyle(location.pathname === "/history"))}
        >
          History
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default Sidebar;
