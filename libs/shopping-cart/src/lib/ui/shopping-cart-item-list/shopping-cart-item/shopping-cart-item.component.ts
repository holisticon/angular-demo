import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourceModule, ResourceWith } from '@holisticon/resource';
import { QuantityUpdate, ShoppingCartItem } from '../../../domain';
import { UpdateQuantityFormModule } from './update-quantity-form/update-quantity-form.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[holisticon-shopping-cart-item-row]',
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

@NgModule({
    declarations: [ShoppingCartItemComponent],
    exports: [ShoppingCartItemComponent],
    imports: [CommonModule, RouterModule, ResourceModule, UpdateQuantityFormModule]
})
export class ShoppingCartItemModule { }
