import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsCommonModule } from '@luchsamapparat/products/products-common';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
             { path: '', pathMatch: 'full', component: HomepageComponent }
        ]),
        ProductsCommonModule
    ],
    declarations: [
        HomepageComponent
    ],
    exports: [
        HomepageComponent
    ]
})
export class HomepageModule { }
