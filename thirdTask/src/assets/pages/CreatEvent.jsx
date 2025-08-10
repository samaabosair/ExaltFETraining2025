import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventForm from "../../components/EventForm";
import { getEventById, addEvent, updateEvent } from "../../services/eventService";

export default function CreatEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);

useEffect(() => {
  if (id) {
    console.log("Loading event with id:", id);
    const ev = getEventById(id);
    console.log("Found event:", ev);
    if (ev) setEventData(ev);
    else navigate("/");
  } else {
    setEventData(null);
  }
}, [id, navigate]);

  function handleSubmit(data) {
    if (id) {
      updateEvent({ ...data, id });
    } else {
      addEvent(data);
    }
    navigate("/");
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <div>
      <EventForm
        initialData={eventData || {}}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
