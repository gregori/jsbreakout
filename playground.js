let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// começar a desenhar
ctx.beginPath();
// na posição (20, 40) desenhe um quadrado
// de 50 x 50 px
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#ff0000"; // pinte de vermelho
ctx.fill(); // pinte o quadrado
ctx.closePath(); // termine o desenho

ctx.beginPath();
// no ponto (240, 160), com raio 20, ângulo inicial 0
// desenhe um círculo de 2PI radianos, sentido horário
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"
ctx.stroke();
ctx.closePath();