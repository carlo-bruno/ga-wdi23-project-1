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

//test
// board[19][0] = 1;
// board[19][1] = 1;
// board[19][3] = 1;
// board[19][4] = 1;

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
let piece2 = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];

let activePiece = {
  position: { x: 5, y: 0 },
  matrix: piece
};

// remove on deploy
drawMatrix(board, { x: 0, y: 0 });
drawMatrix(activePiece.matrix, activePiece.position);

function dropPiece() {
  activePiece.position.y += 1;
}

function gameLoop() {
  dropPiece();
  drawMatrix(board, { x: 0, y: 0 });
  drawMatrix(activePiece.matrix, activePiece.position);

  if (activePiece.position.y + activePiece.matrix.length === ROW) {
    console.log("lock");
    lockPiece();
    resetPiece();
  }
  collideBottom();
}
// if activePiece matrix-bottom + 1 !==0
// lock on top of that piece

function collideBottom() {
  let newX;
  let newY = activePiece.position.y + activePiece.matrix.length; // looking one row below;

  // console.log(
  //   "row number: ",
  //   activePiece.position.y + activePiece.matrix.length
  // );
  // console.log(
  //   board[activePiece.position.y + activePiece.matrix.length]
  // ); // new y
  activePiece.matrix[activePiece.matrix.length - 1].forEach(
    (cell, c) => {
      if (cell !== 0) {
        newX = c + activePiece.position.x; // col to check rel to the board
      }
    }
  );

  if (board[newY][newX] !== 0) {
    console.log("stack");
    lockPiece();
    resetPiece();
  }
}

// change the board[cell] value to matrix of active cell
function lockPiece() {
  activePiece.matrix.forEach((row, r) => {
    // console.log(row);
    // console.log(r); // iterator for rows;
    // console.log("col", activePiece.position.x);
    // console.log("row", activePiece.position.y);
    row.forEach((cell, c) => {
      // console.log(cell);
      if (cell !== 0) {
        board[r + activePiece.position.y][
          c + activePiece.position.x
        ] = cell;
      }
    });
  });
}

function resetPiece() {
  activePiece = {
    position: { x: 5, y: 0 },
    matrix: piece
  };
}

// setInterval(gameLoop, 1000);
