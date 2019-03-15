import { getAllValues, getRandomValue } from './enum.utils';

describe('enumUtils', () => {

    enum Test {
        A = 'a',
        B = 'b',
        C = 'c'
    }

    describe('getAllValues', () => {
        it('returns all values of the enum', () => {
            expect(getAllValues(Test)).toEqual([
                Test.A,
                Test.B,
                Test.C
            ]);
        });
    });

    describe('getRandomValue', () => {
        it('returns a random value of the enum', () => {
            const value = getRandomValue(Test);

            expect(getAllValues(Test)).toContain(value);
        });
    });

});
