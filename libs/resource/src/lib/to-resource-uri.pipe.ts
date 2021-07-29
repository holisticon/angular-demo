// tslint:disable:use-pipe-transform-interface

import { Pipe } from '@angular/core';
import { FunctionPipe } from '@holisticon/common';
import { getUri } from './resource.utils';

@Pipe({
    name: 'toResourceUri'
})
export class ToResourceUriPipe extends FunctionPipe {
    constructor() {
        super(getUri);
    }
}
