/* This test will test accessing each tile of the grid after a resize. The test will fail
If an error occurs. */

function test_Tiles(){
    resizeGrid(15,15); 
    for(var x = 0; x < 15; ++x ){
        for(var y = 0; y < 15; ++y){
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
        console.log("PASS");
    }
    else{
        console.log("FAIL: Unexpected behavior, grid resized when one of the input is 0");
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
        console.log("PASS");
    }
    else{
        console.log("FAIL: Invalid resize, grid resized when there is a negative in the input");
    }
}

/* Test resize functionality against valid resize inputs*/
function valid_Resize(){
    resizeGrid(1,1);
    if(grid.getLength() != 1 && grid.getWidth() != 1){
        test_Tiles();
        console.log("FAIL, 1x1")
    }
    resizeGrid(15,15);
    if(grid.getLength() != 15 && grid.getWidth() != 15){
        test_Tiles();
        console.log("FAIL")
    }
    resizeGrid(10.8,13.8);
    if(grid.getLength() != 13 && grid.getWidth() != 10){
        test_Tiles();
        console.log("FAIL, decimal inputs")
    }
    resizeGrid(11,18);
    if(grid.getLength() != 18 && grid.getWidth() != 11){
        test_Tiles();
        console.log("FAIL, odd input")
    }
    resizeGrid(12,14);
    if(grid.getLength() != 14 && grid.getWidth() != 12){
        test_Tiles();
        console.log("FAIL, even input")
    }
    console.log("PASS");
}

zero_Resize();
negative_Resize();
valid_Resize();
resizeGrid(8,8);
