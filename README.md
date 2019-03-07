# Memory Game Project

![alt text](https://github.com/kj-ninja/memory-game/blob/master/img/memory-game-snippet.png "Memory game snippet photo")

## Table of Contents

* [What is the Memory Game](#whatIsTheMemoryGame)
* [Instructions](#instructions)
* [How to play](#howToPlay)
* [Dependencies](#dependencies)

## What is the Memory Game

Memory game is a simple game which is checking users memory by deck of 16 cards.
Game is counting users number of moves, time and star rating, when player stars with 3
stars rating.

## Instructions

* Just click a cards and try to match all 8 pairs.
* Keep toggling a cards and try to remember each unveiled card.
* Your task is to match cards in less time and moves.
* After 16 moves your star rating is decrease to 2 stars and after 24 moves to 1 star.
* In the end od game you will see a board with your current stats.

## How to play

Just clone or download my project and load **index.html** in your browser.

## Dependencies

I built the Memory Game with _HTML_, styled by _CSS_ and manipulated the DOM by pure _JavaScript_.

* created a deck of cards that shuffles when game is refreshed or restart
* created a moves, time and star rating counters
* added click event listeners to cards for changing their classes
* added effects to cards when they match or not
* create a pop-up modal when player wins game
