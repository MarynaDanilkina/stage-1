const url = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage',
};
export type Cars = {
    name: string;
    color: string;
    id: number;
};
export type Car = {
    name: string;
    color: string;
};
export async function getCars(page: number, limit = 7) {
    const res = await fetch(`${url}${path.garage}?_page=${page}&_limit=${limit}`);
    const items: Cars[] = await res.json();
    const count = Number(res.headers.get('X-Total-Count'));
    return { items, count };
}
export async function createCar(car: Car) {
    const res = await fetch(`${url}${path.garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });
    return await res.json();
}
//export const main = async () => {
//    const car = await getCars(1);
//};
