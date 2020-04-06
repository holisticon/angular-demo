
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ProductsStore } from '@ngxp/products';
import { provideStoreServiceMock, StoreServiceMock } from '@ngxp/store-service/testing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
    let actions$: Observable<any>;
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
                provideMockActions(() => actions$),
                provideStoreServiceMock(ProductsStore)
            ]
        });

        appEffects = TestBed.get(AppEffects);
        router = TestBed.get(Router);
        productsStore = TestBed.get(ProductsStore);
    });

    describe('navigateToProductSearchResults', () => {
        it('redirects to the products view passing the query as query param', () => {
            const expectedQuery = 'query';
            const navigateSpy = spyOn(router, 'navigate');

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
