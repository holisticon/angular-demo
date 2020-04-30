import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResults } from '../../domain/product';
import { ProductsStateModule } from '../../state/products-state.module';
import { ProductsStore } from '../../state/products-store.service';
import { ProductListModule } from '../../ui/product-list/product-list.component';

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
