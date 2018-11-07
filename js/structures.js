function printList(path){
  var output = "[";
  for(var i = 0; i < path.length; ++i){
    output = output + " " + path[i];
  }
  output = output + "]\n";
  return output;
}

// Pair Class: Hold's a Color(key) - Weight(val) Pair defined by the user.
class Pair {
  constructor(key,val){
    this.key = key;
    this.val = val;
  }
  getKey(){
    return this.key;
  }
  getVal(){
    return this.val;
  }
}
//Holds a List of Key Value Pairs and Ways to Access Them
class Map {
  constructor(){
    this.map = []
  }
  getIndex(key){
    var index = -1;
    for(var i = 0; i < this.map.length; ++i){
      if(this.map[i].getKey() == key){
        index = i;
        break;
      }
    }
    return index;
  }
  getIndexByVal(val){
    var index = -1;
    for(var i = 0; i < this.map.length; ++i){
      if(this.map[i].getVal() == val){
        index = i;
        break;
      }
    }
    return index;
  }
  add(key,val){
    this.map.push(new Pair(key,val));
  }
  remove(key){
    var index = this.getIndex(key);
    if(index != -1){
      this.map.splice(index, 1);
    }
  }
  getVal(key){
    var index = this.getIndex(key);
    if(index != -1){
      return this.map[index].getVal();
    }
    return null;
  }
  getKey(val){
    var index = this.getIndexByVal(val);
    if(index != -1){
      return this.map[index].getKey();
    }
    return null;
  }
}
// Queue class: Gives an Interface for using a queue with an array implementation
class Queue{
  constructor(){
    this.list = [];
  }
  push(elem){
    this.list.push(elem);
  }
  pop(elem){
    this.list.splice(0, 1);
  }
  peak(){
    return this.list[0];
  }
  isEmpty(){
    return this.list.length == 0;
  }
  length(){
    return this.list.length
  }
  clear(){
    this.list = [];
  }
  printList(){
    return printPath(this.list);
  }
  printListDjikstra(dw){
    return printPathDjikstra(this.list,dw);
  }
}

function lessThan(a,b){
  return a < b;
}
class Priority_Queue extends Queue {
  constructor(comparator){
    super();
    if(comparator == null){
      this.compare = lessThan;
    }
    else {
      this.compare = comparator;
    }
  }
  findIndex(val){
    var index = 0;
    while(index < this.length()){
      if(this.compare(val,this.list[index])){
          return index;
      }
      ++index;
    }
    console.log("  index " + index);
    return index;
  }
  push(elem){
    var index = this.findIndex(elem);
    if(this.findIndex == this.length()){
      this.list.push(elem);
    } else {
      this.list.splice(index, 0, elem);
    }
  }
  // Use "NULL" to set back to lessThan
  setCompare(compare){
    if(compare == null){
      this.compare = lessThan;
    }
    this.compare = compare;
  }
}

// Stack class: Gives an Interface for using a stack with an array implementation
class Stack extends Queue {
  //See Queue class for Other Functions
  pop(elem){
    return this.list.pop();
  }
  peak(elem){
    return this.list[this.list.length-1];
  }
}
// getMatrix: returns a l x w array with all values initialized to initial_val
function getMatrix(length,width,initial_val){
  var matrix = [];
  for(var i = 0; i < length; ++i){
    var temparray = []
    for(var j = 0; j < width; ++j){
      temparray.push(initial_val);
    }
    matrix.push(temparray);
  }
  return matrix;
}
