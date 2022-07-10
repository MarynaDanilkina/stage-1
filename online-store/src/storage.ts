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
}

const storage = new Storage();
export { storage };
