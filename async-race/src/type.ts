export type Car = {
    name: string;
    color: string;
};
export type Сars = {
    name: string;
    color: string;
    id: number;
};
export type Winner = {
    id: number;
    wins: number;
    time: number;
};
export interface Winners {
    car: Сars;
    winner: Winner;
}
export type Best = {
    time: number;
    id: string;
};
export type WinnerDriving = {
    id: number;
    time: number;
    success: boolean;
};
export type Race = {
    name: string;
    color: string;
    id: number;
    time: number;
};
