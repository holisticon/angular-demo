import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { expectElementFromFixture } from '@holisticon/common/test';
import { searchResults } from '@holisticon/products/test';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { ProductsStore } from '../../state';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
    let fixture: ComponentFixture<SearchResultsComponent>;

    beforeEach(waitForAsync(() => {
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
        fixture.detectChanges();
    });

    it('renders the search results as holisticon-product-list', () => {
        const productList = fixture.debugElement.query(By.css('holisticon-product-list')).nativeElement

        expectElementFromFixture(fixture, 'holisticon-product-list').not.toBeNull();
        expect(productList.products).toEqual(searchResults.products);
    });
});
