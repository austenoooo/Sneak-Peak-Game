// HTML elements
const video = document.getElementById("webcam");
const liveView = document.getElementById("live-view");


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
var points = [];

// whether player eye is open
var playerEyeOpen = true;

function detectWebcam() {
  detector.estimateFaces(video, estimationConfig).then(function (results){
    // console.log(results);
    rightPos.splice(0);
    leftPos.splice(0);
    
    for (let i = 0; i < points.length; i++){
      liveView.removeChild(points[i]);
    }
    points.splice(0);

    // when there is face detected
    if (results.length > 0){
      let keypoints = results[0].keypoints;

      playerEyeOpen = checkEyeClose(keypoints);
      console.log(playerEyeOpen);
      
      // get all the position of the vertex of the right eye
      for (let i = 0; i < rightCoor.length; i++){
        let pos = keypoints[rightCoor[i]];
        rightPos.push({x: pos.x, y: pos.y});

        // drawing the point
        // const point = document.createElement("div");
        // point.setAttribute("class", "keypoints");
        // point.style = "left: " + pos.x + "px; top: " + pos.y + "px;";

        // liveView.appendChild(point);
        // points.push(point);

      }

      // get all the position of the vertex of the left eye
      for (let i = 0; i < leftCoor.length; i++){
        let pos = keypoints[leftCoor[i]];
        leftPos.push({x: pos.x, y: pos.y});

        // drawing the point
        // const point = document.createElement("div");
        // point.setAttribute("class", "keypoints");
        // point.style = "left: " + pos.x + "px; top: " + pos.y + "px;";

        // liveView.appendChild(point);
        // points.push(point);
      }

    }

    
  });

  window.requestAnimationFrame(detectWebcam);
}


// check whether the play's eyes are closed
function checkEyeClose(keypoints){
    let threshold = 8;
        
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