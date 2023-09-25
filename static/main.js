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
    console.log(currentChecker);
    if (elementUnderMouse.className.includes("active")) {
        elementUnderMouse.classList.remove("active");

        isDragging = true;
        document.querySelector(".container").innerHTML += `<div id="p1Checker"></div>`;
        const p1Checker = document.querySelector("#p1Checker");
        document.querySelector("#p1Checker").style.background = "red";
        document.querySelector("#p1Checker").style.border = "3px solid black";


        p1Checker.style.top = `${e.clientY - 35}px`;
        p1Checker.style.left = `${e.clientX - 35}px`;
    }
});

document.addEventListener("mousemove", e => {
    if (isDragging) {
        const p1Checker = document.querySelector("#p1Checker");
        document.querySelector("#p1Checker").style.background = "red";
        document.querySelector("#p1Checker").style.border = "3px solid black";
        p1Checker.style.top = `${e.clientY - 35}px`;
        p1Checker.style.left = `${e.clientX - 35}px`;
    }
});


document.addEventListener('mouseup', e => {
    isDragging = false;
    document.querySelector("#p1Checker").remove();
    let elementUnderMouse = '';
    // if(e.clientX <= document.querySelector('html').offsetWidth && e.clientX >= 0 && 
    // e.clientY <= document.querySelector('html').offsetHeight && e.clientY >= 0){
    //     elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);}
    // else{
    //     elementUnderMouse = 0;
    // }
    elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);

    // e.clientX > document.querySelector('html').offsetWidth || e.clientX < 0 ||
    //  e.clientY > document.querySelector('html').offsetHeight || e.clientY < 0
    // console.log(elementUnderMouse===null);
    let includes;
    if(elementUnderMouse!==null){
        includes = elementUnderMouse.classList.value;
    }
    // console.log(e.clientX > document.querySelector('html').offsetWidth || e.clientX < 0);
    // console.log(typeof elementUnderMouse === null);
    if(elementUnderMouse === null){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    }
    else if(includes.includes(invalid[0]) || includes.includes(invalid[1])
     || includes.includes(invalid[2])){
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    }
    else if(elementUnderMouse.classList.value.includes(valid)){
        elementUnderMouse.children[0].classList.add("active");
    }

})

