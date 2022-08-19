var image = new Image();
const seed = -272858

function debug() {
    var p = document.createElement('p');
    p.innerHTML = `seed: ${seed}`;
    document.getElementById('debug').appendChild(p);
}


document.addEventListener('DOMContentLoaded', function() {
    /* init debug */
    debug();
    /* init map generation */
    image.onload = init;
    image.src = 'assets/tiles.fixed.png';
});