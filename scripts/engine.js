import { generateHeatmap } from './modules/heatmap.js';

var image = new Image();

const seed = CryptoJS.MD5(new Date().toLocaleTimeString());
const width = 15;
const height = 13;

function debug(heatmap) {
    var p = document.createElement('p');
    p.innerHTML = `seed: <span>${seed}</span>`;
    document.getElementById('debug').appendChild(p);

    /* checksum */
    var hash = CryptoJS.MD5(heatmap);
    var p = document.createElement('p');
    p.innerHTML = `checksum: <span>${hash}</span>`;
    document.getElementById('debug').appendChild(p);

}

document.addEventListener('DOMContentLoaded', function() {
    /* generate heatmap */
    var heatmap = generateHeatmap(seed, width , height)

    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    console.log(heatmapCondenced);
    /* init map generation */
    image.onload = init(heatmapCondenced);
    image.src = 'assets/tiles.fixed.png';
    /* init debug */
    debug(heatmapCondenced);
});