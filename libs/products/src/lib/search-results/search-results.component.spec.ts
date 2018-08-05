import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { addId, getId, Resource } from '@luchsamapparat/common';
import { Product } from '@luchsamapparat/products-common';
import { AdditionToShoppingCart, AddToShoppingCartAction, ShoppingCartCommonStore } from '@luchsamapparat/shopping-cart-common';
import { Store, StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from '@luchsamapparat/common/testing';
import { of as observableOf } from 'rxjs';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsStore } from '../state/products-store.service';
import { SearchResultsComponent } from './search-results.component';
import { provideStoreServiceMock } from '@ngx-patterns/store-service/testing';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    let shoppingCartCommonStore: ShoppingCartCommonStore;

    const product: Resource<Product> = addId({
        description: '',
        image: '',
        name: '',
        price: 0
    }, 'id');
    const searchResults = [product];

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

    it('renders the search results as cfha-product-list', () => {
        const productList: ProductListComponent = fixture.debugElement.query(By.directive(ProductListComponent)).componentInstance

        expectElementFromFixture(fixture, 'cfha-product-list').not.toBeNull();
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
