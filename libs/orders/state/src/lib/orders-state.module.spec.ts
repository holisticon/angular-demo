import { fakeAsync, tick } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { OrdersStateModule } from './orders-state.module';
import { OrdersStore } from './orders-store.service';

describe('OrdersStateModule', () => {
    it('loads the orders on initialization', fakeAsync(() => {
        const ordersStore = createStoreServiceMock(OrdersStore);
        const loadOrdersSpy = spyOn(ordersStore, 'loadOrderHistory');

        // tslint:disable-next-line: no-unused-expression
        new OrdersStateModule(ordersStore);

        tick();

        expect(loadOrdersSpy).toHaveBeenCalled();
    }));
});
