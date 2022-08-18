function initSlice(url, div) {
    var image = new Image();
    image.onload = cutImageUp;
    image.src = url;

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


        imagePieces.forEach(function(imageData) {
            var anImage = document.createElement('img');
            anImage.src = imageData;
            document.getElementById(div).appendChild(anImage);
        })
    }
}

initSlice('assets/tiles.fixed.png', 'sliceImages');