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

    setData = (data: null) => {
        this.data = data;
    };

    getData = () => {
        return this.data;
    };
    getDataFirm = (
        value1: Array<string>,
        value2: Array<string>,
        value3: Array<string>,
        value4: Array<string>,
        value5: string,
        value6: Array<string>,
        dataNew: IData[]
    ) => {
        let result1: IData[] = [];
        let result2: IData[] = [];
        let result3: IData[] = [];
        let result4: IData[] = [];
        let result5: IData[] = [];
        const result6: IData[] = [];
        if (value1.length !== 0) {
            for (let i = 0; i < value1.length; i++) {
                dataNew.filter(function (user) {
                    if (user.firm.indexOf(value1[i]) > -1) {
                        result1.push(user);
                    }
                });
            }
        } else {
            result1 = dataNew;
        }
        if (value2.length !== 0) {
            for (let i = 0; i < value2.length; i++) {
                result1.filter(function (user) {
                    if (user.season.indexOf(value2[i]) > -1) {
                        result2.push(user);
                    }
                });
            }
        } else {
            result2 = result1;
        }
        if (value3.length !== 0) {
            for (let i = 0; i < value3.length; i++) {
                result2.filter(function (user) {
                    if (user.color.indexOf(value3[i]) > -1) {
                        result3.push(user);
                    }
                });
            }
        } else {
            result3 = result2;
        }
        if (value4.length !== 0) {
            for (let i = 0; i < value4.length; i++) {
                result3.filter(function (user) {
                    if (user.size.indexOf(value4[i]) > -1) {
                        result4.push(user);
                    }
                });
            }
        } else {
            result4 = result3;
        }
        if (value5.length !== 0) {
            result4.filter(function (user) {
                if (user.popular.indexOf(value5) > -1) {
                    result5.push(user);
                }
            });
        } else {
            result5 = result4;
        }
        if (value6.length !== 0) {
            for (let i = 0; i < value6.length; i++) {
                result5.filter(function (user) {
                    if (user.gender.indexOf(value6[i]) > -1) {
                        result6.push(user);
                    }
                });
            }
        } else {
            return result5;
        }
        return result6;
    };
    getbasketData = (value: IData[]) => {
        return value.reduce((acc, num) => acc + num.amount, 0);
    };
    getPlusData = (value: string, dataNew: IData[], max: number) => {
        if (max < 20) {
            dataNew.filter((user) => {
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
        return dataNew;
    };

    getMinusData = (value: string, dataNew: IData[]) => {
        dataNew.filter((user) => {
            if (user.minus == value) {
                if (user.amount > 0) {
                    user.amount--;
                    user.quantity++;
                }
            }
        });
        return dataNew;
    };
    getSortData = (value: string, dataNew: IData[]) => {
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
    getFilterData = (value: string, dataNew: IData[]) => {
        if (value.length !== 0) {
            return dataNew.filter((user) => user.title.toLowerCase().indexOf(value) > -1);
        }

        return dataNew;
    };

    getPrice = (min: string, max: string, dataNew: IData[]) => {
        const data: IData[] = [];
        if (!min) {
            return dataNew;
        }
        dataNew.filter((user) => {
            if (user.price >= +min && user.price <= +max) {
                data.push(user);
            }
        });
        return data;
    };
}

const storage = new Storage();
export { storage };
