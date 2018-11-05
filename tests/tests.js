tests = {
    "Test Algorithm": execute_test_Algorithm,
    "Test Djikstra": execute_test_Djikstra,
    "Test Grid": execute_test_Grid,
    "Test Resize": execute_test_Resize,
    "Test Save/Load": execute_test_SaveLoad,
    "Test Weights": execute_test_Weight
};

var i = 1;
var testIDs = {};
for (let test in tests) {
    btn = $('<button>', {
        type: "btn",
        class: "btn btn-secondary text-left",
    });
    btn.html("<b>" + i + ":</b> " + test);
    btn.click(function () {
        tests[test]();
        hideTestModal();
    });
    btn.appendTo('#tests');
    testIDs[i.toString()] = test;
    i++;
}

var modalVisible = false;
function showTestModal() {
    modalVisible = true;
    $('#testModal').modal('show');
}

function hideTestModal() {
    modalVisible = false;
    $('#testModal').modal('hide');
}

$(document).keypress(function (evt) {
    if (evt.key === 't' || evt.key === 'T') {
        showTestModal();
    }
});

$(document).keydown(function (evt) {
    if (modalVisible || $('#testModal').hasClass('show')) {
        if (testIDs[evt.key]) {
            tests[testIDs[evt.key]]();
            hideTestModal();
        }
        else if (evt.which == 27) {
            hideTestModal();
        }
    }
});

$('#testModal').on('shown.bs.modal', function (evt) {
    if (!modalVisible)
        $(this).modal('hide');
});

$('#testModal').on('hide.bs.modal', function (evt) {
    modalVisible = false;
});

$('#testModal').on('hidden.bs.modal', function (evt) {
    if (modalVisible)
        $(this).modal('show');
});
