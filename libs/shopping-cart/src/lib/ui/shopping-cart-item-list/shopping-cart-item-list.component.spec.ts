import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ResourceWith } from '@holisticon/resource';
import { shoppingCart } from '@holisticon/shopping-cart/test';
import { take } from 'rxjs/operators';
import { QuantityUpdate, ShoppingCartItem } from '../../domain';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';

registerLocaleData(localeDe, 'de');

describe('ShoppingCartItemListComponent', () => {
    let component: ShoppingCartItemListComponent;
    let fixture: ComponentFixture<ShoppingCartItemListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ShoppingCartItemListComponent
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ],
            providers: [
                { provide: LOCALE_ID, useValue: 'de' }
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
        const shoppingCartItemRows = fixture.debugElement.queryAll(By.css('[holisticon-shopping-cart-item-row]'));

        expect(shoppingCartItemRows.length).toBe(shoppingCart.items.length);

        shoppingCart.items.forEach((shoppingCartItem, index) => {
            const shoppingCartItemRow: ShoppingCartItemComponent = shoppingCartItemRows[index].nativeElement;
            expect(shoppingCartItemRow.shoppingCartItem).toBe(shoppingCartItem);
        });
    });

    it('renders the total price', () => {
        const formattedPrice = shoppingCart.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        expect(fixture.debugElement.query(By.css('.total-price')).nativeNode.textContent)
            .toBe(formattedPrice);
    });

    it('emits an updateQuantity event when the shopping cart item row is emits one', () => {
        const shoppingCartItemRow = fixture.debugElement.query(By.css('[holisticon-shopping-cart-item-row]'));

        const expectedQuantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCartItemRow.nativeElement.shoppingCartItem,
            with: {
                quantity: 2
            }
        };

        fixture.componentInstance.updateQuantity
            .pipe(take(1))
            .subscribe(quantityUpdate => {
                expect(quantityUpdate).toEqual(expectedQuantityUpdate);
            });

        shoppingCartItemRow.triggerEventHandler('updateQuantity', expectedQuantityUpdate);
    });

    it('emits an delete event when the shopping cart item row is emits one', () => {
        const shoppingCartItemRow = fixture.debugElement.query(By.css('[holisticon-shopping-cart-item-row]'));

        fixture.componentInstance.delete
            .pipe(take(1))
            .subscribe(shoppingCartItem => {
                expect(shoppingCartItem).toEqual(shoppingCartItemRow.nativeElement.shoppingCartItem);
            });

        shoppingCartItemRow.triggerEventHandler('delete', shoppingCartItemRow.nativeElement.shoppingCartItem);
    });
});
