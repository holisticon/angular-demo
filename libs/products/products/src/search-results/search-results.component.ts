import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@luchsamapparat/products/products-common';
import { ProductsAppState } from '@luchsamapparat/products/products/src/state/products.reducer';
import { getSearchResults } from '@luchsamapparat/products/products/src/state/products.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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

}
