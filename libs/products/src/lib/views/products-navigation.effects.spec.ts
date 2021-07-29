import { TestBed } from '@angular/core/testing';
import { buildProductDetailsNavigationAction, buildSearchResultsNavigationAction, product, productDetailsNavigationAction, searchResultsNavigationAction, searchResultsQueryParams } from '@holisticon/products/test';
import { getUri } from '@holisticon/resource';
import { routerNavigationAction } from '@holisticon/routing/test';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { loadProductAction, loadSearchResultsAction, ProductsStore } from '../state';
import { ProductsNavigationEffects } from './products-navigation.effects';

describe('ProductsNavigationEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsNavigationEffects;
    let productsStore: StoreServiceMock<ProductsStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductsNavigationEffects,
                provideStoreServiceMock(ProductsStore),
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(ProductsNavigationEffects);
        productsStore = TestBed.inject(ProductsStore) as any;
    });

    describe('loadSearchResultsOnNavigate$', () => {
        it('dispatches a loadSearchResultsAction with the query from the query params when the user navigates to the Search Results view', () => {
            actions$ = hot('-a-|', { a: searchResultsNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                hot('-a-|', { a: loadSearchResultsAction({ queryString: searchResultsQueryParams.query }) })
            );
        });

        it('dispatches a loadSearchResultsAction with NULL as query when the route does not reference the Search Results view', () => {
            actions$ = hot('-a-|', { a: buildSearchResultsNavigationAction() });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                hot('-a-|', { a: loadSearchResultsAction({ queryString: null }) })
            );
        });

        it('dispatches no action when the target route does not start with /products', () => {
            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                cold('---|')
            );
        });
    });

    describe('loadProductOnNavigate$', () => {
        it('dispatches a loadProductAction with the product ID from the route params when the user navigates to the Product Details view', () => {
            actions$ = hot('-a-|', { a: productDetailsNavigationAction });

            expect(effects$.loadProductOnNavigate$).toBeObservable(
                hot('-a', { a: loadProductAction({ id: getUri(product) }) })
            );
        });

        it('dispatches no action if a product with the product ID from the route already exists in the store', () => {
            productsStore.getProduct().next(product);

            actions$ = hot('-a-|', { a: productDetailsNavigationAction });

            expect(effects$.loadProductOnNavigate$).toBeObservable(
                cold('')
            );
        });

        it('dispatches no action when the target route does not start with /products', () => {
            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                cold('---|')
            );
        });

        it('dispatches no action when the route contains no product ID in the route params', () => {
            actions$ = hot('-a-|', { a: buildProductDetailsNavigationAction() });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                cold('---|')
            );
        });
    });
});
