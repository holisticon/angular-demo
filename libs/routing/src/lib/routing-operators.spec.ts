import { activatedRouteSnapshot, libraryRootRouteSnapshot, libraryRouteSnapshot, pageRouteParamName, pageRouteParams, pageRouteSnapshot, queryParamName, queryParams, routerNavigatedActionBuilder, routerStateSnapshotBuilder, Views } from '@ngxp/routing/test';
import { hot } from 'jest-marbles';
import { extractQueryParam, extractRouteParam, filterNavigationTo } from './routing-operators';

const pageNavigationAction = routerNavigatedActionBuilder(routerStateSnapshotBuilder(pageRouteSnapshot).build()).build();
const libraryRootNavigationAction = routerNavigatedActionBuilder(routerStateSnapshotBuilder(libraryRootRouteSnapshot).build()).build();
const libraryNavigationAction = routerNavigatedActionBuilder(routerStateSnapshotBuilder(libraryRouteSnapshot).build()).build();
const activatedNavigationAction = routerNavigatedActionBuilder(routerStateSnapshotBuilder(activatedRouteSnapshot).build()).build();

describe('routingOperators', () => {
    describe('filterNavigationTo', () => {
        it('returns only RouterNavigationActions that contain the given view', () => {
            const action$ = hot('a-b-c-d', {
                a: pageNavigationAction,
                b: libraryRootNavigationAction,
                c: libraryNavigationAction,
                d: activatedNavigationAction
            });

            const dispatchedAction$ = filterNavigationTo(Views.FeatureRoot)(action$);

            expect(dispatchedAction$).toBeObservable(hot('----c-d', {
                c: libraryNavigationAction,
                d: activatedNavigationAction
            }))
        });
    });

    describe('extractQueryParam', () => {
        it('returns query parameter value for the given parameter name', () => {
            const expectedQueryParamValue = queryParams[queryParamName];

            const action$ = hot('a', {
                a: activatedNavigationAction
            });

            const queryParam$ = extractQueryParam(queryParamName)(action$);

            expect(queryParam$).toBeObservable(hot('a', {
                a: expectedQueryParamValue
            }));
        });

        it('returns the given default value if no query parameter with the given name is present', () => {
            const expectedQueryParamValue = 'expected';

            const action$ = hot('a', {
                a: activatedNavigationAction
            });

            const queryParam$ = extractQueryParam('invalid', expectedQueryParamValue)(action$);

            expect(queryParam$).toBeObservable(hot('a', {
                a: expectedQueryParamValue
            }));
        });

        it('returns undefined if no query parameter with the given name is present and no default value is given', () => {
            const action$ = hot('a', {
                a: activatedNavigationAction
            });

            const queryParam$ = extractQueryParam('invalid')(action$);

            expect(queryParam$).toBeObservable(hot('a', {
                a: undefined
            }));
        });
    });

    describe('extractRouteParam', () => {
        it('returns route parameter value for the given parameter name', () => {
            const expectedRouteParamValue = pageRouteParams[pageRouteParamName];

            const action$ = hot('a', {
                a: activatedNavigationAction
            });

            const routeParam$ = extractRouteParam(pageRouteParamName)(action$);

            expect(routeParam$).toBeObservable(hot('a', {
                a: expectedRouteParamValue
            }));
        });

        it('returns the given default value if no route parameter with the given name is present', () => {
            const expectedRouteParamValue = 'expected';

            const action$ = hot('a', {
                a: activatedNavigationAction
            });

            const queryParam$ = extractRouteParam('invalid', expectedRouteParamValue)(action$);

            expect(queryParam$).toBeObservable(hot('a', {
                a: expectedRouteParamValue
            }));
        });

        it('returns undefined if no route parameter with the given name is present and no default value is given', () => {
            const action$ = hot('a', {
                a: activatedNavigationAction
            });

            const queryParam$ = extractRouteParam('invalid')(action$);

            expect(queryParam$).toBeObservable(hot('a', {
                a: undefined
            }));
        });
    });
});
