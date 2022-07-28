import './global.css';
import { getPage } from './components/page';
import { getGarage } from './components/garage';
import { getCars, createCar, deleteCar, updateCar } from './server/api';
import { storage } from './server/store';
await getCars(1);
const car = storage.data.slice();
console.log(car);
getPage();
const newForm = document.getElementById('new-form') as HTMLDivElement;
const garage = document.getElementById('garage') as HTMLDivElement;
(<HTMLElement>document.querySelector('#body')).addEventListener('click', async (e) => {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('button__remove')) {
        const id = Number(target.id.split('car')[1]);
        await deleteCar(id);
        await getCars(1);
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
});

newForm.addEventListener('submit', async () => {
    const newName = document.getElementById('new-name') as HTMLInputElement;
    const newColor = document.getElementById('new-color') as HTMLInputElement;
    await createCar({ name: newName.value, color: newColor.value });
    await getCars(1);
    garage.innerHTML = getGarage();
});

const editForm = document.getElementById('edit-form') as HTMLInputElement;
editForm.addEventListener('submit', async (event) => {
    const editName = document.getElementById('edit-name') as HTMLInputElement;
    const editColor = document.getElementById('edit-color') as HTMLInputElement;
    const id = storage.getID();
    await updateCar(id, { name: editName.value, color: editColor.value });
});
