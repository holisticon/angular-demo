import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart } from '@luchsamapparat/shopping-cart-common';

@Component({
    selector: 'cfha-shopping-cart-item-list',
    templateUrl: './shopping-cart-item-list.component.html',
    styleUrls: ['./shopping-cart-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartItemListComponent {

    @Input()
    shoppingCart: ShoppingCart;

    @Output()
    updateQuantity = new EventEmitter<ResourceWith<QuantityUpdate>>();

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate>) {
        this.updateQuantity.emit(quantityUpdate);
    }

}
