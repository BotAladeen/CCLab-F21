let song;
let sound;
let amp;

function preload(){
  sound=loadSound("assets/beat.mp3");
  song=loadSound("assets/song.mp3");
}
function setup() {
  frameRate(165);
  let canvas=createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(userStartAudio);
  background(220);
  amp=new p5.Amplitude();
  // mic=new p5.AudioIn();
  // mic.start();
}

function draw() {
  // let volume=map(mouseY,0,height,0.7,0.1) ; song.setVolume(volume);
  // let freq=map(mouseX,0,width,0.02,0.08);
  let vol=amp.getLevel();
  background(10,20);
  // push();
  // translate(width/2,height);
  // let x=-200* cos(PI/2+PI/6*sin(freq*frameCount));
  // let y=-200* sin(PI/2+PI/6*sin(freq*frameCount));
  //   line(0,0,x,y);
  // circle(x,y,20);
  // if(x==0){
  //   sound.play();
  // }
  // pop();

  push();
  noStroke();
  fill(240,0,0);
  circle(width/2,height/2,map(vol,0,1,200,700));
  pop();

}
function mousePressed(){
  if(!song.isPlaying()){
    song.play();
  }

}
// function mouseDragged(){
//   if(!sound.isPlaying()){
//   sound.play();
//   }
// }
