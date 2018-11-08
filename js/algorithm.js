var TIME_INIT = 50;
var TIME_INC = 50;
var ITER = 0;

// printPath: Returns a String Representation of a tile list, for testing purposes
function printPath(path){
  if(path == null || path.length == 0){
    return "[]";
  }
  var output = "[";
  for(var i = 0; i < path.length; ++i){
    output = output + " (" + path[i].getX() + "," + path[i].getY() + "),";
  }
  output = output + "]\n";
  return output;
}

function printPathDjikstra(path,dw){
  if(path == null || path.length == 0){
    return "[]";
  }
  var output = "[";
  for(var i = 0; i < path.length; ++i){
    output = output + " (" + path[i].getX() + "," + path[i].getY() + ") " + dw[path[i].getX()][path[i].getY()] + ",";
  }
  output = output + "]\n";
  return output;
}

function check_Iteration(current_iter){
  return current_iter == ITER;
}

function execute(start_tile,end_tile,algo){
  switch(algo){
    case "bfs": var bfs = new Bfs();
                return bfs.run(start_tile,end_tile);
    case "dfs": var dfs = new Dfs();
                return dfs.run(start_tile,end_tile);
    case "djikstra": var djikstra = new Djikstra();
                     return djikstra.run(start_tile,end_tile);
    case "astar": var astar = new AStar(start_tile,end_tile);
                  return astar.run(start_tile,end_tile);
    default: return [];
  }
}

// Algorithm Class: Houses the functions for running and calling algorithm's on the given grid.
class Algorithm{
  constructor(algo_type){
    this.visited_list = getMatrix(grid.getLength(),grid.getWidth(),false);
    this.previous_list = getMatrix(grid.getLength(),grid.getWidth(),null);

    this.weight_list = grid.getWeightList();
    this.timing_list = getMatrix(grid.getLength(),grid.getWidth(),0);

    this.time = TIME_INIT;

    this.tileList;
  }
  delay_Remove_Fade(tile,time,delay){
    time += TIME_INC;
    var current_iter = ITER;
    setTimeout(function() { var this_tile = tile; if(!check_Iteration(current_iter)){ return; }; this_tile.removeFade(); },time + delay);
    return time;
  }
  fail(start_tile,end_tile,time){
    var current_iter = ITER;
    setTimeout(function() { if(!check_Iteration(current_iter)){ return; } grid.blink_Fail(start_tile); },time + TIME_INC);
    setTimeout(function() { if(!check_Iteration(current_iter)){ return; } grid.blink_Fail(end_tile); },time + TIME_INC);
  }
  succeed(path,time){
    var current_iter = ITER;
    setTimeout(function() { if(!check_Iteration(current_iter)){ return; } grid.setPath(path); },time + TIME_INC);
  }
  generatePath(start_tile,end_tile){
    var shortest_path = [];
    var tile_pointer = end_tile;

    shortest_path.push(tile_pointer);

    if(this.previous_list[tile_pointer.getX()][tile_pointer.getY()] == null){
      this.fail(start_tile,end_tile,this.time);
      return [];
    }

    while(this.previous_list[tile_pointer.getX()][tile_pointer.getY()] != null){
      tile_pointer = this.previous_list[tile_pointer.getX()][tile_pointer.getY()];
      shortest_path.push(tile_pointer);
    }

    var shortest_path = shortest_path.reverse();
    this.succeed(shortest_path,this.time);

    return shortest_path;
  }
  checkNeighbor(neighbor,cur){ }
  checkAdjacent(cur){
    this.checkNeighbor(cur.getLeft(grid),cur);
    this.checkNeighbor(cur.getRight(grid),cur);
    this.checkNeighbor(cur.getUp(grid),cur);
    this.checkNeighbor(cur.getDown(grid),cur);
  }
  run(start_tile,end_tile){
    if(start_tile.getWeight() == 0 || end_tile.getWeight() == 0){
      this.fail(start_tile,end_tile);
      return;
    }

    if(start_tile.compare(end_tile)){
      var time = this.delay_Remove_Fade(start_tile,time,0);
      setTimeout(function() { grid.setPath([start_tile]); },time);
      return [start_tile];
    }

    this.visited_list[start_tile.getX()][start_tile.getY()] = true;
    start_tile.removeFade();

    grid.dimTiles();

    this.tileList.push(start_tile);

    while(!this.tileList.isEmpty()){
      var cur = this.tileList.peak();
      this.tileList.pop();

      if(this.weight_list[cur.getX()][cur.getY()] > 1){
        this.timing_list[cur.getX()][cur.getY()] = this.timing_list[cur.getX()][cur.getY()] + TIME_INC;
        --this.weight_list[cur.getX()][cur.getY()];
        this.tileList.push(cur);
      }
      else{
        this.time = this.delay_Remove_Fade(cur,this.time,this.timing_list[cur.getX()][cur.getY()]);
        if(cur.compare(end_tile)){
          break;
        }
        this.checkAdjacent(cur);
      }
    }
    return this.generatePath(start_tile,end_tile);
  }
}

class Bfs extends Algorithm{
  constructor(){
    super();
    this.tileList = new Queue();
  }
  checkNeighbor(neighbor,cur){
    if(neighbor != null && neighbor.getWeight() != 0 && this.visited_list[neighbor.getX()][neighbor.getY()] == false ){
      this.tileList.push(neighbor);
      this.visited_list[neighbor.getX()][neighbor.getY()] = true;
      this.previous_list[neighbor.getX()][neighbor.getY()] = cur;
    }
  }
}

class Dfs extends Algorithm{
  constructor(){
    super();
    this.tileList = new Stack();
  }
  checkNeighbor(neighbor,cur){
    if(neighbor != null && neighbor.getWeight() != 0 && this.visited_list[neighbor.getX()][neighbor.getY()] == false ){
      this.tileList.push(neighbor);
      this.previous_list[neighbor.getX()][neighbor.getY()] = cur;
    }
  }
  checkAdjacent(cur){
    this.visited_list[cur.getX()][cur.getY()] = true;
    this.checkNeighbor(cur.getDown(grid),cur);
    this.checkNeighbor(cur.getRight(grid),cur);
    this.checkNeighbor(cur.getUp(grid),cur);
    this.checkNeighbor(cur.getLeft(grid),cur);
  }
}

class Djikstra extends Algorithm{
  constructor(){
    super();
    this.dw = getMatrix(grid.getLength(),grid.getWidth(),0);
    var comparator = function(tileA,tileB) {
                        return this.dw[tileA.getX()][tileA.getY()] < this.dw[tileB.getX()][tileB.getY()];
                     };
    var comparator_eq = function(tileA,tileB) {
                        return tileA.getX() == tileB.getX() && tileA.getY() == tileB.getY();
                     };
    this.tileList = new Priority_Queue(this.comparator,this.compare_eq);
  }
  checkNeighbor(neighbor,cur){
    var cur_dw = this.dw[cur.getX()][cur.getY()];
    if(neighbor != null && neighbor.getWeight() != 0 && this.visited_list[neighbor.getX()][neighbor.getY()] == false ){
      this.dw[neighbor.getX()][neighbor.getY()] = cur_dw + this.weight_list[neighbor.getX()][neighbor.getY()];
      this.tileList.push(neighbor);
      this.visited_list[neighbor.getX()][neighbor.getY()] = true;
      this.previous_list[neighbor.getX()][neighbor.getY()] = cur;
    }
  }
}

class AStar extends Djikstra{
  hfunc(tileA,endtile){
      return Math.floor(Math.sqrt(Math.pow(tileA.getX() - endtile.getX(),2) + Math.pow(tileA.getY() - endtile.getY(),2)) * 10);
  }
  gfunc(tileA,prev_dw){
      return prev_dw + (10 * tileA.getWeight());
  }
  heuristic(tile,end,dw){
    return gfunc(tile,dw) + hfunc(tile,end);
  }
  constructor(start,end){
    super();
    this.end = end;
  }
  checkAdjacent(cur){
    this.visited_list[cur.getX()][cur.getY()] = true;
    this.checkNeighbor(cur.getLeft(grid),cur);
    this.checkNeighbor(cur.getRight(grid),cur);
    this.checkNeighbor(cur.getUp(grid),cur);
    this.checkNeighbor(cur.getDown(grid),cur);
  }
  checkNeighbor(neighbor,cur){
    if(neighbor != null && neighbor.getWeight() != 0 && this.visited_list[neighbor.getX()][neighbor.getY()] == false ){
      var prev_dw = this.dw[cur.getX()][cur.getY()];
      var new_dw = this.gfunc(neighbor,prev_dw) + this.hfunc(neighbor,this.end);
      if(this.dw[neighbor.getX()][neighbor.getY()] == 0 || this.dw[neighbor.getX()][neighbor.getY()] > new_dw){
        this.dw[neighbor.getX()][neighbor.getY()] = new_dw;
        this.previous_list[neighbor.getX()][neighbor.getY()] = cur;

        var index = this.tileList.findVal(neighbor);
        if(index = this.tileList.length()){
          this.tileList.push(neighbor);
        }
        else{
          this.tileList.remove(index);
          this.tileList.push(neighbor);
        }
      }
    }
  }
}
