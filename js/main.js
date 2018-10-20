var running = false;
$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').click(function () {
        $('#sidebar').toggleClass('active');
    });

    $('#color-pick').change(function () {
        //current_color = $(this).val();
        palette.setPaint($(this).val());
    });

    $('.tile').click(function () {
        setColor($(this));
        grid.getWeights();
    });

    $('#algo').click(function () {
      ++ITER;
      if(running){

        var elem = this;
        $(this).prop('disabled', true);
        setTimeout(function() { $(elem).prop('disabled', false); },250);
        $(this).html("Algorithm");
        $(this).css("background-color","#4285F4");

        running = false;
        grid.lightTiles();
        grid.clearPaths();
        return;
      }
      else{
        running = true;
        $(this).html("Stop");
        $(this).css("background-color","rgb(255, 66, 66)");

        var algorithm = new Algorithm("bfs");
	       var algoBarVal = document.getElementById("algo_select");
	        var selected_algo = algoBarVal.value;
          grid.clearPaths();
          var algorithm = new Algorithm(selected_algo);
          var path = algorithm.run(grid.getTile(0,0),grid.getTile(3,3),grid); //Will Return a List containing the shortest path from  (0,0) to (0,6)
          console.log("path: " + printPath(path));
      }
    });

    $('.tile').mousemove(function (e) {
        setWall($(this), e);
        grid.getWeights();
    });

    $('#btnAlgorithm').click(myAlert);
});

var old_crd = 0;
let grid = new Grid(8,8);
var palette = new Palette();
var apply_button = $('#apply_btn').click(resize);
let grid_width;
let grid_height;
resizeBackground(807 , 807);


function setWall(elem, e) {
    var curr_crd = elem[0].getBoundingClientRect().top + window.scrollY + elem[0].getBoundingClientRect().right;
	if(e.which == 1 && old_crd != curr_crd){
		old_crd = curr_crd;
        setColor(elem);
	}
 }

 /* resizes grid by changing css variables which control grid display's columns and rows
    resizing is done by deleting all element before creating a brand new grid*/

function resize() {
    var grid_width = getWidth();
    var grid_height = getHeight();
    //test for 0 and negative inputs, if either exists do nothing
    if (grid_height == 0 || grid_width == 0 || grid_height < 0 || grid_width < 0) {
        return;
    }
    //if the width and height is the current grid's width and height do nothing
    if (grid_width == grid.getWidth() && grid_height == grid.getLength()) {
        return;
    }

    resizeBackgroundTiles(grid_width, grid_height);
    resizeGrid(grid_width, grid_height);
    $('.tile').click(function () {
        setColor($(this));
    });
    $('.tile').mousemove(function (e) {
        setWall($(this), e);
    });
}
/*Resizes the black background underneath the grid*/
function resizeBackground(t_width, t_height){
    $('#grid-container').css({
        'width':t_width + 'px' ,'height':t_height + 'px'
    });
}
/* gets the width and height from the html form */
function getWidth(){
    width = document.getElementById("grid-width").value;
    if(grid_width % 1 != 0){
       width = Math.floor(width);
    }
    return width;
}

function getHeight(){
    height = document.getElementById("grid-height").value;
    if(grid_height % 1 != 0){
        height = Math.floor(height);
     }
     return height;
}
/*resizes the background and tiles based on total number of tiles */
function resizeBackgroundTiles(width, height){
    let total_width = 0;
    let total_height = 0;
    var total = width * height;
    switch (true) {
        case (total >= 5000):
            document.documentElement.style.setProperty("--size", "20px");
            total_width = (width * 20) + (1 * width);
            total_height = (height * 20) + (1 * height);
            //sets the css style width and height
            resizeBackground(total_width, total_height);
            break;
        case (total >= 2500):
            document.documentElement.style.setProperty("--size", "30px");
            total_width = (width * 30) + (1 * width);
            total_height = (height * 30) + (1 * height);
            resizeBackground(width, height);
            break;
        case (total >= 1000):
            document.documentElement.style.setProperty("--size", "50px");
            total_width = (width * 50) + (1 * width);
            total_height = (height * 50) + (1 * height);
            resizeBackground(width, height);
            break;
        case (total >= 100):
            document.documentElement.style.setProperty("--size", "70px");
            total_width = (width * 70) + (1 * width);
            total_height = (height * 70) + (1 * height);
            resizeBackground(total_width, total_height);
            break;
        default:
            document.documentElement.style.setProperty("--size", "100px");
            total_width = (width * 100) + (1 * width);
            total_height = (height * 100) + (1 * height);
            resizeBackground(total_width, total_height);
            break;
    }
}
/*resizes the grid by creating a brand new grid*/
function resizeGrid(width, height){
    for (var row = 0; row < grid.getLength(); ++row) {
        for (var column = 0; column < grid.getWidth(); ++column) {
            document.getElementById("grid").removeChild(grid.getTile(row, column).element);
        }
    }
    document.documentElement.style.setProperty("--width", width);
    document.documentElement.style.setProperty("--height", height);
    grid = new Grid(height, width);
}

/*--------------------------------------------- end of resizing functions ------------------------------------------------*/

function setColor(elem) {
    elem.css('backgroundColor', palette.getPaint());
}

function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}
