import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsStateModule } from '@holisticon/products/state';
import { ProductSearchFormModule } from '@holisticon/products/ui';
import { StoreModule } from '@ngrx/store';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: HomepageComponent }
        ]),
        StoreModule.forFeature('homepage', {}),
        ProductSearchFormModule,
        ProductsStateModule
    ],
    declarations: [
        HomepageComponent
    ]
})
export class HomepageModule { }
