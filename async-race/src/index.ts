import './global.css';
import { drawPage } from './components/page';
import { drawGarage } from './components/garage';
import { getCars, createCar, deleteCar, updateCar, stoptCar, getWinners, deleteWinner } from './server/api';
import { storage } from './server/store';
import { generateRandomCars } from './random';
import { animationID } from './race';
import { startDriving } from './race';
export let pages = localStorage.getItem('pages') || '1';
import { drawWinners } from './components/winners';
storage.setPages(+pages);
await getCars(+pages);
await getWinners(+pages);
drawPage();
getWinners(1);
const newForm = document.getElementById('new-form') as HTMLDivElement;
const garage = document.getElementById('garage') as HTMLDivElement;
const winners = document.getElementById('winners') as HTMLDivElement;
const prev = <HTMLButtonElement>document.getElementById('prev');
const next = <HTMLButtonElement>document.getElementById('next');
const buttonReset = <HTMLButtonElement>document.getElementById('reset');
const buttonRace = <HTMLButtonElement>document.getElementById('race');
import { race } from './race';
(<HTMLElement>document.querySelector('#body')).addEventListener('click', async (e) => {
    const target = <HTMLButtonElement>e.target;
    if (target.classList.contains('button__remove')) {
        const id = Number(target.id.split('car')[1]);
        await deleteCar(id);
        await getCars(+pages);
        garage.innerHTML = drawGarage();
        await deleteWinner(id);
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
        garage.innerHTML = drawGarage();
    }
    if (target.classList.contains('button_prev')) {
        pages = '' + storage.getPagesPrev();
        localStorage.setItem('pages', pages);
        await getCars(+pages);
        garage.innerHTML = drawGarage();
    }
    if (target.classList.contains('garage_button')) {
        winners.style.display = 'none';
        garage.style.display = 'block';
    }
    if (target.classList.contains('winners_button')) {
        garage.style.display = 'none';
        winners.style.display = 'block';
        await getWinners(1);
        winners.innerHTML = drawWinners();
    }
    if (target.classList.contains('button-generate')) {
        const randomCars = generateRandomCars();
        randomCars.map(async (car) => {
            await createCar(car);
        });
        await getCars(+pages);
        garage.innerHTML = drawGarage();
    }
    if (target.classList.contains('button__start')) {
        storage.setID(target.id.split('car')[1]);
        const id = storage.getID();
        startDriving(+id);
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
        buttonRace.disabled = true;
        buttonReset.disabled = false;
        prev.disabled = true;
        next.disabled = true;
        const winner = await race();
    }
    if (target.classList.contains('button-reset')) {
        const cars = storage.getСars();
        cars.map((car) => stopDriving(`${car.id}`));
        buttonRace.disabled = false;
        buttonReset.disabled = true;
        prev.disabled = false;
        next.disabled = false;
    }
});
async function stopDriving(id: string) {
    await stoptCar(id);
    const car = <HTMLElement>document.getElementById(`car__${id}`);
    car.style.transform = `translateX(0px)`;
    window.cancelAnimationFrame(animationID[+id].id);
}

newForm.addEventListener('submit', async () => {
    const newName = document.getElementById('new-name') as HTMLInputElement;
    const newColor = document.getElementById('new-color') as HTMLInputElement;
    await createCar({ name: newName.value, color: newColor.value });
    await getCars(+pages);
    garage.innerHTML = drawGarage();
});

const editForm = document.getElementById('edit-form') as HTMLInputElement;
editForm.addEventListener('submit', async () => {
    const editName = document.getElementById('edit-name') as HTMLInputElement;
    const editColor = document.getElementById('edit-color') as HTMLInputElement;
    const id = storage.getID();
    await updateCar(id, { name: editName.value, color: editColor.value });
});
