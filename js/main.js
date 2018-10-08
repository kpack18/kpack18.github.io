var old_crd = 0;

var grid = new Grid(8,8);
var palette = new Palette();

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

    $('.btn').click(function () {
	  var algoBarVal = document.getElementById("algo_select");
	  var selected_algo = algoBarVal.value;
	  
      grid.clearPaths();
      var algorithm = new Algorithm(selected_algo); 
      var path = algorithm.run(grid.getTile(0,0),grid.getTile(0,7),grid); //Will Return a List containing the shortest path from  (0,0) to (0,6)
      console.log("path: " + printPath(path));
    });

    $('.tile').mousemove(function (e) {
        setWall($(this), e);
        grid.getWeights();
    });

    $('#btnAlgorithm').click(myAlert);
});

function setWall(elem, e) {
    var curr_crd = elem[0].getBoundingClientRect().top + window.scrollY + elem[0].getBoundingClientRect().right;
	if(e.which == 1 && old_crd != curr_crd){
		old_crd = curr_crd;
        setColor(elem);
	}
 }

function setColor(elem) {
    elem.css('backgroundColor', palette.getPaint());
}

function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}
