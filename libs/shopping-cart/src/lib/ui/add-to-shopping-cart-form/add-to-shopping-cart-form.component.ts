import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResourceUri } from '@ngxp/resource';
import { toNumber } from 'lodash-es';
import { AdditionToShoppingCart } from '../../domain/shopping-cart';
import { ShoppingCartStateModule } from '../../state/shopping-cart-state.module';
import { ShoppingCartStore } from '../../state/shopping-cart-store.service';

@Component({
    selector: 'ngxp-add-to-shopping-cart-form',
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
