import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductSearchFormComponent, SearchProductsAction, ProductsCommonStore } from '@luchsamapparat/products-common';
import { Store, StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from '@luchsamapparat/common/test';
import { HomepageComponent } from './homepage.component';
import { provideStoreServiceMock } from '@ngx-patterns/store-service/testing';

describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;
    let productsCommonStore: ProductsCommonStore;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({})
            ],
            declarations: [
                HomepageComponent,
                ProductSearchFormComponent
            ],
            providers: [
                provideStoreServiceMock(ProductsCommonStore),
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();

        productsCommonStore = TestBed.get(ProductsCommonStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a product search form', () => {
        expectElementFromFixture(fixture, 'cfha-product-search-form').not.toBeNull();
    });

    it('triggers a search for products with the provided query when the product search form emits a search event', () => {
        const expectedQuery = 'query';
        const searchProductsSpy = spyOn(productsCommonStore, 'searchProducts');
        const productSearchForm: ProductSearchFormComponent = fixture.debugElement.query(By.directive(ProductSearchFormComponent)).componentInstance;

        productSearchForm.search.emit(expectedQuery);

        expect(searchProductsSpy).toHaveBeenCalledWith(expectedQuery);
    });
});
