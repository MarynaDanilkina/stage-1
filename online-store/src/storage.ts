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
}

const storage = new Storage();
export { storage };
