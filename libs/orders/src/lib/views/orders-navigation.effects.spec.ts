import { TestBed } from '@angular/core/testing';
import { ordersNavigationAction } from '@holisticon/orders/test';
import { routerNavigationAction } from '@holisticon/routing/test';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { loadOrderHistoryAction } from '../state';
import { OrdersNavigationEffects } from './orders-navigation.effects';

describe('OrdersNavigationEffects', () => {
    let actions$: Observable<any>;
    let effects$: OrdersNavigationEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OrdersNavigationEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(OrdersNavigationEffects);
    });

    describe('loadOrdersOnNavigate$', () => {
        it('dispatches a loadOrderHistoryAction when the user navigates to the Order History view', () => {
            actions$ = hot('-a-|', { a: ordersNavigationAction });

            expect(effects$.loadOrdersOnNavigate$).toBeObservable(
                hot('-a-|', { a: loadOrderHistoryAction() })
            );
        });

        it('dispatches a loadOrderHistoryAction with NULL as query when the route does not reference the Order History view', () => {
            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadOrdersOnNavigate$).toBeObservable(
                cold('---|')
            );
        });
    });
});
