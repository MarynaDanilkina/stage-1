//бургер меню
const iconMenu = document.querySelector('.header__menu-icon');
const iconMenuAc = document.querySelector('._active');
//общий класс для навигации
const menuHeader = document.querySelector('.header__menu ');
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
        header.classList.toggle("header__active")
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
    document.body.classList.toggle('_lock');
    wind.classList.remove('window__open');
    logo.classList.remove("logo-add")
    header.classList.remove("header__active")
}
wind.addEventListener("click", closeMenu)

let popup = document.querySelector(".our__friends__popup__block")

popup.addEventListener("mouseleave", () => {
    document.querySelector(".modalClose__block").style.backgroundColor = '#FDDCC4'
})
popup.addEventListener("mouseenter", () => {
    document.querySelector(".modalClose__block").style.backgroundColor = null
})


const modal = document.querySelector('.our__friends__popup')
const modalClose = document.querySelector('.modalClose__block')
const card = document.querySelectorAll('.about-animals__block')
let jsonAnim = "./data.json";
const url = "./data.json"


//Pagination
let arrNew8 = []
while (arrNew8.length < 8) {
    let rand = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
    if (!arrNew8.includes(rand)) {
        arrNew8.push(rand);
    }
}
//console.log(arrNew8)

let forward = document.querySelector(".forward")
let forwardFull = document.querySelector(".full-forward")
let back = document.querySelector(".back")
let backFull = document.querySelector(".full-back")
let numberPige = document.querySelector(".now p")
let arrPets8 = []
let arrPets6 = []
let arrPets3 = []
let amountPets = 48;
let lastPetsPage = 0; // количестово страниц
let amountCard; //количество на странице
let number = 1; // номер страницы
forward.addEventListener("click", nextNumber);
back.addEventListener("click", prewNumber);
backFull.addEventListener("click", prewFullNumber);
forwardFull.addEventListener("click", forwardFullNumber);



// разрешение экрана
function sizePage() {
    if (window.innerWidth >= 1280) {
        lastPetsPage = 6;
        amountCard = 8;
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        lastPetsPage = 8;
        amountCard = 6;
    }
    if (window.innerWidth < 768) {
        amountCard = 3;
        lastPetsPage = 16;
    }
}
window.onresize = sizePage
sizePage()

//массивы


//8 карточек рандом
function randomPets8() {
    let first = [arrNew8];
    let result = []
    while (first.length < 6) {
        let arr3 = [];
        while (arr3.length < 8) {
            let rand = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            if (!arr3.includes(rand)) {
                arr3.push(rand);
            }
        }
        first.push(arr3)
        arr3 = [];
    }
    let arrStr = first.flat().join('').match(/\d{8}/g)
    //console.log(arrStr)
    for (let i = 0; i < arrStr.length; i++) {
        result.push(arrStr[i].split(",").map(Number))
    }

    return result
}
randomPets8()
arrPets8 = randomPets8()
//console.log('массив 48 элементов для 8 карт')
//console.log(arrPets8)

//6 карточек рандом
function randomPets6() {
    let first = [arrNew8.slice(0, 6)];
    //console.log(first)
    let result = []
    while (first.length < 8) {
        let arr3 = [];
        while (arr3.length < 6) {
            let rand = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            if (!arr3.includes(rand)) {
                arr3.push(rand);
            }
        }
        first.push(arr3)
        arr3 = [];
    }
    //console.log(first)
    let arrStr = first.flat().join('').match(/\d{6}/g)
    //console.log(arrStr)
    for (let i = 0; i < arrStr.length; i++) {
        result.push(arrStr[i].split(",").map(Number))
    }

    return result
}
randomPets6()
arrPets6 = randomPets6()
//console.log('массив 48 элементов для 6 карт')
//console.log(arrPets6)

//3 карточек рандом
function randomPets3() {
    let first = [arrNew8.slice(0, 3)];
    let result = []
    while (first.length < 16) {
        let arr3 = [];
        while (arr3.length < 3) {
            let rand = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
            if (!arr3.includes(rand)) {
                arr3.push(rand);
            }
        }
        first.push(arr3)
        arr3 = [];
    }
    //console.log(first)
    let arrStr = first.flat().join('').match(/\d{3}/g)

    for (let i = 0; i < arrStr.length; i++) {
        result.push(arrStr[i].split(",").map(Number))
    }

    return result
}
randomPets3()
arrPets3 = randomPets3()
//console.log('массив 48 элементов для 3 карт')
//console.log(arrPets3)

//Номера страниц
function nextNumber() {
    number++;
    numberPige.textContent = number;
    if (number === 1) {
        back.setAttribute("disabled", "disabled");
        backFull.setAttribute("disabled", "disabled");
    }
    if (number > 1) {
        back.removeAttribute("disabled", "disabled");
        backFull.removeAttribute("disabled", "disabled");
    }
    if (number >= lastPetsPage) {
        forward.setAttribute("disabled", "disabled");
        forwardFull.setAttribute("disabled", "disabled");
    }
    if (window.innerWidth >= 1280) {
        whoArr(number, arrPets8)
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        whoArr(number, arrPets6)
    }
    if (window.innerWidth < 768) {
        whoArr(number, arrPets3)
    }

    return number

}
function prewNumber() {
    number--;
    numberPige.textContent = number;
    if (number === 1) {
        back.setAttribute("disabled", "disabled");
        backFull.setAttribute("disabled", "disabled");
    }
    if (number > 1) {
        forward.removeAttribute("disabled", "disabled");
        forwardFull.removeAttribute("disabled", "disabled");
        back.removeAttribute("disabled", "disabled");
        backFull.removeAttribute("disabled", "disabled");
    }
    if (number >= lastPetsPage) {
        forward.setAttribute("disabled", "disabled");
        forwardFull.setAttribute("disabled", "disabled");
        back.removeAttribute("disabled", "disabled");
        backFull.removeAttribute("disabled", "disabled");
    }
    if (window.innerWidth >= 1280) {
        whoArr(number, arrPets8)
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        whoArr(number, arrPets6)
    }
    if (window.innerWidth < 768) {
        whoArr(number, arrPets3)
    }
    return number
}
function prewFullNumber() {
    number = 1;
    numberPige.textContent = number;
    back.setAttribute("disabled", "disabled");
    backFull.setAttribute("disabled", "disabled");
    forward.removeAttribute("disabled", "disabled");
    forwardFull.removeAttribute("disabled", "disabled");
    if (window.innerWidth >= 1280) {
        whoArr(number, arrPets8)
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        whoArr(number, arrPets6)
    }
    if (window.innerWidth < 768) {
        whoArr(number, arrPets3)
    }
    return number
}
function forwardFullNumber() {
    number = lastPetsPage;
    numberPige.textContent = number;
    forward.setAttribute("disabled", "disabled");
    forwardFull.setAttribute("disabled", "disabled");
    back.removeAttribute("disabled", "disabled");
    backFull.removeAttribute("disabled", "disabled");
    if (window.innerWidth >= 1280) {
        whoArr(number, arrPets8)
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        whoArr(number, arrPets6)
    }
    if (window.innerWidth < 768) {
        whoArr(number, arrPets3)
    }
    return number
}

//массив с номерами карточек при переключении

//для 8 карт
function whoArr(number, arrPets8) {
    let arrResult = arrPets8[number - 1]
    console.log(arrResult)
    getDataNew(url, arrResult)
    return arrResult
}



async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    addDiv(data);
    showImg(data);
    showTitle(data);
}
async function getDataNew(url, arrResult) {
    const res = await fetch(url);
    const data = await res.json();
    addDivNew(data, arrResult);
    showImgNew(data, arrResult)
    showTitleNew(data, arrResult);
}




function addDivNew(data, arrResult) {
    let carts = document.querySelectorAll('.about-animals__block')
    let posich = arrResult.join('').split('').map(Number)
    for (let i = 0; i < amountCard; i++) {
        let id2 = data[posich[i] - 1].id;
        console.log(id2)


        carts[i].addEventListener("click", () => {
            console.log("?????")
            console.log(id2)
            getAnimalsDataNew(id2, data)
            openModal()
        })
    }
}
function addDiv(data) {
    for (let i = 0; i < amountCard; i++) {
        let parent = document.querySelector('.our__friends__about-animals');
        let div = document.createElement('div');
        div.classList.add('about-animals__block');
        let id = data[arrNew8[i] - 1].id;
        console.log(id)
        div.addEventListener("click", foo)

        function foo() {
            console.log("-?-?-?-")
            console.log(id)
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
function showImgNew(data, arrResult) {
    let posich = arrResult.join('').split('').map(Number)
    //console.log(posich)
    if (arrResult !== undefined && data !== undefined) {
        for (let i = 0; i < posich.length; i++) {
            let imgAnim = document.querySelectorAll('.about-animals__block-img');
            imgAnim[i].src = `${data[posich[i] - 1].img}`
            imgAnim[i].alt = `${data[posich[i] - 1].name}`
        }
    }

}
function showImg(data) {
    for (let i = 0; i < amountCard; i++) {
        let imgAnim = document.querySelectorAll('.about-animals__block-img');
        imgAnim[i].src = `${data[arrNew8[i] - 1].img}`
        imgAnim[i].alt = `${data[arrNew8[i] - 1].name}`
    }
}
function showTitleNew(data, arrResult) {
    let posich = arrResult.join('').split('').map(Number)
    for (let i = 0; i < amountCard; i++) {
        let titleAnim = document.querySelectorAll('.about-animals__block-name');
        titleAnim[i].innerHTML = `${data[posich[i] - 1].name}`
    }
}
function showTitle(data) {
    for (let i = 0; i < amountCard; i++) {
        let titleAnim = document.querySelectorAll('.about-animals__block-name');
        titleAnim[i].innerHTML = `${data[arrNew8[i] - 1].name}`
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
function getAnimalsDataNew(id2, data) {
    addModalImg2(id2, data);
    addModalName2(id2, data);
    addModalBreed2(id2, data);
    //addModalDescription2(id2, data);
    //addModalAge2(id2, data);
    //addModalInoculations2(id2, data);
    //addModalDiseases2(id2, data);
    //addModalParasites2(id2, data);
}
function getAnimalsData(id, data) {
    //console.log(id)
    addModalImg(id, data);
    addModalName(id, data);
    addModalBreed(id, data);
    addModalDescription(id, data);
    addModalAge(id, data);
    addModalInoculations(id, data);
    addModalDiseases(id, data);
    addModalParasites(id, data);
}
function addModalImg2(id2, data) {
    console.log(id2)
    document.querySelector('.img__modal').src = `${data[id2 - 1].img}`
}
function addModalImg(id, data) {
    console.log(id)
    document.querySelector('.img__modal').src = `${data[id - 1].img}`;
}
function addModalName2(id2, data) {
    document.querySelector('.nameAnimals').innerHTML = `${data[id2 - 1].name}`;
}
function addModalName(id, data) {
    document.querySelector('.nameAnimals').innerHTML = `${data[id - 1].name}`;
}

function addModalBreed2(id2, data) {
    document.querySelector('.breed').innerHTML = `${data[id2 - 1].type} - ${data[id2 - 1].breed}`;
}
function addModalBreed(id, data) {
    document.querySelector('.breed').innerHTML = `${data[id - 1].type} - ${data[id - 1].breed}`;
}

function addModalDescription2(id2, data) {
    document.querySelector('.description').innerHTML = `${data[id2 - 1].description}`;
}
function addModalDescription(id, data) {
    document.querySelector('.description').innerHTML = `${data[id - 1].description}`;
}


function addModalAge2(id2, data) {
    document.querySelector('.age').innerHTML = `${data[id2 - 1].age}`;
}
function addModalAge(id, data) {
    document.querySelector('.age').innerHTML = `${data[id - 1].age}`;
}

function addModalInoculations2(id2, data) {
    document.querySelector('.inoculations').innerHTML = `${data[id2 - 1].inoculations}`;
}
function addModalInoculations(id, data) {
    document.querySelector('.inoculations').innerHTML = `${data[id - 1].inoculations}`;
}

function addModalDiseases2(id2, data) {
    document.querySelector('.diseases').innerHTML = `${data[id2 - 1].diseases}`;
}
function addModalDiseases(id, data) {
    document.querySelector('.diseases').innerHTML = `${data[id - 1].diseases}`;
}


function addModalParasites2(id2, data) {
    document.querySelector('.parasites').innerHTML = `${data[id2 - 1].parasites}`;
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
getData(url)