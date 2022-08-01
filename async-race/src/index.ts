import './global.css';
import { getPage } from './components/page';
import { getGarage } from './components/garage';
import { getCars, createCar, deleteCar, updateCar, startCar, stoptCar, switchCar } from './server/api';
import { storage } from './server/store';
import { generateRandomCars } from './random';
import { animation, requestID } from './animation';
export let pages = localStorage.getItem('pages') || '1';
storage.setPages(+pages);
await getCars(+pages);
getPage();

const newForm = document.getElementById('new-form') as HTMLDivElement;
const garage = document.getElementById('garage') as HTMLDivElement;
const winners = document.getElementById('winners') as HTMLDivElement;
const buttonReset = <HTMLButtonElement>document.getElementById('reset');
(<HTMLElement>document.querySelector('#body')).addEventListener('click', async (e) => {
    const target = <HTMLButtonElement>e.target;
    if (target.classList.contains('button__remove')) {
        const id = Number(target.id.split('car')[1]);
        await deleteCar(id);
        await getCars(+pages);
        garage.innerHTML = getGarage();
    }
    if (target.classList.contains('button__select')) {
        const editName = document.getElementById('edit-name') as HTMLInputElement;
        const editColor = document.getElementById('edit-color') as HTMLInputElement;
        const editButton = document.getElementById('edit-btn') as HTMLInputElement;
        storage.setID(target.id.split('car')[1]);
        editName.disabled = false;
        editColor.disabled = false;
        editButton.disabled = false;
    }
    if (target.classList.contains('button_next')) {
        pages = '' + storage.getPagesNext();
        localStorage.setItem('pages', pages);
        await getCars(+pages);
        garage.innerHTML = getGarage();
    }
    if (target.classList.contains('button_prev')) {
        pages = '' + storage.getPagesPrev();
        localStorage.setItem('pages', pages);
        await getCars(+pages);
        garage.innerHTML = getGarage();
    }
    if (target.classList.contains('garage_button')) {
        winners.style.display = 'none';
        garage.style.display = 'block';
    }
    if (target.classList.contains('winners_button')) {
        garage.style.display = 'none';
        winners.style.display = 'block';
    }
    if (target.classList.contains('button-generate')) {
        const randomCars = generateRandomCars();
        randomCars.map(async (car) => {
            await createCar(car);
        });
        await getCars(+pages);
        garage.innerHTML = getGarage();
    }
    if (target.classList.contains('button__start')) {
        storage.setID(target.id.split('car')[1]);
        const id = storage.getID();
        startDriving(id);
        target.disabled = true;
        const buttonStop = <HTMLButtonElement>document.getElementById(`stop-car${id}`);
        buttonStop.disabled = false;
    }
    if (target.classList.contains('button__stop')) {
        storage.setID(target.id.split('car')[1]);
        const id = storage.getID();
        stopDriving(id);
        target.disabled = true;
        const buttonStart = <HTMLButtonElement>document.getElementById(`start-car${id}`);
        buttonStart.disabled = false;
    }
    if (target.classList.contains('button-race')) {
        const cars = storage.getСars();
        cars.map((car) => startDriving(`${car.id}`));
        target.disabled = true;
        buttonReset.disabled = false;
    }
    if (target.classList.contains('button-reset')) {
        const cars = storage.getСars();
        cars.map((car) => stopDriving(`${car.id}`));
        target.disabled = false;
        buttonReset.disabled = true;
    }
});
async function stopDriving(id: string) {
    await stoptCar(id);
    const car = <HTMLElement>document.getElementById(`car__${id}`);
    car.style.transform = `translateX(0px)`;
    cancelAnimationFrame(requestID);
}

async function startDriving(id: string) {
    const { velocity, distance } = await startCar(id);
    const time = Math.round(distance / velocity);
    const car = <HTMLElement>document.getElementById(`car__${id}`);
    const result = car.getBoundingClientRect();
    const finish = <HTMLElement>document.getElementById(`finish__${id}`);
    const result1 = finish.getBoundingClientRect();
    const distanceEl = result1.left - result.left + 50;
    animation(car, distanceEl, time);
    const { success } = await switchCar(id);
    if (!success) {
        cancelAnimationFrame(requestID);
    }
    return { id, time, success };
}

newForm.addEventListener('submit', async () => {
    const newName = document.getElementById('new-name') as HTMLInputElement;
    const newColor = document.getElementById('new-color') as HTMLInputElement;
    await createCar({ name: newName.value, color: newColor.value });
    await getCars(+pages);
    garage.innerHTML = getGarage();
});

const editForm = document.getElementById('edit-form') as HTMLInputElement;
editForm.addEventListener('submit', async () => {
    const editName = document.getElementById('edit-name') as HTMLInputElement;
    const editColor = document.getElementById('edit-color') as HTMLInputElement;
    const id = storage.getID();
    await updateCar(id, { name: editName.value, color: editColor.value });
});
