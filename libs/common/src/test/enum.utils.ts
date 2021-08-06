import { isUndefined, sample } from 'lodash-es';

export function getAllValues<T>(enumeration: T): T[keyof T][] {
    return Object
        .keys(enumeration)
        .map(key => enumeration[key as keyof T]);
}

export function getRandomValue<T>(enumeration: T): T[keyof T] {
    const randomValue = sample(getAllValues(enumeration));

    if (isUndefined(randomValue)) {
        throw new Error('The given enumeration contains no values, cannot extract a random value');
    }

    return randomValue;
}
