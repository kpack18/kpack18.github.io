var alwaysUseJsColor = false;

/**
 * Determine if the current browser has support for HTML5 input type of color.
 * @author Matthew Toledo
 * @return {boolean} True if color input type supported. False if not.
 */
function supportsColorInput() {
    var colorInput;

    // NOTE:
    //
    // If the browser is capable of displaying a color picker, it will sanitize the color value first. So "!"" becomes #000000;
    //
    // Taken directly from modernizr:
    // @see http://modernizr.com/docs/#features-html5
    //
    // These types can enable native datepickers, colorpickers, URL validation, and so on.
    // If a browser doesn’t support a given type, it will be rendered as a text field. Modernizr
    // cannot detect that date inputs create a datepicker, the color input create a colorpicker,
    // and so on—it will detect that the input values are sanitized based on the spec. In the
    // case of WebKit, we have received confirmation that sanitization will not be added without
    // the UI widgets being in place.
    colorInput = $('<input type="color" value="!" />')[0];
    return colorInput.type === 'color' && colorInput.value !== '!';
};

if (alwaysUseJsColor || !supportsColorInput()) {
    // Conditionally request and use JSColor alternative
    document.writeln('<script src="https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js"></script>');
    $("input[type='color']").each(function () {
        var id = $(this).attr('id');
        var newTag = $('<input/>', {
            type: "button",
            class: "jscolor noText",
            style: "width:35px; height:35px",
            id: id
        });

        $(this).replaceWith(newTag);
    });
}