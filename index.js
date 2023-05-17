const diceLeft = document.getElementsByClassName("dice-left");
const diceRight = document.getElementsByClassName("dice-right");
const diceArrayLeft = Array.from(diceLeft);
const diceArrayRight = Array.from(diceRight);

document.querySelector('.roll').addEventListener('click', function() {
  diceElementsHandler()
});

diceElementsHandler = () => {

  let intOne, intTwo;

  const diceLoopHandler = () => {

    for (let i = 0; i < diceArrayLeft.length; i++) {
      if (diceArrayLeft[i].id === intOne) {
        diceArrayLeft[i].className = "active";
      } else {
        diceArrayLeft[i].className = "inactive";
      }
    }

    for (let i = 0; i < diceArrayRight.length; i++) {
      if (diceArrayRight[i].id === intTwo) {
        diceArrayRight[i].className = "active";
      } else {
        diceArrayRight[i].className = "inactive";
      }
    }

  }



  (() => {
    let arr = ["one", "two", "three", "four", "five", "six"];
    intOne = arr[Math.floor(Math.random() * arr.length)];
    intTwo = arr[Math.floor(Math.random() * arr.length)];
    diceLoopHandler()
  })();

}