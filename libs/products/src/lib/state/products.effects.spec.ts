import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { product, searchResults } from '@holisticon/products/test';
import { getUri } from '@holisticon/resource';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot } from 'jest-marbles';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { loadProductAction, loadSearchResultsAction, productLoadedAction, searchResultsLoadedAction } from './products.actions';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
    let actions$: Observable<Action>;
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

    describe('loadSearchResults$', () => {
        it('dispatches a SearchResultsLoadedAction with the search results returned by the service', () => {
            jest.spyOn(productService, 'searchProducts').mockReturnValue(of(searchResults));

            actions$ = hot('-a-|', { a: loadSearchResultsAction({ queryString: 'query' }) });

            expect(effects$.loadSearchResults$).toBeObservable(
                hot('-a-|', { a: searchResultsLoadedAction({ searchResults }) })
            );
        });
    });

    describe('loadProduct$', () => {
        it('dispatches a ProductLoadedAction with the product returned by the service', () => {
            jest.spyOn(productService, 'loadProduct').mockReturnValue(of(product));

            actions$ = hot('-a-|', { a: loadProductAction({ id: getUri(product) }) });

            expect(effects$.loadProduct$).toBeObservable(
                hot('-a-|', { a: productLoadedAction({ product }) })
            );
        });
    });
});
