import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { product, products } from '@ngxp/products-common/test';
import { getId, ResourceModule } from '@ngxp/resource';
import { take } from 'rxjs/operators';
import { ProductListEntryComponent } from './product-list-entry/product-list-entry.component';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ResourceModule
            ],
            declarations: [
                ProductListComponent,
                ProductListEntryComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        component.products = products;
        fixture.detectChanges();
    });

    it('renders a row for each product', () => {
        expect(fixture.debugElement.queryAll(By.directive(ProductListEntryComponent)).length).toBe(products.length);
    });

    it('emits an addToShoppingCart event when the form is submitted', async(() => {
        const expectedAdditionToShoppingCart = {
            product: getId(product),
            quantity: 2
        };
        const productListEntry: ProductListEntryComponent = fixture.debugElement.query(By.directive(ProductListEntryComponent)).componentInstance;

        fixture.componentInstance.addToShoppingCart
            .pipe(take(1))
            .subscribe(additionToShoppingCart => {
                expect(additionToShoppingCart).toBe(expectedAdditionToShoppingCart);
            })

        productListEntry.addToShoppingCart.emit(expectedAdditionToShoppingCart);
    }));
});
