import { Route, UrlSegment } from '@angular/router';
import { isEmpty, isNil, isNull } from 'lodash-es';
import { ActivatedRouteSnapshot } from '../../lib/router-state.model';

export function applyQueryParamsOnChildren(activatedRoute: Partial<ActivatedRouteSnapshot>): Partial<ActivatedRouteSnapshot> {
    if (isEmpty(activatedRoute.children)) {
        return activatedRoute;
    }

    return {
        ...activatedRoute,
        children: activatedRoute.children?.map(
            child => ({
                ...child,
                queryParams: {
                    ...child.queryParams,
                    ...activatedRoute.queryParams
                }
            })
        )
    };
}

export function applyUrlAndRouteConfig(activatedRoute: Partial<ActivatedRouteSnapshot>, path: string | null): Partial<ActivatedRouteSnapshot> {
    const paths = isNull(path) ? null : path.split('/');
    return {
        ...activatedRoute,
        url: toUrlSegments(paths),
        routeConfig: toRouteConfig(paths)
    };
}

export function applyChildren(activatedRoute: Partial<ActivatedRouteSnapshot>, children: ActivatedRouteSnapshot[]): Partial<ActivatedRouteSnapshot> {
    return {
        ...activatedRoute,
        children,
        firstChild: isEmpty(children) ? undefined : children[0],
    }
}

function toUrlSegments(paths: string[] | null): UrlSegment[] {
    if (isNull(paths)) {
        return [];
    }

    return paths.map(path => ({
        path,
        parameters: {}
    } as UrlSegment));
}

function toRouteConfig(paths: string[] | null): Route | null {
    if (isNull(paths)) {
        return null;
    }

    if (isEmpty(paths)) {
        return { path: '', pathMatch: 'full' };
    }

    return {
        path: paths.join('/')
    }
}

export function getUrl(
    routeSnapshot: ActivatedRouteSnapshot,
    queryParams = {}
): string {
    const url = getUrlSegments(routeSnapshot)
        .map(urlSegment => urlSegment.toString())
        .filter(urlSegment => !isEmpty(urlSegment))
        .join('/');

    const queryString = (new URLSearchParams(queryParams)).toString();

    return isEmpty(queryString) ? url : `${url}?${queryString}`;
}

function getUrlSegments(routeSnapshot: ActivatedRouteSnapshot): UrlSegment[] {
    return [
        ...routeSnapshot.url,
        ...isNil(routeSnapshot.firstChild) ? [] : getUrlSegments(routeSnapshot.firstChild)
    ];
}
