document.addEventListener('mousedown', (event) => {
    const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);

    if (elementUnderMouse.className.includes("active")) {
        const currentChecker = elementUnderMouse.dataset.checker;

    }
});