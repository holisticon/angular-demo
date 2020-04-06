import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResults } from '../product.model';
import { ProductsStore } from '../state/products-store.service';

@Component({
    selector: 'ngxp-search-results',
    templateUrl: './search-results.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {

    searchResults$: Observable<SearchResults | null>;

    constructor(
        private productsStore: ProductsStore
    ) {
        this.searchResults$ = this.productsStore.getSearchResults();
    }

}
