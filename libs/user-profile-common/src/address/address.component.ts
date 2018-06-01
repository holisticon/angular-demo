import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '@luchsamapparat/user-profile-common';

@Component({
    selector: 'cfha-address',
    templateUrl: './address.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent {

    @Input()
    address: Address;

}
