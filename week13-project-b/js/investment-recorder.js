let investmentNum =1; //getItem("investmentNum");
let successRates = [0.53, 0.41, 0.57, 0.91, 0.59];
let returnRates = [2.15, 2.83, 2.74, 1.56, 4.78];
let successRate = successRates[investmentNum - 1];
let returnRate = returnRates[investmentNum - 1];
let investAmount = 100;
let investReturn;

function setup() {
let decider = random(0, 1);
let canvas=createCanvas(400,200);
canvas.class('investment-recorder');
}

function draw(){
if (decider <= successRate) {
  text("Congratulations, Investment Successful!",0,0);
  investReturn = investAmount * returnRate;
  alert("Your Return is $ " + investReturn + " million");
} else if (decider >= successRate) {
  text ("Investment Failed...",0,0);
  investReturn = 0;
  alert("Your $ " + investAmount + " million simply evaporated...");
  storeItem("investment" + investmentNum + "Return", investReturn);
}
storeItem("investmentNum", investmentNum + 1);
}
