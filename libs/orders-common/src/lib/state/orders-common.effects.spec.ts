import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { addId } from '@luchsamapparat/common';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrdersCommonService } from '../orders-common.service';
import { OrderPlacedAction, PlaceOrderAction } from './orders-common.actions';
import { OrdersCommonEffects } from './orders-common.effects';
import { NewOrder, Order, OrderStatus } from '../order.model';

describe('OrdersCommonEffects', () => {
    let actions$: Observable<any>;
    let effects$: OrdersCommonEffects;
    let ordersCommonService: OrdersCommonService;

    const newOrder: NewOrder = {
        shoppingCart: {
            items: [addId({
                name: '',
                description: '',
                price: 1,
                product: 'id',
                quantity: 1
            }, 'id')],
            totalPrice: 1
        },
        billingAddress: addId({
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        }, 'id'),
        shippingAddress: addId({
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        }, 'id'),
        payment: addId({
            accountOwner: '',
            bic: '',
            iban: ''
        }, 'id')
    };

    const order: Order = {
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
    };

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
            const placeOrderSpy = jest
                .spyOn(ordersCommonService, 'placeOrder')
                .mockImplementation(() => observableOf(order));

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
