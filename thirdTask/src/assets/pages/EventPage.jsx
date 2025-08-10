import Header from '../../components/Header.jsx';
import { useState, useEffect } from "react";
import EventList from "../../components/EventList.jsx"
import { getEvents } from "../../services/eventService";

export default function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <EventList events={events} />
    </div>
  );
}
