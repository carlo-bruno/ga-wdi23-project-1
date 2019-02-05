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

// *@param matrix -> any grid, tetrominoes and board
// *@param position -> object x,y
// go through each row and column, change cells fill color to value
function drawMatrix(matrix, position) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      drawCell(x + position.x, y + position.y, value);
    });
  });
}

let piece = [[1, 1], [1, 1]]; // o - shape

let activePiece = {
  position: { x: 0, y: 10 },
  matrix: piece
};

drawMatrix(board, { x: 0, y: 0 });
drawMatrix(activePiece.matrix, activePiece.position);

function dropPiece() {
  activePiece.position.y += 1;
}

function gameLoop() {
  dropPiece();
  drawMatrix(board, { x: 0, y: 0 });
  drawMatrix(activePiece.matrix, activePiece.position);

  if (activePiece.position.y + activePiece.matrix.length === 20) {
    console.log("lock");
    lockPiece();
  }
}

// change the board[cell] value to matrix of active cell
function lockPiece() {
  activePiece.matrix.forEach(row => {
    // console.log(row);
    // console.log("col", activePiece.position.x);
    // console.log("row", activePiece.position.y);
    row.forEach(cell => {
      console.log(cell);
      board[activePiece.position.y][activePiece.position.x] = cell;
    });
  });
}

setInterval(gameLoop, 1000);
