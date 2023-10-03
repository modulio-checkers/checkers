let isDragging = false;
let currentChecker = '';
let playerTurn = 1;
const invalid = ["white", "container", "active"];
const valid = "black";

console.log(invalid, valid);

document.addEventListener('mousedown', (e) => {
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
    console.log(available);
    isDragging = false;
    document.querySelector("#p1Checker").remove();
    let elementUnderMouse = '';
    elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    let includes;
    if(elementUnderMouse!==null){
        includes = elementUnderMouse.classList.value;
        console.log("A");
    }
    console.log(valid, includes);
    if(elementUnderMouse === null){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    }
    else if(includes.includes(invalid[0]) || includes.includes(invalid[1])
     || includes.includes(invalid[2])){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    }
    else if(includes.includes(valid[0]) && includes.includes(valid[1]) && !elementUnderMouse.children[0].classList.value.includes("active")){
        elementUnderMouse.children[0].classList.add("active");
    }

})

