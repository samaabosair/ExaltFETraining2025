const topBlock = document.querySelector('.top-block');
const bottomBlock = document.querySelector('.bottom-block');

topBlock.addEventListener('click', () => {
  topBlock.classList.add('active');
  bottomBlock.classList.remove('active');
  location.href = 'index.html';
});

bottomBlock.addEventListener('click', () => {
  bottomBlock.classList.add('active');
  topBlock.classList.remove('active');
  location.href = 'event.html';
});

