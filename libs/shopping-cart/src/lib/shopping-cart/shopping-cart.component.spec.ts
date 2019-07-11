import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { OrdersCommonStore, PlaceOrderFormComponent } from '@ngxp/orders-common';
import { newOrder } from '@ngxp/orders-common/test';
import { ResourceWith } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { emptyShoppingCart, shoppingCart, shoppingCartItem } from '@ngxp/shopping-cart-common/test';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileCommonStore } from '@ngxp/user-profile-common';
import { userProfile } from '@ngxp/user-profile-common/test';
import { ShoppingCartItemListComponent } from '../shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartStore } from '../state/shopping-cart-store.service';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
    let component: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;

    let ordersCommonStore: StoreServiceMock<OrdersCommonStore>;
    let shoppingCartStore: StoreServiceMock<ShoppingCartStore>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true
                    }
                }),
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ShoppingCartComponent,
                ShoppingCartIsEmptyPipe
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

    it('renders the shopping cart as ngxp-shopping-cart-item-list', () => {
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.css('ngxp-shopping-cart-item-list')).nativeElement;

        expect(shoppingCartItemList.shoppingCart).toEqual(shoppingCart);
    });

    it('renders the place order form when the shopping cart contains items', () => {
        const placeOrderForm: PlaceOrderFormComponent = fixture.debugElement.query(By.css('ngxp-place-order-form')).nativeElement;

        expect(placeOrderForm.shoppingCart).toEqual(shoppingCart);
        expect(placeOrderForm.userProfile).toEqual(userProfile);
    });

    it('does not render the place order form when the shopping cart is empty', fakeAsync(() => {
        shoppingCartStore.getShoppingCart().next(emptyShoppingCart);

        fixture.detectChanges();

        const placeOrderForm = fixture.debugElement.query(By.css('ngxp-place-order-form'));

        expect(placeOrderForm).toBeNull();
    }));

    it('dispatches an UpdateShoppingCartItemQuantityAction when the shopping cart item list emits an updateQuantity event', async(() => {
        const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCartItem,
            with: {
                quantity: 2
            }
        };
        const updateShoppingCartItemQuantitySpy = spyOn(shoppingCartStore, 'updateShoppingCartItemQuantity');
        const shoppingCartItemList = fixture.debugElement.query(By.css('ngxp-shopping-cart-item-list'));

        shoppingCartItemList.triggerEventHandler('updateQuantity', quantityUpdate);

        expect(updateShoppingCartItemQuantitySpy).toHaveBeenCalledWith({ quantityUpdate });
    }));

    it('dispatches an DeleteShoppingCartItemAction when the shopping cart item list emits a delete event', async(() => {
        const deleteShoppingCartItemSpy = spyOn(shoppingCartStore, 'deleteShoppingCartItem');
        const shoppingCartItemList = fixture.debugElement.query(By.css('ngxp-shopping-cart-item-list'));

        shoppingCartItemList.triggerEventHandler('delete', shoppingCartItem);

        expect(deleteShoppingCartItemSpy).toHaveBeenCalledWith({ shoppingCartItem });
    }));

    it('dispatches a PlaceOrderAction when the place order form emits a placeOrder event', async(() => {
        const placeOrderSpy = spyOn(ordersCommonStore, 'placeOrder');
        const placeOrderForm = fixture.debugElement.query(By.css('ngxp-place-order-form'));

        placeOrderForm.triggerEventHandler('placeOrder', newOrder);

        expect(placeOrderSpy).toHaveBeenCalledWith({ newOrder });
    }));
});
