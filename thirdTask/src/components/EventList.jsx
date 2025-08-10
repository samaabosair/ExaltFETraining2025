import EventCard from "./EventCard";

export default function EventList({ events }) {
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",       
      gap: "20px",           
      justifyContent: "flex-start" 
    }}>
      {events.map((ev) => (
        <EventCard key={ev.id} event={ev} />
      ))}
    </div>
  );
}
