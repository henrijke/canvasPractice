//const taskSixCanvas = document.querySelector('#taskSixCanvas');
let taskSixCanvas;
const x1 = document.querySelector('#x1');
const x2 = document.querySelector('#x2');
const y1 = document.querySelector('#y1');
const y2 = document.querySelector('#y2');
const canvasHeight = document.querySelector('#canvasHeight');
const canvasWidth = document.querySelector('#canvasWidth');
const taskSixButton = document.querySelector('#taskSixButton');
const canvasButton = document.querySelector('#taskSixCanvasButton');
const canvasHolder = document.querySelector('#canvasHolder');

const adviceText = document.querySelector('#adviceText');

//takes coordinates and canvas as parameter. Draws the line
const drawLine=(canvas, fromX, fromY, whereX, whereY)=>{
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(whereX, whereY);
  ctx.stroke();
};

// checks if the testValue is under bigger but over 0
const rightNumber= (biggerValue, testValue) => {
  return (biggerValue < testValue || 0 > testValue);
};

// checks if value is fit for canvas, if not alerts
const fitInCanvas= (canvasValue, value)=>{
  if(rightNumber(canvasValue, value)){
    alert(`Viiva ei sovi canvaasille. Annoit arvon ${value}. Anna arvo 0 - ${canvasValue} välillä`);
    return false;
  }
  return true
};

// first checks if x y values are right size, if so draws the line
const checkThenDraw= (canvas, fromX, fromY, whereX, whereY)=>{

  if( fitInCanvas(canvas.width,fromX) &&
      fitInCanvas(canvas.width,whereX) &&
      fitInCanvas(canvas.height,fromY) &&
      fitInCanvas(canvas.height,whereY)) {
    adviceText.innerHTML = "new line drawn!";
    drawLine(canvas, fromX,fromY,whereX,whereY);
  }else{
    adviceText.innerHTML = "needs some fine tuning!";
  }
};

// removes the old canvas and creates a new one
const createCanvas= ()=>{
  console.log(canvasHolder.firstChild);
  if(canvasHolder.firstChild){
    canvasHolder.removeChild(canvasHolder.childNodes[0]);
  }
  taskSixCanvas = document.createElement('canvas');
  taskSixCanvas.id = 'taskSixCanvas';
  taskSixCanvas.height = canvasHeight.value;
  taskSixCanvas.width = canvasWidth.value;
  canvasHolder.appendChild(taskSixCanvas);
};

// adds functionality to canvas button
canvasButton.addEventListener('click',()=>{
  createCanvas();
});

// adds functionality to draw button
taskSixButton.addEventListener('click',()=>{
  checkThenDraw(taskSixCanvas, x1.value,y1.value,x2.value,y2.value);
});

// as the page loads creates canvas
createCanvas();