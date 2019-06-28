import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceWith } from '@ngxp/common';
import { NewOrder, OrdersCommonStore } from '@ngxp/orders-common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { UserProfile, UserProfileCommonStore } from '@ngxp/user-profile-common';
import { Observable } from 'rxjs';
import { ShoppingCartStore } from '../state/shopping-cart-store.service';

@Component({
    selector: 'ngxp-shopping-cart',
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
        this.shoppingCartStore.updateShoppingCartItemQuantity({ quantityUpdate });
    }

    onDelete(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartStore.deleteShoppingCartItem({ shoppingCartItem });
    }

    onPlaceOrder(newOrder: NewOrder) {
        this.ordersCommonStore.placeOrder({ newOrder });
    }

}
