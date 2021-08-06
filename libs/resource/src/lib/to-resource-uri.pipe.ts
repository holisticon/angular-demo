import { Pipe, PipeTransform } from '@angular/core';
import { FunctionPipe } from '@holisticon/common';
import { getUri } from './resource.utils';

@Pipe({
    name: 'toResourceUri'
})
export class ToResourceUriPipe extends FunctionPipe implements PipeTransform {
    constructor() {
        super(getUri);
    }
}
