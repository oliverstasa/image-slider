let lastPos;
let elem;

const getCursorPos = e => e.pageY || e.touches[0].pageY;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const setRange = e => {
    if (!elem) {
        return;
    }
    const currentPos = getCursorPos(e);
    const newValue = clamp(elem.getAttribute('value') * 1 + lastPos - currentPos, 0, 100);
    lastPos = currentPos;
    elem.setAttribute('value', newValue);
};

const hook = e => {
    elem = e.target;
    lastPos = getCursorPos(e);
    document.addEventListener('mousemove', setRange);
    document.addEventListener('mouseup', unhook);
};

const unhook = _ => {
    document.removeEventListener('mousemove', setRange);
    document.removeEventListener('mouseup', unhook);
};

window.addEventListener('load', _ => {
    const images = document.querySelectorAll('div');
    for (const image of images) {
        image.addEventListener('mousedown', hook);
    }
});
