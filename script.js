var grid = [];
var stack = [];
var queue;

var done;
var current
var next;

var w = 30;
var rows;
var cols;

var canvassize = 600;
var bgcolor = 'rgba(51,51,51,1)';
var pathcolor = 'rgba(100,255,100,1)';
var wallcolor = 'rgba(200,200,200,1)';
var highlightcolor = 'rgba(75,75,255,1)';
var trackcolor = 'rgba(200,200,255,1)';
function setup(){
    createCanvas(canvassize, canvassize);
    background(bgcolor);

    cols = floor(canvassize/w);
    rows = floor(canvassize/w);
    done = false;

    for(let j = 0; j < cols; j++){
        for(let i = 0; i < rows; i++){
            grid.push(new cell(i, j));
        }
    }

    queue = new Queue();
    queue.enqueue(grid[0]);
    goal = grid[index(cols-1,rows-1)];
    current = grid[0];
}

function draw(){
    background(bgcolor);
    show(grid);

    if(!done){
        current.highlight(highlightcolor);
        current.visited = true;
        next = current.freeNeighbors();

        for(let i = 0; i < stack.length; i++){
            stack[i].track(trackcolor);
        }
        if(next){
            removeWalls(current, next);
            stack.push(current);
            current = next;
        } else if(stack.length > 0){
            current = stack.pop();
        } else {
            done = true;
            for (let i = 1; i < grid.length; i++) {
                grid[i].visited = false;
            }
        }
    } else {
        if(!queue.isEmpty()){
            current = queue.dequeue();
            pathTo(current);
            var neighbors = current.allNeighbors();

            for(let i = 0; i < neighbors.length; i++){
                neighbors[i].visited = true;
                neighbors[i].parent = current;
                queue.enqueue(neighbors[i]);

                if(neighbors[i] == goal){
                    pathTo(neighbors[i]);
                    noLoop();
                }
            }
        }
    }
}
