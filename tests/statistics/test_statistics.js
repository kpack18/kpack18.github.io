function test_stat_Same_Point(){
  resizeGrid(3,3);
  grid.clearAll();

  // var bestDeciseconds = 00;
  // var bestSeconds = 00;
  // var bestMinutes = 00;

  var path = execute(grid.getTile(0,0),grid.getTile(0,0),"bfs");

  var expected_Dec = 0;
  var expected_Sec = 0;
  var expected_Min = 0;

  var fail = !(expected_Dec == bestDeciseconds && expected_Sec == bestSeconds && expected_Min == bestMinutes);
  var output = "test_stat_Same_Point: "
  if(fail){
    output = output + "FAIL: Expected: 0:0:0  Actual: " + bestMinutes + ":" + bestSeconds + ":" + bestDeciseconds;
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_stat_Path_Simple(){
  resizeGrid(3,3);
  grid.clearAll();

  var path = execute(grid.getTile(0,0),grid.getTile(2,2),"bfs");

  var expected_Dec = 0;
  var expected_Sec = 0;
  var expected_Min = 0;

  var fail = !(expected_Dec == bestDeciseconds && expected_Sec == bestSeconds && expected_Min == bestMinutes);
  var output = "test_Stat_Path_Simple: "
  if(fail){
    output = output + "FAIL: Expected: 00:00:00  Actual: " + bestMinutes + ":" + bestSeconds + ":" + bestDeciseconds;
  }
  else{
    output = output + "Pass";
  }
  console.log(output);
}

function test_stat_Path_Wall(){
  resizeGrid(3,3);
  grid.clearAll();

  grid.getTile(0,1).setWeight(0);
  grid.getTile(0,1).setColor("#000000");
  grid.getTile(1,1).setWeight(0);
  grid.getTile(1,1).setColor("#000000");

  var path = execute(grid.getTile(0,0),grid.getTile(0,2),"bfs");

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

function test_stat_Path_None(){
  resizeGrid(3,3);
  grid.clearAll();

  grid.getTile(1,0).setWeight(0);
  grid.getTile(1,0).setColor("#000000");
  grid.getTile(1,1).setWeight(0);
  grid.getTile(1,1).setColor("#000000");
  grid.getTile(1,2).setWeight(0);
  grid.getTile(1,2).setColor("#000000");

  var path = execute(grid.getTile(0,0),grid.getTile(2,0),"bfs");

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
function execute_test_statistics() {

    var time = 200;
    running = true;
    setTimeout(function(){ console.log("Statistic Tests:"); },time);
    setTimeout(function(){ test_stat_Same_Point(); },time += 500);
    setTimeout(function(){ test_stat_Path_Simple(); },time += 1000);
    console.log("\n");

}
