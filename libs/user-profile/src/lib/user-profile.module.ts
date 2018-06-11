import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileCommonModule } from '@luchsamapparat/user-profile-common';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: UserProfileComponent }
        ]),
        UserProfileCommonModule
    ],
    declarations: [
        UserProfileComponent
    ]
})
export class UserProfileModule {}
