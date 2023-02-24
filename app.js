
//variables

let drawboard = document.querySelector(".can-vas");
let snakeSpeed= 1000;
let gridSize = 21;


let snakeArr = 
    // snake array
    [
        {
            x: 11,
            y: 11,
            // x: Math.floor(snake.variablePlace.gridSize/2), 
            // y: Math.floor(snake.variablePlace.gridSize/2),
        }, 
        {
            x: 11,
            y: 10,
            // x: Math.floor(snake.variablePlace.gridSize/2) - 1, 
            // y: Math.floor(snake.variablePlace.gridSize/2),
        }, 
        {
            x: 11,
            y: 9,
            // x: Math.floor(snake.variablePlace.gridSize/2) - 2, 
            // y: Math.floor(snake.variablePlace.gridSize/2),
        }, 
        {
            x: 11,
            y: 8,
            // x: Math.floor(snake.variablePlace.gridSize/2) - 3, 
            // y: Math.floor(snake.variablePlace.gridSize/2),
        }, 
    ]


    //create grid where snake will move
    const createGrid = (drawGrid) => {
        
        // for (let i = 0; i < drawGrid ** 2; i++) {
        //     snake.variablePlace.pixel = document.createElement('div');
        //     snake.variablePlace.pixel.classList.toggle('pixel');
        //     snake.variablePlace.drawboard.appendChild(snake.variablePlace.pixel);
        // }
        drawboard.style.gridTemplateColumns = `repeat(${drawGrid}, 1fr)`;
        drawboard.style.gridTemplateRows = `repeat(${drawGrid}, 1fr)`;
    };


    //create a snake 
    const drawSnake = (arr) => {
        let i = 0;
            const snakePart = document.createElement('div')
            snakePart.style.gridRowStart = snakeArr[i].x
            snakePart.style.gridColumnStart = snakeArr[i].y
            snakePart.classList.add("snake")
            arr.appendChild(snakePart)
            i += 1;
            snakeArr.pop()
    }

    //simulate motion
    const updateFrames = () =>{
        snakeArr.unshift({...snakeArr[0]})
        snakeArr[0].x += 0
        snakeArr[0].y += 1
    }
    

    //game function
    const game = () => {
        setInterval(() => {
            createGrid(gridSize);
            drawSnake(drawboard);
            console.log(drawboard)
            console.log("render");
            // console.log("Game was called")
            // snake.createGrid(21);
            updateFrames();
        }, snakeSpeed);
    }


//call main function
game();





//-----------IN CASE OF CANVAS USE ----------
//create main function

// const main =()=> {

// }

// //create snake square
// const snakeSquare = new Path2D();
// snakeSquare.rect(10, 10, 50, 50);

// function drawSnakePart(snakePart) 
// {  
//   snakeboard_ctx.fillStyle = 'lightblue';  
//   snakeboard_ctx.strokestyle = 'darkblue';
//   snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
//   snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
// }

// /*Function that prints the parts*/
// function drawSnake() 
// {  
//   snake.forEach(drawSnakePart);
// }