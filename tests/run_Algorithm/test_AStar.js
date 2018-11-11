function test_AStar_simple(){
  resizeGrid(3,3);
  grid.clearAll();


  var path = execute(grid.getTile(2,0),grid.getTile(0,2),"astar");

  var expected = [grid.getTile(2,0),grid.getTile(1,0),grid.getTile(1,1),grid.getTile(0,1),grid.getTile(0,2)];

  var fail = compare_Paths(path,expected);
  var output = "test_AStar_simple: "
  if(fail){
    output = output + "FAIL: Expected: [ (2,0), (1,0), (1,1), (0,1), (0,2),]\n                          Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_AStar_weight(){
  resizeGrid(3,3);
  grid.clearAll();

  var test_palette = new Palette();
  test_palette.setPaint("#80FFFF");
  test_palette.addBinding(2);

  grid.getTile(0,1).setWeight(2); grid.getTile(0,1).setColor("#80FFFF");
  grid.getTile(1,1).setWeight(2); grid.getTile(1,1).setColor("#80FFFF");

  var path = execute(grid.getTile(2,0),grid.getTile(0,2),"astar");

  var expected = [grid.getTile(2,0),grid.getTile(2,1),grid.getTile(2,2),grid.getTile(1,2),grid.getTile(0,2)];

  var fail = compare_Paths(path,expected);
  var output = "test_AStar_weight: "
  if(fail){
    output = output + "FAIL: Expected: [ (2,0), (2,1), (2,2), (1,2), (0,2),]\n                          Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_AStar_weight_2(){
  resizeGrid(6,6);
  grid.clearAll();

  grid.getTile(2,1).setWeight(0); grid.getTile(2,1).setColor("#000000");
  grid.getTile(2,2).setWeight(0); grid.getTile(2,2).setColor("#000000");
  grid.getTile(2,3).setWeight(0); grid.getTile(2,3).setColor("#000000");
  grid.getTile(2,4).setWeight(0); grid.getTile(2,4).setColor("#000000");

  var path = execute(grid.getTile(4,4),grid.getTile(1,1),"astar");

  var expected = [grid.getTile(4,4),grid.getTile(3,4),grid.getTile(3,3),grid.getTile(3,2),grid.getTile(3,1),grid.getTile(3,0),grid.getTile(2,0),grid.getTile(1,0),grid.getTile(1,1)];

  var fail = compare_Paths(path,expected);
  var output = "test_AStar_weight_2: "
  if(fail){
    output = output + "FAIL: Expected: [ (4,4), (3,4), (3,3), (3,2), (3,1), (3,0), (2,0), (1,0), (1,1),]\n                          Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_AStar_Complex(){
  resizeGrid(8,8);
  grid.clearAll();

  grid.getTile(3,0).setWeight(0); grid.getTile(3,0).setColor("#000000");
  grid.getTile(3,1).setWeight(0); grid.getTile(3,1).setColor("#000000");
  grid.getTile(3,2).setWeight(0); grid.getTile(3,2).setColor("#000000");
  grid.getTile(3,3).setWeight(0); grid.getTile(3,3).setColor("#000000");
  grid.getTile(3,4).setWeight(0); grid.getTile(3,4).setColor("#000000");
  grid.getTile(3,5).setWeight(0); grid.getTile(3,5).setColor("#000000");
  grid.getTile(4,0).setWeight(0); grid.getTile(4,0).setColor("#000000");
  grid.getTile(4,1).setWeight(0); grid.getTile(4,1).setColor("#000000");
  grid.getTile(4,2).setWeight(0); grid.getTile(4,2).setColor("#000000");
  grid.getTile(4,3).setWeight(0); grid.getTile(4,3).setColor("#000000");
  grid.getTile(4,4).setWeight(0); grid.getTile(4,4).setColor("#000000");
  grid.getTile(4,5).setWeight(0); grid.getTile(4,5).setColor("#000000");

  var path = execute(grid.getTile(1,1),grid.getTile(6,1),"astar");

  var expected = [grid.getTile(1,1),grid.getTile(2,1),grid.getTile(2,2),grid.getTile(2,3),grid.getTile(2,4),grid.getTile(2,5),grid.getTile(2,6),grid.getTile(3,6),grid.getTile(4,6),grid.getTile(5,6),grid.getTile(5,5),grid.getTile(5,4),grid.getTile(5,3),grid.getTile(5,2),grid.getTile(6,2),grid.getTile(6,1)];

  var fail = compare_Paths(path,expected);
  var output = "test_AStar_Complex: "
  if(fail){
    output = output + "FAIL: Expected: [ (1,1), (2,1), (2,2), (2,3), (2,4), (2,5), (2,6), (3,6), (4,6), (5,6), (5,5), (5,4), (5,3), (5,2), (6,2), (6,1),]\n                          Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function execute_test_AStar() {

    var time = 200;
    running = true;
    setTimeout(function(){ console.log("A* Tests:"); },time);
    setTimeout(function(){ test_AStar_simple(); },time += 500);
    setTimeout(function(){ test_AStar_weight(); },time += 1500);
    setTimeout(function(){ test_AStar_weight_2(); },time += 2000);
    setTimeout(function(){ test_AStar_Complex(); },time += 2000);
    setTimeout(function(){ resizeGrid(8,8); grid.clearAll(); grid.lightTiles(); }, time += 5000);
    console.log("\n");

}
