import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { addId, ResourceWith } from '@luchsamapparat/common';
import { NewOrder, PlaceOrderAction, PlaceOrderFormComponent } from '@luchsamapparat/orders-common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { UserProfile, UserProfileAppState } from '@luchsamapparat/user-profile-common';
import { Store, StoreModule } from '@ngrx/store';
import { getAppState } from 'ngx-test-helpers';
import 'rxjs/add/observable/of';
import { ShoppingCartItemListComponent } from '../shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from '../shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { DeleteShoppingCartItemAction, UpdateShoppingCartItemQuantityAction } from '../state/shopping-cart.actions';
import { ShoppingCartAppState } from '../state/shopping-cart.reducer';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
    let component: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;
    let store: Store<void>;
    let appState: ShoppingCartAppState;

    const shoppingCartItem = addId({
        name: '',
        description: '',
        price: 1,
        product: 'id',
        quantity: 1
    }, 'id');

    const shoppingCart: ShoppingCart = {
        items: [shoppingCartItem],
        totalPrice: 1
    };

    const emptyShoppingCart: ShoppingCart = {
        items: [],
        totalPrice: 0
    };

    const userProfile: UserProfile = {
        addresses: [addId({
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        }, 'id')],
        paymentOptions: [addId({
            accountOwner: '',
            bic: '',
            iban: ''
        }, 'id')]
    };

    const newOrder: NewOrder = {
        billingAddress: userProfile.addresses[0],
        shippingAddress: userProfile.addresses[0],
        payment: userProfile.paymentOptions[0],
        shoppingCart
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<ShoppingCartAppState & UserProfileAppState>({
                    shoppingCart: state => state,
                    userProfile: state => state
                }, {
                    initialState: {
                        shoppingCart: { shoppingCart },
                        userProfile: { userProfile }
                    }
                }),
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ShoppingCartComponent,
                ShoppingCartItemListComponent,
                ShoppingCartItemComponent,
                ShoppingCartIsEmptyPipe,
                PlaceOrderFormComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        store = TestBed.get(Store);

        getAppState(state => appState = state);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the shopping cart as cfha-shopping-cart-item-list', () => {
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.directive(ShoppingCartItemListComponent)).componentInstance;

        expect(shoppingCartItemList.shoppingCart).toEqual(shoppingCart);
    });

    it('renders the place order form when the shopping cart contains items', () => {
        const placeOrderForm: PlaceOrderFormComponent = fixture.debugElement.query(By.directive(PlaceOrderFormComponent)).componentInstance;

        expect(placeOrderForm.shoppingCart).toEqual(shoppingCart);
        expect(placeOrderForm.userProfile).toEqual(userProfile);
    });

    it('does not render the place order form when the shopping cart is empty', fakeAsync(() => {
        appState.shoppingCart.shoppingCart = emptyShoppingCart;
        store.dispatch({ type: 'some-action' });
        fixture.detectChanges();

        const placeOrderForm = fixture.debugElement.query(By.directive(PlaceOrderFormComponent));

        expect(placeOrderForm).toBeNull();
    }));

    it('dispatches an UpdateShoppingCartItemQuantityAction when the shopping cart item list emits an updateQuantity event', async(() => {
        const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCartItem,
            with: {
                quantity: 2
            }
        };
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.directive(ShoppingCartItemListComponent)).componentInstance;

        shoppingCartItemList.updateQuantity.emit(quantityUpdate);

        const dispatchedAction: UpdateShoppingCartItemQuantityAction = storeDispatchSpy.mock.calls[0][0];
        expect(dispatchedAction).toBeInstanceOf(UpdateShoppingCartItemQuantityAction);
        expect(dispatchedAction.payload).toBe(quantityUpdate);
    }));

    it('dispatches an DeleteShoppingCartItemAction when the shopping cart item list emits a delete event', async(() => {
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.directive(ShoppingCartItemListComponent)).componentInstance;

        shoppingCartItemList.delete.emit(shoppingCartItem);

        const dispatchedAction: DeleteShoppingCartItemAction = storeDispatchSpy.mock.calls[0][0];
        expect(dispatchedAction).toBeInstanceOf(DeleteShoppingCartItemAction);
        expect(dispatchedAction.payload).toBe(shoppingCartItem);
    }));

    it('dispatches a PlaceOrderAction when the place order form emits a placeOrder event', async(() => {
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        const placeOrderForm: PlaceOrderFormComponent = fixture.debugElement.query(By.directive(PlaceOrderFormComponent)).componentInstance;

        placeOrderForm.placeOrder.emit(newOrder);

        const dispatchedAction: PlaceOrderAction = storeDispatchSpy.mock.calls[0][0];
        expect(dispatchedAction).toBeInstanceOf(PlaceOrderAction);
        expect(dispatchedAction.payload).toBe(newOrder);
    }));
});
