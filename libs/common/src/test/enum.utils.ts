import { sample } from "lodash-es";

export function getAllValues<T>(enumeration: T): T[keyof T][] {
    return Object
        .keys(enumeration)
        .map(key => (<any> enumeration)[key]);
}

export function getRandomValue<T>(enumeration: T): T[keyof T] {
    return sample(getAllValues(enumeration));
}
