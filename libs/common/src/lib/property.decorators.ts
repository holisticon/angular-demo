import { isFunction, isNull, isUndefined, upperFirst } from 'lodash-es';

type AnyFunction = (...args: unknown[]) => unknown;

export function OnNonNullChange(onNonNullChange?: string | AnyFunction) {
    return function <T>(target: T, key: keyof T) {
        return OnChange(
            function (this: typeof target, newValue: unknown, oldValue: unknown) {
                if (!isNull(newValue)) {
                    resolveMethod(this, key, onNonNullChange)(newValue, oldValue);
                }
            }
        )(target, key);
    }
}

export function OnChange(onChangeCallback?: string | AnyFunction) {
    return function <T>(target: T, key: keyof T) {
        return OnAssignment(
            function (this: typeof target, newValue: unknown, oldValue: unknown) {
                if (newValue !== oldValue) {
                    resolveMethod(this, key, onChangeCallback)(newValue, oldValue);
                }
            }
        )(target, key);
    }
}

export function OnAssignment(onSetCallback?: string | AnyFunction) {
    return function <T>(target: T, key: keyof T) {
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

function resolveMethod<Ctx>(context: Ctx, key: keyof Ctx, methodOrName?: string | AnyFunction) {
    if (isUndefined(methodOrName)) {
        methodOrName = `onChange${upperFirst(key as string)}`;
    }

    const method = isFunction(methodOrName) ? methodOrName : context[methodOrName as keyof Ctx];

    if (!isFunction(method)) {
        throw new Error(`Error while calling ${methodOrName} for ${key}. ${methodOrName} is not a method`);
    }

    return method.bind(context);
}
