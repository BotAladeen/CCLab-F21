let floatingItems=[];
// declare variables

function setup() {
  let canvas=createCanvas(windowWidth, windowHeight);
  canvas.class('background');
  background(255);
  for(i=0;i<70;i++){
    floatingItems.push(new Money(random(width),random(height),random(-5,5),random(-5,5),100));
  }
}

function draw() {
  background(255);
  for (i=0;i<floatingItems.length;i++)  {
    let f=floatingItems[i];
    f.Wiggle();
    f.move();
    f.bump();
    f.display();
  }
}
class Money{
  constructor(x,y,xSpd,ySpd,size){
    this.x=x;
    this.y=y;
    this.xSpd=xSpd;
    this.ySpd=ySpd;
    this.size=size;
    this.type=random(['dollar','euro','cny','pound']);
    this.wiggle=0;
    this.wigglevar=random(-3,3);
  }
  display(){
    push();
    textSize(this.size);
    translate(this.x,this.y);
    rotate(this.wiggle);
    if (this.type=='dollar'){
      fill(17, 140, 79);
      text('$',0,0);
    }
    if (this.type=='euro'){
      fill('Gold');
      text('€',0,0);
    }
    if (this.type=='cny'){
      fill(204, 35, 42);
      text('¥',0,0);
    }
    if (this.type=='pound'){
      fill(46, 117, 182);
      text('£',0,0);
    }
    pop();
  }
  move(){
    this.x+=this.xSpd;
    this.y+=this.ySpd;
  }
  Wiggle(){
    this.wiggle=0.5*sin(0.05*frameCount+this.wigglevar);
  }
  bump(){
    if(this.x<0||this.x>width){
      this.xSpd=-this.xSpd;
    }
    if(this.y<0||this.y>height){
      this.ySpd=-this.ySpd;
    }
  }
}
