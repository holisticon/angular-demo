import { Store } from '@ngrx/store';

export function StoreSelector(selector: (...any) => (state: any) => any) {
    return function (target: any, key: string) {
        let selectorFn = function() {
            const store: Store<any> = this.store;
            return (...args) => this.store.select(selector(...args));
        }

        Object.defineProperty(target, key, {
            get: function () {
                return selectorFn.apply(this);
            },
            set: function (value: () => any) {
                selectorFn = () => value;
            },
            enumerable: true,
            configurable: true
        });
    };
}
