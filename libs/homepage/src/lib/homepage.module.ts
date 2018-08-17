import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsCommonModule } from '@ngxp/products-common';
import { StoreModule } from '@ngrx/store';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: HomepageComponent }
        ]),
        StoreModule.forFeature('homepage', {}),
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
