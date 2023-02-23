const snake = {
    variablePlace: {
        pixel: "",
        drawboard: document.querySelector(".can-vas"),
    },
    //snake array
    snakeArr: [{
            x: 200,
            y: 200
        },
        {
            x: 190,
            y: 200
        },
        {
            x: 180,
            y: 200
        },
        {
            x: 170,
            y: 200
        },
        {
            x: 160,
            y: 200
        },
    ],
    //create place where snake will move
    createGrid: (drawGrid) => {
        for (let i = 0; i < drawGrid ** 2; i++) {
            snake.variablePlace.pixel = document.createElement('div');
            snake.variablePlace.pixel.classList.toggle('pixel');
            snake.variablePlace.drawboard.appendChild(snake.variablePlace.pixel);
        }
        snake.variablePlace.drawboard.style.gridTemplateColumns = `repeat(${drawGrid}, 1fr)`;
        snake.variablePlace.drawboard.style.gridTemplateRows = `repeat(${drawGrid}, 1fr)`;
    },
    //create a snake part
    drawSnakePart: (snkPart) => {
        snkPart.style.backgroundColor ="blue";
    },
    drawSnake: (arr) => {

    },
    game: () => {
        console.log("Game was called")
        snake.createGrid(21);
    }
}


//call main function
snake.game();





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