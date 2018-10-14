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
    });

    $('.tile').mousemove(function (e) {
        setWall($(this), e);
    });

    $('#btnAlgorithm').click(myAlert);
});

var old_crd = 0;

let grid = new Grid(3,3);
var palette = new Palette();
var apply_button = document.getElementById("apply_btn");
apply_button.addEventListener("click", createGrid);

function setWall(elem, e) {
    var curr_crd = elem[0].getBoundingClientRect().top + window.scrollY + elem[0].getBoundingClientRect().right;
	if(e.which == 1 && old_crd != curr_crd){
		old_crd = curr_crd;
        setColor(elem);
	}
 }

/*

 This function resizes the grid. It does this by first removing every single row from the table which is the tile container
 before recreating a brand new grid of dimension m x n. After grid recreation the click and mouseover events are readded to 
 the tile class.

 Potential revisement changing the JS code in to Jquery, also can optimize by looking into cell by cell appending and romval 
 instead of full row removal.

*/
function createGrid(){
    var grid_width = document.getElementById("grid-width").value;
    var grid_height = document.getElementById("grid-height").value;
    if(grid_height == 0 || grid_width == 0){
        return;
    }
    else{
        var table = document.getElementById("grid");
        var grid_rows = table.rows.length;
        while(grid_rows > 0){
            table.deleteRow(0);
            --grid_rows;
        }
        
        grid = new Grid(grid_width, grid_height);
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
