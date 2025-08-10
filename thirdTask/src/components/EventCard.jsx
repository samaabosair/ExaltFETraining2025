// EventCard.jsx
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const today = new Date();
  const eventDate = new Date(event.date);

  let bgColor = "#9b5c9eff";
  if (eventDate.toDateString() === today.toDateString()) bgColor = "#8ca7dcff";
  else if (eventDate < today) bgColor = "#761212ff";

  return (
    <div
      onClick={() => navigate(`/edit/${event.id}`)}
      style={{
        padding: "30px",
        backgroundColor: bgColor,
        color: "white",
        borderRadius: "15px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        marginBottom: 0,
        userSelect: "none",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <h3>{event.title}</h3>
      <p>{new Date(event.date).toLocaleString()}</p>
    </div>
  );
}
