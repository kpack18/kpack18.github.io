// Tests if we can modify a grid and palette, save them, and reload them back
function test_Save_Load(){
    var fail = false;
    
    var test_grid = new Grid(5, 5);
    var test_palette = new Palette();
    test_palette.setPaint("rgb(10, 20, 30)");
    test_palette.addBinding(2);
    test_palette.setPaint("rgb(40, 80, 120)");
    test_palette.addBinding(3);
    test_palette.setPaint("rgb(200, 100, 300)");
    test_palette.addBinding(4);

    var count = 0;
    for (var i = 0; i < test_grid.getLength(); ++i) {
        for (var j = 0; j < test_grid.getWidth(); ++j) {
            test_grid.getTile(i, j).setColor(test_palette.weight_list.map[count % 5]);
            test_grid.getTile(i, j).getWeight();
            ++count;
        }
    }

    var data = generateData(test_grid, test_palette);
    grid = new Grid(5, 5); // temporary
    parseData(data);

    var gridSizeFail = false;
    var paletteSizeFail = false;

    if (grid.getLength() != test_grid.getLength() ||
        grid.getWidth != test_grid.getWidth()) {
        fail = true;
        gridSizeFail = true;
    }

    if (palette.weight_list.map.length != test_palette.weight_list.map.length) {
        fail = true;
        paletteSizeFail = true;
    }

    if (!fail) {
        for (var i = 0; i < test_grid.getLength(); ++i) {
            for (var j = 0; j < test_grid.getWidth(); ++j) {
                if (grid.getTile(i, j).getWeightNoColor() != test_grid.getTile(i, j).getWeightNoColor())
                    fail = true;
                if (grid.getTile(i, j).getColor() != test_grid.getTile(i, j).getColor())
                    fail = true;
                if (fail) break;
            }
            if (fail) break;
        }
    }

    if (!fail) {
        for (var i = 0; i < test_palette.weight_list.map.length; ++i) {
            if (palette.weight_list.map[i] != test_palette.weight_list.map[i]) {
                fail = true;
            }
            if (fail) break;
        }
    }

  var output = "test_Save_Load: ";
  if (fail) {
      output =     output + "FAIL:            --- GRID ---\n";
      if (gridSizeFail)
          output = output + "      Expected: 5x5                Actual: " + grid.getLength() + "x" + grid.getWidth();
      else {
          output = output + "      Expected: [ 0, 1, 2, 3, 4,]  Actual: " + grid.printRow(0) + "\n";
          output = output + "                [ 0, 1, 2, 3, 4,]          " + grid.printRow(1) + "\n";
          output = output + "                [ 0, 1, 2, 3, 4,]          " + grid.printRow(2) + "\n";
          output = output + "                [ 0, 1, 2, 3, 4,]          " + grid.printRow(3) + "\n";
          output = output + "                [ 0, 1, 2, 3, 4,]          " + grid.printRow(4) + "\n";
      }

      output = output + "                     --- PALETTE ---\n";
      if (paletteSizeFail)
          output = output + "      Expected: 5 colors           Actual: " + palette.weight_list.map.length + " colors";
      else {
          output = output + "      Expected: [ 0, 1, 2, 3, 4 ]  Actual: " + palette.weight_list.map + "\n";
      }
  }
  else {
    output = output + "Pass";
  }
  output = output + "\n";
  console.log(output);
}

console.log("Save/Load Tests: ");
test_Save_Load();
console.log("\n");
