import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Order, OrderStatus } from '@ngxp/orders-common';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { OrderService } from '../order.service';
import { LoadOrdersAction, OrdersLoadedAction } from './orders.actions';
import { OrdersEffects } from './orders.effects';
import { orders } from '@ngxp/orders-common/test';

describe('OrdersEffects', () => {
    let actions$: Observable<any>;
    let effects$: OrdersEffects;
    let orderService: OrderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({})
            ],
            providers: [
                OrdersEffects,
                OrderService,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(OrdersEffects);
        orderService = TestBed.get(OrderService);
    });

    describe('loadOrder', () => {
        it('dispatches a OrderLoadedAction with the orders returned by the service', () => {
            spyOn(orderService, 'loadOrders').and.returnValue(observableOf(orders));

            actions$ = hot('-a-|', { a: new LoadOrdersAction() });

            expect(effects$.loadOrders$).toBeObservable(
                hot('-a-|', { a: new OrdersLoadedAction(orders) })
            );
        });
    });
});
