
export const cardStyle = (isUnavailable, isHovered) => ({
  opacity: isUnavailable ? 0.5 : 1,
  background: "linear-gradient(145deg, #1e1e1e, #2a2a2a)",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  transform: isHovered ? "scale(1.03)" : "scale(1)",
  boxShadow: isHovered
    ? "0 6px 20px rgba(0,0,0,0.6)"
    : "0 2px 10px rgba(0,0,0,0.4)",
});

export const cardImageStyle = {
  height: "200px",
  objectFit: "cover",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

export const cardDescriptionStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginBottom: "10px",
};
