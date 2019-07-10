import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from '@ngxp/common/test';
import { product, products } from '@ngxp/products-common/test';
import { getId } from '@ngxp/resource';
import { AdditionToShoppingCart, ShoppingCartCommonStore } from '@ngxp/shopping-cart-common';
import { provideStoreServiceMock } from '@ngxp/store-service/testing';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsStore } from '../state/products-store.service';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    let shoppingCartCommonStore: ShoppingCartCommonStore;

    const searchResults = products;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true
                    }
                }),
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

        expect(addToShoppingCartSpy).toHaveBeenCalledWith({ additionToShoppingCart });
    }));
});
