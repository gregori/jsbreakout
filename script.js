let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2; // inicial horizontal
let y = canvas.height - 35; // inicial vertical
let dx = 2; // variação horizontal
let dy = -2; // variação vertical;
let ballRadius = 10; // raio da bola

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - paddleHeight) - 10;
let rightPressed = false;
let leftPressed = false;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  // verifica se a bola sai na horizontal
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // inverte o sinal de dx
  }
  // verifica se a bola sai na vertical
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (x > paddleX && x < paddleX + paddleY &&
    y + ballRadius >= paddleY) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    alert("Game Over!");
    document.location.reload();
    clearInterval(interval);
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
}
let interval = setInterval(draw, 10);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// adiciona eventos de controle para o teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
