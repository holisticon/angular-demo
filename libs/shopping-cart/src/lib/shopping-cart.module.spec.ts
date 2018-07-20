import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingCartModule } from './shopping-cart.module';
import { LoadShoppingCartAction } from './state/shopping-cart.actions';
import { ShoppingCartState } from './state/shopping-cart.reducer';
import { createStoreServiceMock } from '@ngx-patterns/store-service/testing';
import { ShoppingCartStore } from './state/shopping-cart-store.service';

describe('ShoppingCartModule', () => {
    it('dispatches a LoadShoppingCartAction on initialization', async(() => {
        const shoppingCartStore = createStoreServiceMock(ShoppingCartStore);
        const loadShoppingCartSpy = jest.spyOn(shoppingCartStore, 'loadShoppingCart');

        const ordersModule = new ShoppingCartModule(shoppingCartStore);

        expect(loadShoppingCartSpy).toHaveBeenCalled();
    }));
});
