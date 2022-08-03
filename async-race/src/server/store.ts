import { Сars, Winners } from '../type';
import { getWinner, сreateWinners, updateWinner } from './api';
export default class Storage {
    data!: Сars[];
    CarsCount!: number;
    id!: string;
    pages = 1;
    Winners!: Winners[];
    WinnersCount!: number;
    setСars = (data: Сars[]): void => {
        this.data = data;
    };
    getСars = (): Сars[] => {
        return this.data;
    };
    setCarsCount = (CarsCount: number): void => {
        this.CarsCount = CarsCount;
    };
    getCarsCount = (): number => {
        return this.CarsCount;
    };
    setID = (id: string) => {
        this.id = id;
    };
    getID = () => {
        return this.id;
    };
    getPagesNext = () => {
        return (this.pages += 1);
    };
    getPagesPrev = () => {
        if (this.pages === 1) {
            return this.pages;
        }
        return (this.pages -= 1);
    };
    setPages = (pages: number) => {
        this.pages = pages;
    };
    setWinners = (Winners: Winners[]): void => {
        this.Winners = Winners;
    };
    getWinners = (): Winners[] => {
        return this.Winners;
    };
    setWinnersCount = (WinnersCount: number): void => {
        this.WinnersCount = WinnersCount;
    };
    getWinnersCount = (): number => {
        return this.WinnersCount;
    };
    saveWinners = async ({ id, time }: { id: number; time: number }) => {
        time = time / 1000;
        let status = 'false';
        const winners = await this.getWinners();
        console.log(winners);

        winners.map(async (winner) => {
            if (winner.winner.id === id) {
                status = 'true';
            }
        });
        console.log(status);
        if (status === 'true') {
            const winner = await getWinner(id);
            const wins = winner[0].wins + 1;
            if (wins.time < time) {
                time = wins.time;
            }
            await updateWinner(id, { id, time, wins });
        }
        if (status === 'false') {
            const wins = 1;
            await сreateWinners({ id, time, wins });
        }
        status = 'false';
    };
}
const storage = new Storage();
export { storage };
