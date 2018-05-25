import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShoppingCart, ShoppingCartAppState } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartItemListComponent } from '@luchsamapparat/shopping-cart/src/shopping-cart-item-list/shopping-cart-item-list.component';
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
                ShoppingCartItemListComponent
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

    it('renders the search results as cfha-product-list', () => {
        const shoppingCartItemList: ShoppingCartItemListComponent = fixture.debugElement.query(By.directive(ShoppingCartItemListComponent)).componentInstance

        expectElementFromFixture(fixture, 'cfha-shopping-cart-item-list').not.toBeNull();
        expect(shoppingCartItemList.shoppingCart).toEqual(shoppingCart);
    });
});
