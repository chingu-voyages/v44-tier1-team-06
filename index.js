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

// keep track of the cells that are clicked during each turn
let clickedCells = [];

// creates a node list containing each div with a class of "cell"
const cells = document.querySelectorAll(".cell");

// shade cells on the grid
function shade(event) {
    let targetCell = event.target;
    targetCell.classList.toggle("shaded");
    clickedCells.push(targetCell);
}

// use the clear button to unshade the cells that were just clicked (but not submitted) so the user can try a different combo of cells
clearButton.addEventListener("click", () => {
    clickedCells.forEach((cell) => {
        cell.classList.toggle("shaded");
    });
});

//timer
var timer = 60;

var interval = setInterval(function() {
    timer--;
    $('.timer').text(timer);
    if (timer === 0) clearInterval(interval);
}, 1000);

// DICE ROLLER
const diceRoller = document.querySelector(".button-roll");
const diceOne = document.querySelector(".dice-one");
const diceTwo = document.querySelector(".dice-two");
const placeholders = document.querySelectorAll(".placeholder");

diceRoller.addEventListener("click", handleRollButtonClick)

function handleRollButtonClick() {
    // when the roll button is clicked, generate random numbers between 1 and 6 for each of the die
    let diceOneValue = Math.floor(Math.random() * 6) + 1;
    let diceTwoValue = Math.floor(Math.random() * 6) + 1;

    // set the src attribute of each dice image depending on the randomly generated number
    let diceOneSrc = `img/dice${diceOneValue}.png`;
    diceOne.setAttribute('src', diceOneSrc);

    let diceTwoSrc = `img/dice${diceTwoValue}.png`;
    diceTwo.setAttribute('src', diceTwoSrc);

    // hide the placeholders when the die are rolled
    placeholders.forEach(placeholder => placeholder.style.display = "none");

    // only AFTER the roll button is clicked, shade a cell when clicked and push that cell to the clickedCells array
    cells.forEach((cell) => {
        cell.addEventListener("click", shade);
    });

    // submit button is only clickable AFTER the die are rolled
    // remove the click event listener from every cell in the clickedCells array after the submit button is clicked
    submitButton.addEventListener("click", function () {
        clickedCells.forEach((clickedCell) =>
        clickedCell.removeEventListener("click", shade)
        );
        // empty out the array so the submitted cells don't get cleared if the clear button is clicked
        clickedCells = [];
    });
}
