import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { newOrder, order, orderHistory } from '@holisticon/orders/test';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderService } from './order.service';
import { loadOrderHistoryAction, orderHistoryLoaded, orderPlacedAction, placeOrderAction } from './orders.actions';
import { OrdersEffects } from './orders.effects';

describe('OrdersEffects', () => {
    let actions$: Observable<Action>;
    let effects$: OrdersEffects;
    let orderService: OrderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                OrdersEffects,
                OrderService,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(OrdersEffects);
        orderService = TestBed.inject(OrderService);
    });

    describe('loadOrderHistory', () => {
        it('dispatches a OrderLoadedAction with the orders returned by the service', () => {
            jest.spyOn(orderService, 'loadOrderHistory').mockReturnValue(observableOf(orderHistory));

            actions$ = hot('-a-|', { a: loadOrderHistoryAction() });

            expect(effects$.loadOrderHistory$).toBeObservable(
                hot('-a-|', { a: orderHistoryLoaded({ orderHistory }) })
            );
        });
    });


    describe('placeOrder', () => {
        it('calls the service with the given new order and dispatches a OrderPlacedAction with the created order', () => {
            const placeOrderSpy = jest.spyOn(orderService, 'placeOrder').mockReturnValue(observableOf(order));

            actions$ = hot('-a-|', {
                a: placeOrderAction({ newOrder })
            });

            expect(effects$.placeOrder$).toBeObservable(
                hot('-a-|', { a: orderPlacedAction({ order }) })
            );

            effects$.placeOrder$
                .pipe(take(1))
                .subscribe(() => {
                    expect(placeOrderSpy).toHaveBeenCalledWith(newOrder);
                });
        });
    });
});
