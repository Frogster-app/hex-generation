var image = new Image();
image.onload = cutImageUp;
image.src = 'assets/tiles.fixed.png';

numColsToCut = 38;
numRowsToCut = 1;

widthOfOnePiece = 221;
heightOfOnePiece = 332;


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


function drawGrid(x, y, w, h, points, imagePieces) {
    const p = P2();
    var gy, gx;
    for (gy = y; gy < y + h; gy++) {
        for (gx = x; gx < x + w; gx++) {
            drawPoly(gridToPixel(gx, gy, p), points, imagePieces);
        }
    }
}

function gridToPixel(gx, gy, p = {}) {
    p.x = gx * GRID_X_SPACE;
    p.y = gy * GRID_Y_SPACE + (gx % 2 ? GRID_Y_OFFSET : 0);
    return p;
}

function drawPoly(p, points, imagePieces) {

    ctx.setTransform(0.9, 0, 0, 0.9, p.x, p.y);
    var i = 0;
    ctx.beginPath();
    while (i < points.length) {
        const p2 = points[i++];
        ctx.lineTo(p2.x, p2.y);
    }
    ctx.closePath();

    var img = new Image();
    img.src = rndItem(imagePieces);

    img.onload = function() {
        var pattern = ctx.createPattern(img, "no-repeat");
        ctx.fillStyle = pattern;
        ctx.fill();
    }

    ctx.stroke();

    /*  var img = new Image();
     img.src = rndItem(imagePieces);

     img.onload = function() {
         var i = 0;
         while (i < points.length) {
             const p2 = points[i++];
             ctx.drawImage(img, 1, 1, 30, 30, p2.x, p2.y);
         }
     } */

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


function cutImageUp() {
    var imagePieces = [];
    for (var x = 0; x < numColsToCut; ++x) {
        for (var y = 0; y < numRowsToCut; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    drawGrid(1, 1, 15, 13, createPoly(EDGES), imagePieces);
}