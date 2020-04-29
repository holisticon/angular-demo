import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnNonNullChange } from '@ngxp/common';
import { ShoppingCart } from '@ngxp/shopping-cart';
import { UserProfile } from '@ngxp/user-profile';
import { defaultTo, isNull } from 'lodash-es';
import { NewOrder } from '../order.model';

@Component({
    selector: 'ngxp-place-order-form',
    templateUrl: './place-order-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderFormComponent {

    @Input()
    shoppingCart!: ShoppingCart;

    @Input()
    @OnNonNullChange()
    userProfile!: UserProfile;

    @Output()
    placeOrder = new EventEmitter<NewOrder>();

    form = new FormGroup({
        billingAddress: new FormControl(),
        shippingAddress: new FormControl(),
        payment: new FormControl()
    });

    get addresses() {
        if (isNull(this.userProfile)) {
            return [];
        }

        return this.userProfile.addresses;
    }

    get paymentOptions() {
        if (isNull(this.userProfile)) {
            return [];
        }

        return this.userProfile.paymentOptions;
    }

    onSubmit(event: Event) {
        event.preventDefault();

        this.placeOrder.emit({
            shoppingCartItems: this.shoppingCart.items,
            billingAddress: this.form.value.billingAddress,
            shippingAddress: this.form.value.shippingAddress,
            payment: this.form.value.payment
        });
    }

    private onChangeUserProfile(userProfile: UserProfile) {
        this.form.setValue({
            billingAddress: defaultTo(userProfile.addresses[0], null),
            shippingAddress: defaultTo(userProfile.addresses[0], null),
            payment: defaultTo(userProfile.paymentOptions[0], null)
        })
    }

}