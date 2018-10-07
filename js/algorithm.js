var fade_Array = new Queue();

// printPath: Returns a String Representation of a tile list, for testing purposes
function printPath(path){
  var output = "[";
  for(var i = 0; i < path.length; ++i){
    output = output + " (" + path[i].getX() + "," + path[i].getY() + "),";
  }
  output = output + "]\n";
  return output;
}

// Algorithm Class: Houses the functions for running and calling algorithm's on the given grid.
class Algorithm{
  constructor(algo_type){
    this.algo = algo_type;
  }
  //Valid Types: "bfs = 0"
  set_Algo(algo_type,grid){
    this.algo = algo_type;
  }
  bfs(start_tile,end_tile,grid){
    var queue = new Queue();
    var visited_list = getMatrix(grid.getLength(),grid.getWidth(),false);
    var previous_list = getMatrix(grid.getLength(),grid.getWidth(),null);

    if(start_tile.compare(end_tile)){
      return [start_tile];
    }

    visited_list[start_tile.getX()][start_tile.getY()] = true;
    queue.push(start_tile);
    start_tile.removeFade();

    var time = 25;

    while(!queue.isEmpty()){
      var cur = queue.peak();
      queue.pop();

      var left = cur.getLeft(grid);
      if(left != null && left.getWeight() != 0 && visited_list[left.getX()][left.getY()] == false ){
        queue.push(left);
        visited_list[left.getX()][left.getY()] = true;
        previous_list[left.getX()][left.getY()] = cur;

        time += 50;
        fade_Array.push(left);
        setTimeout(function() { fade_Array.peak().removeFade(); fade_Array.pop(); },time);
        if(left.compare(end_tile)){
          break;
        }
      }
      var right = cur.getRight(grid);
      if(right != null && right.getWeight() != 0 && visited_list[right.getX()][right.getY()] == false){
        queue.push(right);
        visited_list[right.getX()][right.getY()] = true;
        previous_list[right.getX()][right.getY()] = cur;

        time += 50;
        fade_Array.push(right);
        setTimeout(function() { fade_Array.peak().removeFade(); fade_Array.pop(); },time);
        if(right.compare(end_tile)){
          break;
        }
      }
      var up = cur.getUp(grid);
      if(up != null && up.getWeight() != 0 && visited_list[up.getX()][up.getY()] == false){
        queue.push(up);
        visited_list[up.getX()][up.getY()] = true;
        previous_list[up.getX()][up.getY()] = cur;

        time += 50;
        fade_Array.push(up);
        setTimeout(function() { fade_Array.peak().removeFade(); fade_Array.pop(); },time);
        if(up.compare(end_tile)){
          break;
        }
      }
      var down = cur.getDown(grid);
      if(down != null && down.getWeight() != 0 && visited_list[down.getX()][down.getY()] == false){
        queue.push(down);
        visited_list[down.getX()][down.getY()] = true;
        previous_list[down.getX()][down.getY()] = cur;


        time += 50;
        fade_Array.push(down);
        setTimeout(function() { fade_Array.peak().removeFade(); fade_Array.pop(); },time);
        if(down.compare(end_tile)){
          break;
        }
      }
    }

    var shortest_path = [];
    var tile_pointer = end_tile;

    shortest_path.push(tile_pointer);

    if(previous_list[tile_pointer.getX()][tile_pointer.getY()] == null){
      return [];
    }

    while(previous_list[tile_pointer.getX()][tile_pointer.getY()] != null){
      tile_pointer = previous_list[tile_pointer.getX()][tile_pointer.getY()];
      shortest_path.push(tile_pointer);
    }

    var shortest_path = shortest_path.reverse();

    time += 50;
    setTimeout(function() { grid.setPath(shortest_path); },time);

    return shortest_path;
  }
  run(start_tile,end_tile,grid){
    grid.dimTiles();
    switch(this.algo){
      case "bfs": return this.bfs(start_tile,end_tile,grid);
      default: return [];
    }
  }
}
