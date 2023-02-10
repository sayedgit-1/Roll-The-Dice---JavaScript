'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// strating conditions
let score, currentScore, activePlayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // toggle method remove the class if it is present in the element or add the class if is not present
  player1El.classList.toggle('player--active');
};

// Rolling Dice fucntionaity
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true ,
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      // current0El.textContent = currentScore; //CHANGE LATTER
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// CLICKING ON HOLD
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. CHECK IF PLAYER'S SCORE IS >=100
    if (score[activePlayer] >= 20) {
      diceEl.classList.add('hidden');

      playing = false;
      // 3. FINISH THE GAME
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
    } else {
      // 4. SWITCH TO THE NEXT PLAYER
      switchPlayer();
    }
  }
});

// RESETING EVERYTHING ON CLICKING NEW GAME BUTTON
btnNew.addEventListener('click', init);
