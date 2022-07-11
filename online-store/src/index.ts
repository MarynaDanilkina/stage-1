import { storage } from './storage';
import { getData } from './getData';
export { getDataNew };
import './global.css';
interface IData {
    id: number;
    title: string;
    img: string;
    price: number;
    firm: string;
    gender: string;
    color: string;
    season: string;
    year: number;
    quantity: number;
    popular: string;
    plus: string;
    minus: string;
    amount: number;
    size: string;
}
const BtnFilter = document.querySelectorAll('.sidebar-left__button');
getData();

function getDataNew(data: IData[]) {
    BtnFilter.forEach((el) => el.addEventListener('click', (e) => AllMetod(e, data)));
    (<HTMLElement>document.querySelector('.button__reset')).addEventListener('click', (e) => AllMetod(e, data));
    addDiv(data);
}
const div = <HTMLElement>document.querySelector('.product-container');

function AllMetod(e: Event, data: IData[]) {
    div.innerHTML = '';
    const dataNew = data.slice();
    const dataFilter = filter(e, dataNew);
    const dataReset: IData[] = ResetFunction(e, dataFilter, dataNew);
    addDiv(dataReset);
}
function filter(event: Event, dataNew: IData[]) {
    const firmArr: Array<string> = [];
    const SeasonArr: Array<string> = [];
    const ColorArr: Array<string> = [];
    const SizeArr: Array<string> = [];
    let PopularArr = '';
    const GenderArr: Array<string> = [];
    const target = <HTMLElement>event.target;
    if (target.classList.contains('firm')) {
        target.classList.toggle('active__button');
    }
    if (target.classList.contains('season')) {
        target.classList.toggle('active__button');
    }
    if (target.classList.contains('color')) {
        target.classList.toggle('active__button');
    }
    if (target.classList.contains('size')) {
        target.classList.toggle('active__button');
    }
    if (target.classList.contains('popular')) {
        target.classList.toggle('active__button');
    }
    if (target.classList.contains('gender')) {
        target.classList.toggle('active__button');
    }
    document.querySelectorAll<HTMLElement>('.active__button').forEach((el) => {
        if (typeof el.dataset.firm != 'undefined') {
            firmArr.push(el.dataset.firm);
        }
        if (typeof el.dataset.season != 'undefined') {
            SeasonArr.push(el.dataset.season);
        }
        if (typeof el.dataset.color != 'undefined') {
            ColorArr.push(el.dataset.color);
        }
        if (typeof el.dataset.size != 'undefined') {
            SizeArr.push(el.dataset.size);
        }
        if (typeof el.dataset.popular != 'undefined') {
            PopularArr += el.dataset.popular;
        }
        if (typeof el.dataset.gender != 'undefined') {
            GenderArr.push(el.dataset.gender);
        }
    });
    const dataAll = storage.getDataFirm(firmArr, SeasonArr, ColorArr, SizeArr, PopularArr, GenderArr, dataNew);
    return dataAll;
}
function ResetFunction(e: Event, dataFilter: IData[], dataNew: IData[]) {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('reset')) {
        document.querySelectorAll('.firm').forEach((el) => {
            el.classList.remove('active__button');
        });
        document.querySelectorAll('.season').forEach((el) => {
            el.classList.remove('active__button');
        });
        document.querySelectorAll('.color').forEach((el) => {
            el.classList.remove('active__button');
        });
        document.querySelectorAll('.size').forEach((el) => {
            el.classList.remove('active__button');
        });
        document.querySelectorAll('.popular').forEach((el) => {
            el.classList.remove('active__button');
        });
        document.querySelectorAll('.gender').forEach((el) => {
            el.classList.remove('active__button');
        });
        return dataNew;
    }
    return dataFilter;
}
export function addDiv(data: IData[]) {
    for (let i = 0; i < data.length; i++) {
        const div = <HTMLElement>document.querySelector('.product-container');
        div.innerHTML += `
            <div class="product-container__box">
                <div class="product-container__box-img">
                    <img class="svg" src="./assets/${data[i].firm}.svg" alt=".${data[i].firm}">
                    <img class="box-img" src="./assets${data[i].img}" alt=".${data[i].title}">
                </div>
                <div class="product-container__box-info">
                    <p class="box-info__title">${data[i].title}</p>
                    <p class="box-info__season">${data[i].season}</p>
                    <p class="box-info__season">${data[i].color}</p>
                    <p class="box-info__season">Размеры: ${data[i].size}</p>
                    <p class="box-info__season">Популярны: ${data[i].popular}</p>
                    <div class="box-info">
                        <p class="box-info__price">${data[i].price}руб</p>
                        <p class="box-info__quantity">${data[i].quantity}</p>
                    </div>
                    <div class="box-info__basket">
                        <button class="basket__button plus" data-id="${data[i].plus}">+</button>
                        <p class="basket__amount">${data[i].amount}</p>
                        <button class="basket__button minus" data-id="${data[i].minus}">-</button>
                    </div>
                </div>
            </div>
        `;
    }
    if (data.length === 0) {
        alert('Извините, совпадений не обнаружено');
    }
}
