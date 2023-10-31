let lastPos;
let elem;

const getCursorPos = e => e.pageY || e.touches[0].pageY;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const setRange = e => {
    if (!elem) {
        return;
    }
    // could be reduced to elem.offsetHeight + lastPos - e.pageY
    const newValue = clamp(elem.getAttribute('value')*1 + (lastPos - e.pageY), 0, 100);
    lastPos = getCursorPos(e);
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
