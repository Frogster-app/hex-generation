import { createNoise2D } from 'https://cdn.skypack.dev/simplex-noise@4.0.0';

let gen;

function noise(nx, ny) {
    return gen(nx, ny) / 2 + 0.5;
}

function generateHeatmap(seed, width, height) {

    Math.seedrandom(seed)
    gen = createNoise2D();

    let value = [];
    for (let y = 0; y < height; y++) {
        value[y] = [];
        for (let x = 0; x < width; x++) {
            let nx = x / width - 0.5,
                ny = y / height - 0.5;
            value[y][x] = noise(nx, ny, gen);
        }
    }
    return value;
}

export { generateHeatmap };