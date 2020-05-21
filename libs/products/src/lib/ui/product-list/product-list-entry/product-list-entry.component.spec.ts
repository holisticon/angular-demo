import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { product } from '@ngxp/products/test';
import { encodeResourceUriAsRouteParam, getUri, ResourceModule } from '@ngxp/resource';
import { ProductListEntryComponent } from './product-list-entry.component';

describe('ProductListEntryComponent', () => {
    let component: ProductListEntryComponent;
    let fixture: ComponentFixture<ProductListEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ResourceModule,
                RouterTestingModule
            ],
            declarations: [
                ProductListEntryComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
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

        expect(link.nativeElement.getAttribute('href')).toBe(`/${encodeURIComponent(encodeResourceUriAsRouteParam(getUri(product)))}`);
    });

    it('renders the Add to Shopping Cart form', () => {
        const addToShoppingCartForm = fixture.debugElement.query(By.css('ngxp-add-to-shopping-cart-form')).nativeNode;

        expect(addToShoppingCartForm.product).toBe(getUri(product));
    });
});
