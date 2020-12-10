//Tamaño del canvas
const canvasWidth = 600;
const canvasHeight = 700;

// selector de tipo de fractal
let radio;

let canvas;
//Lineas a dibujar
let lines = []

// Arboles a dibujar
let trees = []

//Cantidad de recursividad a realizar
let countKoch = 0;
let countTree = 0;

//Variables que manejan el centro de dibujo del fractal para poder desplazarlo.
let translateX = 1;
let translateY = 1;

//Variable de escala
let factorScale = 1;

//Coordenadas mouse
let coorMouseX;
let coorMouseY;

//Centrar canvas en la mitad de la pantalla
function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

//Crear el canvvas con dimensiones canvasWidth, canvasHeight y color de fondo
//Se crea las primeras lineas que forman el triangulo
function setup() {
    //Se crea el botón para seleccionar entre el par de fractales
    radio = createRadio();
    radio.option('Tree');
    radio.option('Koch');
    radio.style('width', '60px');

    textAlign(CENTER);
    fill(255, 0, 0);
    canvas = createCanvas(canvasWidth, canvasHeight);
    centerCanvas(canvas);
    strokeWeight(0.3)
    stroke(0)
    background('rgb(0,0,0)');

    //Se crean las primeras lineas a dibujar
    trees.push(new Tree(createVector(canvasWidth / 2, canvasHeight), createVector(canvasWidth / 2, canvasHeight / 2), PI / 4));
    lines.push(new Line(createVector(0, canvasHeight / 4), createVector(canvasWidth, canvasHeight / 4), -PI / 3));
    lines.push(new Line(createVector(0, canvasHeight / 4), createVector(canvasWidth / 2, canvasHeight), PI / 3));
    lines.push(new Line(createVector(canvasWidth / 2, canvasHeight), createVector(canvasWidth, canvasHeight / 4), PI / 3));
}

//Función que dibuja en pantalla por cada frame
function draw() {
    //Trasladar la camara de acuerdo a las coordenadas del mouse
    coorMouseX = mouseX;
    coorMouseY = mouseY;
    translate(coorMouseX, coorMouseY);
    scale(factorScale);
    translate(-coorMouseX, -coorMouseY);
    translate();

    clear();   
    translate(translateX, translateY)

    radio.selected('Tree')
    let selected = radio.value()
    //Si el radio button es Tree dibuja el arbol
    if (selected == 'Tree') {
        for (lineToDraw of trees) {
            lineToDraw.drawTree();
        }
    //Si el radio button es Koch dibuja el copo de nieve
    } else {

        for (lineToDraw of lines) {
            lineToDraw.drawLine();
        }
    }

}

//Función que calcula la nueva posición del canvas cuando la ventana del navegador cambie de tamaño
function windowResized() {
    centerCanvas();
}

//Función callback que lee las teclas que se presionan para poder mover el fractal.
function keyPressed() {
    if (keyCode === UP_ARROW) {
        translateY -= 15
    } else if (keyCode === DOWN_ARROW) {
        translateY += 15
    } else if (keyCode === LEFT_ARROW) {
        translateX -= 15
    } else if (keyCode === RIGHT_ARROW) {
        translateX += 15
    } else if (keyCode === 32) {
        let linesToDraw = [];
        //Dibuja el arbol cuando se oprime la tecla espacio
        if (radio.value() === 'Tree' && countTree < 9) {
            for (treeToDivide of trees) {
                linesToDraw = linesToDraw.concat(treeToDivide.generateChildrenTrees());
            }
            trees = linesToDraw;
            countTree++;
          //Dibujar el copo de nieve cuando se oprime la tecla espacio
        } else if(radio.value() === 'Koch' && countKoch < 7) {
            for (lineToDivide of lines) {
                linesToDraw = linesToDraw.concat(lineToDivide.generateChildrenLines());
            }
            lines = linesToDraw;
            countKoch++;
        }
    }
}

//Listener que escucha la rueda del mouse y cambia el factor de escala
window.addEventListener("wheel", function(e) {
    if (e.deltaY > 0)
        factorScale *= 0.95;
    else
        factorScale *= 1.05;
});