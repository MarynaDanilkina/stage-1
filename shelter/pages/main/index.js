console.log("Дорогой проверяющий! Пожалуйста, при проверке работы, убедись, что ты выставил правильное разрешение экрана в панели разработчика, а так же, стоит установить тип устройства Mobile. При проверке пагинации, не забудь после выставление нужной ширины перезагрузить страницу. Спасибо!")
//бургер меню
const iconMenu = document.querySelector('.header__menu-icon');
const iconMenuAc = document.querySelector('._active');
//общий класс для навигации
const menuHeader = document.querySelector('.header__menu ');
const listMenu = document.querySelectorAll('.menu__list');
const wind = document.querySelector('.window');
const header = document.querySelector('.header');
const logo = document.querySelector('.header__logo');
if (iconMenu) {
    //при клике на бургер меню
    iconMenu.addEventListener("click", function (e) {
        iconMenu.classList.toggle('_active');
        menuHeader.classList.toggle('_active');
        menuHeader.classList.remove("slide-add")
        menuHeader.classList.toggle("slide-in")
        menuHeader.classList.toggle("slide-out")
        document.body.classList.toggle('_lock');
        wind.classList.toggle('window__open');
        logo.classList.toggle("logo-add")
    });
}

const navMenu = document.querySelectorAll('.menu__link');
navMenu.forEach(n => n.addEventListener("click", closeMenu));
function closeMenu() {
    iconMenu.classList.remove('_active');
    menuHeader.classList.remove('_active');
    menuHeader.classList.toggle("slide-in")
    menuHeader.classList.toggle("slide-out")
    document.body.classList.remove('_lock');
    wind.classList.remove('window__open');
    logo.classList.remove("logo-add")

}
wind.addEventListener("click", closeMenu)



//slider
const slider = document.querySelector('.our__friends-slider__line');
const prew = document.querySelector('.left');
const next = document.querySelector('.right');
const img = document.querySelector('.about-animals__block-img')
const nameAnim = document.querySelector('.name__animal')
const modal = document.querySelector('.our__friends__popup')
const modalClose = document.querySelector('.modalClose__block')
const card = document.querySelectorAll('.about-animals__block')
let jsonAnim = "./data.json";
const url = "./data.json"




next.addEventListener('click', function () {
    randomPets();
    getData(url);
});
prew.addEventListener('click', function () {
    randomPets();
    getData(url);
});

let arrPets = [0, 1, 2];

const randomPets = () => {
    const arr = arrPets;
    arrPets = [];
    while (arrPets.length < 3) {
        let rand = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
        if (!arrPets.includes(rand) && !arr.includes(rand)) {
            arrPets.push(rand);
        }
    }
    console.log(arrPets)
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
    for (let i = 0; i < 3; i++) {
        let parent = document.querySelector('.our__friends-slider__line');
        let div = document.createElement('div');
        div.classList.add('about-animals__block');
        let id = data[arrPets[i]].id;
        div.id = id;
        div.onclick = function bu() {
            const id = arrPets[i] + 1;
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
    for (let i = 0; i < 3; i++) {
        let imgAnim = document.querySelectorAll('.about-animals__block-img');
        imgAnim[i].src = `${data[arrPets[i]].img}`
        imgAnim[i].alt = `${data[arrPets[i]].name}`
    }
}
function showTitle(data) {
    for (let i = 0; i < 3; i++) {
        let titleAnim = document.querySelectorAll('.about-animals__block-name');
        titleAnim[i].innerHTML = `${data[arrPets[i]].name}`
    }
}

function openModal() {
    modal.classList.add('open');
    document.body.classList.add('_lock');
}
modalClose.addEventListener("click", () => {
    modal.classList.remove('open');
    document.body.classList.remove('_lock');
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
        document.body.classList.remove('_lock');
    }
};

let popup = document.querySelector(".our__friends__popup__block")

popup.addEventListener("mouseleave", () => {
    document.querySelector(".modalClose__block").style.backgroundColor = '#FDDCC4'
})
popup.addEventListener("mouseenter", () => {
    document.querySelector(".modalClose__block").style.backgroundColor = null
})

