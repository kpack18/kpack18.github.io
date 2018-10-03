// Grid Class: Stores the 2 Dimensional Matrix of Tiles and functions to edit them
class Grid {
/*  Vars: length: Length of the Grid Tiles
          Width: Width of the Grid Tiles

        grid: 2 Dimensional Array Housing the Tile Classes for each tile
           - Initialized to a L x W matrix of null values till addTile is called

        size_L: Keeps track of the next available length in the grid
        size_W: Keeps track of the next available width index in the grid
            -Tile is added at grid[size_L][size_W] till grid is full */
  constructor(l,w){
    this.length = l;
    this.width = w;
    this.grid = [];

    this.size_L = 0;
    this.size_W = 0;

    for(i = 0; i < l; ++i){
      var temparray = [];
      for(j = 0; j < w; ++i){
        temparray.push(null);
      }
      this.grid.push(temparray);
    }
  }
/*  addTile (PARAM) tile: tile class to be added to the grid
                  : tile class is added at index grid[size_L][size_W],
                    then size_L and W are incremented */
  addTile(tile){
    if(this.size_L == this.length && this.size_W == this.width){ return; }
    this.grid[size_L][size_W] = tile;
    ++this.size_L;

    if(this.size_L == this.length){
      this.size_L == 0;
      ++this.size_W;
    }
  }
/*  getTile (PARAM) xcoor: x coordinate of tile in Grid
          (PARAM) ycoor: y coordinate of tile in Grid
      : returns the tile class at grid[xcoor][ycoor] */
  getTile(xcoor,ycoor){
    if(xcoor >= this.length || ycoor >= this.width){ return; }
    return this.grid[xcoor,ycoor];
  }

}

//Tile Class: Houses the element of a tile, it's coordinates within the grid, and functions to edit it.
class Tile {
  constructor(elem,xcoor,ycoor){
/* Vars: element: The html element of the tile
         x, y: The x and y coordinates of the tile within the grid class */
    this.element = elem;
    this.x = xcoor;
    this.y = ycoor;
  }
/* getX returns the x coordinate of the tile in grid */
  getX(){
    return this.x;
  }
/* getY returns the y coordinate of the tile in grid */
  getY(){
    return this.y;
  }
/* Set's the color of the html element to the current paint color */
  setColor(color){
    this.element.css('backgroundColor', palette.getPaint());
  }
}

/* Palette Class: Hold's the current paint color and data structures
                 for user defined color weights */
class Palette {
  constructor(){
/* vars: paint_color: The current color of the brush.
                      When a tile is clicked it'll change to current color */
    this.paint_color = 'black';
  }
/* setPaint: (PARAM) color: new color of the Brush
    : set's the color of the brush to "color" */
  setPaint(color){
    this.paint_color = color;
  }
// getPaint: Returns the current color of the brush
  getPaint(){
    return this.paint_color;
  }
}

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').click(function () {
        $('#sidebar').toggleClass('active');
    });

    $('#color-pick').change(function () {
        //current_color = $(this).val();
        palette.setPaint($(this).val());
    });

    $('.tile').click(function () {
        setColor($(this));
    });

    $('.tile').mousemove(function (e) {
        setWall($(this), e);
    });

    $('#btnAlgorithm').click(myAlert);
});

var old_crd = 0;

var palette = new Palette();

function setWall(elem, e) {
    var curr_crd = elem[0].getBoundingClientRect().top + window.scrollY + elem[0].getBoundingClientRect().right;
	if(e.which == 1 && old_crd != curr_crd){
		old_crd = curr_crd;
        setColor(elem);
	}
 }

function setColor(elem) {
    elem.css('backgroundColor', palette.getPaint());
}

function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}
