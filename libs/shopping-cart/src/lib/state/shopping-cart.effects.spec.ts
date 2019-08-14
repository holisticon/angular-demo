import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { OrdersCommonStore } from '@ngxp/orders-common';
import { order } from '@ngxp/orders-common/test';
import { ResourceWith } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCartCommonStore, ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { shoppingCart, shoppingCartItem } from '@ngxp/shopping-cart-common/test';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { deleteShoppingCartItemAction, loadShoppingCartAction, shoppingCartUpdatedAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartEffects } from './shopping-cart.effects';

describe('ShoppingCartEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartEffects;
    let shoppingCartService: ShoppingCartService;
    let ordersCommonStore: StoreServiceMock<OrdersCommonStore>;
    let shoppingCartCommonStore: StoreServiceMock<ShoppingCartCommonStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                ShoppingCartEffects,
                ShoppingCartService,
                provideMockActions(() => actions$),
                provideStoreServiceMock(OrdersCommonStore),
                provideStoreServiceMock(ShoppingCartCommonStore)
            ]
        });

        effects$ = TestBed.get(ShoppingCartEffects);
        shoppingCartService = TestBed.get(ShoppingCartService);
        ordersCommonStore = TestBed.get(OrdersCommonStore);
        shoppingCartCommonStore = TestBed.get(ShoppingCartCommonStore);
    });

    describe('itemAddedToShoppingCart', () => {
        it('dispatches a ShoppingCartUpdatedAction with the shopping cart from the ItemAddedToShoppingCartAction', () => {
            shoppingCartCommonStore.itemAddedToShoppingCart$.next(shoppingCart);

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
            ordersCommonStore.orderPlaced$.next(order);

            expect(effects$.reloadShoppingCart$).toBeObservable(
                hot('a', { a: loadShoppingCartAction() })
            );
        });
    });
});
