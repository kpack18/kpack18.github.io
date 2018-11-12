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
	this.endTimer = 0;

    for(var row = 0; row < this.length; ++row){
      this.grid[row] = new Array();
      for(var column = 0; column < this.width; ++column){
        let temp_tile = document.createElement("BUTTON");
        temp_tile.setAttribute("class", "tile");
        document.getElementById("grid").appendChild(temp_tile);
        let temporary_tile = new Tile(temp_tile,row,column);
        this.grid[row].push(temporary_tile);
      }
    }
    this.start_tile = this.grid[0][0];

  }

  getLength(){
    return this.length;
  }
  getWidth(){
    return this.width;
  }
/*  getTile (PARAM) xcoor: x coordinate of tile in Grid
          (PARAM) ycoor: y coordinate of tile in Grid
      : returns the tile class at grid[xcoor][ycoor] */
  getTile(xcoor,ycoor){
    if(xcoor >= this.length || ycoor >= this.width || xcoor < 0 || ycoor < 0){ return null; }
    return this.grid[xcoor][ycoor];
  }
// printGrid: Return's a String Representation of each tiles weight in the grid.
  printGrid(){
    var output = "";
    for(var i = 0; i < this.length; ++i){
      output = output + "[";
      for(var j = 0; j < this.width; ++j){
        output = output + " " + this.getTile(i,j).getWeight() + ",";
      }
      output = output + "]\n";
    }

    return output;
  }
  printRow(row){
    var output = "[";
    for(var i = 0; i < this.width; ++i){
      output = output + " " + this.getTile(row,i).getWeight() + ",";
    }
    output = output + "]";
    return output;
  }
  setPath(path){
    var time = TIME_INC;
    for(var i = 0; i < path.length; ++i){
      time += TIME_INC;
      setTimeout(function() { if(!running){ return; } path[0].setColorVisual("#00ff80"); path.splice(0, 1); },time);
    }
	this.endTimer = 1;
  }
  blink_Fail(tile){
    var current_iter = ITER;
    var color = tile.getColor();
    var time = 400;
    setTimeout(function() { if(!check_Iteration(current_iter)){ return; } tile.setColorVisual("#ff8080"); },time);
    time += 100;
    setTimeout(function() { tile.setColorVisual(color); },time);
    time += 100;
    setTimeout(function() { if(!check_Iteration(current_iter)){ return; } tile.setColorVisual("#ff8080"); },time);
    time += 100;
    setTimeout(function() { tile.setColorVisual(color); },time);
	this.endTimer = 1;
  }
  clearPaths(){
    for(var i = 0; i < this.length; ++i){
      for(var j = 0; j < this.width; ++j){
          if(this.getTile(i,j).getColorVisual() == "#00ff80"){
            this.getTile(i,j).setColorVisual(this.getTile(i,j).getColor());
          }
          this.getTile(i,j).removeFade();
        }
      }
  }
  clearAll(){
    for(var i = 0; i < this.length; ++i){
      for(var j = 0; j < this.width; ++j){
          this.getTile(i,j).setWeight(1);
          this.getTile(i,j).setColor("#ffffff");
        }
      }
  }
  clearPoint(startEnd){
    var color;
    if(startEnd){
      color = "#28a745";
    }
    else{
      color = "#dc3545";
    }
    for(var i = 0; i < this.length; ++i){
      for(var j = 0; j < this.width; ++j){
          if(this.getTile(i,j).getColorVisual() == color){
            this.getTile(i,j).setColor("#ffffff");
            this.getTile(i,j).toggleEndPoint();
          }
        }
      }
  }
  dimTiles(){
    for(var i = 0; i < this.length; ++i){
      for(var j = 0; j < this.width; ++j){
          if(!(this.getTile(i,j).getWeight() == 0)){
            this.getTile(i,j).addFade();
          }
        }
      }
  }
  lightTiles(){
    for(var i = 0; i < this.length; ++i){
      for(var j = 0; j < this.width; ++j){
          if(!(this.getTile(i,j).getWeight() == 0)){
            this.getTile(i,j).removeFade();
          }
        }
      }
  }
  getWeights(){
    for(var i = 0; i < this.length; ++i){
      for(var j = 0; j < this.width; ++j){
        var tempweight = this.getTile(i,j).getWeight();
      }
    }
  }
  getWeightList(){
    var matrix = getMatrix(grid.getLength(),grid.getWidth(),0);
    for(var i = 0; i < this.length; ++i){
      for(var j = 0; j < this.width; ++j){
        matrix[i][j] = this.getTile(i,j).getWeight();
      }
    }
    return matrix;
  }

}

//Tile Class: Houses the element of a tile, it's coordinates within the grid, and functions to edit it.
class Tile {
  constructor(elem,xcoor,ycoor){
/* Vars: element: The html element of the tile
         weight: weight associated with the tile. By Default: Black = 0;
                                                              White = 1;
                                                              Color's Will be Stored in Palette
         x, y: The x and y coordinates of the tile within the grid class */
    this.element = elem;
    this.color = "#ffffff";
    this.weight = 1;
    this.x = xcoor;
    this.y = ycoor;
    this.isStart = false;
    this.isEnd = false;
    this.setColor("#ffffff");
    $(this.element).data('x',this.x);
    $(this.element).data('y',this.y);
    //this.is_start = false;
  }
/* getX returns the x coordinate of the tile in grid */
  getX(){
    return this.x;
  }
/* getY returns the y coordinate of the tile in grid */
  getY(){
    return this.y;
  }
  getWeight(){
    var new_weight = palette.get_Bound_Weight(this.getColorVisual());
    if(!this.isStart && this.getColorVisual() == "#28a745"){
      console.log("x: " + this.x + " y: " + this.y + " set to Start");
      this.color = this.getColorVisual();
      start = this;
      this.isStart = true;
      this.isEnd = false;
      this.setWeight(new_weight);
    }
    else if(!this.isEnd && this.getColorVisual() == "#dc3545"){
      console.log("x: " + this.x + " y: " + this.y + " set to End");
      this.color = this.getColorVisual();
      end = this;
      this.isStart = false;
      this.isEnd = true;
      this.setWeight(new_weight);
    }
    else if(new_weight != null && new_weight != this.weight){
      this.setWeight(new_weight);
      this.color = this.getColorVisual();
    }

    return this.weight;
  }
  toggleEndPoint(){
    this.isStart = false;
    this.isEnd = false;
  }
  //For Testing Only
  getWeightNoColor(){
    return this.weight;
  }
  setWeight(value){
    var changed = (this.weight == value);
    this.weight = value;
    if(!changed){
      //console.log("Elem: ( " + this.x + ", " + this.y + ") set to: " + this.weight);
    }
  }
/* Set's the color of the html element to the current paint color */
  setColor(color){
    this.element.style.backgroundColor = color;
    this.color = color;
  }
  setColorVisual(color){
    this.element.style.backgroundColor = color;
  }
  getColorVisual(){
    return palette.rgb2hex(this.element.style.backgroundColor);
  }
  getColor(){
    return this.color;
  }
  addFade(){
    if(this.weight == 0){ return; } //Walls Do Not Get Faded
    this.element.style.opacity = 0.5;
  }
  removeFade(){
    this.element.style.opacity = 1.0;
  }
  compare(tile){
    return this.getX() == tile.getX() && this.getY() == tile.getY();
  }
  getLeft(grid){ //Left
    return grid.getTile(this.x-1,this.y);
  }
  getRight(grid){ //Down
    return grid.getTile(this.x+1,this.y);
  }
  getUp(grid){ //Left
    return grid.getTile(this.x,this.y+1);
  }
  getDown(grid){ //Right
    return grid.getTile(this.x,this.y-1);
  }
  getTopLeft(grid){ //Top left tile
    return grid.getTile(this.x-1,this.y+1);
  }
  getTopRight(grid){ //Top right tile
    return grid.getTile(this.x+1,this.y+1);
  }
  getBottomLeft(grid){ //Bottom left tile
    return grid.getTile(this.x-1,this.y-1);
  }
  getBottomRight(grid){ //Bottoom right tile
    return grid.getTile(this.x+1,this.y-1);
  }
}
