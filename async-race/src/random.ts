export type Car = {
    name: string;
    color: string;
};
function getNameRandom() {
    const brand = ['AUDI', 'ALFA ROMEO', 'BMW', 'FORD', 'HONDA', 'VOLKSWAGEN', 'SKODA', 'KIA', 'GEELY', 'BENTLEY'];
    const model = ['G11', '80 B4', 'C5 I', 'Model S', 'Mustang', 'RC', 'S60 I', 'Astra G', 'S80 II', 'Jetta VII'];
    const randomBrand = Math.floor(Math.random() * brand.length);
    const randomModel = Math.floor(Math.random() * model.length);
    return `${brand[randomBrand]} ${model[randomModel]}`;
}
function getColorRandom() {
    return '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
}
export function generateRandomCars(): Car[] {
    return new Array(100).fill(0).map(() => ({ name: getNameRandom(), color: getColorRandom() }));
}
