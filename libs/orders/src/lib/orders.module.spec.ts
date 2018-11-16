import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OrdersModule } from './orders.module';
import { LoadOrdersAction } from './state/orders.actions';
import { OrdersState } from './state/orders.reducer';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { OrdersStore } from './state/orders-store.service';

describe('OrdersModule', () => {
    it('loads the orders on initialization', async(() => {
            const ordersStore = createStoreServiceMock(OrdersStore);
            const loadOrdersSpy = spyOn(ordersStore, 'loadOrders');

            const ordersModule = new OrdersModule(ordersStore);

            expect(loadOrdersSpy).toHaveBeenCalled();
        })
    );
});
