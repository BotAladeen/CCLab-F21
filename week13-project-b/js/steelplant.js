function preload(){
  steelplant=loadSound("assets/steelplant.mp3");
}
function setup() {
  canvas.mousePressed(userStartAudio);
}
function mousePressed(){
steelplant.stop();
  steelplant.play();
  steelplant.setVolume(0.3);
}
