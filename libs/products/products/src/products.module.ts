import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            //  { path: '', pathMatch: 'full', component: ProductsComponent }
        ])
    ],
    declarations: [],
    exports: []
})
export class ProductsModule {}
