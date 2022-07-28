export type Сars = {
    name: string;
    color: string;
    id: number;
};
export default class Storage {
    data!: Сars[];
    CarsCount!: number;
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
}
const storage = new Storage();
export { storage };
