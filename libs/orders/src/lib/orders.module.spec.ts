import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OrdersModule } from './orders.module';
import { LoadOrdersAction } from './state/orders.actions';
import { OrdersState } from './state/orders.reducer';

describe('OrdersModule', () => {
    let store: Store<OrdersState>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [StoreModule.forRoot({})]
            });

            store = TestBed.get(Store);
        })
    );

    it('dispatches a LoadOrdersAction on initialization', async(() => {
            const storeDispatchSpy = jest.spyOn(store, 'dispatch');

            const ordersModule = new OrdersModule(store);

            const dispatchedAction: LoadOrdersAction = storeDispatchSpy.mock.calls[0][0];
            expect(dispatchedAction).toBeInstanceOf(LoadOrdersAction);
        })
    );
});
