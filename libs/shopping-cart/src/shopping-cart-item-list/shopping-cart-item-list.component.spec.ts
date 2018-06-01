import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartItemComponent } from '@luchsamapparat/shopping-cart/src/shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import 'rxjs/add/operator/take';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list.component';
import { UpdateQuantityFormComponent } from './shopping-cart-item/update-quantity-form/update-quantity-form.component';

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
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ShoppingCartItemListComponent,
                ShoppingCartItemComponent,
                UpdateQuantityFormComponent
            ]
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
        const shoppingCartItemRows = fixture.debugElement.queryAll(By.directive(ShoppingCartItemComponent));

        expect(shoppingCartItemRows).toHaveLength(shoppingCart.items.length);

        shoppingCart.items.forEach((shoppingCartItem, index) => {
            const shoppingCartItemRow: ShoppingCartItemComponent = shoppingCartItemRows[index].componentInstance;
            expect(shoppingCartItemRow.shoppingCartItem).toBe(shoppingCartItem);
        });
    });

    it('renders the total price', () => {
        expect(fixture.debugElement.query(By.css('.total-price')).nativeNode.textContent).toBe(shoppingCart.totalPrice.toFixed(2));
    });

    it('emits an updateQuantity event when the update quantity form is emits one', () => {
        const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCart.items[0],
            with: {
                quantity: 2
            }
        };

        const shoppingCartItemRow: ShoppingCartItemComponent = fixture.debugElement.query(By.directive(ShoppingCartItemComponent)).componentInstance;

        shoppingCartItemRow.updateQuantity.emit(quantityUpdate);

        fixture.componentInstance.updateQuantity
            .take(1)
            .subscribe(expectedQuantityUpdate => {
                expect(expectedQuantityUpdate).toEqual(expectedQuantityUpdate);
            })
    });
});
