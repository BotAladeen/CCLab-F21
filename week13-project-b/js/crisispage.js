//corresponding html renamed as investment-page-6 for convenience


let bkgGS=255;
let textGS=255;

function setup(){
  textAlign(CENTER);
  rectMode(CENTER);
  noCursor();
  let canvas=createCanvas(windowWidth, windowHeight);
  canvas.class('background');
  profitSum();
  let button=createButton('Continue');
  button.position(width/2-width/19.5,800);
  button.style('z-index',2);
  button.style('background-color','rgba('+20+','+20+','+20+',' +1+')');
  button.style('color','gray');
  button.style('font-family','fantasy');
  button.style('font-size',40+'px')
  button.mousePressed(function(){window.open('end-page.html', "_self");})
}

function draw(){
  if(textGS>=20){
  textGS=255-2*frameCount;
}

  if (textGS<20.1 && bkgGS>19.9){
    bkgGS=255-frameCount;
  }
background(bkgGS);
if (bkgGS<=20){
  push();
  noStroke();
  fill("LightYellow");
  circle(mouseX,mouseY,width/4);
  fill("Ivory");
  circle(mouseX,mouseY,width/6.5);
  pop();
}
profitShow();

}
function profitSum(){
  investment1Profit=getItem("investment1Profit");
  investment2Profit=getItem("investment2Profit");
  investment3Profit=getItem("investment3Profit");
  investment4Profit=getItem("investment4Profit");
  investment5Profit=getItem("investment5Profit");
  totalProfit= investment1Profit+investment2Profit+investment3Profit+investment4Profit+investment5Profit;
}
function profitShow(){
  push();

    textSize(50);
fill(textGS);
  if (totalProfit>0){
   text('Out of clever investments, you made $ ' + totalProfit + ' million in total',width/2,150);
   text('Yet, in this prosperous market, a crisis began to spread its shadows...',width/2,360,0.8*width,300);
   text('Suddenly, out of thin air, defaults emerge one right after another',width/2,400);
    text('You were smart enough to make an well-timed exit',width/2,550);
      text('But looking at the desperate people, you start to reflect on the purpose of this industry...',width/2,800,width*0.85,300);
  } else if (totalProfit<=0){
    text('You have made a loss of $ ' + -1*totalProfit + ' million in total',width/2,300);
    text('Failing to profit is unacceptable in this profit-chasing industry',width/2,425);
     text('You Are Fired',width/2,550);
  }
  pop();
}
