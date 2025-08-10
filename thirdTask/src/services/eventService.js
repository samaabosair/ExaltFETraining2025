const STORAGE_KEY = "events";

export function getEvents() {
  const events = localStorage.getItem(STORAGE_KEY);
  return events ? JSON.parse(events) : [];
}

export function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function addEvent(event) {
  const events = getEvents();
  event.id = Date.now().toString();
  events.push(event);
  saveEvents(events);
}

export function updateEvent(updatedEvent) {
  const events = getEvents();
  const index = events.findIndex(e => e.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    saveEvents(events);
  }
}

export function getEventById(id) {
  const events = getEvents();
  return events.find(e => e.id === id);
}
