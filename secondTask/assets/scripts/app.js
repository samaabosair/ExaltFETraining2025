// Load events from localStorage or set an empty array
const events = JSON.parse(localStorage.getItem('events') || '[]');
const eventList = document.getElementById('eventList');

// Render event cards
function renderEvents() {
  eventList.innerHTML = '';
  const today = new Date().toISOString().split('T')[0];

  events.forEach((event, index) => {
    const eventDate = event.date.split('T')[0];
    let bgColor = '#bf7eeeff'; // Default purple
    if (eventDate < today) bgColor = '#cc2929ff'; // Red for past events
    else if (eventDate === today) bgColor = '#1566b7ff'; // Blue for today

    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundColor = bgColor;
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>${event.date}</p>
    `;

    card.onclick = () => {
      localStorage.setItem('editIndex', index);
      location.href = 'event.html';
    };

    eventList.appendChild(card);
  });
}

// Handle "+New" button click
document.getElementById('newEventBtn').onclick = () => {
  localStorage.removeItem('editIndex');
  location.href = 'event.html';
};

// Render events on page load
renderEvents();
