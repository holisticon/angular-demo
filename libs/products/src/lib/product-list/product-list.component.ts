import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@ngxp/products-common';
import { AdditionToShoppingCart } from '@ngxp/shopping-cart-common';

@Component({
  selector: 'ngxp-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

    @Input()
    products: Product[] = [];

    @Output()
    addToShoppingCart = new EventEmitter<AdditionToShoppingCart>();

    onAddToShoppingCart(additionToShoppingCart: AdditionToShoppingCart) {
        this.addToShoppingCart.emit(additionToShoppingCart);
    }

}
