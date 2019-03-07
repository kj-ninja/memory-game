// Global scope variables
let toggledCards = [];
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.deck li');
let moves = 0;
let time = 0;
let clockOff = true;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
shuffleDeck();

/*
* Create a list that holds all of your cards
*/
function shuffleDeck() {
  const cardsToShuffle = Array.from(cards);
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

// Add functionality to the game by add event listeners
deck.addEventListener('click', function (event) {
    const clickTarget = event.target;
    if(isClickValid(clickTarget)) {
      if (clockOff) {
        startClock();
        clockOff = false;
      }
    }
    if (clickTarget.nodeName === 'LI') { // ← verifies target is desired element
      if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
          addMove();
          checkForMatch(clickTarget);
          checkScore();
        }
      }
    }
});

// Check if click is valid
function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)
  );
}

// Toggle card by changing class
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

// Add toggled card to an array of toggled card
function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
}

// Checking if the cards are match
function checkForMatch(clickTarget) {
  if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    resetToggledCards();
    matched++;
    if (matched === TOTAL_PAIRS) {
      gameOver();
    }
  } else {
      setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        resetToggledCards();
      }, 1000);
  }
}

// Add a moves counter
function addMove() {
  moves++;
  let movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

// Hiding stars function
function checkScore() {
  if (moves === 16 || moves === 24) {
    hideStar();
  }
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

// Add a clock to the game
function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

// Display the current time in the HTML
function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if  (seconds < 10) {
      clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
      clock.innerHTML = `${minutes}: ${seconds}`;
  }
}

// Stopping the Clock
function stopClock() {
  clearInterval(clockId);
}

// Toggling modal function
function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

// Function which counts and display stars
function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}

// Display modal stats function
function writeModalStats() {
  const timeStats = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStats = document.querySelector('.modal_moves');
  const starsStats = document.querySelector('.modal_stars');
  const stars = getStars();

  timeStats.innerHTML = `Time = ${clockTime}`;
  movesStats.innerHTML = `Moves = ${moves}`;
  starsStats.innerHTML = `Stars = ${stars}`;
}

// Modal cancel button
document.querySelector('.modal_cancel').addEventListener('click', function() {
  toggleModal();
})

// Modal replay game button
document.querySelector('.modal_replay').addEventListener('click', replayGame);

// Modal close button
document.querySelector('.modal_close').addEventListener('click', function() {
  toggleModal();
})

// Reset game button
document.querySelector('.restart').addEventListener('click', resetGame);

// Reset game function
function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  resetCards();
  shuffleDeck();
  resetToggledCards();
  matched = 0;
}

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

// Game over function
function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
}

// Replay game function
function replayGame() {
  resetGame();
  toggleModal();
}

// Reset cards function
function resetCards() {
  for (card of cards) {
    card.className = 'card';
  }
}

// Reset toggled cards
function resetToggledCards() {
  toggledCards = [];
}
