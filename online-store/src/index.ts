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
getData();

function getDataNew(data: IData[]) {
    addDiv(data);
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
