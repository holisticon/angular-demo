import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { SearchResults } from '@ngxp/products/domain';
import { ProductsStateModule, ProductsStore } from '@ngxp/products/state';
import { ProductListModule } from '@ngxp/products/ui';
import { Observable } from 'rxjs';

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

@NgModule({
    declarations: [SearchResultsComponent],
    imports: [CommonModule, ProductsStateModule, ProductListModule]
})
export class SearchResultsModule { }
