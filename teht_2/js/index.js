const taskFourCanvas = document.querySelector("#taskFourCanvas");
const taskFourButton = document.querySelector('#taskFourButton');
const taskFiveCanvas = document.querySelector("#taskFiveCanvas");
const taskFiveButton = document.querySelector('#taskFiveButton');
const taskFiveSliderHor = document.querySelector('#taskFiveSliderHor');
const taskFiveSliderVer = document.querySelector('#taskFiveSliderVer');


const canvasWidth = taskFourCanvas.width;
const canvasHeight = taskFourCanvas.height;
let patternHeight = 20;
let patternWidth = 80;
let   canvasLoop = Math.round(canvasWidth / patternWidth);
let   patternLoop = Math.round(canvasHeight / (patternHeight*2));

//takes coordinates and canvas as parameter. Draws the line
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

const drawSinglePattern = (canvas, startHeight, startWidth, patternWidth, patternHeight)=>{

  const height= startHeight + patternHeight;
  const width = startWidth + patternWidth;

  drawLine(canvas, startWidth, startHeight, width, height);
  drawLine(canvas, width, height, startWidth , height + patternHeight);
};

const drawCanvasPattern = (canvas, patternWidth, patternHeight, canvasLoop, patternLoop)=>{
  let startWidth = 0;

  for(let i= 0; i<canvasLoop; i++){
    let startHeight = 0;
    for(let j=0; j<patternLoop; j++){
      // console.log( startHeight, startWidth, patternWidth, patternHeight);
      drawSinglePattern(canvas, startHeight, startWidth, patternWidth, patternHeight);
      startHeight+= (patternHeight*2);
    }
    startWidth+=patternWidth;
  }
};

const patternLoopSetter= (newHeight)=>{
    patternHeight = newHeight;
    patternLoop = Math.round(canvasHeight / (patternHeight*2));
};
const canvasLoopSetter = (newWidth) =>{
    patternWidth = newWidth;
    canvasLoop = Math.round(canvasWidth / patternWidth);
};
const canvasLoopGetter = ()=>{
  return Number(canvasLoop);
};
const patternLoopGetter = () =>{
  return Number(patternLoop);
};
const patternHeightGetter= ()=>{
  return Number(patternHeight);
};
const patternWidthGetter= ()=>{
  return Number(patternWidth);
};

taskFourButton.addEventListener('click',() =>{
  cleanCanvas(taskFourCanvas);
  drawCanvasPattern(taskFourCanvas,patternWidthGetter(), patternHeightGetter(), canvasLoopGetter(), patternLoopGetter());
});

taskFiveButton.addEventListener('click',() =>{
  cleanCanvas(taskFiveCanvas);
  console.log(taskFiveSliderHor.value);
  console.log(taskFiveSliderVer.value);
  canvasLoopSetter(taskFiveSliderHor.value);
  patternLoopSetter(taskFiveSliderVer.value);
  drawCanvasPattern(taskFiveCanvas,patternWidthGetter(), patternHeightGetter(), canvasLoopGetter(), patternLoopGetter());
});