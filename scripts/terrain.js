import { createNoise2D }  from 'https://cdn.skypack.dev/simplex-noise@4.0.0';

let height = 13
let width = 15

Math.seedrandom(seed)
let gen = createNoise2D();
function noise(nx, ny) {
  // Rescale from -1.0:+1.0 to 0.0:1.0
  return gen(nx, ny) / 2 + 0.5;
}

let value = [];   
for (let y = 0; y < height; y++) {
  value[y] = [];
  for (let x = 0; x < width; x++) {      
    let nx = x/width - 0.5, ny = y/height - 0.5;
    value[y][x] = noise(nx, ny);
  }
}

/* encode in json */
let json = JSON.stringify(value);
console.log(json);