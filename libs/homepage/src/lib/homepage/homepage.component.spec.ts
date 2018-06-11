import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductSearchFormComponent, SearchProductsAction } from '@luchsamapparat/products-common';
import { Store, StoreModule } from '@ngrx/store';
import { expectElementFromFixture } from 'ngx-test-helpers';
import { HomepageModule } from '../homepage.module';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;
    let store: Store<void>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HomepageModule,
                RouterTestingModule,
                StoreModule.forRoot({})
            ]
        })
            .compileComponents();

        store = TestBed.get(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renders a product search form', () => {
        expectElementFromFixture(fixture, 'cfha-product-search-form').not.toBeNull();
    });

    it('dispatches a SearchProductsAction with the provided query when the product search form emits a search event', () => {
        const expectedQuery = 'query';
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        const productSearchForm: ProductSearchFormComponent = fixture.debugElement.query(By.directive(ProductSearchFormComponent)).componentInstance;

        productSearchForm.search.emit(expectedQuery);

        const dispatchedAction: SearchProductsAction = storeDispatchSpy.mock.calls[0][0];
        expect(dispatchedAction).toBeInstanceOf(SearchProductsAction);
        expect(dispatchedAction.payload).toBe(expectedQuery);
    });
});
