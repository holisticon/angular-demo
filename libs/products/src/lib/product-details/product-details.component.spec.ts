import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { product } from '@ngxp/products-common/test';
import { encodeResourceIdAsRouteParam, getId } from '@ngxp/resource';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { ProductsStore } from '../state/products-store.service';
import { ProductDetailsComponent } from './product-details.component';

fdescribe('ProductDetailsComponent', () => {
    let component: ProductDetailsComponent;
    let fixture: ComponentFixture<ProductDetailsComponent>;

    const activatedRoute: any = {
        snapshot: {
            params: {
                productId: encodeResourceIdAsRouteParam(getId(product))
            }
        }
    };

    beforeEach(async(() => {
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
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the product details', () => {
        expect(fixture.debugElement.query(By.css('ngxp-product')).nativeElement.product).toBe(product);
    });
});
