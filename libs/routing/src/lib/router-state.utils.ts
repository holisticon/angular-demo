import { Params } from '@angular/router';
import { flatten, isNil, isUndefined, merge, negate } from 'lodash-es';
import { ActivatedRouteSnapshot } from './router-state.model';

type NotUndefined = (value: string | undefined) => value is string;

export function getViews(activatedRoute: ActivatedRouteSnapshot): string[] {
    if (isNil(activatedRoute)) {
        return [];
    }

    return [
        getView(activatedRoute),
        ...flatten(activatedRoute.children.map(childRoute => getViews(childRoute)))
    ]
        .filter(negate(isUndefined) as NotUndefined);
}

function getView(activatedRoute: ActivatedRouteSnapshot): string | undefined {
    return activatedRoute.data.view;
}

export function getParams(activatedRoute: ActivatedRouteSnapshot): Params {
    if (isNil(activatedRoute)) {
        return [];
    }

    return merge(
        {},
        activatedRoute.params,
        ...activatedRoute.children.map(childRoute => getParams(childRoute))
    );
}
