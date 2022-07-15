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
const mapper: Record<string, (a: IData, b: IData) => number> = {
    default: (a, b) => a.id - b.id,
    'ascending-quantity': (a, b) => a.quantity - b.quantity,
    'descending-quantity': (a, b) => b.quantity - a.quantity,
    'price-descending': (a, b) => a.price - b.price,
    'price-ascending': (a, b) => b.price - a.price,
};
class Storage {
    data!: IData[];

    setData = (data: IData[]): void => {
        this.data = data;
    };

    getData = (): IData[] => {
        return this.data;
    };
    getFilteredItems = (
        selectedFirms: Array<string>,
        selectedSeason: Array<string>,
        selectedColor: Array<string>,
        selectedGender: Array<string>,
        selectedSize: Array<string>,
        selectedPopular: string,
        filterdData: IData[]
    ): IData[] => {
        filterdData = this.filterByFirm(selectedFirms, filterdData);
        filterdData = this.filterBySeason(selectedSeason, filterdData);
        filterdData = this.filterByColor(selectedColor, filterdData);
        filterdData = this.filterByGender(selectedGender, filterdData);
        filterdData = this.filterBySize(selectedSize, filterdData);
        filterdData = this.filterByPopular(selectedPopular, filterdData);
        return filterdData;
    };
    filterByFirm = (selectedFirms: Array<string>, filterdData: IData[]): IData[] => {
        if (selectedFirms.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ firm }) => selectedFirms.includes(firm));
    };
    filterBySeason = (selectedSeason: Array<string>, filterdData: IData[]): IData[] => {
        if (selectedSeason.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ season }) => selectedSeason.includes(season));
    };
    filterByColor = (selectedColor: Array<string>, filterdData: IData[]): IData[] => {
        if (selectedColor.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ color }) => selectedColor.includes(color));
    };
    filterByGender = (selectedGender: Array<string>, filterdData: IData[]): IData[] => {
        if (selectedGender.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ gender }) => selectedGender.includes(gender));
    };
    filterBySize = (selectedSize: Array<string>, filterdData: IData[]): IData[] => {
        if (selectedSize.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ size }) => selectedSize.includes(size));
    };
    filterByPopular = (selectedPopular: string, filterdData: IData[]): IData[] => {
        if (selectedPopular.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ popular }) => selectedPopular.includes(popular));
    };
    getPrice = (min: string, max: string, data: IData[]): IData[] => {
        const dataNew: IData[] = [];
        if (!min) {
            return data;
        }
        data.filter((user) => {
            if (user.price >= +min && user.price <= +max) {
                dataNew.push(user);
            }
        });
        return dataNew;
    };
    getQuantit = (min: string, max: string, data: IData[]): IData[] => {
        const dataNew: IData[] = [];
        if (!min) {
            return data;
        }
        data.filter((user) => {
            if (user.quantity >= +min && user.quantity <= +max) {
                dataNew.push(user);
            }
        });
        return dataNew;
    };
    getbasketData = (value: IData[]): number => {
        return value.reduce((acc, num) => acc + num.amount, 0);
    };
    getPlusData = (value: string, data: IData[], max: number): IData[] => {
        if (max < 20) {
            data.filter((user) => {
                if (user.plus == value) {
                    if (user.quantity > 0) {
                        user.amount++;
                        user.quantity--;
                    }
                }
            });
        } else {
            alert('Извините, все слоты заполнены');
        }
        return data;
    };
    getMinusData = (value: string, data: IData[]): IData[] => {
        data.filter((user) => {
            if (user.minus == value) {
                if (user.amount > 0) {
                    user.amount--;
                    user.quantity++;
                }
            }
        });
        return data;
    };
    getSortData = (value: string, data: IData[]) => {
        return data.sort(mapper[value]);
    };
    getSearchData = (value: string, data: IData[]): IData[] => {
        if (value.length !== 0) {
            return data.filter((user) => user.title.toLowerCase().indexOf(value) > -1);
        }
        return data;
    };
}

const storage = new Storage();
export { storage };
