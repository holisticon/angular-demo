import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import 'rxjs/add/operator/take';
import { UpdateQuantityFormComponent } from '../../shopping-cart-item-list/shopping-cart-item/update-quantity-form/update-quantity-form.component';
import { ShoppingCartItemComponent } from './shopping-cart-item.component';

describe('ShoppingCartItemComponent', () => {
    let component: ShoppingCartItemComponent;
    let fixture: ComponentFixture<ShoppingCartItemComponent>;

    const shoppingCartItem: ShoppingCartItem = {
        name: '',
        description: '',
        price: 1,
        product: 'id',
        quantity: 1
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ShoppingCartItemComponent,
                UpdateQuantityFormComponent
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
        expect(fixture.debugElement.query(By.css('.name')).nativeNode.textContent).toBe(shoppingCartItem.name);
        expect(fixture.debugElement.query(By.css('.description')).nativeNode.textContent).toBe(shoppingCartItem.description);
        expect(fixture.debugElement.query(By.css('.price')).nativeNode.textContent).toBe(shoppingCartItem.price.toFixed(2));
    });

    it('renders the update quantity form', () => {
        const updateQuantityForm: UpdateQuantityFormComponent = fixture.debugElement.query(By.directive(UpdateQuantityFormComponent)).componentInstance;
        expect(updateQuantityForm.shoppingCartItem).toBe(shoppingCartItem);
    });

    it('emits an updateQuantity event when the update quantity form is emits one', () => {
        const quantityUpdate: ResourceWith<QuantityUpdate, ShoppingCartItem> = {
            resource: shoppingCartItem,
            with: {
                quantity: 2
            }
        };

        const updateQuantityForm: UpdateQuantityFormComponent = fixture.debugElement.query(By.directive(UpdateQuantityFormComponent)).componentInstance;

        updateQuantityForm.updateQuantity.emit(quantityUpdate);

        fixture.componentInstance.updateQuantity
            .take(1)
            .subscribe(expectedQuantityUpdate => {
                expect(expectedQuantityUpdate).toEqual(expectedQuantityUpdate);
            })
    });

    it('emits a delete event when the remove button is clicked', () => {
        const removeButton: HTMLButtonElement = fixture.debugElement.query(By.css('.remove')).nativeElement;

        fixture.componentInstance.delete
            .take(1)
            .subscribe(emittedShoppingCartItem => {
                expect(emittedShoppingCartItem).toEqual(shoppingCartItem);
            });

        removeButton.dispatchEvent(new Event('click'));
    });

});
