import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { OrdersStateModule } from '@holisticon/orders/state';
import { PlaceOrderFormModule } from '@holisticon/orders/ui';
import { ResourceWith } from '@holisticon/resource';
import { UserProfileStateModule } from '@holisticon/user-profile/state';
import { Observable } from 'rxjs';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '../../domain';
import { ShoppingCartStateModule, ShoppingCartStore } from '../../state';
import { ShoppingCartItemListModule } from '../../ui';
import { ShoppingCartIsEmptyModule } from './shopping-cart-is-empty.pipe';

@Component({
    selector: 'holisticon-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {

    shoppingCart$: Observable<ShoppingCart | null>;

    constructor(
        private shoppingCartStore: ShoppingCartStore,
    ) {
        this.shoppingCart$ = this.shoppingCartStore.getShoppingCart();
    }

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate>) {
        this.shoppingCartStore.updateShoppingCartItemQuantity({ quantityUpdate });
    }

    onDelete(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartStore.deleteShoppingCartItem({ shoppingCartItem });
    }
}

@NgModule({
    declarations: [ShoppingCartComponent],
    imports: [CommonModule, ShoppingCartStateModule, OrdersStateModule, UserProfileStateModule, PlaceOrderFormModule, ShoppingCartIsEmptyModule, ShoppingCartItemListModule]
})
export class ShoppingCartModule { }
