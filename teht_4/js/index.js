//const taskSixCanvas = document.querySelector('#taskSixCanvas');
let taskNineCanvas;
const x1 = document.querySelector('#x1');
const x2 = document.querySelector('#x2');
const y1 = document.querySelector('#y1');
const y2 = document.querySelector('#y2');
const canvasHeight = document.querySelector('#canvasHeight');
const canvasWidth = document.querySelector('#canvasWidth');
const taskNineButton = document.querySelector('#taskNineButton');
const canvasButton = document.querySelector('#taskNineCanvasButton');
const canvasHolder = document.querySelector('#canvasHolder');

const adviceText = document.querySelector('#adviceText');
const drawnLineArray=[];
let storageNumber=0;

const storageHandler = ()=>{
  if (typeof(Storage) !== "undefined") {
    console.log('Storage löytyy');
    return true;
  } else {
    adviceText.innerHTML = 'Webstorage ei toimi';
    return false;
  }
};

const storage = storageHandler();


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
const fitInCanvas= (canvasArray, coordinatesArray)=>{
     if(rightNumber(canvasArray[0],coordinatesArray[0]) ||
         rightNumber(canvasArray[1],coordinatesArray[1]) ||
         rightNumber(canvasArray[0],coordinatesArray[2]) ||
         rightNumber(canvasArray[1],coordinatesArray[3])) return false;
  return true;
};

// first checks if x y values are right size, if so draws the line
const checkThenDraw= (canvas, coordinatesArray, redraw)=>{
  if( fitInCanvas([canvas.width,canvas.height], coordinatesArray)) {
    adviceText.innerHTML = "new line drawn!";

    if(!redraw) {
      if(storage){
      for(let coordinate of coordinatesArray){
        storageSetter(storageNumber,coordinate);
        storageNumber++;

      }
    }
      drawnLineArray.push(coordinatesArray);
    }
    drawLine(canvas, coordinatesArray[0],coordinatesArray[1],coordinatesArray[2],coordinatesArray[3]);
  }else{
    adviceText.innerHTML = `Didn't draw line with X ${coordinatesArray[0]} -> ${coordinatesArray[2]} and Y ${coordinatesArray[1]} -> ${coordinatesArray[3]}`;
  }
};

const drawAgain=(canvas, array)=>{
  for(let arr of array){
     checkThenDraw(canvas, arr, true);
  }
};

// removes the old canvas and creates a new one
const createCanvas= ()=>{
  if(canvasHolder.firstChild) canvasHolder.removeChild(canvasHolder.childNodes[0]);
  taskNineCanvas = document.createElement('canvas');
  taskNineCanvas.id = 'taskNineCanvas';
  taskNineCanvas.height = canvasHeight.value;
  taskNineCanvas.width = canvasWidth.value;
  canvasHolder.appendChild(taskNineCanvas);
  if(storage) {
    drawAgain(taskNineCanvas, storageArray());
  }else{
    drawAgain(taskNineCanvas, drawnLineArray);
  }
};

const storageArray = ()=>{
  const bigArray=[];
  for(let i=0; i<storageNumber;i+=4){
    const smallArray=[];
    smallArray.push(storageGetter(i));
    smallArray.push(storageGetter(i+1));
    smallArray.push(storageGetter(i+2));
    smallArray.push(storageGetter(i+3));
    bigArray.push(smallArray);
  }
  return bigArray;
};

const storageSetter = (name, value) =>{
      localStorage.setItem('coordinates'+name.toString(), value);
};

const storageGetter = (name) =>{
      return localStorage.getItem('coordinates'+name.toString());
};

// adds functionality to canvas button
canvasButton.addEventListener('click',()=>{
  createCanvas();
});

// adds functionality to draw button
taskNineButton.addEventListener('click',()=>{
  checkThenDraw(taskNineCanvas, [x1.value,y1.value,x2.value,y2.value], false);
});

// as the page loads creates canvas
createCanvas();
localStorage.clear();
