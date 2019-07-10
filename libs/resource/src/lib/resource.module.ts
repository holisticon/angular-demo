import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToResourceIdPipe } from './to-resource-id.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ToResourceIdPipe
    ],
    exports: [
        ToResourceIdPipe
    ]
})
export class ResourceModule { }
