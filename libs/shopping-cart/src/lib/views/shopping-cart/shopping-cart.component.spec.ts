import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OrdersStore } from '@ngxp/orders/state';
import { newOrder } from '@ngxp/orders/test';
import { ResourceWith } from '@ngxp/resource';
import { emptyShoppingCart, shoppingCart, shoppingCartItem } from '@ngxp/shopping-cart/test';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileStore } from '@ngxp/user-profile/state';
import { userProfile } from '@ngxp/user-profile/test';
import { QuantityUpdate, ShoppingCartItem } from '../../domain';
import { ShoppingCartStore } from '../../state';
import { ShoppingCartItemListComponent } from '../../ui';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
    let component: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;

    let ordersStore: StoreServiceMock<OrdersStore>;
    let shoppingCartStore: StoreServiceMock<ShoppingCartStore>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ShoppingCartComponent,
                ShoppingCartIsEmptyPipe
            ],
            providers: [
                provideStoreServiceMock(OrdersStore),
                provideStoreServiceMock(ShoppingCartStore, {
                    getShoppingCart: shoppingCart
                }),
                provideStoreServiceMock(UserProfileStore, {
                    getUserProfile: userProfile
                })
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        ordersStore = TestBed.inject(OrdersStore) as any;
        shoppingCartStore = TestBed.inject(ShoppingCartStore) as any;
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
        const placeOrderForm = fixture.debugElement.query(By.css('ngxp-place-order-form')).nativeElement;

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
        const placeOrderSpy = spyOn(ordersStore, 'placeOrder');
        const placeOrderForm = fixture.debugElement.query(By.css('ngxp-place-order-form'));

        placeOrderForm.triggerEventHandler('placeOrder', newOrder);

        expect(placeOrderSpy).toHaveBeenCalledWith({ newOrder });
    }));
});
