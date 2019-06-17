import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { orders } from '@ngxp/orders-common/test';
import { DataPersistence } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { OrderService } from '../order.service';
import { LoadOrdersAction, OrdersLoadedAction } from './orders.actions';
import { OrdersEffects } from './orders.effects';

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
