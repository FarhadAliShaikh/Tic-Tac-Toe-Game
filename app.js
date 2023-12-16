const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('#reset-btn');
const newGameButton = document.querySelector('#new-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');
const drawMsg = document.querySelector('.match-draw');

let turnO = true; // playerO, playerO

const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 4, 8], // diagonal left to right
    [2, 4, 6], // diagonal right to left
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8] // right column
]

const restartGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add('hide');
}

boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        if (e.target.innerText === '') {
            if (turnO) {
                e.target.innerText = 'O';
                turnO = false;
            } else {
                e.target.innerText = 'X';
                turnO = true;
            }
        }
        else if(e.target.innerText != ""){
            alert("Box is already filled");
        }
        
        checkWinner();
        
    })
});

const disabledBoxes = () => {
    for(let box of boxes)
    box.disabled = true;
}

const enabledBoxes = () => {
    for(let box of boxes) {
    box.disabled = false;
    box.innerText = '';
    }
}

const showWinner = (winner) => {
    msg.innerText = `${winner}`;
    msgContainer.classList.remove('hide');
    disabledBoxes();
}

const checkWinner = () => {
    for(let pattern of winningCombos)
    {
        let index0val = boxes[pattern[0]].innerText;
        let index1val = boxes[pattern[1]].innerText;
        let index2val = boxes[pattern[2]].innerText;

        if(index0val != "" && index1val != "" && index2val != "")
        {
            if(index0val === index1val && index1val === index2val)
            {
                showWinner(index0val);
            }
            
        }
    }
}

resetButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);

