import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Resource, addId, getId } from '@luchsamapparat/common';
import { Product } from '@luchsamapparat/products-common';
import 'rxjs/add/operator/take';
import { ProductListEntryComponent } from './product-list-entry.component';

describe('ProductListEntryComponent', () => {
    let component: ProductListEntryComponent;
    let fixture: ComponentFixture<ProductListEntryComponent>;

    const product: Resource<Product> = addId({
        description: '',
        image: '',
        name: '',
        price: 0
    }, 'id');

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ProductListEntryComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListEntryComponent);
        component = fixture.componentInstance;
        component.product = product;
        fixture.detectChanges();
    });

    it('emits an addToShoppingCart event when the form is submitted', () => {
        const expectedQuantity = 2;
        const form = fixture.debugElement.query(By.css('form'));
        const quantityFormControl = fixture.componentInstance.quantity.setValue(expectedQuantity);

        fixture.componentInstance.addToShoppingCart
            .take(1)
            .subscribe(additionToShoppingCart => {
                expect(additionToShoppingCart).toEqual({
                    product: getId(product),
                    quantity: expectedQuantity
                });
            })

        form.nativeElement.dispatchEvent(new Event('submit'));
    });
});
