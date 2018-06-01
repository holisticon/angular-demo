import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartAppState, UpdateShoppingCartItemQuantityAction, getShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cfha-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {

    shoppingCart$: Observable<ShoppingCart>;

    constructor(
        private store: Store<ShoppingCartAppState>
    ) {
        this.shoppingCart$ = this.store.select(getShoppingCart());
    }

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate>) {
        this.store.dispatch(
            new UpdateShoppingCartItemQuantityAction(quantityUpdate)
        );
    }

}
