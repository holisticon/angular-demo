import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { NewOrder, PlaceOrderAction, OrdersCommonStore } from '@luchsamapparat/orders-common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { UserProfile, UserProfileCommonStore } from '@luchsamapparat/user-profile-common';
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
        private ordersCommonStore: OrdersCommonStore,
        private shoppingCartStore: ShoppingCartStore,
        private userProfileStore: UserProfileCommonStore
    ) {
        this.shoppingCart$ = shoppingCartStore.getShoppingCart();
        this.userProfile$ = userProfileStore.getUserProfile();
    }

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate>) {
        this.shoppingCartStore.updateShoppingCartItemQuantity(quantityUpdate);
    }

    onDelete(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartStore.deleteShoppingCartItem(shoppingCartItem);
    }

    onPlaceOrder(newOrder: NewOrder) {
        this.ordersCommonStore.placeOrder(newOrder);
    }

}
