import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { addId } from '@luchsamapparat/common';
import { Order, OrderStatus } from '@luchsamapparat/orders-common';
import { OrderService } from '../order.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jest-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { LoadOrdersAction, OrdersLoadedAction } from './orders.actions';
import { OrdersEffects } from './orders.effects';

describe('OrdersEffects', () => {
    let actions$: Observable<any>;
    let effects$: OrdersEffects;
    let orderService: OrderService;

    const orders: Order[] = [addId({
        billingAddress: {
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        },
        date: new Date().toISOString(),
        items: [],
        payment: {
            accountOwner: '',
            bic: '',
            iban: ''
        },
        shippingAddress: {
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        },
        status: OrderStatus.Processing
    }, 'id')];

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
            jest
                .spyOn(orderService, 'loadOrders')
                .mockImplementation(() => Observable.of(orders));

            actions$ = hot('-a-|', { a: new LoadOrdersAction() });

            expect(effects$.loadOrders$).toBeObservable(
                hot('-a-|', { a: new OrdersLoadedAction(orders) })
            );
        });
    });
});
