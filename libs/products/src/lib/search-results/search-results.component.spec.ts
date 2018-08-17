import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getId, Resource } from '@ngxp/common';
import { Product } from '@ngxp/products-common';
import { AdditionToShoppingCart, AddToShoppingCartAction, ShoppingCartCommonStore } from '@ngxp/shopping-cart-common';
import { Store, StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from '@ngxp/common/test';
import { of as observableOf } from 'rxjs';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsStore } from '../state/products-store.service';
import { SearchResultsComponent } from './search-results.component';
import { provideStoreServiceMock } from '@ngx-patterns/store-service/testing';
import { products, product } from '@ngxp/products-common/test';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    let shoppingCartCommonStore: ShoppingCartCommonStore;

    const searchResults = products;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
            ],
            declarations: [
                ProductListComponent,
                SearchResultsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                provideStoreServiceMock(ProductsStore, {
                    getSearchResults: searchResults
                }),
                provideStoreServiceMock(ShoppingCartCommonStore)
            ]
        })
            .compileComponents();

        shoppingCartCommonStore = TestBed.get(ShoppingCartCommonStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders the search results as ngxp-product-list', () => {
        const productList: ProductListComponent = fixture.debugElement.query(By.directive(ProductListComponent)).componentInstance

        expectElementFromFixture(fixture, 'ngxp-product-list').not.toBeNull();
        expect(productList.products).toEqual(searchResults);
    });

    it('adds the product to the shopping cart when the product list emits an addToShoppingCart event', async(() => {
        const additionToShoppingCart: AdditionToShoppingCart = {
            product: getId(product),
            quantity: 2
        };
        const addToShoppingCartSpy = spyOn(shoppingCartCommonStore, 'addToShoppingCart');
        const productList: ProductListComponent = fixture.debugElement.query(By.directive(ProductListComponent)).componentInstance;

        productList.addToShoppingCart.emit(additionToShoppingCart);

        expect(addToShoppingCartSpy).toHaveBeenCalledWith(additionToShoppingCart);
    }));
});
