import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@ngxp/products-common';
import { AdditionToShoppingCart, ShoppingCartCommonStore } from '@ngxp/shopping-cart-common';
import { Observable } from 'rxjs';
import { ProductsStore } from '../state/products-store.service';

@Component({
  selector: 'ngxp-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {

    products$: Observable<Product[]>;

    constructor(
        private productsStore: ProductsStore,
        private shoppingCartCommonStore: ShoppingCartCommonStore
    ) {
        this.products$ = this.productsStore.getSearchResults();
    }

    onAddToShoppingCart(additionToShoppingCart: AdditionToShoppingCart) {
        this.shoppingCartCommonStore.addToShoppingCart(additionToShoppingCart);
    }

}
