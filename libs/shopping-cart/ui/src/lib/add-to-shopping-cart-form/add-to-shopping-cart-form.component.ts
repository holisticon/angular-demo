import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '@ngxp/products/domain';
import { getUri } from '@ngxp/resource';
import { AdditionToShoppingCart } from '@ngxp/shopping-cart/domain';
import { ShoppingCartStateModule, ShoppingCartStore } from '@ngxp/shopping-cart/state';
import { toNumber } from 'lodash-es';

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

@NgModule({
    declarations: [AddToShoppingCartFormComponent],
    exports: [AddToShoppingCartFormComponent],
    imports: [FormsModule, ShoppingCartStateModule]
})
export class AddToShoppingCartFormModule {}