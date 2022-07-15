import { storage } from './storage';
import { getDataNew } from './index';
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
export async function getData(): Promise<void> {
    const data: IData[] = await getSomeData();
    storage.setData(data);
    getDataNew();
}

async function getSomeData(): Promise<IData[]> {
    const url = './data.json';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
