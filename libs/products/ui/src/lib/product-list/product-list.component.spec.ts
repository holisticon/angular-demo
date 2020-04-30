import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { products } from '@ngxp/products/domain/test';
import { ResourceModule } from '@ngxp/resource';
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
                ProductListComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
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
        const productListEntries = fixture.debugElement.queryAll(By.css('ngxp-product-list-entry'));

        expect(productListEntries.length).toBe(products.length);

        products.forEach((product, index) => {
            expect(productListEntries[index].nativeElement.product).toBe(product);
        })
    });
});
