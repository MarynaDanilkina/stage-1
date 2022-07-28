import { getCars } from '../server/api';

export type Сars = {
    name: string;
    color: string;
    id: number;
};
export default class Storage {
    data!: Сars[];
    setСars = (data: Сars[]): void => {
        this.data = data;
    };
    getСars = (): Сars[] => {
        return this.data;
    };
}
const storage = new Storage();
export { storage };
