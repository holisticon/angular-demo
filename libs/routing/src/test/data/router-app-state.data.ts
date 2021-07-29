import { RouterAppState } from '@holisticon/routing';
import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import { routerState } from './router-state.data';

const routerAppStateBlueprint: Blueprint<RouterAppState> = {
    router: () => routerState
};
export const routerAppStateBuilder = createBlueprintBuilder(routerAppStateBlueprint);

export const routerAppState: RouterAppState = routerAppStateBuilder().freeze().build();
