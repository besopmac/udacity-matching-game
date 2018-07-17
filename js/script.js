let board = document.querySelector('.board');

board.addEventListener('click', function(event) {
    console.log(`You clicked on ${event.target.innerText}`);

    this.classList.add('.on');
});