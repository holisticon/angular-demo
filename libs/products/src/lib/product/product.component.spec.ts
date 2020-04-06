import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { product } from '@ngxp/products/test';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProductComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
    });

    it('does not render anything if no product is given', () => {
        component.product = null;

        fixture.detectChanges();

        expect(fixture.debugElement.children).toHaveLength(0);
    });

    describe('with product given', () => {
        beforeEach(() => {
            component.product = product;
            fixture.detectChanges();
        });

        it('renders the product name and description', () => {
            expect(fixture.debugElement.query(By.css('h1')).nativeNode.textContent).toBe(product.productName);
            expect(fixture.debugElement.query(By.css('.description')).nativeNode.textContent).toBe(product.productDescription);
        });

        it('renders the product image', () => {
            const image = fixture.debugElement.query(By.css('ngxp-product-image')).nativeNode;

            expect(image.product).toBe(product);
        });

        it('renders the Add to Shopping Cart form', () => {
            const addToShoppingCartForm = fixture.debugElement.query(By.css('ngxp-add-to-shopping-cart-form')).nativeNode;

            expect(addToShoppingCartForm.product).toBe(product);
        });
    });
});
