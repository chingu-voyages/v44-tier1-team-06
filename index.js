// GRID CONTAINER
const container = document.querySelector(".container");

let boardHeight;
let boardWidth;
let singlePlayer = true;

const submitButton = document.querySelector(".button-submit");
const clearButton = document.querySelector(".button-clear");
const newGame = document.querySelector(".button-new");
const messageDiv = document.querySelector(".message-container");
const winLoseMessage = document.querySelector(".message");
const diceRoller = document.querySelector(".button-roll");
const diceOne = document.querySelector(".dice-one");
const diceTwo = document.querySelector(".dice-two");
const placeholders = document.querySelectorAll(".placeholder");
const timerDiv = document.querySelector(".timer");
const diceDiv = document.querySelector(".roll-button-dice-container");
const noMatchMessage = document.querySelector(".no-match");
const closeButtons = document.querySelectorAll(".close-button");
//const gridContainer = document.getElementById("grid-container");
let newCellsShaded;
let skips = 0;
let skippedTurn;
const skipMessage = document.querySelector(".skip-message");
let cellsSubmitted;
let submittedArr; 
const gameInProgressAlert = document.querySelector(".game-in-progress");
const okButton = document.querySelector(".ok-button");

function createGrid() {
    // gives us the option to expand the board dimensions in two player mode
    if (singlePlayer) {
        boardHeight = 10;
        boardWidth = 10;
    } else {
        boardHeight = 20;
        boardWidth = 10;
    }

    // create 10 columns
    for (let i = 0; i < boardHeight; i++) {
        const column = document.createElement("div");
        column.classList.add("column");

        // create cells in each column
        for (let j = 0; j < boardWidth; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            column.appendChild(cell);
        }

    container.appendChild(column);
    }
}

createGrid();

// creates a node list containing each div with a class of "cell"
const cells = document.querySelectorAll(".cell");

// keep track of the cells that are clicked during each turn
let clickedCells = [];

// shade cells on the grid
function shade(event) {
    let targetCell = event.target;

    if(targetCell.classList.contains("submitted")) {
        return; // skip shading/unshading if the cell that's clicked has already been submitted in a previous turn
    }

    if (targetCell.classList.contains("shaded")) {
        targetCell.classList.remove("shaded");
        // check if the cell is already in the clickedCells array
        const index = clickedCells.indexOf(targetCell);
        if (index > -1) {
            // if it is, remove it from the array
            clickedCells.splice(index, 1);
        }
    } else {
        // if it's not in the array, add it to the clickedCells arry and shade the cell
        targetCell.classList.add("shaded");
        clickedCells.push(targetCell);
    }
}

// use the clear button to unshade the cells that were just clicked (but not submitted) so the user can try a different combo of cells
clearButton.addEventListener("click", () => {
    clickedCells.forEach((cell) => {
        cell.classList.remove("shaded");
    });
    clickedCells = [];
});

// FULL GRID WIN CONDITION
// create an array from the cells node list
const cellsArray = Array.from(cells);

// check if the whole grid is shaded
const checkIfAllShaded = () => {
    // checks if every cell in the array contains the shaded class; returns a boolean
    const allShaded = cellsArray.every((cell) => cell.classList.contains("shaded"));
    if(allShaded) {
        console.log("you win!")
        fullGridPoints++;
        totalWins++;
        updatedFullGridPoints();
        updateTotalWinPoints();
        //newGame.classList.remove("hidden");
        hideButtons();
        winLoseMessage.innerText = "🎉 You win! 🥳";
    }
}

function hideButtons(){
    messageDiv.classList.remove("hidden");
    clearButton.classList.add("hidden");
    submitButton.classList.add("hidden");
    diceRoller.classList.add("hidden");
    diceOne.classList.add("hidden");
    diceTwo.classList.add("hidden");
    timerDiv.style.display = "none";
}

function showButtons(){
    messageDiv.classList.add("hidden");
    clearButton.classList.remove("hidden");
    submitButton.classList.remove("hidden");
    diceRoller.classList.remove("hidden");
    diceOne.classList.remove("hidden");
    diceTwo.classList.remove("hidden");
    timerDiv.style.display = "unset";
}

// CLEAR GRID FUNCTION
function clearGrid() {
    cells.forEach((cell) => {
        cell.classList.remove("shaded");
    });
}

function clearLeaderboard() {
    totalWins = 0;
    totalLoses = 0;
    timerPoints = 0;
    forfietPoints = 0;
    fullGridPoints = 0; 
}



// NEW GAME BUTTON
const newGamebutton = document.querySelector(".button-new");  
newGamebutton.addEventListener("click", function () {
    if(cellsSubmitted.length > 0 && cellsSubmitted.length < 100) {
        // if there are cells shaded on the grid and the timer has run down or the user skips 2 turns
        if(timer <= 0 || skips === 2) {
            resetTimer();
            clearLeaderboard();
            clearGrid();
            showButtons();
            submittedArr.forEach((cell) => {
                cell.classList.remove("submitted");
            });
        } else { // if there are cells shaded on the grid, but the whole grid isn't shaded, display alert message
            console.log("Starting a new game will abandon the current game");
            gameInProgressAlert.classList.remove("hidden");
        }
        
    } else { 
        console.log('yes')
        // reset the timer:
        resetTimer();
        //clear the leaderboard:
        clearLeaderboard(); 
        //clear the grid:
        clearGrid()
        // show buttons
        showButtons();
        //skippedTurn = true;
    }
}); 


// DICE ROLLER
diceRoller.addEventListener("click", handleRollButtonClick);
let diceOneValue;
let diceTwoValue;

function handleRollButtonClick() {
    // adjust CSS
    diceDiv.style.justifyContent = "flex-start";
    diceDiv.style.paddingLeft = "75px";

    if(newCellsShaded === undefined || newCellsShaded === true || skippedTurn === true) {
        // generate random numbers between 1 and 6 for each of the die
        diceOneValue = Math.floor(Math.random() * 6) + 1;
        diceTwoValue = Math.floor(Math.random() * 6) + 1;

        // set the src attribute of each dice image depending on the randomly generated number
        let diceOneSrc = `img/dice${diceOneValue}.png`;
        diceOne.setAttribute('src', diceOneSrc);
        let diceTwoSrc = `img/dice${diceTwoValue}.png`;
        diceTwo.setAttribute('src', diceTwoSrc);

        // hide the placeholders when the die are rolled
        placeholders.forEach(placeholder => placeholder.style.display = "none");

        // adds the shade event listener only to cells that haven't been shaded and submitted in previous turns
        cells.forEach((cell) => {
            if(!cell.classList.contains("submitted")) {
                cell.addEventListener("click", shade);
            }
        });

        newCellsShaded = false;
        skippedTurn = false;
    } else {
        // open a modal telling the user to shade cells on the grid or skip this turn
        console.log("Shade a new array on the grid or skip this turn");
        // if they choose to skip the turn, increment the skip variable and let them roll the dice again (let skippedTurn = true)
        skipMessage.classList.remove("hidden");
    }

}

// called when the user clicks the "skip this turn" button in the modal
function skipTurn(){
    skips++;
    skippedTurn = true;
    skipMessage.classList.add("hidden");
    console.log(skips);
    if(skips === 2) {
        forfietPoints++;
        totalLoses++;
        updateforfietPoints();
        updateTotalLosePoints();
        hideButtons();
        winLoseMessage.innerText = "😿 You lose 💔";
    }
}


submitButton.addEventListener("click", handleSubmitButtonClick);

function handleSubmitButtonClick() {
    console.log("submission:");
    const product = diceOneValue * diceTwoValue;
    const clickedCellsCurrentTurn = [...clickedCells];

    // console.log(`product: ${product}`)
    // console.log(`length of clickedCells array: ${clickedCells.length}`);
    // console.log(`length of clickedCellsCurrentTurn array: ${clickedCellsCurrentTurn.length}`);

    if (product !== clickedCellsCurrentTurn.length) {
        console.log("doesn't match");
        noMatchMessage.classList.remove("hidden");
    } else {
        console.log("match");
        clickedCells.forEach((cell) => {
            cell.classList.add("submitted");
            cell.removeEventListener("click", shade);
        })
        clickedCells = [];
        checkIfAllShaded();
        newCellsShaded = true;
        skippedTurn = false;
        skips = 0;
        cellsSubmitted = container.getElementsByClassName("submitted");
        submittedArr = Array.from(cellsSubmitted);
        console.log(cellsSubmitted);
        console.log(submittedArr);
    }
}

okButton.addEventListener("click", () => {
    console.log(submittedArr);
    clearGrid();
    resetTimer();
    clearLeaderboard();
    submittedArr.forEach((cell) => {
        cell.classList.remove("submitted");
        //cell.dataset.listenerAdded = false;
    });
    console.log(submittedArr);
    skippedTurn = true;
    gameInProgressAlert.classList.add("hidden");
});

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        if(!noMatchMessage.classList.contains("hidden")){
            noMatchMessage.classList.add("hidden");
        } else if(!skipMessage.classList.contains("hidden")){
            skipMessage.classList.add("hidden");
        } else if(!gameInProgressAlert.classList.contains("hidden")){
            gameInProgressAlert.classList.add("hidden");
        }
    });
});

//timer
var timer = 60;
var interval = setInterval(function() {
    timer--;
    $('.timer').text(timer);
    if (timer === 0 ) {
        placeholders.forEach(placeholder => placeholder.style.display = "none");
        hideButtons();
        winLoseMessage.innerText = "😿 You lose 💔";
        timerPoints++;
        totalLoses++;
        updateTimerPoints();
        updateTotalLosePoints();
        clearInterval(interval);
    }
    //placeholders.forEach(placeholder => placeholder.style.display = "block");
}, 1000);

function resetTimer() {
    timer=61;
};

// Leaderboard Section

// variables to store the points


let fullGridPoints = 0;
let forfietPoints = 0;
let timerPoints = 0;
let totalLoses = 0;
let totalWins = 0;



// updating points section

// Function to update fullGrid points
const updatedFullGridPoints = () => {
    document.getElementById("fullGridPointsTracker").innerText = fullGridPoints;
};

// Function to update forfiet points
const updateforfietPoints = () => {
    document.getElementById("forfeitPointsTracker").innerText = forfietPoints;
};

// function to update timer points
const updateTimerPoints = () => {
    document.getElementById("timerTracker").innerText = timerPoints;
}

// function to update total win points
const updateTotalWinPoints = () => {
    document.getElementById("totalWinsTracker").innerText = totalWins;
};

// function to update total lose points
const updateTotalLosePoints = () => {
    document.getElementById("totalLosesTracker").innerText = totalLoses
};


