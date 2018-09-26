var current_color = 'black';

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').click(function () {
        $('#sidebar').toggleClass('active');
    });

    $('#color-pick').change(function () {
        current_color = $(this).val();
    });

    $('.tile').click(function () {
        setColor($(this));
    });

    $('#btnAlgorithm').click(myAlert);
});

function setColor(elem) {
    elem.css('backgroundColor', current_color);
}

function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}