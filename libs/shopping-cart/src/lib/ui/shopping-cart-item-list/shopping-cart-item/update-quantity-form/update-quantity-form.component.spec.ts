import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { shoppingCartItem } from '@holisticon/shopping-cart/test';
import { take } from 'rxjs/operators';
import { UpdateQuantityFormComponent } from './update-quantity-form.component';

describe('UpdateQuantityFormComponent', () => {
    let component: UpdateQuantityFormComponent;
    let fixture: ComponentFixture<UpdateQuantityFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                UpdateQuantityFormComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateQuantityFormComponent);
        component = fixture.componentInstance;
        component.shoppingCartItem = shoppingCartItem;
        fixture.detectChanges();
    });

    it('sets the initial value of the quantity field to the current quantity of the shopping cart item', () => {
        expect(fixture.componentInstance.quantity.value).toBe(shoppingCartItem.quantity);
    });

    it('emits an updateQuantity event when the form is submitted', () => {
        const expectedQuantity = 2;
        const form = fixture.debugElement.query(By.css('form'));
        fixture.componentInstance.quantity.setValue(expectedQuantity);

        fixture.componentInstance.updateQuantity
            .pipe(take(1))
            .subscribe((shoppingCartItemWithQuantityUpdate) => {
                expect(shoppingCartItemWithQuantityUpdate).toEqual({
                    resource: shoppingCartItem,
                    with: {
                        quantity: expectedQuantity
                    }
                });
            })

        form.nativeElement.dispatchEvent(new Event('submit'));
    });
});
