import { TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingCartCommonModule } from './shopping-cart-common.module';
import { LoadShoppingCartAction } from './state/shopping-cart.actions';
import { ShoppingCartState } from './state/shopping-cart.reducer';

describe('ShoppingCartCommonModule', () => {
    let store: Store<ShoppingCartState>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ]
        });

        store = TestBed.get(Store);
    }));

    it('dispatches a LoadShoppingCartAction on initialization', async(() => {
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');

        const shoppingCartCommonModule = new ShoppingCartCommonModule(store);

        const dispatchedAction: LoadShoppingCartAction = storeDispatchSpy.mock.calls[0][0];
        expect(dispatchedAction).toBeInstanceOf(LoadShoppingCartAction);
    }));
})
