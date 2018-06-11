import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnNonNullChange, Resource, ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';

@Component({
    selector: 'cfha-update-quantity-form',
    templateUrl: './update-quantity-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateQuantityFormComponent {

    @Input()
    @OnNonNullChange()
    shoppingCartItem: Resource<ShoppingCartItem>;

    @Output()
    updateQuantity = new EventEmitter<ResourceWith<QuantityUpdate, ShoppingCartItem>>();

    quantity = new FormControl();

    onSubmit(event: Event) {
        event.preventDefault();
        this.updateQuantity.emit({
            resource: this.shoppingCartItem,
            with: { quantity: this.quantity.value }
        });
    }

    private onChangeShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
        this.quantity.setValue(shoppingCartItem.quantity);
    }

}
