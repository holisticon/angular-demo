import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { loadSearchResultsAction, searchResultsLoadedAction } from '@ngxp/products-common';
import { products } from '@ngxp/products-common/test';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { ProductService } from '../product.service';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsEffects;
    let productService: ProductService;

    const searchResults = products;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true
                    }
                }),
            ],
            providers: [
                ProductsEffects,
                ProductService,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ProductsEffects);
        productService = TestBed.get(ProductService);
    });

    describe('loadSearchResults', () => {
        it('dispatches a SearchResultsLoadedAction with the search results returned by the service', () => {
            const expectedQuery = 'query';
            spyOn(productService, 'searchProducts').and.returnValue(observableOf(searchResults));

            actions$ = hot('-a-|', { a: loadSearchResultsAction({ query: expectedQuery }) });

            expect(effects$.loadSearchResults$).toBeObservable(
                hot('-a-|', { a: searchResultsLoadedAction({ searchResults }) })
            );
        });
    });
});
