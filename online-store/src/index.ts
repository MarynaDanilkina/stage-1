import './global.css';

interface IData {
    id: number;
    title: string;
    img: string;
    price: string;
    firm: string;
    gender: string;
    color: string;
    season: string;
    year: number;
    quantity: number;
    popular: string;
}

const url = './data.json';

async function getData(url: string) {
    const res = await fetch(url);
    const data: IData[] = await res.json();
    addDiv(data);
    showImg(data);
    showTitle(data);
}
function addDiv(data: IData[]) {
    for (let i = 0; i < data.length; i++) {
        const parent = <HTMLElement>document.querySelector('.product-container');
        const div = document.createElement('div');
        div.classList.add('product-container__box');
        parent.append(div);
        addImgDiv(div);
        addInfoDiv(div);
    }
}

function addImgDiv(div: HTMLDivElement) {
    const el = document.createElement('div');
    el.classList.add('product-container__box-img');
    div.append(el);
    addImg(el);
}
function addImg(el: HTMLDivElement) {
    const img: HTMLImageElement = <HTMLImageElement>document.createElement('img');
    img.classList.add('box-img');
    img.src = '';
    img.alt = '';
    el.append(img);
    const img2: HTMLImageElement = <HTMLImageElement>document.createElement('img');
    img2.classList.add('svg');
    img2.src = '';
    img2.alt = '';
    el.append(img2);
}
function addInfoDiv(div: HTMLDivElement) {
    const el = document.createElement('div');
    el.classList.add('product-container__box-info');
    div.append(el);
    addTitle(el);
    addSeason(el);
    addDivBox(el);
}
function addTitle(el: HTMLDivElement) {
    const p = document.createElement('p');
    p.classList.add('box-info__title');
    el.append(p);
}
function addSeason(el: HTMLDivElement) {
    const p = document.createElement('p');
    p.classList.add('box-info__season');
    el.append(p);
}
function addDivBox(el: HTMLDivElement) {
    const elm = document.createElement('div');
    elm.classList.add('box-info');
    el.append(elm);
    addPrice(elm);
    addQuantity(elm);
}
function addPrice(elm: HTMLDivElement) {
    const p = document.createElement('p');
    p.classList.add('box-info__price');
    elm.append(p);
}
function addQuantity(elm: HTMLDivElement) {
    const p = document.createElement('p');
    p.classList.add('box-info__quantity');
    elm.append(p);
}
function showTitle(data: IData[]) {
    for (let i = 0; i < data.length; i++) {
        const p1 = document.querySelectorAll('.box-info__title');
        p1[i].innerHTML = `${data[i].title}`;
        const p2 = document.querySelectorAll('.box-info__season');
        p2[i].innerHTML = `${data[i].season}`;
        const p3 = document.querySelectorAll('.box-info__price');
        p3[i].innerHTML = `${data[i].price}`;
        const p4 = document.querySelectorAll('.box-info__quantity');
        p4[i].innerHTML = `${data[i].quantity}`;
    }
}
function showImg(data: IData[]) {
    for (let i = 0; i < data.length; i++) {
        const imgAnim = document.querySelectorAll<HTMLImageElement>('.box-img');
        imgAnim[i].src = `./assets${data[i].img}`;
        imgAnim[i].alt = `.${data[i].title}`;
        const imgSVG = document.querySelectorAll<HTMLImageElement>('.svg');
        imgSVG[i].src = `./assets/${data[i].firm}.svg`;
        imgSVG[i].alt = `.${data[i].firm}`;
    }
}
getData(url);
