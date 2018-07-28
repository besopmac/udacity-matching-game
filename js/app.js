const board = document.querySelectorAll('.card');
const cards = [...board];

// randomize cards
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
const deck = document.querySelector('.deck');

function start() {
    let shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function(item) {
            deck.appendChild(item);
        });
    }
}

// the reset button
