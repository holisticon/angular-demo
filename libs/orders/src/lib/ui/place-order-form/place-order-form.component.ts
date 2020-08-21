import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Address, PaymentOption } from '@ngxp/user-profile/domain';
import { UserProfileStore } from '@ngxp/user-profile/state';
import { PaymentOptionModule } from '@ngxp/user-profile/ui';
import { defaultTo, first } from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewOrder, OrderItem } from '../../domain';
import { OrdersStore } from '../../state';
import { AddressOptionsModule } from './address-options/address-options.component';
import { PaymentOptionOptionsModule } from './payment-option-options/payment-option-options.component';

@Component({
    selector: 'ngxp-place-order-form',
    templateUrl: './place-order-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderFormComponent {

    @Input()
    orderItems: OrderItem[] = [];

    form = new FormGroup({
        billingAddress: new FormControl(),
        shippingAddress: new FormControl(),
        payment: new FormControl()
    });

    addresses$: Observable<Address[]>;
    paymentOptions$: Observable<PaymentOption[]>;

    constructor(
        private ordersStore: OrdersStore,
        private userProfileStore: UserProfileStore
    ) {
        this.addresses$ = this.userProfileStore.getAddresses().pipe(
            tap(addresses => this.form.patchValue({
                billingAddress: defaultTo(first(addresses), null),
                shippingAddress: defaultTo(first(addresses), null),
            }))
        );
        this.paymentOptions$ = this.userProfileStore.getPaymentOptions().pipe(
            tap(paymentOptions => this.form.patchValue({
                payment: defaultTo(first(paymentOptions), null)
            }))
        );
    }

    onSubmit(event: Event) {
        event.preventDefault();

        const newOrder: NewOrder = {
            orderItems: this.orderItems,
            billingAddress: this.form.value.billingAddress,
            shippingAddress: this.form.value.shippingAddress,
            payment: this.form.value.payment
        };

        this.ordersStore.placeOrder({ newOrder });
    }
}

@NgModule({
    declarations: [PlaceOrderFormComponent],
    exports: [PlaceOrderFormComponent],
    imports: [CommonModule, ReactiveFormsModule, AddressOptionsModule, PaymentOptionOptionsModule, PaymentOptionModule]
})
export class PlaceOrderFormModule { }
