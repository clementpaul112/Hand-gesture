prediction_1 = "";
prediction_2 = "";

Webcam.set({
  width:350,
  height:300,
  image_format:'png',
  png_quality:90
})

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    console.log("test1");
    Webcam.snap(function(data_uri) {
        console.log("test2");
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    }
        );
}
console.log("ml5 version",ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/CYcgqQ6s2/model.json",modelLoaded);

function speak()
{
  var synth = window.speechSynthesis;
  speak_data_1="The first prediction is" + prediction_1;
  speak_data_2="The second prediction is" + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
  utterThis.rate=0.5;
  synth.speak(utterThis)
}

function check()
{
  img = document.getElementById('result');
  Classifier.classify(img, gotresult());
}

function modelLoaded()
{
  console.log(modelLoaded);
}

function gotresult()
{
  if(error)
  {
    console.error(error);
  }
  else
  {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    document.getElementById("result_gesture_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if (results[0] == "amazing")
    {
      document.getElementById("updaate_gesture").innerHTML = "&#128076";
    }
    if (results[0] == "best")
    {
      document.getElementById("updaate_gesture").innerHTML = "&#128077";
    }
    if (results[0] == "victory")
    {
      document.getElementById("updaate_gesture").innerHTML = "&#9996";
    }

    if (results[1] == "amazing")
    {
      document.getElementById("updaate_gesture").innerHTML = "&#128076";
    }
    if (results[1] == "best")
    {
      document.getElementById("updaate_gesture").innerHTML = "&#128077";
    }
    if (results[1] == "victory")
    {
      document.getElementById("updaate_gesture").innerHTML = "&#9996";
    }
  }
}