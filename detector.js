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

    window.requestAnimationFrame(detectWebcam);
  });
}
