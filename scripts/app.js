import { generateHeatmap } from './modules/heatmap.js';

var image = new Image();

let coordX = 1;
let coordY = 1;

let seed = '28d88adb334a95cb03648ece84f52ebh';
const width = 13 * 3.5;
const height = 15 * 3.5;

let finalSeed = CryptoJS.MD5(`${coordX}${seed}${coordY}`);

/* GUI INTERACTIONS */

function debug(heatmap) {
    var p = document.getElementById('seed');
    p.innerHTML = `seed: <span>${seed}</span>`;

    var p = document.getElementById('checksum');
    p.innerHTML = `matrix checksum: <span>${CryptoJS.MD5(heatmap)}</span>`;

    var p = document.getElementById('coords');
    p.innerHTML = `coords: <span>X:${coordX}, Y:${coordY}</span>`;
}

function clearCanvas() {
    var honeycomb = document.getElementById("honeycomb");
    var honeycombHeight = document.getElementById("honeycomb").height;
    var honeycombWidth = document.getElementById("honeycomb").width;
    honeycomb.remove();

    var honeycombReplacement = document.createElement("canvas");
    honeycombReplacement.id = "honeycomb";
    honeycombReplacement.width = honeycombWidth;
    honeycombReplacement.height = honeycombHeight;
    document.getElementById("honeyStorage").appendChild(honeycombReplacement);
}

document.getElementById('heatmap-matrix-btn').addEventListener('click', function() {
    if (document.getElementById('heatmap-matrix-btn').innerHTML == 'view') {
        var heatmap = generateHeatmap(finalSeed, width, height)
        document.getElementById('heatmap-matrix').appendChild(document.createElement('pre')).innerHTML = JSON.stringify(heatmap, null, 2).toString().replaceAll('[', '<span>[</span>').replaceAll(']', '<span>]</span>').replaceAll(',', '<span>,</span>');
        document.getElementById('heatmap-matrix-btn').innerHTML = 'hide';
    } else {
        document.getElementById('heatmap-matrix').getElementsByTagName('pre')[0].remove();
        document.getElementById('heatmap-matrix-btn').innerHTML = 'view';
    }

})

document.getElementById('heatmap-matrix-download').addEventListener('click', function() {
    var heatmap = generateHeatmap(finalSeed, width, height)
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(heatmap));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `matrix-${finalSeed}.json`);
    dlAnchorElem.click();
})

document.getElementById('download').addEventListener('click', function() {
    var image = document.getElementById("honeycomb").toDataURL();
    var aDownloadLink = document.createElement('a');
    aDownloadLink.download = `map-${finalSeed}.png`;
    aDownloadLink.href = image;
    aDownloadLink.click();
})

document.getElementById('refresh-map').addEventListener('click', function() {
    seed = CryptoJS.MD5(new Date().toLocaleTimeString())
    finalSeed = CryptoJS.MD5(`${coordX}${seed}${coordY}`);

    var heatmap = generateHeatmap(finalSeed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();

    init(heatmapCondenced, 1, width, height, finalSeed);
    debug(heatmapCondenced.join(','));
})

document.getElementById('display-text').addEventListener('click', function() {

    document.getElementById('display-text').style.display = 'none';
    document.getElementById('display-value').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Biome names)';

    var heatmap = generateHeatmap(finalSeed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 2, width, height, finalSeed);
})

document.getElementById('display-value').addEventListener('click', function() {

    document.getElementById('display-value').style.display = 'none';
    document.getElementById('display-count').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Matrix values)';

    var heatmap = generateHeatmap(finalSeed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 3, width, height, finalSeed);
})

document.getElementById('display-count').addEventListener('click', function() {

    document.getElementById('display-count').style.display = 'none';
    document.getElementById('display-terrain').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Poly count)';

    var heatmap = generateHeatmap(finalSeed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 4, width, height, finalSeed);
})

document.getElementById('display-terrain').addEventListener('click', function() {

    document.getElementById('display-terrain').style.display = 'none';
    document.getElementById('display-layer').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Terrain)';

    var heatmap = generateHeatmap(finalSeed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 5, width, height, finalSeed);
})

document.getElementById('display-layer').addEventListener('click', function() {

    document.getElementById('display-layer').style.display = 'none';
    document.getElementById('display-text').style.display = 'inline-block';

    var heatmap = generateHeatmap(finalSeed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    document.getElementById('view').innerHTML = '(Biome colors)';

    clearCanvas();
    init(heatmapCondenced, 1, width, height, finalSeed);
})

/* START GENERATION WHEN DOM IS LOADED */

document.addEventListener('DOMContentLoaded', function() {
    /* generate heatmap */
    var heatmap = generateHeatmap(finalSeed, width, height)

    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    /* init map generation */
    image.onload = init(heatmapCondenced, 1, width, height, finalSeed);
    image.src = 'assets/tiles.fixed.png';
    /* init debug */
    debug(heatmapCondenced.join(','));
    initSlice('assets/tiles.fixed.png', 'sliceImages');
});