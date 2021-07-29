import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ResourceWith } from '@holisticon/resource';
import { emptyShoppingCart, shoppingCart, shoppingCartItem } from '@holisticon/shopping-cart/test';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { QuantityUpdate, ShoppingCartItem } from '../../domain';
import { ShoppingCartStore } from '../../state';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
    let component: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;

    let shoppingCartStore: StoreServiceMock<ShoppingCartStore>;

    beforeEach(waitForAsync(() => {
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
                provideStoreServiceMock(ShoppingCartStore, {
                    getShoppingCart: shoppingCart
                })
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        shoppingCartStore = TestBed.inject(ShoppingCartStore) as any;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the shopping cart as holisticon-shopping-cart-item-list', () => {
        const shoppingCartItemList = fixture.debugElement.query(By.css('holisticon-shopping-cart-item-list')).nativeElement;

        expect(shoppingCartItemList.shoppingCart).toEqual(shoppingCart);
    });

    it('renders the place order form when the shopping cart contains items', () => {
        const placeOrderForm = fixture.debugElement.query(By.css('holisticon-place-order-form')).nativeElement;

        expect(placeOrderForm.orderItems).toEqual(shoppingCart.items);
    });

    it('does not render the place order form when the shopping cart is empty', fakeAsync(() => {
        shoppingCartStore.getShoppingCart().next(emptyShoppingCart);

        fixture.detectChanges();

        const placeOrderForm = fixture.debugElement.query(By.css('holisticon-place-order-form'));

        expect(placeOrderForm).toBeNull();
    }));

    it('dispatches an UpdateShoppingCartItemQuantityAction when the shopping cart item list emits an updateQuantity event', waitForAsync(() => {
        const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCartItem,
            with: {
                quantity: 2
            }
        };
        const updateShoppingCartItemQuantitySpy = jest.spyOn(shoppingCartStore, 'updateShoppingCartItemQuantity');
        const shoppingCartItemList = fixture.debugElement.query(By.css('holisticon-shopping-cart-item-list'));

        shoppingCartItemList.triggerEventHandler('updateQuantity', quantityUpdate);

        expect(updateShoppingCartItemQuantitySpy).toHaveBeenCalledWith({ quantityUpdate });
    }));

    it('dispatches an DeleteShoppingCartItemAction when the shopping cart item list emits a delete event', waitForAsync(() => {
        const deleteShoppingCartItemSpy = jest.spyOn(shoppingCartStore, 'deleteShoppingCartItem');
        const shoppingCartItemList = fixture.debugElement.query(By.css('holisticon-shopping-cart-item-list'));

        shoppingCartItemList.triggerEventHandler('delete', shoppingCartItem);

        expect(deleteShoppingCartItemSpy).toHaveBeenCalledWith({ shoppingCartItem });
    }));
});
