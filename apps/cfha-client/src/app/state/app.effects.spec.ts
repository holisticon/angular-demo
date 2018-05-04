import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { Observable } from 'rxjs/Observable';
import { AppEffects } from './app.effects';



describe('AppEffects', () => {
    let actions$: Observable<any>;
    let effects$: AppEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [
                AppEffects,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(AppEffects);
    });

});
