/* Palette Class: Hold's the current paint color and data structures
                 for user defined color weights */
class Palette {
    constructor() {
        /* vars: paint_color: The current color of the brush.
                              When a tile is clicked it'll change to current color */
        this.paint_color = 'black';
    }
    /* setPaint: (PARAM) color: new color of the Brush
        : set's the color of the brush to "color" */
    setPaint(color) {
        this.paint_color = color;
    }
    // getPaint: Returns the current color of the brush
    getPaint() {
        return this.paint_color;
    }
}