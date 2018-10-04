// Tests an Execution of Breadth first search on a 3x3 grid where the start and end points are the same
function compare_Paths(path,expected){
  var fail = false;
  if(path.length != expected.length){ fail = true; }
  for(var i = 0; i < path.length; ++i){
    if(!path[i].compare(expected[i])){
      fail = true;
      break;
    }
  }
  return fail;
}

function test_Bfs_Same_Point(){
  var test_grid = new Grid(3,3);

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(test_grid.getTile(0,0),test_grid.getTile(0,0),test_grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [test_grid.getTile(0,0)];

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
  var test_grid = new Grid(3,3);

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(test_grid.getTile(0,0),test_grid.getTile(2,2),test_grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [test_grid.getTile(0,0),test_grid.getTile(1,0),test_grid.getTile(2,0),test_grid.getTile(2,1),test_grid.getTile(2,2)];

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
/* Tests Bfs Search on a graph of the Following:        [ 1 1 1 ]
Where (0,0) is the start point and (2,0) is the end     [ 1 0 1 ]
  0's are walls and 1's are plain tiles                 [ 1 0 1 ] */
function test_Bfs_Path_Wall(){
  var test_grid = new Grid(3,3);

  test_grid.getTile(1,0).setWeight(0);
  test_grid.getTile(1,1).setWeight(0);

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(test_grid.getTile(0,0),test_grid.getTile(2,0),test_grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

  var expected = [test_grid.getTile(0,0),test_grid.getTile(0,1),test_grid.getTile(0,2),test_grid.getTile(1,2),test_grid.getTile(2,2),test_grid.getTile(2,1),test_grid.getTile(2,0)];

  var fail = compare_Paths(path,expected);

  var output = "test_Bfs_Path_Wall: "
  if(fail){
    output = output + "FAIL: Expected: [ (0,0), (0,1), (0,2), (1,2), (2,2), (2,1), (2,0),]\n                           Actual:   " + printPath(path);
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
  var test_grid = new Grid(3,3);

  test_grid.getTile(1,2).setWeight(0);
  test_grid.getTile(1,0).setWeight(0);
  test_grid.getTile(1,1).setWeight(0);

  var algorithm = new Algorithm("bfs");
  var path = algorithm.run(test_grid.getTile(0,0),test_grid.getTile(2,0),test_grid); //Will Return a List containing the shortest path from  (0,0) to (0,0)

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

console.log("Algorithm Tests:");
test_Bfs_Same_Point();
test_Bfs_Path_Simple();
test_Bfs_Path_Wall();
test_Bfs_Path_None();
console.log("\n");
