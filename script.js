let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// bolinha
let x;
let y;
let dx;
let dy;
let ballRadius = 10; // raio da bola

// barra
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX;
let paddleY = (canvas.height - paddleHeight) - 10;
let rightPressed = false;
let leftPressed = false;

// pedras
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// pontuação e vidas
let score = 0;
let lives = 3;

// inicializar os tijolos
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, visible: true };
  }
}

function setupBallAndPaddle() {
  x = canvas.width / 2; // inicial horizontal
  y = canvas.height - 35; // inicial vertical
  dx = 4; // variação horizontal
  dy = -4; // variação vertical;
  paddleX = (canvas.width - paddleWidth) / 2;
}

setupBallAndPaddle();

function brickCollisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let brick = bricks[c][r];

      if (brick.visible) {
        if (brick.x < x && x < brick.x + brickWidth && brick.y < y && y < brick.y + brickHeight) {
          // colidiu
          dy = -dy;
          brick.visible = false;
          score++;
          if (score == brickRowCount * brickColumnCount) { // se for a pontuação máxima
            alert("Você venceu! Parabéns!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Pontuação: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Vidas: " + lives, canvas.width - 65, 20);
}

function drawBrick(brickX, brickY) {
  ctx.beginPath();
  ctx.rect(brickX, brickY, brickWidth, brickHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].visible) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        drawBrick(brickX, brickY);
      }
    }
  }
}

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
  brickCollisionDetection();
  drawScore();
  drawLives();
  drawBricks();
  // verifica se a bola sai na horizontal
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // inverte o sinal de dx
  }
  // verifica se a bola sai na vertical
  if (y + dy < ballRadius ||
    x > paddleX && x < paddleX + paddleWidth && // entre a barra (eixo x)
    y + ballRadius >= paddleY) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    lives--; // perde uma vida
    if (lives == 0) {
      alert("Game Over!");
      document.location.reload();
    } else { // reseta o estado da bola e da barra - jogador morreu!
      setupBallAndPaddle();
    }
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

  requestAnimationFrame(draw);
}

draw();

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

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// adiciona eventos de controle para o teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
