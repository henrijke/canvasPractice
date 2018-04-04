const taskOneCanvas = document.querySelector("#taskOneCanvas");
const taskOneButton = document.querySelector('#taskOneButton');
const taskTwoCanvas = document.querySelector("#taskTwoCanvas");
const taskTwoButton = document.querySelector('#taskTwoButton');
const taskThreeCanvas = document.querySelector("#taskThreeCanvas");
const taskThreeButton = document.querySelector('#taskThreeButton');


//Array for task 2
const taskTwoArray = [200,20,20,120];


//takes coordinates and canvas as parameter. Draws the line
drawLine=(canvas, fromX, fromY, whereX, whereY)=>{
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(whereX, whereY);
  ctx.stroke();
};

taskOneButton.addEventListener('click',() =>{
  //normal array
  drawLine(taskOneCanvas,0,0,300,150);
});

taskTwoButton.addEventListener('click',()=>{
  //canvas from array
  drawLine(taskTwoCanvas,taskTwoArray[0],taskTwoArray[1],taskTwoArray[2],taskTwoArray[3]);
});

taskThreeButton.addEventListener('click',() =>{
  //multiple lines
  const canvasWidth = taskThreeCanvas.width;
  const canvasHeight = taskThreeCanvas.height;
  let startHeight = 0;
  let startWidth = 0;

  //draw horizontal lines
  for(let i=0; i<canvasWidth; i+=5){
    drawLine(taskThreeCanvas,startWidth,canvasHeight,startWidth,0);
    startWidth +=5;
  }

  //draw vertical lines
  for(let j=0; j <canvasHeight; j+=10){
    drawLine(taskThreeCanvas,0,startHeight,canvasWidth,startHeight);
    startHeight +=10;
  }
});