let x=50;
function changeBox(){
  let b= document.getElementById('box');
  //console.log(b);
  b.innerHTML=x;
  x += 20;
  b.style.left = x+'px';
  b.style.backgroundColor="green";
}
function addBox(){
  let newElt= document.createElement('div');
  newElt.style.backgroundColor="yellow";
  newElt.style.left='50px';
  newElt.style.top='300px';
  newElt.style.width='200px';
  newElt.style.height='150px';
  document.body.appendChild(newElt);


}
