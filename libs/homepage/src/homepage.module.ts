import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
             { path: '', pathMatch: 'full', component: HomepageComponent }
        ])
    ],
    declarations: [
        HomepageComponent
    ],
    exports: [
        HomepageComponent
    ]
})
export class HomepageModule { }
