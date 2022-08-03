import { storage } from './store';
import { Сars, Car, Winner } from '../type';
const url = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners',
};
export async function getCars(page: number, limit = 7) {
    const res = await fetch(`${url}${path.garage}?_page=${page}&_limit=${limit}`);
    const data: Сars[] = await res.json();
    storage.setСars(data);
    const count = Number(res.headers.get('X-Total-Count'));
    storage.setCarsCount(count);
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
export async function deleteCar(id: number) {
    const res = await fetch(`${url}${path.garage}/${id}`, {
        method: 'DELETE',
    });
    return await res.json();
}
export async function getCar(id: string): Promise<Сars> {
    const res = await fetch(`${url}${path.garage}/${id}`);
    return await res.json();
}
export async function updateCar(id: string, body: Car) {
    const res = await fetch(`${url}${path.garage}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return await res.json();
}
export async function startCar(id: number) {
    const res = await fetch(`${url}${path.engine}?id=${id}&status=started`, { method: 'PATCH' });
    return await res.json();
}
export async function stoptCar(id: string) {
    const res = await fetch(`${url}${path.engine}?id=${id}&status=stopped`, { method: 'PATCH' });
    return await res.json();
}
export async function switchCar(id: number) {
    const res = await fetch(`${url}${path.engine}?id=${id}&status=drive`, { method: 'PATCH' });
    if (res.status !== 200) {
        return { success: false };
    }
    return await res.json();
}
export async function getWinners(page: number, limit = 10) {
    const res = await fetch(`${url}${path.winners}?_page=${page}&_limit=${limit}`);
    const data: Winner[] = await res.json();
    const count = Number(res.headers.get('X-Total-Count'));
    storage.setWinnersCount(count);
    const x = await Promise.all(
        data.map(async (winner: Winner) => ({
            winner,
            car: await getCar(`${winner.id}`),
        }))
    );
    storage.setWinners(x);
}
export async function getWinner(id: number) {
    const res = await fetch(`${url}${path.winners}?id=${id}`);
    return await res.json();
}

export async function сreateWinners({ id, time, wins }: Winner) {
    const res = await fetch(`${url}${path.winners}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, time, wins }),
    });
    return await res.json();
}

export async function updateWinner(id: number, body: Winner) {
    const res = await fetch(`${url}${path.winners}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return await res.json();
}

export async function deleteWinner(id: number) {
    const res = await fetch(`${url}${path.winners}/${id}`, { method: 'DELETE' });
    return await res.json();
}
