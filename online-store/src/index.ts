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
}
function addDiv(data: IData[]) {
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
                    <div class="box-info">
                        <p class="box-info__price">${data[i].price}</p>
                        <p class="box-info__quantity">${data[i].quantity}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

getData(url);
