/* Palette Class: Hold's the current paint color and data structures
                 for user defined color weights */
class Palette {
  constructor(){
/* vars: paint_color: The current color of the brush.
                      When a tile is clicked it'll change to current color */
    this.paint_color = "#000000";

    this.weight_list = new Map();
    this.weight_list.add("#000000",0);
    this.weight_list.add("#ffffff",1);
    this.weight_list.add("#28a745",-1);
    this.weight_list.add("#dc3545", -2)
    //this.weight_list.add("rgb(0, 255, 128)",2);
  }
/* setPaint: (PARAM) color: new color of the Brush
    : set's the color of the brush to "color" */
  setPaint(color){
    this.paint_color = color;
    console.log("Color set to: " + color);
  }
// getPaint: Returns the current color of the brush
  getPaint(){
    return this.paint_color;
  }
  addBinding(weight){
    var w = weight;
    if (typeof weight === 'string' || weight instanceof String){
      w = parseInt(weight, 10);
    }
    this.weight_list.add(this.paint_color,w);
	   console.log(this.paint_color + " bounded to a weight of " + w);
  }
  removeBinding(color){
    this.weight_list.remove(color);
  }
  get_Bound_Weight(key){
    return this.weight_list.getVal(key);
  }
  get_Bound_Color(val){
    return this.weight_list.getKey(val);
    }
  printPalette() {
    var output = "[";
    for (var i = 0; i < this.weight_list.map.length; ++i) {
      output = output + " (" + this.weight_list.map[i].key + ", " + this.weight_list.map[i].val + "),";
    }
    output = output + "]";

    return output;
  }
  rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
}
function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}
