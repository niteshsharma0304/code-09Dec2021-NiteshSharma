import { carListData } from "./data";

export function getCarList(){
    return new Promise((resolve) => resolve(carListData));
} 