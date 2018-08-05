import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { addId } from '@luchsamapparat/common';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCartCommonService } from '../shopping-cart-common.service';
import { ShoppingCartCommonEffects } from './shopping-cart-common.effects';
import { ShoppingCart } from '../shopping-cart.model';
import { AddToShoppingCartAction, ShoppingCartLoadedAction } from './shopping-cart-common.actions';

describe('ShoppingCartCommonEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartCommonEffects;
    let shoppingCartCommonService: ShoppingCartCommonService;

    const shoppingCart: ShoppingCart = {
        totalPrice: 1,
        items: [
            addId({
                name: '',
                description: '',
                price: 1,
                product: 'id',
                quantity: 1
            }, 'id')
        ]
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({})
            ],
            providers: [
                ShoppingCartCommonEffects,
                ShoppingCartCommonService,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ShoppingCartCommonEffects);
        shoppingCartCommonService = TestBed.get(ShoppingCartCommonService);
    });

    describe('addToShoppingCart', () => {
        it('calls the service with the given addition to shopping cart and dispatches a ShoppingCartLoadedAction with the updated shopping cart', () => {
            const additionToShoppingCart = {
                product: 'id',
                quantity: 2
            };

            const addToShoppingCartSpy = spyOn(shoppingCartCommonService, 'addToShoppingCart').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', {
                a: new AddToShoppingCartAction(additionToShoppingCart)
            });

            expect(effects$.addToShoppingCart$).toBeObservable(
                hot('-a-|', { a: new ShoppingCartLoadedAction(shoppingCart) })
            );

            effects$.addToShoppingCart$
                .pipe(take(1))
                .subscribe(() => {
                    expect(addToShoppingCartSpy).toHaveBeenCalledWith(additionToShoppingCart);
                });
        });
    });


});
