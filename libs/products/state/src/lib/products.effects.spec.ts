import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { searchResults } from '@ngxp/products/domain/test';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { ProductService } from './product.service';
import { loadSearchResultsAction, searchResultsLoadedAction } from './products.actions';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsEffects;
    let productService: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                ProductsEffects,
                ProductService,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(ProductsEffects);
        productService = TestBed.inject(ProductService);
    });

    describe('loadSearchResults', () => {
        it('dispatches a SearchResultsLoadedAction with the search results returned by the service', () => {
            const expectedQuery = 'query';
            spyOn(productService, 'searchProducts').and.returnValue(observableOf(searchResults));

            actions$ = hot('-a-|', { a: loadSearchResultsAction({ queryString: expectedQuery }) });

            expect(effects$.loadSearchResults$).toBeObservable(
                hot('-a-|', { a: searchResultsLoadedAction({ searchResults }) })
            );
        });
    });
});
