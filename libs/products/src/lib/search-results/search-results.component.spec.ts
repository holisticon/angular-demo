import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { expectElementFromFixture } from '@ngxp/common/test';
import { products } from '@ngxp/products-common/test';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsStore } from '../state/products-store.service';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    const searchResults = products;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchResultsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                provideStoreServiceMock(ProductsStore, {
                    getSearchResults: searchResults
                })
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the search results as ngxp-product-list', () => {
        const productList: ProductListComponent = fixture.debugElement.query(By.css('ngxp-product-list')).nativeElement

        expectElementFromFixture(fixture, 'ngxp-product-list').not.toBeNull();
        expect(productList.products).toEqual(searchResults);
    });
});
