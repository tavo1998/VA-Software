const canvasWidth = 600;
const canvasHeight = 700;

let canvas;

function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(200);
  centerCanvas(canvas);
}

function draw() {
  colorMode(RGB);
  fill(200,100,50);
  circle(canvasWidth / 2,canvasHeight / 2, 100);
  console.log(movedX)
}

function windowResized() {
  centerCanvas();
}

