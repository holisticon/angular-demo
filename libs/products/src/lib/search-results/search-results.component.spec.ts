import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { addId, getId, Resource } from '@luchsamapparat/common';
import { Product } from '@luchsamapparat/products-common';
import { AdditionToShoppingCart, AddToShoppingCartAction } from '@luchsamapparat/shopping-cart-common';
import { Store, StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from 'ngx-test-helpers';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsStore } from '../state/products-store.service';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    let store: Store<void>;

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
            ]
        })
            .compileComponents();

        store = TestBed.get(Store);

        const productsStore = TestBed.get(ProductsStore);
        jest.spyOn(productsStore, 'getSearchResults').mockImplementation(() => Observable.of(searchResults));
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

    it('dispatches an AddToShoppingCartAction when the product list emits an addToShoppingCart event', async(() => {
        const additionToShoppingCart: AdditionToShoppingCart = {
            product: getId(product),
            quantity: 2
        };
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        const productList: ProductListComponent = fixture.debugElement.query(By.directive(ProductListComponent)).componentInstance;

        productList.addToShoppingCart.emit(additionToShoppingCart);

        const dispatchedAction: AddToShoppingCartAction = storeDispatchSpy.mock.calls[0][0];
        expect(dispatchedAction).toBeInstanceOf(AddToShoppingCartAction);
        expect(dispatchedAction.payload).toBe(additionToShoppingCart);
    }));
});
