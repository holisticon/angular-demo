import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { newOrder, order } from '@ngxp/orders-common/test';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrdersCommonService } from '../orders-common.service';
import { orderPlacedAction, placeOrderAction } from './orders-common.actions';
import { OrdersCommonEffects } from './orders-common.effects';

describe('OrdersCommonEffects', () => {
    let actions$: Observable<any>;
    let effects$: OrdersCommonEffects;
    let ordersCommonService: OrdersCommonService;

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
                OrdersCommonEffects,
                OrdersCommonService,
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
