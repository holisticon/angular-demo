import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewOrder, OrdersStore } from '@ngxp/orders';
import { ResourceWith } from '@ngxp/resource';
import { UserProfile, UserProfileStore } from '@ngxp/user-profile';
import { Observable } from 'rxjs';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '../../domain/shopping-cart';
import { ShoppingCartStore } from '../../state/shopping-cart-store.service';

@Component({
    selector: 'ngxp-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {

    shoppingCart$: Observable<ShoppingCart | null>;
    userProfile$: Observable<UserProfile | null>;

    constructor(
        private ordersStore: OrdersStore,
        private shoppingCartStore: ShoppingCartStore,
        private userProfileStore: UserProfileStore
    ) {
        this.shoppingCart$ = this.shoppingCartStore.getShoppingCart();
        this.userProfile$ = this.userProfileStore.getUserProfile();
    }

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate>) {
        this.shoppingCartStore.updateShoppingCartItemQuantity({ quantityUpdate });
    }

    onDelete(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartStore.deleteShoppingCartItem({ shoppingCartItem });
    }

    onPlaceOrder(newOrder: NewOrder) {
        this.ordersStore.placeOrder({ newOrder });
    }

}
