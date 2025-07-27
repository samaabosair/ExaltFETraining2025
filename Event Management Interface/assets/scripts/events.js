const nameInput = document.getElementById('name');
const descInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.getElementById('eventForm');

const events = JSON.parse(localStorage.getItem('events') || '[]');
const editIndex = localStorage.getItem('editIndex');

if (editIndex !== null) {
  const event = events[editIndex];
  nameInput.value = event.name;
  descInput.value = event.description;
  dateInput.value = event.date;
  submitBtn.textContent = 'Save';
} else {
  submitBtn.textContent = 'Add';
}

// Handle form submission
form.onsubmit = (e) => {
  e.preventDefault();

  const newEvent = {
    name: nameInput.value,
    description: descInput.value,
    date: dateInput.value,
  };

  if (editIndex !== null) {
    events[editIndex] = newEvent;
  } else {
    events.push(newEvent);
  }

  localStorage.setItem('events', JSON.stringify(events));
  localStorage.removeItem('editIndex');
  location.href = 'index.html';
};

// Cancel button
cancelBtn.onclick = () => {
  localStorage.removeItem('editIndex');
  location.href = 'index.html';
};
