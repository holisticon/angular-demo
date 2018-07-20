import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { addId, ResourceWith } from '@luchsamapparat/common';
import { NewOrder, PlaceOrderAction, PlaceOrderFormComponent, OrdersCommonStore } from '@luchsamapparat/orders-common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { UserProfile, UserProfileCommonStore } from '@luchsamapparat/user-profile-common';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { ShoppingCartItemListComponent } from '../shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from '../shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { ShoppingCartStore } from '../state/shopping-cart-store.service';
import { DeleteShoppingCartItemAction, UpdateShoppingCartItemQuantityAction } from '../state/shopping-cart.actions';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './shopping-cart.component';
import { provideStoreServiceMock, StoreServiceMock } from '@ngx-patterns/store-service/testing';

describe('ShoppingCartComponent', () => {
    let component: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;

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

    let ordersCommonStore: StoreServiceMock<OrdersCommonStore>;
    let shoppingCartStore: StoreServiceMock<ShoppingCartStore>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
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
            providers: [
                provideStoreServiceMock(OrdersCommonStore),
                provideStoreServiceMock(ShoppingCartStore, {
                    getShoppingCart: shoppingCart
                }),
                provideStoreServiceMock(UserProfileCommonStore, {
                    getUserProfile: userProfile
                })
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        ordersCommonStore = TestBed.get(OrdersCommonStore);
        shoppingCartStore = TestBed.get(ShoppingCartStore);
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
        shoppingCartStore.getShoppingCart().next(emptyShoppingCart);

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
        const updateShoppingCartItemQuantitySpy = jest.spyOn(shoppingCartStore, 'updateShoppingCartItemQuantity');
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.directive(ShoppingCartItemListComponent)).componentInstance;

        shoppingCartItemList.updateQuantity.emit(quantityUpdate);

        expect(updateShoppingCartItemQuantitySpy).toHaveBeenCalledWith(quantityUpdate);
    }));

    it('dispatches an DeleteShoppingCartItemAction when the shopping cart item list emits a delete event', async(() => {
        const deleteShoppingCartItemSpy = jest.spyOn(shoppingCartStore, 'deleteShoppingCartItem');
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.directive(ShoppingCartItemListComponent)).componentInstance;

        shoppingCartItemList.delete.emit(shoppingCartItem);

        expect(deleteShoppingCartItemSpy).toHaveBeenCalledWith(shoppingCartItem);
    }));

    it('dispatches a PlaceOrderAction when the place order form emits a placeOrder event', async(() => {
        const placeOrderSpy = jest.spyOn(ordersCommonStore, 'placeOrder');
        const placeOrderForm: PlaceOrderFormComponent = fixture.debugElement.query(By.directive(PlaceOrderFormComponent)).componentInstance;

        placeOrderForm.placeOrder.emit(newOrder);

        expect(placeOrderSpy).toHaveBeenCalledWith(newOrder);
    }));
});
