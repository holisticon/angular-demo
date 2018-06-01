import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Resource, addId, getId } from '@luchsamapparat/common';
import { Product } from '@luchsamapparat/products-common';
import { AddToShoppingCartAction, AdditionToShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { Store, StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from 'ngx-test-helpers';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsAppState } from '../state/products.reducer';
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
                StoreModule.forRoot<ProductsAppState>({
                    products: state => state
                }, {
                    initialState: {
                        products: {
                            query: 'query',
                            searchResults: searchResults
                        }
                    }
                }),
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
