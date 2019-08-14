import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import { RouterAppState } from '@ngxp/routing';
import { routerState } from './router-state.data';

const routerAppStateBlueprint: Blueprint<RouterAppState> = {
    router: () => routerState
};
export const routerAppStateBuilder = createBlueprintBuilder(routerAppStateBlueprint);

export const routerAppState: RouterAppState = routerAppStateBuilder().freeze().build();
