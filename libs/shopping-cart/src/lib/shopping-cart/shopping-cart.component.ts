import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { NewOrder, PlaceOrderAction } from '@luchsamapparat/orders-common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { UserProfile, UserProfileAppState, getUserProfile } from '@luchsamapparat/user-profile-common';
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
    userProfile$: Observable<UserProfile>;

    constructor(
        private store: Store<ShoppingCartAppState & UserProfileAppState>
    ) {
        this.shoppingCart$ = this.store.select(getShoppingCart());
        this.userProfile$ = this.store.select(getUserProfile());
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

    onPlaceOrder(newOrder: NewOrder) {
        this.store.dispatch(
            new PlaceOrderAction(newOrder)
        );
    }

}
