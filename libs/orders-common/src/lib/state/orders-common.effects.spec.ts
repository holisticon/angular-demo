import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrdersCommonService } from '../orders-common.service';
import { OrderPlacedAction, PlaceOrderAction } from './orders-common.actions';
import { OrdersCommonEffects } from './orders-common.effects';
import { NewOrder, Order, OrderStatus } from '../order.model';
import { orderBuilder, order, newOrder } from '@luchsamapparat/orders-common/test';

describe('OrdersCommonEffects', () => {
    let actions$: Observable<any>;
    let effects$: OrdersCommonEffects;
    let ordersCommonService: OrdersCommonService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({})
            ],
            providers: [
                OrdersCommonEffects,
                OrdersCommonService,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(OrdersCommonEffects);
        ordersCommonService = TestBed.get(OrdersCommonService);
    });

    describe('placeOrder', () => {
        it('calls the service with the given new order and dispatches a OrderPlacedAction with the created order', () => {
            const placeOrderSpy = spyOn(ordersCommonService, 'placeOrder').and.returnValue(observableOf(order));

            actions$ = hot('-a-|', {
                a: new PlaceOrderAction(newOrder)
            });

            expect(effects$.placeOrder$).toBeObservable(
                hot('-a-|', { a: new OrderPlacedAction(order) })
            );

            effects$.placeOrder$
                .pipe(take(1))
                .subscribe(() => {
                    expect(placeOrderSpy).toHaveBeenCalledWith(newOrder);
                });
        });
    });


});
