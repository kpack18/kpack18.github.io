// Tests if we can modify a grid and palette, save them, and reload them back
function test_Save_Load(){
    var fail = false;

    resizeGrid(5, 5);
    var test_palette = new Palette(false);
    test_palette.setPaint("#50f0bb");
    test_palette.addBinding(2);
    test_palette.setPaint("#4080b0");
    test_palette.addBinding(3);
    test_palette.setPaint("#ccaadd");
    test_palette.addBinding(4);

    var count = 0;
    for (var i = 0; i < grid.getLength(); ++i) {
        for (var j = 0; j < grid.getWidth(); ++j) {
            grid.getTile(i, j).setColor(test_palette.weight_list.map[count % 5].key);
            grid.getTile(i, j).getWeight();
            ++count;
        }
    }

    var data = generateData(grid, test_palette);
    resizeGrid(3, 3); // Reset grid
    parseData(data);

    var gridSizeFail = false;
    var paletteSizeFail = false;

    if (grid.getLength() != 5 ||
        grid.getWidth() != 5) {
        fail = true;
        gridSizeFail = true;
    }

    if (palette.weight_list.map.length != test_palette.weight_list.map.length) {
        fail = true;
        paletteSizeFail = true;
    }

    if (!fail) {
        count = 0;
        for (var i = 0; i < 5; ++i) {
            for (var j = 0; j < 5; ++j) {
                if (grid.getTile(i, j).getWeightNoColor() != count % 5)
                    fail = true;
                if (grid.getTile(i, j).getColor() != test_palette.weight_list.map[count % 5].key)
                    fail = true;
                if (fail) break;
                ++count;
            }
            if (fail) break;
        }
    }

    if (!fail) {
        for (var i = 0; i < test_palette.weight_list.map.length; ++i) {
            if (palette.weight_list.map[i].key != test_palette.weight_list.map[i].key)
                fail = true;
            if (palette.weight_list.map[i].val != test_palette.weight_list.map[i].val)
                fail = true;
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

      output = output + "\n                     --- PALETTE ---\n";
      if (paletteSizeFail)
          output = output + "      Expected: 5 colors           Actual: " + palette.weight_list.map.length + " colors";
      else {
          output = output + "      Expected: [ (#000000, 0), (#ffffff, 1), (#28a745, -1), (#dc3545, -2), (#50f0bb, 2), (#4080b0, 3), (#ccaadd, 4),]\n"
          output = output + "        Actual: " + palette.printPalette() + "\n";
      }
  }
  else {
    output = output + "Pass";
  }
  output = output + "\n";
  console.log(output);
}

function execute_test_SaveLoad() {

    var time = 200;
    running = true;

    console.log("Save/Load Tests: ");
    test_Save_Load();
    console.log("\n");
    setTimeout(function(){ resizeGrid(8,8); grid.clearAll(); grid.lightTiles(); running = false; }, time += 2000);

}
