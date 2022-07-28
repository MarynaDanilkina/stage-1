import { getCars } from '../server/api';

const { items, count } = await getCars(1);
export { items, count };
