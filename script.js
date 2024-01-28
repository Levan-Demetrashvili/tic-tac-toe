//^ Declare variables
const containerApp = document.querySelector('.game-container');
const boxes = Array.from(document.querySelectorAll('.boxes'));
const symbol = Array.from(document.querySelectorAll('.symbol'));
//^ starting condition
let randomPos;
let coordinates = ['', '-', '', '-', '', '-', '', '-', ''];
let timer = true;
let clickCounter = 0;
let xCounter = 0;
let oCounter = 0;
let lastClick;
let winner;
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

//^ Functions

function calcDisplayFirstMove() {
  do {
    randomPos = Math.trunc(Math.random() * 9);
  } while (coordinates[randomPos] === '-');

  coordinates[randomPos] = symbol[randomPos].textContent = 'X';
}

function addClassAndWinner() {
  winner = true;
  boxes.map((_, i) => {
    if (i === this.at(0) || i === this.at(1) || i === this.at(2)) boxes[i].classList.add('blink');
  });
}
function checkWinner() {
  winningCombinations.forEach((combination, i, arr) => {
    xCounter = 0;
    oCounter = 0;
    combination.forEach((pos, i, arr) => {
      //* add count
      if (coordinates[pos] === 'X') xCounter++;
      else if (coordinates[pos] === 'O') oCounter++;

      //* if winner is  add class
      if (xCounter === 3) addClassAndWinner.apply(arr);
      else if (oCounter === 3) addClassAndWinner.call(arr);
    });
  });
}

function resetGame() {
  if ((!coordinates.includes('') && !coordinates.includes('-')) || winner) {
    //* remove class
    winningCombinations.forEach((combination, i, arr) => {
      combination.forEach((pos, i, arr) => {
        boxes.map((_, i) => {
          if (i === arr.at(0) || i === arr.at(1) || i === arr.at(2)) boxes[i].classList.remove('blink');
        });
      });
    });
    winner = false;
    clickCounter = 0;
    lastClick = '';
    coordinates = ['', '-', '', '-', '', '-', '', '-', ''];
    symbol.map(el => (el.textContent = ''));

    calcDisplayFirstMove();
  }
}

//! End of Functions *************************************************/
calcDisplayFirstMove();
//* First move

for (let i = 0; i < boxes.length; i++) {
  //* mouse down
  boxes[i].addEventListener('mousedown', function () {
    if ((coordinates[i] === '' || coordinates[i] === '-') && timer) {
      lastClick = 'O';
      clickCounter++;
      coordinates[i] = symbol[i].textContent = 'O';
    } else {
      lastClick = '';
    }
  });

  //* mouse up
  boxes[i].addEventListener('mouseup', function () {
    if (lastClick === 'O') {
      timer = false;
      if (coordinates.includes('') || coordinates.includes('-')) {
        if (clickCounter < 3) {
          do {
            randomPos = Math.trunc(Math.random() * 9);
          } while (coordinates[randomPos] === '-' || coordinates[randomPos] !== '');
        } else {
          do {
            randomPos = Math.trunc(Math.random() * 9);
          } while (coordinates[randomPos] !== '-' && coordinates[randomPos] !== '');
        }
      }

      setTimeout(() => {
        timer = true;

        checkWinner();
        setTimeout(resetGame, 3000);
        if (!winner) {
          coordinates[randomPos] = symbol[randomPos].textContent = 'X';
          checkWinner();
        }
        setTimeout(resetGame, 3000);
      }, 500);
    }
  });
}
