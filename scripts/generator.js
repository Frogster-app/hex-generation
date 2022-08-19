const RADIUS = 30,
    EDGE_LEN = 60 * Math.sin(Math.PI / 6),
    GRID_Y_SPACE = 60 * Math.cos(Math.PI / 6),
    GRID_X_SPACE = 60 - .5 * EDGE_LEN,
    GRID_Y_OFFSET = .5 * GRID_Y_SPACE,
    P2 = (a, b) => ({x: a,y: b});

let canvas='',
    ctx='';

function applyBiome(e) {
    // these thresholds will need tuning to match your generator
    if (e < 0.1) return ['#d4f1f9', 'Water'];
    else if (e < 0.2) return ['#f7e4c7', 'Beach'];
    else if (e < 0.3) return ['#7CFC00', 'Forest'];
    else if (e < 0.5) return ['#28a683', 'Jungle'];
    else if (e < 0.7) return ['#739a6d', 'Savannah'];
    else if (e < 0.9) return ['#FAD5A5', 'Dessert'];
    else return ['#fffafa', 'Snow'];
};

function drawGrid(x, y, w, h, points, heatmap, stroke) {
    const p = P2();
    var gy, gx;
    var loop = 0;
    for (gy = y; gy < y + h; gy++) {
        for (gx = x; gx < x + w; gx++) {
            drawPoly(gridToPixel(gx, gy, p), points, loop, heatmap, stroke);
            loop++;
        }
    }
};

function gridToPixel(gx, gy, p = {}) {
    p.x = gx * GRID_X_SPACE;
    p.y = gy * GRID_Y_SPACE + (gx % 2 ? GRID_Y_OFFSET : 0);
    return p;
};

function drawPoly(p, points, index, heatmap, stroke) {

    ctx.setTransform(0.9, 0, 0, 0.9, p.x, p.y);
    var i = 0;
    ctx.beginPath();

    while (i < points.length) {
        const p2 = points[i++];
        ctx.lineTo(p2.x, p2.y);
    }

    ctx.fillStyle = applyBiome(heatmap[index])[0];
    ctx.strokeStyle = applyBiome(heatmap[index])[0]
    ctx.closePath();

    if (stroke) {
        ctx.fillText(applyBiome(heatmap[index])[1], -23, 1);
        ctx.stroke();
    } else { 
        ctx.fill();
    }
};

function createPoly(sides, points = []) {
    const step = (2 * Math.PI) / sides;
    var ang = 0,
        i = sides;
    while (i--) {
        points.push(P2(RADIUS * Math.cos(ang), RADIUS * Math.sin(ang)));
        ang += step;
    }
    return points;
};


function init(heatmap, stroke) {
    canvas = document.getElementById("honeycomb"),
    ctx = canvas.getContext("2d"),
    drawGrid(1, 1, 15, 13, createPoly(6), heatmap, stroke);
};