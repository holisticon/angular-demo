import { fakeAsync, tick } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { OrdersModule } from './orders.module';
import { OrdersStore } from './state/orders-store.service';

describe('OrdersModule', () => {
    it('loads the orders on initialization', fakeAsync(() => {
        const ordersStore = createStoreServiceMock(OrdersStore);
        const loadOrdersSpy = spyOn(ordersStore, 'loadOrders');

        // tslint:disable-next-line: no-unused-expression
        new OrdersModule(ordersStore);

        tick();

        expect(loadOrdersSpy).toHaveBeenCalled();
    }));
});
