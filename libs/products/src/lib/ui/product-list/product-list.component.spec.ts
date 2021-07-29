import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { products } from '@holisticon/products/test';
import { ResourceModule } from '@holisticon/resource';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    beforeEach(waitForAsync(() => {
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
        const productListEntries = fixture.debugElement.queryAll(By.css('holisticon-product-list-entry'));

        expect(productListEntries.length).toBe(products.length);

        products.forEach((product, index) => {
            expect(productListEntries[index].nativeElement.product).toBe(product);
        })
    });
});
