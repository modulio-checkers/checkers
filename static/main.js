let isDragging = false;
let currentChecker = "";
const invalid = [
  "white",
  "container",
  "active",
  "player1-info",
  "player2-info",
  "timer1",
  "player1",
  "timer2",
  "player2",
];
const valid = "black";
let thisPlayer;
let checkerNum = "";
const blackSquares = [
  0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41,
  43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63,
];
let boardBefore = [
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -1, 0, -1, 0, -1, 0, -1,
    -1, 0, -1, 0, -1, 0, -1, 0,
    0, -1, 0, -1, 0, -1, 0, -1
];
let turnHere;
let isQueen;

function serverReady() {
//   console.log("server ready");
  startGame();
//   console.log("local player:", localPlayer);
  if (localPlayer === 1) 
    document.querySelector(".board").classList.add("rotate");
}


function updateBoard(object) {
  let board = object.board;
  turnHere = object.turn;
//   console.log(board);
// console.log("turn:", object.turn);

  for (let x in board) {
    if (blackSquares.includes(Number(x))) {
      let thisChecker = document.querySelector(`.checker${Number(x) + 1}`);
      thisChecker.classList.remove("active");
      thisChecker.classList.remove("two");
      thisChecker.classList.remove("one");
      if (board[x] == 1) {
        thisChecker.classList.add("active");
        thisChecker.classList.add("one");
      }
      if (board[x] == -1) {
        thisChecker.classList.add("active");
        thisChecker.classList.add("two");
      }
      if (board[x] == 2) {
        thisChecker.classList.add("active");
        thisChecker.classList.add("one");
        thisChecker.classList.add("queen");
      }
      if (board[x] == -2) {
        thisChecker.classList.add("active");
        thisChecker.classList.add("two");
        thisChecker.classList.add("queen");
      }
    }
  }
}

function updateMetadata() {}

register_server_ready(serverReady);
register_update_board(updateBoard);
register_update_metadata(updateMetadata);

function oneMouseDown(elementUnderMouse, e) {
  thisPlayer = "one";
  checkerNum = Number(currentChecker.dataset.checker);
  elementUnderMouse.classList.remove("active");
  elementUnderMouse.classList.remove("one");
  elementUnderMouse.classList.remove("queen");
  isDragging = true;
  document.querySelector(
    ".container"
  ).innerHTML += `<div id="p1Checker"></div>`;
  const p1Checker = document.querySelector("#p1Checker");
  if(isQueen) p1Checker.style.filter = "brightness(50%)"
  p1Checker.style.top = `${e.clientY - 35}px`;
  p1Checker.style.left = `${e.clientX - 35}px`;
}
function twoMouseDown(elementUnderMouse, e) {
  thisPlayer = "two";
  checkerNum = Number(currentChecker.dataset.checker);
  elementUnderMouse.classList.remove("active");
  elementUnderMouse.classList.remove("two");
  elementUnderMouse.classList.remove("queen");
  isDragging = true;
  document.querySelector(
    ".container"
  ).innerHTML += `<div id="p2Checker"></div>`;
  const p2Checker = document.querySelector("#p2Checker");
  if(isQueen) p2Checker.style.filter = "brightness(50%)"
  p2Checker.style.top = `${e.clientY - 35}px`;
  p2Checker.style.left = `${e.clientX - 35}px`;
}
function oneMouseMove(e) {
  const p1Checker = document.querySelector("#p1Checker");
  p1Checker.style.top = `${e.clientY - 35}px`;
  p1Checker.style.left = `${e.clientX - 35}px`;
}
function twoMouseMove(e) {
  const p2Checker = document.querySelector("#p2Checker");
  p2Checker.style.top = `${e.clientY - 35}px`;
  p2Checker.style.left = `${e.clientX - 35}px`;
}

function startGame() {
  document.addEventListener("mousedown", (e) => {
    isDragging = false;
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    currentChecker = elementUnderMouse;
    if (elementUnderMouse.className.includes("active")) {
    if(elementUnderMouse.className.includes("queen")) isQueen = true;
    else isQueen = false
      if (localPlayer == 1 && turnHere == 1 && elementUnderMouse.className.includes("one")) {
        oneMouseDown(elementUnderMouse, e);
      } else if (localPlayer == 2 && turnHere == 2 && elementUnderMouse.className.includes("two")) {
        twoMouseDown(elementUnderMouse, e);
      }
    }
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      if (localPlayer == 1 && turnHere == 1 && thisPlayer == "one") {
        oneMouseMove(e);
      } else if (localPlayer == 2 && turnHere == 2 && thisPlayer == "two") {
        twoMouseMove(e);
      }
    }
  });
  document.addEventListener("mouseup", (e) => {
    isDragging = false;
    if (thisPlayer == "one") {
      document.querySelector("#p1Checker").remove();
    } else if (thisPlayer == "two") {
      document.querySelector("#p2Checker").remove();
    }
    else{
        return;
    }
    let elementUnderMouse = "";
    elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    let includes;
    if (elementUnderMouse !== null) {
      includes = elementUnderMouse.classList.value;
    }
    if(elementUnderMouse === null){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active");
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`);
    }
    else if(includes.includes(valid)){
        move(checkerNum - 1, elementUnderMouse.children[0].dataset.checker - 1);

    }
    else{
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active");
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`);
    }
  });
}
