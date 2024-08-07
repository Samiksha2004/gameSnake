

let canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');

let cellSize = 50 ; //height and width ka kaam krega for each cell
let boardHeight = 600 ; 
let boardWidth = 1000 ;

let snakeCells = [[0,0] ];   //0,0 se start ho rha -->  2d array(to store starting point of snake rectangle)
let direction = 'right' ;

let gameOver = 'false';  //wall se touch hone k baad true ho jaye

////////////khana bana rahe snake k lie
let foodCells = generateFood();   //bcoz we need 2 values e.g - x and y 

let score = 0 ;

//baar baar repeat

let intervalId = setInterval(function(){
    update();
    draw();
},200)


//keydown evet is triggered

document.addEventListener('keydown',function(event){
    if(event.key == 'ArrowDown'){direction = 'down'}
    else if(event.key == 'ArrowUp'){direction = 'Up'}
    else if(event.key == 'ArrowRight'){direction = 'right'}
    else{direction = 'left'}
})



//function to dram snake
function draw(){
    if(gameOver === true){
        clearInterval(intervalId) //it accepts an id jo setInterval bhej rha
        ctx.fillStyle = 'yellow';
        ctx.font = '50px monospace' ;
        ctx.fillText('GAME OVER !!',350,300)//jb wall se takrayega then game over show hoga to (interva yha set hua esly yha kra)
        return;
    }
    ctx.clearRect(0,0,boardWidth,boardHeight)
    for(let cell of snakeCells){
        ctx.fillStyle = 'red';
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize);  //x , y, height , width
        ctx.strokeStyle = 'orange';
        ctx.strokeRect(cell[0],cell[1],cellSize,cellSize);
    }
    //draw food
    ctx.fillStyle = 'green'
    ctx.fillRect(foodCells[0],foodCells[1],cellSize,cellSize)

    //draw score
    ctx.font = '24px monospace'
    ctx.fillText(`Score:${score}`,20,25);
}




//function to update snake
function update(){
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];

    // let newHeadX = headX + cellSize ;
    // let newHeadY = headY ;

    let newHeadX  ;
    let newHeadY ;

    if(direction === 'right'){
        newHeadX = headX + cellSize ;
        newHeadY = headY ;
        if(newHeadX === boardWidth || khagaykhudko(newHeadX,newHeadY)){gameOver = true}
    }
    else if(direction === 'left'){
        newHeadX = headX - cellSize ;
        newHeadY = headY ;
        if(newHeadX < 0 || khagaykhudko(newHeadX,newHeadY)){gameOver = true}
    }else if(direction === 'Up'){
       newHeadX = headX  ;
       newHeadY = headY - cellSize;
       if(newHeadY < 0 || khagaykhudko(newHeadX,newHeadY)){gameOver = true}
    }else{
        newHeadX = headX  ;
        newHeadY = headY + cellSize;
        if(newHeadY === boardHeight || khagaykhudko(newHeadX,newHeadY)){gameOver = true ;}
    }


    snakeCells.push([newHeadX , newHeadY]);  //array m push kr rhe 
    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        foodCells = generateFood(); //jb snake khana khaega to nya khana generate hoga or snake shift nh hoga to
        //mtlb vo bada hota jaega
        score += 1;
    }else{
    snakeCells.shift();   //piche se snake htta jaega esly remove krte jaa rhe
    }     //edhar ham tb shift kr rhe hain jab snake khana nh khaega
}


function generateFood(){
    return [
       Math.round((Math.random()*(boardWidth-cellSize))  / cellSize)*cellSize,
       Math.round((Math.random()*(boardHeight-cellSize))  / cellSize)*cellSize
    ]
}

function khagaykhudko(newHeadX,newHeadY){
    //loop
    for(let item of snakeCells){
        if(item[0] === newHeadX && item[1] === newHeadY){
            return true;
        }
    }
    return false ;

}