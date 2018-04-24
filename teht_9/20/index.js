const button = document.querySelector('#animationButton');
const animate = document.querySelector('#animationElement');
const platform = document.querySelector('#animationPlatform');
let animationDeg=0;
let animationAdd = 5;
let interval= null;
let buttonInterval= null;
let posX=0;
let posY=0;
let posXAdd=1;
let posYAdd= 1;
let color=0;
let colorAdd=1;
let rotation= 0;


const animationFunction = ()=>{

  posX+=posXAdd;
  posY+=posYAdd;
  animate.style.top = posY + "px";
  animate.style.left = posX + "px";
  animate.style.backgroundColor= `rgb(140,10,${color})`;
  color+=colorAdd;
  animate.style.transform ="skewY("+animationDeg+"deg)";
  animationDeg+=animationAdd;

  if(animationDeg>40 || animationDeg<-40){
    animationAdd= animationAdd * -1;
  }
  if(color >250 || color<0){
    colorAdd= colorAdd*-1;
  }
  if (posY+animate.offsetHeight > platform.offsetHeight || posY < 0){
    posYAdd= posYAdd*-1;
  }
  if (posX+animate.offsetWidth > platform.offsetWidth || posX < 0){
    posXAdd= posXAdd*-1;
  }

};

const buttonRotate=()=>{
  button.style.transform= `rotate(${rotation}deg)`;
  rotation ++;
  if(rotation>360){rotation=0;}
};

button.addEventListener('click', ()=>{
  if(interval){
    clearInterval(interval);
    interval = null;
    clearInterval(buttonInterval);
    buttonInterval= null;
  }else{
    interval = setInterval(animationFunction, 10);
    buttonInterval = setInterval(buttonRotate,10);
  }

});