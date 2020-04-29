import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceWith } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCartItem } from '../../../domain/shopping-cart';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[ngxp-shopping-cart-item-row]',
    templateUrl: './shopping-cart-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartItemComponent {

    @Input()
    shoppingCartItem!: ShoppingCartItem;

    @Output()
    updateQuantity = new EventEmitter<ResourceWith<QuantityUpdate, ShoppingCartItem>>();

    @Output()
    delete = new EventEmitter<ShoppingCartItem>();

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate>) {
        this.updateQuantity.emit(quantityUpdate);
    }

    onDelete() {
        this.delete.emit(this.shoppingCartItem);
    }
}
