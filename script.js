// refresh page when resized
// window.onresize = function () {
//   location.reload();
// };



let myCanva;
let capture;


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

let eyeHeightPlay = 50;

// p5 code
function setup(){
  myCanva = createCanvas(window.innerWidth, window.innerHeight);
  myCanva.parent("canva");

  background("#FFFEEC");
  smooth();

  textFont("Unbounded");
  
  
}

function draw(){

  background("#FFFEEC");
  
  if(eyeHeightCom - 10 > 0 && frameCount % 2 == 0){
    // eyeHeight -= 10;
  }

  interfaceFrame();
  
  computerEyeStarter();
  drawComputerEye();

  playerEyeStarter();
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
  leftPupilOutCom = leftPupilOutCom.get();
  
  // pupil inside
  leftPupilInCom.fill('black');
  leftPupilInCom.noStroke();
  leftPupilInCom.ellipse(50, 25, 35, 35);
  leftPupilInCom = leftPupilInCom.get();
  
  // pupil outside
  rightPupilOutCom.fill('red');
  rightPupilOutCom.noStroke();
  rightPupilOutCom.ellipse(200, 25, 50, 50);
  rightPupilOutCom = rightPupilOutCom.get();

  // pupil inside
  rightPupilInCom.fill('black');
  rightPupilInCom.noStroke();
  rightPupilInCom.ellipse(200, 25, 35, 35);
  rightPupilInCom = rightPupilInCom.get();
}




function playerEyeStarter(){
  rightEyePlay = createGraphics(width, height);
  leftEyePlay = createGraphics(width, height);
  
  leftPupilOutPlay = createGraphics(width, height);
  leftPupilInPlay = createGraphics(width, height);

  rightPupilOutPlay = createGraphics(width, height);
  rightPupilInPlay = createGraphics(width, height);
  
  // pupil outside
  leftPupilOutPlay.fill('#8EA1FF');
  leftPupilOutPlay.noStroke();
  leftPupilOutPlay.ellipse(50, 25, 50, 50);
  leftPupilOutPlay = leftPupilOutPlay.get();
  
  // pupil inside
  leftPupilInPlay.fill('black');
  leftPupilInPlay.noStroke();
  leftPupilInPlay.ellipse(50, 25, 35, 35);
  leftPupilInPlay = leftPupilInPlay.get();
  
  // pupil outside
  rightPupilOutPlay.fill('#8EA1FF');
  rightPupilOutPlay.noStroke();
  rightPupilOutPlay.ellipse(200, 25, 50, 50);
  rightPupilOutPlay = rightPupilOutPlay.get();

  // pupil inside
  rightPupilInPlay.fill('black');
  rightPupilInPlay.noStroke();
  rightPupilInPlay.ellipse(200, 25, 35, 35);
  rightPupilInPlay = rightPupilInCom.get();
}




function drawComputerEye(){
  push();
  // width: 125 -> (width - 30 - 380/2)
  // height: 25 -> height/2
  translate(width/2 - 30 - 380/2 - 125, height/2 - 25);

  // left eye
  leftEyeCom.remove();
  leftEyeCom.noStroke();
  leftEyeCom.fill('white');
  leftEyeCom.ellipse(50, 25, 100, eyeHeightCom);

  image(leftEyeCom, 0, 0, width, height);
  
  // right eye
  rightEyeCom.remove();
  rightEyeCom.noStroke();
  rightEyeCom.fill('white');
  rightEyeCom.ellipse(200, 25, 100, eyeHeightCom);
  
  image(rightEyeCom, 0, 0, width, height);
  
  leftPupilOutCom.mask(leftEyeCom);
  image(leftPupilOutCom, 0, 0, width, height);
  
  leftPupilInCom.mask(leftEyeCom);
  image(leftPupilInCom, 0, 0, width, height);

  rightPupilOutCom.mask(rightEyeCom);
  image(rightPupilOutCom, 0, 0, width, height);

  rightPupilInCom.mask(rightEyeCom);
  image(rightPupilInCom, 0, 0, width, height);

  // eyebrows
  fill("#4747F3");
  circle(125 - 30, -30, 10, 10);
  circle(125 + 30, -30, 10, 10);

  pop();
}

function drawPlayerEye(){
  push();
  // width: 125 -> (width/2 + 30 + 380/2)
  // height: 25 -> height/2
  translate(width/2 + 30 + 380/2 - 125, height/2 - 25);

  // left eye
  leftEyePlay.remove();
  leftEyePlay.noStroke();
  leftEyePlay.fill('white');
  leftEyePlay.ellipse(50, 25, 100, eyeHeightPlay);

  image(leftEyePlay, 0, 0, width, height);
  
  // right eye
  rightEyePlay.remove();
  rightEyePlay.noStroke();
  rightEyePlay.fill('white');
  rightEyePlay.ellipse(200, 25, 100, eyeHeightPlay);
  
  image(rightEyePlay, 0, 0, width, height);
  
  leftPupilOutPlay.mask(leftEyePlay);
  image(leftPupilOutPlay, 0, 0, width, height);
  
  leftPupilInCom.mask(leftEyePlay);
  image(leftPupilInPlay, 0, 0, width, height);

  rightPupilOutCom.mask(rightEyePlay);
  image(rightPupilOutPlay, 0, 0, width, height);

  rightPupilInCom.mask(rightEyePlay);
  image(rightPupilInPlay, 0, 0, width, height);

  // eyebrows
  fill("#FFC8FF");
  circle(125 - 30, -30, 10, 10);
  circle(125 + 30, -30, 10, 10);

  pop();
}


// check whether the play's eyes are closed
function checkEyeClose(){
  if (rightPos.length > 0 && leftPos.length > 0){
  
      // get the min and max of both the x and y coordinates of the vertex
      let rightMinX = 100000;
      let rightMaxX = 0;
      let rightMinY = 100000;
      let rightMaxY = 0;
  
      for (i = 0; i < rightPos.length; i++){
        if (rightPos[i].x > rightMaxX){
          rightMaxX = rightPos[i].x;
        }
        if (rightPos[i].x < rightMinX){
          rightMinX = rightPos[i].x;
        }
        if (rightPos[i].y > rightMaxY){
          rightMaxY = rightPos[i].y;
        }
        if (rightPos[i].y < rightMinY){
          rightMinY = rightPos[i].y;
        }
      }
  
      let leftMinX = 100000;
      let leftMaxX = 0;
      let leftMinY = 100000;
      let leftMaxY = 0;
  
      for (i = 0; i < leftPos.length; i++){
        if (leftPos[i].x > leftMaxX){
          leftMaxX = leftPos[i].x;
        }
        if (leftPos[i].x < leftMinX){
          leftMinX = leftPos[i].x;
        }
        if (leftPos[i].y > leftMaxY){
          leftMaxY = leftPos[i].y;
        }
        if (leftPos[i].y < leftMinY){
          leftMinY = leftPos[i].y;
        }
      }
    }
}