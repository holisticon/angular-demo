import { flatten, isNil, isUndefined, negate } from 'lodash-es';
import { ActivatedRouteSnapshot } from './router-state.model';

export function getViews(activatedRoute: ActivatedRouteSnapshot): string[] {
    if (isNil(activatedRoute)) {
        return [];
    }

    type NotUndefined = (value: string | undefined) => value is string;

    return [
        getView(activatedRoute),
        ...flatten(activatedRoute.children.map(childRoute => getViews(childRoute)))
    ]
        .filter(negate(isUndefined) as NotUndefined);
}

function getView(activatedRoute: ActivatedRouteSnapshot): string | undefined {
    return activatedRoute.data.view;
}
