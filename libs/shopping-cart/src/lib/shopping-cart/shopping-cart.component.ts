import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { NewOrder, PlaceOrderAction } from '@luchsamapparat/orders-common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { UserProfile, UserProfileStore } from '@luchsamapparat/user-profile-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartStore } from '../state/shopping-cart-store.service';
import { DeleteShoppingCartItemAction, UpdateShoppingCartItemQuantityAction } from '../state/shopping-cart.actions';

@Component({
    selector: 'cfha-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {

    shoppingCart$: Observable<ShoppingCart>;
    userProfile$: Observable<UserProfile>;

    constructor(
        private store: Store<void>,
        private shoppingCartStore: ShoppingCartStore,
        private userProfileStore: UserProfileStore
    ) {
        this.shoppingCart$ = shoppingCartStore.getShoppingCart();
        this.userProfile$ = userProfileStore.getUserProfile();
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
