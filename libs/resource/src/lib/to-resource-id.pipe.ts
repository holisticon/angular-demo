// tslint:disable:use-pipe-transform-interface

import { Pipe } from '@angular/core';
import { FunctionPipe } from '@ngxp/common';
import { getId } from './resource.utils';

@Pipe({
    name: 'toResourceId'
})
export class ToResourceIdPipe extends FunctionPipe {
    constructor() {
        super(getId);
    }
}
