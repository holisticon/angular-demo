import { PipeTransform } from '@angular/core';

export abstract class FunctionPipe implements PipeTransform {

    constructor(
        private fn: (...args: any[]) => any
    ) { }

    transform(...args: any[]) {
        return this.fn(...args);
    }
}
