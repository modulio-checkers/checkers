// const checkerMove = document.querySelector(".player");
let isDragging = false;
// const pActive = document.querySelector(".pActive");
let currentChecker;


document.addEventListener('mousedown', (event) => {
    isDragging = false;
    const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
        currentChecker = elementUnderMouse.dataset.checker;
        if(elementUnderMouse.className.includes("active")){
            isDragging = true;
            document.querySelector(".container").innerHTML += `<div id="p1Checker"></div>`;
        }
        // const pActive = document.querySelector(".pActive");
        // checkerMove.classList.add("pActive");
        elementUnderMouse.classList.remove("active");
        // if(currentChecker){
            
        // }
        // console.log(isDragging);
});
// document.addEventListener('mousedown', ()=>{
//     console.log(isDragging);
// })
const p1Checker = document.querySelector("#p1Checker");

document.addEventListener("mousemove", e=>{
    if(isDragging){
    p1Checker.style.top = `${e.clientY-35}px`;
    p1Checker.style.left = `${e.clientX-35}px`;
    // document.addEventListener("mousedown", ()=>{
    // checkerMove.classList.remove("pActive");
    // document.elementFromPoint(event.clientX, event.clientY).classList.remove("active");
    // })
    }
});
 

document.addEventListener('mouseup', e=>{
    document.querySelector("#p1Checker").innerHTML = ``;
    // console.log(checkerMove.classList);
    // console.log("w");
    // let elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    // console.log(elementUnderMouse.className.includes("checker "));
    console.log(elementUnderMouse);
    // while(!elementUnderMouse.tagName !== 'HTML'){
    //     elementUnderMouse.style.pointerEvent = "none";
    //     elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    // }
    // elementUnderMouse.forEach(element => {
    //     console.log(elementUnderMouse);
        
    // });
    // const currentElement = `${elementUnderMouse.className.split(" ", 1)}>.checker`;
    // console.log(currentElement);
    // document.querySelector(`${elementUnderMouse.className}>.checker`).classList.add("active");
})

// document.addEventListener('mousedown', (event)=>{
//     if(checkerMove.classList.includes("pActive")){
//         checkerMove.classList.remove("pActive");
//         document.elementFromPoint(event.clientX, event.clientY).classList.remove("active");
//     }
// });
// console.log("remove");
// checkerMove.classList.remove("pActive");


// document.addEventListener('mouseup', (event) => {
//     checkerMove.classList.remove("pActive");
// });