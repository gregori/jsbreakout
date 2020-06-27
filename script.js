let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2; // inicial horizontal
let y = canvas.height - 30; // inicial vertical
let dx = 2; // variação horizontal
let dy = -2; // variação vertical;
let ballRadius = 10; // raio da bola


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
  // verifica se a bola sai na horizontal
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // inverte o sinal de dx
  }
  // verifica se a bola sai na vertical
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}
setInterval(draw, 10);
