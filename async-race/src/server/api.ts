const url = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage',
};
export type Car = {
    name: string;
    color: string;
    id: number;
};
export async function getCars(page: number, limit = 7) {
    const res = await fetch(`${url}${path.garage}?_page=${page}&_limit=${limit}`);
    const items: Car[] = await res.json();
    const count = Number(res.headers.get('X-Total-Count'));
    console.log(items);
    console.log(count);
    return { items, count };
}
//export const main = async () => {
//    const car = await getCars(1);
//};
