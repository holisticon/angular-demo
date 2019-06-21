import { async } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { OrdersModule } from './orders.module';
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
