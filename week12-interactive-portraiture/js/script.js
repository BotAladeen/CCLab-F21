let cam;
let mic;
let gridSize=5;
let noiseLevel;

function setup() {
  let canvas = createCanvas(1500, 1200);
  canvas.id('TVset');
  cam = createCapture(VIDEO);
  cam.hide();
  mic=new p5.AudioIn();
  mic.start();
  rectMode(CENTER);
}

function draw() {
  sliderSQ=document.getElementById('sliderSQ');
    noiseLevel=map(sliderSQ.value,0,100,255,0);
  background(255,noiseLevel);
  drawScreen();
drawAntenna();
  drawStereo(width/2-550,700,200,400);
    drawStereo(width/2+550,700,200,400);
}
function drawScreen(){
    push();
    strokeWeight(10);
  fill(255,15);
  rect(width/2-2,height/2-2,650,490);
   rect(width/2-2,height/2-2,810,610);
  pop();
  push();
  cam.loadPixels();
  for (let y = 0; y < cam.height; y+=gridSize) {
    for (let x = 0; x < cam.width; x+=gridSize) {
      let index = (x + y * cam.width) * 4;
      // cam
      let camR = cam.pixels[index + 0];
      let camG = cam.pixels[index + 1];
      let camB = cam.pixels[index + 2];
      let camA = cam.pixels[index + 3];
 let grayScl=(camR+camG+camB)/3;
      noStroke();
      fill(camR,camG,camB,camA);
      let shape=random(0,1);
      if (shape<0.5){
      circle(x+(width-cam.width)/2,y+(height-cam.height)/2,gridSize);
      } else {(rect(x+(width-cam.width)/2,y+(height-cam.height)/2,gridSize,gridSize))}
    }
  }
  pop();
}
function drawAntenna(){
  push();
  strokeWeight(10);
  line(width/2-200,292,width/2-250,50);
    line(width/2+200,292,width/2+250,50);
  pop();
}
function drawStereo(x,y,w,h){
  push();
  translate(x,y);
  let level=mic.getLevel();
  let diaIndex=map(level,0,1,0.8,1.2);
  strokeWeight(7);
  rect(0,0,w,h);
  circle(0,0,diaIndex*0.8*w);
  circle(0,0,diaIndex*0.3*w);
  rect(0,0.35*h,0.7*w,0.1*h);
  pop();
}
