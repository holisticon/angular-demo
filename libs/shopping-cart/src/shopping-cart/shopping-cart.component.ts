import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartAppState, ShoppingCartItem, UpdateShoppingCartItemQuantityAction, getShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { DeleteShoppingCartItemAction } from '@luchsamapparat/shopping-cart-common/src/state/shopping-cart.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
