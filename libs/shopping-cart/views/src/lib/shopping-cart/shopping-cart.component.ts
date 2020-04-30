import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { NewOrder } from '@ngxp/orders/domain';
import { OrdersStateModule, OrdersStore } from '@ngxp/orders/state';
import { PlaceOrderFormModule } from '@ngxp/orders/ui';
import { ResourceWith } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@ngxp/shopping-cart/domain';
import { ShoppingCartStateModule, ShoppingCartStore } from '@ngxp/shopping-cart/state';
import { ShoppingCartItemListModule } from '@ngxp/shopping-cart/ui';
import { UserProfile } from '@ngxp/user-profile/domain';
import { UserProfileStateModule, UserProfileStore } from '@ngxp/user-profile/state';
import { Observable } from 'rxjs';
import { ShoppingCartIsEmptyModule } from './shopping-cart-is-empty.pipe';

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

@NgModule({
    declarations: [ShoppingCartComponent],
    imports: [CommonModule, ShoppingCartStateModule, OrdersStateModule, UserProfileStateModule, PlaceOrderFormModule, ShoppingCartIsEmptyModule, ShoppingCartItemListModule]
})
export class ShoppingCartModule {}