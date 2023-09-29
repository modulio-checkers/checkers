//Kol kas tik vienas zaidejas veliau reiks pridet padigubintas funkcijas antram
let isDragging = false;
let currentChecker = '';
let playerTurn = 0;
const invalid = ["white", "container", "active", "player1-info", "player2-info", "timer1", "player1", "timer2", "player2"];
const valid = ["black", "orange"];
let available = [];
let thisPlayer;

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
        console.log(thisPlayer);
        const checkerNum = Number(currentChecker.dataset.checker);
        availableNumbers(checkerNum);
        for(let x in available){
            available[x].classList.add("orange");
        }
        elementUnderMouse.classList.remove("active");
        isDragging = true;
        document.querySelector(".container").innerHTML += `<div id="p1Checker"></div>`;
        const p1Checker = document.querySelector("#p1Checker");
        //document.querySelector("#p1Checker").style.background = "red"; //paredaduok kad butu galima istrint
        //document.querySelector("#p1Checker").style.border = "3px solid black"; //paredaduok kad butu galima istrint
        p1Checker.style.top = `${e.clientY - 35}px`;
        p1Checker.style.left = `${e.clientX - 35}px`;
}

function twoMouseDown(elementUnderMouse,e){
    thisPlayer = "two";
            const checkerNum = Number(currentChecker.dataset.checker);
            availableNumbers(checkerNum);
            for(let x in available){
                available[x].classList.add("orange");
            }
            elementUnderMouse.classList.remove("active");
            isDragging = true;
            document.querySelector(".container").innerHTML += `<div id="p2Checker"></div>`;
            const p2Checker = document.querySelector("#p2Checker");
            //document.querySelector("#p1Checker").style.background = "red"; //paredaduok kad butu galima istrint
            //document.querySelector("#p1Checker").style.border = "3px solid black"; //paredaduok kad butu galima istrint
            p2Checker.style.top = `${e.clientY - 35}px`;
            p2Checker.style.left = `${e.clientX - 35}px`;
}

function oneMouseMove(){

}

function twoMouseMove(){
}

document.addEventListener('mousedown', e => {
    isDragging = false;
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    currentChecker = elementUnderMouse;
    if (elementUnderMouse.className.includes("active")) {
        available.length = 0;
        if(playerTurn % 2 == 0 && elementUnderMouse.className.includes("one")){
            oneMouseDown(elementUnderMouse, e);
        }
        else if(playerTurn % 2 == 1 && elementUnderMouse.className.includes("two")){
            twoMouseDown(elementUnderMouse, e);    
        }
    }
});

document.addEventListener("mousemove", e => {
    if (isDragging) {
        if(playerTurn % 2 == 0 && thisPlayer == "one"){
        const p1Checker = document.querySelector("#p1Checker");
        p1Checker.style.top = `${e.clientY - 35}px`;
        p1Checker.style.left = `${e.clientX - 35}px`;
        }
        else if(playerTurn % 2 == 1 && thisPlayer == "two"){
            const p2Checker = document.querySelector("#p2Checker");
            p2Checker.style.top = `${e.clientY - 35}px`;
            p2Checker.style.left = `${e.clientX - 35}px`;
            }
    }
});

document.addEventListener('mouseup', e => {
    console.log(available);
    isDragging = false;
    console.log(document.querySelector("#p1Checker"));
    console.log(thisPlayer);
    if(thisPlayer == "one"){
        console.log("A");
        document.querySelector("#p1Checker").remove();
    }
    else if(thisPlayer == "two"){
        document.querySelector("#p2Checker").remove();
    }
    console.log(`.${thisPlayer}`);
    let elementUnderMouse = '';
    elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    let includes;
    console.log(document.querySelector("#p1Checker"));
    console.log(elementUnderMouse);
    if(elementUnderMouse !== null){
        includes = elementUnderMouse.classList.value;
        console.log("A");
    }
    console.log(valid, includes);
    if(elementUnderMouse === null){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`); 
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); 
        console.log("A");
    }
    else if(includes.includes(valid[0]) && includes.includes(valid[1]) && !elementUnderMouse.children[0].classList.value.includes("active")){
        elementUnderMouse.children[0].classList.add("active");
        elementUnderMouse.children[0].classList.add(`${thisPlayer}`);
        playerTurn++;
        console.log("A");
    }
    else{
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); 
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add(`${thisPlayer}`); 
        console.log("A");
    }
        //tarkim geras naujas kodas ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    console.log(available[0].classList[available.length-1]);
    for(let x in available){
        const removing = document.querySelectorAll(".orange");
        for(let h in removing){
            removing[h].classList.remove("orange");
        }
    }
    console.log(available);

    // else if(elementUnderMouse === null || invalid.some(element => includes.includes(element))){
    //     document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    // }
    //senas geras kodas ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    // document.querySelector(`.${available[x].classList[available.length-1]}`).classList.remove("orange");
    //kinda veikiantis kodas^^^^

})

//padaryt skirtingas spalvas
