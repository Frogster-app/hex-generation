function initSlice(url, div) {
    var image = new Image();
    image.onload = cutImageUp;
    image.src = url;

    const tileNames = [
        /* {biome}-{detail1}_{detail2} */
        'grass-hills',
        'snow-castle',
        'grass-forest',
        'desert-base_1',
        'grass-hills_forest',
        'lightgrass_base',
        'desert-hills',
        'snow-mountain',
        'tallgrass-base',
        'desert-base_2',
        'shallowwater_base',
        'snow-base',
        'desert-mountain',
        'deep-water_base',
        'snow-forest',
        'water-dock_east',
        'desert-oasis',
        'snow-forest_2',
        'grass-metropolis',
        'water-dock_west',
        'sand-metropolis_destroyed',
        'snow-hills',
        'grass-metropolis_2',
        'sand-metropolis',
        'grass-metropolis_3',
        'snow-hills_forest',
        'base-grass',
        'water-lighthouse',
        'water-broken_ice',
        'grass-metropolis_destroyed',
        'sand-metropolis_2',
        'sand-unkown_2',
        'lightgrass-forest',
        'grass-forest_2',
        'snow-metropolis',
        'lightgrass-metropolis',
        'lightgrass-swamp',
        'lightgrass-unkown'
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