/*
 * Create a list that holds all of your cards
 */
const cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 // Add a timer to the Game

let time = 0;
let timer

function setTimer() {
  timer = setInterval(function() {
  time++;
  console.log(time);
  }, 1000);
}


 function clearTimer() {
   clearInterval(timer);
 }

 // Add a restart game and time button
 document.querySelector('.restart').addEventListener('click', function (e) {
   if (e.target.nodeName === 'I') {  // ← verifies target is desired element
     clearTimer();
     setTimer();
   }
 });


 function initGame() {
   const deck = document.querySelector('.deck');
   const cardHTML = shuffle(cards).map(function(card) {
     return generateCard(card);
   });

   deck.innerHTML = cardHTML.join('');

 }

initGame();
//setTimer();



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

 // Add a counter which will counts moves
 let moves = 0;
 function addMove() {
   moves++;
   const movesText = document.querySelector('.moves');
   movesText.innerHTML = moves;
 }

const allCards = document.querySelectorAll('.deck li')
let openCards = [];

 // add functionality to the game by eventlisteners
for (let i = 0; i < allCards.length; i++) {
  allCards[i].addEventListener('click', function(e) {
    if (!allCards[i].classList.contains('open') && !allCards[i].classList.contains('show') && !allCards[i].classList.contains('match')) {
       openCards.push(allCards[i]);
       allCards[i].classList.add('open', 'show');


     // Check if they match
     if (openCards.length === 2) {
       addMove();
       if (openCards[0].dataset.card === openCards[1].dataset.card) {
         openCards[0].classList.add('match');
         openCards[1].classList.add('match');
     }}


     // If cards dont match, hide
     if (openCards.length === 2) {
       setTimeout(function() {
         for (let j = 0; j < openCards.length; j++) {
           openCards[j].classList.remove('open', 'show');
         }
         openCards = [];
       }, 1000);
     }
 }
})
}






// Add a function which is gona implement counter function and will be
// decrease stars
