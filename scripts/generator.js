const ctx = canvas.getContext('2d');

const P2 = (x, y) => ({
    x,
    y
});

const EDGES = 6;
const RADIUS = 30;
const TAU = 2 * Math.PI;
const EDGE_LEN = Math.sin(Math.PI / EDGES) * RADIUS * 2;
const GRID_Y_SPACE = Math.cos(Math.PI / EDGES) * RADIUS * 2;
const GRID_X_SPACE = RADIUS * 2 - EDGE_LEN * 0.5;
const GRID_Y_OFFSET = GRID_Y_SPACE * 0.5;
const COLS = "#fff"
const rndItem = arr => arr[Math.random() * arr.length | 0];

function createTiles(image, tiles = []) {
    const img = new Image();
    img.src = image;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    for (let y = 0; y < img.height; y += 332) {
        for (let x = 0; x < img.width; x += 221) {
            const tile = ctx.getImageData(x, y, 221, 332);
            tiles.push(tile);
        }
    }
    return tiles;
}

initSlice('assets/tiles.png', 'sliceImages')
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
    ctx.setTransform(0.9, 0, 0, 0.9, p.x, p.y);
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