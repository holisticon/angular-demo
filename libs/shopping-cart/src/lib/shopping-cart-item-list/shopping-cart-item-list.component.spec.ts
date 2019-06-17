import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ResourceWith } from '@ngxp/common';
import { QuantityUpdate, ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { shoppingCart } from '@ngxp/shopping-cart-common/test';
import { take } from 'rxjs/operators';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
import { UpdateQuantityFormComponent } from './shopping-cart-item/update-quantity-form/update-quantity-form.component';

describe('ShoppingCartItemListComponent', () => {
    let component: ShoppingCartItemListComponent;
    let fixture: ComponentFixture<ShoppingCartItemListComponent>;

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

        expect(shoppingCartItemRows.length).toBe(shoppingCart.items.length);

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

        fixture.componentInstance.updateQuantity
            .pipe(take(1))
            .subscribe(quantityUpdate => {
                expect(quantityUpdate).toEqual(expectedQuantityUpdate);
            });

        shoppingCartItemRow.updateQuantity.emit(expectedQuantityUpdate);
    });

    it('emits an delete event when the shopping cart item row is emits one', () => {
        const shoppingCartItemRow: ShoppingCartItemComponent = fixture.debugElement.query(By.directive(ShoppingCartItemComponent)).componentInstance;

        fixture.componentInstance.delete
            .pipe(take(1))
            .subscribe(shoppingCartItem => {
                expect(shoppingCartItem).toEqual(shoppingCartItemRow.shoppingCartItem);
            });

        shoppingCartItemRow.delete.emit(shoppingCartItemRow.shoppingCartItem);
    });
});
