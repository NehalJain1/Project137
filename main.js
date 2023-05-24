status = "";
input = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,480);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("object_input").value;
    console.log("Input = " + input);
}

function modelLoaded() {
    console.log("Model has loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }

function draw() {
    image(video, 0, 0, 480, 380);

    if(status != "")
      {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          noFill();
        stroke("#FF0000")

          if(objects[i].label == input) {
        video.hide();
        objectDetector.detect(gotResult);
        document.getElementById("object_found").innerHTML =  input + " found";
        document.getElementById("status").innerHTML = "Status : Detected Objects";
        speak();
          }
else {
  document.getElementById("object_found").innerHTML =  input + " not found";
  document.getElementById("status").innerHTML = "Status : Detected Objects";
}
        }

      } 
}

function speak() {
  //Synth is the variable which is holding the text to speech API
  var synth = window.speechSynthesis;
  speak_data1 = input + " found";
  var utterThis = new SpeechSynthesisUtterance(speak_data1);
  synth.speak(utterThis);
}
