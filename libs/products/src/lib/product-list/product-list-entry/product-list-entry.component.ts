import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getId } from '@ngxp/common';
import { Product } from '@ngxp/products-common';
import { AdditionToShoppingCart } from '@ngxp/shopping-cart-common';
import { toNumber } from 'lodash-es';

@Component({
    selector: 'ngxp-product-list-entry',
    templateUrl: './product-list-entry.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListEntryComponent {

    @Input()
    product!: Product;

    @Output()
    addToShoppingCart = new EventEmitter<AdditionToShoppingCart>();

    quantity = new FormControl(1);

    onSubmit(event: Event) {
        event.preventDefault();

        this.addToShoppingCart.emit({
            product: getId(this.product),
            quantity: toNumber(this.quantity.value)
        });
    }

}
