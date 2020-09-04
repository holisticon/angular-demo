import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResourceUri } from '@ngxp/resource';
import { toNumber, uniqueId } from 'lodash-es';
import { AdditionToShoppingCart } from '../../domain';
import { ShoppingCartStateModule, ShoppingCartStore } from '../../state';

@Component({
    selector: 'ngxp-add-to-shopping-cart-form',
    templateUrl: './add-to-shopping-cart-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToShoppingCartFormComponent {

    @Input()
    product!: ResourceUri;

    quantity = 1;

    quantityElementId = `quantity-${uniqueId()}`

    constructor(
        private shoppingCartStore: ShoppingCartStore
    ) { }

    onSubmit(event: Event) {
        event.preventDefault();

        const additionToShoppingCart: AdditionToShoppingCart = {
            product: this.product,
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
export class AddToShoppingCartFormModule { }
