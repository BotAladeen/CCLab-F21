function preload(){
  bgm=loadSound("assets/caromhall.mp3");
}
function setup() {
  canvas.mousePressed(userStartAudio);
}
function mousePressed(){
bgm.stop();
  bgm.play();
  bgm.setVolume(0.3,5,0.5);
}
