import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { Address } from '../../domain';

@Component({
    selector: 'holisticon-address',
    templateUrl: './address.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent {

    @Input()
    address!: Address;

}

@NgModule({
    declarations: [AddressComponent],
    exports: [AddressComponent]
})
export class AddressModule { }
