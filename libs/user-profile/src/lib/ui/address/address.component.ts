import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '../../domain/user-profile';

@Component({
    selector: 'ngxp-address',
    templateUrl: './address.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent {

    @Input()
    address!: Address;

}
