import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { additionToShoppingCart, shoppingCart } from '@ngxp/shopping-cart-common/test';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCartCommonService } from '../shopping-cart-common.service';
import { addToShoppingCartAction, shoppingCartLoadedAction } from './shopping-cart-common.actions';
import { ShoppingCartCommonEffects } from './shopping-cart-common.effects';

describe('ShoppingCartCommonEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartCommonEffects;
    let shoppingCartCommonService: ShoppingCartCommonService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                ShoppingCartCommonEffects,
                ShoppingCartCommonService,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ShoppingCartCommonEffects);
        shoppingCartCommonService = TestBed.get(ShoppingCartCommonService);
    });

    describe('addToShoppingCart', () => {
        it('calls the service with the given addition to shopping cart and dispatches a ShoppingCartLoadedAction with the updated shopping cart', () => {
            const addToShoppingCartSpy = spyOn(shoppingCartCommonService, 'addToShoppingCart').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', {
                a: addToShoppingCartAction({ additionToShoppingCart })
            });

            expect(effects$.addToShoppingCart$).toBeObservable(
                hot('-a-|', { a: shoppingCartLoadedAction({ shoppingCart }) })
            );

            effects$.addToShoppingCart$
                .pipe(take(1))
                .subscribe(() => {
                    expect(addToShoppingCartSpy).toHaveBeenCalledWith(additionToShoppingCart);
                });
        });
    });


});
