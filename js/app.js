console.log("app.js connected");

const game = document.querySelector("#game");
const ctx = game.getContext("2d");

const colors = ["#bbb", "red"];

const ROW = 20;
const COL = 10;
const SIZE = 20;

// create board
let board = [];
for (let r = 0; r < ROW; r++) {
  board.push(new Array(COL).fill(0));
}

// draw indivitual cell
function drawCell(x, y, value) {
  ctx.fillStyle = colors[value];
  ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);

  ctx.strokeStyle = "#ddd";
  ctx.strokeRect(x * SIZE, y * SIZE, SIZE, SIZE);
}

let piece = [[0, 0, 0], [1, 1, 1], [0, 1, 0]]; // t - shape

// * @param matrix -> any grid, tetrominoes and board
// go through each row and column, change cells fill color to value
function drawMatrix(matrix, position) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      drawCell(x + position.x, y + position.y, value);
    });
  });
}

drawMatrix(board, { x: 0, y: 0 });
drawMatrix(piece, { x: 5, y: 3 });
