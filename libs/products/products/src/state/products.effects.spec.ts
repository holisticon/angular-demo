import { TestBed } from '@angular/core/testing';
import { LoadSearchResultsAction, SearchResultsLoadedAction } from '@luchsamapparat/products/products-common';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { Observable } from 'rxjs/Observable';
import { ProductsEffects } from './products.effects';



describe('ProductsEffects', () => {
    let actions$: Observable<any>;
    let effects$: ProductsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [
                ProductsEffects,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(ProductsEffects);
    });

    describe('someEffect', () => {
        it('should work', () => {
            const expectedQuery = 'query';
            actions$ = hot('-a-|', { a: new LoadSearchResultsAction(expectedQuery) });

            expect(effects$.loadProducts$).toBeObservable(
                hot('-a-|', { a: new SearchResultsLoadedAction([]) })
            );
        });
    });
});
