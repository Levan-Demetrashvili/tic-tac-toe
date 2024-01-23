// Declare variables
const containerApp = document.querySelector('.game-container');
const boxes = document.querySelectorAll('.boxes');
const symbol = document.querySelectorAll('.symbol');
// starting condition
const coordinates = ['', '', '', '', '', '', '', '', ''];

// 1. i will start with X random position (1 to 9)
let randomPos = Math.trunc(Math.random() * 9);
coordinates[randomPos] = symbol[randomPos].textContent = 'X';

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('mousedown', function () {
    if (coordinates[i] === '') {
      coordinates[i] = symbol[i].textContent = 'O';
    }
  });
  boxes[i].addEventListener('mouseup', function () {
    randomPos = Math.trunc(Math.random() * 9);
    if (coordinates[i] === '')
      setTimeout(() => {
        coordinates[randomPos] = symbol[randomPos].textContent = 'X';
      }, 500);
  });
}
