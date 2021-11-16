let img;

function preload(){
  img=loadImage("asset/sprite.png");
}

function setup() {
  createCanvas(800, 800);
  background(220);
}

function draw() {
    background(220,5);
    translate(mouseX,mouseY);
    imageMode(CENTER);
    dia=map(sin(0.05*frameCount),-1,1,50,150);
  image(img,0,0,dia,dia);

}
