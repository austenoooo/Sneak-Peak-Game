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
const panel = document.getElementById("panel");


// game rule is only clickable when game is not happening
gameRuleButton.addEventListener("click", function (){
  yellowBackdrop.style.opacity = 1;
  yellowBackdrop.style.pointerEvents = "auto";
  gameRule.style.opacity = 1;
  gameRule.style.pointerEvents = "auto";
});

close.addEventListener("click", function (){
  if (result.style.opacity == 0){
    yellowBackdrop.style.opacity = 0;
    yellowBackdrop.style.pointerEvents = "none";
  }
  gameRule.style.opacity = 0;
  gameRule.style.pointerEvents = "none";
});

progressButton.addEventListener("click", function (){
  let currentText = progressButton.children[0].textContent;

  if (!gameStart){

    // hide the result
    yellowBackdrop.style.opacity = 0;
    yellowBackdrop.style.pointerEvents = "none";
    result.style.opacity = 0;
    result.style.pointerEvents = "none";

    startContent.textContent = "You have 3 seconds to close your eyes before the game start!";
    startContent.style.fontSize = "2rem";

  
    panel.style.top = "100%";
    
    startCountdown();
  }
});


newGame.addEventListener("click", function (){

  // reset all game progress parameters
  
  result.style.opacity = 0;
  result.style.visibility = "hidden";
  result.pointerEvents = "none";
  yellowBackdrop.style.opacity = 0;
  yellowBackdrop.style.pointerEvents = "none";

  startContent.textContent = "You have 3 seconds to close your eyes before the game start!";
  startContent.style.fontSize = "2rem";

  panel.style.top = "100%";

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
  }, 4.0 * 1000);
  
  setTimeout(function (){
    startContent.textContent = "2";
  }, 5.0 * 1000);

  setTimeout(function (){
    startContent.textContent = "1";
  }, 6.0 * 1000);

  setTimeout(function (){
    blueBackdrop.style.opacity = 0;
    blueBackdrop.style.pointerEvents = "none";
    start.style.opacity = 0;
    start.style.pointerEvents = "none";
    gameStart = true;

    
  }, 7.0 * 1000);
}


