import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { routerNavigationAction } from '@ngxp/routing/test';
import { shoppingCartNavigationAction } from '@ngxp/shopping-cart/test';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { loadShoppingCartAction } from '../state/shopping-cart.actions';
import { ShoppingCartNavigationEffects } from './shopping-cart-navigation.effects';

describe('ShoppingCartNavigationEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartNavigationEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ShoppingCartNavigationEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(ShoppingCartNavigationEffects);
    });

    describe('loadShoppingCartOnNavigate$', () => {
        it('dispatches a loadShoppingCartAction when the user navigates to the Shopping Cart view', () => {
            actions$ = hot('-a-|', { a: shoppingCartNavigationAction });

            expect(effects$.loadShoppingCartOnNavigate$).toBeObservable(
                hot('-a-|', { a: loadShoppingCartAction() })
            );
        });

        it('dispatches a loadShoppingCartAction with NULL as query when the route does not reference the Shopping Cart view', () => {
            actions$ = hot('-a-|', { a: routerNavigationAction });

            expect(effects$.loadShoppingCartOnNavigate$).toBeObservable(
                cold('---|')
            );
        });
    });
});
