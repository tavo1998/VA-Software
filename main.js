//Tamaño del canvas
const canvasWidth = 600;
const canvasHeight = 700;


let canvas;
//Lineas a dibujar
let lines = []
//Cantidad de recursividad a realizar
let count = 0;
//Variables que manejan el centro de dibujo del fractal para poder desplazarlo.
let translateX = 1;
let translateY = 1;

//Variable de escala
let factorScale = 1;

//Coordenadas mouse
let coorMouseX;
let coorMouseY;

//Centrar canvas en la mitad de la pantalla
function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

//Crear el canvvas con dimensiones canvasWidth, canvasHeight y color de fondo
//Se crea las primeras lineas que forman el triangulo
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(200);
  centerCanvas(canvas);
  strokeWeight(0.3)
  lines.push(new Line(createVector(0 ,canvasHeight / 4), createVector(canvasWidth, canvasHeight / 4), -PI / 3));
  lines.push(new Line(createVector(0 ,canvasHeight / 4), createVector(canvasWidth / 2, canvasHeight), PI / 3));
  lines.push(new Line(createVector(canvasWidth / 2, canvasHeight), createVector(canvasWidth, canvasHeight / 4), PI / 3));
}

//Función que dibuja en pantalla por cada frame
function draw() {

  coorMouseX = mouseX;
  coorMouseY = mouseY;

  //Trasladar la camara de acuerdo a las coordenadas del mouse
  translate(coorMouseX, coorMouseY);
  scale(factorScale);
  translate(-coorMouseX, -coorMouseY);
  translate();

  clear();
  colorMode(RGB);
  background(200);
  translate(translateX,translateY)

  for(lineToDraw of lines){
    lineToDraw.drawLine();
  }

}

//Función que calcula la nueva posición del canvas cuando la ventana del navegador cambie de tamaño
function windowResized() {
  centerCanvas();
}

//Función callback que lee las teclas que se presionan para poder mover el fractal.
function keyPressed(){
  if(keyCode === UP_ARROW){
    translateY -= 15
  }else if(keyCode === DOWN_ARROW){
    translateY += 15
  }else if(keyCode === LEFT_ARROW){
    translateX-= 15
  }else if(keyCode === RIGHT_ARROW){
    translateX+= 15
  }else if(keyCode === 32 && count < 7){
    let linesToDraw = [];
    for(lineToDivide of lines){
      linesToDraw = linesToDraw.concat(lineToDivide.generateChildrenLines());
    }
    lines = linesToDraw;
    count++;
  }
}

//Listener que escucha la rueda del mouse y cambia el factor de escala
window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    factorScale *= 0.95;
  else
    factorScale *= 1.05;
});



