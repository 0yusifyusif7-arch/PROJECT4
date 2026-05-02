const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

const box = 20;
let snake;
let food;
let direction;
let score;
let game;

function startGame() {
  snake = [{ x: 200, y: 200 }];
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
  direction = "RIGHT";
  score = 0;
  scoreText.textContent = score;

  clearInterval(game);
  game = setInterval(drawGame, 120);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}

function drawGame() {
  ctx.fillStyle = "#0D1B2A";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#FFB703" : "#E0E1DD";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#0077B6";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  if (headX === food.x && headY === food.y) {
    score++;
    scoreText.textContent = score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    return;
  }

  snake.unshift(newHead);
}

function collision(head, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  startGame();
}

startGame();