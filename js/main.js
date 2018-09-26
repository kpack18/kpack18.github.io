var current_color = 'black';

$('#color-pick').change(function () {
    current_color = $(this).val();
});

$('.tile').click(function () {
    setColor($(this));
});

function setColor(elem) {
    elem.css('backgroundColor', current_color);
}


function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}