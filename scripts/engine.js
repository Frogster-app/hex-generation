import { generateHeatmap } from './modules/heatmap.js';

var image = new Image();

let seed = CryptoJS.MD5(new Date().toLocaleTimeString());
const width = 15;
const height = 13;

function debug(heatmap) {
    var p = document.getElementById('seed');
    p.innerHTML = `seed: <span>${seed}</span>`;

    var p = document.getElementById('checksum');
    p.innerHTML = `checksum: <span>${CryptoJS.MD5(heatmap)}</span>`;
}

function clearCanvas() {
    var honeycomb = document.getElementById("honeycomb");
    honeycomb.remove();

    var honeycombReplacement = document.createElement("canvas");
    honeycombReplacement.id = "honeycomb";
    honeycombReplacement.width = 710;
    honeycombReplacement.height = 740;
    document.getElementById("honeyStorage").appendChild(honeycombReplacement);
}

document.getElementById('refresh-map').addEventListener('click', function() {
    seed = CryptoJS.MD5(new Date().toLocaleTimeString());

    var heatmap = generateHeatmap(seed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();

    init(heatmapCondenced, false);
    debug(heatmapCondenced.join(','));
})

document.getElementById('display-text').addEventListener('click', function() {

    document.getElementById('display-text').style.display = 'none';
    document.getElementById('display-layer').style.display = 'inline-block';

    var heatmap = generateHeatmap(seed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();

    init(heatmapCondenced, true);
})

document.getElementById('display-layer').addEventListener('click', function() {

    document.getElementById('display-layer').style.display = 'none';
    document.getElementById('display-text').style.display = 'inline-block';

    var heatmap = generateHeatmap(seed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();

    init(heatmapCondenced, false);
})

document.addEventListener('DOMContentLoaded', function() {
    /* generate heatmap */
    var heatmap = generateHeatmap(seed, width, height)

    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    console.log(heatmapCondenced);
    /* init map generation */
    image.onload = init(heatmapCondenced, false);
    image.src = 'assets/tiles.fixed.png';
    /* init debug */
    debug(heatmapCondenced.join(','));
});