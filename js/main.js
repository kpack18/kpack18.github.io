/*** ADD DEPENDENCIES HERE ***/
var dependencies = {
    "js/grid.js": initGrid,
    "js/palette.js": initPalette
};

function loadDependencies() {
    for (let dep in dependencies) {
        if (dependencies.hasOwnProperty(dep)) {
            $.getScript(dep, function () {
                let d = dependencies[dep];
                if (typeof(d) === 'function') d();
            })
        }
    }
}

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

var grid = null;
var palette = null;

function initGrid() {
    grid = new Grid(3, 3);
}

function initPalette() {
    palette = new Palette();
}

// TODO: Change to using Tile and Palette
var old_crd = 0;
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

// Load dependencies once everything is defined, but before the document finishes loading
loadDependencies();