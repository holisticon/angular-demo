import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ProductsModule } from '@ngxp/products';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: HomepageComponent }
        ]),
        StoreModule.forFeature('homepage', {}),
        ProductsModule
    ],
    declarations: [
        HomepageComponent
    ],
    exports: [
        HomepageComponent
    ]
})
export class HomepageModule { }
