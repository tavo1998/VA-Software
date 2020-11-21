const canvasWidth = 600;
const canvasHeight = 800;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  background(200);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function draw() {
  colorMode(RGB);
  fill(200,100,50);
  circle(canvasWidth / 2,canvasHeight / 2, 100);
}