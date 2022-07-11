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
const basketContainer = <HTMLElement>document.querySelector('.product-container');
const quantity = <HTMLElement>document.querySelector('.quantity');
const buttonReset = <HTMLElement>document.querySelector('.button__reset');
const SortContainer = <HTMLElement>document.querySelector('select');
const select = <HTMLSelectElement>document.querySelector('.container__sort');
const input = <HTMLInputElement>document.getElementById('filter_users');

getData();

function getDataNew(data: IData[]) {
    BtnFilter.forEach((el) => el.addEventListener('click', (e) => AllMetod(e, data)));
    buttonReset.addEventListener('click', (e) => AllMetod(e, data));
    basketContainer.addEventListener('click', (e) => AllMetod(e, data));
    SortContainer.addEventListener('change', (e) => AllMetod(e, data));
    input.addEventListener('keyup', (e) => AllMetod(e, data));
    addDiv(data);
}

function AllMetod(e: Event, data: IData[]) {
    basketContainer.innerHTML = '';
    const dataNew = data.slice();
    const dataFilter = filter(e, dataNew);
    const dataReset: IData[] = ResetFunction(e, dataFilter, dataNew);
    const dataBasket: IData[] = basketFunction(e, dataReset);
    const dataSort = SortFunction(e, dataBasket);
    const dataInput = Search(e, dataSort);
    addDiv(dataInput);
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
        const basketSum = storage.getbasketData(dataPlus);
        showbasket(basketSum);
        return dataPlus;
    }
    if (target.classList.contains('minus')) {
        const dataMinus = storage.getMinusData(datasetId, data);
        const basketSum: number = storage.getbasketData(dataMinus);
        showbasket(basketSum);
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
    return result;
}
function Search(e: Event, data: IData[]) {
    const keyword = input.value.toLowerCase();
    const dataSearch = storage.getFilterData(keyword, data);
    return dataSearch;
}
export function addDiv(data: IData[]): void {
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
