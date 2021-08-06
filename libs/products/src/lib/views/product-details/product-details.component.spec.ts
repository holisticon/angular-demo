import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { product } from '@holisticon/products/test';
import { encodeResourceUriAsRouteParam, getUri } from '@holisticon/resource';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { ProductsStore } from '../../state';
import { ProductDetailsComponent } from './product-details.component';

fdescribe('ProductDetailsComponent', () => {
    let fixture: ComponentFixture<ProductDetailsComponent>;

    const activatedRoute = {
        snapshot: {
            params: {
                product: encodeResourceUriAsRouteParam(getUri(product))
            }
        }
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                provideStoreServiceMock(ProductsStore, {
                    getProduct: product
                }),
                { provide: ActivatedRoute, useValue: activatedRoute }
            ],
            declarations: [
                ProductDetailsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailsComponent);
        fixture.detectChanges();
    });

    it('renders the product details', () => {
        expect(fixture.debugElement.query(By.css('holisticon-product')).nativeElement.product).toBe(product);
    });
});
