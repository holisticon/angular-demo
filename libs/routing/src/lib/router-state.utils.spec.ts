import { activatedRouteSnapshot, activatedViews, routeParams } from '@ngxp/routing/test';
import { getParams, getViews } from './router-state.utils';

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

    describe('getParams', () => {
        it('returns the route params of the given route snapshot', () => {
            expect(getParams(activatedRouteSnapshot)).toEqual(routeParams);
        });

        it('returns an empty array if null is given', () => {
            // tslint:disable-next-line: no-non-null-assertion
            expect(getParams(null!)).toEqual([]);
        });

        it('returns an empty array if undefined is given', () => {
            // tslint:disable-next-line: no-non-null-assertion
            expect(getParams(undefined!)).toEqual([]);
        });
    });
});
