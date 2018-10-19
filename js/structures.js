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
    this.queue = [];
  }
  push(elem){
    this.queue.push(elem);
  }
  pop(elem){
    this.queue.splice(0, 1);
  }
  peak(){
    return this.queue[0];
  }
  isEmpty(){
    return this.queue.length == 0;
  }
  length(){
    return this.queue.length
  }
  clear(){
    this.queue = [];
  }
  printQueue(){
    return printPath(this.queue);
  }
}

// Stack class: Gives an Interface for using a stack with an array implementation
class Stack{
  constructor(){
    this.stack = [];
  }
  push(elem){
    this.stack.push(elem);
  }
  pop(elem){
    return this.stack.pop();
  }
  peak(elem){
    return this.stack[this.stack.length-1];
  }
  isEmpty(){
    return this.stack.length == 0;
  }
  length(){
    return this.stack.length;
  }
  clear(){
    this.queue = [];
  }
  printStack(){
    return printPath(this.stack);
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
