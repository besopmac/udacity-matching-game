// collecting all cards on board
const board = document.querySelectorAll('.card');
let cards = [...board];

// getting all cards on the deck
const deck = document.querySelector('.deck');

// init moves variables
const counter = document.querySelector('.moves');
let moves = 0;

// init moves stars
const lifes = document.querySelectorAll('.fa-star');

// getting the matched cards
let matchedCards = document.querySelectorAll('.match');

// openedCards init
let openedCards = [];


// randomize cards position
function shuffle(array) {
    let control = array.length, tempValue, index;

    while (control > 0) {
        index = Math.floor(Math.random() * control);
        control--;

        tempValue = array[control];
        array[control] = array[index];
        array[index] = tempValue;
    }

    return array;
}

// shuffle cards when page is refreshed
document.body.onload = start();


// function to start and reset the board
function start() {
    // shuffle cards
    cards = shuffle(cards);

    // clear all classes from each card and append it on deck
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset rating
    // reset timer
}


// displayCard is a function to change the card's states
let displayCard = function() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}


// adding opened cards to a list and check if they are match or not
function cardOpen() {
    openedCards.push(this);

    let len = openedCards.length;

    if (len === 2) {
        addCounter();
        if (openedCards[0].dataset.type === openedCards[1].dataset.type) {
            matched();
        } else {
            unmatched();
        }
    }
}

// when the cards data-type match
function matched() {
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open', 'no-event');
    openedCards[1].classList.remove('show', 'open', 'no-event');
    openedCards = [];
}

// when the cards data-type don't match
function unmatched() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
        openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
        enable();
        openedCards = [];
    }, 2000);
}

// disable cards by 2 seconds
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

// (r)enable cards and disable the matched cards
function enable() {
    console.log('cards enabled!');
}



// counting the player's moves
function addCounter() {
    moves++;
    counter.innerHTML = moves;

    console.log('counted!');

    // starting the timer counter
    // starting the rating logic
}


// looping and adding event listeners to each card
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    
    console.log(cards[i]);
}
