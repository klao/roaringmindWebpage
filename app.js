let ctx;
let width = 3840;
let height = 2160;

function main() {
  console.log("main");
  const windowX = window.innerWidth;
  const windowY = window.innerHeight;

  const cnvs = document.getElementById("cnvs");

  cnvs.style.width = `${windowX}px`;
  cnvs.style.height = `${windowY}px`;

  ctx = cnvs.getContext("2d");


  // figure =

    requestAnimationFrame(frame);
}


let frameCount = 0;
let stepFrequency = 20;
let didone = false;

function frame() {
  if (frameCount % 60 / stepFrequency == 0 && !didone) {
    nextStep();
    didone = true;
  }
  draw();
  requestAnimationFrame(frame);
}

function draw() {
  ctx.beginPath();


  for (let l of figure) {
    ctx.moveTo(l.a.x, l.a.y);
    ctx.lineTo(l.b.x, l.b.y);
  }

  ctx.stroke();
}

class Triangle {
  constructor(size, origin, rotation) {
    this.a = new Coordinate(origin.x, origin.y);
    this.b = new Coordinate(Math.cos(rotation * (Math.PI / 180)) * size + origin.x, Math.sin(rotation * (Math.PI / 180)) * size * -1 + origin.y);
    rotation += 60;
    this.c = new Coordinate(Math.cos((rotation) * (Math.PI / 180)) * size + origin.x, Math.sin(rotation * (Math.PI / 180)) * size * -1 + origin.y);
  }
}

class Line {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let figure = [];

function nextStep() {
  //let newFigure = figure;
  figure = [];

  let triangle = new Triangle(3840 / 3, new Coordinate(3840 / 3, 2160 / 4 * 3), 90);

  figure.push(new Line(triangle.a, triangle.b));
  figure.push(new Line(triangle.b, triangle.c));
  figure.push(new Line(triangle.c, triangle.a));

  for (let l of figure) {
    let xside = Math.pow(Math.abs(l.a.x - l.b.x), 2);
    let yside = Math.pow(Math.abs(l.a.y - l.b.y), 2);

    let size = Math.sqrt(xside, yside);

    let rotation = Math.atan2(l.a.x, l.a.y) * 180 / Math.PI;

    let triangle = new Triangle(size, l.a, rotation);

    newFigure.push(new Line(figure[i].a, triangle.a));
    newFigure.push(new Line(triangle.c, figure[i].b));
    newFigure.push(new Line(triangle.a, triangle.b));
    newFigure.push(new Line(triangle.b, triangle.c));
  }


  // if (figure.length == 0) {
    // let triangle = new Triangle(3840 / 3, new Coordinate(3840 / 3, 2160 / 4 * 3), 90);

    // figure.push(new Line(triangle.a, triangle.b));
    // figure.push(new Line(triangle.b, triangle.c));
    // figure.push(new Line(triangle.c, triangle.a));
  //   return;
  // }
}

window.onload = main;
