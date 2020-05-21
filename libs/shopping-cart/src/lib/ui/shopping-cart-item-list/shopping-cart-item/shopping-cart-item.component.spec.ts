import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ResourceModule, ResourceWith } from '@ngxp/resource';
import { shoppingCartItem } from '@ngxp/shopping-cart/test';
import { take } from 'rxjs/operators';
import { QuantityUpdate, ShoppingCartItem } from '../../../domain/shopping-cart';
import { ShoppingCartItemComponent } from './shopping-cart-item.component';

describe('ShoppingCartItemComponent', () => {
    let component: ShoppingCartItemComponent;
    let fixture: ComponentFixture<ShoppingCartItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                ResourceModule
            ],
            declarations: [
                ShoppingCartItemComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartItemComponent);
        component = fixture.componentInstance;
        component.shoppingCartItem = shoppingCartItem;
        fixture.detectChanges();
    });

    it('renders the shopping cart item', () => {
        expect(fixture.debugElement.query(By.css('.name')).nativeNode.textContent).toBe(shoppingCartItem.productName);
        expect(fixture.debugElement.query(By.css('.description')).nativeNode.textContent).toBe(shoppingCartItem.productDescription);
        expect(fixture.debugElement.query(By.css('.price')).nativeNode.textContent).toBe(shoppingCartItem.price.toFixed(2));
    });

    it('renders the update quantity form', () => {
        const updateQuantityForm = fixture.debugElement.query(By.css('ngxp-update-quantity-form')).nativeElement;
        expect(updateQuantityForm.shoppingCartItem).toBe(shoppingCartItem);
    });

    it('emits an updateQuantity event when the update quantity form is emits one', () => {
        const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCartItem,
            with: {
                quantity: 2
            }
        };

        const updateQuantityForm = fixture.debugElement.query(By.css('ngxp-update-quantity-form'));

        fixture.componentInstance.updateQuantity
            .pipe(take(1))
            .subscribe(expectedQuantityUpdate => {
                expect(expectedQuantityUpdate).toEqual(expectedQuantityUpdate);
            });

        updateQuantityForm.triggerEventHandler('updateQuantity', quantityUpdate);
    });

    it('emits a delete event when the remove button is clicked', () => {
        const removeButton: HTMLButtonElement = fixture.debugElement.query(By.css('.remove')).nativeElement;

        fixture.componentInstance.delete
            .pipe(take(1))
            .subscribe(emittedShoppingCartItem => {
                expect(emittedShoppingCartItem).toEqual(shoppingCartItem);
            });

        removeButton.dispatchEvent(new Event('click'));
    });

});
