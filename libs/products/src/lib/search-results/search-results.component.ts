import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@luchsamapparat/products-common';
import { AddToShoppingCartAction, AdditionToShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductsAppState } from '../state/products.reducer';
import { getSearchResults } from '../state/products.selectors';

@Component({
  selector: 'cfha-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {

    products$: Observable<Product[]>;

    constructor(
        private store: Store<ProductsAppState>
    ) {
        this.products$ = this.store.select(getSearchResults());
    }

    onAddToShoppingCart(additionToShoppingCart: AdditionToShoppingCart) {
        this.store.dispatch(new AddToShoppingCartAction(additionToShoppingCart));
    }

}
