let offset = -10; //смещение от левого края
const slider = document.querySelector('.our__friends-slider__line');
const prew = document.querySelector('.arrow0');
const next = document.querySelector('.arrow');


next.addEventListener('click', arrowNext);
prew.addEventListener('click', arrowPrew);

function arrowNext() {
    offset = offset + 360;
    if (offset > 1790) {
        offset = -10;
    }
    slider.style.left = -offset + 'px';
}

function arrowPrew() {
    offset = offset - 360;
    if (offset < -10) {
        offset = 1790;
    }
    slider.style.left = -offset + 'px';
}