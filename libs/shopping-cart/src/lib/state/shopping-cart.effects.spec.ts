import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ResourceWith } from '@luchsamapparat/common';
import { Order, OrderPlacedAction, OrderStatus } from '@luchsamapparat/orders-common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem, ShoppingCartLoadedAction } from '@luchsamapparat/shopping-cart-common';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { DeleteShoppingCartItemAction, LoadShoppingCartAction, UpdateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartEffects } from './shopping-cart.effects';
import { shoppingCart, shoppingCartItem } from '@luchsamapparat/shopping-cart-common/test';
import { order } from '@luchsamapparat/orders-common/test';

describe('ShoppingCartEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartEffects;
    let shoppingCartService: ShoppingCartService;

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
            spyOn(shoppingCartService, 'loadShoppingCart').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', { a: new LoadShoppingCartAction() });

            expect(effects$.loadShoppingCart$).toBeObservable(
                hot('-a-|', { a: new ShoppingCartLoadedAction(shoppingCart) })
            );
        });
    });

    describe('updateQuantity', () => {
        it('calls the service with the given quantity update and dispatches a ShoppingCartLoadedAction with the updated shopping cart', () => {
            const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
                resource: shoppingCartItem,
                with: {
                    quantity: 2
                }
            };

            const updateQuantitySpy = spyOn(shoppingCartService, 'updateShoppingCartItemQuantity').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', {
                a: new UpdateShoppingCartItemQuantityAction(quantityUpdate)
            });

            expect(effects$.updateShoppingCartItemQuantity$).toBeObservable(
                hot('-a-|', { a: new ShoppingCartLoadedAction(shoppingCart) })
            );

            effects$.updateShoppingCartItemQuantity$
                .pipe(take(1))
                .subscribe(() => {
                    expect(updateQuantitySpy).toHaveBeenCalledWith(
                        quantityUpdate.resource,
                        quantityUpdate.with
                    );
                });
        });
    });

    describe('deleteShoppingCartItem', () => {
        it('calls the service with the given shopping cart item and dispatches a ShoppingCartLoadedAction with the updated shopping cart', () => {
            const deleteShoppingCartItemSpy = spyOn(shoppingCartService, 'deleteShoppingCartItem').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', {
                a: new DeleteShoppingCartItemAction(shoppingCartItem)
            });

            expect(effects$.deleteShoppingCartItemQuantity$).toBeObservable(
                hot('-a-|', { a: new ShoppingCartLoadedAction(shoppingCart) })
            );

            effects$.deleteShoppingCartItemQuantity$
                .pipe(take(1))
                .subscribe(() => {
                    expect(deleteShoppingCartItemSpy).toHaveBeenCalledWith(shoppingCartItem);
                });
        });
    });

    describe('reloadShoppingCart', () => {
        it('dispatches a LoadShoppingCartAction to reload the shopping cart when an order has been placed', () => {
            actions$ = hot('-a-|', {
                a: new OrderPlacedAction(order)
            });

            expect(effects$.reloadShoppingCart$).toBeObservable(
                hot('-a-|', { a: new LoadShoppingCartAction() })
            );
        });
    });
});
