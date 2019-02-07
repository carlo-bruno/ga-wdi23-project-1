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
      if (matrix === board) {
        drawCell(x + position.x, y + position.y, value);
      } else if (value !== 0) {
        drawCell(x + position.x, y + position.y, value);
      }
    });
  });
}

let piece = [[1, 1], [1, 1]]; // o - shape
let piece1 = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];
let piece2 = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];

let activePiece = {
  position: { x: 4, y: 7 },
  matrix: piece2
};

// remove on deploy
drawMatrix(board, { x: 0, y: 0 });
drawMatrix(activePiece.matrix, activePiece.position);

function movePiece(e) {
  // console.log(e.keyCode);
  // if left && position.x < 0, x--
  // else if right && pos.x > 9,x++
  switch (true) {
    case e.keyCode === 37:
      moveLeft();
      break;
    case e.keyCode === 39:
      moveRight();
      break;
    case e.keyCode === 40:
      moveDown();
      break;
    case e.keyCode === 38:
      rotatePiece();
      break;
  }
}

function moveLeft() {
  activePiece.position.x -= 1;
  if (collideCheck()) {
    activePiece.position.x += 1;
  }
}

function moveRight() {
  activePiece.position.x += 1;
  if (collideCheck()) {
    activePiece.position.x -= 1;
  }
}

function moveDown() {
  activePiece.position.y += 1;
  if (collideCheck()) {
    activePiece.position.y--;
    lockPiece();
  }
}

function rotatePiece() {
  let m = activePiece.matrix;
  let pX = activePiece.position.x;

  let kick = 1;
  activePiece.matrix = rotateMatrix();
  while (collideCheck()) {
    activePiece.position.x += kick;
    kick = -(kick % 2 == 0 ? kick - 1 : kick + 1);
    console.log(kick);
    if (Math.abs(kick) > m[0].length + 1) {
      console.log("cant rotate");
      activePiece.matrix = m;
      kick = 0;
      activePiece.position.x = pX;
      return;
    }
  }
}

// row of new matrix <- col of old matrix
function rotateMatrix() {
  let m = activePiece.matrix.reverse();
  let newMatrix = [];
  for (let i = 0; i < m.length; i++) {
    newMatrix.push([]);
    for (let j = 0; j < m.length; j++) {
      newMatrix[i].push(m[j][i]);
    }
  }

  // matrix rotation: https://medium.com/front-end-weekly/matrix-rotation-%EF%B8%8F-6550397f16ab
  return newMatrix;
}

function gameLoop() {
  moveDown();
  setInterval(() => {
    drawMatrix(board, { x: 0, y: 0 });
    drawMatrix(activePiece.matrix, activePiece.position);
  }, 60);
}

//! collision detection
//* returns boolean value
//* checks every cell of active piece
//* if cell !== 0, continue
//*   if next cell === walls, true
//*   if next cell === floor, true
//*   if next left cell !==0, true
//*   if next right cell !==, true
//* false

function collideCheck() {
  let m = activePiece.matrix;
  let p = activePiece.position;
  // collide now checks actual cell
  // if collision happens, revert move
  // this will also allow piece to slide on the floor before locking
  for (let r = 0; r < m.length; r++) {
    for (let c = 0; c < m[r].length; c++) {
      if (m[r][c] !== 0) {
        let newY = r + p.y; // y ( board row) to check
        let newX = c + p.x; // x (board col) to check

        if (newX < 0 || newX > 9 || newY > 19) {
          console.log("wall found");
          return true;
        }

        if (board[newY][newX] !== 0) {
          console.log("collision found");
          return true;
        }
      }
    }
  }
  return false;
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
  clearFullRow();
  resetPiece();
}

function clearFullRow() {
  let rowsToDelete = [];
  for (let r = 19; r > 0; r--) {
    // console.table(board[r]);
    if (!board[r].includes(0)) {
      console.log("full!!");
      console.log("row #", r);
      board.splice(r, 1);
      board.unshift(new Array(10).fill(0));
      r++; // after delete, repeat check of row;
    }
  }
}

function resetPiece() {
  activePiece = {
    position: { x: 5, y: 0 },
    matrix: piece1
  };
}

document.addEventListener("keydown", movePiece);
setInterval(gameLoop, 1000);
