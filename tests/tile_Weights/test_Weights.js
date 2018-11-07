/* Tests Bfs Search on a graph of the Following:        [ 1 1 1 ]
Where (0,0) is the start point and (2,2) is the end     [ 2 1 1 ]
                                                        [ 2 2 1 ] */
function test_Weight_Simple(){
  resizeGrid(3,3);
  grid.clearAll();

  var test_palette = new Palette();
  test_palette.setPaint("#80FFFF");
  test_palette.addBinding(2);

  grid.getTile(1,0).setWeight(2);
  grid.getTile(1,0).setColor("#80FFFF");
  grid.getTile(2,0).setWeight(2);
  grid.getTile(2,0).setColor("#80FFFF");
  grid.getTile(2,1).setWeight(2);
  grid.getTile(2,1).setColor("#80FFFF");

  var path = execute(grid.getTile(0,0),grid.getTile(2,2),"bfs");

  var expected = [grid.getTile(0,0),grid.getTile(0,1),grid.getTile(1,1),grid.getTile(1,2),grid.getTile(2,2)];

  var fail = compare_Paths(path,expected);
  var output = "test_Weight_Simple: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (0,1), (1,1), (1,2), (2,2),]\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_Weight_Paths(){
  resizeGrid(3,12);
  grid.clearAll();

  var test_palette = new Palette();
  test_palette.setPaint("#FF8040");
  test_palette.addBinding(2);
  test_palette.setPaint("#80FFFF");
  test_palette.addBinding(3);

  grid.getTile(0,2).setWeight(0); grid.getTile(0,2).setColor("#000000");
  grid.getTile(1,2).setWeight(0); grid.getTile(1,2).setColor("#000000");
  grid.getTile(1,0).setWeight(0); grid.getTile(1,0).setColor("#000000");
  grid.getTile(3,1).setWeight(0); grid.getTile(3,1).setColor("#000000");
  grid.getTile(4,1).setWeight(0); grid.getTile(4,1).setColor("#000000");
  grid.getTile(5,1).setWeight(0); grid.getTile(5,1).setColor("#000000");
  grid.getTile(6,1).setWeight(0); grid.getTile(6,1).setColor("#000000");
  grid.getTile(7,1).setWeight(0); grid.getTile(7,1).setColor("#000000");
  grid.getTile(8,1).setWeight(0); grid.getTile(8,1).setColor("#000000");
  grid.getTile(9,1).setWeight(0); grid.getTile(9,1).setColor("#000000");
  grid.getTile(10,1).setWeight(0); grid.getTile(10,1).setColor("#000000");

  grid.getTile(3,0).setWeight(2); grid.getTile(3,0).setColor("#FF8040");
  grid.getTile(4,0).setWeight(2); grid.getTile(4,0).setColor("#FF8040");
  grid.getTile(5,0).setWeight(2); grid.getTile(5,0).setColor("#FF8040");
  grid.getTile(6,0).setWeight(2); grid.getTile(6,0).setColor("#FF8040");
  grid.getTile(7,0).setWeight(2); grid.getTile(7,0).setColor("#FF8040");
  grid.getTile(8,0).setWeight(2); grid.getTile(8,0).setColor("#FF8040");
  grid.getTile(9,0).setWeight(2); grid.getTile(9,0).setColor("#FF8040");
  grid.getTile(10,0).setWeight(2); grid.getTile(10,0).setColor("#FF8040");

  grid.getTile(4,2).setWeight(3); grid.getTile(4,2).setColor("#80FFFF");
  grid.getTile(5,2).setWeight(3); grid.getTile(5,2).setColor("#80FFFF");
  grid.getTile(6,2).setWeight(3); grid.getTile(6,2).setColor("#80FFFF");
  grid.getTile(7,2).setWeight(3); grid.getTile(7,2).setColor("#80FFFF");
  grid.getTile(8,2).setWeight(3); grid.getTile(8,2).setColor("#80FFFF");

  var path = execute(grid.getTile(0,0),grid.getTile(11,1),"bfs");

  var expected = [grid.getTile(0,0),grid.getTile(0,1),grid.getTile(1,1),grid.getTile(2,1),grid.getTile(2,0),grid.getTile(3,0),grid.getTile(4,0),grid.getTile(5,0),grid.getTile(6,0),grid.getTile(7,0),grid.getTile(8,0),grid.getTile(9,0),grid.getTile(10,0),grid.getTile(11,0),grid.getTile(11,1)];

  var fail = compare_Paths(path,expected);
  var output = "test_Weight_Paths: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (0,1), (1,1), (2,1), (2,0), (3,0), (4,0), (5,0), (6,0), (7,0), (8,0), (9,0), (10,0), (11,0), (11,1),]\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_Weight_Paths(){
  resizeGrid(8,8);
  grid.clearAll();

  var test_palette = new Palette();
  test_palette.setPaint("#FF8040");
  test_palette.addBinding(2);
  test_palette.setPaint("#80FFFF");
  test_palette.addBinding(3);
  test_palette.setPaint("#FF80FF");
  test_palette.addBinding(4);
  test_palette.setPaint("#FF8080");
  test_palette.addBinding(5);
  test_palette.setPaint("#FFFF00");
  test_palette.addBinding(6);
  test_palette.setPaint("#0080FF");
  test_palette.addBinding(7);
  test_palette.setPaint("#8080FF");
  test_palette.addBinding(8);
  test_palette.setPaint("#808000");
  test_palette.addBinding(9);

  grid.getTile(7,3).setWeight(2); grid.getTile(7,3).setColor("#FF8040");
  grid.getTile(6,3).setWeight(3); grid.getTile(6,3).setColor("#80FFFF");
  grid.getTile(5,3).setWeight(4); grid.getTile(5,3).setColor("#FF80FF");
  grid.getTile(4,3).setWeight(5); grid.getTile(4,3).setColor("#FF8080");
  grid.getTile(3,3).setWeight(6); grid.getTile(3,3).setColor("#FFFF00");
  grid.getTile(2,3).setWeight(7); grid.getTile(2,3).setColor("#0080FF");
  grid.getTile(1,3).setWeight(8); grid.getTile(1,3).setColor("#8080FF");
  grid.getTile(0,3).setWeight(9); grid.getTile(0,3).setColor("#808000");

  var path = execute(grid.getTile(0,0),grid.getTile(0,7),"bfs");

  var expected = [grid.getTile(0,0),grid.getTile(0,1),grid.getTile(0,2),grid.getTile(0,3),grid.getTile(0,4),grid.getTile(0,5),grid.getTile(0,6),grid.getTile(0,7)];

  var fail = compare_Paths(path,expected);
  var output = "test_Weight_Paths: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (0,1), (0,2), (0,3), (0,4), (0,5), (0,6), (0,7),]\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_Weight_Square(){
  resizeGrid(8,8);
  grid.clearAll();

  var test_palette = new Palette();
  test_palette.setPaint("#FF8040");
  test_palette.addBinding(2);
  test_palette.setPaint("#80FFFF");
  test_palette.addBinding(3);
  test_palette.setPaint("#FF80FF");
  test_palette.addBinding(4);
  test_palette.setPaint("#FF8080");
  test_palette.addBinding(5);

  grid.getTile(0,0).setWeight(2); grid.getTile(0,0).setColor("#FF8040"); grid.getTile(1,0).setWeight(2); grid.getTile(1,0).setColor("#FF8040"); grid.getTile(2,0).setWeight(2); grid.getTile(2,0).setColor("#FF8040"); grid.getTile(3,0).setWeight(2); grid.getTile(3,0).setColor("#FF8040");
  grid.getTile(0,1).setWeight(2); grid.getTile(0,1).setColor("#FF8040"); grid.getTile(1,1).setWeight(2); grid.getTile(1,1).setColor("#FF8040"); grid.getTile(2,1).setWeight(2); grid.getTile(2,1).setColor("#FF8040"); grid.getTile(3,1).setWeight(2); grid.getTile(3,1).setColor("#FF8040");
  grid.getTile(0,2).setWeight(2); grid.getTile(0,2).setColor("#FF8040"); grid.getTile(1,2).setWeight(2); grid.getTile(1,2).setColor("#FF8040"); grid.getTile(2,2).setWeight(2); grid.getTile(2,2).setColor("#FF8040"); grid.getTile(3,2).setWeight(2); grid.getTile(3,2).setColor("#FF8040");
  grid.getTile(0,3).setWeight(2); grid.getTile(0,3).setColor("#FF8040"); grid.getTile(1,3).setWeight(2); grid.getTile(1,3).setColor("#FF8040"); grid.getTile(2,3).setWeight(2); grid.getTile(2,3).setColor("#FF8040"); grid.getTile(3,3).setWeight(2); grid.getTile(3,3).setColor("#FF8040");

  grid.getTile(4,0).setWeight(5); grid.getTile(4,0).setColor("#80FFFF"); grid.getTile(5,0).setWeight(5); grid.getTile(5,0).setColor("#80FFFF"); grid.getTile(6,0).setWeight(5); grid.getTile(6,0).setColor("#80FFFF"); grid.getTile(7,0).setWeight(5); grid.getTile(7,0).setColor("#80FFFF");
  grid.getTile(4,1).setWeight(5); grid.getTile(4,1).setColor("#80FFFF"); grid.getTile(5,1).setWeight(5); grid.getTile(5,1).setColor("#80FFFF"); grid.getTile(6,1).setWeight(5); grid.getTile(6,1).setColor("#80FFFF"); grid.getTile(7,1).setWeight(5); grid.getTile(7,1).setColor("#80FFFF");
  grid.getTile(4,2).setWeight(5); grid.getTile(4,2).setColor("#80FFFF"); grid.getTile(5,2).setWeight(5); grid.getTile(5,2).setColor("#80FFFF"); grid.getTile(6,2).setWeight(5); grid.getTile(6,2).setColor("#80FFFF"); grid.getTile(7,2).setWeight(5); grid.getTile(7,2).setColor("#80FFFF");
  grid.getTile(4,3).setWeight(5); grid.getTile(4,3).setColor("#80FFFF"); grid.getTile(5,3).setWeight(5); grid.getTile(5,3).setColor("#80FFFF"); grid.getTile(6,3).setWeight(5); grid.getTile(6,3).setColor("#80FFFF"); grid.getTile(7,3).setWeight(5); grid.getTile(7,3).setColor("#80FFFF");

  grid.getTile(0,4).setWeight(3); grid.getTile(0,4).setColor("#FF80FF"); grid.getTile(0,5).setWeight(3); grid.getTile(0,5).setColor("#FF80FF"); grid.getTile(0,6).setWeight(3); grid.getTile(0,6).setColor("#FF80FF"); grid.getTile(0,7).setWeight(3); grid.getTile(0,7).setColor("#FF80FF");
  grid.getTile(1,4).setWeight(3); grid.getTile(1,4).setColor("#FF80FF"); grid.getTile(1,5).setWeight(3); grid.getTile(1,5).setColor("#FF80FF"); grid.getTile(1,6).setWeight(3); grid.getTile(1,6).setColor("#FF80FF"); grid.getTile(1,7).setWeight(3); grid.getTile(1,7).setColor("#FF80FF");
  grid.getTile(2,4).setWeight(3); grid.getTile(2,4).setColor("#FF80FF"); grid.getTile(2,5).setWeight(3); grid.getTile(2,5).setColor("#FF80FF"); grid.getTile(2,6).setWeight(3); grid.getTile(2,6).setColor("#FF80FF"); grid.getTile(2,7).setWeight(3); grid.getTile(2,7).setColor("#FF80FF");
  grid.getTile(3,4).setWeight(3); grid.getTile(3,4).setColor("#FF80FF"); grid.getTile(3,5).setWeight(3); grid.getTile(3,5).setColor("#FF80FF"); grid.getTile(3,6).setWeight(3); grid.getTile(3,6).setColor("#FF80FF"); grid.getTile(3,7).setWeight(3); grid.getTile(3,7).setColor("#FF80FF");

  grid.getTile(4,4).setWeight(4); grid.getTile(4,4).setColor("#FF8080"); grid.getTile(4,5).setWeight(4); grid.getTile(4,5).setColor("#FF8080"); grid.getTile(4,6).setWeight(4); grid.getTile(4,6).setColor("#FF8080"); grid.getTile(4,7).setWeight(4); grid.getTile(4,7).setColor("#FF8080");
  grid.getTile(5,4).setWeight(4); grid.getTile(5,4).setColor("#FF8080"); grid.getTile(5,5).setWeight(4); grid.getTile(5,5).setColor("#FF8080"); grid.getTile(5,6).setWeight(4); grid.getTile(5,6).setColor("#FF8080"); grid.getTile(5,7).setWeight(4); grid.getTile(5,7).setColor("#FF8080");
  grid.getTile(6,4).setWeight(4); grid.getTile(6,4).setColor("#FF8080"); grid.getTile(6,5).setWeight(4); grid.getTile(6,5).setColor("#FF8080"); grid.getTile(6,6).setWeight(4); grid.getTile(6,6).setColor("#FF8080"); grid.getTile(6,7).setWeight(4); grid.getTile(6,7).setColor("#FF8080");
  grid.getTile(7,4).setWeight(4); grid.getTile(7,4).setColor("#FF8080"); grid.getTile(7,5).setWeight(4); grid.getTile(7,5).setColor("#FF8080"); grid.getTile(7,6).setWeight(4); grid.getTile(7,6).setColor("#FF8080"); grid.getTile(7,7).setWeight(4); grid.getTile(7,7).setColor("#FF8080");

  var path = execute(grid.getTile(0,0),grid.getTile(7,7),"bfs");

  var expected = [grid.getTile(0,0),grid.getTile(1,0),grid.getTile(2,0),grid.getTile(3,0),grid.getTile(3,1),grid.getTile(3,2),grid.getTile(3,3),grid.getTile(3,4),grid.getTile(3,5),grid.getTile(3,6),grid.getTile(3,7),grid.getTile(4,7),grid.getTile(5,7),grid.getTile(6,7),grid.getTile(7,7)];

  var fail = compare_Paths(path,expected);
  var output = "test_Weight_Square: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,0), (2,0), (3,0), (3,1), (3,2), (3,3), (3,4), (3,5), (3,6), (3,7), (4,7), (5,7), (6,7), (7,7),]\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function execute_test_Weight() {

    var time = 200;
    running = true;
    setTimeout(function(){ console.log("Weight Tests:"); },time);
    setTimeout(function(){ test_Weight_Simple(); },time += 500);
    setTimeout(function(){ test_Weight_Paths(); },time += 2000);
    setTimeout(function(){ test_Weight_Square(); },time += 5000);
    setTimeout(function(){ resizeGrid(8,8); grid.clearAll(); grid.lightTiles(); running = false; }, time += 6000);

    console.log("\n");

}
