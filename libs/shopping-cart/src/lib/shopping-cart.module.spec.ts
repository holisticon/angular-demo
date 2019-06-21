import { async } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { ShoppingCartModule } from './shopping-cart.module';
import { ShoppingCartStore } from './state/shopping-cart-store.service';

describe('ShoppingCartModule', () => {
    it('dispatches a LoadShoppingCartAction on initialization', async(() => {
        const shoppingCartStore = createStoreServiceMock(ShoppingCartStore);
        const loadShoppingCartSpy = spyOn(shoppingCartStore, 'loadShoppingCart');

        const ordersModule = new ShoppingCartModule(shoppingCartStore);

        expect(loadShoppingCartSpy).toHaveBeenCalled();
    }));
});
