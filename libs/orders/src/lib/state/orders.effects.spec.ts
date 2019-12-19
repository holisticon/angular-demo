import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { orderHistory } from '@ngxp/orders-common/test';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { OrderService } from '../order.service';
import { loadOrderHistoryAction, orderHistoryLoaded } from './orders.actions';
import { OrdersEffects } from './orders.effects';

describe('OrdersEffects', () => {
    let actions$: Observable<any>;
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

        effects$ = TestBed.get(OrdersEffects);
        orderService = TestBed.get(OrderService);
    });

    describe('loadOrderHistory', () => {
        it('dispatches a OrderLoadedAction with the orders returned by the service', () => {
            spyOn(orderService, 'loadOrderHistory').and.returnValue(observableOf(orderHistory));

            actions$ = hot('-a-|', { a: loadOrderHistoryAction() });

            expect(effects$.loadOrderHistory$).toBeObservable(
                hot('-a-|', { a: orderHistoryLoaded({ orderHistory }) })
            );
        });
    });
});
