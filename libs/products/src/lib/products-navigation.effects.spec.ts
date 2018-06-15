import { TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import { LoadSearchResultsAction } from '@luchsamapparat/products-common';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { ProductsNavigationEffects } from './products-navigation.effects';

describe('ProductsNavigationEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsNavigationEffects;

    const query = 'query';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ],
            providers: [
                ProductsNavigationEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ProductsNavigationEffects);
    });

    describe('loadSearchResultsOnNavigate', () => {
        let routerNavigationAction: RouterNavigationAction<RouterStateUrl>;

        beforeEach(() => {
            routerNavigationAction = {
                type: ROUTER_NAVIGATION,
                payload: {
                    event: null,
                    routerState: {
                        url: '/products',
                        params: {},
                        queryParams: { query }
                    }
                }
            };
        })

        it('dispatches a LoadSearchResultsAction with the query from the query params when the user navigates to /products', () => {
            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                hot('-a-|', { a: new LoadSearchResultsAction(query) })
            );
        });

        it('dispatches a LoadSearchResultsAction with NULL as query when the route contains no query param', () => {
            routerNavigationAction.payload.routerState.queryParams = {};

            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                hot('-a-|', { a: new LoadSearchResultsAction(null) })
            );
        });

        it('dispatches no action when the target route does not start with /products', () => {
            routerNavigationAction.payload.routerState.url = '/shopping-cart';

            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadSearchResultsOnNavigate$).toBeObservable(
                cold('---|')
            );
        });
    });
});

// TODO: remove duplication
interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}
