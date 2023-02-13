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
// New variables
// --------------------------------------------------
const scoreMachine = document.querySelector('.scoreMachine');
const scoreMe = document.querySelector('.scoreMe');
const winner = document.querySelector('.winner');

//machine wins counter
let scoreMachineCount = 0;
//human wins counter
let scoreMeCount = 0;
//shows initial score
scoreMachine.innerHTML = scoreMachineCount;
scoreMe.innerHTML = scoreMeCount;

var delay = 5000; // second
var response = "";
var box1 = "";
var box2 = "";
var box3 = "";

//handles the modal message 
function handleModal(){

    if (response == "success") {
        winner.innerHTML = 'Humankind has prevailed.';
        $('#eventCreated').modal('show');
    }else if(response == "failure"){
        winner.innerHTML = 'It was a win for the computer in this round.';
        $('#eventCreated').modal('show');
    }else if(response == "draw"){
        winner.innerHTML = 'There was no winner in this battle.';
        $('#eventCreated').modal('show');
    }
}

//handles score: add to the winner's counter
function handleScore() {
    if (currentPlayer == 'X'){
        scoreMeCount += 1;
    }else {
        scoreMachineCount += 1;
    }    

    scoreMachine.innerHTML = scoreMachineCount;
    scoreMe.innerHTML = scoreMeCount;
}

// handles winner: evaluates who the winner is and set response to the appropiate message
function handleWinner() {
    if (currentPlayer == 'X'){
        response = "success";
        handleModal();
    }else if (currentPlayer == 'O'){
        response = "failure";
        handleModal();
    } else{
        response = "draw";
        handleModal();
    }
}

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

        // --------------------------------------------------
        // Records the location of the winning boxes
        // --------------------------------------------------

        if (a === b && b === c){
            box1 =winCondition[0];
            box2 =winCondition[1];
            box3 =winCondition[2];
            
        }
        // --------------------------------------------------

        //if either a, b, or c are empty then the game is not won
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // if a, b, and c are the same then that player has won
        if (a === b && b === c) {
        //that player has won the game

        // --------------------------------------------------
        // Changes the color of the winning locations to #FF2E63
        // --------------------------------------------------
            document.getElementById(box1).style.color= "#FF2E63";
            document.getElementById(box2).style.color= "#FF2E63";
            document.getElementById(box3).style.color= "#FF2E63";
        // --------------------------------------------------
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
        // Calls handleScore and handleWinner
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
        response = "draw";
        handleModal()
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
    };
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
    // --------------------------------------------------
    // UPDATE 01-11-23: Reset highlighted spaces to their original color
    // --------------------------------------------------
    document.getElementById(box1).style.color= "#010A43";
    document.getElementById(box2).style.color= "#010A43";
    document.getElementById(box3).style.color= "#010A43";
    // --------------------------------------------------
    statusDisplay.style.color = "#010A43";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//registers the clicks 
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);