tests = {
    "Test Algorithm": execute_test_Algorithm,
    "Test Grid": execute_test_Grid,
    "Test Save/Load": execute_test_SaveLoad
};

var i = 1;
var testIDs = {};
for (test in tests) {
    btn = $('<button>', {
        type: "btn",
        class: "btn btn-secondary text-left",
        'data-test': test
    });
    btn.html("<b>" + i + ":</b> " + test);
    btn.click(tests[test]);
    btn.appendTo('#tests');
    testIDs[i.toString()] = test;
    i++;
}

var modalVisible = false;
$(document).keypress(function (evt) {
    if (evt.key === 't' || evt.key === 'T') {
        modalVisible = true;
        $('#testModal').modal('show');
    }
});

$(document).keydown(function (evt) {
    if (modalVisible || $('#testModal').hasClass('show')) {
        if (testIDs[evt.key]) {
            tests[testIDs[evt.key]]();
            modalVisible = false;
            $('#testModal').modal('hide');
        }
        else if (evt.which == 27) {
            modalVisible = false;
            $('#testModal').modal('hide');
        }
    }
});

$('#testModal').on('shown.bs.modal', function (evt) {
    if (!modalVisible)
        $(this).modal('hide');
});

$('#testModal').on('hidden.bs.modal', function (evt) {
    if (modalVisible)
        $(this).modal('show');
});