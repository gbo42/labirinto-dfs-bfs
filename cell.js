function cell(i, j){
    this.i = i;
    this.j = j;

    this.visited = false;
    this.parent;
    this.walls = [true, true, true, true];

    this.highlight = function(color){
        noStroke();
        fill(color);
        ellipse(this.i*w+w/2, this.j*w+w/2, w, w);
    }

    this.track = function(color){
        noStroke();
        fill(color);
        ellipse(this.i*w+w/2, this.j*w+w/2, w/2);
    }

    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;
        stroke(wallcolor);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }
    }

    this.freeNeighbors = function(){
        var neighbors = [];

        var top    = grid[index(this.i, this.j-1)];
        var right  = grid[index(this.i+1, this.j)];
        var bottom = grid[index(this.i, this.j+1)];
        var left   = grid[index(this.i-1, this.j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if(neighbors.length > 0){
            r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.allNeighbors = function(){
        var neighbors = [];

        var top    = grid[index(this.i, this.j-1)];
        var right  = grid[index(this.i+1, this.j)];
        var bottom = grid[index(this.i, this.j+1)];
        var left   = grid[index(this.i-1, this.j)];

        if (top && !top.visited && !this.walls[0]) {
            neighbors.push(top);
        }
        if (right && !right.visited && !this.walls[1]) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited && !this.walls[2]) {
            neighbors.push(bottom);
        }
        if (left && !left.visited && !this.walls[3]) {
            neighbors.push(left);
        }

        return neighbors;
    }
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

function pathTo(current){
    stroke(pathcolor);
    strokeWeight(10);
    while(current.parent){
        line(current.i*w+w/2, current.j*w+w/2, current.parent.i*w+w/2, current.parent.j*w+w/2);
        current = current.parent;
    }
    strokeWeight(1);
}

function show(grid){
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}
