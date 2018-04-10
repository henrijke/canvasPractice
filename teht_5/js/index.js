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
let lineCounter= 0;

const drawLine=(canvas, fromX, fromY, whereX, whereY, save)=>{
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(whereX, whereY);
  ctx.stroke();
  if(save) saveToLocal(fromX, fromY, whereX, whereY);
};

const cleanCanvas = (canvas)=>{
  canvas.getContext("2d").clearRect(0,0,canvasWidth,canvasHeight);
  loadFromLocal();
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
      drawLine(taskTenCanvas,mouseFromX,mouseFromY,mouseToX,mouseToY, false);
    }

  });
  taskTenCanvas.addEventListener('click',(event)=>{

    if (clickMemory){
      mouseToX = event.x - taskTenCanvas.offsetLeft;
      mouseToY = event.y - taskTenCanvas.offsetTop;
      taskTenCanvas.style.cursor = "default";
      drawLine(taskTenCanvas,mouseFromX,mouseFromY,mouseToX,mouseToY, true);
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

const loadFromLocal = ()=>{
    for(let i = 0; i<lineCounter; i++){
      let listToDraw= [];
      listToDraw.push(localStorage.getItem(`lineFromX${i}`));
      listToDraw.push(localStorage.getItem(`lineFromY${i}`));
      listToDraw.push(localStorage.getItem(`lineToX${i}`));
      listToDraw.push(localStorage.getItem(`lineToY${i}`));
      drawLine(taskTenCanvas,listToDraw[0],listToDraw[1],listToDraw[2],listToDraw[3], false);
      console.log('drawn');
    }

};

const saveToLocal = (fromX,fromY,toX,toY)=>{
  localStorage.setItem(`lineFromX${lineCounter}`, fromX);
  localStorage.setItem(`lineFromY${lineCounter}`, fromY);
  localStorage.setItem(`lineToX${lineCounter}`, toX);
  localStorage.setItem(`lineToY${lineCounter}`, toY);
  lineCounter ++;
  console.log(lineCounter);
};

createCanvas();