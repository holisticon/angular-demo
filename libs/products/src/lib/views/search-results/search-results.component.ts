import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResults } from '../../domain';
import { ProductsStateModule, ProductsStore } from '../../state';
import { ProductListModule } from '../../ui';

@Component({
    selector: 'holisticon-search-results',
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
