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
const BtnFilter = document.querySelectorAll<HTMLElement>('.sidebar-left__button');
const basketContainer = <HTMLElement>document.querySelector('.product-container');
const quantity = <HTMLElement>document.querySelector('.quantity');
const buttonReset = <HTMLElement>document.querySelector('.button__reset');
const SortContainer = <HTMLSelectElement>document.querySelector('select');
const select = <HTMLSelectElement>document.querySelector('.container__sort');
const input = <HTMLInputElement>document.getElementById('filter_users');
const rangePrice = document.querySelectorAll<HTMLInputElement>('.range-slider input[type="range"]');
const progressPrice = <HTMLElement>document.querySelector('.range-slider .progress');
const valuePrice = document.querySelectorAll<HTMLInputElement>('.numberVal input');
const rangeQuantity = document.querySelectorAll<HTMLInputElement>('.range-slider__quantity input[type="range"]');
const progressQuantity = <HTMLElement>document.querySelector('.range-slider__quantity .progress__quantity');
const valueQuantity = document.querySelectorAll<HTMLInputElement>('.numberVal__quantity input');
const buttonResetSettings = <HTMLElement>document.querySelector('.reset-settings');

getData();

function getDataNew(data: IData[]): void {
    BtnFilter.forEach((el) => el.addEventListener('click', (e) => filterActive(e, data)));
    rangePrice.forEach((input) => input.addEventListener('input', () => mainFunction(data)));
    buttonReset.addEventListener('click', (e) => AllMetod(e, data));
    basketContainer.addEventListener('click', (e) => AllMetod(e, data));
    SortContainer.addEventListener('change', (e) => AllMetod(e, data));
    input.addEventListener('keyup', (e) => AllMetod(e, data));
    buttonResetSettings.addEventListener('click', clear);
    rangeQuantity.forEach((input) => input.addEventListener('input', (e) => AllMetod(e, data)));
    mainFunction(data);
}

function AllMetod(e: Event, data: IData[]): void {
    basketContainer.innerHTML = '';
    const dataNew = data.slice();
    const dataQuantity = filterQuantity(e, dataNew);
    const dataReset: IData[] = ResetFunction(e, dataQuantity, dataNew);
    const dataSort = SortFunction(e, dataReset);
    const dataInput = Search(e, dataSort);
    addDiv(dataInput);
}
function clear() {
    localStorage.clear();
    window.location.reload();
}
function filterActive(e: Event, data: IData[]): void {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('checkbox-box')) {
        target.classList.toggle('active__button');
    }
    mainFunction(data);
}
function minPriceFunction() {
    const rangeMin = rangePrice[0];
    const minrange = parseInt(rangeMin.value);
    const rangeMinMax = rangeMin.max;
    progressPrice.style.left = (minrange / +rangeMinMax) * 100 + '%';
    valuePrice[0].value = `${minrange}`;
    return valuePrice[0].value;
}
function maxPriceFunction() {
    const rangeMax = rangePrice[1];
    const maxrange = parseInt(rangeMax.value);
    const rangeMaxMax = rangeMax.max;
    progressPrice.style.right = 100 - (maxrange / +rangeMaxMax) * 100 + '%';
    valuePrice[1].value = `${maxrange}`;
    return valuePrice[1].value;
}
function minQuantitFunction() {
    const rangeQuantityMin = rangeQuantity[0];
    const minrangeQuantit = parseInt(rangeQuantityMin.value);
    const rangeQuantityMinMax = rangeQuantityMin.max;
    progressQuantity.style.left = (minrangeQuantit / +rangeQuantityMinMax) * 100 + '%';
    valueQuantity[0].value = `${minrangeQuantit}`;
    return valueQuantity[0].value;
}
function maxQuantitFunction() {
    const rangeQuantityMax = rangeQuantity[1];
    const maxrangeQuantit = parseInt(rangeQuantityMax.value);
    const rangeQuantityMaxMax = rangeQuantityMax.max;
    progressQuantity.style.right = 100 - (maxrangeQuantit / +rangeQuantityMaxMax) * 100 + '%';
    valueQuantity[1].value = `${maxrangeQuantit}`;
    return valueQuantity[1].value;
}
function filterQuantity(e: Event, dataPrice: IData[]): IData[] {
    const minQuantit = minQuantitFunction();
    const maxQuantit = maxQuantitFunction();

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
        valuePrice[0].value = '0';
        valuePrice[1].value = '400';
        progressPrice.style.left = 0 + '%';
        progressPrice.style.right = 0 + '%';
        rangePrice[0].value = `0`;
        rangePrice[1].value = `400`;
        valueQuantity[0].value = '0';
        valueQuantity[1].value = '400';
        progressQuantity.style.left = 0 + '%';
        progressQuantity.style.right = 0 + '%';
        rangeQuantity[0].value = `0`;
        rangeQuantity[1].value = `400`;
        return dataNew;
    }
    return dataFilter;
}

function basketFunction(e: Event, data: IData[]) {
    const target = <HTMLElement>e.target;
    const datasetId: string = target.dataset.id || '';
    if (target.classList.contains('plus')) {
        const max = storage.getbasketData(data);
        data = storage.getPlusData(datasetId, data, max);
        const basketSum = '' + storage.getbasketData(data);
        showbasket(+basketSum);
        mainFunction(data);
    }
    if (target.classList.contains('minus')) {
        data = storage.getMinusData(datasetId, data);
        const basketSum = '' + storage.getbasketData(data);
        showbasket(+basketSum);
        mainFunction(data);
    }
}
function mainFunction(data: IData[]) {
    const minPrice = minPriceFunction();
    const maxPrice = maxPriceFunction();

    const selectedFirms: Array<string> = [];
    const selectedSeason: Array<string> = [];
    const selectedColor: Array<string> = [];
    const selectedGender: Array<string> = [];
    const selectedSize: Array<string> = [];
    let selectedPopular = '';

    const activeButton = document.querySelectorAll<HTMLElement>('.active__button');
    activeButton.forEach((el) => {
        if (el.dataset.firm) {
            selectedFirms.push(el.dataset.firm);
        }
        if (el.dataset.season) {
            selectedSeason.push(el.dataset.season);
        }
        if (el.dataset.color) {
            selectedColor.push(el.dataset.color);
        }
        if (el.dataset.size) {
            selectedSize.push(el.dataset.size);
        }
        if (el.dataset.popular) {
            selectedPopular += el.dataset.popular;
        }
        if (el.dataset.gender) {
            selectedGender.push(el.dataset.gender);
        }
    });

    data = storage.getFilteredItems(
        selectedFirms,
        selectedSeason,
        selectedColor,
        selectedGender,
        selectedSize,
        selectedPopular
    );
    data = storage.getPrice(minPrice, maxPrice, data);
    addDiv(data);
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
console.log(`
Самопроверка: 213 / 220;
1)Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10
2)Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине +10
3)Добавление товаров в корзину +20
кликая по карточке с товаром или по кнопке на нем, товар можно добавлять в корзину или удалять. Карточки добавленных в корзину товаров внешне отличаются от остальных +10
на странице отображается количество добавленных в корзину товаров. При попытке добавить в корзину больше 20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" +10
4)Сортировка +20
Сортируются только те товары, которые в данный момент отображаются на странице
сортировка товаров по количеству в возрастающем и убывающем порядке +10
сортировка товаров по цене их выхода на рынок в возрастающем и убывающем порядке +10
5)Фильтры в указанном диапазоне от и до +30
фильтры по количеству +10
фильтры по цене +10
При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка +10
6)Фильтры по значению +30
Выбранные фильтры выделяются стилем.
фильтры по производителю +5
фильтры по цвету +5
фильтры по размеру +5
можно отобразить только популярные товары +5
можно отфильтровать товары по нескольким фильтрам одного типа +10
7)Можно отфильтровать товары по нескольким фильтрам разного типа +20
Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам.
Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом формате, например, "Извините, совпадений не обнаружено"
8)Сброс фильтров +20
есть кнопка reset для сброса фильтров +10
Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или товары, добавленные в избранное.
После использования кнопки reset фильтры остаются работоспособными
при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом +10
9)Сохранение настроек в local storage +15
добавленные в избранное товары сохраняются при перезагрузке страницы +5
Есть кнопка сброса настроек, которая очищает local storage +10
10)Поиск +28
при открытии приложения курсор находится в поле поиска +2
автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) +2
есть placeholder +2
если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено" +2
при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается +10
Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.
если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки +10
`);
