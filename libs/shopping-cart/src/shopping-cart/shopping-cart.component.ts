import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DeleteShoppingCartItemAction, UpdateShoppingCartItemQuantityAction } from '../state/shopping-cart.actions';
import { ShoppingCartAppState } from '../state/shopping-cart.reducer';
import { getShoppingCart } from '../state/shopping-cart.selectors';

@Component({
    selector: 'cfha-shopping-cart',
    templateUrl: './shopping-cart.component.html',
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

    onDelete(shoppingCartItem: ShoppingCartItem) {
        this.store.dispatch(
            new DeleteShoppingCartItemAction(shoppingCartItem)
        );
    }

}
