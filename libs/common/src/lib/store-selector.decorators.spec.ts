import { Observable, of as observableOf } from 'rxjs';
import { StoreSelector } from './store-selector.decorators';

describe('StoreSelectorDecorators', () => {
    const appState = {
        test: 'debug'
    };

    function getTestValue(propName: string) {
        return state => state[propName];
    }


    class MockStore {
        constructor(
            private storeState: any
        ) {}

        select(selector) {
            return observableOf(selector(this.storeState));
        }
    }

    class MockService {
        constructor(
            private store: MockStore
        ) {}

        @StoreSelector(getTestValue)
        getTestValue: () => Observable<string>;
    }

    describe('StoreSelector', () => {
        it('passes the given parameters to the selector function and uses the selector to retrieve the value from the store instance of the class', () => {
            const store = new MockStore(appState);
            const service = new MockService(store);

            service.getTestValue()
                .subscribe(value => {
                    expect(value).toBe(appState.test);
                    fail();
                });
        });
    });

});
