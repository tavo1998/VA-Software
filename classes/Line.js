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