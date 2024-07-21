'use strict';

const scorePlayer0 = document.querySelector('#score--0'),
  scorePlayer1 = document.querySelector('#score--1'),
  currentScorePlayer0 = document.querySelector('#current--0'),
  currentScorePlayer1 = document.querySelector('#current--1'),
  selectedPlayer0 = document.querySelector('.player--0'),
  selectedPlayer1 = document.querySelector('.player--1'),
  diceElement = document.querySelector('.dice'),
  btnDiceRandom = document.querySelector('.btn--roll'),
  btnNewGame = document.querySelector('.btn--new'),
  btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, isPlaying, totalScores;

// Game initial conditions
const initGame = () => {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  selectedPlayer0.classList.remove('player--winner');
  selectedPlayer1.classList.remove('player--winner');
  selectedPlayer0.classList.remove('player--active');
  selectedPlayer1.classList.remove('player--active');
  selectedPlayer0.classList.add('player--active');
  diceElement.classList.add('hidden');
};
initGame();

const switchActivePlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  selectedPlayer0.classList.toggle('player--active');
  selectedPlayer1.classList.toggle('player--active');
};

// Roll the dice
btnDiceRandom.addEventListener('click', () => {
  if (isPlaying) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// Keep the points
btnHold.addEventListener('click', () => {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

// Start new game
btnNewGame.addEventListener('click', initGame);
