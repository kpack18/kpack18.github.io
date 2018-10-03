const assert = require('assert');
const grid = require('../../js/grid.js');

describe('Grid', function () {
    describe('Default', function () {
        it(" should be initialized to a 3x3 matrix with ascending weights", function () {
            let test_grid = new grid.Grid(3, 3);
            
            for (let i = 0; i < test_grid.getLength(); ++i)
                for (let j = 0; j < test_grid.getWidth(); ++j)
                    assert.equal(test_grid.getTile(i, j).getWeight(), 1, "Every tile in 3x3 should have weight of 1");

            assert.equal(test_grid.printRow(0), "[ 1, 1, 1,]");
            assert.equal(test_grid.printRow(1), "[ 1, 1, 1,]");
            assert.equal(test_grid.printRow(2), "[ 1, 1, 1,]");
        });
    });

    describe('Set Weights', function () {
        it(" should match the output after setting each Tile's weight to a different value", function () {
            let test_grid = new grid.Grid(5, 5);

            let count = 0;
            for (let i = 0; i < test_grid.getLength(); ++i) {
                for (let j = 0; j < test_grid.getWidth(); ++j) {
                    test_grid.getTile(i, j).setWeight(count);
                    ++count;
                }
            }

            assert.equal(test_grid.printRow(0), "[ 0, 1, 2, 3, 4,]");
            assert.equal(test_grid.printRow(1), "[ 5, 6, 7, 8, 9,]");
            assert.equal(test_grid.printRow(2), "[ 10, 11, 12, 13, 14,]");
            assert.equal(test_grid.printRow(3), "[ 15, 16, 17, 18, 19,]");
            assert.equal(test_grid.printRow(4), "[ 20, 21, 22, 23, 24,]");
        });
    });
});
