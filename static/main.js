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
    let elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    // console.log(elementUnderMouse.children[0]);
    // console.log(elementUnderMouse.children[0].dataset.checker);
    console.log(elementUnderMouse.classList.value.includes(invalid[0]));
    if(elementUnderMouse.classList.value.includes(invalid[0]) || elementUnderMouse.classList.value.includes(invalid[1]) || elementUnderMouse.classList.value.includes(invalid[2])){
        // console.log(currentChecker.classList);
        // currentChecker.classList.add("active");
        // console.log(currentChecker.classList.add("active"), document.querySelector(".checker28").classList.add("active"));
        // document.querySelector(".checker28").classList.add("active");
        // console.log(currentChecker.classList[1]);
        document.querySelector(`.${currentChecker.classList[1]}`).classList.add("active"); ///important, do not change
    }
    else{
        elementUnderMouse.children[0].classList.add("active");
    }
    console.log(currentChecker);

})

currentChecker.classList.add("active");

console.log(currentChecker);
