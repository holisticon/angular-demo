import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnNonNullChange } from '@luchsamapparat/common';
import { NewOrder } from '@luchsamapparat/orders-common';
import { ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { UserProfile } from '@luchsamapparat/user-profile-common';
import { defaultTo, isNull } from 'lodash-es';

@Component({
    selector: 'cfha-place-order-form',
    templateUrl: './place-order-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderFormComponent {

    @Input()
    shoppingCart: ShoppingCart;

    @Input()
    @OnNonNullChange()
    userProfile: UserProfile;

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

    onSubmit(event) {
        event.preventDefault();

        this.placeOrder.emit({
            shoppingCart: this.shoppingCart,
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
