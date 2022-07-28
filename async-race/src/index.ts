import './global.css';
import { getPage } from './components/page';
import { createCar } from './server/api';
getPage();
const newForm = document.getElementById('new-form') as HTMLDivElement;
newForm.addEventListener('submit', () => newCar());

async function newCar() {
    const newName = document.getElementById('new-name') as HTMLInputElement;
    const newColor = document.getElementById('new-color') as HTMLInputElement;
    await createCar({ name: newName.value, color: newColor.value });
}
