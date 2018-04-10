const adviceText = document.querySelector('#adviceText');
const canvasHolder = document.querySelector('#canvasHolder');
const mouseCoordinates = document.querySelector('#mouseCoordinates');
const canvasHeight = 150;
const canvasWidth = 300;
let clickMemory = false;
let mouseFromX;
let mouseFromY;
let mouseToY;
let mouseToX;

const drawLine=(canvas, fromX, fromY, whereX, whereY)=>{
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(whereX, whereY);
  ctx.stroke();
};

const cleanCanvas = (canvas)=>{
  canvas.getContext("2d").clearRect(0,0,canvasWidth,canvasHeight);
};

const createCanvas= ()=>{
  if(canvasHolder.firstChild) canvasHolder.removeChild(canvasHolder.childNodes[0]);
  const taskTenCanvas = document.createElement('canvas');
  taskTenCanvas.id = 'taskTenCanvas';
  taskTenCanvas.height = canvasHeight;
  taskTenCanvas.width = canvasWidth;
  taskTenCanvas.addEventListener('mousemove',(event)=>{
    mouseCoordinates.innerHTML = `X: ${event.x - taskTenCanvas.offsetLeft} Y: ${event.y - taskTenCanvas.offsetTop}`;

    if(clickMemory){
      mouseToX = event.x - taskTenCanvas.offsetLeft;
      mouseToY = event.y - taskTenCanvas.offsetTop;
      cleanCanvas(taskTenCanvas);
      drawLine(taskTenCanvas,mouseFromX,mouseFromY,mouseToX,mouseToY);
    }

  });
  taskTenCanvas.addEventListener('click',(event)=>{

    if (clickMemory){
      mouseToX = event.x - taskTenCanvas.offsetLeft;
      mouseToY = event.y - taskTenCanvas.offsetTop;
      taskTenCanvas.style.cursor = "default";
      drawLine(taskTenCanvas,mouseFromX,mouseFromY,mouseToX,mouseToY);
      clickMemory = false;
    }else{
      mouseFromX = event.x - taskTenCanvas.offsetLeft;
      mouseFromY = event.y - taskTenCanvas.offsetTop;
      taskTenCanvas.style.cursor = "crosshair";
      clickMemory = true;
    }

  });
  canvasHolder.appendChild(taskTenCanvas);
};



createCanvas();