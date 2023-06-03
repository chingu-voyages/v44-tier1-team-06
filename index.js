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
        fullGridPoints++;
        totalWins++;
        updatedFullGridPoints();
        updateTotalWinPoints();
        newGame.classList.remove("hidden");
        messageDiv.classList.remove("hidden");
        winLoseMessage.innerText = "🎉 You win! 🥳";
        clearButton.classList.add("hidden");
        submitButton.classList.add("hidden");
        diceRoller.classList.add("hidden");
        diceOne.classList.add("hidden");
        diceTwo.classList.add("hidden");
        timerDiv.style.display = "none";
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
    if (timer === 0) {
        timerPoints++;
        totalLoses++;
        updateTimerPoints();
        updateTotalLosePoints();
        clearInterval(interval)
    }
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


//  Icon section to see number of points when hovering over icon

const forfeitIcon = document.querySelector(".fa-font-awesome");
forfeitIcon.addEventListener("mouseover", () => {
    forfeitIcon.innerHTML = `<p class="forfeit-score">${forfietPoints}</p>`;
    //  forfeitIcon.innerText = forfietPoints;
});
forfeitIcon.addEventListener("mouseout", () => {
    forfeitIcon.innerHTML = ""; // Reset icon text when mouse is removed
});

const fullGridIcon = document.querySelector(".fa-square");
fullGridIcon.addEventListener("mouseover", () => {
    fullGridIcon.innerHTML = `<p class="forfeit-score">${fullGridPoints}</p>`;
});
fullGridIcon.addEventListener("mouseout", () => {
    fullGridIcon.innerHTML = ""; // Reset icon text when mouse is removed
});

const timerIcon = document.querySelector(".fa-hourglass-end");
timerIcon.addEventListener("mouseover", () => {
  timerIcon.innerHTML = `<p class="forfeit-score">${timerPoints}</p>`;
});
timerIcon.addEventListener("mouseout", () => {
  timerIcon.innerHTML = "";
});

const totalWinIcon = document.querySelector(".fa-trophy");
totalWinIcon.addEventListener("mouseover", () => {
  totalWinIcon.innerHTML = `<p class="forfeit-score">${totalWins}</p>`;
});
totalWinIcon.addEventListener("mouseout", () => {
  totalWinIcon.innerHTML = "";
});

const totalLoseIcon = document.querySelector(".fa-heart-crack");
totalLoseIcon.addEventListener("mouseover", () => {
    totalLoseIcon.innerHTML = `<p class="forfeit-score">${totalLoses}</p>`;
  });
  totalLoseIcon.addEventListener("mouseout", () => {
    totalLoseIcon.innerHTML = "";
  });