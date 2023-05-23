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
        forfeitTurnLosses++;
    } 
});

// win condition of the whole grid being shaded.
let filledGridWin = 0;


// I think we were going to try to have the points displayed for a particular condition when the user hovers over the icon. I think we could do that with a mouseover event listener.
loseIcon.addEventListener("mousemover", function () {
    loseIcon.innerHTML = forfeitTurnLosses.length;
}); // figure this one out.

// Point tracking section

const lossPointsTotal = function () {
    const losePointsTracker = document.getElementById("");
    losePointsTracker.innerHTML = forfeitTurnLosses.length;
}

const winPointsTotal = function () {
    const winPointsTracker = document.getElementById("");
    winPointsTracker.innerHTML = filledGridWin.length;
}

const totalPoints = function () {
    forfeitTurnLosses.length + filledGridWin.length; // ?? adding the total wins and losses

};


