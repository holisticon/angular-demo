import { Store } from '@ngrx/store';

export function StoreSelector(selector: (...any) => (state: any) => any) {
    return function (target: any, key: string) {

        Object.defineProperty(target, key, {
            get: function () {
                const store: Store<any> = this.store;
                return (...args) => this.store.select(selector(...args));
            },
            set: function() {},
            enumerable: true,
            configurable: true
        });
    };
}
