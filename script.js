// refresh page when resized
// window.onresize = function () {
//   location.reload();
// };



let myCanva;


// all the computer eyes
let leftEyeCom;
let rightEyeCom;

let leftPupilOutCom;
let leftPupilInCom;

let rightPupilOutCom;
let rightPupilInCom;

let eyeHeightCom = 50;

// all the player eyes
let leftEyePlay;
let rightEyePlay;

let leftPupilOutPlay;
let leftPupilInPlay;

let rightPupilOutPlay;
let rightPupilInPlay;

let eyeHeightPlay = 0;

// p5 code
function setup(){
  myCanva = createCanvas(window.innerWidth, window.innerHeight);
  myCanva.parent("canva");

  background("#FFFEEC");
  smooth();

  textFont("Unbounded");

  computerEyeStarter();
}

function draw(){

  background("#FFFEEC");
  
  // if(eyeHeightCom - 10 > 0 && frameCount % 2 == 0){
  //   // eyeHeight -= 10;
  // }

  if (playerEyeOpen){
    eyeHeightPlay = 50;
  }
  else{
    eyeHeightPlay = 0;
  }


  controlComputerEye();

  interfaceFrame();
  
  drawComputerEye();

  drawPlayerEye();

}



function interfaceFrame(){
  // draw computer side
  // square block
  fill("#00EAC9");
  stroke("#4747FC");
  strokeWeight(30);
  rect(width/2 - 30 - 380, height/2 - 380/2, 380, 380, 0, 30, 30, 30);
  // label
  noStroke();
  fill("#4747FC");
  rect(width/2 - 30 - 380 - 15, height/2 - 380/2 - 70, 220, 70, 10);
  // text
  fill("#FFFEEC");
  textSize(22);
  text("COMPUTER", width/2 - 30 - 380 + 15, height/2 - 380/2 - 30);
  

  // draw player side
  // square block
  fill("#FF4F14");
  stroke("#FFC8FF");
  strokeWeight(30);
  rect(width/2 + 30, height/2 - 380/2, 380, 380, 0, 30, 30, 30);
  // label
  noStroke();
  fill("#FFC8FF");
  rect(width/2 + 30 - 15, height/2 - 380/2 - 70, 220, 70, 10);
  // text
  fill("#FF4F14");
  textSize(22);
  text("YOU", width/2 + 30 + 15, height/2 - 380/2 - 30);
  // recording icon
  if (detectionStart){
    fill("#FF4F14");
    circle(width/2 + 30 + 95, height/2 - 380/2 - 40, 20);
    fill("#F9000C");
    circle(width/2 + 30 + 95, height/2 - 380/2 - 40, 15);
  }
  
}




function computerEyeStarter(){
  rightEyeCom = createGraphics(width, height);
  leftEyeCom = createGraphics(width, height);
  
  leftPupilOutCom = createGraphics(width, height);
  leftPupilInCom = createGraphics(width, height);

  rightPupilOutCom = createGraphics(width, height);
  rightPupilInCom = createGraphics(width, height);
  
  // pupil outside
  leftPupilOutCom.fill('red');
  leftPupilOutCom.noStroke();
  leftPupilOutCom.ellipse(50, 25, 50, 50);
  
  // pupil inside
  leftPupilInCom.fill('black');
  leftPupilInCom.noStroke();
  leftPupilInCom.ellipse(50, 25, 35, 35);
  
  // pupil outside
  rightPupilOutCom.fill('red');
  rightPupilOutCom.noStroke();
  rightPupilOutCom.ellipse(200, 25, 50, 50);

  // pupil inside
  rightPupilInCom.fill('black');
  rightPupilInCom.noStroke();
  rightPupilInCom.ellipse(200, 25, 35, 35);
  
}



function drawComputerEye(){
  push();
  // width: 125 -> (width - 30 - 380/2)
  // height: 25 -> height/2
  translate(width/2 - 30 - 380/2 - 125, height/2 - 25);

  if (computerEyeOpen){
    // left eye & right eye
    noStroke();
    fill('white');
    ellipse(50, 25, 100, 50);
    ellipse(200, 25, 100, 50);

    // pupil outside
    fill('red');
    ellipse(50, 25, 50, 50);
    
    // pupil inside
    fill('black');
    ellipse(50, 25, 35, 35);
    
    // pupil outside
    fill('red');
    ellipse(200, 25, 50, 50);

    // pupil inside
    fill('black');
    ellipse(200, 25, 35, 35);
  }
  else{
    fill('black');
    rect(0, 22, 100, 6, 5);
    rect(150, 22, 100, 6, 5);
  }
  
  // eyebrows
  fill("#4747F3");
  circle(125 - 30, -30, 15);
  circle(125 + 30, -30, 15);

  pop();
}

function drawPlayerEye(){
  push();
  // width: 125 -> (width/2 + 30 + 380/2)
  // height: 25 -> height/2
  translate(width/2 + 30 + 380/2 - 125, height/2 - 25);

  if (playerEyeOpen){

    noStroke();
    fill('white');
    ellipse(50, 25, 100, 50);

    ellipse(200, 25, 100, 50);
    
    fill('#8EA1FF');
    ellipse(50, 25, 50, 50);
    
    fill('black');
    ellipse(50, 25, 35, 35);

    fill('#8EA1FF');
    ellipse(200, 25, 50, 50);

    fill('black');
    ellipse(200, 25, 35, 35);
  }
  else{
    fill('black');
    rect(0, 22, 100, 6, 5);
    rect(150, 22, 100, 6, 5);
  }

  

  // eyebrows
  fill("#FFC8FF");
  circle(125 - 30, -30, 15);
  circle(125 + 30, -30, 15);

  pop();
}

// default is 0
let changeStateCountDown = Math.round(Math.random() * 3 + 2);

function controlComputerEye(){
  if (changeStateCountDown == 0){
    computerEyeOpen = !computerEyeOpen;
    if (computerEyeOpen){
      changeStateCountDown = Math.round(Math.random() * 30 + 20);
    }
    else{
      changeStateCountDown = Math.round(Math.random() * 100 + 40);
    }
  }
  else{
    changeStateCountDown -= 1;
  }
}