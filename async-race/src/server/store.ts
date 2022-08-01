import { Сars } from '../type';
export default class Storage {
    data!: Сars[];
    CarsCount!: number;
    id!: string;
    pages = 1;
    requestId!: number;
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
}
const storage = new Storage();
export { storage };
