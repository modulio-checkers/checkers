//Kol kas tik vienas zaidejas veliau reiks pridet padigubintas funkcijas antram
let isDragging = false;
let currentChecker = '';
let playerTurn = 1;
const invalid = ["white", "container", "active", "player1-info", "player2-info", "timer1", "player1", "timer2", "player2"];
const valid = ["black"];
let available = [];

// console.log(document.querySelector(".square"));

// console.log(invalid, valid);

document.addEventListener('mousedown', e => {
    isDragging = false;
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    currentChecker = elementUnderMouse;
    if (elementUnderMouse.className.includes("active")) {
        available.length = 0;
        const checkerNum = Number(currentChecker.dataset.checker);
        let temporaryAvailable = [];
        //patikrint pozicija ar yra kampinis ar krastinis
        temporaryAvailable.length = 0;
        temporaryAvailable = [
        ".square" + (checkerNum - 9),
        ".square" + (checkerNum - 7), 
        ".square" + (checkerNum + 7),
        ".square" + (checkerNum + 9)];
        console.log(temporaryAvailable);
        for(let x in temporaryAvailable){
            available.push(document.querySelector(temporaryAvailable[x]));
            // available[x].classList.add("orange");
        }
        console.log(available);
        elementUnderMouse.classList.remove("active");
        isDragging = true;
        document.querySelector(".container").innerHTML += `<div id="p1Checker"></div>`;
        const p1Checker = document.querySelector("#p1Checker");
        document.querySelector("#p1Checker").style.background = "red"; //paredaduok kad butu galima istrint
        document.querySelector("#p1Checker").style.border = "3px solid black"; //paredaduok kad butu galima istrint
        p1Checker.style.top = `${e.clientY - 35}px`;
        p1Checker.style.left = `${e.clientX - 35}px`;
    }
});

document.addEventListener("mousemove", e => {
    if (isDragging) {
        const p1Checker = document.querySelector("#p1Checker");
        document.querySelector("#p1Checker").style.background = "red"; //paredaduok kad butu galima istrint
        document.querySelector("#p1Checker").style.border = "3px solid black"; //paredaduok kad butu galima istrint
        p1Checker.style.top = `${e.clientY - 35}px`;
        p1Checker.style.left = `${e.clientX - 35}px`;
    }
});

document.addEventListener('mouseup', e => {
    isDragging = false;
    document.querySelector("#p1Checker").remove();
    // for(let x in available){
    //     console.log(available[x]);
    //     available[x].classList.remove("orange");
    // }
    let elementUnderMouse = '';
    elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    let includes;
    if(elementUnderMouse !== null){
        includes = elementUnderMouse.classList.value;
    }
    // console.log(typeof includes);
    if(elementUnderMouse === null){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    }
    else if(includes.includes(valid[0]) && !elementUnderMouse.children[0].classList.value.includes("active")){
        elementUnderMouse.children[0].classList.add("active");
    }
    else{
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    }
    //tarkim geras naujas kodas ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // else if(elementUnderMouse === null || invalid.some(element => includes.includes(element))){
    //     document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    // }
    //senas geras kodas ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
})

