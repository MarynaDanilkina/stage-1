import Storage from '../../src/storage';
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
const items: IData[] = [
    {
        id: 1,
        title: 'Кроссовки мужские FILA Trace Low',
        img: '/58572390299.jpg',
        price: 289,
        firm: 'FILA',
        gender: 'Мужские',
        color: 'Серый',
        season: 'Всесезонный',
        year: 2021,
        quantity: 156,
        popular: 'Да',
        plus: '11',
        minus: '12',
        amount: 0,
        size: '38',
    },
    {
        id: 2,
        title: 'Кроссовки мужские PUMA Interflex Modern',
        img: '/51793890299.jpg',
        price: 229,
        firm: 'PUMA',
        gender: 'Мужские',
        color: 'Серый',
        season: 'Демисезон',
        year: 2020,
        quantity: 200,
        popular: 'Да',
        plus: '21',
        minus: '22',
        amount: 0,
        size: '40',
    },
    {
        id: 3,
        title: 'Кроссовки женские Skechers Arch Fit S-Miles',
        img: '/61706810299.jpg',
        price: 230,
        firm: 'Skechers',
        gender: 'Женские',
        color: 'Белый',
        season: 'Демисезон',
        year: 2021,
        quantity: 205,
        popular: 'Нет',
        plus: '31',
        minus: '32',
        amount: 0,
        size: '37',
    },
    {
        id: 4,
        title: 'Кроссовки женские Skechers UНет - Stand On Air',
        img: '/54177080299.jpg',
        price: 265,
        firm: 'Skechers',
        gender: 'Женские',
        color: 'Бежевый',
        season: 'Лето',
        year: 2022,
        quantity: 100,
        popular: 'Нет',
        plus: '41',
        minus: '42',
        amount: 0,
        size: '38',
    },
    {
        id: 5,
        title: 'Кроссовки женские Demix Serena 2',
        img: '/61706250299.jpg',
        price: 101,
        firm: 'Demix',
        gender: 'Женские',
        color: 'Белый',
        season: 'Демисезон',
        year: 2021,
        quantity: 350,
        popular: 'Да',
        plus: '51',
        minus: '52',
        amount: 0,
        size: '40',
    },
];
let storage: Storage;
describe('getSortData', () => {
    it('should return sorted array by default', () => {
        storage = new Storage();
        expect(storage.getSortData('default', [items[0], items[1], items[2], items[3], items[4]])).toStrictEqual([
            items[0],
            items[1],
            items[2],
            items[3],
            items[4],
        ]);
    });
    it('should return sorted array by ascending-quantity', () => {
        storage = new Storage();
        expect(
            storage.getSortData('ascending-quantity', [items[0], items[1], items[2], items[3], items[4]])
        ).toStrictEqual([items[3], items[0], items[1], items[2], items[4]]);
    });
    it('should return sorted array by descending-quantity', () => {
        storage = new Storage();
        expect(
            storage.getSortData('descending-quantity', [items[0], items[1], items[2], items[3], items[4]])
        ).toStrictEqual([items[4], items[2], items[1], items[0], items[3]]);
    });
    it('should return sorted array by price-descending', () => {
        storage = new Storage();
        expect(
            storage.getSortData('price-descending', [items[0], items[1], items[2], items[3], items[4]])
        ).toStrictEqual([items[4], items[1], items[2], items[3], items[0]]);
    });
    it('should return sorted array by price-ascending', () => {
        storage = new Storage();
        expect(
            storage.getSortData('price-ascending', [items[0], items[1], items[2], items[3], items[4]])
        ).toStrictEqual([items[0], items[3], items[2], items[1], items[4]]);
    });
});
describe('filterByFirm', () => {
    it('display the filtered array by PUMA and Skechers', () => {
        storage = new Storage();
        expect(storage.filterByFirm(['PUMA', 'Skechers'], items)).toStrictEqual([items[1], items[2], items[3]]);
    });
    it('display the filtered array by Skechers and Demix', () => {
        storage = new Storage();
        expect(storage.filterByFirm(['Skechers', 'Demix'], items)).toStrictEqual([items[2], items[3], items[4]]);
    });
    it('display the filtered array by Demix and FILA', () => {
        storage = new Storage();
        expect(storage.filterByFirm(['Demix', 'FILA'], items)).toStrictEqual([items[0], items[4]]);
    });
});
describe('filterBySeason', () => {
    it('display the filtered array by summer and demi-season', () => {
        storage = new Storage();
        expect(storage.filterBySeason(['Лето', 'Демисезон'], items)).toStrictEqual([
            items[1],
            items[2],
            items[3],
            items[4],
        ]);
    });
    it('display the filtered array by summer and all season', () => {
        storage = new Storage();
        expect(storage.filterBySeason(['Лето', 'Всесезонный'], items)).toStrictEqual([items[0], items[3]]);
    });
});
describe('filterByColor', () => {
    it('display the filtered array by gray and white', () => {
        storage = new Storage();
        expect(storage.filterByColor(['Серый', 'Белый'], items)).toStrictEqual([
            items[0],
            items[1],
            items[2],
            items[4],
        ]);
    });
    it('display the filtered array by beige and white', () => {
        storage = new Storage();
        expect(storage.filterByColor(['Бежевый', 'Белый'], items)).toStrictEqual([items[2], items[3], items[4]]);
    });
});
describe('filterByGender', () => {
    it('display the filtered array by male', () => {
        storage = new Storage();
        expect(storage.filterByGender(['Мужские'], items)).toStrictEqual([items[0], items[1]]);
    });
    it('display the filtered array by female', () => {
        storage = new Storage();
        expect(storage.filterByGender(['Женские'], items)).toStrictEqual([items[2], items[3], items[4]]);
    });
    it('display the filtered array by female and male', () => {
        storage = new Storage();
        expect(storage.filterByGender(['Женские', 'Мужские'], items)).toStrictEqual([
            items[0],
            items[1],
            items[2],
            items[3],
            items[4],
        ]);
    });
});
describe('filterBySize', () => {
    it('display the filtered array by Size 40 and 38', () => {
        storage = new Storage();
        expect(storage.filterBySize(['40', '38'], items)).toStrictEqual([items[0], items[1], items[3], items[4]]);
    });
    it('display the filtered array by Size 37 and 40', () => {
        storage = new Storage();
        expect(storage.filterBySize(['37', '40'], items)).toStrictEqual([items[1], items[2], items[4]]);
    });
    it('display the filtered array by Size 37 and 38 and ', () => {
        storage = new Storage();
        expect(storage.filterBySize(['37', '38'], items)).toStrictEqual([items[0], items[2], items[3]]);
    });
});
describe('filterByPopular', () => {
    it('display the filtered array by Popular', () => {
        storage = new Storage();
        expect(storage.filterByPopular('Да', items)).toStrictEqual([items[0], items[1], items[4]]);
    });
    it('display the filtered array by not popular', () => {
        storage = new Storage();
        expect(storage.filterByPopular('Нет', items)).toStrictEqual([items[2], items[3]]);
    });
    it('display the filtered array by all', () => {
        storage = new Storage();
        expect(storage.filterByPopular('', items)).toStrictEqual(items);
    });
});
describe('filterByPopular', () => {
    it('display the filtered array by Price from 101 to 270', () => {
        storage = new Storage();
        expect(storage.getPrice('101', '270', items)).toStrictEqual([items[1], items[2], items[3], items[4]]);
    });
    it('display the filtered array by Price from 101 to 230', () => {
        storage = new Storage();
        expect(storage.getPrice('101', '230', items)).toStrictEqual([items[1], items[2], items[4]]);
    });
    it('display the filtered array by Price if there is no value', () => {
        storage = new Storage();
        expect(storage.getPrice('', '', items)).toStrictEqual(items);
    });
});
describe('getQuantit', () => {
    it('display the filtered array by Quantit from 150 to 200', () => {
        storage = new Storage();
        expect(storage.getQuantit('150', '200', items)).toStrictEqual([items[0], items[1]]);
    });
    it('display the filtered array by Quantit if there is no value', () => {
        storage = new Storage();
        expect(storage.getQuantit('', '', items)).toStrictEqual(items);
    });
});
describe('getSearchData', () => {
    it('display the filtered array by getSearchData ', () => {
        storage = new Storage();
        expect(storage.getSearchData('', items)).toStrictEqual(items);
    });
    it('display the filtered array by getSearchData ', () => {
        storage = new Storage();
        expect(storage.getSearchData('женские', items)).toStrictEqual([items[2], items[3], items[4]]);
    });
});
