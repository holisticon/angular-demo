import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResourceUri } from '@holisticon/resource';
import { toNumber } from 'lodash-es';
import { AdditionToShoppingCart } from '../../domain';
import { ShoppingCartStateModule, ShoppingCartStore } from '../../state';

@Component({
    selector: 'holisticon-add-to-shopping-cart-form',
    templateUrl: './add-to-shopping-cart-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToShoppingCartFormComponent {

    @Input()
    product!: ResourceUri;

    quantity = 1;

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
