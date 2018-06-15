import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingCartModule } from './shopping-cart.module';
import { LoadShoppingCartAction } from './state/shopping-cart.actions';
import { ShoppingCartState } from './state/shopping-cart.reducer';

describe('ShoppingCartModule', () => {
    let store: Store<ShoppingCartState>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    StoreModule.forRoot({})
                ]
            });

            store = TestBed.get(Store);
        })
    );

    it('dispatches a LoadShoppingCartAction on initialization', async(() => {
            const storeDispatchSpy = jest.spyOn(store, 'dispatch');

            const shoppingCartModule = new ShoppingCartModule(store);

            const dispatchedAction: LoadShoppingCartAction = storeDispatchSpy.mock.calls[0][0];
            expect(dispatchedAction).toBeInstanceOf(LoadShoppingCartAction);
        })
    );
});
