import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { orderPlacedAction } from '@ngxp/orders-common';
import { order } from '@ngxp/orders-common/test';
import { ResourceWith } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCartItem, shoppingCartLoadedAction } from '@ngxp/shopping-cart-common';
import { shoppingCart, shoppingCartItem } from '@ngxp/shopping-cart-common/test';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { deleteShoppingCartItemAction, loadShoppingCartAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartEffects } from './shopping-cart.effects';

describe('ShoppingCartEffects', () => {
    let actions$: Observable<any>;
    let effects$: ShoppingCartEffects;
    let shoppingCartService: ShoppingCartService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true
                    }
                }),
            ],
            providers: [
                ShoppingCartEffects,
                ShoppingCartService,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ShoppingCartEffects);
        shoppingCartService = TestBed.get(ShoppingCartService);
    });

    describe('loadShoppingCart', () => {
        it('dispatches a ShoppingCartLoadedAction with the shopping cart returned by the service', () => {
            spyOn(shoppingCartService, 'loadShoppingCart').and.returnValue(observableOf(shoppingCart));

            actions$ = hot('-a-|', { a: loadShoppingCartAction() });

            expect(effects$.loadShoppingCart$).toBeObservable(
                hot('-a-|', { a: shoppingCartLoadedAction({ shoppingCart }) })
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
                a: updateShoppingCartItemQuantityAction({ quantityUpdate })
            });

            expect(effects$.updateShoppingCartItemQuantity$).toBeObservable(
                hot('-a-|', { a: shoppingCartLoadedAction({ shoppingCart }) })
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
                a: deleteShoppingCartItemAction({ shoppingCartItem })
            });

            expect(effects$.deleteShoppingCartItemQuantity$).toBeObservable(
                hot('-a-|', { a: shoppingCartLoadedAction({ shoppingCart }) })
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
                a: orderPlacedAction({ order })
            });

            expect(effects$.reloadShoppingCart$).toBeObservable(
                hot('-a-|', { a: loadShoppingCartAction() })
            );
        });
    });
});
