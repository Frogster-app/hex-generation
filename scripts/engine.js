import { generateHeatmap } from './modules/heatmap.js';

var image = new Image();

let seed = CryptoJS.MD5(new Date().toLocaleTimeString());
const width = 12;
const height = 15;

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

document.getElementById('heatmap-matrix-btn').addEventListener('click', function() {
    if (document.getElementById('heatmap-matrix-btn').innerHTML == 'view') {
        var heatmap = generateHeatmap(seed, width, height)
        document.getElementById('heatmap-matrix').appendChild(document.createElement('pre')).innerHTML = JSON.stringify(heatmap, null, 2);
        document.getElementById('heatmap-matrix-btn').innerHTML = 'hide';
    } else {
        document.getElementById('heatmap-matrix').getElementsByTagName('pre')[0].remove();
        document.getElementById('heatmap-matrix-btn').innerHTML = 'view';
    }

})

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

    init(heatmapCondenced, 1, width, height);
    debug(heatmapCondenced.join(','));
})

document.getElementById('display-text').addEventListener('click', function() {

    document.getElementById('display-text').style.display = 'none';
    document.getElementById('display-value').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Biome names)';

    var heatmap = generateHeatmap(seed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 2, width, height);
})

document.getElementById('display-value').addEventListener('click', function() {

    document.getElementById('display-value').style.display = 'none';
    document.getElementById('display-count').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Matrix values)';

    var heatmap = generateHeatmap(seed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 3, width, height);
})

document.getElementById('display-count').addEventListener('click', function() {

    document.getElementById('display-count').style.display = 'none';
    document.getElementById('display-terrain').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Poly count)';

    var heatmap = generateHeatmap(seed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 4, width, height);
})

document.getElementById('display-terrain').addEventListener('click', function() {

    document.getElementById('display-terrain').style.display = 'none';
    document.getElementById('display-layer').style.display = 'inline-block';
    document.getElementById('view').innerHTML = '(Terrain)';

    var heatmap = generateHeatmap(seed, width, height)
    let heatmapCondenced = [];

    heatmap.forEach(element => {
        element.forEach(height => {
            heatmapCondenced.push(height);
        });
    });

    clearCanvas();
    init(heatmapCondenced, 2, width, height);
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

    document.getElementById('view').innerHTML = '(Biome colors)';

    clearCanvas();
    init(heatmapCondenced, 1, width, height);
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
    image.onload = init(heatmapCondenced, 1, width, height);
    image.src = 'assets/tiles.fixed.png';
    /* init debug */
    debug(heatmapCondenced.join(','));
});