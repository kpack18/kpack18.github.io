// Grid Class: Stores the 2 Dimensional Matrix of Tiles and functions to edit them
class Grid {
    /*  Vars: length: Length of the Grid Tiles
              width: Width of the Grid Tiles
    
              grid: 2 Dimensional Array Housing the Tile Classes for each tile
              - Initialized to a L x W matrix of null values until addTile is called
    
              size_L: Keeps track of the next available length in the grid
              size_W: Keeps track of the next available width index in the grid
              - Tile is added at grid[size_L][size_W] until grid is full */
    constructor(l, w) {
        this.length = l;
        this.width = w;
        this.grid = [];

        var tile_index = 0;

        for (var i = 0; i < l; ++i) {
            var temparray = [];
            for (var j = 0; j < w; ++j) {
                var temp_tile = new Tile(null, i, j);
                temparray.push(temp_tile);
                ++tile_index;
            }
            this.grid.push(temparray);
        }

    }

    getLength() {
        return this.length;
    }

    getWidth() {
        return this.width;
    }

    /*  getTile (PARAM) xcoor: x coordinate of tile in Grid
              (PARAM) ycoor: y coordinate of tile in Grid
          : returns the tile class at grid[xcoor][ycoor] */
    getTile(xcoor, ycoor) {
        if (xcoor >= this.length || ycoor >= this.width) { return; }
        return this.grid[xcoor][ycoor];
    }

    // printGrid: Returns a String Representation of each tiles weight in the grid.
    printGrid() {
        var output = "";
        for (var i = 0; i < this.length; ++i) {
            output = output + "[";
            for (var j = 0; j < this.width; ++j) {
                output = output + " " + this.getTile(i, j).getWeight() + ",";
            }
            output = output + "]\n";
        }

        return output;
    }

    printRow(row) {
        var output = "[";
        for (var i = 0; i < this.width; ++i) {
            output = output + " " + this.getTile(row, i).getWeight() + ",";
        }
        output = output + "]";
        return output;
    }

}

//Tile Class: Houses the element of a tile, its coordinates within the grid, and functions to edit it.
class Tile {
    constructor(elem, xcoor, ycoor, weight = 1) {
        /* Vars: element: The html jQuery element of the tile
                 weight: weight associated with the tile. By Default: Black = 0;
                                                                      White = 1;
                                                                      Colors Will be Stored in Palette
                 x, y: The x and y coordinates of the tile within the grid class */
        this.element = elem;
        this.weight = weight;
        this.x = xcoor;
        this.y = ycoor;
    }

    /* getX returns the x coordinate of the tile in grid */
    getX() {
        return this.x;
    }

    /* getY returns the y coordinate of the tile in grid */
    getY() {
        return this.y;
    }

    getWeight() {
        return this.weight;
    }

    setWeight(value) {
        this.weight = value;
    }

    /* Sets the color of the html element to the current paint color */
    setColor() {
        this.element.css('backgroundColor', palette.getPaint());
    }
}

module.exports = { Grid, Tile }