
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsStore } from '@holisticon/products/state';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { take } from 'rxjs/operators';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
    let appEffects: AppEffects;
    let router: Router;
    let productsStore: StoreServiceMock<ProductsStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                AppEffects,
                provideStoreServiceMock(ProductsStore)
            ]
        });

        appEffects = TestBed.inject(AppEffects);
        router = TestBed.inject(Router);
        productsStore = TestBed.inject(ProductsStore) as any;
    });

    describe('navigateToProductSearchResults', () => {
        it('redirects to the products view passing the query as query param', () => {
            const expectedQuery = 'query';
            const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation(async () => true);

            productsStore.searchProducts$.next(expectedQuery);

            appEffects.navigateToProductSearchResults$
                .pipe(take(1))
                .subscribe(() => {
                    expect(navigateSpy).toHaveBeenCalledWith(
                        ['products'],
                        { queryParams: { query: expectedQuery } }
                    )
                });
        });
    });

});
