import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Address, PaymentOption } from '@holisticon/user-profile/domain';
import { UserProfileStore } from '@holisticon/user-profile/state';
import { AddressModule, PaymentOptionModule } from '@holisticon/user-profile/ui';
import { defaultTo } from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderItem } from '../../domain';
import { OrdersStore } from '../../state';

@Component({
    selector: 'holisticon-place-order-form',
    templateUrl: './place-order-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderFormComponent {

    @Input()
    orderItems!: OrderItem[];

    addresses$: Observable<Address[]>;
    paymentOptions$: Observable<PaymentOption[]>;

    form = new FormGroup({
        billingAddress: new FormControl(),
        shippingAddress: new FormControl(),
        payment: new FormControl()
    });

    constructor(
        private ordersStore: OrdersStore,
        private userProfileStore: UserProfileStore
    ) {
        this.addresses$ = this.userProfileStore.getAddresses().pipe(
            tap(addresses => this.onAddressesChange(addresses))
        )
        this.paymentOptions$ = this.userProfileStore.getPaymentOptions().pipe(
            tap(paymentOptions => this.onPaymentOptionsChange(paymentOptions))
        )
    }

    onSubmit(event: Event) {
        event.preventDefault();

        this.ordersStore.placeOrder({
            newOrder: {
                orderItems: this.orderItems,
                billingAddress: this.form.value.billingAddress,
                shippingAddress: this.form.value.shippingAddress,
                payment: this.form.value.payment
            }
        });
    }

    private onAddressesChange(addresses: Address[]) {
        this.form.patchValue({
            billingAddress: defaultTo(addresses[0], null),
            shippingAddress: defaultTo(addresses[0], null)
        })
    }

    private onPaymentOptionsChange(paymentOptions: PaymentOption[]) {
        this.form.patchValue({
            payment: defaultTo(paymentOptions[0], null)
        })
    }
}

@NgModule({
    declarations: [PlaceOrderFormComponent],
    exports: [PlaceOrderFormComponent],
    imports: [CommonModule, ReactiveFormsModule, AddressModule, PaymentOptionModule]
})
export class PlaceOrderFormModule { }
