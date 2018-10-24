var running = false;
$(document).ready(function () {
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
      ++ITER;
      if(running){

        var elem = this;
        $(this).prop('disabled', true);
        setTimeout(function() { $(elem).prop('disabled', false); },250);
        $(this).html("Algorithm");
        $(this).css("background-color","#4285f4");

        running = false;
        grid.lightTiles();
        grid.clearPaths();
        return;
      }
      else{
        running = true;
        $(this).html("Stop");
        $(this).css("background-color","#ff4242");

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
        //grid.getWeights();
    });

    $('#btnAlgorithm').click(myAlert);

    $('#apply_btn').click(function () {
        let grid_width = document.getElementById("grid-width").value;
        let grid_height = document.getElementById("grid-height").value;
        grid_width = Number(grid_width);
        grid_height = Number(grid_height);
        resizeGrid(grid_width, grid_height);
    });

    $('.alert .close').click(function (evt) {
        $(evt.target).parent().fadeOut("slow", function () {
            $(evt.target).parent().hide();
        });
    });
});

var old_crd = 0;
let grid = new Grid(8,8);
var palette = new Palette();
var pBtnCount = 1;
var selectedPBtn;

function AddNewColorOption(){

	var selectedColor = $('#color-pick').val();
	var dataNumber = $('#add-colors-number').val() || 1; // Use 1 if no number is selected
	if(dataNumber > 9 || dataNumber < 0){
		alert("You must enter a number between 0 & 9!");
		return;
	}
	dataNumber = Math.floor(dataNumber);
	++pBtnCount;

	if($('#color-options button').length > 9) // check to allow only 10 elements, replace colors if at 10 elems
	{
		if(selectedPBtn == 0 || selectedPBtn == 1) return;
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

    if(width % 1 != 0){
        width = Math.floor(width);
    }
    if(height % 1 != 0){
        height = Math.floor(height);
    }
    if(height == 0 || width == 0 || height < 0 || width < 0){
        return;
    }
    if(width == grid.getWidth() && height == grid.getLength()){
        return;
    }
    if(total > 10000){
        return;
    }
    else{
        switch (true){
            case (total >= 5000):
                document.documentElement.style.setProperty("--size", "25px");
                total_width = (width * 25) + (1 * width);
                total_height = (height * 25) + (1 * height);
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

/*--------------------------------------------- end of resizing functions ------------------------------------------------*/

function setColor(elem) {
    elem.css('backgroundColor', palette.getPaint());
}

function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}

function error(message) {
    $('#alertError .message').text(message);
    $('#alertSuccess').hide();
    $('#alertError').fadeIn("slow");
}

function success(message) {
    $('#alertSuccess .message').text(message);
    $('#alertError').hide();
    $('#alertSuccess').fadeIn("slow");
}