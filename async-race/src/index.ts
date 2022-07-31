import './global.css';
import { getPage } from './components/page';
import { getGarage } from './components/garage';
import { getCars, createCar, deleteCar, updateCar, startCar } from './server/api';
import { storage } from './server/store';
import { generateRandomCars } from './random';
import { stat } from 'fs';
export let pages = localStorage.getItem('pages') || '1';
storage.setPages(+pages);
await getCars(+pages);
getPage();

const newForm = document.getElementById('new-form') as HTMLDivElement;
const garage = document.getElementById('garage') as HTMLDivElement;
const winners = document.getElementById('winners') as HTMLDivElement;
(<HTMLElement>document.querySelector('#body')).addEventListener('click', async (e) => {
    const target = <HTMLElement>e.target;
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
        const { velocity, distance } = await startCar(id);
        const time = Math.round(distance / velocity);
        const car = <HTMLElement>document.getElementById(`car__${id}`);
        const result = car.getBoundingClientRect();
        console.log(result);
        const finish = <HTMLElement>document.getElementById(`finish__${id}`);
        const result1 = finish.getBoundingClientRect();
        console.log(result1);
        const distanceEl = result1.left - result.left + 50;
        animation(car, distanceEl, time);
    }
});
export const animation = (car: HTMLElement, distanceEl: number, timeAn: number) => {
    const start = performance.now();
    requestAnimationFrame(function animate(time: number) {
        let timeFraction = (time - start) / timeAn;
        if (timeFraction > 1) timeFraction = 1;
        car.style.transform = `translateX(${timeFraction * distanceEl}px)`;
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
};
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
