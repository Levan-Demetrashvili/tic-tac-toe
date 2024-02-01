//^ Declare variables
const containerApp = document.querySelector('.game-container');
const boxes = Array.from(document.querySelectorAll('.boxes'));
const symbol = Array.from(document.querySelectorAll('.symbol'));
const btnsCloseModal = document.querySelectorAll('.btn');
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal-window');
//^ starting condition
let human, pc;
let randomPos;
let coordinates = ['', '-', '', '-', '', '-', '', '-', ''];
let timer = true;
let clickCounter = 0;
let pcCounter = 0;
let humanCounter = 0;
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
    console.log('hello');
    randomPos = Math.trunc(Math.random() * 9);
  } while (coordinates[randomPos] === '-');

  coordinates[randomPos] = symbol[randomPos].textContent = pc;
}

function addClassAndWinner() {
  winner = true;
  boxes.map((_, i) => {
    if (i === this.at(0) || i === this.at(1) || i === this.at(2)) boxes[i].classList.add('blink');
  });
  coordinates.fill('Not empty!!');
  console.log(coordinates);
}
function changePosition() {
  coordinates.map((el, i) => {
    if ((i === this.at(0) || i === this.at(1) || i === this.at(2)) && (el === '' || el === '-')) randomPos = i;
  });
}

function checkWinner() {
  winningCombinations.forEach((combination, i, arr) => {
    pcCounter = 0;
    humanCounter = 0;
    combination.forEach((pos, i, arr) => {
      //* add count
      if (coordinates[pos] === pc) pcCounter++;
      else if (coordinates[pos] === human) humanCounter++;

      //* If pc is one way to win
      if (humanCounter === 2) {
        console.log('human');
        changePosition.apply(arr);
      }
      if (pcCounter === 2) {
        console.log('pc');
        changePosition.apply(arr);
      }

      //* if winner is  add class
      if (pcCounter === 3) addClassAndWinner.apply(arr);
      else if (humanCounter === 3) addClassAndWinner.call(arr);
    });
  });
}

function resetGame() {
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

//! End of Functions *************************************************/
btnsCloseModal.forEach(btn => {
  btn.addEventListener('click', function () {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
    human = btn.textContent;
    pc = human === 'X' ? 'O' : 'X';
    console.log(`Human: ${human} PC : ${pc}`);
    calcDisplayFirstMove();
  });
});
//* First move

for (let i = 0; i < boxes.length; i++) {
  //* mouse down
  boxes[i].addEventListener('mousedown', function () {
    if ((coordinates[i] === '' || coordinates[i] === '-') && timer) {
      lastClick = human;
      clickCounter++;
      coordinates[i] = symbol[i].textContent = human;
    } else {
      lastClick = '';
    }
  });

  //* mouse up
  boxes[i].addEventListener('mouseup', function () {
    if (lastClick === human) {
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
        if (!winner) {
          coordinates[randomPos] = symbol[randomPos].textContent = pc;
          checkWinner();
        }
        if ((!coordinates.includes('') && !coordinates.includes('-')) || winner) setTimeout(resetGame, 3000);
      }, 500);
    }
  });
}
