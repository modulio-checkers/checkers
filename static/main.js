let isDragging = false;
let currentChecker = '';
let playerTurn = 1;
const invalid = ["white", "container"];
const valid = "black";

console.log(invalid, " ", valid);

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
    if(elementUnderMouse.classList.value.includes(invalid[0])){
        console.log(currentChecker.classList);
        currentChecker.classList.add("active");
        console.log(currentChecker.classList);
        
    }
    else{
        elementUnderMouse.children[0].classList.add("active");
    }
    console.log(currentChecker);

})
console.log(currentChecker);
