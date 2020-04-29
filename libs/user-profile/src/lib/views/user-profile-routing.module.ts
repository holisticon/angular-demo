import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileModule } from '../..';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        UserProfileModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: UserProfileComponent }
        ])
    ],
    declarations: [
        UserProfileComponent
    ]
})
export class UserProfileRoutingModule { }
