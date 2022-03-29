//бургер меню
const iconMenu = document.querySelector('.header__menu-icon');
const iconMenuAc = document.querySelector('._active');
//общий класс для навигации
const menuHeader = document.querySelector('.header__menu ');

if (iconMenu) {
    //при клике на бургер меню
    iconMenu.addEventListener("click", function (e) {
        iconMenu.classList.toggle('_active');
        menuHeader.classList.toggle('_active');
    });
}

const navMenu = document.querySelectorAll('.menu__link');
navMenu.forEach(n => n.addEventListener("click", closeMenu));
function closeMenu() {

    iconMenu.classList.remove('_active');
    menuHeader.classList.remove('_active');

}


//slider
const slider = document.querySelector('.our__friends-slider__line');
const prew = document.querySelector('.arrow0');
const next = document.querySelector('.arrow');
const img = document.querySelector('.about-animals__block-img')
const nameAnim = document.querySelector('.name__animal')
const modal = document.querySelector('.our__friends__popup')
const modalClose = document.querySelector('.modalClose__block')
const card = document.querySelectorAll('.about-animals__block')
let jsonAnim = "./data.json";
const url = "./data.json"

let offset = -10; //смещение от левого края


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

//popup

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    addDiv(data);
    showImg(data);
    showTitle(data);
}
getData(url)

function addDiv(data) {
    for (let i = card.length; i < card.length + data.length; i++) {
        let parent = document.querySelector('.our__friends-slider__line');
        let div = document.createElement('div');
        div.classList.add('about-animals__block');
        let id = data[i].id;
        div.id = id;
        div.onclick = function bu() {
            const id = div.id;
            getAnimalsData(id, data)
            openModal()
        }
        parent.append(div);
        addImg(div);
        addName(div);
        addButton(div);
    }
}

function addImg(div) {
    let divChild = parent.firstChild;
    let img = document.createElement('img');
    img.classList.add('about-animals__block-img');
    img.src = "";
    img.alt = "";
    img.width = "270";
    img.height = "270";
    div.insertBefore(img, divChild);
}
function addName(div) {
    let el = document.createElement('div');
    el.classList.add('about-animals__block-name');
    div.append(el);
    nameTitle(el);
}
function nameTitle(el) {
    let titleName = document.createElement('p');
    el.append(titleName);
}
function addButton(div) {
    let parentButton = document.createElement('div');
    parentButton.classList.add('about-animals__block-button')
    div.append(parentButton);
    buttonAbout(parentButton);
}
function buttonAbout(parentButton) {

    let butAbout = document.createElement('button');
    butAbout.classList.add('about-animals-button');
    butAbout.classList.add('effect')
    butAbout.innerHTML = "Learn more";
    parentButton.append(butAbout);
}
function showImg(data) {
    for (let i = card.length; i < card.length + data.length; i++) {
        let imgAnim = document.querySelectorAll('.about-animals__block-img');
        imgAnim[i].src = `${data[i].img}`
        imgAnim[i].alt = `${data[i].name}`
    }
}
function showTitle(data) {
    for (let i = card.length; i < card.length + data.length; i++) {
        let titleAnim = document.querySelectorAll('.about-animals__block-name');
        titleAnim[i].innerHTML = `${data[i].name}`
    }
}

function openModal() {
    modal.classList.add('open');
}
modalClose.addEventListener("click", () => {
    modal.classList.remove('open');
})
function getAnimalsData(id, data) {
    addModalImg(id, data);
    addModalName(id, data);
    addModalBreed(id, data);
    addModalDescription(id, data);
    addModalAge(id, data);
    addModalInoculations(id, data);
    addModalDiseases(id, data);
    addModalParasites(id, data);
}
function addModalImg(id, data) {
    document.querySelector('.img__modal').src = `${data[id - 1].img}`;
}
function addModalName(id, data) {
    document.querySelector('.nameAnimals').innerHTML = `${data[id - 1].name}`;
}
function addModalBreed(id, data) {
    document.querySelector('.breed').innerHTML = `${data[id - 1].type} - ${data[id - 1].breed}`;
}
function addModalDescription(id, data) {
    document.querySelector('.description').innerHTML = `${data[id - 1].description}`;
}
function addModalAge(id, data) {
    document.querySelector('.age').innerHTML = `${data[id - 1].age}`;
}
function addModalInoculations(id, data) {
    document.querySelector('.inoculations').innerHTML = `${data[id - 1].inoculations}`;
}
function addModalDiseases(id, data) {
    document.querySelector('.diseases').innerHTML = `${data[id - 1].diseases}`;
}
function addModalParasites(id, data) {
    document.querySelector('.parasites').innerHTML = `${data[id - 1].parasites}`;
}

window.onclick = function (e) {
    if (e.target == modal) {
        modal.classList.remove('open');
    }
};

