import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list.component';


describe('ShoppingCartItemListComponent', () => {
    let component: ShoppingCartItemListComponent;
    let fixture: ComponentFixture<ShoppingCartItemListComponent>;

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
            declarations: [ShoppingCartItemListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartItemListComponent);
        component = fixture.componentInstance;
        component.shoppingCart = shoppingCart;
        fixture.detectChanges();
    });

    it('renders a row for each shopping cart item', () => {
        expect(fixture.debugElement.queryAll(By.css('tbody > tr'))).toHaveLength(shoppingCart.items.length);

        shoppingCart.items.forEach((shoppingCartItem, index) => {
            const row = fixture.debugElement.query(By.css(`tbody > tr:nth-child(${index +1})`));
            expect(row.query(By.css('.name')).nativeNode.textContent).toBe(shoppingCartItem.name);
            expect(row.query(By.css('.description')).nativeNode.textContent).toBe(shoppingCartItem.description);
            expect(row.query(By.css('.price')).nativeNode.textContent).toBe(shoppingCartItem.price.toFixed(2));
            expect(row.query(By.css('.quantity')).nativeNode.value).toBe(shoppingCartItem.quantity.toString());
        });
    });

    it('renders the total price', () => {
        expect(fixture.debugElement.query(By.css('tfoot td.total-price')).nativeNode.textContent).toBe(shoppingCart.totalPrice.toFixed(2));
    });
});
