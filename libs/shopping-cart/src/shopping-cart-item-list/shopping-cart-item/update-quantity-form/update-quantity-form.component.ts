import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Resource, ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { isNull } from 'lodash-es';

@Component({
    selector: 'cfha-update-quantity-form',
    templateUrl: './update-quantity-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateQuantityFormComponent implements OnInit {

    @Input()
    shoppingCartItem: Resource<ShoppingCartItem>;

    @Output()
    updateQuantity = new EventEmitter<ResourceWith<QuantityUpdate, ShoppingCartItem>>();

    quantity = new FormControl();

    ngOnInit() {
        if (!isNull(this.shoppingCartItem)) {
            this.quantity.setValue(this.shoppingCartItem.quantity);
        }
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.updateQuantity.emit({
            resource: this.shoppingCartItem,
            with: { quantity: this.quantity.value }
        });
    }

}
