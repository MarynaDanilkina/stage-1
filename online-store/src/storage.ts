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

class Storage {
    data = null;

    setData = (data: null): void => {
        this.data = data;
    };

    getData = () => {
        return this.data;
    };
    getFilteredItems = (
        selectedFirms: Array<string>,
        selectedSeason: Array<string>,
        selectedColor: Array<string>,
        selectedGender: Array<string>,
        selectedSize: Array<string>,
        selectedPopular: string
    ) => {
        let filterdData: IData[] = this.data.slice();
        filterdData = this.filterByFirm(selectedFirms, filterdData);
        filterdData = this.filterBySeason(selectedSeason, filterdData);
        filterdData = this.filterByColor(selectedColor, filterdData);
        filterdData = this.filterByGender(selectedGender, filterdData);
        filterdData = this.filterBySize(selectedSize, filterdData);
        filterdData = this.filterByPopular(selectedPopular, filterdData);
        return filterdData;
    };
    filterByFirm = (selectedFirms: Array<string>, filterdData: IData[]) => {
        if (selectedFirms.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ firm }) => selectedFirms.includes(firm));
    };
    filterBySeason = (selectedSeason: Array<string>, filterdData: IData[]) => {
        if (selectedSeason.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ season }) => selectedSeason.includes(season));
    };
    filterByColor = (selectedColor: Array<string>, filterdData: IData[]) => {
        if (selectedColor.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ color }) => selectedColor.includes(color));
    };
    filterByGender = (selectedGender: Array<string>, filterdData: IData[]) => {
        if (selectedGender.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ gender }) => selectedGender.includes(gender));
    };
    filterBySize = (selectedSize: Array<string>, filterdData: IData[]) => {
        if (selectedSize.length === 0) {
            return filterdData;
        }
        return filterdData.filter(({ size }) => selectedSize.includes(size));
    };
    filterByPopular = (selectedPopular: string, filterdData: IData[]) => {
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
                data.push(user);
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
    getSortData = (value: string, dataNew: IData[]): IData[] => {
        if (value == 'default') {
            return dataNew.sort((a, b) => a.id - b.id);
        }
        if (value == 'ascending-quantity') {
            return dataNew.sort((a, b) => a.quantity - b.quantity);
        }
        if (value == 'descending-quantity') {
            return dataNew.sort((a, b) => b.quantity - a.quantity);
        }
        if (value == 'price-descending') {
            return dataNew.sort((a, b) => a.price - b.price);
        }
        if (value == 'price-ascending') {
            return dataNew.sort((a, b) => b.price - a.price);
        }
        return dataNew;
    };
    getFilterData = (value: string, dataNew: IData[]): IData[] => {
        if (value.length !== 0) {
            return dataNew.filter((user) => user.title.toLowerCase().indexOf(value) > -1);
        }
        return dataNew;
    };
}

const storage = new Storage();
export { storage };
