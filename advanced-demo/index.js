let lastPos;

// gets cursor position from top
const getCursorPos = e => e.pageY || e.touches[0].pageY;

// clamp number in between given boundaries
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// calculates new value according to mouse movement 
const setRange = e => {
    const input = document.querySelector('#inputs input[type="range"]');
    const inputText = document.querySelector('#inputs input[type="number"]');
    const bar = document.querySelector('#image div');
    const currentPos = getCursorPos(e);
    const newValue = clamp(inputText.value * 1 + lastPos - currentPos, 0, 100);

    lastPos = currentPos;
    input.value = newValue;
    inputText.value = newValue;
    bar.style.height = newValue + '%';
};

// set listener to change value on mouseMove, and to unset on mouseUp
const hook = e => {
    lastPos = getCursorPos(e);
    document.body.classList.add('touchy'); // cursor after leaving image
    document.addEventListener('mousemove', setRange);
    document.addEventListener('mouseup', unhook);
};

// removes listeners for value change
const unhook = _ => {
    document.body.classList.remove('touchy');
    document.removeEventListener('mousemove', setRange);
    document.removeEventListener('mouseup', unhook);
};

// start value changer on mouseDown at #image
window.addEventListener('load', _ => {
    const image = document.querySelector('#image');
    image.addEventListener('mousedown', hook);
});
