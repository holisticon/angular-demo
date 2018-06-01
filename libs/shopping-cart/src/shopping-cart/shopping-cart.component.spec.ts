import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartAppState, ShoppingCartItem, UpdateShoppingCartItemQuantityAction } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartItemListComponent } from '@luchsamapparat/shopping-cart/src/shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from '@luchsamapparat/shopping-cart/src/shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { Store, StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from 'ngx-test-helpers';
import { ShoppingCartComponent } from './shopping-cart.component';


describe('ShoppingCartComponent', () => {
    let component: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;
    let store: Store<void>;

    const shoppingCart: ShoppingCart = {
        items: [{
            name: '',
            description: '',
            price: 1,
            product: 'id',
            quantity: 1
        }],
        totalPrice: 1
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<ShoppingCartAppState>({
                    shoppingCart: state => state
                }, {
                    initialState: {
                        shoppingCart: {
                            shoppingCart
                        }
                    }
                }),
            ],
            declarations: [
                ShoppingCartComponent,
                ShoppingCartItemListComponent,
                ShoppingCartItemComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        store = TestBed.get(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the shopping cart as cfha-shopping-cart-item-list', () => {
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.directive(ShoppingCartItemListComponent)).componentInstance

        expectElementFromFixture(fixture, 'cfha-shopping-cart-item-list').not.toBeNull();
        expect(shoppingCartItemList.shoppingCart).toEqual(shoppingCart);
    });

    it('dispatches an UpdateShoppingCartItemQuantityAction when the shopping cart item list emits an updateQuantity event', async(() => {
        const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCart.items[0],
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
});
