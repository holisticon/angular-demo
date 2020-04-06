import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '../user-profile.model';

@Component({
    selector: 'ngxp-address',
    templateUrl: './address.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent {

    @Input()
    address!: Address;

}
