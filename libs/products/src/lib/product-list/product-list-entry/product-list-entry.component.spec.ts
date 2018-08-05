import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { getId, Resource } from '@luchsamapparat/common';
import { Product } from '@luchsamapparat/products-common';
import { take } from 'rxjs/operators';
import { ProductListEntryComponent } from './product-list-entry.component';
import { product } from '@luchsamapparat/products-common/test';

describe('ProductListEntryComponent', () => {
    let component: ProductListEntryComponent;
    let fixture: ComponentFixture<ProductListEntryComponent>;

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
            .pipe(take(1))
            .subscribe(additionToShoppingCart => {
                expect(additionToShoppingCart).toEqual({
                    product: getId(product),
                    quantity: expectedQuantity
                });
            })

        form.nativeElement.dispatchEvent(new Event('submit'));
    });
});
