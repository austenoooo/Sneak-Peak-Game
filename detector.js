// HTML elements
const video = document.getElementById("webcam");
const liveView = document.getElementById("live-view");

let startInferenceTime, numInferences = 0;
let inferenceTimeSum = 0;
let rafId;

// whether player eye is open
// default if true
let playerEyeOpen = true;
let playerEyeOpenPrev = true;

// whether computer eye is open
// defult is true
let computerEyeOpen = true;
let computerEyeOpenPrev = true;

let detectionStart = false;

// detector
var detector = undefined;

const estimationConfig = {flipHorizontal: false};

function loadModel(){
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    refineLandmarks: true
  };
  
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
    // video.addEventListener("loadeddata", renderPrediction);
    renderPrediction();
  });
}

// left eye and right eye coordinates
const rightCoor = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398];
const leftCoor = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246];

// global variable that store the position of each vertex of the eyes
var rightPos = [];
var leftPos = [];
var points = [];

function beginEstimateFaceStats(){
  startInferenceTime = (performance || Date).now();
}

function endEstimateFacesStats(){
  const endInferecetTime = (performance || Date).now();
  inferenceTimeSum += endInferecetTime - startInferenceTime;
  ++numInferences;
}

async function renderResult(){
  if (video.readyState < 2){
    await new Promise((resolve) => {
      video.onloadeddata = () => {
        resolve(video);
      };
    });
  }

  let faces = undefined;

  // detector can be null if initualization fail
  if (detector){
    beginEstimateFaceStats();

    // detectors may throw errors
    try{
      detectionStart = true;
      faces = await detector.estimateFaces(video, {flipHorizontal: false});
    }catch (error){
      detector.dispose();
      detector = undefined;
      alert(error);
    }

    endEstimateFacesStats();
  }

  if (faces && faces.length > 0){
    let keypoints = faces[0].keypoints;

    playerEyeOpen = checkEyeClose(keypoints);
    // console.log(playerEyeOpen);
  }
}


async function renderPrediction() {
  await renderResult();

  rafId = requestAnimationFrame(renderPrediction);
}





// check whether the play's eyes are closed
function checkEyeClose(keypoints){

    // calculate threshold based on the detected height of the face
    
    let threshold = Math.abs(parseFloat(keypoints[152].y) - parseFloat(keypoints[10]. y)) / 35;
    // console.log(threshold);
        
    let leftEyeOpen = true;
    let rightEyeOpen = true;

    let leftEyeUpper = [160, 159, 158];
    let leftEyeLower = [144, 145, 153];
    
    let rightEyeUpper = [385, 386, 387];
    let rightEyeLower = [380, 374, 373];

    // check if left eye is open
    let upAveL = 0;
    for (let i = 0; i < leftEyeUpper.length; i++){
        upAveL += parseFloat(keypoints[leftEyeUpper[i]].y);
    }
    upAveL = upAveL / 3;
    let lowAveL = 0;
    for (let i = 0; i < leftEyeLower.length; i++){
        lowAveL += parseFloat(keypoints[leftEyeLower[i]].y);
    }
    lowAveL = lowAveL / 3;
    if (Math.abs(upAveL - lowAveL) < threshold){
        leftEyeOpen = false;
    }

    // check if right eye is open
    let upAveR = 0;
    for (let i = 0; i < rightEyeUpper.length; i++){
        upAveR += parseFloat(keypoints[rightEyeUpper[i]].y);
    }
    upAveR = upAveR / 3;
    let lowAveR = 0;
    for (let i = 0; i < rightEyeLower.length; i++){
        lowAveR += parseFloat(keypoints[rightEyeLower[i]].y);
    }
    lowAveR = lowAveR / 3;
    if (Math.abs(upAveR - lowAveR) < threshold){
        rightEyeOpen = false;
    }

    return (leftEyeOpen || rightEyeOpen);
  }