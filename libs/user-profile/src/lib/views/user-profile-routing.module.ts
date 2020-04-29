import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileModule } from '../user-profile.module';
import { UserProfileComponent, UserProfileModule as UserProfileComponentModule } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        UserProfileModule,
        UserProfileComponentModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: UserProfileComponent }
        ])
    ]
})
export class UserProfileRoutingModule { }
