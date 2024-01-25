// Declare variables
const containerApp = document.querySelector('.game-container');
const boxes = document.querySelectorAll('.boxes');
const symbol = document.querySelectorAll('.symbol');
// starting condition
const coordinates = ['', '', '', '', '', '', '', '', ''];
let timer = true;
let xCounter = 0;
let oCounter = 0;
let lastClick;
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// 1. i will start with X random position (1 to 9)
let randomPos = Math.trunc(Math.random() * 9);
coordinates[randomPos] = symbol[randomPos].textContent = 'X';

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('mousedown', function () {
    if (coordinates[i] === '' && timer) {
      lastClick = 'O';
      coordinates[i] = symbol[i].textContent = 'O';
    } else {
      lastClick = '';
    }
  });
  boxes[i].addEventListener('mouseup', function () {
    if (lastClick === 'O') {
      timer = false;
      if (coordinates.includes('')) {
        do {
          randomPos = Math.trunc(Math.random() * 9);
        } while (coordinates[randomPos] !== '');
      }
      winningCombinations.forEach((combination, i, arr) => {
        xCounter = 0;
        oCounter = 0;
        combination.forEach((pos, i, arr) => {
          //* add count
          if (coordinates[pos] === 'X') xCounter++;
          else if (coordinates[pos] === 'O') oCounter++;
          //* if winner is  add class
          if (xCounter === 3) {
            console.log('Winner : X');
          } else if (oCounter === 3) {
            boxes[pos].classList.add('blink');
            console.log('Winner : O');
          }
        });
      });

      setTimeout(() => {
        coordinates[randomPos] = symbol[randomPos].textContent = 'X';
        timer = true;
      }, 500);
    }
  });
}
