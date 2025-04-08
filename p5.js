
let entradaRebanadas;
let cantidadRebanadas = 0;

function setup() {
  createCanvas(900, 400);
  angleMode(DEGREES);

  entradaRebanadas = createInput('6');
  entradaRebanadas.position(10, height + 10);
  entradaRebanadas.input(() => {
    const valor = int(entradaRebanadas.value());
    if (valor > 0 && valor <= 360) {
      cantidadRebanadas = valor;
    }
  });
}

function draw() {
  background(240);
  textSize(14);
  fill(0);

  let centros = [
    { x: 150, y: 180 },
    { x: 450, y: 200 },
    { x: 750, y: 180 }
  ];
  let radio = 100;

  text("DDA", centros[0].x - 15, 30);
  text("Bresenham", centros[1].x - 35, 30);
  text("Punto-pendiente", centros[2].x - 50, 30);

  dibujarCirculo(centros[0].x, centros[0].y, radio);
  dibujarCirculo(centros[1].x, centros[1].y, radio);
  dibujarCirculo(centros[2].x, centros[2].y, radio);

  rebanadasDDA(centros[0].x, centros[0].y, radio, cantidadRebanadas);
  rebanadasBresenham(centros[1].x, centros[1].y, radio, cantidadRebanadas);
  rebanadasPendiente(centros[2].x, centros[2].y, radio, cantidadRebanadas);
}

function dibujarCirculo(x, y, r) {
  noFill();
  stroke(0);
  ellipse(x, y, r * 2);
}

function rebanadasDDA(cx, cy, r, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    let angulo = (360 / cantidad) * i;
    let x1 = cx;
    let y1 = cy;
    let x2 = cx + r * cos(angulo);
    let y2 = cy + r * sin(angulo);
    lineaDDA(x1, y1, x2, y2);
  }
}

function lineaDDA(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let pasos = max(abs(dx), abs(dy));
  let incX = dx / pasos;
  let incY = dy / pasos;
  let x = x0;
  let y = y0;
  stroke(255, 0, 0);
  for (let i = 0; i <= pasos; i++) {
    point(round(x), round(y));
    x += incX;
    y += incY;
  }
}

function rebanadasBresenham(cx, cy, r, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    let angulo = (360 / cantidad) * i;
    let x2 = cx + r * cos(angulo);
    let y2 = cy + r * sin(angulo);
    lineaBresenham(cx, cy, round(x2), round(y2));
  }
}

function lineaBresenham(x0, y0, x1, y1) {
  stroke(0, 0, 255);
  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    point(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function rebanadasPendiente(cx, cy, r, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    let angulo = (360 / cantidad) * i;
    let x2 = cx + r * cos(angulo);
    let y2 = cy + r * sin(angulo);
    lineaPendiente(cx, cy, x2, y2);
  }
}

function lineaPendiente(x0, y0, x1, y1) {
  stroke(0, 150, 0);
  if (x0 === x1) {
    for (let y = min(y0, y1); y <= max(y0, y1); y++) {
      point(x0, y);
    }
    return;
  }
  let m = (y1 - y0) / (x1 - x0);
  for (let x = min(x0, x1); x <= max(x0, x1); x++) {
    let y = m * (x - x0) + y0;
    point(x, round(y));
  }
}
