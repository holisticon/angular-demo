import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { OrdersStore } from '@ngxp/orders/state';
import { order } from '@ngxp/orders/test';
import { ResourceWith } from '@ngxp/resource';
import { additionToShoppingCart, shoppingCart, shoppingCartItem } from '@ngxp/shopping-cart/test';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuantityUpdate, ShoppingCartItem } from '../domain/shopping-cart';
import { ShoppingCartStore } from './shopping-cart-store.service';
import { addToShoppingCartAction, deleteShoppingCartItemAction, itemAddedToShoppingCartAction, loadShoppingCartAction, shoppingCartUpdatedAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartEffects } from './shopping-cart.effects';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartEffects;
    let shoppingCartService: ShoppingCartService;
    let ordersStore: StoreServiceMock<OrdersStore>;
    let shoppingCartStore: StoreServiceMock<ShoppingCartStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                ShoppingCartEffects,
                ShoppingCartService,
                provideMockActions(() => actions$),
                provideStoreServiceMock(OrdersStore),
                provideStoreServiceMock(ShoppingCartStore)
            ]
        });

        effects$ = TestBed.inject(ShoppingCartEffects);
        shoppingCartService = TestBed.inject(ShoppingCartService);
        ordersStore = TestBed.inject(OrdersStore) as any;
        shoppingCartStore = TestBed.inject(ShoppingCartStore) as any;
    });

    describe('addToShoppingCart', () => {
        it('calls the service with the given addition to shopping cart and dispatches a ItemAddedToShoppingCartAction with the updated shopping cart', () => {
            const addToShoppingCartSpy = spyOn(shoppingCartService, 'addToShoppingCart').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', {
                a: addToShoppingCartAction({ additionToShoppingCart })
            });

            expect(effects$.addToShoppingCart$).toBeObservable(
                hot('-a-|', { a: itemAddedToShoppingCartAction({ shoppingCart }) })
            );

            effects$.addToShoppingCart$
                .pipe(take(1))
                .subscribe(() => {
                    expect(addToShoppingCartSpy).toHaveBeenCalledWith(additionToShoppingCart);
                });
        });
    });

    describe('itemAddedToShoppingCart', () => {
        it('dispatches a ShoppingCartUpdatedAction with the shopping cart from the ItemAddedToShoppingCartAction', () => {
            shoppingCartStore.itemAddedToShoppingCart$.next(shoppingCart);

            expect(effects$.itemAddedToShoppingCart$).toBeObservable(
                hot('a', { a: shoppingCartUpdatedAction({ shoppingCart }) })
            );
        });
    });

    describe('loadShoppingCart', () => {
        it('dispatches a ShoppingCartUpdatedAction with the shopping cart returned by the service', () => {
            spyOn(shoppingCartService, 'loadShoppingCart').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', { a: loadShoppingCartAction() });

            expect(effects$.loadShoppingCart$).toBeObservable(
                hot('-a-|', { a: shoppingCartUpdatedAction({ shoppingCart }) })
            );
        });
    });

    describe('updateQuantity', () => {
        it('calls the service with the given quantity update and dispatches a ShoppingCartUpdatedAction with the updated shopping cart', () => {
            const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
                resource: shoppingCartItem,
                with: {
                    quantity: 2
                }
            };

            const updateQuantitySpy = spyOn(shoppingCartService, 'updateShoppingCartItemQuantity').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', {
                a: updateShoppingCartItemQuantityAction({ quantityUpdate })
            });

            expect(effects$.updateShoppingCartItemQuantity$).toBeObservable(
                hot('-a-|', { a: shoppingCartUpdatedAction({ shoppingCart }) })
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
        it('calls the service with the given shopping cart item and dispatches a ShoppingCartUpdatedAction with the updated shopping cart', () => {
            const deleteShoppingCartItemSpy = spyOn(shoppingCartService, 'deleteShoppingCartItem').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', {
                a: deleteShoppingCartItemAction({ shoppingCartItem })
            });

            expect(effects$.deleteShoppingCartItemQuantity$).toBeObservable(
                hot('-a-|', { a: shoppingCartUpdatedAction({ shoppingCart }) })
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
            ordersStore.orderPlaced$.next(order);

            expect(effects$.reloadShoppingCart$).toBeObservable(
                hot('a', { a: loadShoppingCartAction() })
            );
        });
    });
});
