/* Select DOM Elements */
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

/* Global Variables */
let lastHole;
let timeUp = false;
let score = 0;
let isStart = false;
let gameTime = 5; // seconds

/* Random Time */
function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/* Random Mole */
function randHole(allholes) {
  const randomIndex = Math.floor(Math.random() * allholes.length);
  const hole = holes[randomIndex];

  if (hole === lastHole) {
    return randHole(holes);
  }

  lastHole = hole;
  return hole;
}

/* Pop Up */
function popup() {
  const time = randTime(200, 800);
  const hole = randHole(holes);
  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) popup();
  }, time);
}

/* Start Game */
function startGame() {
  if (isStart) return;
  score = 0;
  scoreBoard.textContent = 0;

  timeUp = false;
  popup();

  isStart = true;

  setTimeout(() => {
    timeUp = true;
    alert(`Times up Your Score is: ${score}`);

    score = 0;
    scoreBoard.textContent = 0;

    isStart = false;
  }, gameTime * 1000);
}

/* Hit */
function hit() {
  score++;
  scoreBoard.textContent = score;
}

/* Event Listener */
moles.forEach((mole) => mole.addEventListener('click', hit));
