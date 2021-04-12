const fs = require('fs'),
    PNG = require('pngjs').PNG;

module.exports = function (PNG_INPUT = "img.png", JSON_OUTPUT = "data.json") {
    fs.createReadStream(PNG_INPUT)
        .pipe(new PNG())
        .on('parsed', function () {
            let colorsMap = {};

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var idx = (this.width * y + x) << 2;

                    const pixel = {
                        red: this.data[idx],
                        green: this.data[idx + 1],
                        blue: this.data[idx + 2]
                    };

                    const keyColor = `${pixel.red},${pixel.green},${pixel.blue}`;

                    if (Array.isArray(colorsMap[keyColor])) {
                        colorsMap[keyColor] = [...colorsMap[keyColor], [x, y]];
                    } else {
                        colorsMap[keyColor] = [[x, y]];
                    }
                }
            }

            fs.writeFileSync(JSON_OUTPUT, JSON.stringify(colorsMap));
        });
}

