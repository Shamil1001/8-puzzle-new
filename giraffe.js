// import { Image } from "./index.js";
let source;

let tiles = [];
let cols = 3;
let rows = 3;
let w, h;

let board = [];

function preload() {
  source = loadImage("./giraffe.webp");
}

function setup() {
  createCanvas(400, 400);

  // pixel dimensions of each tiles
  w = width / cols;
  h = height / rows;

  // Chop up source image into tiles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(source, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }

  // Remove the last tile
  tiles.pop();
  board.pop();
  // -1 means empty spot
  board.push(-1);

  // simpleShuffle(board);
}

// Swap two elements of an array
function swap(i, j, arr) {
  setTimeout(() => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }, 100);
}

// Pick a random spot to attempt a move
// This should be improved to select from only valid moves
function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  move(r1, r2, arr);
}

// Shuffle the board
function simpleShuffle(arr) {
  for (let i = 0; i < 30; i++) {
    randomMove(arr);
  }
}

let a = document.getElementById("shuffle-option");

let shuffleOption = 0;

a.addEventListener("change", () => {
  shuffleOption = a.options[a.value].textContent;
  // console.log(a.options[a.value].textContent)
});

let shuffleBtn = document.querySelector(".shuffle-btn");
shuffleBtn.addEventListener("click", () => {
  simpleShuffle(board);
  // console.log(board);
  // console.log(shuffleOption);
});

// Move based on click
function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  move(i, j, board);
  if (isSolved()) {
    console.log("SOLVED");
    // alert('YOU solve it')
  }
}

function draw() {
  background(199, 200, 201);
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);
  // console.log(blankCol)
  // Double check valid move
  // if (isNeighbor(i, j, blankCol, blankRow)) {
  // }
  // Draw the current board
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        let img = tiles[tileIndex].img;
        // if (isNeighbor(i, j, blankCol, blankRow)) {
        // }
        // tint(255,127)
        // noTint()
        let picture = image(img, x, y, w, h);
      }
    }
  }

  // Show it as grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(1);
      stroke("green");
      noFill();
      rect(x, y, w, h);
      // fill(255,200,255);
    }
  }
}

function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

// Swap two pieces
function move(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);
  // console.log(blankCol)
  // Double check valid move
  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

// Check if neighbor
function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }

  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}

function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) {
      // console.log(i);
      return i;
    }
  }
}
