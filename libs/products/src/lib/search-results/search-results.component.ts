import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@luchsamapparat/products-common';
import { AdditionToShoppingCart, AddToShoppingCartAction } from '@luchsamapparat/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsStore } from '../state/products-store.service';
import { ProductsAppState } from '../state/products.reducer';

@Component({
  selector: 'cfha-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {

    products$: Observable<Product[]>;

    constructor(
        private store: Store<ProductsAppState>,
        private productsStore: ProductsStore
    ) {
        this.products$ = productsStore.getSearchResults();
    }

    onAddToShoppingCart(additionToShoppingCart: AdditionToShoppingCart) {
        this.store.dispatch(new AddToShoppingCartAction(additionToShoppingCart));
    }

}
