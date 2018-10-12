$(document).ready(function () {
    $('#save').click(save);
});

function save() {
    var header = textToData("!ALGORITHM_VISUALIZER!");
    var data = generateData(grid, palette);
    var blob = new Blob([header, data]);
    var date = new Date();
    var filename = "grid_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear() + ".avg";
    saveAs(blob, filename);
    return filename;
}

function textToData(chars) {
    var bytes = new Uint8Array(chars.length);
    for (var i = 0; i < chars.length; i++) {
        bytes[i] = chars.charCodeAt(i);
    }
    return bytes;
}

function rgbToData(rgb) {
    return rgb
        .match(/^\d+|\d+\b|\d+(?=\w)/g)
        .map(function (v) { return +v; });
}

function generateData(grid, palette) {
    // Initialize variables
    var i = 0;
    var length = grid.getLength();
    var width = grid.getWidth();
    var weights = palette.weight_list.map.length;

    // Clip data
    length &= 0xFFFF;
    width &= 0xFFFF;
    weights &= 0xFF;

    var arr = new Uint8Array(5 + weights * 7 + length * width);
    var view = new DataView(arr.buffer);

    // First byte is number of weights
    arr[i++] = weights & 0xFF;

    // Next 'weights' * 7 bytes are the weights' colors
    for (var kvp of palette.weight_list.map) {
        var rgb = rgbToData(kvp.key);
        arr[i++] = rgb[0];
        arr[i++] = rgb[1];
        arr[i++] = rgb[2];
        view.setInt32(i, kvp.val, false); i += 4;
    }

    // Next four bytes are length x width of grid
    view.setUint16(i, length); i += 2;
    view.setUint16(i, width); i += 2;

    // Next length * width bytes are the grid of weight ID's
    for (var x = 0; x < length; x++) {
        for (var y = 0; y < width; y++) {
            var color = grid.getTile(x, y).getColor();
            var id = palette.weight_list.getIndex(color);
            if (id == -1) id = 0;
            arr[i++] = id & 0xFF;
        }
    }

    return arr;
}