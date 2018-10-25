// Tests an Execution of Breadth first search on a 3x3 grid where the start and end points are the same
function compare_Paths(path,expected){
  var fail = false;
  if(path.length != expected.length){ return true; }
  for(var i = 0; i < path.length; ++i){
    if(!path[i].compare(expected[i])){
      fail = true;
      break;
    }
  }
  return fail;
}

function test_Bfs_Same_Point(){
  resizeGrid(3,3);
  grid.clearAll();

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(0,0),grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [grid.getTile(0,0)];

  var fail = compare_Paths(path,expected);
  var output = "test_Bfs_Same_Point: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0),]  Actual: " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}
/* Tests Bfs Search on a graph of the Following:        [ 1 1 1 ]
Where (0,0) is the start point and (2,2) is the end     [ 1 1 1 ]
                                                        [ 1 1 1 ] */
function test_Bfs_Path_Simple(){
  resizeGrid(3,3);
  grid.clearAll();

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(2,2),grid); //Will Return a List containing the shortest path from  (0,0) to (2,2)

  var expected = [grid.getTile(0,0),grid.getTile(1,0),grid.getTile(2,0),grid.getTile(2,1),grid.getTile(2,2)];

  var fail = compare_Paths(path,expected);
  var output = "test_Bfs_Path_Simple: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,0), (2,0), (2,1), (2,2),]\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}
/* Tests Bfs Search on a graph of the Following:        [ 1 0 1 ]
Where (0,0) is the start point and (2,0) is the end     [ 1 0 1 ]
  0's are walls and 1's are plain tiles                 [ 1 1 1 ] */
function test_Bfs_Path_Wall(){
  resizeGrid(3,3);
  grid.clearAll();

  grid.getTile(0,1).setWeight(0);
  grid.getTile(0,1).setColor("#000000");
  grid.getTile(1,1).setWeight(0);
  grid.getTile(1,1).setColor("#000000");

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(0,2),grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [grid.getTile(0,0),grid.getTile(1,0),grid.getTile(2,0),grid.getTile(2,1),grid.getTile(2,2),grid.getTile(1,2),grid.getTile(0,2)];

  var fail = compare_Paths(path,expected);

  var output = "test_Bfs_Path_Wall: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,0), (2,0), (2,1), (2,2), (2,1), (1,2), (0,2),]\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

/* Tests Bfs Search on a graph where no path exists: [ 1 0 1 ]
                                                     [ 1 0 1 ]
                                                     [ 1 0 1 ] */
function test_Bfs_Path_None(){
  resizeGrid(3,3);
  grid.clearAll();

  grid.getTile(1,0).setWeight(0);
  grid.getTile(1,0).setColor("#000000");
  grid.getTile(1,1).setWeight(0);
  grid.getTile(1,1).setColor("#000000");
  grid.getTile(1,2).setWeight(0);
  grid.getTile(1,2).setColor("#000000");

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(2,0),grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [];

  var fail = compare_Paths(path,expected);
  var output = "test_Bfs_Path_None: "
  if(fail){
    output = output + "FAIL: Expected: []\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

/* Tests Bfs Search on a Complex Graph from (0,0) to [ 1 0 1 1 1 0 1 1]
                                            (0,6)    [ 1 0 1 0 0 0 0 1]
                                                     [ 1 1 1 0 1 1 1 1]
                                                     [ 1 0 0 0 0 0 1 0]
                                                     [ 1 1 1 1 1 0 1 1]
                                                     [ 1 0 0 0 1 0 0 1]
                                                     [ 1 0 0 0 1 0 1 1]
                                                     [ 1 1 1 0 1 1 1 1] */
function test_Bfs_Path_Complex(){
  resizeGrid(8,8);
  grid.clearAll();

  grid.getTile(0,1).setWeight(0); grid.getTile(0,1).setColor("#000000");
  grid.getTile(1,1).setWeight(0); grid.getTile(1,1).setColor("#000000");
  grid.getTile(3,1).setWeight(0); grid.getTile(3,1).setColor("#000000");
  grid.getTile(3,2).setWeight(0); grid.getTile(3,2).setColor("#000000");
  grid.getTile(3,3).setWeight(0); grid.getTile(3,3).setColor("#000000");
  grid.getTile(2,3).setWeight(0); grid.getTile(2,3).setColor("#000000");
  grid.getTile(1,3).setWeight(0); grid.getTile(1,3).setColor("#000000");
  grid.getTile(1,4).setWeight(0); grid.getTile(1,4).setColor("#000000");
  grid.getTile(1,5).setWeight(0); grid.getTile(1,5).setColor("#000000");
  grid.getTile(0,5).setWeight(0); grid.getTile(0,5).setColor("#000000");
  grid.getTile(5,1).setWeight(0); grid.getTile(5,1).setColor("#000000");
  grid.getTile(5,2).setWeight(0); grid.getTile(5,2).setColor("#000000");
  grid.getTile(5,3).setWeight(0); grid.getTile(5,3).setColor("#000000");
  grid.getTile(6,1).setWeight(0); grid.getTile(6,1).setColor("#000000");
  grid.getTile(6,2).setWeight(0); grid.getTile(6,2).setColor("#000000");
  grid.getTile(6,3).setWeight(0); grid.getTile(6,3).setColor("#000000");
  grid.getTile(3,4).setWeight(0); grid.getTile(3,4).setColor("#000000");
  grid.getTile(3,5).setWeight(0); grid.getTile(3,5).setColor("#000000");
  grid.getTile(4,5).setWeight(0); grid.getTile(4,5).setColor("#000000");
  grid.getTile(5,5).setWeight(0); grid.getTile(5,5).setColor("#000000");
  grid.getTile(6,5).setWeight(0); grid.getTile(6,5).setColor("#000000");
  grid.getTile(7,3).setWeight(0); grid.getTile(7,3).setColor("#000000");
  grid.getTile(5,6).setWeight(0); grid.getTile(5,6).setColor("#000000");
  grid.getTile(3,7).setWeight(0); grid.getTile(3,7).setColor("#000000");
  grid.getTile(1,6).setWeight(0); grid.getTile(1,6).setColor("#000000");

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(0,6),grid); //Will Return a List containing the shortest path from  (0,0) to (0,6)

  var expected = [grid.getTile(0,0),grid.getTile(1,0),grid.getTile(2,0),grid.getTile(3,0),grid.getTile(4,0),grid.getTile(4,1),grid.getTile(4,2),grid.getTile(4,3),grid.getTile(4,4),
  grid.getTile(5,4),grid.getTile(6,4),grid.getTile(7,4),grid.getTile(7,5),grid.getTile(7,6),grid.getTile(6,6),grid.getTile(6,7),grid.getTile(5,7),grid.getTile(4,7),grid.getTile(4,6),
  grid.getTile(3,6),grid.getTile(2,6),grid.getTile(2,7),grid.getTile(1,7),grid.getTile(0,7),grid.getTile(0,6)];

  var fail = compare_Paths(path,expected);
  var output = "test_Bfs_Path_Complex: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,0), (2,0), (3,0), (4,0), (4,1), (4,2), (4,3), (4,4), (5,4), (6,4), (7,4), (7,5), (7,6), (6,6), (6,7), (5,7), (4,7), (4,6), (3,6), (2,6), (2,7), (1,7), (0,7), (0,6),]\n                          Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_Dfs_Path_Simple(){
  resizeGrid(8,8);
  grid.clearAll();

  var algorithm = new Algorithm("dfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(7,7),grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [grid.getTile(0,0),grid.getTile(0,1),grid.getTile(0,2),grid.getTile(0,3),grid.getTile(0,4),grid.getTile(0,5),grid.getTile(0,6),grid.getTile(0,7),grid.getTile(1,7),grid.getTile(2,7),grid.getTile(3,7),grid.getTile(4,7),grid.getTile(5,7),grid.getTile(6,7),grid.getTile(7,7)];

  var fail = compare_Paths(path,expected);
  var output = "test_Dfs_Path_Simple: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (0,1), (0,2), (0,3), (0,4), (0,5), (0,6), (0,7), (1,7), (2,7), (3,7), (4,7), (5,7), (6,7), (7,7),]\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_Dfs_Path_None(){
  grid.clearAll();

  grid.getTile(3,0).setWeight(0); grid.getTile(3,0).setColor("#000000");
  grid.getTile(3,1).setWeight(0); grid.getTile(3,1).setColor("#000000");
  grid.getTile(3,2).setWeight(0); grid.getTile(3,2).setColor("#000000");
  grid.getTile(3,3).setWeight(0); grid.getTile(3,3).setColor("#000000");
  grid.getTile(3,4).setWeight(0); grid.getTile(3,4).setColor("#000000");
  grid.getTile(3,5).setWeight(0); grid.getTile(3,5).setColor("#000000");
  grid.getTile(3,6).setWeight(0); grid.getTile(3,6).setColor("#000000");
  grid.getTile(3,7).setWeight(0); grid.getTile(3,7).setColor("#000000");

  var algorithm = new Algorithm("dfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(7,7),grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [];

  var fail = compare_Paths(path,expected);
  var output = "test_Dfs_Path_None: "
  if(fail){
    output = output + "FAIL: Expected: []\n                           Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

/* Tests Dfs Search on a Complex Graph from (0,0) to [ 1 0 1 1 1 0 1 1]
                                            (0,6)    [ 1 0 1 0 0 0 0 1]
                                                     [ 1 1 1 0 1 1 1 1]
                                                     [ 1 0 0 0 0 0 1 0]
                                                     [ 1 1 1 1 1 0 1 1]
                                                     [ 1 0 0 0 1 0 0 1]
                                                     [ 1 0 0 0 1 0 1 1]
                                                     [ 1 1 1 0 1 1 1 1] */
function test_Dfs_Path_Complex(){
  resizeGrid(8,8);
  grid.clearAll();

  grid.getTile(0,1).setWeight(0); grid.getTile(0,1).setColor("#000000");
  grid.getTile(1,1).setWeight(0); grid.getTile(1,1).setColor("#000000");
  grid.getTile(3,1).setWeight(0); grid.getTile(3,1).setColor("#000000");
  grid.getTile(3,2).setWeight(0); grid.getTile(3,2).setColor("#000000");
  grid.getTile(3,3).setWeight(0); grid.getTile(3,3).setColor("#000000");
  grid.getTile(2,3).setWeight(0); grid.getTile(2,3).setColor("#000000");
  grid.getTile(1,3).setWeight(0); grid.getTile(3,7).setColor("#000000");
  grid.getTile(1,4).setWeight(0); grid.getTile(1,4).setColor("#000000");
  grid.getTile(1,5).setWeight(0); grid.getTile(1,5).setColor("#000000");
  grid.getTile(0,5).setWeight(0); grid.getTile(0,5).setColor("#000000");
  grid.getTile(5,1).setWeight(0); grid.getTile(5,1).setColor("#000000");
  grid.getTile(5,2).setWeight(0); grid.getTile(5,2).setColor("#000000");
  grid.getTile(5,3).setWeight(0); grid.getTile(5,3).setColor("#000000");
  grid.getTile(6,1).setWeight(0); grid.getTile(6,1).setColor("#000000");
  grid.getTile(6,2).setWeight(0); grid.getTile(6,2).setColor("#000000");
  grid.getTile(6,3).setWeight(0); grid.getTile(6,3).setColor("#000000");
  grid.getTile(3,4).setWeight(0); grid.getTile(3,4).setColor("#000000");
  grid.getTile(3,5).setWeight(0); grid.getTile(3,5).setColor("#000000");
  grid.getTile(4,5).setWeight(0); grid.getTile(4,5).setColor("#000000");
  grid.getTile(5,5).setWeight(0); grid.getTile(5,5).setColor("#000000");
  grid.getTile(6,5).setWeight(0); grid.getTile(6,5).setColor("#000000");
  grid.getTile(7,3).setWeight(0); grid.getTile(7,3).setColor("#000000");
  grid.getTile(5,6).setWeight(0); grid.getTile(5,6).setColor("#000000");
  grid.getTile(3,7).setWeight(0); grid.getTile(3,7).setColor("#000000");
  grid.getTile(1,6).setWeight(0); grid.getTile(1,6).setColor("#000000");

  var algorithm = new Algorithm("dfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(0,6),grid); //Will Return a List containing the shortest path from  (0,0) to (0,6)

  var expected = [grid.getTile(0,0),grid.getTile(1,0),grid.getTile(2,0),grid.getTile(3,0),grid.getTile(4,0),grid.getTile(4,1),grid.getTile(4,2),grid.getTile(4,3),grid.getTile(4,4),
  grid.getTile(5,4),grid.getTile(6,4),grid.getTile(7,4),grid.getTile(7,5),grid.getTile(7,6),grid.getTile(6,6),grid.getTile(6,7),grid.getTile(5,7),grid.getTile(4,7),grid.getTile(4,6),
  grid.getTile(3,6),grid.getTile(2,6),grid.getTile(2,7),grid.getTile(1,7),grid.getTile(0,7),grid.getTile(0,6)];

  var fail = compare_Paths(path,expected);
  var output = "test_Dfs_Path_Complex: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (1,0), (2,0), (3,0), (4,0), (4,1), (4,2), (4,3), (4,4), (5,4), (6,4), (7,4), (7,5), (7,6), (6,6), (6,7), (5,7), (4,7), (4,6), (3,6), (2,6), (2,7), (1,7), (0,7), (0,6),]\n                          Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

/* Tests Dfs Search on a Complex Graph from (0,0) to [ 0 0 0 0 0 1 0 1]
                                            (0,6)    [ 0 1 0 1 0 0 0 0]
                                                     [ 0 0 0 0 0 1 0 1]
                                                     [ 0 1 0 1 0 0 0 0]
                                                     [ 0 0 0 0 0 1 0 1]
                                                     [ 0 1 0 1 0 0 0 0]
                                                     [ 0 0 0 0 0 1 0 1]
                                                     [ 0 1 0 1 0 0 0 0] */
function test_Dfs_Path_Complex_2(){
  resizeGrid(8,8);
  grid.clearAll();
  //grid.clearPaths();

  grid.getTile(0,7).setWeight(0); grid.getTile(0,7).setColor("#000000");
  grid.getTile(0,5).setWeight(0); grid.getTile(0,5).setColor("#000000");
  grid.getTile(2,7).setWeight(0); grid.getTile(2,7).setColor("#000000");
  grid.getTile(2,5).setWeight(0); grid.getTile(2,5).setColor("#000000");
  grid.getTile(4,7).setWeight(0); grid.getTile(4,7).setColor("#000000");
  grid.getTile(4,5).setWeight(0); grid.getTile(4,5).setColor("#000000");
  grid.getTile(6,7).setWeight(0); grid.getTile(6,7).setColor("#000000");
  grid.getTile(6,5).setWeight(0); grid.getTile(6,5).setColor("#000000");
  grid.getTile(1,1).setWeight(0); grid.getTile(1,1).setColor("#000000");
  grid.getTile(1,3).setWeight(0); grid.getTile(1,3).setColor("#000000");
  grid.getTile(3,1).setWeight(0); grid.getTile(3,1).setColor("#000000");
  grid.getTile(3,3).setWeight(0); grid.getTile(3,3).setColor("#000000");
  grid.getTile(5,1).setWeight(0); grid.getTile(5,1).setColor("#000000");
  grid.getTile(5,3).setWeight(0); grid.getTile(5,3).setColor("#000000");
  grid.getTile(7,1).setWeight(0); grid.getTile(7,1).setColor("#000000");
  grid.getTile(7,3).setWeight(0); grid.getTile(7,3).setColor("#000000");

  var algorithm = new Algorithm("dfs");
  var path = algorithm.run(grid.getTile(0,0),grid.getTile(4,0),grid); //Will Return a List containing the shortest path from  (0,0) to (0,4)

  var expected = [grid.getTile(0,0),grid.getTile(0,1),grid.getTile(0,2),grid.getTile(0,3),grid.getTile(0,4),grid.getTile(1,4),grid.getTile(1,5),grid.getTile(1,6),grid.getTile(2,6),
  grid.getTile(3,6),grid.getTile(4,6),grid.getTile(5,6),grid.getTile(6,6),grid.getTile(7,6),grid.getTile(7,5),grid.getTile(7,4),grid.getTile(6,4),grid.getTile(5,4),grid.getTile(4,4),
  grid.getTile(3,4),grid.getTile(2,4),grid.getTile(2,3),grid.getTile(2,2),grid.getTile(3,2),grid.getTile(4,2),grid.getTile(5,2),grid.getTile(6,2),grid.getTile(6,1),grid.getTile(6,0),
  grid.getTile(5,0),grid.getTile(4,0)];

  var fail = compare_Paths(path,expected);
  var output = "test_Dfs_Path_Complex_2: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (0,1), (0,2), (0,3), (0,4), (1,4), (1,5), (1,6), (2,6), (3,6), (4,6), (5,6), (6,6), (7,6), (7,5), (7,4), (6,4), (5,4), (4,4), (3,4), (2,4), (2,3), (2,2), (3,2), (4,2), (5,2), (6,2), (6,1), (6,0), (5,0), (4,0),]\n                          Actual:   " + printPath(path);
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function execute_test_Algorithm() {

    var time = 200;
    running = true;
    setTimeout(function(){ console.log("Algorithm Tests:"); console.log("\nBfs:"); },time);
    setTimeout(function(){ test_Bfs_Same_Point(); },time += 500);
    setTimeout(function(){ test_Bfs_Path_Simple(); },time += 1000);
    setTimeout(function(){ test_Bfs_Path_Wall(); },time += 2000);
    setTimeout(function(){ test_Bfs_Path_None(); },time += 2000);
    setTimeout(function(){ test_Bfs_Path_Complex(); },time += 2000);
    //test_Bfs_Same_Point();
    //test_Bfs_Path_Simple();
    //test_Bfs_Path_Wall();
    //test_Bfs_Path_None();
    //test_Bfs_Path_Complex();

    setTimeout(function(){ console.log("\nDfs:"); },time += 2500);
    setTimeout(function(){ test_Dfs_Path_Simple(); },time += 3000);
    setTimeout(function(){ test_Dfs_Path_None(); },time += 4000);
    setTimeout(function(){ test_Dfs_Path_Complex(); }, time += 4000);
    setTimeout(function(){ test_Dfs_Path_Complex_2(); },time += 4000);
    setTimeout(function(){ resizeGrid(8,8); grid.clearAll(); grid.lightTiles(); }, time += 5000);
    // test_Dfs_Path_Simple();
    // test_Dfs_Path_None();
    // test_Dfs_Path_Complex();
    // test_Dfs_Path_Complex_2();
    console.log("\n");

}
