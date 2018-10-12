var old_crd = 0;

var grid = new Grid(3,3);
var palette = new Palette();

$(document).ready(function () {
 //Script add color option
	$('#add-colors').click(function(){
		AddNewColorOption();
	});

	//Set palate on click of color options
	$('#color-options').on('click','button',function(){
		palette.setPaint($(this).data('color'));
		palette.addBinding($(this).data('number'));
	})

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
      grid.clearPaths();
      var algorithm = new Algorithm("bfs");
	  var algoBarVal = document.getElementById("algo_select");
	  var selected_algo = algoBarVal.value;
      grid.clearPaths();
      var algorithm = new Algorithm(selected_algo);
      var path = algorithm.run(grid.getTile(0,0),grid.getTile(0,2),grid); //Will Return a List containing the shortest path from  (0,0) to (0,6)
      console.log("path: " + printPath(path));
    });

    $('.tile').mousemove(function (e) {
        setWall($(this), e);
        grid.getWeights();
    });

    $('#btnAlgorithm').click(myAlert);
});

function AddNewColorOption(){
	if($('#color-options button').length > 8) // check to allow only 9 option elements
	return;

	var selectedColor = $('#color-pick').val();
	var dataNumber = $('#add-colors-number').val() || 1; // Use 1 if no number is selected

	//Append new color option button with info
	$('<button/>', {
		style: "background-color: " + selectedColor,
		class: "btn",
		'data-color' :selectedColor,
		'data-number' : dataNumber
	}).appendTo('#color-options');
	
	}							  
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

