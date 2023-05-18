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