/* 

Map generation, this is used to convert noise matrix values into a gui map.

version 1.0.0
Author: Reece Harris
Date: 2022 Aug 23

*/

const RADIUS = 30,
    EDGE_LEN = 60 * Math.sin(Math.PI / 6),
    GRID_Y_SPACE = 60 * Math.cos(Math.PI / 6),
    GRID_X_SPACE = 60 - .5 * EDGE_LEN,
    GRID_Y_OFFSET = .5 * GRID_Y_SPACE,
    P2 = (a, b) => ({ x: a, y: b });

let canvas = '',
    ctx = '';

function drawGrid(x, y, w, h, points, heatmap, stroke) {
    const p = P2();
    var gy, gx;
    var loop = 0;
    for (gy = y; gy < y + h; gy++) {
        for (gx = x; gx < x + w; gx++) {
            drawPoly(gridToPixel(gy, gx, p), points, loop, heatmap, stroke);
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

    if (stroke == 1) {
        ctx.fill();
    } else if (stroke == 2) {
        ctx.fillText(applyBiome(heatmap[index])[1], -23, 3, );
        ctx.stroke();
    } else if (stroke == 3) {
        ctx.fillText(heatmap[index].toString().slice(0, 8), -23, 3);
        ctx.stroke();
    } else if (stroke == 4) {
        ctx.fillText(index, -23, 3);
        ctx.stroke();
    } else if (stroke == 5) {
        var background = new Image();
        background.src = "https://media.discordapp.net/attachments/975338682485727232/1011668298653515846/unknown.png";
        ctx.drawImage(background, -23, 3, );
        ctx.stroke();
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


function init(heatmap, stroke, width, height) {
    canvas = document.getElementById("honeycomb"),
        ctx = canvas.getContext("2d"),
        drawGrid(1, 1, width, height, createPoly(6), heatmap, stroke);
};