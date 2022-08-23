function applyBiome(elevation) {

    
    console.log(elevation)

    if (elevation < 0.1) return ['#f532b2', 'Undefined'];
    else if (elevation < 0.2) return ['#8336fd', 'Undefined'];
    else if (elevation < 0.3) return ['#3033fd', 'Undefined'];
    else if (elevation < 0.4) return ['#338efd', 'Undefined'];
    else if (elevation < 0.55) return ['#17fcfb', 'Undefined'];
    else if (elevation < 0.6) return ['#1ef852', 'Undefined'];
    else if (elevation < 0.75) return ['#efff0f', 'Undefined'];
    else if (elevation < 0.8) return ['#ff6803', 'Undefined'];
    else if (elevation < 0.9) return ['#f92900', 'Undefined'];
    else if (elevation < 2) return ['#7f0000', 'Undefined'];
    else return ['black', 'Undefined'];

};