//Clase que representa los arboles que son dibujadas y permite calcular las divisiones
//donde nacen nuevas ramas (arboles)
class Tree {
    constructor(startPoint, endPoint, degree) {
        //Vectors
        this.startPoint = startPoint.copy();
        this.endPoint = endPoint.copy();
        this.degree = degree;
    }

    //Función que crea nuevo arboles
    generateChildrenTrees() {
        let childrenLines = [];

        let distance = p5.Vector.sub(this.endPoint, this.startPoint);
        distance.div(2);

        let line = new Tree(this.startPoint, this.endPoint, this.degree);
        childrenLines.push(line);


        //Vector A
        distance.rotate(this.degree);
        let vectorA = p5.Vector.add(this.endPoint, distance);

        let lineA = new Tree(this.endPoint, vectorA, this.degree);
        childrenLines.push(lineA);

        //Vector B
        distance.rotate(this.degree * -2);
        let vectorB = p5.Vector.add(this.endPoint, distance);
        let lineB = new Tree(this.endPoint, vectorB, this.degree);
        childrenLines.push(lineB);


        return childrenLines;
    }

    //Función que dibuja una línea Tree en el canvas, dependiendo de los puntos (vectores)
    drawTree() {
        line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y)
    }
}