var current_color = 'black';
var old_crd = 0;
var saveModal = document.getElementById("saveModalPopup");
var saveButton = document.getElementById("saveButton");
var closeSaveModalBtn = document.getElementsByClassName("save-modal-closeBtn")[0];

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

    $('.tile').mousemove(function (e) {
        setWall($(this), e);
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
    elem.css('backgroundColor', current_color);
}

function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}

//Setting save button popup's event listeners
saveButton.addEventListener("click", save);
closeSaveModalBtn.addEventListener("click", closeSaveModal);

function save(){
    saveModal.style.display = "block";
}

function closeSaveModal(){
    saveModal.style.display = "none";
}