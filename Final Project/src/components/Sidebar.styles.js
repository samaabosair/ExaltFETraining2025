// src/components/Sidebar.styles.js
export const listGroupStyle = {
  background: "linear-gradient(180deg, #1e1e1e, #2a2a2a)",
  borderRadius: "12px",
  padding: "15px 10px",
  minHeight: "100vh",
  color: "#fff",
};

export const itemStyle = (isActive) => ({
  cursor: "pointer",
  backgroundColor: isActive ? "#444" : "transparent",
  color: isActive ? "#ffdd57" : "#ccc",
  fontWeight: isActive ? "bold" : "normal",
  border: "none",
  padding: "12px 20px",
  margin: "4px 1px",
  borderRadius: "20px",
  transition: "all 0.3s ease",
});

export const itemHoverStyle = {
  backgroundColor: "#555",
  color: "#ffdd57",
};
