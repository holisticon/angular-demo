import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jest-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ShoppingCart } from '../shopping-cart.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { AddToShoppingCartAction, LoadShoppingCartAction, ShoppingCartLoadedAction } from './shopping-cart.actions';
import { ShoppingCartEffects } from './shopping-cart.effects';

describe('ShoppingCartEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartEffects;
    let shoppingCartService: ShoppingCartService;

    const shoppingCart: ShoppingCart = {
        totalPrice: 0,
        items: []
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({})
            ],
            providers: [
                ShoppingCartEffects,
                ShoppingCartService,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ShoppingCartEffects);
        shoppingCartService = TestBed.get(ShoppingCartService);
    });

    describe('loadShoppingCart', () => {
        it('dispatches a ShoppingCartLoadedAction with the shopping cart returned by the service', () => {
            jest.spyOn(shoppingCartService, 'loadShoppingCart').mockImplementation(() => Observable.of(shoppingCart));

            actions$ = hot('-a-|', { a: new LoadShoppingCartAction() });

            expect(effects$.loadShoppingCart$).toBeObservable(
                hot('-a-|', { a: new ShoppingCartLoadedAction(shoppingCart) })
            );
        });
    });

    describe('addToShoppingCart', () => {
        it('calls the service with the given addition to shopping cart and dispatches a ShoppingCartLoadedAction with the updated shopping cart', () => {
            const additionToShoppingCart = {
                product: 'id',
                quantity: 2
            };

            const addShoppingCartItemSpy = jest.spyOn(shoppingCartService, 'addShoppingCartItem').mockImplementation(() => Observable.of(shoppingCart));

            actions$ = hot('-a-|', { a: new AddToShoppingCartAction(additionToShoppingCart) });

            expect(effects$.addToShoppingCart$).toBeObservable(
                hot('-a-|', { a: new ShoppingCartLoadedAction(shoppingCart) })
            );

            effects$.addToShoppingCart$
                .take(1)
                .subscribe(() => {
                    expect(addShoppingCartItemSpy).toHaveBeenCalledWith(additionToShoppingCart);
                })
        });
    });
});
