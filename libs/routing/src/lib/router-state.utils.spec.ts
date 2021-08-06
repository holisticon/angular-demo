import { activatedRouteSnapshot, activatedViews, routeParams } from '@holisticon/routing/test';
import { getParams, getViews } from './router-state.utils';

describe('routerStateUtils', () => {
    describe('getViews', () => {
        it('returns the activated views of the given route snapshot', () => {
            expect(getViews(activatedRouteSnapshot)).toEqual(activatedViews);
        });

        it('returns an empty array if null or undefined is given', () => {
            expect(getViews(null)).toEqual([]);
            expect(getViews(undefined)).toEqual([]);
        });
    });

    describe('getParams', () => {
        it('returns the route params of the given route snapshot', () => {
            expect(getParams(activatedRouteSnapshot)).toEqual(routeParams);
        });
    });
});
