import { activatedRouteSnapshot, libraryRootRouteSnapshot, libraryRouteSnapshot, pageRouteSnapshot, queryParamName, queryParams, routerNavigationActionBuilder, routerStateSnapshotBuilder, Views } from '@ngxp/routing/test';
import { hot } from 'jest-marbles';
import { extractQueryParam, filterNavigationTo } from './routing-operators';

const pageNavigationAction = routerNavigationActionBuilder(routerStateSnapshotBuilder(pageRouteSnapshot).build()).build();
const libraryRootNavigationAction = routerNavigationActionBuilder(routerStateSnapshotBuilder(libraryRootRouteSnapshot).build()).build();
const libraryNavigationAction = routerNavigationActionBuilder(routerStateSnapshotBuilder(libraryRouteSnapshot).build()).build();
const activatedNavigationAction = routerNavigationActionBuilder(routerStateSnapshotBuilder(activatedRouteSnapshot).build()).build();

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
});
