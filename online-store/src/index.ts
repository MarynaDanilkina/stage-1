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
const gap = 10;
const BtnFilter = document.querySelectorAll<HTMLElement>('.sidebar-left__button');
const basketContainer = <HTMLElement>document.querySelector('.product-container');
const quantity = <HTMLElement>document.querySelector('.quantity');
const buttonReset = <HTMLElement>document.querySelector('.button__reset');
const SortContainer = <HTMLSelectElement>document.querySelector('select');
const select = <HTMLSelectElement>document.querySelector('.container__sort');
const input = <HTMLInputElement>document.getElementById('filter_users');
const range = document.querySelectorAll<HTMLInputElement>('.range-slider input[type="range"]');
const progress = <HTMLElement>document.querySelector('.range-slider .progress');
const inputValue = document.querySelectorAll<HTMLInputElement>('.numberVal input');
const rangeQuantity = document.querySelectorAll<HTMLInputElement>('.range-slider__quantity input[type="range"]');
const progressQuantity = <HTMLElement>document.querySelector('.range-slider__quantity .progress__quantity');
const inputValueQuantity = document.querySelectorAll<HTMLInputElement>('.numberVal__quantity input');
const buttonResetSettings = <HTMLElement>document.querySelector('.reset-settings');
const Items: string = localStorage.getItem('data') || '';
let basketSum = localStorage.getItem('basket') || '0';

getData();

function getDataNew(data: IData[]): void {
    BtnFilter.forEach((el) => el.addEventListener('click', (e) => AllMetod(e, data)));
    buttonReset.addEventListener('click', (e) => AllMetod(e, data));
    basketContainer.addEventListener('click', (e) => AllMetod(e, data));
    SortContainer.addEventListener('change', (e) => AllMetod(e, data));
    input.addEventListener('keyup', (e) => AllMetod(e, data));
    buttonResetSettings.addEventListener('click', clear);
    range.forEach((input) => input.addEventListener('input', (e) => AllMetod(e, data)));
    rangeQuantity.forEach((input) => input.addEventListener('input', (e) => AllMetod(e, data)));
    SortContainer.onchange = function () {
        localStorage.selectedIndex = SortContainer.selectedIndex;
    };
    if (localStorage.getItem('data') !== null) {
        const dataNew = JSON.parse(Items);
        addDiv(dataNew);
    } else {
        addDiv(data);
    }
    localStorage1();
}

function AllMetod(e: Event, data: IData[]): void {
    basketContainer.innerHTML = '';
    const dataNew = data.slice();
    const dataFilter = filter(e, dataNew);
    const dataPrice = filterPrice(e, dataFilter);
    const dataQuantity = filterQuantity(e, dataPrice);
    const dataReset: IData[] = ResetFunction(e, dataQuantity, dataNew);
    const dataBasket: IData[] = basketFunction(e, dataReset);
    const dataSort = SortFunction(e, dataBasket);
    const dataInput = Search(e, dataSort);
    addDiv(dataInput);
}
function localStorage1() {
    if (localStorage.selectedIndex !== null) {
        SortContainer.selectedIndex = localStorage.selectedIndex;
    }
}
function clear() {
    localStorage.clear();
    window.location.reload();
}
function filter(event: Event, dataNew: IData[]): IData[] {
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
    const activeButton = document.querySelectorAll<HTMLElement>('.active__button');
    activeButton.forEach((el) => {
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
function filterPrice(e: Event, dataFilter: IData[]): IData[] {
    const rangeMin = range[0];
    const rangeMax = range[1];
    const minrange = parseInt(rangeMin.value);
    const maxrange = parseInt(rangeMax.value);
    const target = <HTMLElement>e.target;
    if (maxrange - minrange < gap) {
        if (target.classList.contains('range-min')) {
            rangeMin.value = `${maxrange} - ${gap}`;
        } else {
            rangeMax.value = `${maxrange} + ${gap}`;
        }
    } else {
        const rangeMinMax = rangeMin.max;
        const rangeMaxMax = rangeMax.max;
        progress.style.left = (minrange / +rangeMinMax) * 100 + '%';
        progress.style.right = 100 - (maxrange / +rangeMaxMax) * 100 + '%';
        inputValue[0].value = `${minrange}`;
        inputValue[1].value = `${maxrange}`;
    }
    const min = inputValue[0].value;
    const max = inputValue[1].value;
    const dataPrice = storage.getPrice(min, max, dataFilter);
    return dataPrice;
}
function filterQuantity(e: Event, dataPrice: IData[]): IData[] {
    const rangeQuantityMin = rangeQuantity[0];
    const rangeQuantityMax = rangeQuantity[1];
    const minrangeQuantit = parseInt(rangeQuantityMin.value);
    const maxrangeQuantit = parseInt(rangeQuantityMax.value);
    const target = <HTMLElement>e.target;
    if (maxrangeQuantit - minrangeQuantit < gap) {
        if (target.classList.contains('range-min')) {
            rangeQuantityMin.value = `${maxrangeQuantit} - ${gap}`;
        } else {
            rangeQuantityMax.value = `${maxrangeQuantit} + ${gap}`;
        }
    } else {
        const rangeQuantityMinMax = rangeQuantityMin.max;
        const rangeQuantityMaxMax = rangeQuantityMax.max;
        progressQuantity.style.left = (minrangeQuantit / +rangeQuantityMinMax) * 100 + '%';
        progressQuantity.style.right = 100 - (maxrangeQuantit / +rangeQuantityMaxMax) * 100 + '%';
        inputValueQuantity[0].value = `${minrangeQuantit}`;
        inputValueQuantity[1].value = `${maxrangeQuantit}`;
    }
    const minQuantit = inputValueQuantity[0].value;
    const maxQuantit = inputValueQuantity[1].value;
    const dataQuantit = storage.getQuantit(minQuantit, maxQuantit, dataPrice);
    return dataQuantit;
}
function ResetFunction(e: Event, dataFilter: IData[], dataNew: IData[]): IData[] {
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
        inputValue[0].value = '0';
        inputValue[1].value = '400';
        progress.style.left = 0 + '%';
        progress.style.right = 0 + '%';
        range[0].value = `0`;
        range[1].value = `400`;
        inputValueQuantity[0].value = '0';
        inputValueQuantity[1].value = '400';
        progressQuantity.style.left = 0 + '%';
        progressQuantity.style.right = 0 + '%';
        rangeQuantity[0].value = `0`;
        rangeQuantity[1].value = `400`;
        return dataNew;
    }
    return dataFilter;
}

function basketFunction(e: Event, data: IData[]): IData[] {
    const target = <HTMLElement>e.target;
    const datasetId: string = target.dataset.id || '';
    if (target.classList.contains('plus')) {
        const max = storage.getbasketData(data);
        const dataPlus = storage.getPlusData(datasetId, data, max);
        localStorage.setItem('data', JSON.stringify(dataPlus));
        basketSum = '' + storage.getbasketData(dataPlus);
        localStorage.setItem('basket', basketSum);
        showbasket(+basketSum);
        return dataPlus;
    }
    if (target.classList.contains('minus')) {
        const dataMinus = storage.getMinusData(datasetId, data);
        localStorage.setItem('data', JSON.stringify(dataMinus));
        basketSum = '' + storage.getbasketData(dataMinus);
        localStorage.setItem('basket', basketSum);
        showbasket(+basketSum);
        return dataMinus;
    }
    return data;
}
function showbasket(basketSum: number): void {
    quantity.innerHTML = `${basketSum}`;
}
function SortFunction(e: Event, data: IData[]): IData[] {
    const selectValue = select.options[select.selectedIndex].value;
    const result = storage.getSortData(selectValue, data);
    localStorage.setItem('data', JSON.stringify(result));
    return result;
}
function Search(e: Event, data: IData[]) {
    const keyword = input.value.toLowerCase();
    const dataSearch = storage.getFilterData(keyword, data);
    return dataSearch;
}
export function addDiv(data: IData[]): void {
    showbasket(+basketSum);
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
                    <p class="box-info__season">Цвет: ${data[i].color}</p>
                    <p class="box-info__season">Размеры: ${data[i].size}</p>
                    <p class="box-info__season">Популярны: ${data[i].popular}</p>
                    <div class="box-info">
                        <p class="box-info__price">${data[i].price}руб</p>
                        <p class="box-info__quantity">${data[i].quantity}</p>
                    </div>
                    <div class="box-info__basket">
                        <button class="basket__button minus" data-id="${data[i].minus}">-</button>
                        <p class="basket__amount">${data[i].amount}</p>
                        <button class="basket__button plus" data-id="${data[i].plus}">+</button>
                    </div>
                </div>
            </div>
        `;
    }
    if (data.length === 0) {
        alert('Извините, совпадений не обнаружено');
    }
}
