import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSearchFormComponent } from './product-search-form/product-search-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProductSearchFormComponent
    ],
    exports: [
        ProductSearchFormComponent
    ]
})
export class ProductsCommonModule {}
