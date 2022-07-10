import { storage } from './storage';
import { getDataNew } from './index';

export async function getData() {
    const data = await getSomeData();
    storage.setData(data);
    getDataNew(data);
}

async function getSomeData() {
    const url = './data.json';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
