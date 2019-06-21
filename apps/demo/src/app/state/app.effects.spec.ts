
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { searchProductsAction } from '@ngxp/products-common';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
    let actions$: Observable<any>;
    let appEffects: AppEffects;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateImmutability: true,
                        strictActionImmutability: true
                    }
                }),
                RouterTestingModule
            ],
            providers: [
                AppEffects,
                provideMockActions(() => actions$)
            ]
        });

        appEffects = TestBed.get(AppEffects);
        router = TestBed.get(Router);
    });

    describe('navigateToProductSearchResults', () => {
        it('redirects to the products view passing the query as query param', () => {
            const expectedQuery = 'query';
            const navigateSpy = spyOn(router, 'navigate');

            actions$ = hot('-a-|', { a: searchProductsAction({ query: expectedQuery }) });

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
