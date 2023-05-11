// List all steps I need my code to complete.  Then make each step as simple as possible

/*  Leaderboard functionality
    User can see the display of the total number of wins and losses for each
    User can see the tally of wins for each of the three ways the game can end
    User can see the tally of losses for each of the three ways the game can end
 */

 /* ways to win or lose
    A pre-defined period of time is reached. Whoever has the highest score wins.
    A player forfeits two consecutive turns. In this situation, that player loses the game.
    A player completely fills in their grid. This will take longer than the first two options. Depending on the luck of the roll, players may end up forfeiting many turns.
 */

 /* psudo code
    1. Tally all ways to wins
        a. When a certain number of moves are made, whichever player has the highest score.
            I. if player clicks the move button, subtract 1 from the total number of moves.
            II. Track the score of each player
            III. Signal when number of moves hits a certain number
            IV. When this occurs, go through how many points each player has, and the highest number will get a tally in the board to win, the losing player will get a lose tally and the total wins and loses will each get a point.
        b. Player completely fills the grid
            I. Track how many sections of the grid are filled 
            II. Once no more grid sections can be filled the  game will stop
            III. Whichever player was the last to hit the button will get a point.
            IV A win and lose point  will be tallied in the leaderboard
        c. if the other player forfeits two consecutive turns then the player wins
            I. Track each time a player hits the forfeits button on the controller
            II. If the player hits the button twice in a row, they  will no longer be able to hit it a third time.
            III. When this occurs a winning point will be given to the other player
            IV a win will be tallied in the win part of the leaderboard and a lose will be tallied in the leaderboard.
    
            2. Tally all ways to lose
        a. When a certain number of moves are made, the player with the lowest score loses.
        b. A player forfeits two consecutive turns.
        c. When a player completely fills the board, the other player loses

    3. Display the total numer of wins and loses for each player

 */

// Change this one to be for only one player and to use an eventlister



playerButton.addEventListener("click", function () {
    subtractMove();
}); // I think that is right but I should check

const subtractMove = function (playerNumber) {
    var movesCountElement = document.getElementById("moves-count");
    var movesCount = parseInt(movesCountElement.innerText); // look up what parseInt does.
    
    if (movesCount > 0) {
        movesCount--;
        movesCountElement.innerText = movesCount;
        console.log("Move subtracted for player " + playerNumber)
    } else {
        console.log("No more moves left for Player " + playerNumber)

        // added from a different Chat GBT question to make the buttons appear and disappear
        document.getElementById("playButton").classList.add("hidden");
        document.getElementById("playAgainButton").classList.remove("hidden");
    }
}

// tracking the number of points each player has from Chat GBT
const players = {
    player1: 0,
    player2: 0
};

// lose condition of forfeiting two consecutive turns
let forfeitTurnLosses = 0;
diceButton.addEventListener("click", function () {
    const count = 0;
    count++;
    if (count <= 2) {
        console.log("You lose!") // change value and 
        document.getElementById("diceButton").classList.add("hidden");
        forfeitTurnLosses++;
        // then use document.querySelector to grab the corresponding icon in the leaderboard
        // then use the forfeitTurnLosses variable as the innerHTML of that icon
    } 
});

/* what to do next
    Clean and organize my code for the two or three win/lose conditions
    For the grid condition, when the clickedCells array is at 100 then add a point to the leaderboard.
    Ask teammates if they can see my code or if it's just that I have a branch
    Look up what a pull request is and how to do one and also what a merge is and how to do one.
    Look on the github for what has been added recently by my teammates
*/



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
    count = 0;
  });



// if the clicked cells array equals 100 then the player wins and the point can be added to the total points.

// have a timer then if the player hasn't filled out the grid then it counts as a loss.















/* Old attemps

const playerOneWinTracker = document.querySelector(".player-one-win-tracker");
const playerTwoWinTracker = document.querySelector(".player-two-win-tracker");
const playerOneLoseTracker = document.querySelector(".player-one-lose-tracker");
const playerTwoLoseTracker = document.querySelector(".player-two-lose-tracker");
const totalWins = document.querySelector(".total-wins");
const totalLoses = document.querySelector(".total-loses");
const movesButton = document.querySelector(".movesButton")

let remainingMoves = 10; // track the remaining moves

movesButton.addEventListener("click", function (e) {
     Whenever this button is clicked these things will happen
       remaining moves will be subtracted by one
   
   remainingMoves -= 1;

})

function updatePoints(player, points) {
    if (players.hasOwnProperty(player)) {
        players[player] += points;
    } else {
        console.log(`Player ${player} does not exist`);
    }
}

/* How to do the rest of the win/lose conditions

// Take out the win condition of highest score wins since we are starting out with only one player

 A player forfeits two consecutive turns - Carol will assist me with that.
    if you roll the dice twice wihtout touching  the grid, the button disappears
    dicre roll counter varialbe and connect to the eventlistener have a message


const noMoreMoves = function (moves) {
    /* if the remainingMoves variable is gone down to 0 this things will happen
        A message will pop up saying there are no more moves
        The moves button will disapear
        A play again button will appear
        The player with the highest number in the win class will get another point in their favor
        The total number of wins and loses will both increase by one
    
    if (remainingMoves === 0) {
        console.log("There are no more moves.")

    }
   
}
*/











