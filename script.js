// Initial data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let player = '';
let warning = '';
let playing = false;
reset()

// Events

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    
    if(playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }

   
}


function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    
    // player =(random === 0 ) ? 'x' : 'o';  forma simplificada
    if(random === 0) {
        player = 'x';
    } else {
        player = 'o';
    }
   // console.log(player) para testar

   for(let i in square) {
        square[i] = '';
   }

   playing = true;

   renderSquare();
   renderInfo();

}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item =${i}]`);
        item.innerHTML = square[i];

        /*
        if(square[i] !== '') {
            item.innerHTML = square[i];
        }else{
            item.innerHTML = '';
        }*/
    }
    checkGame();
    

};
function togglePlayer() {
   // player = (player === 'o') ? 'x' : 'o';
    if(player === 'o') {
        player = 'x';
    } else {
        player = 'o';
    };
    renderInfo();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
};

function checkGame() {
    if(ceckWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(ceckWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}   

function ceckWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');//  ex: a1, a2, a3
        let hasWon = pArray.every( option => square[option] === player);
             /*if(square[option] === player) {
                return true
            } else {
                return false 
            }*/
        if(hasWon) {
            return true;
        }
        
    }
    
    return false;
};

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
};