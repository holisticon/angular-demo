import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { addId, Resource } from '@luchsamapparat/common';
import { ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { take } from 'rxjs/operators';
import { UpdateQuantityFormComponent } from './update-quantity-form.component';

describe('UpdateQuantityFormComponent', () => {
    let component: UpdateQuantityFormComponent;
    let fixture: ComponentFixture<UpdateQuantityFormComponent>;

    const shoppingCartItem: Resource<ShoppingCartItem> = addId({
        name: '',
        description: '',
        price: 1,
        product: 'id',
        quantity: 1
    }, 'id');

    beforeEach(async(() => {
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
        const quantityFormControl = fixture.componentInstance.quantity.setValue(expectedQuantity);

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
