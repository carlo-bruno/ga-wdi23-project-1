console.log("app.js connected");

const game = document.querySelector("#game");

const ROW = 20;
const COL = 10;
const SIZE = 20;

let colors = [""];

// create board
let board = [];
for (let r = 0; r < ROW; r++) {
  board.push(new Array(COL).fill(0));
}

console.log(board);

// show board to the DOM
board.forEach((row, i) => {
  let rowEl = document.createElement("div");
  rowEl.classList.add("row" + i);
  row.forEach((cell, i) => {
    let cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.classList.add(cell);
    // console.log(cellEl);
    rowEl.appendChild(cellEl);
  });
  // debugger;
  game.appendChild(rowEl);
});

// color each cell

//color matrix
