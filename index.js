// Grid Section


const container = document.querySelector(".container");

let boardHeight;
let boardWidth;
let singlePlayer = true;

const submitButton = document.querySelector(".button-submit");

const clearButton = document.querySelector(".button-clear");

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

let clickedCells = [];

const cells = document.querySelectorAll(".cell");

// shade a cell when clicked and push that cell to the clickedCells array
cells.forEach((cell) => {
    cell.addEventListener("click", shade);
});

function shade(event) {
    let targetCell = event.target;
    targetCell.classList.toggle("shaded");
    clickedCells.push(targetCell);
}

// remove the click event listener from every cell in the clickedCells array after the submit button is clicked
submitButton.addEventListener("click", function () {
    clickedCells.forEach((clickedCell) =>
    clickedCell.removeEventListener("click", shade)
    );
    // empty out the array so the submitted cells don't get cleared if the clear button is clicked
    clickedCells = [];
});

// use the clear button to unshade the cells that were just clicked (but not submitted) so the user can try a different combo of cells
clearButton.addEventListener("click", () => {
    clickedCells.forEach((cell) => {
        cell.classList.toggle("shaded");
    });
});

// Timer Section
var timer = 60;

var interval = setInterval(function() {
    timer--;
    $('.timer').text(timer);
    if (timer === 0) clearInterval(interval);
}, 1000);

// Leaderboard Section

// lose condition of forfeiting two consecutive turns
let forfeitTurnLosses = 0;
let count = 0; 
diceButton.addEventListener("click", function () {
    // const count = 0; this should have been a global function so outside of the event lister.
    count++;
    if (count === 2) {
        console.log("You lose!") 
       // document.getElementById("diceButton").classList.add("hidden"); Ask Carol why she commented out this line of code.
        forfeitTurnLosses++;
        const forfeitLoseCondition = document.getElementById("forfeit-scenario").classList.remove("hidden"); // Add lose condition icon to leaderboard
        forfeitLoseCondition.innerHTML = forfeitTurnLosses.length;  // use the forfeitTurnLosses variable as the innerHTML of that icon.  Ask about this line
    } 
});

// win condition of the whole grid being shaded.
let filledGridWin = 0;


const totalPoints = function () {
    forfeitTurnLosses.length + totalWins.length; // ?? adding the total wins and losses
    // Since there is only one win condition and one lose condition it might be possible to just add the code to the two condition event listeners and then add the points to the totalPoints function.  Should talk to people about that.
    const totalPoints = document.getElementById("tally-by-scenario").classList.remove("hidden");

};
