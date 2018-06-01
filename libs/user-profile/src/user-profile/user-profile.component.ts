import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cfha-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {

}
