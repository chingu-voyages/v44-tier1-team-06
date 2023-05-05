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

 const playerOneWinTracker = document.querySelector(".player-one-win-tracker");
 const playerTwoWinTracker = document.querySelector(".player-two-win-tracker");
 const playerOneLoseTracker = document.querySelector(".player-one-lose-tracker");
 const playerTwoLoseTracker = document.querySelector(".player-two-lose-tracker");
 const totalWins = document.querySelector(".total-wins");
 const totalLoses = document.querySelector(".total-loses");
 const movesButton = document.querySelector(".movesButton")

 let remainingMoves = 10; // track the remaining moves

movesButton.addEventListener("click", function (e) {
    /* Whenever this button is clicked these things will happen
        remaining moves will be subtracted by one
        
    */
    remainingMoves -= 1;

})

const noMoreMoves = function (moves) {
    /* if the remainingMoves variable is gone down to 0 this things will happen
        A message will pop up saying there are no more moves
        The moves button will disapear
        A play again button will appear
        The player with the highest number in the win class will get another point in their favor
        The total number of wins and loses will both increase by one
    */
   
}









