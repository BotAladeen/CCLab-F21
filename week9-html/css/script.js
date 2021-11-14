console.log("Loaded!");

/*for (i=0; i<5; i++){
let newBtn=document.createElement('button');
newBtn.style.width='100px';
newBtn.style.height='75px';
newBtn.style.margin='20px';
newBtn.addEventListener('click', function(){
  let body =document.body;
  let r= Math.floor(Math.random()*255);
let g= Math.floor(Math.random()*255);
let b= Math.floor(Math.random()*255);
  body.style.backgroundColor="rgb( "+ r +" ," + g + "," + b + ")";
});
document.body.appendChild(newBtn);
}*/

/*function PhilFunction() {
  //alert('clicked!');
  let body =document.body;
  let r= Math.floor(Math.random()*255);
let g= Math.floor(Math.random()*255);
let b= Math.floor(Math.random()*255);

  body.style.backgroundColor="rgb( "+ r +" ," + g + "," + b + ")";
}*/

// let newDiv=document.createElement('div');
// newDiv.style.backgroundColor('pink');
// newDiv.style.width='200px';
// newDiv.style.height='150px';
// newDiv.style.margin='20px';

function setup(){
  createCanvas(windowWidth,windowHeight);
}
function draw(){
  background(150);
}
