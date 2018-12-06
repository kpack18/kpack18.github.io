function check_ClearGrid_Simple(name,length,width){
  var fail = false;
  for(var i = 0; i < length; ++i){
    for(var j = 0; j < width; ++j){
        if(!(grid.getTile(i,j).getColorVisual() == "#ffffff")){
          fail = true;
        }
      }
    }

    var output = name + ": "
    if(fail){
      output = output + "FAIL: Grid Not Clear\n"
    }
    else{
      output = output + "Pass";
    }
    console.log(output);
}

function test_clearGrid_Simple(){
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

  var path = execute(grid.getTile(0,0),grid.getTile(0,6),"bfs");

  setTimeout(function(){ document.getElementById("clear").click(); },4000);
  setTimeout(function(){ check_ClearGrid_Simple("test_ClearGrid_Simple",8,8); },4500);
}

function test_clearGrid_Weight(){
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

  setTimeout(function(){ document.getElementById("clear").click(); },5000);
  setTimeout(function(){ check_ClearGrid_Simple("test_ClearGrid_Weight",8,8); },6000);
}

function execute_test_clearGrid() {

    var time = 200;
    running = true;
    setTimeout(function(){ console.log("ClearGrid Tests:"); },time);
    setTimeout(function(){ test_clearGrid_Simple(); },time += 500);
    setTimeout(function(){ test_clearGrid_Weight(); },time += 7000);
    setTimeout(function(){ grid.clearAll(); },time += 5000);
    console.log("\n");

}
