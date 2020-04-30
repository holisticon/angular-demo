import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '@ngxp/products/domain';
import { getUri } from '@ngxp/resource';
import { toNumber } from 'lodash-es';
import { AdditionToShoppingCart } from '../../domain/shopping-cart';
import { ShoppingCartStore } from '../../state/shopping-cart-store.service';

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
    imports: [FormsModule]
})
export class AddToShoppingCartFormModule {}