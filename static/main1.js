let isDragging = false;
let currentChecker = '';
const invalid = ["white", "container", "active", "player1-info", "player2-info", "timer1", "player1", "timer2", "player2"];
const valid = ["black", "orange"];
let thisPlayer;
let checkerNum='';
const allSquares = document.querySelectorAll(".square");
const allCheckers = document.querySelectorAll(".checker");
const startBoard = [1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, -1, 0, -1, 0, -1, 0, -1,
    -1, 0, -1, 0, -1, 0, -1, 0,
    0, -1, 0, -1, 0, -1, 0, -1];

function serverReady(){
    console.log("server ready");
    startGame();
    console.log("local player:", localPlayer);
    if(localPlayer === 1){
        document.querySelector(".board").classList.add("rotate");
    }
}

function updateBoard(object){
    let board = object.board; 
    console.log(board);
    console.log("turn:", turn);

    for(let x in board){
    }
}

function updateMetadata(){

}


register_server_ready(serverReady);
register_update_board(updateBoard);
register_update_metadata(updateMetadata);

document.addEventListener('mousedown', e => {
    isDragging = false;
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    currentChecker = elementUnderMouse;
    if (elementUnderMouse.className.includes("active")) {
        available.length = 0;
        if(turn % 2 == 0 && elementUnderMouse.className.includes("one")){
            oneMouseDown(elementUnderMouse, e);
        }
        else if(turn % 2 == 1 && elementUnderMouse.className.includes("two")){
            twoMouseDown(elementUnderMouse, e);    
        }
    }
});

document.addEventListener('mousemove', e => {

});

document.addEventListener('mouseup', e => {

});