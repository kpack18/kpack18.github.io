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

    $('#apply_btn').click(function () {
        var grid_width = document.getElementById("grid-width").value;
        var grid_height = document.getElementById("grid-height").value;
        resizeGrid(grid_width, grid_height);
    });
});

var old_crd = 0;

let grid = new Grid(8,8);
var palette = new Palette();
$('#grid-container').css({
    'width':807 + 'px' ,'height':807 + 'px'
});

function setWall(elem, e) {
    var curr_crd = elem[0].getBoundingClientRect().top + window.scrollY + elem[0].getBoundingClientRect().right;
	if(e.which == 1 && old_crd != curr_crd){
		old_crd = curr_crd;
        setColor(elem);
	}
 }

 /* resizes grid by changing css variables which control grid display's columns and rows
    resizing is done by deleting all element before creating a brand new grid*/

function resizeGrid(width, height){
    var total = width * height;
    let total_width = 0;
    let total_height = 0;

    if(height == 0 || width == 0 || height < 0 || width < 0){
        return;
    }
    if(width == grid.getWidth() && height == grid.getLength()){
        return;
    }
    else{
        switch (true){
            case (total >= 5000):
                document.documentElement.style.setProperty("--size", "20px");
                total_width = (width * 20) + (1 * width);
                total_height = (height * 20) + (1 * height);
                //sets the css style width and height
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            case (total >= 2500):
                document.documentElement.style.setProperty("--size", "30px");
                total_width = (width * 30) + (1 * width);
                total_height = (height * 30) + (1 * height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            case (total >= 1000):
                document.documentElement.style.setProperty("--size", "50px");
                total_width = (width * 50) + (1 * width);
                total_height = (height * 50) + (1 * height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            case (total >= 100):
                document.documentElement.style.setProperty("--size", "70px");
                total_width = (width * 70) + (1 * width);
                total_height = (height * 70) + (1 * height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
            default:
                document.documentElement.style.setProperty("--size", "100px");
                total_width = (width * 100) + (1 * width);
                total_height = (height * 100) + (1 * height);
                $('#grid-container').css({
                    'width':total_width + 'px' ,'height':total_height + 'px'
                });
                break;
        }

        $('#grid .tile').remove();

        document.documentElement.style.setProperty("--width", width);
        document.documentElement.style.setProperty("--height", height);
        document.getElementById("grid-container").style.maxWidth
        grid = new Grid(height, width);

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
