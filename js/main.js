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
          var path = algorithm.run(grid.getTile(0,0),grid.getTile(7,7),grid); //Will Return a List containing the shortest path from  (0,0) to (0,6)
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
var apply_button = document.getElementById("apply_btn");
$('#grid-container').css({
    'width':807 + 'px' ,'height':807 + 'px'
});

apply_button.addEventListener("click", resizeGrid);

function setWall(elem, e) {
    var curr_crd = elem[0].getBoundingClientRect().top + window.scrollY + elem[0].getBoundingClientRect().right;
	if(e.which == 1 && old_crd != curr_crd){
		old_crd = curr_crd;
        setColor(elem);
	}
 }

 /* resizes grid by changing css variables which control grid display's columns and rows
    resizing is done by deleting all element before creating a brand new grid*/

function resizeGrid(){
    var grid_width = document.getElementById("grid-width").value;
    var grid_height = document.getElementById("grid-height").value;
    var total = grid_width * grid_height;
    let total_width = 0;
    let total_height = 0;

    if(grid_height == 0 || grid_width == 0 || grid_height < 0 || grid_width < 0){
        return;
    }
    if(grid_width == grid.getWidth() && grid_height == grid.getLength()){
        return;
    }
    else{
        switch (true){
            case (total >= 5000):
                document.documentElement.style.setProperty("--size", "20px");
                total_width = (grid_width * 20) + (1 * grid_width);
                total_height = (grid_height * 20) + (1 * grid_height);
                //sets the css style width and height
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            case (total >= 2500):
                document.documentElement.style.setProperty("--size", "30px");
                total_width = (grid_width * 30) + (1 * grid_width);
                total_height = (grid_height * 30) + (1 * grid_height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            case (total >= 1000):
                document.documentElement.style.setProperty("--size", "50px");
                total_width = (grid_width * 50) + (1 * grid_width);
                total_height = (grid_height * 50) + (1 * grid_height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            case (total >= 100):
                document.documentElement.style.setProperty("--size", "70px");
                total_width = (grid_width * 70) + (1 * grid_width);
                total_height = (grid_height * 70) + (1 * grid_height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            default:
                document.documentElement.style.setProperty("--size", "100px");
                total_width = (grid_width * 100) + (1 * grid_width);
                total_height = (grid_height * 100) + (1 * grid_height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break; 
        }
        for(var row = 0; row < grid.getLength(); ++row){
            for(var column = 0; column < grid.getWidth(); ++column){
                document.getElementById("grid").removeChild(grid.getTile(row,column).element);
            }
        }
        document.documentElement.style.setProperty("--width", grid_width);
        document.documentElement.style.setProperty("--height", grid_height);
        document.getElementById("grid-container").style.maxWidth
        grid = new Grid(grid_width, grid_height);
        test_grid_tile_access(grid_height, grid_width);

        $('.tile').click(function () {
            setColor($(this));
        });
        $('.tile').mousemove(function (e) {
            setWall($(this), e);
        });
    }
}

function setColor(elem) {
    elem.css('backgroundColor', palette.getPaint());
}

function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}
