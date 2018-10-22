var old_crd = 0;

var grid = new Grid(3,3);
var palette = new Palette();

var pBtnCount = 1;
var selectedPBtn;
$(document).ready(function () {
 //Script add color option
	$('#add-colors').click(function(){
		AddNewColorOption();
		palette.addBinding($('#add-colors-number').val() || 1);	
		var newButton = document.getElementById("color-options").lastChild;
		newButton.innerHTML = $(newButton).data('number');
	});

	//Set palate on click of color options
	$('#color-options').on('click','button',function(){
		selectedPBtn = $(this).data('place');
		palette.setPaint($(this).data('color'));		
	});

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
	if(selectedPBtn == 0 || selectedPBtn == 1) return;

	var selectedColor = $('#color-pick').val();
	var dataNumber = $('#add-colors-number').val() || 1; // Use 1 if no number is selected
	++pBtnCount;
	
	if($('#color-options button').length > 9) // check to allow only 10 elements, replace colors if at 10 elems
	{
	
		if(selectedPBtn!=null){
			$("[data-place='"+selectedPBtn+"']").remove(); 
			pBtnCount = selectedPBtn;
			selectedPBtn = null;
			}
		else return;
	}

	//Append new color option button with info
	$('<button/>', {
		style: "background-color: " + selectedColor,
		class: "pBtn",
		'data-color' :selectedColor,
		'data-number' : dataNumber,
		'data-place' : pBtnCount
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

