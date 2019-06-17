
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { SearchProductsAction } from '@ngxp/products-common';
import { DataPersistence } from '@nrwl/angular';
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
                StoreModule.forRoot({}),
                RouterTestingModule
            ],
            providers: [
                AppEffects,
                DataPersistence,
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

            actions$ = hot('-a-|', { a: new SearchProductsAction(expectedQuery) });

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
