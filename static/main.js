let isDragging = false;
let currentChecker = '';
//let turn = 0;
const invalid = ["white", "container", "active", "player1-info", "player2-info", "timer1", "player1", "timer2", "player2"];
const valid = ["black", "orange"];
let available = [];
let thisPlayer;
let checkerNum='';
const allChecker = document.querySelectorAll(".checker");

function serverReady(){
    console.log("server ready");
    startGame();
    console.log(localPlayer);
    if(localPlayer === 2)
            document.querySelector(".board").classList.add("rotate");
}

function updateBoard(object){
    // console.log(object.turn);
    // console.log(object.board);
    let board = object.board; 
    for(let x in allChecker){
        // allChecker[x].classList.remove("one")
        if(board[x]===0){
            allChecker.classList.remove("active");
            allChecker.classList.remove("one");
            allChecker.classList.remove("two");
        }
        if(board[x]===1){   
            console.log(allChecker.classList);
            allChecker.classList.add("active"); //neveiks
            allChecker.classList.add("one"); //neveiks
            allChecker.classList.remove("two");
        }
        if(board[x]===2){

        }
        if(board[x]===-1){
            allChecker.classList.add("active"); //neveiks
            allChecker.classList.remove("one");
            allChecker.classList.add("two"); //neveiks
        }
        if(board[x]===-2)[

        ]
        console.log(allChecker[x]);
    }

}

function updateMetadata(){

}


register_server_ready(serverReady);
register_update_board(updateBoard);
register_update_metadata(updateMetadata)




// for(x in allChecker){
// }
function availableNumbers(checkerNum){
    if(checkerNum == 1){
        available = [document.querySelector(".square10")];
    }
    else if(checkerNum == 64){
        available = [document.querySelector(".square55")];
    }
    else if(checkerNum == 3 || checkerNum == 5 || checkerNum == 7){
        available = [document.querySelector(".square" + (checkerNum + 7)),
        document.querySelector(".square" + (checkerNum + 9))];
    }
    else if(checkerNum == 58 || checkerNum == 60 || checkerNum == 62){
        available = [document.querySelector(".square" + (checkerNum - 7)),
        document.querySelector(".square" + (checkerNum - 9))];
    }
    else if(checkerNum == 16 || checkerNum == 32 || checkerNum == 48){
        available = [document.querySelector(".square" + (checkerNum - 9)),
        document.querySelector(".square" + (checkerNum + 7))]
    }
    else if(checkerNum == 17 || checkerNum == 33 || checkerNum == 49){
        available = [document.querySelector(".square" + (checkerNum - 7)),
        document.querySelector(".square" + (checkerNum + 9))]
    }
    else{
        available = [
        document.querySelector(".square" + (checkerNum - 9)),
        document.querySelector(".square" + (checkerNum - 7)), 
        document.querySelector(".square" + (checkerNum + 7)),
        document.querySelector(".square" + (checkerNum + 9))];
    }
}
//pakeist, kad veiktu su grid system
function oneMouseDown(elementUnderMouse, e){
    thisPlayer = "one";
    checkerNum = Number(currentChecker.dataset.checker);
    availableNumbers(checkerNum);
    for(let x in available){
        available[x].classList.add("orange");
    }
    elementUnderMouse.classList.remove("active");
    elementUnderMouse.classList.remove("one");
    isDragging = true;
    document.querySelector(".container").innerHTML += `<div id="p1Checker"></div>`;
    const p1Checker = document.querySelector("#p1Checker");
    p1Checker.style.top = `${e.clientY - 35}px`;
    p1Checker.style.left = `${e.clientX - 35}px`;
}
function twoMouseDown(elementUnderMouse,e){
    thisPlayer = "two";
    checkerNum = Number(currentChecker.dataset.checker);
    availableNumbers(checkerNum);
    for(let x in available){
        available[x].classList.add("orange");
    }
    elementUnderMouse.classList.remove("active");
    elementUnderMouse.classList.remove("two");
    isDragging = true;
    document.querySelector(".container").innerHTML += `<div id="p2Checker"></div>`;
    const p2Checker = document.querySelector("#p2Checker");
    p2Checker.style.top = `${e.clientY - 35}px`;
    p2Checker.style.left = `${e.clientX - 35}px`;
}
function oneMouseMove(e){
    const p1Checker = document.querySelector("#p1Checker");
    p1Checker.style.top = `${e.clientY - 35}px`;
    p1Checker.style.left = `${e.clientX - 35}px`;
}
function twoMouseMove(e){
    const p2Checker = document.querySelector("#p2Checker");
    p2Checker.style.top = `${e.clientY - 35}px`;
    p2Checker.style.left = `${e.clientX - 35}px`;
}

function startGame(){
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
document.addEventListener("mousemove", e => {
    if (isDragging) {
        if(turn % 2 == 0 && thisPlayer == "one"){
            oneMouseMove(e);
        }
        else if(turn % 2 == 1 && thisPlayer == "two"){
            twoMouseMove(e);
            }
    }
});
document.addEventListener('mouseup', e => {
    console.log(checkerNum);
    isDragging = false;
    if(thisPlayer == "one"){
        document.querySelector("#p1Checker").remove();
    }
    else if(thisPlayer == "two"){
        document.querySelector("#p2Checker").remove();
    }
    let elementUnderMouse = '';
    elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    let includes;
    if(elementUnderMouse !== null){
        includes = elementUnderMouse.classList.value;
    }
    if(elementUnderMouse === null){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`); 
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); 
    }
    else if(includes.includes(valid[0]) && includes.includes(valid[1]) && !elementUnderMouse.children[0].classList.value.includes("active")){
        elementUnderMouse.children[0].classList.add("active");
        elementUnderMouse.children[0].classList.add(`${thisPlayer}`);
        turn++;
        move(checkerNum-1, elementUnderMouse.children[0].dataset.checker-1)
    }
    else{
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); 
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`); 
    }
        //tarkim geras naujas kodas ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    for(let x in available){
        const removing = document.querySelectorAll(".orange");
        for(let h in removing){
            removing[h].classList.remove("orange");
        }
    }
    // else if(elementUnderMouse === null || invalid.some(element => includes.includes(element))){
    //     document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    // }
    //senas geras kodas ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // document.querySelector(`.${available[x].classList[available.length-1]}`).classList.remove("orange");
    //kinda veikiantis kodas^^^^

})

}
//aptvarkyti mouseup funkcija
//move validation and update board
//padaryt kad apsiverstu lenta
