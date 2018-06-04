import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import 'rxjs/add/operator/take';
import { ShoppingCartItemComponent } from '../shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
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

    it('emits an updateQuantity event when the shopping cart item row is emits one', () => {
        const shoppingCartItemRow: ShoppingCartItemComponent = fixture.debugElement.query(By.directive(ShoppingCartItemComponent)).componentInstance;

        const expectedQuantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCartItemRow.shoppingCartItem,
            with: {
                quantity: 2
            }
        };

        shoppingCartItemRow.updateQuantity.emit(expectedQuantityUpdate);

        fixture.componentInstance.updateQuantity
            .take(1)
            .subscribe(quantityUpdate => {
                expect(quantityUpdate).toEqual(expectedQuantityUpdate);
            });
    });

    it('emits an delete event when the shopping cart item row is emits one', () => {
        const shoppingCartItemRow: ShoppingCartItemComponent = fixture.debugElement.query(By.directive(ShoppingCartItemComponent)).componentInstance;

        shoppingCartItemRow.delete.emit(shoppingCartItemRow.shoppingCartItem);

        fixture.componentInstance.delete
            .take(1)
            .subscribe(shoppingCartItem => {
                expect(shoppingCartItem).toEqual(shoppingCartItemRow.shoppingCartItem);
            });
    });
});