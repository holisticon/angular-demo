import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { expectElementFromFixture } from '@holisticon/common/test';
import { ProductsStore } from '@holisticon/products/state';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;
    let productsStore: ProductsStore;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                HomepageComponent
            ],
            providers: [
                provideStoreServiceMock(ProductsStore),
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();

        productsStore = TestBed.inject(ProductsStore) as any;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a product search form', () => {
        expectElementFromFixture(fixture, 'holisticon-product-search-form').not.toBeNull();
    });

    it('triggers a search for products with the provided query string when the product search form emits a search event', () => {
        const expectedQueryString = 'query';
        const searchProductsSpy = jest.spyOn(productsStore, 'searchProducts');
        const productSearchForm = fixture.debugElement.query(By.css('holisticon-product-search-form'));

        productSearchForm.triggerEventHandler('search', expectedQueryString);

        expect(searchProductsSpy).toHaveBeenCalledWith({ queryString: expectedQueryString });
    });
});
