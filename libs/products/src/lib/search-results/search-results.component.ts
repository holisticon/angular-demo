import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@ngxp/products-common';
import { AdditionToShoppingCart, AddToShoppingCartAction, ShoppingCartCommonStore } from '@ngxp/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsStore } from '../state/products-store.service';
import { ProductsPartialState } from '../state/products.reducer';

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
        this.products$ = productsStore.getSearchResults();
    }

    onAddToShoppingCart(additionToShoppingCart: AdditionToShoppingCart) {
        this.shoppingCartCommonStore.addToShoppingCart(additionToShoppingCart);
    }

}
