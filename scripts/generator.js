const ctx = canvas.getContext('2d');

const P2 = (x, y) => ({
    x,
    y
});
const EDGES = 6;
const RADIUS = 20;
const TAU = 2 * Math.PI;
const EDGE_LEN = Math.sin(Math.PI / EDGES) * RADIUS * 2;
const GRID_Y_SPACE = Math.cos(Math.PI / EDGES) * RADIUS * 2;
const GRID_X_SPACE = RADIUS * 2 - EDGE_LEN * 0.5;
const GRID_Y_OFFSET = GRID_Y_SPACE * 0.5;
const COLS = "=#3c2f18,#01335f,#3f0e77,#204a73,#511d94,#fe1f00,#0060fd,#fe7603,#f0ca1d,#b085e8,#e9cafa".split(",");
const rndItem = arr => arr[Math.random() * arr.length | 0];

drawGrid(1, 1, 15, 13, createPoly(EDGES));

function drawGrid(x, y, w, h, points) {
    const p = P2();
    var gy, gx;
    for (gy = y; gy < y + h; gy++) {
        for (gx = x; gx < x + w; gx++) {
            ctx.fillStyle = rndItem(COLS);
            drawPoly(gridToPixel(gx, gy, p), points);
        }
    }
}

function gridToPixel(gx, gy, p = {}) {
    p.x = gx * GRID_X_SPACE;
    p.y = gy * GRID_Y_SPACE + (gx % 2 ? GRID_Y_OFFSET : 0);
    return p;
}

function drawPoly(p, points) { // p.x, p.y is center
    ctx.setTransform(1, 0, 0, 1, p.x, p.y);
    var i = 0;
    ctx.beginPath();
    while (i < points.length) {
        const p2 = points[i++];
        ctx.lineTo(p2.x, p2.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function createPoly(sides, points = []) {
    const step = TAU / sides;
    var ang = 0,
        i = sides;
    while (i--) {
        points.push(P2(RADIUS * Math.cos(ang), RADIUS * Math.sin(ang)));
        ang += step;
    }
    return points;
}