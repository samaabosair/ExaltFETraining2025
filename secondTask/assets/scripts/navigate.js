const topBlock = document.querySelector('.top-block');
const bottomBlock = document.querySelector('.bottom-block');

topBlock.addEventListener('click', () => {
  localStorage.setItem('activeTab', 'list');
  location.href = 'index.html';
});

bottomBlock.addEventListener('click', () => {
  localStorage.setItem('activeTab', 'form');
  location.href = 'event.html';
});
window.addEventListener('DOMContentLoaded', () => {
  const activeTab = localStorage.getItem('activeTab');
  const topBlock = document.querySelector('.top-block');
  const bottomBlock = document.querySelector('.bottom-block');

  if (activeTab === 'list') {
    topBlock.classList.add('active');
    bottomBlock.classList.remove('active');
  } else if (activeTab === 'form') {
    bottomBlock.classList.add('active');
    topBlock.classList.remove('active');
  }
});
