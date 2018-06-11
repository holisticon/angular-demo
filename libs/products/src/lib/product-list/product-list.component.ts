import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@luchsamapparat/products-common';
import { AdditionToShoppingCart } from '@luchsamapparat/shopping-cart-common';

@Component({
  selector: 'cfha-product-list',
  templateUrl: './product-list.component.html'
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
