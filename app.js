//variables

let drawboard = document.querySelector(".can-vas");
let snakeSpeed = 500;
let gridSize = 21;
let arrLength;
let counter = 0;
let snakeDirection = {
    x: 0,
    y: 0
}
let previousDirection = {
    x: 0,
    y: 0
}
const growth = 1;
let newSnakePart = 0;
let snakeArr =
    // snake array
    [{
        //     // x: 11,
        //     // y: 8,
        //     x: Math.floor(gridSize / 2),
        //     y: Math.ceil(gridSize / 2) - 3,
        // },
        // {
        //     // x: 11,
        //     // y: 9,
        //     x: Math.floor(gridSize / 2),
        //     y: Math.ceil(gridSize / 2) - 2,
        // },
        // {
        //     // x: 11,
        //     // y: 10,
        //     x: Math.floor(gridSize / 2),
        //     y: Math.ceil(gridSize / 2) - 1,
        // },
        // {
        // x: 11,
        // y: 11,
        x: Math.ceil(gridSize / 2),
        y: Math.ceil(gridSize / 2),
    }, ]


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
    snakeArr.forEach(element => {
        const snakePart = document.createElement('div')
        snakePart.style.gridRowStart = element.x
        snakePart.style.gridColumnStart = element.y
        snakePart.classList.add("snake")
        arr.appendChild(snakePart)
    });

}



//update snake direction
const moveSnake = () => {
    window.addEventListener('keydown', e => {
        console.log(e)

        // if(e.key === 'ArrowUp' && previousDirection.y !== 0) {
        //     console.log("Inside ArrowUp if Statement")
        //     snakeDirection = {
        //         x: 0,
        //         y: -1
        //     }
        // }
        switch (e.key) {
            case 'ArrowUp':
                console.log("clicked up")
                if (previousDirection.x !== 0) break
                snakeDirection.x = -1
                snakeDirection.y = 0
                break;
            case 'ArrowDown':
                if (previousDirection.x !== 0) break
                snakeDirection = {
                    x: 1,
                    y: 0
                }
                break;
            case 'ArrowLeft':
                if (previousDirection.y !== 0) break
                snakeDirection = {
                    x: 0,
                    y: -1
                }
                break;
            case 'ArrowRight':
                if (previousDirection.y !== 0) break
                snakeDirection = {
                    x: 0,
                    y: 1
                }
                break;
        }
    })
    previousDirection = snakeDirection
    return snakeDirection
}

//simulate motion
const updateFrames = () => {
    addParts()
    let direction = moveSnake();
    const snakePart = document.createElement('div')
    snakePart.style.gridRowStart = snakeArr[counter].x
    snakePart.style.gridColumnStart = snakeArr[counter].y
    snakePart.classList.add("snake")
    drawboard.appendChild(snakePart)
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {
            ...snakeArr[i]
        }
    }

    snakeArr[0].x += direction.x
    snakeArr[0].y += direction.y

    // snakeArr.push({
    //     ...snakeArr[0]
    // });
    // snakeArr.splice(0, 1);
}
// console.log("this is the length" + arrLength)

//create food
const drawFood = (arr) => {
    const foodPart = document.createElement('div')
    foodPart.style.gridRowStart = food.x
    foodPart.style.gridColumnStart = food.y
    foodPart.classList.add("food")
    arr.appendChild(foodPart)
}

//compare part positions
const eqPositions = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y
}


const onSnake = (position) => {
    return snakeArr.some(part => {
        return eqPositions(part, position)
    })
}
//lengthen the snake
const growSnake = (element) => {
    newSnakePart += element
}

const addParts = () => {
    for (let i = 0; i < newSnakePart; i++) {
        snakeArr.push({
            ...snakeArr[snakeArr.length - 1]
        })
    }
    newSnakePart = 0
}
//create random food location
const randomGridPosition = () => {
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

const randomFoodLocation = () => {
    let newPosition
    while(newPosition == null || onSnake(newPosition)) {
        newPosition = randomGridPosition()
    }
    return newPosition
}


//update food location
const updateFood = () => {
    if (onSnake(food)) {
        growSnake(growth)
        food = randomFoodLocation()
    }
}

let food = randomFoodLocation()
//game function
const game = () => {

    setInterval(() => {
        // for (let i = 0; i < arrLength - 1; i++) {
        //     snakeArr.splice(arrLength - 2, 2);

        // }
        drawboard.innerHTML = ''
        createGrid(gridSize);
        // console.log("Game was called")
        // snake.createGrid(21);
        drawSnake(drawboard)
        drawFood(drawboard)
        updateFrames();
        updateFood()
        // if (snakeArr.length >= 5) {
        //     snakeArr = snakeArr.splice(-1);
        // }
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