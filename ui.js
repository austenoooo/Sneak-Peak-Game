const gameRule = document.getElementById("game-rule");
const yellowBackdrop = document.getElementById("yellow-backdrop");
const gameRuleButton = document.getElementById("game-rule-button");
const progressButton = document.getElementById("progress-button");
const close = document.getElementById("close");
const blueBackdrop = document.getElementById("blue-backdrop");
const start = document.getElementById("start");
const startContent = document.getElementById("start-content");
const newGame = document.getElementById("new-game-button");
const result = document.getElementById("result");
const resultLineOne = document.getElementById("result-line-one");
const resultLineTwo = document.getElementById("result-line-two");

gameRuleButton.addEventListener("click", function (){
  yellowBackdrop.style.opacity = 1;
  yellowBackdrop.style.pointerEvents = "auto";
  gameRule.style.opacity = 1;
  gameRule.style.pointerEvents = "auto";
});

close.addEventListener("click", function (){
  yellowBackdrop.style.opacity = 0;
  yellowBackdrop.style.pointerEvents = "none";
  gameRule.style.opacity = 0;
  gameRule.style.pointerEvents = "none";
});

progressButton.addEventListener("click", function (){
  let currentText = progressButton.children[0].textContent;

  if (currentText == "START"){
    
    startCountdown();
    progressButton.children[0].textContent = "PAUSE";
  }

  if (currentText == "PAUSE"){
    gamePause = true;
    progressButton.children[0].textContent = "RESUME";
  }

  if (currentText == "RESUME"){
    gamePause = false;
    progressButton.children[0].textContent = "PAUSE";
  }
  
});


newGame.addEventListener("click", function (){

  // reset all game progress parameters
  gameStart = false;
  gamePause = false;
  gameEnd = false;
  win = false;

  result.style.opacity = 0;
  result.style.visibility = "hidden";
  result.pointerEvents = "none";
  yellowBackdrop.style.opacity = 0;
  yellowBackdrop.style.pointerEvents = "none";

  startContent.textContent = "You have 3 seconds to close your eyes before the game start!";
  startContent.style.fontSize = "2rem";

  startCountdown();
});



function startCountdown(){

  // showing the countdown interface
  blueBackdrop.style.opacity = 1;
  blueBackdrop.style.pointerEvents = "auto";
  start.style.opacity = 1;
  start.style.pointerEvents = "auto";

  setTimeout(function (){
    startContent.textContent = "3";
    startContent.style.fontSize = "5rem";
  }, 2.0 * 1000);
  
  setTimeout(function (){
    startContent.textContent = "2";
  }, 3.0 * 1000);

  setTimeout(function (){
    startContent.textContent = "1";
  }, 4.0 * 1000);

  setTimeout(function (){
    blueBackdrop.style.opacity = 0;
    blueBackdrop.style.pointerEvents = "none";
    start.style.opacity = 0;
    start.style.pointerEvents = "none";
    gameStart = true;
  }, 5.0 * 1000);
}


