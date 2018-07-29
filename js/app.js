// collecting all cards on board
const board = document.querySelectorAll('.card');
const cards = [...board];

// getting all cards on the deck
const deck = document.querySelector('.deck');

// openedCards init
let openedCards = [];


// displayCard is a function to change the card's states
let displayCard = function() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}


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

// deck all cards on deck
function start() {
    let shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function(item) {
            deck.appendChild(item);
        });
    }
}

document.body.onload = start();

// adding opened cards to a list and check if they are match or not
function cardOpen() {
    openedCards.push(this);

    let len = openedCards.length;

    if (len === 2) {
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


// looping and adding event listeners to each card
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    
    console.log(cards[i]);
}
