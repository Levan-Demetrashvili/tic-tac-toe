// Declare variables
const containerApp = document.querySelector('.game-container');
const boxes = document.querySelectorAll('.boxes');
const symbol = document.querySelectorAll('.symbol');
// starting condition
const coordinates = ['', '', '', '', '', '', '', '', ''];
let timer = true;
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
      coordinates[i] = symbol[i].textContent = 'O';
    }
  });
  boxes[i].addEventListener('mouseup', function () {
    timer = false;
    if (coordinates.includes('')) {
      do {
        randomPos = Math.trunc(Math.random() * 9);
      } while (coordinates[randomPos] !== '');
    }
    winningCombinations.forEach((combination, i, arr) => {
      combination.forEach((pos, i, arr) => {
        console.log(
          coordinates.every((coord, index) => {
            if (index == pos) {
              coord[index] === 'X';
            }
          })
        );
      });
    });

    setTimeout(() => {
      coordinates[randomPos] = symbol[randomPos].textContent = 'X';
      timer = true;
    }, 500);
  });
}
