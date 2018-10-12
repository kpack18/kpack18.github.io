/* Palette Class: Hold's the current paint color and data structures
                 for user defined color weights */
class Palette {
  constructor(){
/* vars: paint_color: The current color of the brush.
                      When a tile is clicked it'll change to current color */
    this.paint_color = "rgb(0, 0, 0)";

    this.weight_list = new Map();
    this.weight_list.add("rgb(0, 0, 0)",0);
    this.weight_list.add("rgb(255, 255, 255)",1);
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
    this.weight_list.add(this.paint_color,weight);
	console.log(this.paint_color + " bounded to a weight of " +weight);
	console.log(this.weight_list.getKey(weight));
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
}
