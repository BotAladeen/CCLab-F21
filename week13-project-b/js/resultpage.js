let floatingItems=[];
let investmentNum;
let successRates = [0.53, 0.41, 0.57, 0.91, 0.52];
let returnRates = [2.15, 2.83, 2.74, 1.56, 4.78];
let successRate;
let returnRate;
let investmentAmount;
let investmentProfit;
let decider;
function preload(){
 successMusic=loadSound("assets/moneydropping.mp3");
 failMusic=loadSound("assets/xpshutdown.mp3");
}

function setup() {
let canvas=createCanvas(windowWidth, windowHeight);
canvas.class('background1');
background(255);
for(i=0;i<50;i++){
  floatingItems.push(new Money(random(width),random(height),random(-5,5),random(-5,5),100));
}
  decider=random(0,1);
  investmentNum= getItem("investmentNum");
  investmentAmount=getItem('investmentAmount');
  console.log(investmentNum);
  console.log(investmentAmount);
successRate = successRates[investmentNum - 1];
returnRate = returnRates[investmentNum - 1];
investResult();
saveResult();
let button=createButton('Continue');
button.position(width/2-width/25,800);
button.style('z-index',2);
if (decider<= successRate){
  button.style('background-color','white');
} else if(decider>successRate){
  button.style('background-color','gray');
}
button.style('color','black');
button.style('font-family','fantasy');
button.style('font-size',30+'px')
button.mousePressed(function(){window.open('investment-page-'+(investmentNum*1+1)+'.html',"_self");})
playmusic();
}

function draw() {
  if (decider<= successRate){
    background(255);
    for (i=0;i<floatingItems.length;i++)  {
      let f=floatingItems[i];
      f.Wiggle();
      f.move();
      f.bump();
      f.display();
    }
  }else if (decider > successRate) {
    background(90);
    for (i=0;i<floatingItems.length;i++)  {
      let f=floatingItems[i];
      f.Wiggle();
      f.move();
      f.bump();
      f.display();
      f.disappear(0.9);
      if(f.isDone==true){
        floatingItems.splice(i,1);
      }
    }
  }

showResult();
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
  this.p=0;
  this.chance=0;
  this.isDone=false;
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
disappear(chance){
  this.chance=chance;
 this.p=random(0,100);
  if(this.p<this.chance){
    this.isDone=true;
  }
}
}

function investResult () {
if (decider <= successRate) {
  investmentProfit = ceil(investmentAmount * returnRate);
} else if (decider >= successRate) {
  investmentProfit = -investmentAmount;
 }
}

function showResult(){
  push();
textSize(80);
textAlign(CENTER);
stroke(0);
if (decider <= successRate) {
  text("Congratulations, Investment Successful!",width/2,height/2-70);
  textSize(60);
  text("Return: $ " + investmentProfit + " million" ,width/2,height/2+40);
} else if (decider > successRate) {
  text ("Investment Failed...",width/2,height/2-70);
  textSize(60);
  text("Loss: -$ " + -1*investmentProfit + " million" ,width/2,height/2+40);
}
  pop();
}

function saveResult(){
  storeItem('investment'+investmentNum+"Profit",investmentProfit);
  console.log('Profit of Investment '+ investmentNum + ':'+getItem('investment'+investmentNum+"Profit"));
}

function playmusic(){
  if (decider <= successRate) {
    failMusic.setVolume(0.2);
      successMusic.play();
    } else if (decider >= successRate) {
      failMusic.setVolume(0.2);
        failMusic.play();
    }
}
