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
export let pagesWinners = 1;
await getCars(+pages);
await getWinners(pagesWinners);
drawPage();

getWinners(pagesWinners);
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
        removeCar(target);
    }
    if (target.classList.contains('button__select')) {
        selectCar(target);
    }
    if (target.classList.contains('button_next')) {
        nextButton();
    }
    if (target.classList.contains('button_prev')) {
        prevButton();
    }
    if (target.classList.contains('button_nextWin')) {
        nextButtonWin();
    }
    if (target.classList.contains('button_prevWin')) {
        prewButtonWin();
    }
    if (target.classList.contains('garage_button')) {
        winners.style.display = 'none';
        garage.style.display = 'block';
    }
    if (target.classList.contains('winners_button')) {
        winnerButton();
    }
    if (target.classList.contains('button-generate')) {
        randomButton();
    }
    if (target.classList.contains('button__start')) {
        startButton(target);
    }
    if (target.classList.contains('button__stop')) {
        stopButton(target);
    }
    if (target.classList.contains('button-race')) {
        raceButton();
    }
    if (target.classList.contains('button-reset')) {
        resetButton();
    }
});
async function removeCar(target: HTMLButtonElement) {
    const id = Number(target.id.split('car')[1]);
    await deleteCar(id);
    await getCars(+pages);
    garage.innerHTML = drawGarage();
    await deleteWinner(id);
}
async function selectCar(target: HTMLButtonElement) {
    const editName = document.getElementById('edit-name') as HTMLInputElement;
    const editColor = document.getElementById('edit-color') as HTMLInputElement;
    const editButton = document.getElementById('edit-btn') as HTMLInputElement;
    storage.setID(target.id.split('car')[1]);
    editName.disabled = false;
    editColor.disabled = false;
    editButton.disabled = false;
}
async function nextButton() {
    pages = '' + storage.getPagesNext();
    localStorage.setItem('pages', pages);
    await getCars(+pages);
    garage.innerHTML = drawGarage();
}
async function prevButton() {
    pages = '' + storage.getPagesPrev();
    localStorage.setItem('pages', pages);
    await getCars(+pages);
    garage.innerHTML = drawGarage();
}
async function nextButtonWin() {
    pagesWinners += 1;
    await getWinners(pagesWinners);
    winners.innerHTML = drawWinners();
}
async function prewButtonWin() {
    if (pagesWinners === 1) {
        pagesWinners = 1;
    } else {
        pagesWinners -= 1;
    }
    await getWinners(pagesWinners);
    winners.innerHTML = drawWinners();
}
async function winnerButton() {
    garage.style.display = 'none';
    winners.style.display = 'block';
    await getWinners(1);
    winners.innerHTML = drawWinners();
}
async function randomButton() {
    const randomCars = generateRandomCars();
    randomCars.map(async (car) => {
        await createCar(car);
    });
    await getCars(+pages);
    garage.innerHTML = drawGarage();
}
async function startButton(target: HTMLButtonElement) {
    storage.setID(target.id.split('car')[1]);
    const id = storage.getID();
    startDriving(+id);
    target.disabled = true;
    const buttonStop = <HTMLButtonElement>document.getElementById(`stop-car${id}`);
    buttonStop.disabled = false;
}
async function stopButton(target: HTMLButtonElement) {
    storage.setID(target.id.split('car')[1]);
    const id = storage.getID();
    stopDriving(id);
    target.disabled = true;
    const buttonStart = <HTMLButtonElement>document.getElementById(`start-car${id}`);
    buttonStart.disabled = false;
}
async function raceButton() {
    buttonRace.disabled = true;
    buttonReset.disabled = false;
    prev.disabled = true;
    next.disabled = true;
    await race();
}
async function resetButton() {
    const cars = storage.getСars();
    cars.map((car) => stopDriving(`${car.id}`));
    buttonRace.disabled = false;
    buttonReset.disabled = true;
    prev.disabled = false;
    next.disabled = false;
}
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
