import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { ResourceWith } from '@holisticon/resource';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '../../domain';
import { ShoppingCartItemModule } from './shopping-cart-item/shopping-cart-item.component';

@Component({
    selector: 'holisticon-shopping-cart-item-list',
    templateUrl: './shopping-cart-item-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartItemListComponent {

    @Input()
    shoppingCart!: ShoppingCart;

    @Output()
    updateQuantity = new EventEmitter<ResourceWith<QuantityUpdate, ShoppingCartItem>>();

    @Output()
    delete = new EventEmitter<ShoppingCartItem>();

    onUpdateQuantity(quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem>) {
        this.updateQuantity.emit(quantityUpdate);
    }

    onDelete(shoppingCartItem: ShoppingCartItem) {
        this.delete.emit(shoppingCartItem);
    }

}

@NgModule({
    declarations: [ShoppingCartItemListComponent],
    exports: [ShoppingCartItemListComponent],
    imports: [CommonModule, ShoppingCartItemModule]
})
export class ShoppingCartItemListModule { }
