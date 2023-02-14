// refresh page when resized
// window.onresize = function () {
//   location.reload();
// };

// HTML elements
const video = document.getElementById("webcam");
const liveView = document.getElementById("live-view");


// One possible solutions is to load two detector, one has refineLandmarks and one doesn't 
// detector
var detector = undefined;

const estimationConfig = {flipHorizontal: false};

function loadModel(){
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: 'tfjs',
    refineLandmarks: true
  };
  
  // not sure if the syntex is correct or not
  faceLandmarksDetection.createDetector(model, detectorConfig).then(function (loadedDetector){
  detector = loadedDetector;
  loadCamera();
 });
}

// start the detection
loadModel();


// prompt the user to grant webcame access
navigator.permissions
  .query({name: "camera"})
  .then((permissionObject) => {
    console.log(permissionObject.state);
  })
  .catch((error) => {
    console.log("Got error" + error);
  });

// check if webcam access is supported
function getUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function loadCamera(){
  if (getUserMediaSupported()){
    enableCam();
  } else{
    console.warn("webcam is not supported by your browser");
  }
}

function enableCam(event){
  // only continue if the detector has finished loading
  if (!detector){
    return;
  }

  const constraints = {
    video: true,
  }

  //activate the webcam strem
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", detectWebcam);
  });
}

// left eye and right eye coordinates
const rightCoor = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398];
const leftCoor = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246];

// global variable that store the position of each vertex of the eyes
var rightPos = [];
var leftPos = [];

function detectWebcam() {
  detector.estimateFaces(video, estimationConfig).then(function (results){
    // console.log(results);
    rightPos.splice(0);
    leftPos.splice(0);

    // when there is face detected
    if (results.length > 0){
      let points = results[0].keypoints;
      
      // get all the position of the vertex of the right eye
      for (let i = 0; i < rightCoor.length; i++){
        let pos = points[rightCoor[i]];
        rightPos.push({x: pos.x, y: pos.y});
      }

      // get all the position of the vertex of the left eye
      for (let i = 0; i < leftCoor.length; i++){
        let pos = points[leftCoor[i]];
        leftPos.push({x: pos.x, y: pos.y});
      }
    }
  });
  window.requestAnimationFrame(detectWebcam);
}


let myCanva;
let capture;

// p5 code
function setup(){
  myCanva = createCanvas(window.innerWidth, window.innerHeight);
  myCanva.parent("canva");

  capture = createCapture(VIDEO);
  capture.hide();

  noLoop();
}

function draw(){

  // background
  background(255);

  // draw the video
  image(capture, 0, 0, 640, 480);

  // draw the eye contours when availabel
  if (rightPos.length > 0 && leftPos.length > 0){
    noFill();
    stroke('red');
    strokeWeight(3);

    // draw right eye contour
    beginShape();
    for(let i = 0; i < rightPos.length; i++){
      vertex(rightPos[i].x, rightPos[i].y);
    }
    endShape(CLOSE);

    // draw left eye contour
    beginShape();
    for(let i = 0; i < leftPos.length; i++){
      vertex(leftPos[i].x, leftPos[i].y);
    }
    endShape(CLOSE);

    

  }
}