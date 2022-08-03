import { WinnerDriving } from './type';
import { storage } from './server/store';
import { startCar, switchCar } from './server/api';
import { animation } from './animation';
export const animationID: { [key: number]: { id: number } } = {};
export const race = async () => {
    const cars = storage.getСars();
    const promises = cars.map((car) => startDriving(car.id));
    const carsRace = await Promise.all(promises);
    const winners: WinnerDriving[] = [];
    carsRace.filter((car) => {
        if (car.success === true) {
            winners.push(car);
        }
    });
    winners.sort((a, b) => a.time - b.time);
    const { id, time } = winners[0];
    storage.saveWinners({ id, time });
};
export async function startDriving(id: number) {
    const { velocity, distance } = await startCar(id);
    const time = Math.round(distance / velocity);
    const car = <HTMLElement>document.getElementById(`car__${id}`);
    const result = car.getBoundingClientRect();
    const finish = <HTMLElement>document.getElementById(`finish__${id}`);
    const result1 = finish.getBoundingClientRect();
    const distanceEl = result1.left - result.left + 50;
    animationID[id] = animation(car, distanceEl, time);
    const { success } = await switchCar(id);
    if (!success) {
        window.cancelAnimationFrame(animationID[id].id);
    }
    return { success, id, time };
}
