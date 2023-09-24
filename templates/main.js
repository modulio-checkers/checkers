const checkerMove = document.querySelector(".player");
let isDragging = false;
const pActive = document.querySelector(".pActive");


document.addEventListener('mousedown', (event) => {
    isDragging = false;
    const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
        const currentChecker = elementUnderMouse.dataset.checker;
        if(elementUnderMouse.className.includes("active")){
            isDragging = true;
            checkerMove.classList.add("pActive");
        }
        // const pActive = document.querySelector(".pActive");
        // checkerMove.classList.add("pActive");
        elementUnderMouse.classList.remove("active");
        // if(currentChecker){
            
        // }
        console.log(isDragging);
});
// document.addEventListener('mousedown', ()=>{
//     console.log(isDragging);
// })

document.addEventListener("mousemove", e=>{
    if(isDragging){
    const pActive = document.querySelector(".pActive");
    pActive.style.top = `${e.clientY-35}px`;
    pActive.style.left = `${e.clientX-35}px`;
    // document.addEventListener("mousedown", ()=>{
    // checkerMove.classList.remove("pActive");
    // document.elementFromPoint(event.clientX, event.clientY).classList.remove("active");
    // })
    }
});
   pActive.style.top = "0px";
    pActive.style.left = "0px";

document.addEventListener('mouseup', e=>{
    // isDragging=false;
    // pActive.style.top = "0px";
    // pActive.style.left = "0px";
    console.log("w");
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    checkerMove.classList.remove("pActive");
    console.log(elementUnderMouse);
    const currentElement = `${elementUnderMouse.className.split(" ", 1)}>.checker`;
    console.log(currentElement);
    document.querySelector(`${elementUnderMouse.className}>.checker`).classList.add("active");
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