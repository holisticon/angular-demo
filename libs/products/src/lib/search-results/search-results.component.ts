import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@ngxp/products-common';
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
        private productsStore: ProductsStore
    ) {
        this.products$ = this.productsStore.getSearchResults();
    }

}
