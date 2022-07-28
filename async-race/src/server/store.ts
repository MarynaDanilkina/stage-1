export type Сars = {
    name: string;
    color: string;
    id: number;
};
export type Car = {
    name: string;
    color: string;
};
export default class Storage {
    data!: Сars[];
    CarsCount!: number;
    id!: string;
    pages = 1;
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
        return (this.pages -= 1);
    };
}
const storage = new Storage();
export { storage };
