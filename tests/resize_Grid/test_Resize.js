/* This test will test accessing each tile of the grid after a resize. The test will fail
If an error occurs. */

function test_Tiles(i,j){
    resizeGrid(i,j);
    for(var x = 0; x < i; ++x ){
        for(var y = 0; y < j; ++y){
            if(grid == null){
                console.log("FAIL: Grid is null");
                return;
            }
            var temp_tile = grid.getTile(x,y);
            if(temp_tile == null){
                console.log("FAIL: Tile is null");
                return;
            }
        }
    }
    console.log("PASS, Tiles test");
}

/* These test will resize the grid with a variety of inputs ranging from decimals, negatives etc. */

/* Resizes the grid with a variety of inputs containing 0. If the dimensions changes in anyway fail */
function zero_Resize(){
    resizeGrid(8,8);
    resizeGrid(0,0);
    resizeGrid(10,0);
    resizeGrid(0,10);
    resizeGrid(0,-10);
    resizeGrid(0,-10.8);
    resizeGrid(0,10.8);
    if(grid.getLength() == 8 && grid.getWidth() == 8){
        console.log("Zero resize: PASS");
    }
    else{
        console.log("Zero resize: FAIL, Unexpected behavior, grid resized when one of the input is 0");
    }
}

/* Resizes the grid with inputs containing negatives if the grid changes in any way fail*/
function negative_Resize(){
    resizeGrid(8,8);
    resizeGrid(-10,-10);
    resizeGrid(-10,10);
    resizeGrid(10,-10);
    resizeGrid(10.8,-10.8);
    resizeGrid(-87.2,10);
    resizeGrid(-10.3,-18.2);
    if(grid.getLength() == 8 && grid.getWidth() == 8){
        console.log("Negative resize: PASS");
    }
    else{
        console.log("Negative resize: FAIL, Invalid resize, grid resized when there is a negative in the input");
    }
}

/* Test resize functionality against valid resize inputs*/
function valid_Resize(){
    resizeGrid(1,1);
    //test_Tiles(1,1);
    if(grid.getLength() != 1 && grid.getWidth() != 1){
        console.log("Valid resize: FAIL, at 1x1")
    }
    resizeGrid(15,15);
    //test_Tiles(15,15);
    if(grid.getLength() != 15 && grid.getWidth() != 15){
        console.log("Valid resizes: FAIL at square input")
    }
    resizeGrid(10.8,13.8);
    //test_Tiles(10.8,13.8);
    if(grid.getLength() != 13 && grid.getWidth() != 10){
        console.log("Valid resizes: FAIL, at decimal inputs")
    }
    resizeGrid(11,18);
    //test_Tiles(11,18);
    if(grid.getLength() != 18 && grid.getWidth() != 11){
        console.log("Valid resizes: FAIL, at odd input")
    }
    resizeGrid(12,14);
    //test_Tiles(12,14);
    if(grid.getLength() != 14 && grid.getWidth() != 12){
        console.log("Valid resized: FAIL, at even input")
    }
    console.log("Valid resizes: PASS");
}

function execute_test_Resize(){
  var time = 200;
  running = false;
  setTimeout(function(){ console.log("Grid Tests:"); },time);
  setTimeout(function(){ zero_Resize(); },time += 1000);
  setTimeout(function(){ negative_Resize(); },time += 1000);
  setTimeout(function(){ valid_Resize(); },time += 1000);
  setTimeout(function(){ resizeGrid(8,8); grid.clearAll(); }, time += 1000);
}
