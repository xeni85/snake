//variables

let drawboard = document.querySelector(".can-vas");
let snakeSpeed = 1000;
let gridSize = 15;
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
let gameOver = false;
let gameOverCounter = 0;
let player1 = {
    score: 0,
    winImg: "images/player1-wins.png"
}

let player2 = {
    score: 0,
    winImg: "images/player2-wins.png"
}
let playerOneTurn;
let changeTurns = false;
let continuePlaying = true;
let rounds = 0;


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

        // if(e.key === 'ArrowUp' && previousDirection.y !== 0) {
        //     console.log("Inside ArrowUp if Statement")
        //     snakeDirection = {
        //         x: 0,
        //         y: -1
        //     }
        // }
        switch (e.key) {
            case 'ArrowUp':
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
    snakePart.style.gridRowStart = snakeArr[0].x
    snakePart.style.gridColumnStart = snakeArr[0].y
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


const onSnake = (position, { ignoreHead = false } = {}) => {
    return snakeArr.some((part, index) => {
        if (ignoreHead && index === 0) return false
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

let food = randomFoodLocation()


//game over - check grid borderline or implosion
const borderHit = (position) => {
    return (
        position.x < 1 || position.x > gridSize ||
        position.y < 1 || position.y > gridSize
    )
}

const snakeHead = () => {
    return snakeArr[0];
}


const snakeImplosion = () => {
    return onSnake(snakeArr[0], { ignoreHead: true })

}

const resetVariables = () => {
    snakeArr = [{
        x: Math.ceil(gridSize / 2),
        y: Math.ceil(gridSize / 2),
    },]
}
const deaded = () => {
    if(gameOver = borderHit(snakeHead()) || snakeImplosion()) {
    changeTurns = !changeTurns;
    gameOverCounter++;
    compareScore()
    resetVariables();
    continuePlaying = false;
    //call changes inside deaded. make new function and setinterval
    }
}
//update food location
const updateFood = () => {
    if (onSnake(food)) {
        growSnake(growth)
        food = randomFoodLocation()
    }
}
const updateScore = () => {
    if (changeTurns === false) {
        document.getElementById("score1").innerHTML = `${snakeArr.length - 1}`;
        player1.score = snakeArr.length - 1;
    } else if (changeTurns === true) {
        document.getElementById("score2").innerHTML = `${snakeArr.length - 1}`;
        player2.score = snakeArr.length - 1;
    }
}

const switchPlayer = () => {
    gameOver = false;
    window.addEventListener("keydown", () => {
        continuePlaying = true;
       //call main function
    });
}

const compareScore = () => {
    if (gameOverCounter != 0 && gameOverCounter % 2 === 0) {
        let tempScore1 = player1.score
        let tempScore2 = player2.score
        rounds++
        player1.score = 0;
        player2.score = 0;
    }
}
//game function
const game = () => {

    setInterval(() => {
        if(gameOver) {
            if(gameOverCounter < 6) {
                switchPlayer()
            }
            else if(confirm("You lost. Press ok to restart")) {
                window.location = '/'
            }
            return
        }
        // for (let i = 0; i < arrLength - 1; i++) {
        //     snakeArr.splice(arrLength - 2, 2);

        // }
       if (continuePlaying === true) {
         deaded()
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
         updateScore();
       }
    }, snakeSpeed);
}


//landing page
document.getElementById("player1").addEventListener("click", () => {
    document.getElementById("player1").classList.add('clicked')
    document.getElementById("player2").classList.remove('clicked')
    playerOneTurn = true;
  });
document.getElementById("player2").addEventListener("click", () => {
    document.getElementById("player2").classList.add('clicked')
    document.getElementById("player1").classList.remove('clicked')
    playerOneTurn = false;
});

const grabValues = () => {
    document.querySelector(".begin-game").style.display = "none";
    gridSize = document.getElementById("grid-size").value 
    snakeSpeed = (snakeSpeed/document.getElementById("speed").value).toString()
}

const populateSections = () => {
    
    let scoreClasses = document.querySelectorAll(".scoreClass");
    scoreClasses.forEach((c)=> {
        c.style.display = "block";
    })
}

function beginGame() {
    if (playerOneTurn === undefined) {
        document.getElementById("alert").innerText = "Please choose number of players!";
    } else if (playerOneTurn === true) {
        grabValues();
        game();
    } else if (playerOneTurn === false) {
        grabValues();
        populateSections();
        game();
    }
}

document.getElementById("start").addEventListener("click", () => {
    beginGame()
   //call main function
});






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