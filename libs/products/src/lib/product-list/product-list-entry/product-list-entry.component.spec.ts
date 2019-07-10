import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { product } from '@ngxp/products-common/test';
import { encodeResourceIdAsRouteParam, getId, ResourceModule } from '@ngxp/resource';
import { take } from 'rxjs/operators';
import { ProductListEntryComponent } from './product-list-entry.component';

describe('ProductListEntryComponent', () => {
    let component: ProductListEntryComponent;
    let fixture: ComponentFixture<ProductListEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ResourceModule,
                RouterTestingModule
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

    it('links to the product detail page', () => {
        const link = fixture.debugElement.query(By.css('a'));

        expect(link.nativeElement.getAttribute('href')).toBe(`/${encodeURIComponent(encodeResourceIdAsRouteParam(getId(product)))}`);
    });

    it('emits an addToShoppingCart event when the form is submitted', () => {
        const expectedQuantity = 2;
        const form = fixture.debugElement.query(By.css('form'));

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
