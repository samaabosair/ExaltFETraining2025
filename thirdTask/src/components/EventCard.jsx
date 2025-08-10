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
        padding: "20px",
        backgroundColor: bgColor,
        color: "white",
        borderRadius: "15px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        marginBottom: "20px",
        userSelect: "none",
        transition: "transform 0.2s ease",
        width: "210px",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3
        style={{
          margin: "0 0 10px 0",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: "1.2em",
          maxHeight: "2.4em", // 2 lines height
          wordBreak: "break-word",
        }}
        title={event.title}
      >
        {event.title}
      </h3>
      <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.85 }}>
        {new Date(event.date).toLocaleString()}
      </p>
    </div>
  );
}
