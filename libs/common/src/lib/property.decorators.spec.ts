import { OnAssignment, OnChange, OnNonNullChange } from './property.decorators';

type NumberOrNull = (number | null);
type TestMethodParams = [NumberOrNull, NumberOrNull];

describe('PropertyDecorators', () => {
    const oldValue = 1;
    const newValue = 2;

    class Test {
        @OnAssignment('testMethod')
        onAssignmentProp = oldValue;

        @OnChange('testMethod')
        onChangeProp = oldValue;

        @OnNonNullChange('testMethod')
        onNonNullChangeProp: number | null = oldValue;

        testMethodParams: TestMethodParams | null = null;

        testMethod(...args: TestMethodParams) {
            this.testMethodParams = args;
        }
    }

    describe('OnNonChange', () => {
        it('calls the class method with the given name with the old and the new value when a new value is set on the decorated property', () => {
            const test = new Test();
            test.onNonNullChangeProp = newValue;

            expect(test.testMethodParams).toEqual([
                newValue,
                oldValue
            ]);
        });

        it('does nothing if the new value is null', () => {
            const test = new Test();
            test.onNonNullChangeProp = null;

            expect(test.testMethodParams).toBeNull();
        });

        it('does nothing if the value has not changed', () => {
            const test = new Test();
            test.onNonNullChangeProp = oldValue;

            expect(test.testMethodParams).toBeNull();
        });

        it('defaults to "onChange" + key as callback method name', () => {
            class DefaultMethodTest {
                @OnNonNullChange()
                testProp = oldValue;

                testMethodParams: TestMethodParams | null = null;

                onChangeTestProp(...args: TestMethodParams) {
                    this.testMethodParams = args;
                }
            }

            const test = new DefaultMethodTest();

            test.testProp = newValue;

            expect(test.testMethodParams).toEqual([
                newValue,
                oldValue
            ]);
        });

        it('throws an error if an invalid method name is given', () => {
            class InvalidMethodTest {
                @OnNonNullChange('invalid')
                testProp = oldValue;

                testMethodParams: TestMethodParams | null = null;

                testMethod(...args: TestMethodParams) {
                    this.testMethodParams = args;
                }
            }

            expect(() => {
                const test = new InvalidMethodTest();
            }).toThrowError();
        });
    });

    describe('OnChange', () => {
        it('calls the class method with the given name with the old and the new value when a new value is set on the decorated property', () => {
            const test = new Test();
            test.onChangeProp = newValue;

            expect(test.testMethodParams).toEqual([
                newValue,
                oldValue
            ]);
        });

        it('does nothing if the value has not changed', () => {
            const test = new Test();
            test.onChangeProp = oldValue;

            expect(test.testMethodParams).toBeNull();
        });

        it('throws an error if an invalid method name is given', () => {
            class InvalidMethodTest {
                @OnChange('invalid')
                testProp = oldValue;

                testMethodParams: TestMethodParams | null = null;

                testMethod(...args: TestMethodParams) {
                    this.testMethodParams = args;
                }
            }

            expect(() => {
                const test = new InvalidMethodTest();
            }).toThrowError();
        });

        it('defaults to "onChange" + key as callback method name', () => {
            class DefaultMethodTest {
                @OnChange()
                testProp = oldValue;

                testMethodParams: TestMethodParams | null = null;

                onChangeTestProp(...args: TestMethodParams) {
                    this.testMethodParams = args;
                }
            }

            const test = new DefaultMethodTest();

            test.testProp = newValue;

            expect(test.testMethodParams).toEqual([
                newValue,
                oldValue
            ]);
        });
    });

    describe('OnAssignment', () => {
        it('calls the class method with the given name with the old and the new value when a value is set on the decorated property', () => {
            const test = new Test();
            test.onAssignmentProp = newValue;

            expect(test.testMethodParams).toEqual([
                newValue,
                oldValue
            ]);
        });

        it('calls the class method with the given name even when the same value is set again', () => {
            const test = new Test();
            test.onAssignmentProp = oldValue;

            expect(test.testMethodParams).toEqual([
                oldValue,
                oldValue
            ]);
        });

        it('does not break accessing the property', () => {
            const test = new Test();
            test.onAssignmentProp = oldValue;

            expect(test.onAssignmentProp).toBe(oldValue);
        });

        it('throws an error if an invalid method name is given', () => {
            class InvalidMethodTest {
                @OnAssignment('invalid')
                testProp = oldValue;

                testMethodParams: TestMethodParams | null = null;

                testMethod(...args: TestMethodParams) {
                    this.testMethodParams = args;
                }
            }

            expect(() => {
                const test = new InvalidMethodTest();
            }).toThrowError();
        });

        it('defaults to "onChange" + key as callback method name', () => {
            class DefaultMethodTest {
                @OnAssignment()
                testProp = oldValue;

                testMethodParams: TestMethodParams | null = null;

                onChangeTestProp(...args: TestMethodParams) {
                    this.testMethodParams = args;
                }
            }

            const test = new DefaultMethodTest();

            test.testProp = newValue;

            expect(test.testMethodParams).toEqual([
                newValue,
                oldValue
            ]);
        });
    });
});
