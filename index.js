const tBox = document.getElementById('grid')
const gameStatus = document.getElementById('status')
const restartButton = document.querySelector('#restart')
const clickSquare = document.querySelector('.square')

let currentPlayer = 'Player1'
let gameActive = true
const winnerMessage = `${currentPlayer} won! Good job~!`
const drawMessage = `The game is a draw, try harder next time!`
let gameBoardStatus = ['','','','','','','','','']
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function determineWinner() {
    let gameWon = false
    for (let i = 0; i <=7; i++) {
        const winCondition = winningConditions[i]
        let compare1 = gameBoardStatus[winCondition[0]]
        let compare2 = gameBoardStatus[winCondition[1]]
        let compare3 = gameBoardStatus[winCondition[2]]
        if (compare1 === '' || compare2 === '' || compare3 === '') {
            // console.log(compare1)
            // console.log(compare2)
            // console.log(compare3)
            continue;
        } else if (compare1 === compare2 && compare2 === compare3) {
            gameWon = true;
            break;
        }
    }
    let gameDraw = !gameBoardStatus.includes('')
    if (gameWon) {
        gameStatus.innerText = winnerMessage
        gameActive = false
        return
    } else if (gameDraw) {
        gameStatus.innerText = drawMessage
        gameActive = false
        return
    } else {
        const currentPlayerTurn = `It's ${currentPlayer}'s turn.`
        gameStatus.innerText = currentPlayerTurn
    }
}


function clickedOrNot(event) {
    const clickedId = parseInt(event.target.getAttribute('id'))
    if (gameBoardStatus[clickedId] !== '' || !gameActive) {
        return
    } else {
        if (currentPlayer === 'Player1') {
            event.target.style.backgroundColor = 'black';   
            gameBoardStatus[clickedId] = currentPlayer
            currentPlayer = 'Player2';
        } else {
            event.target.style.backgroundColor = 'pink';    
            gameBoardStatus[clickedId] = currentPlayer
            currentPlayer = 'Player1';
        }  
    }
    determineWinner()
}



function clickedRestart() {
    gameBoardStatus = ['','','','','','','','','']
    currentPlayer='Player1'
    gameActive = true
    const currentPlayerTurn = `It's ${currentPlayer}'s turn.`
    gameStatus.innerText = gameStatus.innerText = currentPlayerTurn
}

function makeGrid() {
    while (tBox.firstChild) {
        tBox.removeChild(tBox.firstChild)
    }   
    
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.setAttribute('class', 'square')
        tBox.appendChild(square)
        square.addEventListener('click', clickedOrNot)
    }
    const currentPlayerTurn = `It's ${currentPlayer}'s turn.`
    gameStatus.innerText = currentPlayerTurn
}
document.addEventListener('DOMContentLoaded', makeGrid)

restartButton.addEventListener('click', makeGrid)
restartButton.addEventListener('click', clickedRestart)
