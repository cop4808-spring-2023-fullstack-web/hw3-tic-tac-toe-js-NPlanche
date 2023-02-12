const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

//displays winning message 
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

// --------------------------------------------------
// UPDATE 01-11-23
// --------------------------------------------------
const turnMachine = document.querySelector('.turnMachine');
const turnMe = document.querySelector('.turnMe');
const scoreMachine = document.querySelector('.scoreMachine');
const scoreMe = document.querySelector('.scoreMe');
const winnerMachine = document.querySelector('.winnerMachine');
const winnerMe = document.querySelector('.winnerMe');
let scoreMachineCount = 0;
let scoreMeCount = 0;

const turnStatus = document.querySelector('.turnStatus');

//---------------------------------


function handleTurn() {

   // turnStatus.innerHTML = currentPlayerTurn();

    if (currentPlayer == 'X'){
        turnMachine.innerHTML = 'No Active';
        turnMe.innerHTML = 'Active';
    }else {
        turnMachine.innerHTML = 'Active';
        turnMe.innerHTML = 'No Active';
    }  
    
    

}
function handleScore() {
    if (currentPlayer == 'X'){
        scoreMeCount += 1;
    }else {
        scoreMachineCount += 1;
    }    
    scoreMachine.innerHTML = scoreMachineCount;
    scoreMe.innerHTML = scoreMeCount;
}
function handleWinner() {
    if (currentPlayer == 'X'){
        winnerMachine.innerHTML = 'No Winner';
        winnerMe.innerHTML = 'Winner';
    }else {
        winnerMachine.innerHTML = 'Winner';
        winnerMe.innerHTML = 'No Winner';
    }    
}
scoreMachine.innerHTML = scoreMachineCount;
scoreMe.innerHTML = scoreMeCount;
handleTurn(currentPlayer);
// --------------------------------------------------

//condition for a player
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

//this function handles the click 
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//Check who won 
function checkWin(){
    let roundWon = false;

    //compare the game state to the winning conditions array
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        //if either a, b, or c are empty then the game is not won
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // if a, b, and c are the same then that player has won
        if (a === b && b === c) {
            //that player has won the game
            roundWon = true;
            //get out of  the loop
            break
        }
    }

    //game has been won
    //disable click
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        //game is no longer active because its be won
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";

        // --------------------------------------------------
        // UPDATE 01-11-23
        // --------------------------------------------------
        handleScore();
        handleWinner();
        // --------------------------------------------------
                
        return roundWon;
    }

    //searches to see  if the board has empty spaces
    let roundDraw = !gameState.includes("");
    //its a draw
    if (roundDraw) {
        //display draw message
        statusDisplay.innerHTML = drawMessage();
        //game no longer active, no clicking 
        gameActive = false;
        //color of the message
        statusDisplay.style.color = "rgb(251,100,204)";
        return gameActive;
    }

    return false;
}

//changes the player from x to o to x 
function handlePlayerChange() {
    //toggles the player
    //short handed if else statement
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    //displays who the current player is 
    statusDisplay.innerHTML = currentPlayerTurn();

    // --------------------------------------------------
    // UPDATE 01-11-23
    // --------------------------------------------------
    handleTurn();
    // --------------------------------------------------
}

//handles the validation of the board 
function handleResultValidation() {
    

    //check who won
    checkWin();

    if(gameActive){
        //handles the changing from one to another player
        handlePlayerChange();
        //handle computer move
        handleComputerMove();
    }
}

//handle computer move
function handleComputerMove(){
    //choose move 
    pickMove();

    if (!checkWin()){
        //change player
        handlePlayerChange();
    }
}

function pickMove(){
    //randomly choose a spot 
    while(true){
        //random number between 0 and 8 cause we have 9 cells
        var move = Math.floor(Math.random()*8);

        if(gameState[move]==''){
            break;
        }
    }

    //m has the move picked 
    gameState[move] = currentPlayer
    document.getElementById(move).innerHTML = currentPlayer;


}

//Status Bar
function status(){
    //track who won 

    //display who won 

}



//this function handles the clicks
function handleCellClick(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    //checks if the currents cell is an avaliable cell and if the game is active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }


    handleCellPlayed(clickedCell, clickedCellIndex);
    
    handleResultValidation();
}

//handles the restaring of the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

    // --------------------------------------------------
    // UPDATE 01-11-23
    // --------------------------------------------------
    winnerMachine.innerHTML = '';
    winnerMe.innerHTML = '';
    // --------------------------------------------------
}

//registers the clicks 
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);