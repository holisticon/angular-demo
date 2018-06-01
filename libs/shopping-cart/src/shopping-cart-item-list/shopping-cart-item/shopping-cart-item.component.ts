import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[shopping-cart-item-row]',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartItemComponent {

    @Input()
    shoppingCartItem: ShoppingCartItem;

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
