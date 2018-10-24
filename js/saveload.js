$(document).ready(function () {
    $('#save').click(save);
    $('#load').click(function () {
        $('#infile').click();
    });
    $('#infile').change(function () {
        load(this.files[0]);
    });
});

var header = textToData("!ALGORITHM_VISUALIZER!");
var reader = new FileReader();

reader.onloadend = function (evt) {
    var contents = evt.target.result;
    var error = evt.target.error;

    if (error === null && contents instanceof ArrayBuffer) {
        var arr = new Uint8Array(contents);
        parseData(arr, true);
    }
};

function load(file) {
    reader.readAsArrayBuffer(file);
}

function save() {
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

function hexToData(hex) {
    var val = hex;
    if (val.startsWith('#'))
        val = val.substr(1);
    data = [NaN, NaN, NaN];
    if (val.length == 6) {
        data[0] = parseInt(val.substr(0, 2), 16);
        data[1] = parseInt(val.substr(2, 2), 16);
        data[2] = parseInt(val.substr(4, 2), 16);
    }
    if (data[0] === NaN || data[1] === NaN || data[2] === NaN)
        throw new Error("Invalid palette color '" + hex + "'");
    return data;
}

function dataToHex(red, green, blue) {
    return "#" + hex(red) + hex(green) + hex(blue);
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
        var rgb = hexToData(kvp.key);
        arr[i++] = rgb[0];
        arr[i++] = rgb[1];
        arr[i++] = rgb[2];
        view.setInt32(i, kvp.val, false); i += 4;
    }

    // Next four bytes are length x width of grid
    view.setUint16(i, length, false); i += 2;
    view.setUint16(i, width, false); i += 2;

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

function parseData(arr, hasHeader=false) {
    var view = new DataView(arr.buffer);

    var i = 0;
    if (hasHeader) {
        // Check header
        for (; i < header.length; i++) {
            if (arr[i] !== header[i]) return;
        }
    }

    // First byte is number of weights
    var weights = arr[i++];

    // Next 'weights' * 7 bytes are the weights' colors
    palette.weight_list = new Map();
    pBtnCount = -1;
    $('#color-options button').remove();
    for (var w = 0; w < weights; w++) {
        var red = arr[i++];
        var green = arr[i++];
        var blue = arr[i++];
        var weight = view.getInt32(i, false); i += 4;
        $('#add-colors-number').val(weight);
        color = dataToHex(red, green, blue);
        $('#color-pick').val(color);
        palette.setPaint(color);
        $('#add-colors').click();
    }

    // Next four bytes are length x width of grid
    var length = view.getUint16(i, false); i += 2;
    var width = view.getUint16(i, false); i += 2;

    // Next length * width bytes are the grid of weight ID's
    resizeGrid(length, width);
    for (var x = 0; x < length; x++) {
        for (var y = 0; y < width; y++) {
            var id = arr[i++];
            var color = palette.weight_list.map[id].key;
            var tile = grid.getTile(x, y);
            tile.setColor(color);
            tile.getWeight();
        }
    }
}