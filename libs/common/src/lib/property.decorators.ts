import { isFunction, isNull, isUndefined, upperFirst } from 'lodash-es';

export function OnNonNullChange(onNonNullChange?: string | Function) {
    return function (target: any, key: string) {
        return OnChange(
            function(this: typeof target, newValue: any, oldValue: any) {
                if (!isNull(newValue)) {
                    resolveMethod(this, key, onNonNullChange)(newValue, oldValue);
                }
            }
        )(target, key);
    }
}

export function OnChange(onChangeCallback?: string | Function) {
    return function (target: any, key: string) {
        return OnAssignment(
            function(this: typeof target, newValue: any, oldValue: any) {
                if (newValue !== oldValue) {
                    resolveMethod(this, key, onChangeCallback)(newValue, oldValue);
                }
            }
        )(target, key);
    }
}

export function OnAssignment(onSetCallback?: string | Function) {
    return function (target: any, key: string) {
        const valueKey = `_${key}`;

        Object.defineProperty(target, key, {
            get: function () {
                return this[valueKey];
            },
            set: function (newValue) {
                const oldValue = this[valueKey];
                this[valueKey] = newValue;

                resolveMethod(this, key, onSetCallback)(newValue, oldValue);
            },
            enumerable: true,
            configurable: true
        });
    };
}

function resolveMethod(context: any, key: string, methodOrName?: string | Function) {
    if (isUndefined(methodOrName)) {
        methodOrName = `onChange${upperFirst(key)}`;
    }

    const method = isFunction(methodOrName) ? methodOrName : context[<string> methodOrName];

    if (!isFunction(method)) {
        throw new Error(`Error while calling ${methodOrName} for ${key}. ${methodOrName} is not a method`);
    }

    return method.bind(context);
}
