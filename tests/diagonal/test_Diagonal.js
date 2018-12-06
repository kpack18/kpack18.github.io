function test_diag_Simple(){
  resizeGrid(3,3);
  grid.clearAll();

  var path = execute(grid.getTile(0,0),grid.getTile(2,2),"bfs");

  var expected = [grid.getTile(0,0),grid.getTile(1,1),grid.getTile(2,2)];

  var fail = compare_Paths(path,expected);
  var output = "test_diag_Simple: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,1), (2,2),]  Actual: " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_diag_Wall(){
  resizeGrid(5,3);
  grid.clearAll();

  grid.getTile(0,2).setWeight(0);
  grid.getTile(0,2).setColor("#000000");
  grid.getTile(1,2).setWeight(0);
  grid.getTile(1,2).setColor("#000000");

  var path = execute(grid.getTile(0,0),grid.getTile(0,4),"djikstra");

  var expected = [grid.getTile(0,0),grid.getTile(1,1),grid.getTile(2,2),grid.getTile(1,3),grid.getTile(0,4)];

  var fail = compare_Paths(path,expected);
  var output = "test_diag_Simple: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,1), (2,2), (1,3), (0,4),]  Actual: " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_diag_Checker(){
  resizeGrid(3,5);
  grid.clearAll();

  grid.getTile(0,1).setWeight(0); grid.getTile(0,1).setColor("#000000");
  grid.getTile(1,0).setWeight(0); grid.getTile(1,0).setColor("#000000");
  grid.getTile(2,1).setWeight(0); grid.getTile(2,1).setColor("#000000");
  grid.getTile(1,2).setWeight(0); grid.getTile(1,2).setColor("#000000");
  grid.getTile(3,0).setWeight(0); grid.getTile(3,0).setColor("#000000");
  grid.getTile(3,2).setWeight(0); grid.getTile(3,2).setColor("#000000");
  grid.getTile(4,1).setWeight(0); grid.getTile(4,1).setColor("#000000");

  var path = execute(grid.getTile(0,0),grid.getTile(4,2),"astar");

  var expected = [grid.getTile(0,0),grid.getTile(1,1),grid.getTile(2,2),grid.getTile(3,1),grid.getTile(4,2)];

  var fail = compare_Paths(path,expected);
  var output = "test_diag_Checker: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,1), (2,2), (3,1), (4,2),]  Actual: " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function execute_test_Diagonal() {
    var time = 200;
    running = true;
    allow_diagonal = true;
    setTimeout(function(){ console.log("Diagonal Tests:"); },time);
    setTimeout(function(){ test_diag_Simple(); },time += 500);
    setTimeout(function(){ test_diag_Wall(); },time += 1500);
    setTimeout(function(){ test_diag_Checker(); },time += 2000);
    // setTimeout(function(){ test_Bfs_Path_None(); },time += 2000);
    // setTimeout(function(){ test_Bfs_Path_Complex(); },time += 2000);
    setTimeout(function(){ resizeGrid(8,8); grid.clearAll(); grid.lightTiles(); allow_diagonal = false; }, time += 2000);
    console.log("\n");

}
