//Tamaño del canvas
const canvasWidth = 600;
const canvasHeight = 700;

let canvas;
//Lineas a dibujar
let lines = []
//Cantidad de recursividad a realizar
let count = 0;
let slider;
//Variables que manejan el centro de dibujo del fractal para poder desplazarlo.
let translateX = 1;
let translateY = 1;

//Centrar canvas en la mitad de la pantalla
function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  slider = createSlider(0,500,0,100);
  slider.position(10, 300);
  slider.style('width', '80px');
}

//Crear el canvvas con dimensiones canvasWidth, canvasHeight y color de fondo
//Se crea las primeras lineas que forman el triangulo
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(200);
  centerCanvas(canvas);
  lines.push(new Line(createVector(0 ,canvasHeight / 4), createVector(canvasWidth, canvasHeight / 4), -PI / 3));
  lines.push(new Line(createVector(0 ,canvasHeight / 4), createVector(canvasWidth / 2, canvasHeight), PI / 3));
  lines.push(new Line(createVector(canvasWidth / 2, canvasHeight), createVector(canvasWidth, canvasHeight / 4), PI / 3));
}

//Función que dibuja en pantalla por cada frame
function draw() {
  clear();
  colorMode(RGB);
  background(200);
  translate(translateX,translateY)

  zoomFactor = slider.value();

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
    translateY -= 10
  }else if(keyCode === DOWN_ARROW){
    translateY += 10
  }else if(keyCode === LEFT_ARROW){
    translateX-= 10
  }else if(keyCode === RIGHT_ARROW){
    translateX+= 10
  }else if(keyCode === 32 && count < 7){
    let linesToDraw = [];
    for(lineToDivide of lines){
      linesToDraw = linesToDraw.concat(lineToDivide.generateChildrenLines());
    }
    lines = linesToDraw;
    count++;
  }
}

//Clase que representa las lineas que son dibujadas y permite calcular las divisiones
//donde la linea debe de cortarse para generar las nuevas
class Line {
  constructor(startPoint, endPoint, degree){
    //Vectors
    this.startPoint = startPoint.copy();
    this.endPoint = endPoint.copy();
    this.degree = degree;
  }

  //Función que calcula las nuevas posiciones de las lineas para realizar la división (creación de las nuevas líneas)
  generateChildrenLines(){
    let childrenLines = [];

    let distance = p5.Vector.sub(this.endPoint, this.startPoint);
    distance.div(3);

    //Vector B
    let vectorB = p5.Vector.add(this.startPoint, distance);
    let lineB = new Line(this.startPoint, vectorB, this.degree);
    childrenLines.push(lineB);

    //Vector D
    let vectorD = p5.Vector.sub(this.endPoint, distance);
    let lineD = new Line(vectorD, this.endPoint, this.degree);
    childrenLines.push(lineD);

    distance.rotate(this.degree);
    //Vector C
    let vectorC = p5.Vector.add(vectorB, distance);
    let lineC1 = new Line(vectorB, vectorC, this.degree);
    childrenLines.push(lineC1);

    //Vector D
    let lineC2 = new Line(vectorC, vectorD, this.degree);
    childrenLines.push(lineC2);

    return childrenLines;
  }

  //Función que dibuja una línea en el canvas, dependiendo de los puntos (vectores)
  drawLine(){
    line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y)
  }
}

