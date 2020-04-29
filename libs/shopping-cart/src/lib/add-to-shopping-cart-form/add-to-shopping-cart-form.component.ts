import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@ngxp/products';
import { getUri } from '@ngxp/resource';
import { toNumber } from 'lodash-es';
import { AdditionToShoppingCart } from '../shopping-cart.model';
import { ShoppingCartStore } from '../state/shopping-cart-store.service';

@Component({
    selector: 'ngxp-add-to-shopping-cart-form',
    templateUrl: './add-to-shopping-cart-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToShoppingCartFormComponent {

    @Input()
    product!: Product;

    quantity = 1;

    constructor(
        private shoppingCartStore: ShoppingCartStore
    ) { }

    onSubmit(event: Event) {
        event.preventDefault();

        const additionToShoppingCart: AdditionToShoppingCart = {
            product: getUri(this.product),
            quantity: toNumber(this.quantity)
        };

        this.shoppingCartStore.addToShoppingCart({ additionToShoppingCart });
    }
}