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
let available = [];
let thisPlayer;
let checkerNum = "";
const blackSquares = [
  0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41,
  43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63,
];
let boardBefore = [1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -1, 0, -1, 0, -1, 0, -1,
    -1, 0, -1, 0, -1, 0, -1, 0,
    0, -1, 0, -1, 0, -1, 0, -1];

function serverReady() {
  console.log("server ready");
  startGame();
  console.log("local player:", localPlayer);
  if (localPlayer === 1) {
    document.querySelector(".board").classList.add("rotate");
    // document.querySelector(".pp").classList.add("rotatepp");
    // document.querySelector(".pp").classList.add("rotate");
  }
}

turn = localPlayer + 1;

function updateBoard(object) {
  let board = object.board;
  console.log(board);
  if(boardBefore != board)
    turn+=2;
console.log("turn:", turn);

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
    //   if (board[x] == 2) {
    //     thisChecker.classList.add("active");
    //     thisChecker.classList.add("onequeen");
    //   }
    //   if (board[x] == -2) {
    //     thisChecker.classList.add("active");
    //     thisChecker.classList.add("twoqueen");
    //   }
    }
  }
  boardBefore = board;
}

function updateMetadata() {}

register_server_ready(serverReady);
register_update_board(updateBoard);
register_update_metadata(updateMetadata);

function availableNumbers(checkerNum) {
  if (checkerNum == 1) {
    available = [document.querySelector(".square10")];
  } else if (checkerNum == 64) {
    available = [document.querySelector(".square55")];
  } else if (checkerNum == 3 || checkerNum == 5 || checkerNum == 7) {
    available = [
      document.querySelector(".square" + (checkerNum + 7)),
      document.querySelector(".square" + (checkerNum + 9)),
    ];
  } else if (checkerNum == 58 || checkerNum == 60 || checkerNum == 62) {
    available = [
      document.querySelector(".square" + (checkerNum - 7)),
      document.querySelector(".square" + (checkerNum - 9)),
    ];
  } else if (checkerNum == 16 || checkerNum == 32 || checkerNum == 48) {
    available = [
      document.querySelector(".square" + (checkerNum - 9)),
      document.querySelector(".square" + (checkerNum + 7)),
    ];
  } else if (checkerNum == 17 || checkerNum == 33 || checkerNum == 49) {
    available = [
      document.querySelector(".square" + (checkerNum - 7)),
      document.querySelector(".square" + (checkerNum + 9)),
    ];
  } else {
    available = [
      document.querySelector(".square" + (checkerNum - 9)),
      document.querySelector(".square" + (checkerNum - 7)),
      document.querySelector(".square" + (checkerNum + 7)),
      document.querySelector(".square" + (checkerNum + 9)),
    ];
  }
}
//pakeist, kad veiktu su grid system
function oneMouseDown(elementUnderMouse, e) {
  thisPlayer = "one";
  checkerNum = Number(currentChecker.dataset.checker);
//   availableNumbers(checkerNum);
//   for (let x in available) {
//     available[x].classList.add("orange");
//   }
  elementUnderMouse.classList.remove("active");
  elementUnderMouse.classList.remove("one");
  isDragging = true;
  document.querySelector(
    ".container"
  ).innerHTML += `<div id="p1Checker"></div>`;
  const p1Checker = document.querySelector("#p1Checker");
  p1Checker.style.top = `${e.clientY - 35}px`;
  p1Checker.style.left = `${e.clientX - 35}px`;
}
function twoMouseDown(elementUnderMouse, e) {
  thisPlayer = "two";
  checkerNum = Number(currentChecker.dataset.checker);
//   availableNumbers(checkerNum);
//   for (let x in available) {
//     available[x].classList.add("orange");
//   }
  elementUnderMouse.classList.remove("active");
  elementUnderMouse.classList.remove("two");
  isDragging = true;
  document.querySelector(
    ".container"
  ).innerHTML += `<div id="p2Checker"></div>`;
  const p2Checker = document.querySelector("#p2Checker");
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
      available.length = 0;
      if (turn % 2 == 0 && elementUnderMouse.className.includes("one")) {
        oneMouseDown(elementUnderMouse, e);
      } else if (turn % 2 == 1 && elementUnderMouse.className.includes("two")) {
        twoMouseDown(elementUnderMouse, e);
      }
    }
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      if (turn % 2 == 0 && thisPlayer == "one") {
        oneMouseMove(e);
      } else if (turn % 2 == 1 && thisPlayer == "two") {
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
    // if(document.elementFromPoint(e.clientX, e.clientY).classList.value.includes("square"))
    let elementUnderMouse = "";
    elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    let includes;
    console.log(elementUnderMouse);
    if (elementUnderMouse !== null) {
      includes = elementUnderMouse.classList.value;
    }
    // console.log(includes, includes.includes(valid));
    if(elementUnderMouse === null){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active");
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`);
        // updateBoard(object);
    }
    else if(includes.includes(valid)){
        // turn += 2;
        move(checkerNum - 1, elementUnderMouse.children[0].dataset.checker - 1);

    }
    else{
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active");
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`);
    }
  });
}
