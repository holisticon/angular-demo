import { activatedRouteSnapshot, activatedViews } from '@ngxp/routing/test';
import { getViews } from './router-state.utils';

describe('routerStateUtils', () => {
    describe('getViews', () => {
        it('returns the activated views of the given route snapshot', () => {
            expect(getViews(activatedRouteSnapshot)).toEqual(activatedViews);
        });

        it('returns an empty array if null or undefined is given', () => {
            // tslint:disable-next-line: no-non-null-assertion
            expect(getViews(null!)).toEqual([]);
            // tslint:disable-next-line: no-non-null-assertion
            expect(getViews(undefined!)).toEqual([]);
        });

    });
});
