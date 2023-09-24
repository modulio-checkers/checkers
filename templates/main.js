const checkerMove = document.querySelector(".player");
let isDragging;

document.addEventListener('mousedown', (event) => {
    isDragging = false;
    const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
        const currentChecker = elementUnderMouse.dataset.checker;
        if(elementUnderMouse.className.includes("active")){
            isDragging = true;
        }
        // const pActive = document.querySelector(".pActive");
        // checkerMove.classList.add("pActive");
        elementUnderMouse.classList.remove("active");
        // if(currentChecker){
            
        // }
});


console.log(checkerMove.className);
if (checkerMove.className.includes("pActive")){
    console.log("asd");
document.addEventListener("mousemove", e=>{
    console.log("asd");
    pActive.style.top = `${e.clientY-35}px`;
    pActive.style.left = `${e.clientX-35}px`;
    // document.addEventListener("mousedown", ()=>{
    // checkerMove.classList.remove("pActive");
    // document.elementFromPoint(event.clientX, event.clientY).classList.remove("active");
    // })

});
}

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