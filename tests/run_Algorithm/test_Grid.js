// Tests If the Grid was Initialized to an 3 x 3 matrix with ascending weights
function test_Grid_Default(){
  var fail = false;

  var test_grid = new Grid(3,3);

  for(var i = 0; i < test_grid.getLength(); ++i){
    if(fail){ break; }
    for(var j = 0; j < test_grid.getWidth(); ++j){
        if(test_grid.getTile(i,j).getWeight() != 1){ fail = true; break; }
    }
  }

  var output = "test_grid_Default: ";
  if(fail){
    output = output + "FAIL: Expected: [ 1, 1, 1,]  Actual: " +  test_grid.printRow(0) + "\n";
    output = output + "                                   [ 1, 1, 1,]          " + test_grid.printRow(1) + "\n";
    output = output + "                                   [ 1, 1, 1,]          " + test_grid.printRow(2) + "\n";
  }
  else{
    output = output + "Pass";
  }
  output = output + "\n";
  console.log(output);
}

// Tests if the Grid matches the output after setting each Tiles Weight to a different value
function test_Grid_Set_Weights(){
  var fail = false;

  var test_grid = new Grid(5,5);

  var count = 0;
  for(var i = 0; i < test_grid.getLength(); ++i){
    for(var j = 0; j < test_grid.getWidth(); ++j){
      test_grid.getTile(i,j).setWeight(count);
      ++count;
    }
  }

  var count_solution = 0;
  for(var i = 0; i < test_grid.getLength(); ++i){
    if(fail){ break; }
    for(var j = 0; j < test_grid.getWidth(); ++j){
        if(test_grid.getTile(i,j).getWeightNoColor() != count_solution){ fail = true; break; }
        ++count_solution;
    }
  }

  var output = "test_grid_set_Weights: ";
  if(fail){
    output = output + "FAIL: Expected: [ 0, 1, 2, 3, 4,]  Actual: " +  test_grid.printRow(0) + "\n";
    output = output + "                                       [ 5, 6, 7, 8, 9,]          " + test_grid.printRow(1) + "\n";
    output = output + "                                     [ 10, 11, 12, 13, 14,]     " + test_grid.printRow(2) + "\n";
    output = output + "                                     [ 15, 16, 17, 18, 19,]     " + test_grid.printRow(3) + "\n";
    output = output + "                                     [ 20, 21, 22, 23, 24,]     " + test_grid.printRow(4) + "\n";
  }
  else{
    output = output + "Pass";
  }
  output = output + "\n";
  console.log(output);
}

/*test to see if every member of the grid can be accessed or not
  passess if no unexpected error occurs*/

function test_grid_tile_access(width, height){
  for(var i = 0; i < width; ++i){
    for(var j = 0; j < height; ++j){
      grid.getTile(i,j);
    }
  }
  console.log("pass");
}

function execute_test_Grid() {

  var time = 200;
  running = false;
  setTimeout(function(){ console.log("Grid Tests:"); },time);
  setTimeout(function(){ test_Grid_Default(); },time += 1000);
  setTimeout(function(){ test_Grid_Set_Weights(); },time += 2000);
  setTimeout(function(){ resizeGrid(3,3); grid.clearAll(); }, time += 2000);
  setTimeout(function(){ resizeGrid(8,8); }, time += 1000);

}
