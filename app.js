const snake = {
    variablePlace: {
        pixel: "",
        drawboard: document.querySelector(".can-vas"),
        snakeSpeed: 500,
        gridSize: 21,
    },
    // snake array
    snakeArr: [
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
    ],
    //create grid where snake will move
    createGrid: (drawGrid) => {
        
        // for (let i = 0; i < drawGrid ** 2; i++) {
        //     snake.variablePlace.pixel = document.createElement('div');
        //     snake.variablePlace.pixel.classList.toggle('pixel');
        //     snake.variablePlace.drawboard.appendChild(snake.variablePlace.pixel);
        // }
        snake.variablePlace.drawboard.style.gridTemplateColumns = `repeat(${drawGrid}, 1fr)`;
        snake.variablePlace.drawboard.style.gridTemplateRows = `repeat(${drawGrid}, 1fr)`;
    },
    //create a snake 
    drawSnake: (arr) => {
        snake.snakeArr.forEach(element => {
            const snakePart = document.createElement('div');
            snakePart.style.gridRowStart = element.x;
            snakePart.style.gridColumnStart = element.y;
            snakePart.classList.add("snake");
            snake.variablePlace.drawboard.appendChild(snakePart);
        });
    },
    updateFrames() {

    },

    game: () => {
        setInterval(() => {
            console.log("render");
            // console.log("Game was called")
            // snake.createGrid(21);
            snake.drawSnake(snake.drawboard)
        }, snake.variablePlace.snakeSpeed);
    }
}


//call main function
snake.game();
snake.createGrid(snake.variablePlace.gridSize);




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