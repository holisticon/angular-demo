import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { buildSearchResultsNavigationAction, searchResultsNavigationAction, searchResultsQueryParams } from '@ngxp/products/test';
import { routerNavigationAction } from '@ngxp/routing/test';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { loadSearchResultsAction } from '../state/products.actions';
import { ProductsNavigationEffects } from './products-navigation.effects';

describe('ProductsNavigationEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsNavigationEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductsNavigationEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(ProductsNavigationEffects);
    });

    describe('loadSearchResultsOnNavigate', () => {
        it('dispatches a LoadSearchResultsAction with the query from the query params when the user navigates to the Search Results view', () => {
            actions$ = hot('-a-|', { a: searchResultsNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                hot('-a-|', { a: loadSearchResultsAction({ queryString: searchResultsQueryParams.query }) })
            );
        });

        it('dispatches a LoadSearchResultsAction with NULL as query when the route does not reference the Search Results view', () => {
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
});
