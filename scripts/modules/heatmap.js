/* 

Noise matrix generation, this uses simplex noise to .

version 1.0.0
Author: Reece Harris
Date: 2022 Aug 23

*/

import { createNoise2D } from '../../node_modules/simplex-noise/dist/esm/simplex-noise.js';

let gen;

const smoothness = 1.47;

function noise(nx, ny) {
    return gen(nx, ny) / smoothness + 0.5;
}

function generateHeatmap(seed, width, height) {

    Math.seedrandom(seed)
    gen = createNoise2D();

    let value = [];

    for (let y = 0; y < (height); y++) {
        value[y] = [];
        for (let x = 0; x < (width); x++) {
            let nx = x / (width) - 0.5,
                ny = y / (height) - 0.5;
            value[y][x] = noise(nx, ny, gen);
        }
    }
    return value;
}

export { generateHeatmap };