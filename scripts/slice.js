function initSlice(url, div) {
    var image = new Image();
    image.onload = cutImageUp;
    image.src = url;

    const tileNames = [
        'grass_hills',
        'snowy_castle',
        'grass_forest',
        'base_desert_1',
        'grass_hills_forest',
        'base_light_grass',
        'desert_hills',
        'mountain_snow',
        'base_tall_grass',
        'base_desert_2',
        'base_shallow_water',
        'base_snow',
        'mountain_desert',
        'base_deep_water',
        'snow_forest',
        'water_east',
        'desert_oasis',
        'snow_forest_2',
        'grass_metropolis',
        'water_docks_west',
        'sand_metropolis_destroyed',
        'snow_hills',
        'grass_metropolis_2',
        'sand_metropolis',
        'grass_metropolis_3',
        'snow_hills_forest',
        'base_grass',
        'water_lighthouse',
        'water_broken_ice',
        'grass_metropolis_destroyed',
        'sand_metropolis_2',
        'sand_unkown_2',
        'light_grass_forest',
        'grass_forest_2',
        'snow_metropolis',
        'light_grass_metropolis',
        'light_grass_swamp'
    ]

    numColsToCut = 38;
    numRowsToCut = 1;

    widthOfOnePiece = 221;
    heightOfOnePiece = 332;

    function cutImageUp() {
        var imagePieces = [];
        for (var x = 0; x < numColsToCut; ++x) {
            for (var y = 0; y < numRowsToCut; ++y) {
                var canvas = document.createElement('canvas');
                canvas.width = widthOfOnePiece;
                canvas.height = heightOfOnePiece;
                var context = canvas.getContext('2d');
                context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                imagePieces.push(canvas.toDataURL());
            }
        }

        var loop = 0;
        imagePieces.forEach(function(imageData) {
            var anImage = document.createElement('img');
            anImage.src = imageData;
            anImage.title = tileNames[loop]
            document.getElementById(div).appendChild(anImage);
            loop++;
        })
    }
}

initSlice('assets/tiles.fixed.png', 'sliceImages');