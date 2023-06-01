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
let closeButton = document.getElementById("close-button");


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
        newGame.classList.remove("hidden");
        messageDiv.classList.remove("hidden");
        winLoseMessage.innerText = "🎉 You win! 🥳";
        clearButton.classList.add("hidden");
        submitButton.classList.add("hidden");
        diceRoller.classList.add("hidden");
        diceOne.classList.add("hidden");
        diceTwo.classList.add("hidden");
        timerDiv.style.display = "none";
        updatedWinPoints();
    }
}

// DICE ROLLER
diceRoller.addEventListener("click", handleRollButtonClick);
let diceOneValue;
let diceTwoValue;

function handleRollButtonClick() {
    // adjust CSS
    diceDiv.style.justifyContent = "flex-start";
    diceDiv.style.paddingLeft = "75px";

    // when the roll button is clicked, generate random numbers between 1 and 6 for each of the die
    diceOneValue = Math.floor(Math.random() * 6) + 1;
    diceTwoValue = Math.floor(Math.random() * 6) + 1;

    // set the src attribute of each dice image depending on the randomly generated number
    let diceOneSrc = `img/dice${diceOneValue}.png`;
    diceOne.setAttribute('src', diceOneSrc);
    let diceTwoSrc = `img/dice${diceTwoValue}.png`;
    diceTwo.setAttribute('src', diceTwoSrc);

    // hide the placeholders when the die are rolled
    placeholders.forEach(placeholder => placeholder.style.display = "none");

    // ensures that there are no duplicate event listeners on the cells
    cells.forEach((cell) => {
        cell.removeEventListener("click", shade);
    });

    // only AFTER the roll button is clicked, shade a cell when clicked and push that cell to the clickedCells array
    cells.forEach((cell) => {
        cell.addEventListener("click", shade);
    });
}

submitButton.addEventListener("click", handleSubmitButtonClick);

function handleSubmitButtonClick() {
    console.log("submission:");
    const product = diceOneValue * diceTwoValue;
    const clickedCellsCurrentTurn = [...clickedCells];

    console.log(`product: ${product}`)
    console.log(`length of clickedCells array: ${clickedCells.length}`);
    console.log(`length of clickedCellsCurrentTurn array: ${clickedCellsCurrentTurn.length}`);

    if (product !== clickedCellsCurrentTurn.length) {
        console.log("doesn't match");
        noMatchMessage.classList.remove("hidden");
    } else {
        console.log("match");
        clickedCells = [];
        checkIfAllShaded();
    }
}

closeButton.addEventListener("click", function () {
    noMatchMessage.classList.add("hidden"); 
});


//timer
var timer = 60;
var interval = setInterval(function() {
    timer--;
    $('.timer').text(timer);
    if (timer === 0) clearInterval(interval);
}, 1000);

function resetTimer() {
    timer=61;
};

// Leaderboard Section

// lose condition of forfeiting two consecutive turns
let forfeitTurnPoints = 0;
let count = 0; 
diceRoller.addEventListener("click", function () {
    count++;
    if (count === 2) {
        console.log("You lose!") 
        forfeitTurnPoints++;
        count = 0 // Reset the count after losing
    } else {
        // Reset the count if the player clicked the dice button within two turns
        clearTimeout(resetCount);
        const resetCount = setTimeout(() => {
            count = 0;
        }, 10000);
    }
});

// Function to update lose points
const updateLosePoints = () => {
    const forfeitPoints = forfeitTurnPoints.length;
    document.getElementById("losePointsTracker").innerHTML = forfeitPoints; // update losePointsTracker
};

// win condition of the whole grid being shaded.

// Variable to store the win points
let winPoints = 0; 

// Function to update win points
const updatedWinPoints = () => {
    winPoints++; // Increment win points
    document.getElementById("winPointsTracker").innerHTML = winPoints; // update winPointsTracker
};

// function to update total points
const updateTotalPoints = () => {
    const forfeitPoints = forfeitTurnPoints.length;
    const fullGridPoints = winPoints;
    const totalPoints = forfeitPoints + fullGridPoints;
    document.getElementById("totalPointsTracker").innerHTML = totalPoints // update totalPointsTracker
};

//  Icon section to see number of points when hovering over icon

const forfeitIcon = document.querySelector(".fa-font-awesome");
forfeitIcon.addEventListener("mouseover", () => {
    forfeitIcon.innerHTML = forfeitTurnPoints.length;
});
forfeitIcon.addEventListener("mouseout", () => {
    forfeitIcon.innerHTML = ""; // Reset icon text when mouse is removed
});

const fullGridIcon = document.querySelector(".fa-square");
fullGridIcon.addEventListener("mouseover", () => {
    fullGridIcon.innerHTML = winPoints;
});
fullGridIcon.addEventListener("mouseout", () => {
    fullGridIcon.innerHTML = ""; // Reset icon text when mouse is removed
});

const totalIcon = document.querySelector(".fa-trophy");
totalIcon.addEventListener("mouseover", () => {
    totalIcon.innerHTML = winPoints + forfeitTurnPoints.length;
});
totalIcon.addEventListener("mouseout", () => {
    totalIcon.innerHTML = ""; // Reset icon text when mouse is removed
});

