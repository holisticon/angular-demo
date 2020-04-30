import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileComponent, UserProfileModule } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        UserProfileModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: UserProfileComponent }
        ])
    ]
})
export class UserProfileRoutingModule { }
